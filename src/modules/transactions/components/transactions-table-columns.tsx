'use client';

import { InitialColumnDef } from '@/components/data-table/utils';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { TransactionStatusBadge } from './transaction-status-badge';
import { TransactionTypeBadge } from './transaction-type-badge';

export const transactionsTableColumns: InitialColumnDef<TransactionFragmentFragment>[] =
  [
    {
      accessorKey: 'date',
      title: 'Data',
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: 'description',
      title: 'Descrição',
      cell: ({ row }) => row.original.description,
    },
    {
      accessorKey: 'type',
      title: 'Tipo',
      cell: ({ row }) => <TransactionTypeBadge type={row.original.type} />,
    },
    {
      accessorKey: 'amount',
      title: 'Quantia',
      cell: ({ row }) => formatCurrency(row.original.amount),
    },
    {
      accessorKey: 'status',
      title: 'Status',
      cell: ({ row }) => (
        <TransactionStatusBadge status={row.original.status} />
      ),
    },
  ];
