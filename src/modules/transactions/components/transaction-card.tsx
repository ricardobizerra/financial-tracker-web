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
} from 'lucide-react';
import Link from 'next/link';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { TransactionEditDescriptionDialog } from './transaction-edit-description-dialog';
import { TransactionEditScopeDialog } from './transaction-edit-scope-dialog';
import { BillingPaymentEditDialog } from './billing-payment-edit-dialog';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';
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

interface TransactionCardProps {
  transaction: TransactionFragmentFragment;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
}

// Formatar data com mês por extenso e ano só se não for o ano atual
function formatDateExtended(dateStr: string): string {
  const date = new Date(dateStr);
  const currentYear = new Date().getFullYear();
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();

  if (year === currentYear) {
    return `${day} de ${month}`;
  } else {
    return `${day} de ${month} de ${year}`;
  }
}

export function TransactionCard({
  transaction,
  hideAccount = false,
  hideActions = [],
  compact = false,
}: TransactionCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [descriptionEditOpen, setDescriptionEditOpen] = useState(false);
  const [scopeDialogOpen, setScopeDialogOpen] = useState(false);
  const [billingPaymentEditOpen, setBillingPaymentEditOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
      refetchQueries: [TransactionsQuery, TransactionsGroupedByPeriodQuery],
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
  const isBetweenAccounts = transaction.type === TransactionType.BetweenAccounts;
  const isOverdue = transaction.status === TransactionStatus.Overdue;
  const isCompleted = transaction.status === TransactionStatus.Completed;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isImmutable = isCompleted || isCanceled;
  const isRecurring = !!transaction.recurringTransactionId;
  const isBillingPayment = !!transaction.billingPayment;

  // Fatura está fechada (pode ser paga) se status for CLOSED ou OVERDUE
  const billingStatus = transaction.billingPayment?.status;
  const isBillingClosed =
    billingStatus === CardBillingStatus.Closed ||
    billingStatus === CardBillingStatus.Overdue;
  const isBillingOpen = billingStatus === CardBillingStatus.Pending;
  const billingAccountId = transaction.billingPayment?.accountCard?.account?.id;

  const handleEdit = () => {
    if (isBillingPayment) {
      setBillingPaymentEditOpen(true);
    } else if (isImmutable) {
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
      const sourceInst = transaction.sourceAccount?.institution;
      const destInst = transaction.destinyAccount?.institution;
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground font-semibold">
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
        transaction.billingPayment?.accountCard?.account;

    if (!account) return null;

    const institution = account.institution;

    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground font-semibold">
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
                logoUrl={transaction.sourceAccount.institution.logoUrl}
                name={transaction.sourceAccount.institution.name}
                size="sm"
              />
              <span className="text-sm font-medium">{transaction.sourceAccount.name}</span>
            </div>
          )}
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          {transaction.destinyAccount && (
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={transaction.destinyAccount.institution.logoUrl}
                name={transaction.destinyAccount.institution.name}
                size="sm"
              />
              <span className="text-sm font-medium">{transaction.destinyAccount.name}</span>
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
            logoUrl={transaction.destinyAccount.institution.logoUrl}
            name={transaction.destinyAccount.institution.name}
            size="sm"
          />
          <span className="text-sm font-medium">{transaction.destinyAccount.name}</span>
        </div>
      </div>
    );
  }

  if (isExpense) {
    const account = transaction.sourceAccount || transaction.billingPayment?.accountCard?.account;
    if (account) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Debitada de</span>
          <div className="flex items-center gap-2">
            <InstitutionLogo
              logoUrl={account.institution.logoUrl}
              name={account.institution.name}
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
      const canPayBilling = isBillingClosed && !isImmutable;
      const tooltipMessage = isBillingOpen
        ? 'A fatura ainda está aberta'
        : isImmutable
          ? 'Fatura já paga'
          : '';

      // Se pode pagar, botão sem tooltip
      if (canPayBilling) {
        return (
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap md:flex-nowrap">
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="flex-1 md:flex-none"
            >
              <Link href={`/accounts/${billingAccountId}?billingId=${transaction.billingPayment?.id}`}>
                <Eye className="h-4 w-4" />
                Ver fatura
              </Link>
            </Button>
            <Button
              size="sm"
              onClick={() => setBillingPaymentEditOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 md:flex-none"
            >
              <CreditCard className="h-4 w-4" />
              Pagar fatura
            </Button>
          </div>
        );
      }

      // Se não pode pagar, botão com tooltip explicando
      return (
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap md:flex-nowrap">
          <Button
            variant="secondary"
            size="sm"
            asChild
            className="flex-1 md:flex-none"
          >
            <Link href={`/accounts/${billingAccountId}?billingId=${transaction.billingPayment?.id}`}>
              <Eye className="h-4 w-4" />
              Ver fatura
            </Link>
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  size="sm"
                  disabled
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 md:flex-none"
                >
                  <CreditCard className="h-4 w-4" />
                  Pagar fatura
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipMessage}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    // Transação normal
    return (
      <div className="flex items-center gap-2 w-full md:w-auto flex-wrap md:flex-nowrap">
        {/* Editar */}
        {!hideActions.includes('edit') && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEdit}
            className="flex-1 md:flex-none"
          >
            <Pencil className="h-4 w-4" />
            Editar detalhes
          </Button>
        )}

        {/* Confirmar pagamento */}
        {!isImmutable && !hideActions.includes('confirm') && (
          <Button
            size="sm"
            onClick={() => setConfirmDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 md:flex-none"
          >
            <Check className="h-4 w-4" />
            Confirmar
          </Button>
        )}

        {/* Cancelar */}
        {!isImmutable && !hideActions.includes('cancel') && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setCancelDialogOpen(true)}
            className="flex-1 md:flex-none"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
        )}
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
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-3 gap-3">
          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <div className="flex items-center justify-center gap-3">
              {/* Ícone do tipo */}
              <div
                className={cn(
                  'flex h-6 min-w-6 max-w-6 md:h-10 md:min-w-10 md:max-w-10 items-center justify-center rounded-full',
                  isIncome && 'bg-emerald-100 dark:bg-emerald-900/30',
                  isExpense && 'bg-red-100 dark:bg-red-900/30',
                  isBetweenAccounts && 'bg-blue-100 dark:bg-blue-900/30',
                )}
              >
                {isIncome && (
                  <ArrowUp className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 dark:text-emerald-400" />
                )}
                {isExpense && (
                  <ArrowDown className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400" />
                )}
                {isBetweenAccounts && (
                  <ArrowLeftRight className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              {/* Valor */}
              <div
                className={cn(
                  'md:min-w-[100px] text-nowrap text-right font-semibold',
                  isIncome && 'text-emerald-600 dark:text-emerald-400',
                  isExpense && 'text-red-600 dark:text-red-400',
                  isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
                )}
              >
                {isExpense && '-'}
                {formatCurrency(Number(transaction.amount))}
              </div>
            </div>

            <Separator orientation='horizontal' className='md:hidden' />

            {/* Descrição e conta */}
            <div className="flex flex-col gap-0.5 w-full">
              <span className="font-medium">
                {transaction.description || 'Sem descrição'}
              </span>
              {!hideAccount && getAccountDisplay()}
              <div className="text-sm text-muted-foreground">
                {formatDateExtended(transaction.date)}
              </div>
            </div>
          </div>

          {renderActionButtons()}
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
      <BillingPaymentEditDialog
        transaction={transaction}
        open={billingPaymentEditOpen}
        onOpenChange={setBillingPaymentEditOpen}
      />
      <TransactionConfirmDialog
        transaction={transaction}
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
      />

      {/* Dialog de cancelamento */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar transação?</AlertDialogTitle>
            <AlertDialogDescription>
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
