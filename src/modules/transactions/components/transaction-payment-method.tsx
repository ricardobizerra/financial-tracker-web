import { cn } from '@/lib/utils';
import { TransactionType } from '@/graphql/graphql';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  paymentMethodIcons,
  paymentMethodLabel,
} from '../transactions-constants';

interface TransactionPaymentMethodProps {
  paymentMethod: string;
  type: TransactionType;
  isExpenseForBilling?: boolean;
}

export function TransactionPaymentMethod({
  paymentMethod,
  type,
  isExpenseForBilling = false,
}: TransactionPaymentMethodProps) {
  const isIncome = type === TransactionType.Income;
  const isExpense = type === TransactionType.Expense;
  const isBetweenAccounts = type === TransactionType.BetweenAccounts;

  const PayIcon =
    paymentMethodIcons[paymentMethod as keyof typeof paymentMethodIcons];

  if (!PayIcon) return null;

  return (
    <SimpleTooltip
      label={
        paymentMethodLabel[paymentMethod as keyof typeof paymentMethodLabel]
      }
      side="top"
    >
      <PayIcon
        className={cn(
          'h-5 w-5 shrink-0',
          isExpense && 'text-red-600 dark:text-red-400',
          isIncome && 'text-emerald-600 dark:text-emerald-400',
          isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
          isExpenseForBilling &&
            'text-muted-foreground dark:text-muted-foreground',
        )}
      />
    </SimpleTooltip>
  );
}
