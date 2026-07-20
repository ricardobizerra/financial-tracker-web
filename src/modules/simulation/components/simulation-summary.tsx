'use client';

import { useSimulationStore } from '../hooks/use-simulation-store';
import { formatCurrency } from '@/lib/formatters/currency';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, PiggyBank, Activity } from 'lucide-react';
import { useMemo } from 'react';

export function SimulationSummary() {
  const { activeScenarioId, scenarios } = useSimulationStore();
  const scenario = scenarios.find((s) => s.id === activeScenarioId);

  const summary = useMemo(() => {
    if (!scenario) return null;
    const { items, dateRange } = scenario;

    const start = new Date(dateRange.start + 'T00:00:00');
    const end = new Date(dateRange.end + 'T00:00:00');

    let totalIncome = 0;
    let totalExpense = 0;
    let totalInvestment = 0;

    for (const item of items) {
      if (item.kind === 'transaction') {
        if (item.type === 'INCOME') {
          // Estimate occurrences for recurring
          if (!item.isRecurring) {
            const date = new Date(item.date + 'T00:00:00');
            if (date >= start && date <= end) {
              totalIncome += item.amount;
            }
          } else if (item.recurrenceFrequency) {
            const occurrences = countOccurrences(
              new Date(item.date + 'T00:00:00'),
              item.recurrenceEndDate
                ? new Date(item.recurrenceEndDate + 'T00:00:00')
                : end,
              start,
              end,
              item.recurrenceFrequency,
            );
            totalIncome += item.amount * occurrences;
          }
        } else {
          if (!item.isRecurring) {
            const date = new Date(item.date + 'T00:00:00');
            if (date >= start && date <= end) {
              totalExpense += item.amount;
            }
          } else if (item.recurrenceFrequency) {
            const occurrences = countOccurrences(
              new Date(item.date + 'T00:00:00'),
              item.recurrenceEndDate
                ? new Date(item.recurrenceEndDate + 'T00:00:00')
                : end,
              start,
              end,
              item.recurrenceFrequency,
            );
            totalExpense += item.amount * occurrences;
          }
        }
      } else {
        const date = new Date(item.startDate + 'T00:00:00');
        if (date >= start && date <= end) {
          totalInvestment += item.initialAmount;
        }
      }
    }

    return { totalIncome, totalExpense, totalInvestment };
  }, [scenario]);

  if (!scenario || !summary) return null;

  const netFlow =
    summary.totalIncome - summary.totalExpense - summary.totalInvestment;
  const startFmt = format(
    new Date(scenario.dateRange.start + 'T00:00:00'),
    "d 'de' MMM",
    { locale: ptBR },
  );
  const endFmt = format(
    new Date(scenario.dateRange.end + 'T00:00:00'),
    "d 'de' MMM",
    { locale: ptBR },
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Activity className="h-4 w-4" />
          Resumo do Cenário · {startFmt} → {endFmt}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SummaryCard
            label="Receitas simuladas"
            value={summary.totalIncome}
            icon={<ArrowUp className="h-4 w-4" />}
            color="text-emerald-600"
            bgColor="bg-emerald-500/10"
          />
          <SummaryCard
            label="Despesas simuladas"
            value={summary.totalExpense}
            icon={<ArrowDown className="h-4 w-4" />}
            color="text-red-500"
            bgColor="bg-red-500/10"
          />
          <SummaryCard
            label="Investimentos"
            value={summary.totalInvestment}
            icon={<PiggyBank className="h-4 w-4" />}
            color="text-blue-500"
            bgColor="bg-blue-500/10"
          />
          <SummaryCard
            label="Fluxo líquido"
            value={netFlow}
            icon={
              netFlow >= 0 ? (
                <TrendingUpIcon className="h-4 w-4" />
              ) : (
                <TrendingDownIcon className="h-4 w-4" />
              )
            }
            color={netFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}
            bgColor={netFlow >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}
            showSign
          />
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  color,
  bgColor,
  showSign,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  showSign?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border p-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full ${bgColor} ${color}`}
      >
        {icon}
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${color}`}>
        {showSign && value > 0 ? '+' : showSign && value < 0 ? '' : ''}
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function TrendingDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function countOccurrences(
  startDate: Date,
  stopDate: Date,
  rangeStart: Date,
  rangeEnd: Date,
  frequency: string,
): number {
  const effectiveEnd = stopDate < rangeEnd ? stopDate : rangeEnd;
  let count = 0;
  const cursor = new Date(startDate);

  while (cursor <= effectiveEnd) {
    if (cursor >= rangeStart) count++;

    switch (frequency) {
      case 'WEEKLY':
        cursor.setDate(cursor.getDate() + 7);
        break;
      case 'BI_WEEKLY':
        cursor.setDate(cursor.getDate() + 14);
        break;
      case 'MONTHLY':
        cursor.setMonth(cursor.getMonth() + 1);
        break;
      case 'YEARLY':
        cursor.setFullYear(cursor.getFullYear() + 1);
        break;
      default:
        cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  return count;
}
