'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import {
  OrdenationInvestmentModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { investmentsTableColumns } from './investments-table-columns';
import { InvestmentsFilters, InvestmentFilters } from './investments-filters';

interface InvestmentsTableProps {
  regime: Regime;
  accountIds?: string[];
  showFilters?: boolean;
}

export function InvestmentsTable({
  regime,
  accountIds: initialAccountIds,
  showFilters = true,
}: InvestmentsTableProps) {
  const [filters, setFilters] = useState<InvestmentFilters>({
    accountIds: initialAccountIds,
  });

  return (
    <div className="space-y-4">
      {showFilters && (
        <InvestmentsFilters
          filters={filters}
          onFiltersChange={setFilters}
          regime={regime}
        />
      )}

      <DataTable
        mode="query"
        query={InvestmentsQuery}
        variables={{
          regime: regime,
          accountIds: filters.accountIds,
        }}
        initialSorting={{
          key: OrdenationInvestmentModel.CorrectedAmount,
          direction: OrderDirection.Desc,
        }}
        columns={investmentsTableColumns({
          isPoupanca: regime === Regime.Poupanca,
        })}
        initialPageSize={50}
        actionButtons={<InvestmentCreateForm defaultRegime={regime} />}
      />
    </div>
  );
}
