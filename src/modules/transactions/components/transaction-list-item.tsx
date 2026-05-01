'use client';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  TransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
  UpdateRecurringScope,
  PaymentMethod,
  CardBillingStatus,
} from '@/graphql/graphql';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  Pencil,
  X,
  Eye,
  Clock,
  CheckCircle2,
  Ban,
  AlertTriangle,
} from 'lucide-react';
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
  UpdateRecurringTransactionsMutation,
  CancelTransactionMutation,
} from '../graphql/transactions-mutations';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { BillingQuery } from '@/modules/accounts/graphql/accounts-queries';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  paymentMethodIcons,
  paymentMethodLabel,
  transactionStatusLabel,
} from '../transactions-constants';
import { TransactionCategoryBadge } from './transaction-category-badge';
import { TransactionStatusBadge } from './transaction-status-badge';

interface TransactionListItemProps {
  transaction: TransactionFragmentFragment;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
  hideWarnings?: boolean;
  showType?: boolean;
  refetchVariables?: any;
}

function normalizeTransactionForEdit(
  transaction: TransactionFragmentFragment,
): TransactionFragmentFragment {
  const totalInstallments = transaction.totalInstallments ?? 0;
  const installmentNumber = transaction.installmentNumber ?? 0;

  if (totalInstallments <= 0 || installmentNumber <= 0) {
    return transaction;
  }

  const currentInstallment =
    transaction.installments?.find((i) =>
      transaction.installmentId
        ? i.id === transaction.installmentId
        : i.installmentNumber === installmentNumber,
    ) ?? null;

  if (!currentInstallment) {
    return transaction;
  }

  const currentAmount = Number(transaction.amount);
  const installmentAmount = Number(currentInstallment.amount);

  // Billing queries override transaction.amount with installment amount.
  // For edit mutation we must send the full transaction amount.
  if (Math.abs(currentAmount - installmentAmount) < 0.000001) {
    return {
      ...transaction,
      amount: installmentAmount * totalInstallments,
    };
  }

  return transaction;
}

// Formatar data com mês por extenso e ano só se não for o ano atual
// ou se for diferente do ano de referência (para parcelas)
function formatDateExtended(
  dateStr: string,
  referenceDateStr?: string | null,
): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();

  // Se tiver data de referência, comparar com ela
  if (referenceDateStr) {
    const referenceDate = new Date(referenceDateStr);
    const referenceYear = referenceDate.getFullYear();

    if (year !== referenceYear) {
      return `${day} de ${month} de ${year}`;
    }
    return `${day} de ${month}`;
  }

  // Caso padrão: comparar com o ano atual
  const currentYear = new Date().getFullYear();
  if (year === currentYear) {
    return `${day} de ${month}`;
  } else {
    return `${day} de ${month} de ${year}`;
  }
}

// Formatar período da fatura (mês/ano)
function formatBillingPeriod(periodStartStr: string): string {
  const date = new Date(periodStartStr);
  const month = date
    .toLocaleDateString('pt-BR', { month: 'short' })
    .replace('.', '');
  const year = date.getFullYear();
  return `${month}/${year}`;
}

// Traduzir status da fatura
function getBillingStatusInfo(status: CardBillingStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case CardBillingStatus.Pending:
      return {
        label: 'Aberta',
        className:
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      };
    case CardBillingStatus.Closed:
      return {
        label: 'Fechada',
        className:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      };
    case CardBillingStatus.Overdue:
      return {
        label: 'Vencida',
        className:
          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      };
    case CardBillingStatus.Paid:
      return {
        label: 'Paga',
        className:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      };
    case CardBillingStatus.Completed:
      return {
        label: 'Concluída',
        className:
          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      };
    default:
      return { label: status, className: 'bg-gray-100 text-gray-700' };
  }
}

export function TransactionListItem({
  transaction,
  hideAccount = false,
  hideActions = [],
  compact = false,
  hideWarnings = false,
  showType = true,
  refetchVariables,
}: TransactionListItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [descriptionEditOpen, setDescriptionEditOpen] = useState(false);
  const [scopeDialogOpen, setScopeDialogOpen] = useState(false);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const scopeResolverRef = React.useRef<
    ((shouldContinue: boolean) => void) | null
  >(null);

  const [pendingData, setPendingData] = useState<{
    description: string;
    amount: number;
    paymentMethod?: string;
  } | null>(null);

  const [updateRecurringTransactions] = useMutation(
    UpdateRecurringTransactionsMutation,
    {
      refetchQueries: [
        refetchVariables
          ? { query: TransactionsQuery, variables: refetchVariables }
          : TransactionsQuery,
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

  const [cancelTransaction, { loading: cancelLoading }] = useMutation(
    CancelTransactionMutation,
    {
      refetchQueries: [
        TransactionsQuery,
        TransactionsGroupedByPeriodQuery,
        TransactionsSummaryQuery,
        BillingQuery,
      ],
      onCompleted: () => {
        toast.success('Transação cancelada!');
        setCancelDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const isIncome = transaction.type === TransactionType.Income;
  const isExpense = transaction.type === TransactionType.Expense;
  const isBetweenAccounts =
    transaction.type === TransactionType.BetweenAccounts;
  const isOverdue = transaction.status === TransactionStatus.Overdue;
  const isCompleted = transaction.status === TransactionStatus.Completed;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isImmutable = isCompleted || isCanceled;
  const isRecurring = !!transaction.recurringTransactionId;
  const isBillingPayment = !!transaction.billingPayment;

  // Transação pertence a uma fatura de cartão (não é a transação de pagamento)
  const isPartOfBilling = !!transaction.cardBilling;
  // Verifica se é uma despesa que está incluída em uma fatura ou tem parcelas
  const isExpenseForBilling =
    isExpense &&
    (isPartOfBilling || (transaction.totalInstallments ?? 0) > 0) &&
    !hideWarnings;
  const cardBillingStatus = transaction.cardBilling?.status;
  const isCardBillingOpen = cardBillingStatus === CardBillingStatus.Pending;
  const isCardBillingClosed =
    cardBillingStatus === CardBillingStatus.Closed ||
    cardBillingStatus === CardBillingStatus.Overdue ||
    cardBillingStatus === CardBillingStatus.Paid;

  // Fatura está fechada (pode ser paga) se status for CLOSED ou OVERDUE (para billingPayment)
  const billingStatus = transaction.billingPayment?.status;
  const isBillingClosed =
    billingStatus === CardBillingStatus.Closed ||
    billingStatus === CardBillingStatus.Overdue;
  const isBillingOpen = billingStatus === CardBillingStatus.Pending;
  const cardId = transaction.billingPayment?.card?.id;

  // Transação é editável: tudo exceto CANCELED
  // Backend faz as validações de fatura e recalculações necessárias
  const canEditFully = !isCanceled;

  const handleEdit = () => {
    if (!canEditFully) {
      // Transação cancelada: só pode editar descrição
      setDescriptionEditOpen(true);
    } else {
      setEditOpen(true);
    }
  };

  const handleConfirmCancel = () => {
    cancelTransaction({ variables: { id: transaction.id } });
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
    const normalizedTransaction = normalizeTransactionForEdit(transaction);
    const onBeforeSubmit = isRecurring ? handleBeforeSubmit : undefined;

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

  const getAccountDisplay = () => {
    if (isBillingPayment) {
      const card = transaction.billingPayment?.card;
      const cardInstitution = card?.institutionLink?.institution;
      const account = transaction.sourceAccount;
      const accountInstitution = account?.institutionLink?.institution;
      if (!card) return null;
      return (
        <>
          <div className="flex items-center gap-1.5">
            {cardInstitution && (
              <InstitutionLogo
                logoUrl={cardInstitution.logoUrl}
                name={cardInstitution.name}
                size="sm"
              />
            )}
            <p className="text-sm font-medium">
              <span className="text-muted-foreground">Cartão</span>{' '}
              <span>{card.name}</span>
            </p>
          </div>
          {account ? (
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-muted-foreground">
                {transaction.status === TransactionStatus.Completed
                  ? 'Paga'
                  : 'A pagar'}{' '}
                via
              </p>
              {accountInstitution && (
                <InstitutionLogo
                  logoUrl={accountInstitution.logoUrl}
                  name={accountInstitution.name}
                  size="sm"
                />
              )}
              <p className="text-sm font-medium">
                <span className="text-muted-foreground">Conta</span>{' '}
                <span>{account.name}</span>
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              Conta de pagamento não definida
            </p>
          )}
        </>
      );
    }

    if (isBetweenAccounts) {
      const sourceInst =
        transaction.sourceAccount?.institutionLink?.institution;
      const destInst = transaction.destinyAccount?.institutionLink?.institution;
      return (
        <div className="flex items-center gap-1.5">
          {sourceInst && (
            <>
              <InstitutionLogo
                logoUrl={sourceInst.logoUrl}
                name={sourceInst.name}
                size="sm"
              />
              <p className="text-sm font-medium">
                <span className="text-muted-foreground">Conta</span>{' '}
                <span>{transaction.sourceAccount?.name}</span>
              </p>
              <ArrowRight className="h-3 w-3" />
            </>
          )}
          {destInst && (
            <InstitutionLogo
              logoUrl={destInst.logoUrl}
              name={destInst.name}
              size="sm"
            />
          )}
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">Conta</span>{' '}
            <span>{transaction.destinyAccount?.name}</span>
          </p>
        </div>
      );
    }

    const account = isIncome
      ? transaction.destinyAccount
      : (transaction.sourceAccount ??
        (transaction.sourceCard as typeof transaction.sourceAccount | null) ??
        transaction.cardBilling?.paymentTransaction?.sourceAccount);

    if (!account) return null;

    const institution = account.institutionLink?.institution;

    return (
      <div className="flex items-center gap-1.5">
        {institution && (
          <InstitutionLogo
            logoUrl={institution.logoUrl}
            name={institution.name}
            size="sm"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">
              {transaction.sourceCard ? 'Cartão' : 'Conta'}
            </span>{' '}
            <span>{account.name}</span>
          </p>
          {isExpenseForBilling && !hideWarnings && transaction.cardBilling && (
            <span className="text-xs font-normal">
              {(transaction.installments?.length ?? 0) > 0 ? (
                <>
                  Parcelado em{' '}
                  <span className="font-semibold">
                    {transaction.installments?.length}x
                  </span>{' '}
                  a partir da fatura de{' '}
                  {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                <>
                  Fatura de{' '}
                  {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                  {transaction.cardBilling.paymentDate && (
                    <>
                      {' '}
                      ·{' '}
                      <span className="font-semibold">
                        A ser paga até{' '}
                        {format(
                          transaction.cardBilling.paymentDate,
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR },
                        )}
                      </span>
                    </>
                  )}
                </>
              )}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Renderiza informações da conta para os dialogs (formato mais detalhado)
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

  const TypeIcon = () => {
    if (isIncome) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <ArrowUp className="h-5 w-5" />
        </div>
      );
    }
    if (isExpense) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <ArrowDown className="h-5 w-5" />
        </div>
      );
    }
    if (isBetweenAccounts) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <ArrowLeftRight className="h-5 w-5" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        className={cn(
          'group flex items-center justify-between gap-4 border-b border-border/50 bg-card p-4 transition-colors last:border-b-0 hover:bg-muted/50',
          isOverdue && 'bg-red-50/30 dark:bg-red-950/10',
          (transaction.cardBilling ||
            (transaction.totalInstallments ?? 0) > 0) &&
            !hideWarnings &&
            '',
        )}
      >
        <div className="flex flex-1 items-center gap-4 overflow-hidden">
          {/* Ícone do tipo */}
          {showType && <TypeIcon />}

          {/* Descrição e Conta */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-base font-semibold">
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
                  transaction.description || 'Sem descrição'
                )}
              </span>
              {(transaction.totalInstallments ?? 0) > 0 &&
                (transaction.installmentNumber ?? 0) > 0 && (
                  <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {transaction.installmentNumber}/
                    {transaction.totalInstallments}
                  </span>
                )}
              {transaction.category &&
                !isBillingPayment &&
                !isBetweenAccounts && (
                  <TransactionCategoryBadge
                    category={transaction.category}
                    className="ml-1"
                  />
                )}
            </div>
            {(!hideAccount || isBillingPayment) && getAccountDisplay()}
          </div>
        </div>

        {/* Valor & Ações */}
        <div className="flex shrink-0 items-center gap-4">
          {/* Método de pagamento */}
          {transaction.paymentMethod &&
            !isBillingPayment &&
            (() => {
              const PayIcon =
                paymentMethodIcons[
                  transaction.paymentMethod as keyof typeof paymentMethodIcons
                ];
              return PayIcon ? (
                <SimpleTooltip
                  label={
                    paymentMethodLabel[
                      transaction.paymentMethod as keyof typeof paymentMethodLabel
                    ]
                  }
                  side="top"
                >
                  <PayIcon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isExpense && 'text-red-600 dark:text-red-400',
                      isIncome && 'text-emerald-600 dark:text-emerald-400',
                      isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
                      (transaction.cardBilling ||
                        (transaction.totalInstallments ?? 0) > 0) &&
                        !hideWarnings &&
                        'text-muted-foreground dark:text-muted-foreground',
                    )}
                  />
                </SimpleTooltip>
              ) : null;
            })()}

          <div
            className={cn(
              'text-right text-base font-semibold',
              isIncome && 'text-emerald-600 dark:text-emerald-400',
              isExpense && 'text-red-600 dark:text-red-400',
              isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
              (transaction.cardBilling ||
                (transaction.totalInstallments ?? 0) > 0) &&
                !hideWarnings &&
                'text-muted-foreground dark:text-muted-foreground',
            )}
          >
            {isExpense && '-'}
            {formatCurrency(Number(transaction.amount))}
          </div>

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

            {!hideActions.includes('edit') && (
              <SimpleTooltip label="Editar" side="top">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleEdit}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </SimpleTooltip>
            )}

            {!isBillingPayment &&
              canEditFully &&
              !hideActions.includes('cancel') && (
                <SimpleTooltip
                  label={
                    transaction.canCancel
                      ? 'Cancelar'
                      : (transaction.cancelReason ?? 'Não pode ser cancelada')
                  }
                  side="top"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-8 w-8',
                      transaction.canCancel
                        ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
                        : 'cursor-not-allowed opacity-40',
                    )}
                    onClick={() => {
                      if (!transaction.canCancel) return;
                      setCancelDialogOpen(true);
                    }}
                    disabled={!transaction.canCancel}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancelar</span>
                  </Button>
                </SimpleTooltip>
              )}
          </div>
        </div>
      </div>

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

      {/* Dialog de cancelamento */}
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
              onClick={handleConfirmCancel}
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
