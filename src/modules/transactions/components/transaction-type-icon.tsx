import { ArrowDown, ArrowLeftRight, ArrowUp } from 'lucide-react';
import { TransactionType } from '@/graphql/graphql';

interface TransactionTypeIconProps {
  type: TransactionType;
}

export function TransactionTypeIcon({ type }: TransactionTypeIconProps) {
  if (type === TransactionType.Income) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
        <ArrowUp className="h-5 w-5" />
      </div>
    );
  }
  if (type === TransactionType.Expense) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <ArrowDown className="h-5 w-5" />
      </div>
    );
  }
  if (type === TransactionType.BetweenAccounts) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
        <ArrowLeftRight className="h-5 w-5" />
      </div>
    );
  }
  return null;
}
