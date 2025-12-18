'use client';

import {
  AccountFragmentFragment,
  BillingQuery as BillingQueryType,
  CardBillingStatus,
  CardType,
  OrderDirection,
  OrdenationAccountModel,
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { TransactionsTable } from '@/modules/transactions/components/transactions-table';
import { useMutation, useQuery } from '@apollo/client';
import { AccountsQuery, BillingQuery } from '../../graphql/accounts-queries';
import {
  CloseBillingMutation,
  PayBillingMutation,
} from '../../graphql/accounts-mutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CreditCard as CreditCardIcon,
  Calendar,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { formatDate } from '@/lib/formatters/date';
import { formatCurrency } from '@/lib/formatters/currency';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formFields, TsForm } from '@/components/ts-form';
import { z } from 'zod';
import { formatPercentage } from '@/lib/formatters/percentage';
import { ExpenseTransactionCreateForm } from '@/modules/transactions/components/transaction-create-form';
import { TransactionStatusBadge } from '@/modules/transactions/components/transaction-status-badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCallback, useMemo } from 'react';
import { CardSettingsEditDialog } from '../card-settings-edit-dialog';

const closeBillingSchema = z.object({
  closingDate: formFields.date.describe('Data de fechamento'),
});

const payBillingSchema = z.object({
  sourceAccount: formFields.select.describe(
    'Conta de origem * // Selecione a conta para pagamento',
  ),
  date: formFields.date.describe('Data do pagamento * // Insira a data'),
  description: formFields.text.describe(
    'Descrição // Insira a descrição do pagamento',
  ),
});

interface PayBillingDialogProps {
  billing: NonNullable<NonNullable<BillingQueryType['billing']>['billing']>;
  isProcessing: boolean;
  onSubmit: (data: z.infer<typeof payBillingSchema>) => Promise<void>;
}

function PayBillingDialog({
  billing,
  isProcessing,
  onSubmit,
}: PayBillingDialogProps) {
  const [open, setOpen] = useState(false);

  const accountsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const accountsOptions = useMemo(
    () =>
      accountsQueryOptions.data?.accounts.edges?.map((edge) => ({
        value: edge.node.id,
        label: edge.node.name,
        data: {
          ...edge.node,
        },
      })) || [],
    [accountsQueryOptions.data?.accounts.edges],
  );

  const accountsPageInfo = accountsQueryOptions.data?.accounts.pageInfo;

  const paginate = useCallback(() => {
    accountsQueryOptions.fetchMore({
      variables: {
        after: accountsPageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          accounts: {
            ...prev.accounts,
            ...fetchMoreResult.accounts,
            edges: [
              ...(prev.accounts.edges || []),
              ...(fetchMoreResult.accounts.edges || []),
            ],
          },
        };
      },
    });
  }, [accountsQueryOptions, accountsPageInfo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          disabled={isProcessing}
          aria-label="Pagar fatura"
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="truncate">Processando...</span>
            </>
          ) : (
            <span className="truncate">Pagar Fatura</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pagamento da Fatura</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <TsForm
            schema={payBillingSchema}
            onSubmit={async (data) => {
              await onSubmit(data);
              setOpen(false);
            }}
            defaultValues={{
              date: billing.paymentTransaction?.date
                ? new Date(billing.paymentTransaction.date)
                : billing.paymentDate
                  ? new Date(billing.paymentDate)
                  : new Date(),
              description:
                billing.paymentTransaction?.description ||
                `Pagamento fatura ${formatDate(billing.periodStart)} - ${formatDate(billing.periodEnd)}`,
            }}
            props={{
              sourceAccount: {
                options: accountsOptions,
                renderLabel: (option) => (
                  <div className="flex items-center gap-3 py-1.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                      <Image
                        src={option.data.institution.logoUrl}
                        alt={option.data.institution.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <p className="truncate text-sm font-medium">
                        {option.label}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {option.data?.institution?.name}
                      </p>
                    </div>
                  </div>
                ),
                fetchMore: paginate,
                networkStatus: accountsQueryOptions.networkStatus,
                hasMore: accountsPageInfo?.hasNextPage,
              },
            }}
            renderAfter={() => (
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isProcessing}
                loading={isProcessing}
              >
                Pagar Fatura
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getTextColorForBackground(hexColor: string | null): string {
  if (!hexColor) return '#000000';

  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function AccountCreditCardTracking({
  account,
}: {
  account: AccountFragmentFragment;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data, loading, refetch } = useQuery(BillingQuery, {
    variables: {
      accountId: account.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [closeBillingMutation] = useMutation(CloseBillingMutation);
  const [payBillingMutation] = useMutation(PayBillingMutation);

  const billing = data?.billing?.billing;
  const nextBillingId = data?.billing?.nextBillingId;
  const previousBillingId = data?.billing?.previousBillingId;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      {
        label: string;
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
      }
    > = {
      PENDING: { label: 'Pendente', variant: 'secondary' },
      PAID: { label: 'Pago', variant: 'default' },
      OVERDUE: { label: 'Atrasado', variant: 'destructive' },
      CLOSED: { label: 'Fechado', variant: 'outline' },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: 'outline' as const,
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleCloseBilling = async (
    data: z.infer<typeof closeBillingSchema>,
  ) => {
    if (!billing) return;

    try {
      setIsProcessing(true);
      await closeBillingMutation({
        variables: {
          billingId: billing.id,
          closingDate: data.closingDate,
        },
      });
      await refetch();
      toast.success('Sucesso', {
        description: 'Fatura fechada com sucesso',
      });
    } catch (error) {
      toast.error('Erro', {
        description: 'Não foi possível fechar a fatura. Tente novamente.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayBilling = async (data: z.infer<typeof payBillingSchema>) => {
    if (!billing) return;

    try {
      setIsProcessing(true);
      await payBillingMutation({
        variables: {
          billingId: billing.id,
          sourceAccountId: data.sourceAccount.value,
          date: data.date,
          description: data.description,
        },
      });
      await refetch();
      toast.success('Sucesso', {
        description: 'Pagamento realizado com sucesso',
      });
    } catch (error) {
      toast.error('Erro', {
        description: 'Não foi possível realizar o pagamento. Tente novamente.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadBilling = async (billingId: string) => {
    await refetch({ accountId: account.id, id: billingId });
  };

  const isMobile = useIsMobile();

  if (loading && !billing) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!billing) {
    return <div>Nenhuma fatura encontrada para este cartão.</div>;
  }

  const availableLimit = billing.limit - billing.totalAmount;
  const isPending = billing.status === CardBillingStatus.Pending;
  const isClosed = billing.status === CardBillingStatus.Closed;
  const isOverdue = billing.status === CardBillingStatus.Overdue;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <Card
        className="overflow-hidden"
        style={{
          backgroundColor:
            account.institution.color ?? 'hsl(var(--background))',
        }}
      >
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              {account.institution?.logoUrl ? (
                <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-white p-2 shadow-sm sm:h-16 sm:w-16">
                  <Image
                    src={account.institution.logoUrl}
                    alt={account.institution.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl sm:h-16 sm:w-16"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <CreditCardIcon
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    style={{
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1
                    className="truncate text-xl font-bold leading-tight sm:text-2xl md:text-3xl"
                    style={{
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  >
                    {account.name}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="flex-shrink-0 text-xs"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  >
                    {billing.accountCard.type === CardType.Credit
                      ? 'Crédito'
                      : 'Débito'}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <p
                    className="truncate text-sm opacity-90 sm:text-base"
                    style={{
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  >
                    {account.institution?.name || 'Instituição não informada'}
                  </p>
                  {billing.accountCard.lastFourDigits && (
                    <>
                      <span
                        className="text-sm opacity-60"
                        style={{
                          color: getTextColorForBackground(
                            account.institution.color,
                          ),
                        }}
                      >
                        •
                      </span>
                      <span
                        className="font-mono text-sm opacity-90"
                        style={{
                          color: getTextColorForBackground(
                            account.institution.color,
                          ),
                        }}
                      >
                        •••• {billing.accountCard.lastFourDigits}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-2 sm:gap-8">
              {/* Available Credit */}
              <div className="flex-1">
                <div
                  className="text-xs font-medium uppercase tracking-wide opacity-75"
                  style={{
                    color: getTextColorForBackground(account.institution.color),
                  }}
                >
                  Disponível
                </div>
                <div
                  className="mt-1 text-lg font-bold sm:text-xl"
                  style={{
                    color:
                      availableLimit < 0
                        ? '#ef4444'
                        : availableLimit < billing.limit * 0.1
                          ? '#f97316'
                          : getTextColorForBackground(
                              account.institution.color,
                            ),
                  }}
                >
                  {formatCurrency(availableLimit)}
                </div>
              </div>

              {/* Due Date */}
              {billing.paymentDate && (
                <div className="flex-1">
                  <div
                    className="text-xs font-medium uppercase tracking-wide opacity-75"
                    style={{
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  >
                    Vencimento
                  </div>
                  <div
                    className="mt-1 text-lg font-bold sm:text-xl"
                    style={{
                      color: getTextColorForBackground(
                        account.institution.color,
                      ),
                    }}
                  >
                    {formatDate(billing.paymentDate)}
                  </div>
                  {isPending && (
                    <div
                      className="mt-0.5 text-xs opacity-75"
                      style={{
                        color: getTextColorForBackground(
                          account.institution.color,
                        ),
                      }}
                    >
                      {(() => {
                        const today = new Date();
                        const dueDate = new Date(billing.paymentDate);
                        const diffTime = dueDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24),
                        );
                        if (diffDays < 0) return 'Vencido';
                        if (diffDays === 0) return 'Vence hoje';
                        if (diffDays === 1) return 'Vence amanhã';
                        return `${diffDays} dias`;
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Overview, Period and Status */}
      <Card>
        <CardContent className="flex h-full flex-col gap-4 p-4 sm:p-5 md:flex-row">
          <div className="flex flex-1 items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                previousBillingId && loadBilling(previousBillingId)
              }
              disabled={!previousBillingId || isProcessing}
              className="h-9 w-9 flex-shrink-0"
              aria-label="Previous billing period"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Calendar className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm font-semibold sm:text-base">
                  {formatDate(billing.periodStart)} a{' '}
                  {formatDate(billing.periodEnd)}
                </span>
              </div>
              {getStatusBadge(billing.status)}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => nextBillingId && loadBilling(nextBillingId)}
              disabled={!nextBillingId || isProcessing}
              className="h-9 w-9 flex-shrink-0"
              aria-label="Next billing period"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation={isMobile ? 'horizontal' : 'vertical'} />

          <div className="flex flex-1 flex-col justify-between gap-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total da Fatura
              </div>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {formatCurrency(billing.totalAmount)}
                </span>
                <span className="text-base text-muted-foreground">
                  / {formatCurrency(billing.limit)}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Uso do limite
                </span>
                <span className="text-sm font-semibold">
                  {formatPercentage(billing.usagePercentage)}
                </span>
              </div>
              <Progress
                value={billing.usagePercentage}
                className="h-2.5"
                indicatorClassName={cn(
                  billing.usagePercentage > 90
                    ? 'bg-destructive'
                    : billing.usagePercentage > 70
                      ? 'bg-orange-500'
                      : 'bg-primary',
                )}
              />
            </div>
          </div>

          <Separator orientation={isMobile ? 'horizontal' : 'vertical'} />

          <div className="flex flex-wrap gap-2 md:flex-col">
            {isPending && (
              <>
                <ExpenseTransactionCreateForm
                  accountId={account.id}
                  triggerSize="sm"
                  triggerClassName="flex-1"
                  minDate={new Date(billing.periodStart)}
                  maxDate={new Date(billing.periodEnd)}
                  status={TransactionStatus.Completed}
                  paymentMethod={
                    billing.accountCard.type === CardType.Credit
                      ? PaymentMethod.CreditCard
                      : billing.accountCard.type === CardType.Debit
                        ? PaymentMethod.DebitCard
                        : undefined
                  }
                  hiddenFields={['sourceAccount', 'status', 'paymentMethod']}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={isProcessing}
                      aria-label="Fechar fatura"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span className="truncate">Processando...</span>
                        </>
                      ) : (
                        <span className="truncate">Fechar Fatura</span>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Fechamento da Fatura</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <TsForm
                        schema={closeBillingSchema}
                        onSubmit={handleCloseBilling}
                        defaultValues={{ closingDate: new Date() }}
                        props={{
                          closingDate: {
                            minDate: billing.periodStart,
                          },
                        }}
                        renderAfter={() => (
                          <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={isProcessing}
                            loading={isProcessing}
                          >
                            Fechar Fatura
                          </Button>
                        )}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {(isClosed || isOverdue) && (
              <PayBillingDialog
                billing={billing}
                isProcessing={isProcessing}
                onSubmit={handlePayBilling}
              />
            )}
            <CardSettingsEditDialog
              cardId={billing.accountCard.id}
              accountId={account.id}
              currentSettings={{
                billingCycleDay: billing.accountCard.billingCycleDay,
                billingPaymentDay: billing.accountCard.billingPaymentDay,
                defaultLimit: Number(billing.accountCard.defaultLimit),
              }}
            />
          </div>

          {!isPending && billing.paymentTransaction && (
            <>
              <Separator orientation={isMobile ? 'horizontal' : 'vertical'} />
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Data
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {formatDate(billing.paymentTransaction.date)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Status
                    </div>
                    <div className="mt-1.5">
                      <TransactionStatusBadge
                        status={billing.paymentTransaction.status}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>

      <div className="min-w-0 flex-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable
              cardBillingId={billing.id}
              hiddenActions={[
                TransactionType.Income,
                TransactionType.Expense,
                TransactionType.BetweenAccounts,
              ]}
              hiddenColumns={['type', 'status']}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
