'use client';

import { Regime } from '@/graphql/graphql';
import { InvestmentsTable } from '@/modules/investments/components/investments-table';
import { useParams } from 'next/navigation';

export default function InvestmentsPage() {
  const params = useParams();
  const regime = params.regime as string;

  const regimeEnum = regime.toUpperCase() as Regime;

  return <InvestmentsTable regime={regimeEnum} />;
}
