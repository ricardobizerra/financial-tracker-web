'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery } from '@apollo/client';
import { InvestmentChartDataQuery } from '../graphql/investments-queries';
import {
  InvestmentFragmentFragment,
  SellFeasibilityStatus,
} from '@/graphql/graphql';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { formatPercentage } from '@/lib/formatters/percentage';
import { HelpCircle } from 'lucide-react';
import { VariationBadge } from '@/components/variation-badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export function InvestmentDetailsDialog({
  investment,
  open,
  onOpenChange,
}: {
  investment: InvestmentFragmentFragment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, loading } = useQuery(InvestmentChartDataQuery, {
    variables: { investmentId: investment.id },
    skip: !open,
  });

  const chartData =
    data?.investmentChartData?.map((d) => ({
      ...d,
      dateValue: new Date(d.date).getTime(),
      formattedDate: formatDate(new Date(d.date)),
    })) || [];

  const hasMarketValue = chartData.some(
    (d) => d.marketValue !== null && d.marketValue !== undefined,
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const theoreticalVal = payload.find(
        (p: any) => p.dataKey === 'theoreticalValue',
      )?.value;
      const marketVal = payload.find(
        (p: any) => p.dataKey === 'marketValue',
      )?.value;

      return (
        <div className="w-[260px] rounded-lg border bg-background/80 p-3 shadow-lg backdrop-blur-md">
          <div className="mb-2 border-b pb-2 text-sm font-medium text-foreground">
            {label}
          </div>
          <div className="flex flex-col gap-2">
            {theoreticalVal !== undefined && (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Curva:</span>
                </div>
                <span className="text-sm font-semibold">
                  {formatCurrency(theoreticalVal)}
                </span>
              </div>
            )}
            {hasMarketValue &&
              marketVal !== undefined &&
              marketVal !== null && (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      Mercado:
                    </span>
                  </div>
                  <span className="text-sm font-semibold">
                    {formatCurrency(marketVal)}
                  </span>
                </div>
              )}
            {investment.sellFeasibility?.status &&
              investment.sellFeasibility?.status !==
                SellFeasibilityStatus.NotApplicable && (
                <div className="mt-1 flex flex-col gap-1 rounded bg-muted/50 p-2">
                  <span
                    className={`text-xs font-medium ${
                      investment.sellFeasibility?.status ===
                      SellFeasibilityStatus.Favorable
                        ? 'text-emerald-500'
                        : investment.sellFeasibility?.status ===
                            SellFeasibilityStatus.Unfavorable
                          ? 'text-rose-500'
                          : 'text-muted-foreground'
                    }`}
                  >
                    Status:{' '}
                    {investment.sellFeasibility?.status ===
                    SellFeasibilityStatus.Favorable
                      ? 'Favorável'
                      : investment.sellFeasibility?.status ===
                          SellFeasibilityStatus.Unfavorable
                        ? 'Desfavorável'
                        : 'Neutro'}
                  </span>
                  <span className="text-wrap break-words text-[10px] leading-tight text-muted-foreground">
                    {investment.sellFeasibility?.message}
                  </span>
                </div>
              )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-muted/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Detalhes do Investimento
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Acompanhe o desempenho, taxas e as principais características da
            aplicação.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-6">
            {/* Top Row: Financials */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Resumo Financeiro
              </span>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-muted/50 bg-muted/50">
                <div className="flex flex-col gap-1 bg-background/50 p-3">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Valor Investido
                  </span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(investment.amount)}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1 bg-background/50 p-3">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Valor Bruto
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {formatCurrency(investment.correctedAmount)}
                    </span>
                    <VariationBadge
                      variation={investment.currentVariation}
                      size="xs"
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col items-start gap-1 bg-background/50 p-3">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Valor Líquido
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {formatCurrency(investment.taxedAmount)}
                    </span>
                    <VariationBadge
                      variation={investment.taxedVariation}
                      size="xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Characteristics */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Características
              </span>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-muted/50 bg-muted/50">
                <div className="col-span-2 flex flex-col justify-start gap-2 bg-background/50 p-3">
                  <div>
                    <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      Regime
                    </span>
                    <span className="text-sm font-medium">
                      {investment.regimePercentage &&
                      investment.regimeName === 'CDI'
                        ? `${investment.regimePercentage}% do `
                        : ''}
                      {investment.regimeName}
                      {investment.fixedRate && investment.type !== 'TREASURY'
                        ? ` + ${formatPercentage(investment.fixedRate)}`
                        : ''}
                    </span>
                  </div>
                  {investment.type === 'TREASURY' && (
                    <div className="mt-1 flex flex-col gap-1 rounded bg-background/50 p-2 text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Sua Taxa:</span>
                        <span className="text-right font-medium">
                          {investment.regimeName === 'PREFIXED'
                            ? investment.fixedRate
                              ? formatPercentage(investment.fixedRate)
                              : ''
                            : `${investment.regimeName}${
                                investment.fixedRate
                                  ? ` + ${formatPercentage(
                                      investment.fixedRate,
                                    )}`
                                  : ''
                              }`}
                        </span>
                      </div>
                      {investment.currentMarketRate !== null &&
                        investment.currentMarketRate !== undefined && (
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">
                              Mercado:
                            </span>
                            <span className="text-right font-medium">
                              {investment.regimeName === 'PREFIXED'
                                ? formatPercentage(investment.currentMarketRate)
                                : `${
                                    investment.regimeName
                                  } + ${formatPercentage(
                                    investment.currentMarketRate,
                                  )}`}
                            </span>
                          </div>
                        )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-start gap-1 bg-background/50 p-3">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Início
                  </span>
                  <span className="text-sm font-medium">
                    {formatDate(new Date(investment.startDate))}
                  </span>
                </div>
                <div className="flex flex-col gap-1 bg-background/50 p-3">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Vencimento
                  </span>
                  <span className="text-sm font-medium">
                    {investment.maturityDate
                      ? formatDate(new Date(investment.maturityDate))
                      : 'Não possui'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Taxes & Fees */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                Taxas e Impostos
              </span>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-muted/50 bg-muted/50">
                {investment.taxesAndFees?.details.map((tax, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-1 bg-background/50 p-3`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {tax.label}
                      </span>
                      {tax.reason && (
                        <HoverCard>
                          <HoverCardTrigger>
                            <HelpCircle className="h-3.5 w-3.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                          </HoverCardTrigger>
                          <HoverCardContent
                            className="w-64 bg-background/95 text-sm backdrop-blur-sm"
                            side="top"
                          >
                            {tax.reason}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </div>
                    <span className="text-sm font-medium text-rose-500/90">
                      -{formatCurrency(tax.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-[350px] w-full flex-col rounded-xl border border-muted/40 bg-gradient-to-b from-muted/10 to-transparent p-4">
            {loading ? (
              <div className="flex h-full flex-1 items-center justify-center">
                <span className="animate-pulse text-sm text-muted-foreground">
                  Carregando gráfico...
                </span>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="flex-1"
              >
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorTheoretical"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorMarket"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="formattedDate"
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    tickFormatter={(value) => value.substring(0, 5)}
                    minTickGap={30}
                    axisLine={false}
                    tickLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(value)}
                    tick={{ fontSize: 11, fill: 'currentColor' }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                    className="text-muted-foreground"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="theoreticalValue"
                    name="Valor na Curva"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTheoretical)"
                  />
                  {hasMarketValue && (
                    <Area
                      type="monotone"
                      dataKey="marketValue"
                      name="Valor de Mercado"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMarket)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-1 items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Nenhum dado disponível.
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
