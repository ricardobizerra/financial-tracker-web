import {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
  TransactionCategory,
} from '@/graphql/graphql';
import { Banknote, CreditCard, Receipt } from 'lucide-react';
import PixIcon from '@/static/pix-icon.svg';

export const transactionTypeLabels: Record<TransactionType, string> = {
  [TransactionType.Expense]: 'Despesa',
  [TransactionType.Income]: 'Receita',
  [TransactionType.BetweenAccounts]: 'Entre contas',
} as const;

export const transactionStatusLabel: Record<TransactionStatus, string> = {
  PLANNED: 'Agendada',
  COMPLETED: 'Realizada',
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const paymentMethodIcons: Record<PaymentMethod, any> = {
  CASH: Banknote,
  CREDIT_CARD: CreditCard,
  DEBIT_CARD: CreditCard,
  PIX: PixIcon,
  BOLETO: Receipt,
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
