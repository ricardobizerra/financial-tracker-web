import {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
  TransactionCategory,
} from '@/graphql/graphql';

export const transactionTypeLabels: Record<TransactionType, string> = {
  [TransactionType.Expense]: 'Despesa',
  [TransactionType.Income]: 'Receita',
  [TransactionType.BetweenAccounts]: 'Entre contas',
} as const;

export const transactionStatusLabel: Record<TransactionStatus, string> = {
  PLANNED: 'Agendada',
  COMPLETED: 'Concluída',
  CANCELED: 'Cancelada',
  OVERDUE: 'Vencida',
};

export const paymentMethodLabel: Record<PaymentMethod, string> = {
  BOLETO: 'Boleto',
  CREDIT_CARD: 'Cartão de crédito',
  DEBIT_CARD: 'Cartão de débito',
  CASH: 'Dinheiro',
  PIX: 'Pix',
};

export const transactionCategoryLabels: Record<TransactionCategory, string> = {
  [TransactionCategory.Education]: 'Educação',
  [TransactionCategory.Entertainment]: 'Entretenimento',
  [TransactionCategory.FoodDining]: 'Alimentação',
  [TransactionCategory.Healthcare]: 'Saúde',
  [TransactionCategory.Housing]: 'Moradia',
  [TransactionCategory.InvestmentIncome]: 'Rendimentos',
  [TransactionCategory.Other]: 'Outros',
  [TransactionCategory.Salary]: 'Salário',
  [TransactionCategory.Shopping]: 'Compras',
  [TransactionCategory.Transfer]: 'Transferência',
  [TransactionCategory.Transport]: 'Transporte',
  [TransactionCategory.Travel]: 'Viagem',
  [TransactionCategory.Utilities]: 'Serviços/Contas',
} as const;
