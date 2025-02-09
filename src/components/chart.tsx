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
}

export function Chart<TData>({
  data,
  config,
  type,
  tooltip = { indicator: 'line' },
}: ChartProps<TData>) {
  const SelectedChart = chartTypes[type];

  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      <SelectedChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        {type !== 'pie' && (
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        )}
        {!!tooltip && (
          <ChartTooltip
            content={<ChartTooltipContent indicator={tooltip.indicator} />}
          />
        )}
        {/* <ChartLegend content={<ChartLegendContent />} /> */}

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
