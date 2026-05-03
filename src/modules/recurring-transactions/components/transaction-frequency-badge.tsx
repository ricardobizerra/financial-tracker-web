'use client';

import { Badge } from '@/components/ui/badge';
import { RecurrenceFrequency, DayMode } from '@/graphql/graphql';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionFrequencyBadgeProps {
  frequency: RecurrenceFrequency;
  dayMode: DayMode;
  dayOfMonth?: number | null;
  dayOfWeek?: number | null;
  weekOfMonth?: number | null;
  monthOfYear?: number | null;
  className?: string;
}

export function TransactionFrequencyBadge({
  frequency,
  dayMode,
  dayOfMonth,
  dayOfWeek,
  weekOfMonth,
  monthOfYear,
  className,
}: TransactionFrequencyBadgeProps) {
  const getFrequencyLabel = () => {
    const frequencyMap: Record<RecurrenceFrequency, string> = {
      [RecurrenceFrequency.Weekly]: 'Semanal',
      [RecurrenceFrequency.BiWeekly]: 'Quinzenal',
      [RecurrenceFrequency.Monthly]: 'Mensal',
      [RecurrenceFrequency.Yearly]: 'Anual',
    };

    return frequencyMap[frequency] || frequency;
  };

  const getDayLabel = () => {
    if (
      frequency === RecurrenceFrequency.Weekly ||
      frequency === RecurrenceFrequency.BiWeekly
    ) {
      const days = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ];
      return dayOfWeek !== null && dayOfWeek !== undefined
        ? days[dayOfWeek]
        : '';
    }

    if (dayMode === DayMode.LastDay) return 'Último dia';
    if (dayMode === DayMode.LastBusinessDay) return 'Último dia útil';
    if (dayMode === DayMode.FirstBusinessDay) return '1º dia útil';

    if (dayMode === DayMode.NthWeekday) {
      const ordinals = ['', '1ª', '2ª', '3ª', '4ª', '5ª'];
      const days = [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
      ];
      const ordinal =
        weekOfMonth !== null && weekOfMonth !== undefined
          ? ordinals[weekOfMonth]
          : '';
      const day =
        dayOfWeek !== null && dayOfWeek !== undefined ? days[dayOfWeek] : '';
      return `${ordinal} ${day}`;
    }

    // Specific Day
    if (frequency === RecurrenceFrequency.Yearly && monthOfYear) {
      const months = [
        '',
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
      return `${dayOfMonth} de ${months[monthOfYear]}`;
    }

    return dayOfMonth ? `Dia ${dayOfMonth}` : '';
  };

  const label = getFrequencyLabel();
  const detail = getDayLabel();

  return (
    <Badge
      variant="secondary"
      className={cn(
        'h-7 cursor-default gap-1.5 border-none bg-zinc-100 px-2 font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
        className,
      )}
    >
      <Calendar className="h-3.5 w-3.5 opacity-60" />
      <span>
        {label}
        {detail && <span className="mx-1 opacity-40">•</span>}
        {detail && <span className="font-normal opacity-80">{detail}</span>}
      </span>
    </Badge>
  );
}
