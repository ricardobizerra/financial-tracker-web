import { AccountType, CardType } from '@/graphql/graphql';

export const accountTypeLabels: Record<AccountType, string> = {
  CHECKING: 'Conta Corrente',
  SAVINGS: 'Conta Poupança',
  INVESTMENT: 'Investimentos',
  CREDIT_CARD: 'Cartão de Crédito',
  WALLET: 'Carteira Digital',
  OTHER: 'Outro',
} as const;

export const cardTypeLabels: Record<CardType, string> = {
  CREDIT: 'Crédito',
  DEBIT: 'Débito',
} as const;
