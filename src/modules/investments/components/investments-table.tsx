'use client';

import { DataTable } from '@/components/data-table';
import { OrdenationInvestmentModel, OrderDirection } from '@/graphql/graphql';
import { InvestmentsQuery } from '../graphql/investments-queries';
import { InvestmentCreateForm } from './investment-create-form';
import { VariationBadge } from '@/components/variation-badge';
import { add } from 'date-fns';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';

export function InvestmentsTable() {
  return (
    <DataTable
      mode="query"
      query={InvestmentsQuery}
      initialSorting={{
        key: OrdenationInvestmentModel.CorrectedAmount,
        direction: OrderDirection.Desc,
      }}
      columns={[
        {
          accessorKey: 'amount',
          title: 'Quantia inicial',
          type: 'custom',
          cell: ({ row }) => formatCurrency(row.getValue('amount')),
        },
        {
          accessorKey: 'correctedAmount',
          title: 'Quantia atual',
          type: 'custom',
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              {formatCurrency(row.getValue('correctedAmount'))}
              <VariationBadge
                variation={row.original.currentVariation}
                size="sm"
              />
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
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              {formatCurrency(row.getValue('taxedAmount'))}
              <VariationBadge
                variation={row.original.taxedVariation}
                size="sm"
              />
            </div>
          ),
        },
        {
          accessorKey: 'startDate',
          title: 'Período',
          type: 'custom',
          cell: ({ row }) =>
            formatDate(row.original.startDate) +
            ' - ' +
            formatDate(
              add(row.original.startDate, { days: row.original.duration || 0 }),
            ),
        },
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
