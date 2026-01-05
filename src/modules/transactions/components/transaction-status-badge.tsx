import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/graphql/graphql';
import { cn } from '@/lib/utils';
import { transactionStatusLabel } from '../transactions-constants';
import { AlertTriangle } from 'lucide-react';

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
        'bg-green-100 hover:bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/20 dark:text-green-300 border-green-500 dark:border-green-400',
      dot: 'bg-green-500 dark:bg-green-400',
    },
    COMPLETED: {
      background:
        'bg-purple-100 hover:bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-900/20 dark:text-purple-300 border-purple-500 dark:border-purple-400',
      dot: 'bg-purple-500 dark:bg-purple-400',
    },
    CANCELED: {
      background:
        'bg-orange-100 hover:bg-orange-100/80 text-orange-800 dark:bg-orange-900/30 dark:hover:bg-orange-900/20 dark:text-orange-300 border-orange-500 dark:border-orange-400',
      dot: 'bg-orange-500 dark:bg-orange-400',
    },
    OVERDUE: {
      background:
        'text-destructive-foreground hover:text-destructive-foreground/95 bg-red-700 dark:bg-red-500 border-destructive',
      dot: 'text-destructive-foreground',
    },
  } as const;

  const colors = accountStatusColors[status];
  const label = transactionStatusLabel[status];

  return (
    <Badge className={colors.background} variant="outline" size="sm">
      {status === TransactionStatus.Overdue ? (
        <AlertTriangle className="mr-1 h-4 min-w-4 max-w-4 text-destructive-foreground" />
      ) : (
        <div
          className={cn('mr-1 h-3 min-w-3 max-w-3 rounded-full', colors.dot)}
        />
      )}
      <p>{label}</p>
    </Badge>
  );
}
