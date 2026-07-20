import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CardBillingStatus } from '@/graphql/graphql';
import {
  cardBillingStatusClassNames,
  cardBillingStatusLabels,
} from '../cards-constants';
import { AlertTriangle } from 'lucide-react';

type CardBillingStatusBadgeProps = {
  status: CardBillingStatus;
  className?: string;
  label?: (cardBillingLabel: string) => string;
};

const statusDotColors: Record<CardBillingStatus, string> = {
  [CardBillingStatus.Future]: 'bg-sky-500 dark:bg-sky-400',
  [CardBillingStatus.Pending]: 'bg-green-500 dark:bg-green-400',
  [CardBillingStatus.Closed]: 'bg-amber-500 dark:bg-amber-400',
  [CardBillingStatus.Overdue]: 'bg-white dark:bg-red-100',
  [CardBillingStatus.Paid]: 'bg-purple-500 dark:bg-purple-400',
  [CardBillingStatus.Completed]: 'bg-purple-400 dark:bg-purple-400',
};

export function CardBillingStatusBadge({
  status,
  className,
  label,
}: CardBillingStatusBadgeProps) {
  const cardBillingLabel = cardBillingStatusLabels[status];
  const statusClassName = cardBillingStatusClassNames[status];
  const dotColor = statusDotColors[status];

  return (
    <Badge
      className={cn(
        'whitespace-nowrap border transition-all',
        statusClassName,
        className,
      )}
      variant="outline"
      size="sm"
    >
      {status === CardBillingStatus.Overdue ? (
        <AlertTriangle className="mr-1.5 h-3.5 w-3.5 shrink-0" />
      ) : (
        <div
          className={cn('mr-1.5 h-2.5 w-2.5 shrink-0 rounded-full', dotColor)}
        />
      )}
      <span className="font-semibold">
        {label?.(cardBillingLabel) ?? cardBillingLabel}
      </span>
    </Badge>
  );
}
