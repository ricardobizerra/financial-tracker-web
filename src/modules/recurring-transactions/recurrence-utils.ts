import {
  addWeeks,
  addMonths,
  addYears,
  lastDayOfMonth,
  isWeekend,
  subDays,
  addDays,
  startOfMonth,
  getDay,
  isBefore,
  isSameDay,
  setDay,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RecurrenceFrequency, DayMode } from '@/graphql/graphql';

export interface RecurrenceData {
  frequency: RecurrenceFrequency;
  dayMode: DayMode;
  dayOfWeek: number;
  weekOfMonth: number;
  stopCondition: 'INFINITE' | 'UNTIL_DATE' | 'REPEATS';
  endDate?: Date;
  repeatCount?: number;
}

// Helper function to get day of week name in Portuguese
export const getDayOfWeekName = (dayOfWeek: number): string => {
  const days = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];
  return days[dayOfWeek] || '';
};

// ... (rest of previous helpers)

export const generatePreviewDates = (
  startDate: Date,
  data: RecurrenceData,
  maxPreview: number = 12,
): Date[] => {
  const occurrences: Date[] = [];
  const currentBaseDate = new Date(startDate);

  const limit =
    data.stopCondition === 'REPEATS'
      ? Math.min(data.repeatCount || 0, 24)
      : maxPreview;

  const endDateLimit =
    data.stopCondition === 'UNTIL_DATE' ? data.endDate : null;

  for (let i = 0; i < limit; i++) {
    let nextDate: Date | null = null;

    if (data.frequency === RecurrenceFrequency.Weekly) {
      nextDate = addWeeks(currentBaseDate, i);
      nextDate = setDay(nextDate, data.dayOfWeek);
    } else if (data.frequency === RecurrenceFrequency.BiWeekly) {
      nextDate = addWeeks(currentBaseDate, i * 2);
      nextDate = setDay(nextDate, data.dayOfWeek);
    } else {
      // Monthly or Yearly
      const monthsToAdd =
        data.frequency === RecurrenceFrequency.Monthly ? i : i * 12;
      const baseMonth = addMonths(currentBaseDate, monthsToAdd);

      switch (data.dayMode) {
        case DayMode.SpecificDay:
          nextDate = baseMonth; // Uses the same day as start date
          break;
        case DayMode.LastDay:
          nextDate = lastDayOfMonth(baseMonth);
          break;
        case DayMode.LastBusinessDay: {
          let date = lastDayOfMonth(baseMonth);
          while (isWeekend(date)) {
            date = subDays(date, 1);
          }
          nextDate = date;
          break;
        }
        case DayMode.FirstBusinessDay: {
          let date = startOfMonth(baseMonth);
          while (isWeekend(date)) {
            date = addDays(date, 1);
          }
          nextDate = date;
          break;
        }
        case DayMode.NthWeekday: {
          const first = startOfMonth(baseMonth);
          let date = first;
          const count = 0;
          // Find first instance of the weekday
          while (getDay(date) !== data.dayOfWeek) {
            date = addDays(date, 1);
          }
          // Add weeks
          date = addWeeks(date, data.weekOfMonth - 1);
          // Ensure still in same month
          if (date.getMonth() === baseMonth.getMonth()) {
            nextDate = date;
          } else {
            // Fallback to last occurrence if 5th week doesn't exist
            nextDate = subDays(date, 7);
          }
          break;
        }
      }
    }

    if (nextDate) {
      // Don't include dates before start date if they were calculated by shifting
      if (isBefore(nextDate, startDate) && !isSameDay(nextDate, startDate)) {
        continue;
      }
      if (endDateLimit && isBefore(endDateLimit, nextDate)) {
        break;
      }
      occurrences.push(nextDate);
    }
  }

  return occurrences;
};

// Helper function to get week ordinal in Portuguese
export const getWeekOrdinal = (week: number): string => {
  const ordinals = ['', '1ª', '2ª', '3ª', '4ª', '5ª'];
  return ordinals[week] || '';
};

// Helper function to generate recurrence summary
// Helper function to generate recurrence summary
export const getRecurrenceSummary = (
  frequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
  selectedDate?: Date | null,
  stopCondition?: 'INFINITE' | 'UNTIL_DATE' | 'REPEATS',
  repeatCount?: number,
  endDate?: Date | null,
): string => {
  const dayName = getDayOfWeekName(dayOfWeek);
  const weekOrdinal = getWeekOrdinal(weekOfMonth);

  let prefix = 'Essa transação será repetida';

  if (stopCondition === 'REPEATS' && repeatCount) {
    prefix = `Essa transação será repetida ${repeatCount} vezes`;
  } else if (stopCondition === 'UNTIL_DATE' && endDate) {
    prefix = `Essa transação será repetida até ${format(endDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}`;
  }

  let recurrenceText = '';
  switch (frequency) {
    case RecurrenceFrequency.Weekly:
      recurrenceText = `toda semana às ${dayName}s`;
      break;
    case RecurrenceFrequency.BiWeekly:
      recurrenceText = `a cada duas semanas às ${dayName}s`;
      break;
    case RecurrenceFrequency.Monthly:
    case RecurrenceFrequency.Yearly: {
      const periodText =
        frequency === RecurrenceFrequency.Monthly ? 'todo mês' : 'todo ano';
      switch (dayMode) {
        case DayMode.SpecificDay:
          if (selectedDate) {
            const dayFormat =
              frequency === RecurrenceFrequency.Monthly ? 'dd' : "dd 'de' MMMM";
            recurrenceText = `${periodText}, no dia ${format(selectedDate, dayFormat, { locale: ptBR })}`;
          } else {
            recurrenceText = periodText;
          }
          break;
        case DayMode.LastDay:
          recurrenceText = `no último dia de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
          break;
        case DayMode.LastBusinessDay:
          recurrenceText = `no último dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
          break;
        case DayMode.FirstBusinessDay:
          recurrenceText = `no primeiro dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
          break;
        case DayMode.NthWeekday:
          recurrenceText = `na ${weekOrdinal} ${dayName} de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
          break;
        default:
          recurrenceText = periodText;
      }
      break;
    }
    default:
      recurrenceText = 'conforme configurado';
  }

  return `${prefix}, ${recurrenceText}`;
};

// Helper function for toast description
export const getRecurrenceDescription = (
  frequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
): string => {
  const dayName = getDayOfWeekName(dayOfWeek);
  const weekOrdinal = getWeekOrdinal(weekOfMonth);

  switch (frequency) {
    case RecurrenceFrequency.Weekly:
      return `Será repetida toda ${dayName}`;
    case RecurrenceFrequency.BiWeekly:
      return `Será repetida a cada duas semanas`;
    case RecurrenceFrequency.Monthly:
    case RecurrenceFrequency.Yearly: {
      const periodText =
        frequency === RecurrenceFrequency.Monthly
          ? 'mensalmente'
          : 'anualmente';
      switch (dayMode) {
        case DayMode.LastDay:
          return `Será repetida no último dia de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.LastBusinessDay:
          return `Será repetida no último dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.FirstBusinessDay:
          return `Será repetida no primeiro dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.NthWeekday:
          return `Será repetida na ${weekOrdinal} ${dayName} de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        default:
          return `Será repetida ${periodText}`;
      }
    }
    default:
      return 'Será repetida';
  }
};
