'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  TransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
  UpdateRecurringScope,
  PaymentMethod,
} from '@/graphql/graphql';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, ArrowLeftRight } from 'lucide-react';
import { TransactionStatusBadge } from './transaction-status-badge';
import { TransactionActionsMenu } from './transaction-actions-menu';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { TransactionEditDescriptionDialog } from './transaction-edit-description-dialog';
import { TransactionEditScopeDialog } from './transaction-edit-scope-dialog';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import { UpdateRecurringTransactionsMutation } from '../graphql/transactions-mutations';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';
import { toast } from 'sonner';

interface TransactionCardProps {
  transaction: TransactionFragmentFragment;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
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
      refetchQueries: [
        TransactionsQuery,
        TransactionsSummaryQuery,
        TransactionsGroupedByPeriodQuery,
      ],
      onCompleted: () => {
        toast.success('Transações atualizadas!');
        setEditOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const isIncome = transaction.type === TransactionType.Income;
  const isExpense = transaction.type === TransactionType.Expense;
  const isBetweenAccounts = transaction.type === TransactionType.BetweenAccounts;
  const isOverdue = transaction.status === TransactionStatus.Overdue;
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

  const handleBeforeSubmit = async (data: {
    description: string;
    amount: number;
    paymentMethod?: string;
  }): Promise<boolean> => {
    if (!isRecurring) {
      return true;
    }

    setPendingData(data);
    setScopeDialogOpen(true);

    return new Promise((resolve) => {
      scopeResolverRef.current = resolve;
    });
  };

  const handleScopeSelected = async (scope: UpdateRecurringScope) => {
    setScopeDialogOpen(false);

    if (scope === UpdateRecurringScope.ThisOnly) {
      scopeResolverRef.current?.(true);
    } else {
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

  const getAccountDisplay = () => {
    if (isBetweenAccounts) {
      const sourceInst = transaction.sourceAccount?.institution;
      const destInst = transaction.destinyAccount?.institution;
      return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {sourceInst && (
            <InstitutionLogo
              logoUrl={sourceInst.logoUrl}
              name={sourceInst.name}
              size="xs"
            />
          )}
          <span>{transaction.sourceAccount?.name}</span>
          <ArrowLeftRight className="h-3 w-3" />
          {destInst && (
            <InstitutionLogo
              logoUrl={destInst.logoUrl}
              name={destInst.name}
              size="xs"
            />
          )}
          <span>{transaction.destinyAccount?.name}</span>
        </div>
      );
    }

    const account = isIncome
      ? transaction.destinyAccount
      : transaction.sourceAccount ||
        transaction.billingPayment?.accountCard?.account;

    if (!account) return null;

    const institution = account.institution;

    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {institution && (
          <InstitutionLogo
            logoUrl={institution.logoUrl}
            name={institution.name}
            size="xs"
          />
        )}
        <span>{account.name}</span>
      </div>
    );
  };

  return (
    <>
      <Card
        className={cn(
          'transition-all hover:shadow-md',
          isOverdue &&
            'border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20',
          isCompleted && 'opacity-75',
        )}
      >
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            {/* Ícone do tipo */}
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                isIncome && 'bg-emerald-100 dark:bg-emerald-900/30',
                isExpense && 'bg-red-100 dark:bg-red-900/30',
                isBetweenAccounts && 'bg-blue-100 dark:bg-blue-900/30',
              )}
            >
              {isIncome && (
                <ArrowUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {isExpense && (
                <ArrowDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              {isBetweenAccounts && (
                <ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            {/* Descrição e conta */}
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">
                {transaction.description || 'Sem descrição'}
              </span>
              {getAccountDisplay()}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Data */}
            <div className="text-right text-xs text-muted-foreground">
              {formatDate(transaction.date)}
            </div>

            {/* Status */}
            <TransactionStatusBadge status={transaction.status} />

            {/* Valor */}
            <div
              className={cn(
                'min-w-[100px] text-right font-semibold',
                isIncome && 'text-emerald-600 dark:text-emerald-400',
                isExpense && 'text-red-600 dark:text-red-400',
                isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
              )}
            >
              {isIncome && '+'}
              {isExpense && '-'}
              {formatCurrency(Number(transaction.amount))}
            </div>

            {/* Menu de ações */}
            <TransactionActionsMenu transaction={transaction} onEdit={handleEdit} />
          </div>
        </CardContent>
      </Card>

      {/* Modais de edição */}
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
