import { InitialColumnDef } from '@/components/data-table/utils';
import { InvestmentFragmentFragment, InvestmentModel } from '@/graphql/graphql';
import { VariationBadge } from '@/components/variation-badge';
import { add } from 'date-fns';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { InvestmentActions } from './investment-actions';
import { InvestmentStatusBadge } from './investment-status-badge';

export const investmentsTableColumns: ({
  isPoupanca,
}: {
  isPoupanca?: boolean;
}) => InitialColumnDef<InvestmentFragmentFragment>[] = ({
  isPoupanca = false,
}) => [
  {
    accessorKey: 'amount',
    title: 'Quantia inicial',
    cell: ({ row }) => formatCurrency(row.getValue('amount')),
  },
  {
    accessorKey: 'correctedAmount',
    title: 'Quantia atual',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {formatCurrency(row.getValue('correctedAmount'))}
        <VariationBadge variation={row.original.currentVariation} size="sm" />
      </div>
    ),
  },
  ...(isPoupanca
    ? []
    : ([
        {
          id: 'taxes',
          title: 'Impostos e Taxas',
          enableSorting: false,
          cell: ({ row }) => formatCurrency(row.original.taxesAndFees?.totalTaxesAndFees || 0),
        },
        {
          accessorKey: 'taxedAmount',
          title: 'Quantia Líquida',
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
      ] as InitialColumnDef<InvestmentFragmentFragment>[])),
  {
    accessorKey: 'startDate',
    title: isPoupanca ? 'Data de abertura' : 'Período',
    cell: ({ row }) =>
      isPoupanca
        ? formatDate(row.original.startDate)
        : formatDate(row.original.startDate) +
          ' - ' +
          formatDate(
            add(row.original.startDate, { days: row.original.duration || 0 }),
          ),
  },
  ...(isPoupanca
    ? []
    : ([
        {
          accessorKey: 'duration',
          title: 'Duração',
          subtitle: 'em dias',
        },
      ] as InitialColumnDef<InvestmentFragmentFragment>[])),
  {
    accessorKey: 'status',
    title: 'Status',
    cell: ({ row }) => <InvestmentStatusBadge status={row.original.status} />,
  },
  {
    title: '',
    id: 'actions',
    enableSorting: false,
    cell: ({ row }) => {
      return <InvestmentActions investment={row.original} />;
    },
  },
];
