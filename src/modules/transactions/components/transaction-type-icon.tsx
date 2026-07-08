import { ArrowDown, ArrowLeftRight, ArrowUp } from 'lucide-react';
import { TransactionType } from '@/graphql/graphql';

interface TransactionTypeIconProps {
  type: TransactionType;
}

export function TransactionTypeIcon({ type }: TransactionTypeIconProps) {
  if (type === TransactionType.Income) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700/10 text-green-700 dark:bg-green-500/10 dark:text-green-500">
        <ArrowUp className="h-5 w-5" />
      </div>
    );
  }
  if (type === TransactionType.Expense) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ArrowDown className="h-5 w-5" />
      </div>
    );
  }
  if (type === TransactionType.BetweenAccounts) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500">
        <ArrowLeftRight className="h-5 w-5" />
      </div>
    );
  }
  return null;
}
