'use client';

import { useMemo } from 'react';
import {
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  format,
  differenceInDays,
  startOfDay,
  isAfter,
  isBefore,
  addDays,
} from 'date-fns';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionStatusBadge } from './transaction-status-badge';

interface FinancialAgendaProps {
  transactions: TransactionFragmentFragment[];
  daysAhead?: number;
}

interface GroupedTransactions {
  label: string;
  transactions: TransactionFragmentFragment[];
}

export function FinancialAgenda({
  transactions,
  daysAhead = 30,
}: FinancialAgendaProps) {
  const upcomingTransactions = useMemo(() => {
    const today = startOfDay(new Date());
    const endDate = addDays(today, daysAhead);

    return transactions
      .filter((tx) => {
        const txDate = new Date(tx.date);
        // Apenas transações não completadas e não canceladas
        if (
          tx.status === TransactionStatus.Completed ||
          tx.status === TransactionStatus.Canceled
        ) {
          return false;
        }
        // Entre hoje e o período futuro
        return !isBefore(txDate, today) && !isAfter(txDate, endDate);
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [transactions, daysAhead]);

  const groupedTransactions = useMemo(() => {
    const today = startOfDay(new Date());
    const groups: GroupedTransactions[] = [];

    // Agrupar por período
    const thisWeek: TransactionFragmentFragment[] = [];
    const nextWeek: TransactionFragmentFragment[] = [];
    const thisMonth: TransactionFragmentFragment[] = [];
    const later: TransactionFragmentFragment[] = [];

    upcomingTransactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const daysUntil = differenceInDays(txDate, today);

      if (daysUntil <= 7) {
        thisWeek.push(tx);
      } else if (daysUntil <= 14) {
        nextWeek.push(tx);
      } else if (daysUntil <= 30) {
        thisMonth.push(tx);
      } else {
        later.push(tx);
      }
    });

    if (thisWeek.length > 0) {
      groups.push({ label: 'Esta semana', transactions: thisWeek });
    }
    if (nextWeek.length > 0) {
      groups.push({ label: 'Próxima semana', transactions: nextWeek });
    }
    if (thisMonth.length > 0) {
      groups.push({ label: 'Este mês', transactions: thisMonth });
    }
    if (later.length > 0) {
      groups.push({ label: 'Mais tarde', transactions: later });
    }

    return groups;
  }, [upcomingTransactions]);

  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    upcomingTransactions.forEach((tx) => {
      const amount = Number(tx.amount);
      if (tx.type === TransactionType.Income) {
        totalIncome += amount;
      } else if (tx.type === TransactionType.Expense) {
        totalExpense += amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      count: upcomingTransactions.length,
    };
  }, [upcomingTransactions]);

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Income:
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case TransactionType.Expense:
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case TransactionType.BetweenAccounts:
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
    }
  };

  const getDaysLabel = (date: Date) => {
    const today = startOfDay(new Date());
    const txDate = startOfDay(date);
    const days = differenceInDays(txDate, today);

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Amanhã';
    if (days < 7) return `Em ${days} dias`;
    return format(date, "dd 'de' MMM", { locale: ptBR });
  };

  if (upcomingTransactions.length === 0) {
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
          <Badge variant="secondary">{summary.count} pendentes</Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-muted-foreground">
              A receber: {formatCurrency(summary.totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="text-muted-foreground">
              A pagar: {formatCurrency(summary.totalExpense)}
            </span>
          </div>
          <div
            className={cn(
              'font-medium',
              summary.balance >= 0 ? 'text-emerald-600' : 'text-red-600',
            )}
          >
            Saldo previsto: {summary.balance >= 0 ? '+' : ''}
            {formatCurrency(summary.balance)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {groupedTransactions.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.transactions.map((tx) => {
                const txDate = new Date(tx.date);
                const today = startOfDay(new Date());
                const isOverdue = isBefore(txDate, today);
                const isUrgent = differenceInDays(txDate, today) <= 2;

                return (
                  <div
                    key={tx.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent',
                      isOverdue &&
                        'border-red-500/50 bg-red-50 dark:bg-red-950/20',
                      isUrgent && !isOverdue && 'border-amber-500/50',
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
                          <span>{getDaysLabel(txDate)}</span>
                        </div>
                        <TransactionStatusBadge status={tx.status} />
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={cn(
                          'text-lg font-semibold',
                          tx.type === TransactionType.Income
                            ? 'text-emerald-600'
                            : tx.type === TransactionType.Expense
                              ? 'text-red-600'
                              : 'text-blue-600',
                        )}
                      >
                        {tx.type === TransactionType.Income
                          ? '+'
                          : tx.type === TransactionType.Expense
                            ? '-'
                            : ''}
                        {formatCurrency(Number(tx.amount))}
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
