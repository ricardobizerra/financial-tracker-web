import { InstitutionType, CardType } from '@/graphql/graphql';

export const institutionTypeLabels: Record<InstitutionType, string> = {
  CHECKING: 'Conta Corrente',
  INVESTMENT: 'Investimentos',
  CARD: 'Cartão de Crédito',
} as const;

export const cardTypeLabels: Record<CardType, string> = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito',
} as const;
