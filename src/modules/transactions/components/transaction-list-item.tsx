'use client';

import React, { useState } from 'react';
import {
  TransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
  UpdateRecurringScope,
  PaymentMethod,
  CardType,
} from '@/graphql/graphql';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Pencil,
  X,
  Check,
  Eye,
  Clock,
  CheckCircle2,
  Ban,
  AlertTriangle,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { TransactionEditDescriptionDialog } from './transaction-edit-description-dialog';
import { TransactionEditScopeDialog } from './transaction-edit-scope-dialog';

import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TransactionCategoryBadge } from './transaction-category-badge';
import { TransactionStatusBadge } from './transaction-status-badge';
import { useTransactionMutations } from '../hooks/use-transaction-mutations';
import {
  normalizeTransactionForEdit,
  formatDateExtended,
} from '../lib/transaction-utils';
import { TransactionTypeIcon } from './transaction-type-icon';
import { TransactionAccountDisplay } from './transaction-account-display';
import { TransactionAmountDisplay } from './transaction-amount-display';
import { TransactionPaymentMethod } from './transaction-payment-method';

interface TransactionListItemProps {
  transaction: TransactionFragmentFragment;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
  hideWarnings?: boolean;
  showType?: boolean;
  refetchVariables?: any;
  sourceAccountIdFallback?: string;
  destinyAccountIdFallback?: string;
}
export function TransactionListItem({
  transaction,
  hideAccount = false,
  hideActions = [],
  compact = false,
  hideWarnings = false,
  showType = true,
  refetchVariables,
  sourceAccountIdFallback,
  destinyAccountIdFallback,
}: TransactionListItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const handleEdit = () => {
    if (!isBillingPayment) {
      setEditOpen(true);
    }
  };

  const {
    cancelLoading,
    updateLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    scopeDialogOpen,
    handleScopeDialogClose,
    handleScopeSelected,
    handleBeforeSubmit,
    handleCancel,
    handleFastUpdate,
  } = useTransactionMutations({
    transaction,
    refetchVariables,
  });

  const isIncome = transaction.type === TransactionType.Income;
  const isExpense = transaction.type === TransactionType.Expense;
  const isBetweenAccounts =
    transaction.type === TransactionType.BetweenAccounts;
  const isOverdue = transaction.status === TransactionStatus.Overdue;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isBillingPayment = !!transaction.billingPayment;
  const cardId = transaction.billingPayment?.card?.id;

  // Transação pertence a uma fatura de cartão (não é a transação de pagamento)
  const isPartOfBilling = !!transaction.cardBilling;
  // Verifica se é uma despesa que está incluída em uma fatura ou tem parcelas
  const isExpenseForBilling =
    isExpense &&
    (isPartOfBilling || (transaction.totalInstallments ?? 0) > 0) &&
    !hideWarnings;

  const renderEditForm = () => {
    const normalizedTransaction = normalizeTransactionForEdit(transaction);
    const onBeforeSubmit = handleBeforeSubmit;

    switch (transaction.type) {
      case TransactionType.Income:
        return (
          <IncomeTransactionCreateForm
            editTransaction={normalizedTransaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
            refetchVariables={refetchVariables}
          />
        );
      case TransactionType.Expense:
        return (
          <ExpenseTransactionCreateForm
            editTransaction={normalizedTransaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
            refetchVariables={refetchVariables}
          />
        );
      case TransactionType.BetweenAccounts:
        return (
          <BetweenAccountsTransactionCreateForm
            editTransaction={normalizedTransaction}
            open={editOpen}
            onOpenChange={setEditOpen}
            onBeforeSubmit={onBeforeSubmit}
            refetchVariables={refetchVariables}
          />
        );
      default:
        return null;
    }
  };

  const renderAccountInfoForDialog = () => {
    if (isBetweenAccounts) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Conta</span>
          <div className="flex items-center gap-2">
            {transaction.sourceAccount && (
              <div className="flex items-center gap-1">
                <InstitutionLogo
                  logoUrl={
                    transaction.sourceAccount.institutionLink?.institution
                      ?.logoUrl
                  }
                  name={
                    transaction.sourceAccount.institutionLink?.institution?.name
                  }
                  size="sm"
                />
                <span className="text-sm font-medium">
                  {transaction.sourceAccount.name}
                </span>
              </div>
            )}
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            {transaction.destinyAccount && (
              <div className="flex items-center gap-1">
                <InstitutionLogo
                  logoUrl={
                    transaction.destinyAccount.institutionLink?.institution
                      ?.logoUrl
                  }
                  name={
                    transaction.destinyAccount.institutionLink?.institution
                      ?.name
                  }
                  size="sm"
                />
                <span className="text-sm font-medium">
                  {transaction.destinyAccount.name}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isIncome && transaction.destinyAccount) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Creditada em</span>
          <div className="flex items-center gap-2">
            <InstitutionLogo
              logoUrl={
                transaction.destinyAccount.institutionLink?.institution?.logoUrl
              }
              name={
                transaction.destinyAccount.institutionLink?.institution?.name
              }
              size="sm"
            />
            <span className="text-sm font-medium">
              {transaction.destinyAccount.name}
            </span>
          </div>
        </div>
      );
    }

    if (isExpense) {
      const account =
        transaction.sourceAccount ||
        transaction.cardBilling?.paymentTransaction?.sourceAccount;
      if (account) {
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Debitada de</span>
            <div className="flex items-center gap-2">
              <InstitutionLogo
                logoUrl={account.institutionLink?.institution?.logoUrl}
                name={account.institutionLink?.institution?.name}
                size="sm"
              />
              <span className="text-sm font-medium">{account.name}</span>
            </div>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <>
      <div
        onClick={handleEdit}
        className={cn(
          'group flex items-center justify-between gap-4 border-b border-border/50 bg-card p-4 transition-colors last:border-b-0 hover:bg-muted/50',
          !isBillingPayment && 'cursor-pointer',
          isOverdue && 'bg-destructive/5 dark:bg-destructive/10',
          (transaction.cardBilling ||
            (transaction.totalInstallments ?? 0) > 0) &&
            !hideWarnings &&
            '',
        )}
      >
        <div className="flex flex-1 items-center gap-4 overflow-hidden">
          {/* Ícone do tipo */}
          {showType && <TransactionTypeIcon type={transaction.type} />}

          {/* Data (somente em modo compacto) */}
          {compact && (
            <span className="whitespace-nowrap rounded bg-muted/50 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              {format(new Date(transaction.date), "d 'de' MMMM", {
                locale: ptBR,
              })}
            </span>
          )}

          {/* Descrição e Conta */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 truncate text-base font-semibold">
                {isBillingPayment ? (
                  <>
                    <span className="text-muted-foreground">Fatura </span>
                    <span className="capitalize">
                      {format(transaction.billingPayment?.periodEnd, 'MMMM', {
                        locale: ptBR,
                      })}
                    </span>{' '}
                    <span>
                      {format(
                        transaction.billingPayment?.periodEnd,
                        "'de' yyyy",
                        { locale: ptBR },
                      )}
                    </span>
                  </>
                ) : (
                  <span
                    className={cn(
                      'truncate text-base font-semibold',
                      !transaction.description &&
                        'italic text-muted-foreground',
                    )}
                  >
                    {transaction.description || 'Sem descrição'}
                  </span>
                )}
              </span>
              {(transaction.totalInstallments ?? 0) > 0 &&
                (transaction.installmentNumber ?? 0) > 0 && (
                  <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {transaction.installmentNumber}/
                    {transaction.totalInstallments}
                  </span>
                )}
              <TransactionCategoryBadge
                category={transaction.category}
                className="ml-1"
              />
            </div>
            {(!hideAccount || isBillingPayment) && (
              <TransactionAccountDisplay
                transaction={transaction}
                hideWarnings={hideWarnings}
                sourceAccountIdFallback={sourceAccountIdFallback}
                destinyAccountIdFallback={destinyAccountIdFallback}
              />
            )}
          </div>
        </div>

        {/* Valor & Ações */}
        <div className="flex shrink-0 items-center gap-4">
          <TransactionPaymentMethod
            paymentMethod={transaction.paymentMethod}
            type={transaction.type}
            isExpenseForBilling={isExpenseForBilling}
            isCardAccount={!!transaction.sourceCard}
            isDebitCard={transaction.sourceCard?.type === CardType.Debit}
          />

          <TransactionAmountDisplay
            amount={transaction.amount}
            type={transaction.type}
            isExpenseForBilling={isExpenseForBilling}
          />

          {/* Status */}
          <TransactionStatusBadge status={transaction.status} />

          {/* Ações inline */}
          <div className="flex items-center gap-1">
            {isBillingPayment && (
              <SimpleTooltip label="Ver fatura" side="top">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link
                    href={`/cards/${cardId}?billingId=${transaction.billingPayment?.id}`}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver fatura</span>
                  </Link>
                </Button>
              </SimpleTooltip>
            )}
          </div>
        </div>
      </div>

      {renderEditForm()}
      <TransactionEditScopeDialog
        open={scopeDialogOpen}
        onOpenChange={handleScopeDialogClose}
        onSelectScope={handleScopeSelected}
      />

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar transação?</AlertDialogTitle>
            <AlertDialogDescription>
              {transaction.cancelWarningMessage ? (
                <>
                  <strong className="text-amber-600">
                    {transaction.cancelWarningMessage}
                  </strong>
                  <br />
                  <br />
                </>
              ) : null}
              Tem certeza que deseja cancelar esta transação? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Informações da transação */}
          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            {renderAccountInfoForDialog()}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Descrição</span>
              <span className="text-sm font-medium">
                {transaction.description || 'Sem descrição'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data</span>
              <span className="text-sm font-medium">
                {formatDateExtended(transaction.date)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valor</span>
              <span className="text-sm font-medium">
                {formatCurrency(Number(transaction.amount))}
              </span>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelLoading ? 'Cancelando...' : 'Sim, cancelar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
