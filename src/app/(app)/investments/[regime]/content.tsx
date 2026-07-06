'use client';

import { Regime } from '@/graphql/graphql';
import { InvestmentsTable } from '@/modules/investments/components/investments-table';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  InvestmentRegimesQuery,
} from '@/modules/investments/graphql/investments-queries';
import { InvestmentFilters, InvestmentsFilters } from '@/modules/investments/components/investments-filters';
import { useQuery } from '@apollo/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvestmentCreateForm } from '@/modules/investments/components/investment-create-form';
import { formatCurrency } from '@/lib/formatters/currency';
import { VariationBadge } from '@/components/variation-badge';
import { Card, CardContent } from '@/components/ui/card';
import { RegimeUnifiedView } from '@/modules/investments/components/regime-unified-view';
import { useState } from 'react';

const regimeNames: Record<Regime, string> = {
  [Regime.Cdi]: 'CDI',
  [Regime.Poupanca]: 'Poupança',
  [Regime.Selic]: 'Tesouro Selic',
  [Regime.Ipca]: 'Tesouro IPCA+',
  [Regime.Prefixed]: 'Prefixado',
};

export function InvestmentRegimeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const regime = params.regime as string;
  const initialAccountId = searchParams.get('accountId');

  const regimeEnum = regime.toUpperCase() as Regime;
  const isPoupanca = regimeEnum === Regime.Poupanca;

  const [filters, setFilters] = useState<InvestmentFilters>({
    institutionLinkIds: initialAccountId ? [initialAccountId] : undefined,
  });

  const { data } = useQuery(InvestmentRegimesQuery);
  
  const summary = data?.investmentRegimes?.edges?.find(
    (e) => e?.node?.name === regimeEnum
  )?.node;

  const totalInvested = summary?.totalInvested || 0;
  const currentAmount = isPoupanca ? summary?.currentInvested : summary?.taxedInvested;
  
  // Calculate a simplified yield for display
  const yieldVariation = totalInvested > 0 
    ? 100 * ((currentAmount || 0) - totalInvested) / totalInvested 
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link
          href="/investments"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar aos investimentos
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {regimeNames[regimeEnum] || regimeEnum}
        </h1>
        <InvestmentCreateForm defaultRegime={regimeEnum} />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex flex-col justify-center gap-1 p-6">
            <span className="text-sm font-medium text-muted-foreground">Total Investido</span>
            <span className="text-2xl font-bold">{formatCurrency(totalInvested)}</span>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex flex-col justify-center gap-1 p-6 relative">
            <span className="text-sm font-medium text-muted-foreground">
              {isPoupanca ? 'Saldo Atual' : 'Saldo Líquido'}
            </span>
            <span className="text-2xl font-bold">{formatCurrency(currentAmount || 0)}</span>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex flex-col justify-center gap-1 p-6 relative">
            <span className="text-sm font-medium text-muted-foreground">Rentabilidade</span>
            <span className="text-2xl font-bold">
              {yieldVariation > 0 ? '+' : ''}{yieldVariation.toFixed(2)}%
            </span>
            <div className="absolute right-6 top-6">
              <VariationBadge variation={yieldVariation.toFixed(2)} size="sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <InvestmentsFilters
          filters={filters}
          onFiltersChange={setFilters}
          regime={regimeEnum}
        />
      </div>

      <div className="mt-4">
        <RegimeUnifiedView
          regime={regimeEnum}
          institutionLinkIds={filters.institutionLinkIds}
        />
      </div>
    </div>
  );
}
