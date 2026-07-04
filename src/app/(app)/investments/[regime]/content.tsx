'use client';

import { Regime } from '@/graphql/graphql';
import { InvestmentsTable } from '@/modules/investments/components/investments-table';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function InvestmentRegimeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const regime = params.regime as string;
  const accountId = searchParams.get('accountId');

  const regimeEnum = regime.toUpperCase() as Regime;

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
      <InvestmentsTable
        regime={regimeEnum}
        institutionLinkIds={accountId ? [accountId] : undefined}
      />
    </div>
  );
}
