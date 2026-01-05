import { AccountType } from '@/graphql/graphql';
import {
  Building2,
  CreditCard,
  LucideProps,
  PiggyBank,
  TrendingUp,
  Wallet2,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { accountTypeLabels } from '../accounts-constants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AccountTypeBadge({
  type,
  className,
}: {
  type: AccountType;
  className?: string;
}) {
  const accountTypeColors: Record<AccountType, string> = {
    [AccountType.Checking]: 'bg-blue-700 hover:bg-blue-800 text-white',
    [AccountType.Savings]: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    [AccountType.Investment]: 'bg-purple-700 hover:bg-purple-800 text-white',
    [AccountType.CreditCard]: 'bg-amber-700 hover:bg-amber-800 text-white',
    [AccountType.Wallet]: 'bg-cyan-700 hover:bg-cyan-800 text-white',
    [AccountType.Other]: 'bg-gray-700 hover:bg-gray-800 text-white',
  } as const;

  const accountTypeIcons: Record<
    AccountType,
    ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
  > = {
    [AccountType.Checking]: Building2,
    [AccountType.Savings]: PiggyBank,
    [AccountType.Investment]: TrendingUp,
    [AccountType.CreditCard]: CreditCard,
    [AccountType.Wallet]: Wallet2,
    [AccountType.Other]: Building2,
  } as const;

  const Icon = accountTypeIcons[type];
  const label = accountTypeLabels[type];
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
