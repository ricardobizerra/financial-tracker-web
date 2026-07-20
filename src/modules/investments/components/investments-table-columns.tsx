import { InitialColumnDef } from '@/components/data-table/utils';
import { InvestmentFragmentFragment, InvestmentModel } from '@/graphql/graphql';
import { VariationBadge } from '@/components/variation-badge';
import { add } from 'date-fns';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { InvestmentActions } from './investment-actions';
import { InvestmentStatusBadge } from './investment-status-badge';

import { InvestmentTaxesDetail } from './investment-taxes-detail';

export const investmentsTableColumns: ({
  isPoupanca,
}: {
  isPoupanca?: boolean;
}) => InitialColumnDef<InvestmentFragmentFragment>[] = ({
  isPoupanca = false,
}) => [
  {
    id: 'patrimonio',
    title: 'Patrimônio',
    enableSorting: false, // Could map to correctedAmount if we had a generic way
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-medium">
          {formatCurrency(row.original.correctedAmount || 0)}
          <VariationBadge variation={row.original.currentVariation || '0'} size="sm" />
        </div>
        <div className="text-xs text-muted-foreground">
          Investido: {formatCurrency(row.original.amount || 0)}
        </div>
      </div>
    ),
  },
  ...(isPoupanca
    ? []
    : ([
        {
          id: 'liquido',
          title: 'Líquido',
          enableSorting: false,
          cell: ({ row }) => (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-medium">
                {formatCurrency(row.original.taxedAmount || 0)}
                <VariationBadge
                  variation={row.original.taxedVariation || '0'}
                  size="sm"
                />
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                Descontos: <InvestmentTaxesDetail investment={row.original} />
              </div>
            </div>
          ),
        },
      ] as InitialColumnDef<InvestmentFragmentFragment>[])),
  {
    accessorKey: 'startDate',
    title: isPoupanca ? 'Data de abertura' : 'Datas',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="font-medium">{formatDate(row.original.startDate)}</div>
        {!isPoupanca && (
          <div className="text-xs text-muted-foreground">
            {row.original.duration ? `+ ${row.original.duration} dias` : '-'}
          </div>
        )}
      </div>
    ),
  },
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
