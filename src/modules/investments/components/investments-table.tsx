'use client';

import { DataTable } from '@/components/data-table';
import { OrderDirection } from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { VariationBadge } from '@/components/variation-badge';

export function InvestmentsTable() {
  return (
    <DataTable
      mode="query"
      query={InvestmentsQuery}
      initialSorting={{ key: 'period', direction: OrderDirection.Asc }}
      columns={[
        {
          accessorKey: 'initialAmount',
          title: 'Quantia inicial',
          type: 'text',
        },
        {
          accessorKey: 'currentAmount',
          title: 'Quantia atual',
          type: 'custom',
          enableSorting: false,
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              {row.getValue('currentAmount')}
              <VariationBadge variation={row.original.currentVariation} />
            </div>
          ),
        },
        {
          accessorKey: 'taxPercentage',
          title: 'Dedução IRPF',
          type: 'text',
          enableSorting: false,
        },
        {
          accessorKey: 'taxedAmount',
          title: 'Quantia c/ dedução IRPF',
          type: 'custom',
          enableSorting: false,
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              {row.getValue('taxedAmount')}
              <VariationBadge variation={row.original.taxedVariation} />
            </div>
          ),
        },
        { accessorKey: 'period', title: 'Período', type: 'text' },
        {
          accessorKey: 'duration',
          title: 'Duração',
          subtitle: 'em dias',
          type: 'text',
        },
      ]}
      initialPageSize={50}
      actionButtons={<InvestmentCreateForm />}
    />
  );
}
