import { RecurrenceFrequency } from '@/graphql/graphql';

export const recurrenceFrequencyLabels: Record<RecurrenceFrequency, string> = {
  [RecurrenceFrequency.Monthly]: 'Mensal',
  [RecurrenceFrequency.Yearly]: 'Anual',
};

export const monthLabels: Record<number, string> = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
};
