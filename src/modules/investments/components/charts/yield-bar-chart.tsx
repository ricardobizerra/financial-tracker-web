'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestmentRegimeSummaryFragmentFragment } from '@/graphql/graphql';
import { Loader2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ReferenceLine,
  LabelList,
} from 'recharts';
import { investmentRegimeLabel } from '@/modules/investments/investment-regime-label';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface YieldBarChartProps {
  regimes?: InvestmentRegimeSummaryFragmentFragment[];
  loading?: boolean;
}

const chartConfig = {
  yield: {
    label: 'Rentabilidade',
  },
};

export function YieldBarChart({ regimes, loading }: YieldBarChartProps) {
  const chartData =
    regimes
      ?.filter((regime) => regime.taxedInvested > 0)
      ?.map((regime) => {
        const yieldStr = regime.taxedInvestedPercentage
          .replace('%', '')
          .replace(',', '.');
        const yieldFloat = parseFloat(yieldStr) || 0;

        return {
          name:
            investmentRegimeLabel[
              regime.name as keyof typeof investmentRegimeLabel
            ] || regime.name,
          yield: yieldFloat,
          fill: yieldFloat < 0 ? 'hsl(0, 84%, 60%)' : 'hsl(var(--primary))',
        };
      }) || [];

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Rentabilidade por Regime</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                />
                <ReferenceLine
                  y={0}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
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
                              Rentabilidade
                            </span>
                            <span className="font-medium text-foreground">
                              {Number(value).toFixed(2).replace('.', ',')}%
                            </span>
                          </div>
                        </>
                      )}
                    />
                  }
                />
                <Bar dataKey="yield" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  <LabelList
                    dataKey="yield"
                    position="top"
                    formatter={(value: number) =>
                      `${value.toFixed(2).replace('.', ',')}%`
                    }
                    className="fill-foreground text-[11px] font-medium"
                  />
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center text-center">
            <p className="font-medium text-muted-foreground">
              Sem dados de rentabilidade
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
