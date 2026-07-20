'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import { ChevronRight, PiggyBank } from 'lucide-react';
import { VariationBadge } from '@/components/variation-badge';
import { investmentRegimeLabel } from '../investment-regime-label';
import { Skeleton } from '@/components/ui/skeleton';
import { InvestmentRegimeSummaryFragmentFragment } from '@/graphql/graphql';

interface InvestmentRegimeCardProps {
  regime: InvestmentRegimeSummaryFragmentFragment;
  accountId?: string;
}

export function InvestmentRegimeCard({
  regime,
  accountId,
}: InvestmentRegimeCardProps) {
  const href = accountId
    ? `/investments/${regime.name.toLowerCase()}?accountId=${accountId}`
    : `/investments/${regime.name.toLowerCase()}`;

  const regimeName =
    investmentRegimeLabel[regime.name as keyof typeof investmentRegimeLabel] ||
    regime.name;

  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-muted/50"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{regimeName}</span>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              regime.quantity === 0
                ? 'bg-muted text-muted-foreground opacity-50'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            {regime.quantity} {regime.quantity === 1 ? 'ativo' : 'ativos'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold">
            {formatCurrency(regime.taxedInvested)}
          </span>
          <span className="text-xs text-muted-foreground">Saldo Líquido</span>
        </div>

        <div className="flex items-center gap-4">
          <VariationBadge
            variation={regime.taxedInvestedPercentage}
            size="sm"
          />
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

interface InvestmentRegimeCardsGridProps {
  regimes: InvestmentRegimeSummaryFragmentFragment[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  accountId?: string;
}

export function InvestmentRegimeCardsGrid({
  regimes,
  loading = false,
  emptyMessage = 'Nenhum investimento registrado',
  accountId,
}: InvestmentRegimeCardsGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  if (regimes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <PiggyBank className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {regimes.map((regime) => (
        <InvestmentRegimeCard
          key={regime.name}
          regime={regime}
          accountId={accountId}
        />
      ))}
    </div>
  );
}
