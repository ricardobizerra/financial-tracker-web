'use client';

import { useQuery } from '@apollo/client';
import {
  GetInvestmentQuery,
  InvestmentChartDataQuery,
} from '@/modules/investments/graphql/investments-queries';
import { Regime, SellFeasibilityStatus } from '@/graphql/graphql';
import { investmentRegimeLabel } from '@/modules/investments/investment-regime-label';
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
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvestmentStatusBadge } from './investment-status-badge';
import { InvestmentActions } from './investment-actions';

import { InvestmentTimeline } from './investment-timeline'; // Assuming we extract timeline from history details, wait, I'll just put it inline or keep history details component and use it.

export function InvestmentDetailsDrawer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const id = searchParams.get('investmentId');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('investmentId');
      router.push(`${pathname}?${newParams.toString()}`);
    }
  };

  if (!id) return null;

  return (
    <>
      {isDesktop ? (
        <Sheet open={!!id} onOpenChange={handleOpenChange}>
          <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl p-0 flex flex-col gap-0 border-l border-border/50">
            <SheetHeader className="px-6 py-4 border-b border-border/50 hidden">
              <SheetTitle>Detalhes do Investimento</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <InvestmentDetailsContent id={id} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={!!id} onOpenChange={handleOpenChange}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="hidden">
              <DrawerTitle>Detalhes do Investimento</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <InvestmentDetailsContent id={id} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

function InvestmentDetailsContent({ id }: { id: string }) {
  const { data: investmentData, loading: loadingInvestment } = useQuery(
    GetInvestmentQuery,
    {
      variables: { id },
    },
  );

  const { data: chartDataResponse, loading: loadingChart } = useQuery(
    InvestmentChartDataQuery,
    {
      variables: { investmentId: id },
    },
  );

  const investment = investmentData?.investment;

  const chartData =
    chartDataResponse?.investmentChartData?.map((d) => ({
      ...d,
      dateValue: new Date(d.date).getTime(),
      formattedDate: formatDate(new Date(d.date)),
    })) || [];

  const hasMarketValue = chartData.some(
    (d) => d.marketValue !== null && d.marketValue !== undefined,
  );

  if (loadingInvestment) {
    return (
      <div className="flex w-full animate-pulse flex-col gap-6">
        <div className="h-6 w-32 rounded bg-muted"></div>
        <div className="h-10 w-64 rounded bg-muted"></div>
        <div className="h-48 w-full rounded-xl bg-muted"></div>
      </div>
    );
  }

  if (!investment) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground/80">
          Investimento não encontrado.
        </p>
      </div>
    );
  }

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
            {investment?.sellFeasibility?.status &&
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

  const getInvestmentTitle = (inv: any) => {
    if (!inv) return 'Detalhes do Investimento';
    const regimeLabel =
      investmentRegimeLabel[inv.regimeName as Regime] || inv.regimeName;

    if (inv.type === 'TREASURY') {
      if (inv.maturityDate) {
        const year = new Date(inv.maturityDate).getFullYear();
        return `${regimeLabel} ${year}`;
      }
      return regimeLabel;
    }

    if (inv.regimeName === 'CDI') {
      return `${inv.regimePercentage}% do ${regimeLabel}`;
    }

    if (inv.regimeName === 'POUPANCA') {
      return 'Poupança';
    }

    return regimeLabel;
  };

  const getInvestmentSubtitle = (inv: any) => {
    if (!inv) return '';
    return inv.institutionLink?.institution?.name
      ? `Custódia: ${inv.institutionLink.institution.name}`
      : 'Registro Manual';
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {getInvestmentTitle(investment)}
            </h1>
            <p className="text-sm font-medium text-muted-foreground/80">
              {getInvestmentSubtitle(investment)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <InvestmentStatusBadge status={investment.status} />
            <InvestmentActions investment={investment} mode="inline" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Resumo & Gráfico
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
          >
            Histórico & Timeline
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Card 1: Saldo */}
            <div className="flex flex-col gap-4 rounded-xl border border-muted/40 bg-background p-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Saldo Líquido Atual
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold tracking-tight text-foreground">
                    {formatCurrency(investment?.taxedAmount || 0)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-muted/30 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Valor Bruto</span>
                  <span className="font-medium">
                    {formatCurrency(investment?.correctedAmount || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Aporte Inicial</span>
                  <span className="font-medium">
                    {formatCurrency(investment?.amount || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Rentabilidade */}
            <div className="flex flex-col gap-4 rounded-xl border border-muted/40 bg-background p-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Rentabilidade Líquida
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <VariationBadge
                    variation={investment?.taxedVariation || '0%'}
                    size="lg"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-muted/30 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rentab. Bruta</span>
                  <VariationBadge
                    variation={investment?.currentVariation || '0%'}
                    size="sm"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sua Taxa</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {investment?.fixedRate && investment?.type !== 'TREASURY'
                      ? `+ ${formatPercentage(investment.fixedRate)}`
                      : investment?.type === 'TREASURY'
                        ? formatPercentage(investment?.fixedRate || 0)
                        : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Prazos e Liquidez */}
            <div className="flex flex-col gap-4 rounded-xl border border-muted/40 bg-background p-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Vencimento
                </span>
                <span className="text-lg font-medium tracking-tight text-foreground">
                  {investment?.maturityDate
                    ? formatDate(new Date(investment.maturityDate))
                    : 'Não aplicável'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-muted/30 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Data Inicial</span>
                  <span className="font-medium">
                    {investment?.startDate
                      ? formatDate(new Date(investment.startDate))
                      : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duração</span>
                  <span className="font-medium">
                    {investment?.duration
                      ? `${investment.duration} dias`
                      : 'Indefinido'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Tributação */}
            <div className="flex flex-col gap-4 rounded-xl border border-muted/40 bg-background p-4 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Impostos Retidos
                </span>
                <span className="text-lg font-medium tracking-tight text-rose-500/90">
                  -
                  {formatCurrency(
                    investment?.taxesAndFees?.details?.reduce(
                      (acc: number, tax: any) => acc + tax.amount,
                      0,
                    ) || 0,
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-muted/30 pt-3">
                {investment?.taxesAndFees?.details?.length ? (
                  investment.taxesAndFees.details.map((tax: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground">{tax.label}</span>
                        {tax.reason && (
                          <HoverCard>
                            <HoverCardTrigger>
                              <HelpCircle className="h-3.5 w-3.5 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground" />
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
                      <span className="font-medium text-rose-500/90">
                        -{formatCurrency(tax.amount)}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Nenhum imposto a deduzir.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* HERO: Chart */}
          <div className="flex min-h-[350px] w-full flex-col rounded-xl border border-muted/40 bg-background p-4 shadow-sm">
            {loadingChart ? (
              <div className="flex h-full flex-1 items-center justify-center">
                <span className="animate-pulse text-sm text-muted-foreground">
                  Carregando gráfico...
                </span>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="min-h-[300px] flex-1"
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
                    <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
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
                    width={80}
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
                      name="Valor a Mercado"
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
                  Nenhum dado para exibir no gráfico
                </span>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
           <InvestmentTimeline investment={investment} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
