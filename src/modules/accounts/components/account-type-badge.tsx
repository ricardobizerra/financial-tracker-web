import {
  Building2,
  CreditCard,
  LucideProps,
  PiggyBank,
  TrendingUp,
  Wallet2,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { institutionTypeLabels } from '../accounts-constants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { InstitutionType } from '@/graphql/graphql';

export function AccountTypeBadge({
  type,
  className,
}: {
  type: InstitutionType;
  className?: string;
}) {
  const accountTypeColors: Record<InstitutionType, string> = {
    [InstitutionType.Checking]: 'bg-blue-700 hover:bg-blue-800 text-white',
    [InstitutionType.Investment]:
      'bg-purple-700 hover:bg-purple-800 text-white',
    [InstitutionType.Card]: 'bg-amber-700 hover:bg-amber-800 text-white',
  } as const;

  const accountTypeIcons: Record<
    InstitutionType,
    ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
  > = {
    [InstitutionType.Checking]: Building2,
    [InstitutionType.Investment]: TrendingUp,
    [InstitutionType.Card]: CreditCard,
  } as const;

  const Icon = accountTypeIcons[type];
  const label = institutionTypeLabels[type];
  const colors = accountTypeColors[type];

  return (
    <Badge
      className={cn(
        'gap-1 whitespace-nowrap transition-colors',
        colors,
        className,
      )}
      variant="secondary"
      size="sm"
    >
      <Icon className="h-3 min-w-3 max-w-3" />
      <p>{label}</p>
    </Badge>
  );
}
