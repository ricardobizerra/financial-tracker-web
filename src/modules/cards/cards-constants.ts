import { CardBillingStatus } from '@/graphql/graphql';

export const cardBillingStatusLabels: Record<CardBillingStatus, string> = {
  [CardBillingStatus.Pending]: 'Aberta',
  [CardBillingStatus.Paid]: 'Paga',
  [CardBillingStatus.Overdue]: 'Vencida',
  [CardBillingStatus.Closed]: 'Fechada',
  [CardBillingStatus.Completed]: 'Concluída',
};

export const cardBillingStatusClassNames: Record<CardBillingStatus, string> = {
  [CardBillingStatus.Pending]:
    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-500/50 dark:border-green-400/50',
  [CardBillingStatus.Closed]:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-500/50 dark:border-amber-400/50',
  [CardBillingStatus.Overdue]:
    'bg-red-600 text-white dark:bg-red-500 border-red-700 dark:border-red-400',
  [CardBillingStatus.Paid]:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-500/50 dark:border-purple-400/50',
  [CardBillingStatus.Completed]:
    'bg-purple-100/60 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-400/40 dark:border-purple-400/30',
};
