'use client';

import { useQuery } from '@apollo/client';
import { TransactionType, TransactionStatus } from '@/graphql/graphql';
import { FinancialAgendaQuery } from '../graphql/calendar-agenda-queries';
import { formatCurrency } from '@/lib/formatters/currency';
import { format, startOfDay, differenceInDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Calendar,
  Clock,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionStatusBadge } from './transaction-status-badge';

interface FinancialAgendaProps {
  accountId?: string;
  daysAhead?: number;
}

export function FinancialAgenda({
  accountId,
  daysAhead = 60,
}: FinancialAgendaProps) {
  const { data, loading } = useQuery(FinancialAgendaQuery, {
    variables: {
      accountId,
      daysAhead,
    },
  });

  const agenda = data?.financialAgenda;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INCOME':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'EXPENSE':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'BETWEEN_ACCOUNTS':
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getDaysLabel = (daysUntil: number) => {
    if (daysUntil === 0) return 'Hoje';
    if (daysUntil === 1) return 'Amanhã';
    if (daysUntil < 0) return `${Math.abs(daysUntil)} dias atrás`;
    if (daysUntil < 7) return `Em ${daysUntil} dias`;
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agenda Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!agenda || agenda.pendingCount === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agenda Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Nenhuma transação agendada para os próximos {daysAhead} dias
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Agenda Financeira</CardTitle>
          <Badge variant="secondary">{agenda.pendingCount} pendentes</Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-muted-foreground">
              A receber: {formatCurrency(agenda.totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="text-muted-foreground">
              A pagar: {formatCurrency(agenda.totalExpense)}
            </span>
          </div>
          <div
            className={cn(
              'font-medium',
              agenda.balance >= 0 ? 'text-emerald-600' : 'text-red-600',
            )}
          >
            Saldo previsto: {agenda.balance >= 0 ? '+' : ''}
            {formatCurrency(agenda.balance)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {agenda.groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.transactions.map((tx) => {
                const txDate = new Date(tx.date);
                const isOverdue = tx.isOverdue;
                const isUrgent = tx.daysUntilDue <= 2 && !isOverdue;
                const daysLabel = getDaysLabel(tx.daysUntilDue);

                return (
                  <div
                    key={tx.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent',
                      isOverdue &&
                        'border-red-500/50 bg-red-50 dark:bg-red-950/20',
                      isUrgent && 'border-amber-500/50',
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getTypeIcon(tx.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium">{tx.description}</p>
                        {isOverdue && (
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {daysLabel ||
                              format(txDate, "dd 'de' MMM", { locale: ptBR })}
                          </span>
                        </div>
                        <TransactionStatusBadge
                          status={tx.status as TransactionStatus}
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={cn(
                          'text-lg font-semibold',
                          tx.type === 'INCOME'
                            ? 'text-emerald-600'
                            : tx.type === 'EXPENSE'
                              ? 'text-red-600'
                              : 'text-blue-600',
                        )}
                      >
                        {tx.type === 'INCOME'
                          ? '+'
                          : tx.type === 'EXPENSE'
                            ? '-'
                            : ''}
                        {formatCurrency(tx.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(txDate, 'dd/MM', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
