'use client';

import { useQuery } from '@apollo/client';
import { TransactionsGroupedByPeriodQuery } from '../graphql/transactions-queries';
import { TransactionCard } from './transaction-card';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TransactionPeriod } from '@/graphql/graphql';
import {
  AlertCircle,
  Calendar,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import { TransactionsFilters, TransactionFilters } from './transactions-filters';

const periodConfig: Record<
  TransactionPeriod,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  [TransactionPeriod.Overdue]: {
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
  },
  [TransactionPeriod.Today]: {
    icon: Calendar,
    color: 'text-amber-600 dark:text-amber-400',
  },
  [TransactionPeriod.ThisWeek]: {
    icon: CalendarDays,
    color: 'text-blue-600 dark:text-blue-400',
  },
  [TransactionPeriod.ThisMonth]: {
    icon: CalendarClock,
    color: 'text-violet-600 dark:text-violet-400',
  },
  [TransactionPeriod.NextMonth]: {
    icon: CalendarRange,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  [TransactionPeriod.Future]: {
    icon: Clock,
    color: 'text-slate-600 dark:text-slate-400',
  },
  [TransactionPeriod.Past]: {
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
};

interface TransactionsCardViewProps {
  accountId?: string;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
}

export function TransactionsCardView({
  accountId,
  hideAccount = false,
  hideActions = [],
  compact = false,
}: TransactionsCardViewProps) {
  const [expandedGroups, setExpandedGroups] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<TransactionFilters>({});

  const { data, loading, error, refetch } = useQuery(
    TransactionsGroupedByPeriodQuery,
    {
      variables: { accountId, limitPerGroup: 10 },
    },
  );

  const toggleGroup = (period: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));

    // Se está expandindo, buscar mais itens
    if (!expandedGroups[period]) {
      refetch({ accountId, limitPerGroup: 100 });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-32" />
            {[1, 2].map((j) => (
              <Skeleton key={j} className="h-16 w-full" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardContent className="p-4">
          <p className="text-red-600 dark:text-red-400">
            Erro ao carregar transações: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  const groups = data?.transactionsGroupedByPeriod || [];

  if (groups.length === 0) {
    return (
      <div className="space-y-4">
        <TransactionsFilters filters={filters} onFiltersChange={setFilters} />
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma transação encontrada.
            </p>
            <div className="mt-4 flex flex-wrap md:flex-nowrap justify-center gap-2">
              <IncomeTransactionCreateForm accountId={accountId} />
              <ExpenseTransactionCreateForm accountId={accountId} />
              <BetweenAccountsTransactionCreateForm accountId={accountId} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <TransactionsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Botões de ação */}
      <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
        <IncomeTransactionCreateForm accountId={accountId} />
        <ExpenseTransactionCreateForm accountId={accountId} />
        <BetweenAccountsTransactionCreateForm accountId={accountId} />
      </div>

      {/* Grupos de transações */}
      {groups.map((group) => {
        const config = periodConfig[group.period];
        const Icon = config?.icon || Calendar;
        const color = config?.color || 'text-foreground';
        const isExpanded = expandedGroups[group.period];

        return (
          <div key={group.period} className="space-y-3">
            {/* Cabeçalho do grupo */}
            <div className="flex items-center gap-2">
              <Icon className={cn('h-5 w-5', color)} />
              <h3 className={cn('font-semibold', color)}>{group.label}</h3>
              <span className="text-sm text-muted-foreground">
                {group.count}{' '}
                {group.count === 1 ? 'transação' : 'transações'}
              </span>
            </div>

            {/* Lista de cartões */}
            <div className="space-y-2">
              {group.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  hideAccount={hideAccount}
                  hideActions={hideActions}
                  compact={compact}
                />
              ))}
            </div>

            {/* Botão "Ver mais" se tiver mais transações */}
            {group.hasMore && !isExpanded && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => toggleGroup(group.period)}
              >
                <ChevronDown className="mr-1 h-4 w-4" />
                Ver mais ({group.count - group.transactions.length} restantes)
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
