'use client';

import { useQuery } from '@apollo/client';
import { TransactionsSummaryQuery } from '@/modules/transactions/graphql/transactions-queries';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingDown,
  TrendingUp,
  Wallet,
  Target,
} from 'lucide-react';
import { BalanceForecastPeriod } from '@/graphql/graphql';

interface CashFlowSummaryCardsProps {
  accountId?: string;
  period: BalanceForecastPeriod;
  startDate?: Date;
  endDate?: Date;
}

export function CashFlowSummaryCards({
  accountId,
  period,
  startDate,
  endDate,
}: CashFlowSummaryCardsProps) {
  const { data, loading, error } = useQuery(TransactionsSummaryQuery, {
    variables: {
      accountId,
      startDate,
      endDate,
    },
  });

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardContent className="p-4">
          <p className="text-red-600 dark:text-red-400">
            Erro ao carregar resumo: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  const summary = data?.transactionsSummary;

  const cards = [
    {
      title: 'Receitas',
      value: summary?.realizedIncome ?? 0,
      forecast: summary?.forecastIncome ?? 0,
      icon: ArrowUpCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      title: 'Despesas',
      value: summary?.realizedExpense ?? 0,
      forecast: summary?.forecastExpense ?? 0,
      icon: ArrowDownCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30',
    },
    {
      title: 'Saldo Realizado',
      value: summary?.realizedBalance ?? 0,
      icon: Wallet,
      color:
        Number(summary?.realizedBalance ?? 0) >= 0
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-red-600 dark:text-red-400',
      bgColor:
        Number(summary?.realizedBalance ?? 0) >= 0
          ? 'bg-emerald-50 dark:bg-emerald-950/30'
          : 'bg-red-50 dark:bg-red-950/30',
    },
    {
      title: 'Saldo Previsto',
      value: summary?.forecastBalance ?? 0,
      icon: Target,
      color:
        Number(summary?.forecastBalance ?? 0) >= 0
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-red-600 dark:text-red-400',
      bgColor:
        Number(summary?.forecastBalance ?? 0) >= 0
          ? 'bg-blue-50 dark:bg-blue-950/30'
          : 'bg-red-50 dark:bg-red-950/30',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className={card.bgColor}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className={`mt-2 text-2xl font-bold ${card.color}`}>
              {formatCurrency(Number(card.value))}
            </p>
            {card.forecast !== undefined && card.forecast !== card.value && (
              <p className="mt-1 text-xs text-muted-foreground">
                Previsto: {formatCurrency(Number(card.forecast))}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
