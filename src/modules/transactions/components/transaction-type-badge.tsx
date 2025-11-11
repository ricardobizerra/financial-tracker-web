import { TransactionType } from '@/graphql/graphql';
import { ArrowDown, ArrowLeftRight, ArrowUp, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { transactionTypeLabels } from '../transactions-constants';

export function TransactionTypeBadge({ type }: { type: TransactionType }) {
  const transactionTypeColors: Record<TransactionType, string> = {
    [TransactionType.Expense]:
      'bg-destructive hover:bg-destructive/90 text-white',
    [TransactionType.Income]: 'bg-green-700 hover:bg-green-800 text-white',
    [TransactionType.BetweenAccounts]:
      'bg-blue-700 hover:bg-blue-800 text-white',
  } as const;

  const transactionTypeIcons: Record<
    TransactionType,
    ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
  > = {
    [TransactionType.Expense]: ArrowDown,
    [TransactionType.Income]: ArrowUp,
    [TransactionType.BetweenAccounts]: ArrowLeftRight,
  } as const;

  const Icon = transactionTypeIcons[type];
  const label = transactionTypeLabels[type];
  const colors = transactionTypeColors[type];

  return (
    <Badge
      className={cn('gap-1 whitespace-nowrap transition-colors', colors)}
      variant="secondary"
      size="sm"
    >
      <Icon className="h-3 min-w-3 max-w-3" />
      <p>{label}</p>
    </Badge>
  );
}
