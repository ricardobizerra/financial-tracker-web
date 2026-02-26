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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  Check,
  Pencil,
  X,
  CreditCard,
  Eye,
  HelpCircle,
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

interface TransactionCardProps {
  transaction: TransactionFragmentFragment;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
  hideWarnings?: boolean;
  showType?: boolean;
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

export function TransactionCard({
  transaction,
  hideAccount = false,
  hideActions = [],
  compact = false,
  hideWarnings = false,
  showType = true,
}: TransactionCardProps) {
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
  const billingAccountId = transaction.billingPayment?.card?.institutionLink?.id;

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
      const sourceInst = transaction.sourceAccount?.institutionLink?.institution;
      const destInst = transaction.destinyAccount?.institutionLink?.institution;
      return (
        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          {sourceInst && (
            <>
              <InstitutionLogo
                logoUrl={sourceInst.logoUrl}
                name={sourceInst.name}
                size="sm"
              />
              <span>{transaction.sourceAccount?.name}</span>
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
          <span>{transaction.destinyAccount?.name}</span>
        </div>
      );
    }

    const account = isIncome
      ? transaction.destinyAccount
      : transaction.sourceAccount ||
        transaction.cardBilling?.paymentTransaction?.sourceAccount;

    if (!account) return null;

    const institution = account.institutionLink?.institution;

    return (
      <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
        {institution && (
          <InstitutionLogo
            logoUrl={institution.logoUrl}
            name={institution.name}
            size="sm"
          />
        )}
        <span>{account.name}</span>
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
                  logoUrl={transaction.sourceAccount.institutionLink?.institution?.logoUrl}
                  name={transaction.sourceAccount.institutionLink?.institution?.name}
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
                  logoUrl={transaction.destinyAccount.institutionLink?.institution?.logoUrl}
                  name={transaction.destinyAccount.institutionLink?.institution?.name}
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
              logoUrl={transaction.destinyAccount.institutionLink?.institution?.logoUrl}
              name={transaction.destinyAccount.institutionLink?.institution?.name}
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

  // Renderizar botões de ação
  const renderActionButtons = () => {
    // Transação de pagamento de fatura
    if (isBillingPayment) {
      // Botão para ver detalhes da fatura
      return (
        <div className="flex w-full flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            asChild
            className="min-w-[120px] flex-1"
          >
            <Link
              href={`/accounts/${billingAccountId}?billingId=${transaction.billingPayment?.id}`}
            >
              <Eye className="h-4 w-4" />
              Ver fatura
            </Link>
          </Button>
        </div>
      );
    }

    // Transação normal
    return (
      <div className="flex w-full flex-wrap items-center gap-2">
        {/* Editar */}
        {!hideActions.includes('edit') && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEdit}
            className="min-w-[100px] flex-1"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>
        )}

        {/* Cancelar */}
        {canEditFully &&
          !hideActions.includes('cancel') &&
          (transaction.canCancel ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setCancelDialogOpen(true)}
              className="min-w-[100px] flex-1"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          ) : transaction.cancelReason ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="min-w-[100px] flex-1">
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled
                    className="w-full"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{transaction.cancelReason}</p>
              </TooltipContent>
            </Tooltip>
          ) : null)}
      </div>
    );
  };

  return (
    <>
      <Card
        className={cn(
          'overflow-hidden transition-all hover:shadow-md',
          isOverdue &&
            'border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20',
          (transaction.cardBilling ||
            (transaction.totalInstallments ?? 0) > 0) &&
            !hideWarnings &&
            'border-dashed',
        )}
      >
        {/* Ícone do tipo */}
        {showType && (
          <SimpleTooltip
            hidden={!isExpenseForBilling}
            label={
              transaction.cardBilling ? (
                <>
                  Este pagamento está incluído na fatura de{' '}
                  <span className="font-semibold">
                    {format(
                      transaction.cardBilling?.periodEnd,
                      "MMMM 'de' yyyy",
                      {
                        locale: ptBR,
                      },
                    )}
                  </span>{' '}
                  do cartão{' '}
                  <span className="font-semibold">
                    {transaction.sourceAccount?.name}
                  </span>
                </>
              ) : (
                <>
                  Este pagamento está incluído{' '}
                  {(transaction.totalInstallments ?? 0) > 0 ? 'nas' : 'na'}{' '}
                  <span className="font-semibold">
                    {transaction.totalInstallments}{' '}
                    {(transaction.totalInstallments ?? 0) > 0
                      ? 'próximas faturas'
                      : 'próxima fatura'}
                  </span>
                  , a partir da data da operação
                </>
              )
            }
            side="top"
          >
            <div
              className={cn(
                'flex shrink-0 cursor-default items-center justify-center gap-1 py-1 text-xs font-medium',
                isIncome &&
                  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
                isExpense &&
                  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
                isExpenseForBilling &&
                  'text-muted-foreground dark:text-muted-foreground',
                isBetweenAccounts &&
                  'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              )}
            >
              {isIncome && (
                <>
                  <ArrowUp className="h-4 w-4" />
                  <span>Entrada</span>
                </>
              )}
              {isExpense && (
                <>
                  {isExpenseForBilling ? (
                    <HelpCircle className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  <span>
                    {isExpenseForBilling ? 'Despesa para fatura' : 'Despesa'}
                  </span>
                </>
              )}
              {isBetweenAccounts && (
                <>
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Transferência</span>
                </>
              )}
            </div>
          </SimpleTooltip>
        )}

        <CardContent className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-3">
          {/* Mobile: ícone + valor na linha superior */}
          <div className="flex items-center justify-between sm:contents">
            {/* Valor - aparece à direita em mobile, no final em desktop */}
            <div
              className={cn(
                'shrink-0 text-lg font-semibold sm:order-last sm:text-base',
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
          </div>

          {/* Descrição, data e conta - ocupa toda a largura em mobile */}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs text-muted-foreground">
              {formatDateExtended(
                transaction.installmentStartDate ?? transaction.date,
                transaction.installmentStartDate ? transaction.date : null,
              )}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold sm:text-base">
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
              {transaction.installments &&
                (transaction.totalInstallments ?? 0) > 0 &&
                (transaction.installmentNumber ?? 0) > 0 && (
                  <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {transaction.installmentNumber}/
                    {transaction.totalInstallments}
                  </span>
                )}
            </div>
            {!hideAccount && getAccountDisplay()}
          </div>
        </CardContent>

        {/* Footer com botões de ação */}
        <div className="bg-muted/30 px-3 py-2">{renderActionButtons()}</div>
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
