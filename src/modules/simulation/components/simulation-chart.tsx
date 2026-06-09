'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import {
  SimulateBalanceForecastQuery,
  RealBalanceForecastQuery,
} from '../graphql/simulation-queries';
import { useSimulationStore } from '../hooks/use-simulation-store';
import { formatCurrency } from '@/lib/formatters/currency';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Regime,
  TransactionType,
  RecurrenceFrequency,
} from '@/graphql/graphql';
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
import { TrendingUp, TrendingDown, Loader2, FlaskConical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FALLBACK_COLOR = 'hsl(var(--primary))';

interface SimulationChartProps {
  accountId?: string;
}

export function SimulationChart({ accountId }: SimulationChartProps) {
  const { activeScenarioId, scenarios } = useSimulationStore();
  const scenario = scenarios.find((s) => s.id === activeScenarioId);

  const simTransactions = useMemo(() => {
    if (!scenario) return [];
    return scenario.items
      .filter((item) => item.kind === 'transaction')
      .map((item) => {
        const tx =
          item as import('../hooks/use-simulation-store').SimulatedTransactionItem;
        return {
          description: tx.description,
          amount: tx.amount,
          type: tx.type as unknown as TransactionType,
          date: new Date(tx.date + 'T03:00:00.000Z'),
          isRecurring: tx.isRecurring,
          recurrenceFrequency:
            tx.recurrenceFrequency as unknown as RecurrenceFrequency,
          recurrenceEndDate: tx.recurrenceEndDate
            ? new Date(tx.recurrenceEndDate + 'T03:00:00.000Z')
            : undefined,
          accountId: tx.accountId,
          destinyAccountId: tx.destinyAccountId,
        };
      });
  }, [scenario]);

  const simInvestments = useMemo(() => {
    if (!scenario) return [];
    return scenario.items
      .filter((item) => item.kind === 'investment')
      .map((item) => {
        const inv =
          item as import('../hooks/use-simulation-store').SimulatedInvestmentItem;
        return {
          description: inv.description,
          initialAmount: inv.initialAmount,
          annualRate: inv.annualRate,
          regime: inv.regime as unknown as Regime,
          startDate: new Date(inv.startDate + 'T03:00:00.000Z'),
          accountId: inv.accountId,
        };
      });
  }, [scenario]);

  const skipRealQuery = !scenario;
  const skipSimQuery =
    !scenario || (simTransactions.length === 0 && simInvestments.length === 0);

  const queryVariables = skipRealQuery
    ? undefined
    : {
        accountId,
        startDate: new Date(scenario!.dateRange.start + 'T03:00:00.000Z'),
        endDate: new Date(scenario!.dateRange.end + 'T03:00:00.000Z'),
      };

  const { data: realData, loading: realLoading } = useQuery(
    RealBalanceForecastQuery,
    {
      variables: queryVariables,
      skip: skipRealQuery,
    },
  );

  const {
    data: simData,
    loading: simLoading,
    error,
  } = useQuery(SimulateBalanceForecastQuery, {
    variables: skipSimQuery
      ? undefined
      : {
          input: {
            accountId,
            startDate: new Date(scenario!.dateRange.start + 'T03:00:00.000Z'),
            endDate: new Date(scenario!.dateRange.end + 'T03:00:00.000Z'),
            simulatedTransactions: simTransactions,
            simulatedInvestments: simInvestments,
          },
        },
    skip: skipSimQuery,
  });

  const loading = realLoading || simLoading;

  const realForecast = realData?.balanceForecast;
  const simForecast = simData?.simulateBalanceForecast;

  // Build chart data
  const chartDataByDate = new Map<string, any>();
  const availableAccounts: { id: string; name: string; color: string }[] = [];

  // 1. Process Real Forecast
  if (realForecast?.accountSeries) {
    realForecast.accountSeries.forEach((series) => {
      const color = series.color ?? FALLBACK_COLOR;
      if (!availableAccounts.find((a) => a.id === series.accountId)) {
        availableAccounts.push({
          id: series.accountId,
          name: series.accountName,
          color,
        });
      }

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
        existingPoint[`balance_real_${series.accountId}`] = point.balance;

        const txIds = new Set(existingPoint.transactions.map((t: any) => t.id));
        if (point.transactions && point.transactions.length > 0) {
          point.transactions.forEach((tx: any) => {
            if (!txIds.has(tx.id)) {
              existingPoint.transactions.push({
                ...tx,
                accountName: series.accountName,
              });
              txIds.add(tx.id);
            }
          });
        }
      });
    });
  }

  // 2. Process Sim Forecast
  if (simForecast?.accountSeries) {
    simForecast.accountSeries.forEach((series) => {
      const color = series.color ?? FALLBACK_COLOR;
      if (!availableAccounts.find((a) => a.id === series.accountId)) {
        availableAccounts.push({
          id: series.accountId,
          name: series.accountName,
          color,
        });
      }

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
        existingPoint[`balance_sim_${series.accountId}`] = point.balance;

        const txIds = new Set(existingPoint.transactions.map((t: any) => t.id));
        if (point.transactions && point.transactions.length > 0) {
          point.transactions.forEach((tx: any) => {
            if (!txIds.has(tx.id)) {
              existingPoint.transactions.push({
                ...tx,
                accountName: series.accountName,
              });
              txIds.add(tx.id);
            }
          });
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
        if (point[`balance_real_${account.id}`] !== undefined) {
          allBalances.push(point[`balance_real_${account.id}`]);
        }
        if (point[`balance_sim_${account.id}`] !== undefined) {
          allBalances.push(point[`balance_sim_${account.id}`]);
        }
      });
    });
    if (allBalances.length > 0) {
      minBalance = Math.min(...allBalances);
      maxBalance = Math.max(...allBalances);
    }
  }

  const hasNegativeBalance = minBalance < 0;
  const yDomain = [
    hasNegativeBalance ? Math.floor(minBalance * 1.1) : 0,
    Math.ceil(maxBalance * 1.1),
  ];

  const balanceTrend =
    simForecast?.accountSeries?.reduce(
      (sum, series) => sum + series.balanceTrend,
      0,
    ) ?? 0;

  // Chart height logic: dynamic based on number of accounts
  const chartHeight =
    availableAccounts.length > 3
      ? 300 + (availableAccounts.length - 3) * 50
      : 300;

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (!scenario) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">Nenhum cenário ativo</p>
            <p className="text-sm text-muted-foreground">
              Selecione ou crie um cenário para visualizar as projeções de
              saldo.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Erro ao carregar simulação</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-500/30">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Projeção Simulada</CardTitle>
            <Badge
              variant="outline"
              className="border-amber-500/50 text-xs text-amber-600"
            >
              <FlaskConical className="mr-1 h-3 w-3" />
              Simulação
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Real</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-dashed border-primary bg-transparent" />
              <span className="text-muted-foreground">Projetado/Simulado</span>
            </div>
          </div>
        </div>

        {!loading && balanceTrend !== 0 && (
          <div
            className={`flex items-center gap-1 text-sm ${
              balanceTrend > 0 ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {balanceTrend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>
              {balanceTrend > 0 ? '+' : ''}
              {formatCurrency(balanceTrend)} no período (simulado)
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div
            className={`flex h-[${chartHeight}px] items-center justify-center`}
            style={{ height: chartHeight }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length === 0 ? (
          <div
            className={`flex h-[${chartHeight}px] items-center justify-center`}
            style={{ height: chartHeight }}
          >
            <p className="text-muted-foreground">Nenhum dado no período</p>
          </div>
        ) : (
          <div className="mt-4 w-full" style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ left: 12, right: 12, top: 12, bottom: 20 }}
              >
                <defs>
                  {availableAccounts.map((account) => (
                    <linearGradient
                      key={`sim-gradient-${account.id}`}
                      id={`simBalanceGradient-${account.id}`}
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
                  tick={{
                    fontSize: 12,
                    fill: 'hsl(var(--muted-foreground))',
                  }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{
                    fontSize: 12,
                    fill: 'hsl(var(--muted-foreground))',
                  }}
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
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {format(point.date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                          {point.isProjected && (
                            <Badge
                              variant="outline"
                              className="h-4 border-amber-500/50 px-1 text-[10px] text-amber-600"
                            >
                              Simulado
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 space-y-2">
                          {availableAccounts.map((account) => {
                            const realVal = point[`balance_real_${account.id}`];
                            const simVal = point[`balance_sim_${account.id}`];
                            if (realVal === undefined && simVal === undefined)
                              return null;

                            const valToShow =
                              simVal !== undefined ? simVal : realVal;

                            return (
                              <div key={account.id} className="flex flex-col">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <div
                                      className="h-2.5 w-2.5 rounded-full"
                                      style={{
                                        backgroundColor: account.color,
                                      }}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {account.name}
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span
                                      className={`text-sm font-bold ${
                                        valToShow >= 0
                                          ? 'text-emerald-600'
                                          : 'text-red-600'
                                      }`}
                                    >
                                      {formatCurrency(valToShow)}
                                    </span>
                                    {simVal !== undefined &&
                                      realVal !== undefined &&
                                      simVal !== realVal && (
                                        <span className="text-[10px] text-muted-foreground">
                                          Real: {formatCurrency(realVal)}
                                        </span>
                                      )}
                                  </div>
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
                                        .map((tx: any, i: number) => (
                                          <div
                                            key={`${tx.id}-${i}`}
                                            className="flex items-center justify-between gap-3 text-xs"
                                          >
                                            <span className="flex-1 truncate text-muted-foreground">
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

                {/* 1. Real Areas (Solid line, filled background) */}
                {availableAccounts.map((account) => (
                  <Area
                    key={`real-area-${account.id}`}
                    type="monotone"
                    dataKey={`balance_real_${account.id}`}
                    name={`${account.name} (Real)`}
                    stroke={account.color}
                    fill={`url(#simBalanceGradient-${account.id})`}
                    strokeWidth={2}
                    activeDot={{ r: 4, strokeWidth: 0, fill: account.color }}
                  />
                ))}

                {/* 2. Sim Areas (Dashed line, no background) */}
                {availableAccounts.map((account) => (
                  <Area
                    key={`sim-area-${account.id}`}
                    type="monotone"
                    dataKey={`balance_sim_${account.id}`}
                    name={`${account.name} (Simulado)`}
                    stroke={account.color}
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="6 4"
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
