'use client';

import { Regime } from '@/graphql/graphql';
import { InvestmentsTable } from '@/modules/investments/components/investments-table';
import { useParams, useSearchParams } from 'next/navigation';

export function InvestmentRegimeContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const regime = params.regime as string;
  const accountId = searchParams.get('accountId');

  const regimeEnum = regime.toUpperCase() as Regime;

  return (
    <InvestmentsTable
      regime={regimeEnum}
      institutionLinkIds={accountId ? [accountId] : undefined}
    />
  );
}
