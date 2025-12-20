'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionsSummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  loading?: boolean;
}

export function TransactionsSummaryCards({
  totalIncome,
  totalExpense,
  balance,
  transactionCount,
  loading,
}: TransactionsSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Total Entradas */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <ArrowUpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Entradas</p>
            <p
              className={cn(
                'text-2xl font-bold text-emerald-600 dark:text-emerald-400',
                loading && 'animate-pulse',
              )}
            >
              {loading ? '—' : formatCurrency(totalIncome)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Saídas */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <ArrowDownCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Saídas</p>
            <p
              className={cn(
                'text-2xl font-bold text-red-600 dark:text-red-400',
                loading && 'animate-pulse',
              )}
            >
              {loading ? '—' : formatCurrency(totalExpense)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Saldo */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              balance >= 0
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'bg-orange-100 dark:bg-orange-900/30',
            )}
          >
            <Wallet
              className={cn(
                'h-6 w-6',
                balance >= 0
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-orange-600 dark:text-orange-400',
              )}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Saldo do Período
              {!loading && transactionCount > 0 && (
                <span className="ml-1 text-xs">({transactionCount} mov.)</span>
              )}
            </p>
            <p
              className={cn(
                'text-2xl font-bold',
                balance >= 0
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-orange-600 dark:text-orange-400',
                loading && 'animate-pulse',
              )}
            >
              {loading ? '—' : formatCurrency(balance)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
