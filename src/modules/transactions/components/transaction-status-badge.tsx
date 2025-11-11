import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/graphql/graphql';
import { cn } from '@/lib/utils';
import { transactionStatusLabel } from '../transactions-constants';

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionStatus;
}) {
  const accountStatusColors: Record<
    TransactionStatus,
    { background: string; dot: string }
  > = {
    PLANNED: {
      background:
        'bg-orange-100 hover:bg-orange-100/80 text-orange-800 dark:bg-orange-900/30 dark:hover:bg-orange-900/20 dark:text-orange-300 border-orange-500 dark:border-orange-400',
      dot: 'bg-orange-500 dark:bg-orange-400',
    },
    COMPLETED: {
      background:
        'bg-green-100 hover:bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/20 dark:text-green-300 border-green-500 dark:border-green-400',
      dot: 'bg-green-500 dark:bg-green-400',
    },
    CANCELED: {
      background:
        'bg-destructive/10 hover:bg-destructive/20 text-red-700 dark:bg-destructive/25 dark:hover:bg-destructive/40 dark:text-red-500 border-destructive',
      dot: 'bg-destructive',
    },
  } as const;

  const colors = accountStatusColors[status];
  const label = transactionStatusLabel[status];

  return (
    <Badge className={colors.background} variant="outline" size="sm">
      <div
        className={cn('mr-1 h-3 min-w-3 max-w-3 rounded-full', colors.dot)}
      />
      <p>{label}</p>
    </Badge>
  );
}
