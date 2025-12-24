'use client';

import React, { useState } from 'react';
import {
  PaymentMethod,
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
  UpdateRecurringScope,
} from '@/graphql/graphql';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
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
import { TransactionEditScopeDialog } from './transaction-edit-scope-dialog';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { UpdateRecurringTransactionsMutation } from '../graphql/transactions-mutations';

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
  const [scopeDialogOpen, setScopeDialogOpen] = useState(false);

  // Para armazenar o resolver da Promise do onBeforeSubmit
  const scopeResolverRef = React.useRef<
    ((shouldContinue: boolean) => void) | null
  >(null);

  // Dados pendentes do formulário para aplicar com escopo
  const [pendingData, setPendingData] = useState<{
    description: string;
    amount: number;
    paymentMethod?: string;
  } | null>(null);

  const [updateRecurringTransactions] = useMutation(
    UpdateRecurringTransactionsMutation,
    {
      refetchQueries: [TransactionsQuery],
      onCompleted: () => {
        toast.success('Transações atualizadas!', {
          description: 'As alterações foram aplicadas com sucesso.',
        });
        setEditOpen(false);
      },
      onError: (error) => {
        toast.error('Erro ao atualizar transações', {
          description: error.message,
        });
      },
    },
  );

  const isCompleted = transaction.status === TransactionStatus.Completed;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isImmutable = isCompleted || isCanceled;
  const isRecurring = !!transaction.recurringTransactionId;

  const handleEdit = () => {
    if (isImmutable) {
      setDescriptionEditOpen(true);
    } else {
      setEditOpen(true);
    }
  };

  // Handler chamado antes do submit para transações recorrentes
  const handleBeforeSubmit = async (data: {
    description: string;
    amount: number;
    paymentMethod?: string;
  }): Promise<boolean> => {
    if (!isRecurring) {
      return true; // Não é recorrente, continuar normalmente
    }

    // Salvar dados e abrir dialog de escopo
    setPendingData(data);
    setScopeDialogOpen(true);

    // Retornar Promise que será resolvida quando usuário selecionar escopo
    return new Promise((resolve) => {
      scopeResolverRef.current = resolve;
    });
  };

  const handleScopeSelected = async (scope: UpdateRecurringScope) => {
    setScopeDialogOpen(false);

    if (scope === UpdateRecurringScope.ThisOnly) {
      // Continuar com submit normal (apenas esta transação)
      scopeResolverRef.current?.(true);
    } else {
      // Para THIS_AND_FUTURE ou ALL_PLANNED, cancelar submit normal
      // e usar mutation updateRecurringTransactions
      scopeResolverRef.current?.(false);

      if (pendingData) {
        await updateRecurringTransactions({
          variables: {
            data: {
              transactionId: transaction.id,
              scope,
              description: pendingData.description,
              amount: pendingData.amount,
              paymentMethod: pendingData.paymentMethod as PaymentMethod,
            },
          },
        });
      }
    }

    scopeResolverRef.current = null;
    setPendingData(null);
  };

  const handleScopeDialogClose = (open: boolean) => {
    if (!open && scopeResolverRef.current) {
      // Dialog fechado sem seleção, cancelar submit
      scopeResolverRef.current(false);
      scopeResolverRef.current = null;
      setPendingData(null);
    }
    setScopeDialogOpen(open);
  };

  const renderEditForm = () => {
    const onBeforeSubmit = isRecurring ? handleBeforeSubmit : undefined;

    switch (transaction.type) {
      case TransactionType.Income:
        return (
          <IncomeTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
          />
        );
      case TransactionType.Expense:
        return (
          <ExpenseTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
          />
        );
      case TransactionType.BetweenAccounts:
        return (
          <BetweenAccountsTransactionCreateForm
            editTransaction={transaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
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
      <TransactionEditScopeDialog
        open={scopeDialogOpen}
        onOpenChange={handleScopeDialogClose}
        onSelectScope={handleScopeSelected}
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
