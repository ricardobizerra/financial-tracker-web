'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle2,
  Clock,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionsSummaryCardsProps {
  // Legacy (mantidos para compatibilidade)
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  // Realized
  realizedIncome: number;
  realizedExpense: number;
  realizedBalance: number;
  // Forecast
  forecastIncome: number;
  forecastExpense: number;
  forecastBalance: number;
  loading?: boolean;
}

function SummaryCard({
  title,
  icon: Icon,
  income,
  expense,
  balance,
  iconBgClass,
  iconClass,
  loading,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  income: number;
  expense: number;
  balance: number;
  iconBgClass: string;
  iconClass: string;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              iconBgClass,
            )}
          >
            <Icon className={cn('h-4 w-4', iconClass)} />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <ArrowUpCircle className="h-3.5 w-3.5 text-emerald-500" />
            Entradas
          </span>
          <span
            className={cn(
              'font-medium text-emerald-600 dark:text-emerald-400',
              loading && 'animate-pulse',
            )}
          >
            {loading ? '—' : formatCurrency(income)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <ArrowDownCircle className="h-3.5 w-3.5 text-red-500" />
            Saídas
          </span>
          <span
            className={cn(
              'font-medium text-red-600 dark:text-red-400',
              loading && 'animate-pulse',
            )}
          >
            {loading ? '—' : formatCurrency(expense)}
          </span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              Saldo
            </span>
            <span
              className={cn(
                'text-lg font-bold',
                balance >= 0
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-orange-600 dark:text-orange-400',
                loading && 'animate-pulse',
              )}
            >
              {loading ? '—' : formatCurrency(balance)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TransactionsSummaryCards({
  realizedIncome,
  realizedExpense,
  realizedBalance,
  forecastIncome,
  forecastExpense,
  forecastBalance,
  loading,
}: TransactionsSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Saldo Realizado */}
      <SummaryCard
        title="Realizado"
        icon={CheckCircle2}
        income={realizedIncome}
        expense={realizedExpense}
        balance={realizedBalance}
        iconBgClass="bg-emerald-100 dark:bg-emerald-900/30"
        iconClass="text-emerald-600 dark:text-emerald-400"
        loading={loading}
      />

      {/* Saldo Previsto */}
      <SummaryCard
        title="Previsto"
        icon={Clock}
        income={forecastIncome}
        expense={forecastExpense}
        balance={forecastBalance}
        iconBgClass="bg-blue-100 dark:bg-blue-900/30"
        iconClass="text-blue-600 dark:text-blue-400"
        loading={loading}
      />
    </div>
  );
}
