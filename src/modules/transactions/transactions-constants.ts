import { TransactionStatus, TransactionType } from '@/graphql/graphql';

export const transactionTypeLabels: Record<TransactionType, string> = {
  [TransactionType.Expense]: 'Despesa',
  [TransactionType.Income]: 'Receita',
  [TransactionType.BetweenAccounts]: 'Entre contas',
} as const;

export const transactionStatusLabel: Record<TransactionStatus, string> = {
  PLANNED: 'Agendada',
  COMPLETED: 'Concluída',
  CANCELED: 'Cancelada',
};
