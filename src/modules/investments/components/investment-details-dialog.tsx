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
import { InvestmentFragmentFragment } from '@/graphql/graphql';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Investimento</DialogTitle>
          <DialogDescription>
            Acompanhe a curva teórica do seu investimento (Marcação a Curva).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="h-64 w-full">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Carregando gráfico...
                </span>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="formattedDate"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.substring(0, 5)}
                    minTickGap={30}
                  />
                  <YAxis
                    tickFormatter={(value) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      'Valor',
                    ]}
                    labelFormatter={(label) => `Data: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="theoreticalValue"
                    name="Valor na Curva"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                  <Area
                    type="monotone"
                    dataKey="marketValue"
                    name="Valor de Mercado"
                    stroke="#3b82f6"
                    fillOpacity={0.5}
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Nenhum dado disponível.
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4 sm:grid-cols-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">IOF</span>
              <span className="text-sm font-medium text-destructive">
                -{formatCurrency(investment.taxesAndFees?.iofAmount || 0)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">IRPF</span>
              <span className="text-sm font-medium text-destructive">
                -{formatCurrency(investment.taxesAndFees?.irpfAmount || 0)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Taxa B3</span>
              <span className="text-sm font-medium text-destructive">
                -
                {formatCurrency(
                  investment.taxesAndFees?.b3CustodyFeeAmount || 0,
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Corretagem</span>
              <span className="text-sm font-medium text-destructive">
                -
                {formatCurrency(
                  investment.taxesAndFees?.brokerageFeeAmount || 0,
                )}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
