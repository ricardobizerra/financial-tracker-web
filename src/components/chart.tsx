'use client';

import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

const chartTypes = {
  bar: BarChart,
  line: LineChart,
  area: AreaChart,
  pie: PieChart,
};

type ChartType = keyof typeof chartTypes;

interface ChartProps<TData> {
  data: TData[];
  config: ChartConfig;
  type: ChartType;
  tooltip?: {
    indicator: 'line' | 'dot' | 'dashed';
  };
  legend?: boolean;
  xAxis?: boolean;
  yAxis?: boolean;
}

export function Chart<TData>({
  data,
  config,
  type,
  tooltip = { indicator: 'line' },
  legend = true,
  xAxis = true,
  yAxis = false,
}: ChartProps<TData>) {
  const SelectedChart = chartTypes[type];

  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      <SelectedChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />

        {type !== 'pie' && !!xAxis && (
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        )}

        {type !== 'pie' && !!yAxis && (
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => formatNumberWithSuffix(value as number)}
          />
        )}

        {!!tooltip && (
          <ChartTooltip
            content={<ChartTooltipContent indicator={tooltip.indicator} />}
          />
        )}

        {!!legend && <ChartLegend content={<ChartLegendContent />} />}

        {type === 'bar' &&
          Object.keys(config).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              radius={4}
            />
          ))}

        {type === 'line' &&
          Object.keys(config).map((key) => (
            <Line
              key={key}
              dataKey={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
            />
          ))}

        {type === 'area' &&
          Object.keys(config).map((key) => (
            <Area
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
            />
          ))}

        {type === 'pie' &&
          Object.keys(config).map((key) => (
            <Pie
              dataKey={key}
              data={data.map((value, index) => ({
                ...value,
                fill: `hsl(var(--chart-${(index % 3) + 1}))`,
              }))}
              nameKey="month"
              key={key}
            >
              <LabelList
                dataKey="month"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof config) => value}
              />
            </Pie>
          ))}
      </SelectedChart>
    </ChartContainer>
  );
}

function formatNumberWithSuffix(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1_000_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}
