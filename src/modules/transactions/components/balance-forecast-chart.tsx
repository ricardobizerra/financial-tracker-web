'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BalanceForecastPeriod } from '@/graphql/graphql';
import { BalanceForecastQuery } from '../graphql/balance-forecast-queries';
import { formatCurrency } from '@/lib/formatters/currency';
import { format } from 'date-fns';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { TrendingUp, TrendingDown, CalendarIcon, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BalanceForecastChartProps {
  accountId?: string;
}

const PERIOD_OPTIONS = [
  { value: BalanceForecastPeriod.Week, label: '1 Semana' },
  { value: BalanceForecastPeriod.Month, label: '1 Mês' },
  { value: BalanceForecastPeriod.ThreeMonths, label: '3 Meses' },
  { value: BalanceForecastPeriod.SixMonths, label: '6 Meses' },
  { value: BalanceForecastPeriod.Year, label: '1 Ano' },
  { value: BalanceForecastPeriod.Custom, label: 'Personalizado' },
];

export function BalanceForecastChart({ accountId }: BalanceForecastChartProps) {
  const [period, setPeriod] = useState<BalanceForecastPeriod>(
    BalanceForecastPeriod.ThreeMonths,
  );
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  const isCustomPeriod = period === BalanceForecastPeriod.Custom;

  const { data, loading, error } = useQuery(BalanceForecastQuery, {
    variables: {
      accountId,
      period,
      startDate: isCustomPeriod ? customStartDate : undefined,
      endDate: isCustomPeriod ? customEndDate : undefined,
    },
    skip: isCustomPeriod && (!customStartDate || !customEndDate),
  });

  const forecast = data?.balanceForecast;

  // Flatten the accountSeries data by date
  const chartDataByDate = new Map<string, any>();
  const availableAccounts: { id: string; name: string; color: string }[] = [];

  const FALLBACK_COLORS = [
    'hsl(var(--primary))',
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f43f5e', // rose
  ];

  if (forecast?.accountSeries) {
    forecast.accountSeries.forEach((series, idx) => {
      const color =
        series.color || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
      availableAccounts.push({
        id: series.accountId,
        name: series.accountName,
        color,
      });

      series.dataPoints.forEach((point) => {
        const dateKey = point.date.toString();

        if (!chartDataByDate.has(dateKey)) {
          chartDataByDate.set(dateKey, {
            date: new Date(point.date),
            dateLabel: format(new Date(point.date), 'dd/MM', { locale: ptBR }),
            isProjected: point.isProjected,
            transactions: [],
          });
        }

        const existingPoint = chartDataByDate.get(dateKey);
        existingPoint[`balance_${series.accountId}`] = point.balance;

        if (point.transactions && point.transactions.length > 0) {
          existingPoint.transactions.push(
            ...point.transactions.map((tx: any) => ({
              ...tx,
              accountName: series.accountName,
            })),
          );
        }
      });
    });
  }

  const chartData = Array.from(chartDataByDate.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  let minBalance = 0;
  let maxBalance = 0;

  if (chartData.length > 0) {
    const allBalances: number[] = [];
    chartData.forEach((point) => {
      availableAccounts.forEach((account) => {
        if (point[`balance_${account.id}`] !== undefined) {
          allBalances.push(point[`balance_${account.id}`]);
        }
      });
    });

    if (allBalances.length > 0) {
      minBalance = Math.min(...allBalances);
      maxBalance = Math.max(...allBalances);
    }
  }

  const hasNegativeBalance = minBalance < 0;

  // Se todos os valores são positivos, começar do 0
  // Se há negativos, dar margem de 10%
  const yDomain = [
    hasNegativeBalance ? Math.floor(minBalance * 1.1) : 0,
    Math.ceil(maxBalance * 1.1),
  ];

  // Sum balance trends across all returned series
  const balanceTrend =
    forecast?.accountSeries?.reduce(
      (sum, series) => sum + series.balanceTrend,
      0,
    ) || 0;

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">
            Erro ao carregar projeção de saldo
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CardTitle className="text-lg">Projeção de Saldo</CardTitle>

            {/* Period Selector */}
            <Select
              value={period}
              onValueChange={(value) =>
                setPeriod(value as BalanceForecastPeriod)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                {PERIOD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Custom Date Pickers */}
            {isCustomPeriod && (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        'w-[120px] justify-start text-left font-normal',
                        !customStartDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customStartDate
                        ? format(customStartDate, 'dd/MM/yy')
                        : 'Início'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customStartDate}
                      onSelect={setCustomStartDate}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">até</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        'w-[120px] justify-start text-left font-normal',
                        !customEndDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customEndDate
                        ? format(customEndDate, 'dd/MM/yy')
                        : 'Fim'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customEndDate}
                      onSelect={setCustomEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

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

        {!loading && balanceTrend !== 0 && (
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
              {formatCurrency(balanceTrend)} no período
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">
              {isCustomPeriod && (!customStartDate || !customEndDate)
                ? 'Selecione as datas de início e fim'
                : 'Nenhuma transação no período'}
            </p>
          </div>
        ) : (
          <div className="mt-4 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: 12, right: 12, top: 12, bottom: 20 }}
              >
                <defs>
                  {availableAccounts.map((account) => (
                    <linearGradient
                      key={`gradient-${account.id}`}
                      id={`balanceGradient-${account.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={account.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={account.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  ))}
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
                    const point = payload[0].payload as (typeof chartData)[0];
                    return (
                      <div className="max-w-xs rounded-lg border bg-background p-3 shadow-lg">
                        <p className="font-medium">
                          {format(point.date, "dd 'de' MMMM", { locale: ptBR })}
                          {point.isProjected && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (Projetado)
                            </span>
                          )}
                        </p>
                        <div className="mt-2 space-y-2">
                          {availableAccounts.map((account) => {
                            const val = point[`balance_${account.id}`];
                            if (val === undefined) return null;
                            return (
                              <div key={account.id} className="flex flex-col">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex min-w-[120px] items-center gap-1.5">
                                    <div
                                      className="h-2.5 w-2.5 rounded-full"
                                      style={{ backgroundColor: account.color }}
                                    />
                                    <span
                                      className="truncate text-xs text-muted-foreground"
                                      title={account.name}
                                    >
                                      {account.name}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-sm font-bold ${val >= 0 ? 'text-emerald-600' : 'text-red-600'}`}
                                  >
                                    {formatCurrency(val)}
                                  </span>
                                </div>
                                {point.transactions &&
                                  point.transactions.filter(
                                    (tx: any) =>
                                      tx.accountName === account.name,
                                  ).length > 0 && (
                                    <div className="ml-[5px] mt-1 border-l-2 border-muted pl-4">
                                      {point.transactions
                                        .filter(
                                          (tx: any) =>
                                            tx.accountName === account.name,
                                        )
                                        .map((tx: any) => (
                                          <div
                                            key={tx.id}
                                            className="flex items-center justify-between gap-3 text-xs"
                                          >
                                            <span className="w-[80px] flex-1 truncate text-muted-foreground">
                                              {tx.description}
                                            </span>
                                            <span
                                              className={`shrink-0 font-medium ${
                                                tx.isIncome
                                                  ? 'text-emerald-500'
                                                  : 'text-red-500'
                                              }`}
                                            >
                                              {tx.isIncome ? '+' : '-'}
                                              {formatCurrency(tx.amount)}
                                            </span>
                                          </div>
                                        ))}
                                    </div>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }}
                />
                <div />{' '}
                {/* Replaces Legend dynamically if needed, or we implement custom legend */}
                {/* Linha de referência Y=0 quando há valores negativos */}
                {hasNegativeBalance && (
                  <ReferenceLine
                    y={0}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 3"
                    strokeWidth={1}
                  />
                )}
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
                {availableAccounts.map((account) => (
                  <Area
                    key={`area-${account.id}`}
                    type="monotone"
                    dataKey={`balance_${account.id}`}
                    name={account.name}
                    stroke={account.color}
                    fill={`url(#balanceGradient-${account.id})`}
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 0, fill: account.color }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
