'use client';

import { useQuery } from '@apollo/client';
import { InvestmentRegimesQuery } from '../graphql/investments-queries';
import { InvestmentRegimeCardsGrid } from './investment-regime-cards';
import { NetworkStatus } from '@apollo/client';

interface InvestmentRegimesTableProps {
  accountId?: string;
}

export function InvestmentRegimesTable({
  accountId,
}: InvestmentRegimesTableProps) {
  const { data, networkStatus } = useQuery(InvestmentRegimesQuery, {
    variables: { accountId },
  });

  const regimes = data?.investmentRegimes.edges?.map((e) => e.node) || [];
  const loading = networkStatus === NetworkStatus.loading;

  return (
    <InvestmentRegimeCardsGrid
      regimes={regimes}
      loading={loading}
      columns={4}
    />
  );
}
