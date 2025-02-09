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
  Line,
  LineChart,
  XAxis,
} from 'recharts';

const chartTypes = {
  bar: { chart: BarChart, element: Bar },
  line: { chart: LineChart, element: Line },
  area: { chart: AreaChart, element: Area },
};

type ChartType = keyof typeof chartTypes;

interface ChartProps<TData> {
  data: TData[];
  config: ChartConfig;
  type: ChartType;
}

export function Chart<TData>({ data, config, type }: ChartProps<TData>) {
  const SelectedChart = chartTypes[type].chart;
  const SelectedElement = chartTypes[type].element;

  return (
    <ChartContainer config={config} className="min-h-[200px] w-full">
      <SelectedChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <SelectedElement
          dataKey="desktop"
          fill="var(--color-desktop)"
          stroke="var(--color-desktop)"
          radius={4}
        />
        <SelectedElement
          dataKey="mobile"
          fill="var(--color-mobile)"
          stroke="var(--color-mobile)"
          radius={4}
        />
      </SelectedChart>
    </ChartContainer>
  );
}
