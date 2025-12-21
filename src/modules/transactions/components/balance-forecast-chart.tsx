'use client';

import { useMemo } from 'react';
import {
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { format, addDays, startOfDay, isBefore, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceForecastChartProps {
  transactions: TransactionFragmentFragment[];
  initialBalance: number;
  daysBack?: number;
  daysForward?: number;
}

interface ChartDataPoint {
  date: Date;
  dateLabel: string;
  balance: number;
  isProjected: boolean;
  transactions: TransactionFragmentFragment[];
}

export function BalanceForecastChart({
  transactions,
  initialBalance,
  daysBack = 90,
  daysForward = 90,
}: BalanceForecastChartProps) {
  const chartData = useMemo(() => {
    const today = startOfDay(new Date());
    const startDate = addDays(today, -daysBack);
    const endDate = addDays(today, daysForward);

    // Agrupar transações por dia
    const transactionsByDate = new Map<string, TransactionFragmentFragment[]>();

    transactions.forEach((tx) => {
      const dateKey = format(new Date(tx.date), 'yyyy-MM-dd');
      const existing = transactionsByDate.get(dateKey) || [];
      existing.push(tx);
      transactionsByDate.set(dateKey, existing);
    });

    // Calcular saldo histórico inicial (antes do período do gráfico)
    let runningBalance = initialBalance;

    // Primeiro, subtrair todas as transações do período para chegar ao saldo inicial do gráfico
    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      if (
        isBefore(txDate, startDate) &&
        tx.status !== TransactionStatus.Canceled
      ) {
        const amount = Number(tx.amount);
        if (tx.type === TransactionType.Income) {
          runningBalance -= amount; // Reverter para obter saldo antes
        } else if (tx.type === TransactionType.Expense) {
          runningBalance += amount; // Reverter para obter saldo antes
        }
      }
    });

    // Gerar pontos do gráfico
    const data: ChartDataPoint[] = [];
    let currentDate = startDate;

    while (!isAfter(currentDate, endDate)) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const dayTransactions = transactionsByDate.get(dateKey) || [];
      const isProjected = isAfter(currentDate, today);

      // Aplicar transações do dia
      dayTransactions.forEach((tx) => {
        if (tx.status === TransactionStatus.Canceled) return;

        // Para projeções, incluir apenas transações agendadas
        if (isProjected && tx.status === TransactionStatus.Completed) return;

        // Para histórico, incluir apenas transações completadas
        if (!isProjected && tx.status !== TransactionStatus.Completed) return;

        const amount = Number(tx.amount);
        if (tx.type === TransactionType.Income) {
          runningBalance += amount;
        } else if (tx.type === TransactionType.Expense) {
          runningBalance -= amount;
        } else if (tx.type === TransactionType.BetweenAccounts) {
          // Entre contas não afeta o saldo geral
        }
      });

      data.push({
        date: currentDate,
        dateLabel: format(currentDate, 'dd/MM', { locale: ptBR }),
        balance: runningBalance,
        isProjected,
        transactions: dayTransactions,
      });

      currentDate = addDays(currentDate, 1);
    }

    return data;
  }, [transactions, initialBalance, daysBack, daysForward]);

  const currentBalance = chartData.find(
    (d) => format(d.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
  )?.balance;

  const projectedBalance = chartData[chartData.length - 1]?.balance;
  const balanceTrend =
    projectedBalance !== undefined && currentBalance !== undefined
      ? projectedBalance - currentBalance
      : 0;

  const minBalance = Math.min(...chartData.map((d) => d.balance));
  const maxBalance = Math.max(...chartData.map((d) => d.balance));
  const yDomain = [Math.floor(minBalance * 0.9), Math.ceil(maxBalance * 1.1)];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Projeção de Saldo</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Realizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-dashed border-blue-500 bg-transparent" />
              <span className="text-muted-foreground">Projetado</span>
            </div>
          </div>
        </div>
        {balanceTrend !== 0 && (
          <div
            className={`flex items-center gap-1 text-sm ${balanceTrend > 0 ? 'text-emerald-600' : 'text-red-600'}`}
          >
            {balanceTrend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>
              {balanceTrend > 0 ? '+' : ''}
              {formatCurrency(balanceTrend)} nos próximos {daysForward} dias
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient
                  id="balanceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="dateLabel"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => formatCurrency(value)}
                domain={yDomain}
                width={80}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const data = payload[0].payload as ChartDataPoint;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                      <p className="font-medium">
                        {format(data.date, "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p
                        className={`text-lg font-bold ${data.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}
                      >
                        {formatCurrency(data.balance)}
                      </p>
                      {data.isProjected && (
                        <p className="text-xs text-muted-foreground">
                          Saldo projetado
                        </p>
                      )}
                      {data.transactions.length > 0 && (
                        <div className="mt-2 border-t pt-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            {data.transactions.length} transação(ões)
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <ReferenceLine
                x={format(new Date(), 'dd/MM', { locale: ptBR })}
                stroke="hsl(var(--primary))"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: 'Hoje',
                  position: 'insideTopRight',
                  fill: 'hsl(var(--primary))',
                  fontSize: 12,
                  fontWeight: 600,
                  offset: 10,
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                fill="url(#balanceGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
