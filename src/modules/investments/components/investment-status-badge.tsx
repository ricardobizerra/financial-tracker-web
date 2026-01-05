import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { InvestmentStatus } from '@/graphql/graphql';

const investmentStatusLabel = {
  [InvestmentStatus.Open]: 'Aberto',
  [InvestmentStatus.Closed]: 'Fechado',
} as const;

type InvestmentStatusBadgeProps = {
  status: InvestmentStatus;
};

export function InvestmentStatusBadge({ status }: InvestmentStatusBadgeProps) {
  const statusColors = {
    [InvestmentStatus.Open]: {
      background:
        'bg-green-100 hover:bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/20 dark:text-green-300 border-green-500 dark:border-green-400',
      dot: 'bg-green-500 dark:bg-green-400',
    },
    [InvestmentStatus.Closed]: {
      background:
        'bg-violet-100 hover:bg-violet-100/80 text-violet-800 dark:bg-violet-800 dark:hover:bg-violet-800/80 dark:text-violet-300 border-violet-500 dark:border-violet-400',
      dot: 'bg-violet-500 dark:bg-violet-400',
    },
  } as const;

  const colors = statusColors[status];
  const label = investmentStatusLabel[status];

  return (
    <Badge className={colors.background} variant="outline" size="sm">
      <div
        className={cn('mr-1 h-3 min-w-3 max-w-3 rounded-full', colors.dot)}
      />
      <p>{label}</p>
    </Badge>
  );
}
