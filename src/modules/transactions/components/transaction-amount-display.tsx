import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters/currency';
import { TransactionType } from '@/graphql/graphql';

interface TransactionAmountDisplayProps {
  amount: string | number;
  type: TransactionType;
  isExpenseForBilling?: boolean;
}

export function TransactionAmountDisplay({
  amount,
  type,
  isExpenseForBilling = false,
}: TransactionAmountDisplayProps) {
  const isIncome = type === TransactionType.Income;
  const isExpense = type === TransactionType.Expense;
  const isBetweenAccounts = type === TransactionType.BetweenAccounts;

  return (
    <div
      className={cn(
        'text-right text-base font-semibold',
        isIncome && 'text-emerald-600 dark:text-emerald-400',
        isExpense && 'text-red-600 dark:text-red-400',
        isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
        isExpenseForBilling &&
          'text-muted-foreground dark:text-muted-foreground',
      )}
    >
      {isExpense && '-'}
      {formatCurrency(Number(amount))}
    </div>
  );
}
