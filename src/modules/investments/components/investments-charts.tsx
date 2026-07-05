'use client';

import { useQuery } from '@apollo/client';
import {
  InvestmentEvolutionQuery,
  InvestmentRegimesQuery,
} from '../graphql/investments-queries';
import { EvolutionAreaChart } from './charts/evolution-area-chart';
import { AllocationDonutChart } from './charts/allocation-donut-chart';
import { YieldBarChart } from './charts/yield-bar-chart';
import { InvestmentEvolutionPeriod } from '@/graphql/graphql';

export function InvestmentsCharts() {
  const { data: evolutionData, loading: evolutionLoading } = useQuery(
    InvestmentEvolutionQuery,
    {
      variables: { period: InvestmentEvolutionPeriod.All },
    },
  );

  const { data: regimesData, loading: regimesLoading } = useQuery(
    InvestmentRegimesQuery,
  );

  const evolutionPoints = evolutionData?.investmentEvolution?.dataPoints;
  const regimes =
    regimesData?.investmentRegimes?.edges?.map((e) => e.node) || [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {/* Evolution Chart (Full width on md, 2 cols on lg) */}
      <EvolutionAreaChart
        dataPoints={evolutionPoints}
        loading={evolutionLoading}
      />

      {/* Donut Chart (1 col on md and lg) */}
      <AllocationDonutChart regimes={regimes} loading={regimesLoading} />

      {/* Bar Chart (2 cols on md, 1 col on lg) */}
      <YieldBarChart regimes={regimes} loading={regimesLoading} />
    </div>
  );
}
