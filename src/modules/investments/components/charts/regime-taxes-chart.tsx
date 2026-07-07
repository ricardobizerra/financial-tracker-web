'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Regime } from '@/graphql/graphql';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@apollo/client';
import { RegimeTaxesHistoryQuery } from '../../graphql/investments-queries';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from '@/components/ui/chart';

interface RegimeTaxesChartProps {
  regime: Regime;
}

const getChartConfig = (regime: Regime): ChartConfig => {
  const isTreasury = [Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime);
  if (isTreasury) {
    return {
      selic: {
        label: 'Selic',
        color: 'hsl(var(--primary))',
      },
      ipca: {
        label: 'IPCA',
        color: '#f97316', // orange-500
      },
    };
  }
  
  const label = regime === Regime.Cdi ? 'CDI' : 'Poupança';
  return {
    value: {
      label,
      color: 'hsl(var(--primary))',
    },
  };
};

export function RegimeTaxesChart({ regime }: RegimeTaxesChartProps) {
  const { data, loading } = useQuery(RegimeTaxesHistoryQuery, {
    variables: { regime },
  });

  const chartConfig = getChartConfig(regime);

  const chartData =
    data?.regimeTaxesHistory.dataPoints?.map((point) => {
      // Data format is typically YYYY-MM-DD
      const date = new Date(point.date);
      // Adding timezone offset to avoid being offset to previous day
      const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      
      const res: any = {
        date: format(adjustedDate, 'MMM/yy', { locale: ptBR }),
        rawDate: point.date,
        timestamp: adjustedDate.getTime(),
      };

      const isTreasury = [Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime);
      if (isTreasury) {
        res.selic = point.component1;
        res.ipca = point.component2;
      } else {
        res.value = point.value;
      }

      return res;
    }) || [];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">
          {[Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime) ? 'Taxas de Referência' : 'Evolução da Taxa'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
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
                    className="text-xs text-muted-foreground"
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
                  {[Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime) && (
                    <Line
                      type="monotone"
                      dataKey="selic"
                      stroke="var(--color-selic)"
                      strokeWidth={2}
                      dot={false}
                      connectNulls={true}
                    />
                  )}
                  {[Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime) && (
                    <Line
                      type="monotone"
                      dataKey="ipca"
                      stroke="var(--color-ipca)"
                      strokeWidth={2}
                      dot={false}
                      connectNulls={true}
                    />
                  )}
                  {![Regime.Ipca, Regime.Selic, Regime.Prefixed].includes(regime) && (
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-value)"
                      strokeWidth={2}
                      dot={false}
                      connectNulls={true}
                    />
                  )}
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex h-[350px] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              Não há histórico de taxas disponível para este regime.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
