'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Regime } from '@/graphql/graphql';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@apollo/client';
import { InvestmentTaxesHistoryQuery, InvestmentsQuery } from '../../graphql/investments-queries';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartConfig = {
  total: {
    label: 'Total',
    color: '#10b981', // emerald-500
  },
  fixo: {
    label: 'Spread / Fixo',
    color: '#6366f1', // indigo-500
  },
  variavel: {
    label: 'IPCA / Selic',
    color: '#f97316', // orange-500
  },
};

export function InvestmentTaxesChart({ regime }: { regime: Regime }) {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | undefined>();

  // Fetch user's active treasury investments for this regime
  const { data: investmentsData, loading: loadingInvestments } = useQuery(InvestmentsQuery, {
    variables: { regime, first: 100 },
  });

  const investments = investmentsData?.investments?.edges?.map((e) => e?.node) || [];
  
  // Set first investment as default when loaded
  useEffect(() => {
    if (investments.length > 0 && !selectedInvestmentId) {
      setSelectedInvestmentId(investments[0]?.id as string);
    }
  }, [investments, selectedInvestmentId]);

  const { data: historyData, loading: loadingHistory } = useQuery(InvestmentTaxesHistoryQuery, {
    variables: { investmentId: selectedInvestmentId || '' },
    skip: !selectedInvestmentId,
  });

  const chartData =
    historyData?.investmentTaxesHistory.dataPoints?.map((point) => {
      const date = new Date(point.date);
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      
      return {
        date: format(adjustedDate, 'MMM/yy', { locale: ptBR }),
        rawDate: point.date,
        timestamp: adjustedDate.getTime(),
        total: point.total,
        fixo: point.component1,
        variavel: point.component2,
      };
    }) || [];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Decomposição do Título</CardTitle>
        <div className="w-[180px]">
          <Select
            value={selectedInvestmentId}
            onValueChange={setSelectedInvestmentId}
            disabled={loadingInvestments || investments.length === 0}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {investments.map((inv) => {
                const dateLabel = inv?.startDate ? format(new Date(inv.startDate), 'MMM/yyyy', { locale: ptBR }) : '';
                const amountLabel = inv?.amount ? inv.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
                return (
                  <SelectItem key={inv?.id as string} value={inv?.id as string}>
                    {inv?.regimeName} - {amountLabel} ({dateLabel})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {loadingHistory || loadingInvestments ? (
          <div className="flex h-[350px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-[350px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted/50"
                  />
                  <XAxis
                    dataKey="timestamp"
                    type="number"
                    scale="time"
                    domain={['dataMin', 'dataMax']}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return format(date, 'MMM/yy', { locale: ptBR });
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value.toLocaleString('pt-BR')}%`}
                    className="text-xs text-muted-foreground"
                    domain={['auto', 'auto']}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-total)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="4 4"
                    connectNulls={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="fixo"
                    stroke="var(--color-fixo)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls={true}
                  />
                  <Line
                    type="monotone"
                    dataKey="variavel"
                    stroke="var(--color-variavel)"
                    strokeWidth={2}
                    dot={false}
                    connectNulls={true}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex h-[350px] flex-col items-center justify-center gap-2 text-center">
            {selectedInvestmentId ? (
              <p className="text-sm text-muted-foreground">
                Não há histórico detalhado para este título.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Selecione um título para ver a decomposição.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
