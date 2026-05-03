import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/graphql/graphql';
import { cn } from '@/lib/utils';
import { transactionStatusLabel } from '../transactions-constants';
import { AlertTriangle, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TransactionStatusBadge({
  status,
  onSelect,
  disabled = false,
}: {
  status: TransactionStatus;
  onSelect?: (status: TransactionStatus) => void;
  disabled?: boolean;
}) {
  const accountStatusColors: Record<
    TransactionStatus,
    { background: string; dot: string }
  > = {
    PLANNED: {
      background:
        'bg-green-100 hover:bg-green-200/80 text-green-800 dark:bg-green-900/40 dark:hover:bg-green-900/60 dark:text-green-300 border-green-500/50 dark:border-green-400/50',
      dot: 'bg-green-500 dark:bg-green-400',
    },
    COMPLETED: {
      background:
        'bg-purple-100 hover:bg-purple-200/80 text-purple-800 dark:bg-purple-900/40 dark:hover:bg-purple-900/60 dark:text-purple-300 border-purple-500/50 dark:border-purple-400/50',
      dot: 'bg-purple-500 dark:bg-purple-400',
    },
    CANCELED: {
      background:
        'bg-orange-100 hover:bg-orange-200/80 text-orange-800 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 dark:text-orange-300 border-orange-500/50 dark:border-orange-400/50',
      dot: 'bg-orange-500 dark:bg-orange-400',
    },
    OVERDUE: {
      background:
        'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 border-red-700 dark:border-red-400',
      dot: 'bg-white dark:bg-red-100',
    },
  } as const;

  const renderBadge = (
    transactionStatus: TransactionStatus,
    isInteractive = false,
  ) => {
    const colors = accountStatusColors[transactionStatus];
    const label = transactionStatusLabel[transactionStatus];
    return (
      <Badge
        className={cn(
          'whitespace-nowrap border transition-all',
          colors.background,
          isInteractive && !disabled && 'cursor-pointer active:scale-95',
          disabled && 'cursor-default opacity-60',
        )}
        variant="outline"
        size="sm"
      >
        {transactionStatus === TransactionStatus.Overdue ? (
          <AlertTriangle className="mr-1.5 h-3.5 w-3.5 shrink-0" />
        ) : (
          <div
            className={cn(
              'mr-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
              colors.dot,
            )}
          />
        )}
        <span className="font-semibold">{label}</span>
      </Badge>
    );
  };

  if (disabled || !onSelect) {
    return renderBadge(status);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-block">{renderBadge(status, true)}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 space-y-1 p-2">
        {Object.entries(transactionStatusLabel).map(
          ([statusKey, statusLabel]) => {
            const isSelected = status === statusKey;
            const statusTyped = statusKey as TransactionStatus;

            return (
              <DropdownMenuItem
                key={statusKey}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted',
                  isSelected && 'bg-muted/50',
                )}
                onClick={() => onSelect(statusTyped)}
              >
                <div className="shrink-0">{renderBadge(statusTyped)}</div>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 opacity-60" />
                )}
              </DropdownMenuItem>
            );
          },
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
