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
import {
  TransactionsFilters,
  TransactionFilters,
} from './transactions-filters';

const periodConfig: Record<
  TransactionPeriod,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  [TransactionPeriod.Overdue]: {
    icon: AlertCircle,
    color: 'bg-red-600 dark:bg-red-400',
  },
  [TransactionPeriod.Today]: {
    icon: Calendar,
    color: 'bg-amber-600 dark:bg-amber-400',
  },
  [TransactionPeriod.ThisWeek]: {
    icon: CalendarDays,
    color: 'bg-blue-600 dark:bg-blue-400',
  },
  [TransactionPeriod.ThisMonth]: {
    icon: CalendarClock,
    color: 'bg-violet-600 dark:bg-violet-400',
  },
  [TransactionPeriod.NextMonth]: {
    icon: CalendarRange,
    color: 'bg-cyan-600 dark:bg-cyan-400',
  },
  [TransactionPeriod.Future]: {
    icon: Clock,
    color: 'bg-slate-600 dark:bg-slate-400',
  },
  [TransactionPeriod.Past]: {
    icon: CheckCircle2,
    color: 'bg-emerald-600 dark:bg-emerald-400',
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
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const [filters, setFilters] = useState<TransactionFilters>({});

  const { data, loading, error, refetch } = useQuery(
    TransactionsGroupedByPeriodQuery,
    {
      variables: {
        accountId,
        limitPerGroup: 10,
        startDate: filters.startDate,
        endDate: filters.endDate,
        types: filters.types,
        statuses: filters.statuses,
      },
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
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:flex-nowrap">
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
    <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
      {/* Filtros */}
      <TransactionsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Botões de ação */}
      <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
        <IncomeTransactionCreateForm accountId={accountId} />
        <ExpenseTransactionCreateForm accountId={accountId} />
        <BetweenAccountsTransactionCreateForm accountId={accountId} />
      </div>

      {/* Grupos de transações - layout kanban em telas grandes */}
      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:overflow-hidden xl:grid-cols-3 2xl:grid-cols-4">
        {groups.map((group) => {
          const config = periodConfig[group.period];
          const Icon = config?.icon || Calendar;
          const color = config?.color || 'bg-muted';
          const isExpanded = expandedGroups[group.period];

          return (
            <div
              key={group.period}
              className="flex flex-col rounded-lg border bg-card lg:min-h-0"
            >
              {/* Cabeçalho do grupo */}
              <div
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-3 text-white',
                  color,
                )}
              >
                <Icon className="h-5 w-5" />
                <h3 className="font-semibold">{group.label}</h3>
                <span className="ml-auto text-sm">
                  <span className="font-semibold">{group.count}</span>
                  <span className="hidden sm:inline">
                    {' '}
                    {group.count === 1 ? 'transação' : 'transações'}
                  </span>
                </span>
              </div>

              {/* Lista de cartões - scroll apenas em telas grandes */}
              <div className="flex-1 space-y-2 p-4 lg:overflow-y-auto">
                {group.transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    hideAccount={hideAccount}
                    hideActions={hideActions}
                    compact={compact}
                    showType={true}
                  />
                ))}
              </div>

              {/* Botão "Ver mais" se tiver mais transações */}
              {group.hasMore && !isExpanded && (
                <div className="shrink-0 border-t p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground"
                    onClick={() => toggleGroup(group.period)}
                  >
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Ver mais ({group.count - group.transactions.length})
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
