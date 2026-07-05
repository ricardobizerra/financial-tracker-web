'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { InvestmentRegimeSummaryFragmentFragment } from '@/graphql/graphql';
import { Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { investmentRegimeLabel } from '@/modules/investments/investment-regime-label';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface AllocationDonutChartProps {
  regimes?: InvestmentRegimeSummaryFragmentFragment[];
  loading?: boolean;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(142, 76%, 36%)',
  'hsl(217, 91%, 60%)',
  'hsl(280, 87%, 50%)',
  'hsl(48, 96%, 53%)',
  'hsl(340, 82%, 52%)',
];

export function AllocationDonutChart({
  regimes,
  loading,
}: AllocationDonutChartProps) {
  const pieData =
    regimes
      ?.filter((regime) => regime.taxedInvested > 0)
      ?.map((regime, index) => ({
        name:
          investmentRegimeLabel[
            regime.name as keyof typeof investmentRegimeLabel
          ] || regime.name,
        value: regime.taxedInvested,
        fill: COLORS[index % COLORS.length],
      })) || [];

  const chartConfig = pieData.reduce(
    (acc, entry, index) => {
      acc[entry.name] = {
        label: entry.name,
        color: entry.fill,
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>,
  );

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Alocação</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : pieData.length > 0 ? (
          <div className="h-[300px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto h-full w-full"
            >
              <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value, name, item) => (
                        <>
                          <div
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor: item.color || item.payload.fill,
                            }}
                          />
                          <div className="flex flex-1 items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              {name}
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
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  content={({ payload }) => (
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4">
                      {payload?.map((entry, index) => {
                        const data = pieData.find(
                          (d) => d.name === entry.value,
                        );
                        const percent = data
                          ? (data.value /
                              pieData.reduce((a, b) => a + b.value, 0)) *
                            100
                          : 0;
                        return (
                          <div
                            key={`item-${index}`}
                            className="flex items-center gap-2 text-xs"
                          >
                            <div
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-foreground">
                                {entry.value}:
                              </span>
                              <span className="text-muted-foreground opacity-80">
                                {percent.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </PieChart>
            </ChartContainer>
          </div>
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center text-center">
            <p className="font-medium text-muted-foreground">
              Sem dados de alocação
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
