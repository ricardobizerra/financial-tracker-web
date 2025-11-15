import { InitialColumnDef } from '@/components/data-table/utils';
import { InvestmentFragmentFragment, InvestmentModel } from '@/graphql/graphql';
import { VariationBadge } from '@/components/variation-badge';
import { add } from 'date-fns';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { InvestmentActions } from './investment-actions';

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
          accessorKey: 'taxPercentage',
          title: 'Dedução IRPF',
          enableSorting: false,
        },
        {
          accessorKey: 'taxedAmount',
          title: 'Quantia c/ dedução IRPF',
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
    title: '',
    id: 'actions',
    enableSorting: false,
    cell: ({ row }) => {
      return <InvestmentActions id={row.original.id} />;
    },
  },
];
