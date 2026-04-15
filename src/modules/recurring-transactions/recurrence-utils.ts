import { RecurrenceFrequency, DayMode } from '@/graphql/graphql';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

// Helper function to get week ordinal in Portuguese
export const getWeekOrdinal = (week: number): string => {
  const ordinals = ['', '1ª', '2ª', '3ª', '4ª', '5ª'];
  return ordinals[week] || '';
};

// Helper function to generate recurrence summary
export const getRecurrenceSummary = (
  frequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
  selectedDate?: Date | null,
): string => {
  const dayName = getDayOfWeekName(dayOfWeek);
  const weekOrdinal = getWeekOrdinal(weekOfMonth);

  switch (frequency) {
    case RecurrenceFrequency.Weekly:
      return `Toda semana às ${dayName}s`;
    case RecurrenceFrequency.BiWeekly:
      return `A cada duas semanas às ${dayName}s`;
    case RecurrenceFrequency.Monthly:
    case RecurrenceFrequency.Yearly: {
      const periodText =
        frequency === RecurrenceFrequency.Monthly ? 'todo mês' : 'todo ano';
      switch (dayMode) {
        case DayMode.SpecificDay:
          if (selectedDate) {
            const dayFormat =
              frequency === RecurrenceFrequency.Monthly ? 'dd' : "dd 'de' MMMM";
            return `Esta transação será repetida ${periodText} no dia ${format(selectedDate, dayFormat, { locale: ptBR })}`;
          }
          return `Esta transação será repetida ${periodText}`;
        case DayMode.LastDay:
          return `Esta transação será repetida no último dia de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.LastBusinessDay:
          return `Esta transação será repetida no último dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.FirstBusinessDay:
          return `Esta transação será repetida no primeiro dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.NthWeekday:
          return `Esta transação será repetida na ${weekOrdinal} ${dayName} de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        default:
          return `Esta transação será repetida ${periodText}`;
      }
    }
    default:
      return 'Esta transação será repetida';
  }
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
