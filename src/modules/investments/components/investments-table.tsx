'use client';

import { DataTable } from '@/components/data-table';
import { OrderDirection } from '@/graphql/graphql';
import { CircleArrowDown, CircleArrowUp, CircleEqual } from 'lucide-react';
import { InvestmentsQuery } from '../graphql/investments-queries';

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
            <>
              {row.getValue('currentAmount')} (
              {row.original.currentVariation.startsWith('-') ? (
                <CircleArrowDown className="h-4 w-4" />
              ) : row.original.currentVariation === '0,00%' ? (
                <CircleEqual className="h-4 w-4" />
              ) : (
                <CircleArrowUp className="h-4 w-4" />
              )}{' '}
              {row.original.currentVariation})
            </>
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
            <>
              {row.getValue('taxedAmount')} (
              {row.original.taxedVariation.startsWith('-') ? (
                <CircleArrowDown className="h-4 w-4" />
              ) : row.original.taxedVariation === '0,00%' ? (
                <CircleEqual className="h-4 w-4" />
              ) : (
                <CircleArrowUp className="h-4 w-4" />
              )}{' '}
              {row.original.taxedVariation})
            </>
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
    />
  );
}
