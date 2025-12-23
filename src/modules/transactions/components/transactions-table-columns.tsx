'use client';

import {
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { TransactionStatusBadge } from './transaction-status-badge';
import { TransactionTypeBadge } from './transaction-type-badge';
import { ArrowRight } from 'lucide-react';
import { InitialColumnDef } from '@/components/data-table/utils';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';

function AccountCell({
  account,
}: {
  account?: {
    name: string;
    institution: { name: string; logoUrl: string | null };
  } | null;
}) {
  if (!account) return <span className="text-muted-foreground">—</span>;

  return (
    <div className="flex items-center gap-2">
      <InstitutionLogo
        logoUrl={account.institution.logoUrl}
        name={account.institution.name}
        size="sm"
      />
      <span className="truncate text-sm">{account.name}</span>
    </div>
  );
}

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
      accessorKey: 'account',
      title: 'Conta',
      cell: ({ row }) => {
        const { type, status, sourceAccount, destinyAccount, billingPayment } =
          row.original;

        // Pagamento de fatura agendado: ainda não sabe a conta de origem
        // Mostra apenas a conta do cartão (destino)
        if (
          billingPayment &&
          status === TransactionStatus.Planned &&
          !sourceAccount
        ) {
          return <AccountCell account={billingPayment.accountCard?.account} />;
        }

        if (type === TransactionType.BetweenAccounts) {
          return (
            <div className="flex items-center gap-1">
              <AccountCell account={sourceAccount} />
              <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
              <AccountCell account={destinyAccount} />
            </div>
          );
        }

        if (type === TransactionType.Expense) {
          return <AccountCell account={sourceAccount} />;
        }

        return <AccountCell account={destinyAccount} />;
      },
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
