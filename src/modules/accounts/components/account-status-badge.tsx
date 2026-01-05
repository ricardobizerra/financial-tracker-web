import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AccountStatusBadge({ isActive }: { isActive: boolean }) {
  const accountStatusColors = {
    active: {
      background:
        'bg-green-100 hover:bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/20 dark:text-green-300 border-green-500 dark:border-green-400',
      dot: 'bg-green-500 dark:bg-green-400',
    },
    inactive: {
      background:
        'bg-destructive/10 hover:bg-destructive/20 text-red-700 dark:bg-destructive/25 dark:hover:bg-destructive/40 dark:text-red-500 border-destructive',
      dot: 'bg-destructive',
    },
  } as const;

  const status = isActive ? 'active' : 'inactive';
  const colors = accountStatusColors[status];

  return (
    <Badge className={colors.background} variant="outline" size="sm">
      <div
        className={cn('mr-1 h-3 min-w-3 max-w-3 rounded-full', colors.dot)}
      />
      <p>{isActive ? 'Ativa' : 'Inativa'}</p>
    </Badge>
  );
}
