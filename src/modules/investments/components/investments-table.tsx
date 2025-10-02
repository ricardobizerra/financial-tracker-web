'use client';

import { DataTable } from '@/components/data-table';
import { OrdenationInvestmentModel, OrderDirection } from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { investmentsTableColumns } from './investments-table-columns';

export function InvestmentsTable() {
  return (
    <DataTable
      mode="query"
      query={InvestmentsQuery}
      initialSorting={{
        key: OrdenationInvestmentModel.CorrectedAmount,
        direction: OrderDirection.Desc,
      }}
      columns={investmentsTableColumns}
      initialPageSize={50}
      actionButtons={<InvestmentCreateForm />}
    />
  );
}
