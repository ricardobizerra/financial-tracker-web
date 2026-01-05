'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import { EyeIcon, PiggyBank } from 'lucide-react';
import { VariationBadge } from '@/components/variation-badge';
import { investmentRegimeLabel } from '../investment-regime-label';
import { InvestmentCreateForm } from './investment-create-form';
import {
  Regime,
  InvestmentRegimeSummaryFragmentFragment,
} from '@/graphql/graphql';
import { Skeleton } from '@/components/ui/skeleton';

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

  return (
    <Card className={cn(regime.quantity === 0 && 'opacity-50')}>
      <CardContent>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 px-0">
          <CardTitle>
            {investmentRegimeLabel[
              regime.name as keyof typeof investmentRegimeLabel
            ] || regime.name}
          </CardTitle>
          <CardDescription>
            <span className="font-semibold">{regime.quantity}</span>{' '}
            {regime.quantity === 1 ? 'investimento' : 'investimentos'}
          </CardDescription>
        </CardHeader>

        <div className="flex flex-wrap gap-2">
          <div className="flex flex-1 flex-col">
            <p className="text-xs text-muted-foreground">Total investido</p>
            <p className="text-sm font-semibold">
              {formatCurrency(regime.totalInvested)}
            </p>
          </div>

          <div className="flex flex-1 flex-col">
            <p className="text-xs text-muted-foreground">Total atual</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                {formatCurrency(regime.currentInvested)}
              </p>
              <VariationBadge
                variation={regime.currentInvestedPercentage}
                size="sm"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <p className="text-xs text-muted-foreground">
              Total c/ dedução IRPF
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                {formatCurrency(regime.taxedInvested)}
              </p>
              <VariationBadge
                variation={regime.taxedInvestedPercentage}
                size="sm"
              />
            </div>
          </div>
        </div>

        <CardFooter className="flex flex-wrap gap-4 px-0 pb-0 pt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={regime.quantity === 0}
            className="flex-1"
            asChild
          >
            <Link href={href} className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              Ver investimentos
            </Link>
          </Button>

          <InvestmentCreateForm
            defaultRegime={regime.name as Regime}
            triggerClassName="flex-1"
          />
        </CardFooter>
      </CardContent>
    </Card>
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
  columns = 4,
  accountId,
}: InvestmentRegimeCardsGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (loading) {
    return (
      <div className={cn('grid grid-cols-1 gap-4', gridCols[columns])}>
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
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
    <div className={cn('grid grid-cols-1 gap-4', gridCols[columns])}>
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
