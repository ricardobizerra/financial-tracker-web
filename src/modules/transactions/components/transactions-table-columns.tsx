'use client';

import { useState } from 'react';
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
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import { TransactionActionsMenu } from './transaction-actions-menu';
import { TransactionEditDescriptionDialog } from './transaction-edit-description-dialog';

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

function TransactionActionsCell({
  transaction,
}: {
  transaction: TransactionFragmentFragment;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [descriptionEditOpen, setDescriptionEditOpen] = useState(false);

  const isCompleted = transaction.status === TransactionStatus.Completed;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isImmutable = isCompleted || isCanceled;

  const handleEdit = () => {
    if (isImmutable) {
      setDescriptionEditOpen(true);
    } else {
      setEditOpen(true);
    }
  };

  const renderEditForm = () => {
    switch (transaction.type) {
      case TransactionType.Income:
        return (
          <IncomeTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        );
      case TransactionType.Expense:
        return (
          <ExpenseTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        );
      case TransactionType.BetweenAccounts:
        return (
          <BetweenAccountsTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TransactionActionsMenu transaction={transaction} onEdit={handleEdit} />
      {renderEditForm()}
      <TransactionEditDescriptionDialog
        transaction={transaction}
        open={descriptionEditOpen}
        onOpenChange={setDescriptionEditOpen}
      />
    </>
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
    {
      accessorKey: 'actions',
      title: '',
      enableSorting: false,
      cell: ({ row }) => <TransactionActionsCell transaction={row.original} />,
    },
  ];
