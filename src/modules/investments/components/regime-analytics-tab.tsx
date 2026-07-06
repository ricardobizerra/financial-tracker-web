'use client';

import { useQuery } from '@apollo/client';
import { InvestmentEvolutionQuery } from '../graphql/investments-queries';
import { InvestmentEvolutionPeriod, Regime } from '@/graphql/graphql';
import { EvolutionAreaChart } from './charts/evolution-area-chart';
import { YieldBarChart } from './charts/yield-bar-chart';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegimeAnalyticsTabProps {
  regime: Regime;
  institutionLinkIds?: string[];
}

export function RegimeAnalyticsTab({ regime, institutionLinkIds }: RegimeAnalyticsTabProps) {
  const [period, setPeriod] = useState<InvestmentEvolutionPeriod>(InvestmentEvolutionPeriod.Year);

  const { data: evolutionData, loading: evolutionLoading } = useQuery(InvestmentEvolutionQuery, {
    variables: {
      period,
      regime,
      ...(institutionLinkIds?.length === 1 ? { accountId: institutionLinkIds[0] } : {}),
    },
  });

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-end">
        <Select
          value={period}
          onValueChange={(value: InvestmentEvolutionPeriod) => setPeriod(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={InvestmentEvolutionPeriod.Month}>Último Mês</SelectItem>
            <SelectItem value={InvestmentEvolutionPeriod.ThreeMonths}>Últimos 3 Meses</SelectItem>
            <SelectItem value={InvestmentEvolutionPeriod.SixMonths}>Últimos 6 Meses</SelectItem>
            <SelectItem value={InvestmentEvolutionPeriod.Year}>Último Ano</SelectItem>
            <SelectItem value={InvestmentEvolutionPeriod.All}>Todo o Período</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full">
        <EvolutionAreaChart 
          dataPoints={evolutionData?.investmentEvolution.dataPoints} 
          loading={evolutionLoading} 
        />
      </div>
    </div>
  );
}
