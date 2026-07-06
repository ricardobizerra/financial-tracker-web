'use client';

import { DataTable } from '@/components/data-table';
import {
  OrdenationInvestmentModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { investmentsTableColumns } from './investments-table-columns';

import { Row } from '@tanstack/react-table';
import { InvestmentFragmentFragment } from '@/graphql/graphql';

interface InvestmentsTableProps {
  regime: Regime;
  institutionLinkIds?: string[];
  showFilters?: boolean;
  onRowClick?: (row: Row<InvestmentFragmentFragment>) => void;
  renderSubComponent?: (props: { row: Row<InvestmentFragmentFragment> }) => React.ReactNode;
}

export function InvestmentsTable({
  regime,
  institutionLinkIds,
  onRowClick,
  renderSubComponent,
}: InvestmentsTableProps) {
  return (
    <div className="space-y-4">
      <DataTable
        mode="query"
        query={InvestmentsQuery}
        variables={{
          regime: regime,
          institutionLinkIds: institutionLinkIds,
        }}
        initialSorting={{
          key: OrdenationInvestmentModel.StartDate,
          direction: OrderDirection.Desc,
        }}
        columns={investmentsTableColumns({
          isPoupanca: regime === Regime.Poupanca,
        })}
        initialPageSize={50}
        onRowClick={onRowClick}
        renderSubComponent={renderSubComponent}
      />
    </div>
  );
}
