'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { InvestmentEvolutionPointModel } from '@/graphql/graphql';
import { Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

interface EvolutionAreaChartProps {
  dataPoints?: InvestmentEvolutionPointModel[];
  loading?: boolean;
}

const chartConfig = {
  investido: {
    label: 'Total Investido',
    color: 'hsl(var(--muted-foreground))',
  },
  montante: {
    label: 'Saldo Líquido',
    color: 'hsl(var(--primary))',
  },
};

export function EvolutionAreaChart({
  dataPoints,
  loading,
}: EvolutionAreaChartProps) {
  const chartData =
    dataPoints?.map((point) => ({
      date: format(new Date(point.date), 'MMM/yy', { locale: ptBR }),
      investido: point.invested,
      montante: point.taxedAmount,
    })) || [];

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Evolução do Patrimônio</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[350px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-[350px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorInvestido"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-investido)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-investido)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorMontante"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-montante)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-montante)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={30}
                />
                <YAxis
                  tickFormatter={(value) =>
                    formatCurrency(value).replace(/[^\d.,-]/g, '')
                  }
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      formatter={(value, name, item) => (
                        <>
                          <div
                            className="h-2 w-2 shrink-0 rounded-[2px]"
                            style={{
                              backgroundColor:
                                item.color ||
                                item.payload.fill ||
                                'var(--color-' + name + ')',
                            }}
                          />
                          <div className="flex flex-1 items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              {name === 'investido'
                                ? 'Total Investido'
                                : 'Saldo Líquido'}
                            </span>
                            <span className="font-medium text-foreground">
                              {formatCurrency(value as number)}
                            </span>
                          </div>
                        </>
                      )}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="investido"
                  stroke="var(--color-investido)"
                  strokeWidth={2}
                  fill="url(#colorInvestido)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="montante"
                  stroke="var(--color-montante)"
                  strokeWidth={2}
                  fill="url(#colorMontante)"
                  dot={false}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex h-[350px] flex-col items-center justify-center gap-4 text-center">
            <p className="font-medium text-muted-foreground">
              Sem dados históricos
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
