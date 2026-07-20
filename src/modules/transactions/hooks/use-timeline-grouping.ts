import { useMemo } from 'react';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import {
  format,
  isToday,
  isYesterday,
  isTomorrow,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export type TimelineGroup =
  | {
      type: 'day';
      dateStr: string;
      fullDate: string;
      relativeLabel: string;
      isToday: boolean;
      transactions: TransactionFragmentFragment[];
    }
  | {
      type: 'empty-range';
      startDate: Date;
      endDate: Date;
      startDateStr: string;
      endDateStr: string;
      count: number;
      isToday?: boolean;
      startRelativeLabel?: string;
      endRelativeLabel?: string;
    };

export function useTimelineGrouping(
  transactions: TransactionFragmentFragment[],
) {
  const groupedTransactions = useMemo(() => {
    if (transactions.length === 0) return [];

    const groups: Record<string, TransactionFragmentFragment[]> = {};

    transactions.forEach((tx) => {
      const dateStr = tx.date.split('T')[0];
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(tx);
    });

    // Encontrar o intervalo de datas carregado
    const dates = transactions.map((tx) => parseISO(tx.date.split('T')[0]));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));

    // Gerar todos os dias no intervalo (ordenado do mais recente para o mais antigo)
    const allDays = eachDayOfInterval({
      start: minDate,
      end: maxDate,
    }).reverse();

    const result: TimelineGroup[] = [];
    let currentEmptyRange: Extract<
      TimelineGroup,
      { type: 'empty-range' }
    > | null = null;

    allDays.forEach((dateObj) => {
      const dateStr = format(dateObj, 'yyyy-MM-dd');
      const dayTransactions = groups[dateStr] || [];
      const isDayToday = isToday(dateObj);

      const getRelativeLabel = (d: Date) => {
        if (isToday(d)) return 'Hoje';
        if (isYesterday(d)) return 'Ontem';
        if (isTomorrow(d)) return 'Amanhã';
        return '';
      };

      const relativeLabel = getRelativeLabel(dateObj);

      if (dayTransactions.length > 0) {
        if (currentEmptyRange) {
          result.push(currentEmptyRange);
          currentEmptyRange = null;
        }

        result.push({
          type: 'day',
          dateStr,
          fullDate: format(dateObj, "dd 'de' MMMM", { locale: ptBR }),
          relativeLabel,
          isToday: isDayToday,
          transactions: dayTransactions,
        });
      } else {
        if (!currentEmptyRange) {
          currentEmptyRange = {
            type: 'empty-range',
            endDate: dateObj,
            startDate: dateObj,
            endDateStr: dateStr,
            startDateStr: dateStr,
            count: 1,
            isToday: isDayToday,
            endRelativeLabel: relativeLabel,
          };
        } else {
          currentEmptyRange.startDate = dateObj;
          currentEmptyRange.startDateStr = dateStr;
          currentEmptyRange.count++;
          if (isDayToday) currentEmptyRange.isToday = true;
          if (relativeLabel)
            currentEmptyRange.startRelativeLabel = relativeLabel;
        }
      }
    });

    if (currentEmptyRange) {
      result.push(currentEmptyRange);
    }

    return result;
  }, [transactions]);

  return groupedTransactions;
}
