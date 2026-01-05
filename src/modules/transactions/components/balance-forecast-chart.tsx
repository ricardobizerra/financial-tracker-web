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

  const chartData =
    forecast?.dataPoints?.map((point) => ({
      date: new Date(point.date),
      dateLabel: format(new Date(point.date), 'dd/MM', { locale: ptBR }),
      balance: point.balance,
      isProjected: point.isProjected,
      incomeAmount: point.incomeAmount,
      expenseAmount: point.expenseAmount,
      transactionCount: point.transactionCount,
      transactions: point.transactions,
    })) || [];

  const minBalance =
    chartData.length > 0 ? Math.min(...chartData.map((d) => d.balance)) : 0;
  const maxBalance =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.balance)) : 0;
  const hasNegativeBalance = minBalance < 0;

  // Se todos os valores são positivos, começar do 0
  // Se há negativos, dar margem de 10%
  const yDomain = [
    hasNegativeBalance ? Math.floor(minBalance * 1.1) : 0,
    Math.ceil(maxBalance * 1.1),
  ];

  const balanceTrend = forecast?.balanceTrend || 0;

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
                    const point = payload[0].payload as (typeof chartData)[0];
                    return (
                      <div className="max-w-xs rounded-lg border bg-background p-3 shadow-lg">
                        <p className="font-medium">
                          {format(point.date, "dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        <p
                          className={`text-lg font-bold ${point.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}
                        >
                          {formatCurrency(point.balance)}
                        </p>
                        {point.isProjected && (
                          <p className="text-xs text-muted-foreground">
                            Saldo projetado
                          </p>
                        )}
                        {point.transactions &&
                          point.transactions.length > 0 && (
                            <div className="mt-2 space-y-1 border-t pt-2">
                              {point.transactions.map((tx) => (
                                <div
                                  key={tx.id}
                                  className="flex items-center justify-between gap-3 text-sm"
                                >
                                  <span className="truncate text-muted-foreground">
                                    {tx.description}
                                  </span>
                                  <span
                                    className={`shrink-0 font-medium ${
                                      tx.isIncome
                                        ? 'text-emerald-600'
                                        : 'text-red-600'
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
                  }}
                />
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
        )}
      </CardContent>
    </Card>
  );
}
