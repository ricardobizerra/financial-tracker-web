'use client';

import { useState } from 'react';
import { BalanceForecastPeriod } from '@/graphql/graphql';
import { CashFlowSummaryCards } from './cash-flow-summary-cards';
import { CashFlowChart } from './cash-flow-chart';
import { CashFlowFilters } from './cash-flow-filters';

export function CashFlowOverview() {
  const [period, setPeriod] = useState<BalanceForecastPeriod>(
    BalanceForecastPeriod.ThreeMonths,
  );
  const [accountId, setAccountId] = useState<string | undefined>();
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();

  const isCustomPeriod = period === BalanceForecastPeriod.Custom;

  // Calculate start/end dates based on period for summary cards
  const getDatesFromPeriod = () => {
    if (isCustomPeriod) {
      return { startDate: customStartDate, endDate: customEndDate };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate: Date;
    let endDate: Date;

    switch (period) {
      case BalanceForecastPeriod.Week:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 7);
        break;
      case BalanceForecastPeriod.Month:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 30);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 30);
        break;
      case BalanceForecastPeriod.ThreeMonths:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 90);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 90);
        break;
      case BalanceForecastPeriod.SixMonths:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 180);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 180);
        break;
      case BalanceForecastPeriod.Year:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 365);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 365);
        break;
      default:
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 90);
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 90);
    }

    return { startDate, endDate };
  };

  const { startDate, endDate } = getDatesFromPeriod();

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <CashFlowFilters
        period={period}
        onPeriodChange={setPeriod}
        accountId={accountId}
        onAccountIdChange={setAccountId}
        customStartDate={customStartDate}
        onCustomStartDateChange={setCustomStartDate}
        customEndDate={customEndDate}
        onCustomEndDateChange={setCustomEndDate}
      />

      {/* Cards de resumo */}
      <CashFlowSummaryCards
        accountId={accountId}
        period={period}
        startDate={startDate}
        endDate={endDate}
      />

      {/* Gráfico de evolução */}
      <CashFlowChart
        accountId={accountId}
        period={period}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
      />
    </div>
  );
}
