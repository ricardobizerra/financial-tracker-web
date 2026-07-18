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
  CardFragmentFragment,
} from '@/graphql/graphql';
import { TransactionsCardList } from '@/modules/transactions/components/transactions-card-list';
import { useMutation, useQuery } from '@apollo/client';
import { AccountsQuery, BillingQuery } from '../../graphql/accounts-queries';
import { ChangeBillingDatesMutation } from '../../graphql/accounts-mutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CreditCard as CreditCardIcon,
  Calendar,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
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
import { ExpenseTransactionCreateForm } from '@/modules/transactions/components/transaction-create-form';
import { formatPercentage } from '@/lib/formatters/percentage';
import { TransactionStatusBadge } from '@/modules/transactions/components/transaction-status-badge';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCallback } from 'react';
import { CardSettingsEditDialog } from '../card-settings-edit-dialog';
import { getTextColorForBackground } from '@/lib/color';
import { CardBillingStatusBadge } from '@/modules/cards/components/card-billing-status-badge';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

export function AccountCreditCardTracking({
  card,
}: {
  card: CardFragmentFragment;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Ler billingId da URL se existir (para navegação direta à fatura)
  const searchParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  );
  const billingIdFromUrl = searchParams.get('billingId');

  const { data, loading, refetch } = useQuery(BillingQuery, {
    variables: {
      cardId: card.id,
      id: billingIdFromUrl || undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [changeBillingDatesMutation] = useMutation(ChangeBillingDatesMutation);

  const billing = data?.billing?.billing;
  const nextBillingId = data?.billing?.nextBillingId;
  const previousBillingId = data?.billing?.previousBillingId;

  const changeBillingDatesForm = useForm<z.infer<typeof changeBillingDatesSchema>>({
    values: {
      closingDate: billing?.periodEnd ? new Date(billing.periodEnd) : new Date(),
      paymentDate: billing?.paymentDate ? new Date(billing.paymentDate) : new Date(),
    },
  });

  const handleChangeBillingDates = async (
    data: z.infer<typeof changeBillingDatesSchema>,
  ) => {
    if (!billing) return;

    try {
      setIsProcessing(true);
      await changeBillingDatesMutation({
        variables: {
          billingId: billing.id,
          closingDate: data.closingDate,
          paymentDate: data.paymentDate,
        },
      });
      await refetch();
      toast.success('Sucesso', {
        description: 'Datas da fatura alteradas com sucesso',
      });
    } catch (error) {
      toast.error('Erro', {
        description: 'Não foi possível alterar as datas da fatura. Tente novamente.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadBilling = async (billingId: string) => {
    await refetch({ cardId: card.id, id: billingId });
  };

  const isMobile = useIsMobile();
  const predictedClosingDate = useMemo(() => {
    return billing?.periodEnd ? new Date(billing.periodEnd) : new Date();
  }, [billing?.periodEnd]);
  const predictedClosingLabel = useMemo(() => {
    const periodEnd = predictedClosingDate;
    const today = new Date();
    const isCurrentYear = periodEnd.getFullYear() === today.getFullYear();
    const month = periodEnd.toLocaleDateString('pt-BR', { month: 'long' });
    const day = periodEnd.getDate();
    return isCurrentYear
      ? `${day} de ${month}`
      : `${day} de ${month} de ${periodEnd.getFullYear()}`;
  }, [predictedClosingDate]);
  const changeBillingDatesSchema = useMemo(
    () =>
      z.object({
        closingDate: formFields.date.describe('Data de Fechamento'),
        paymentDate: formFields.date.describe('Data de Vencimento'),
      }),
    [],
  );

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
  const isPaid = billing.status === CardBillingStatus.Paid;
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Card */}
      <Card
        className="overflow-hidden"
        style={{
          backgroundColor:
            card.institutionLink?.institution.color ?? 'hsl(var(--background))',
        }}
      >
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              {card.institutionLink?.institution.logoUrl ? (
                <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-white p-2 shadow-sm sm:h-16 sm:w-16">
                  <InstitutionLogo
                    logoUrl={card.institutionLink?.institution.logoUrl}
                    name={card.institutionLink?.institution.name}
                    size="lg"
                    className="h-full w-full bg-transparent"
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
                        card.institutionLink?.institution.color,
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
                        card.institutionLink?.institution.color,
                      ),
                    }}
                  >
                    {card.name}
                  </h1>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <p
                    className="truncate text-sm opacity-90 sm:text-base"
                    style={{
                      color: getTextColorForBackground(
                        card.institutionLink?.institution.color,
                      ),
                    }}
                  >
                    {card.institutionLink?.institution.name ||
                      'Instituição não informada'}
                  </p>
                  {billing.card.lastFourDigits && (
                    <>
                      <span
                        className="text-sm opacity-60"
                        style={{
                          color: getTextColorForBackground(
                            card.institutionLink?.institution.color,
                          ),
                        }}
                      >
                        •
                      </span>
                      <span
                        className="font-mono text-sm opacity-90"
                        style={{
                          color: getTextColorForBackground(
                            card.institutionLink?.institution.color,
                          ),
                        }}
                      >
                        •••• {billing.card.lastFourDigits}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Card Settings Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Billing Cycle Day */}
              <div className="text-center">
                <div
                  className="text-xs font-medium uppercase tracking-wide opacity-75"
                  style={{
                    color: getTextColorForBackground(
                      card.institutionLink?.institution.color,
                    ),
                  }}
                >
                  Fechamento
                </div>
                <div
                  className="mt-1 text-lg font-bold sm:text-xl"
                  style={{
                    color: getTextColorForBackground(
                      card.institutionLink?.institution.color,
                    ),
                  }}
                >
                  Dia {billing.card.billingCycleDay}
                </div>
              </div>

              {/* Payment Day */}
              <div className="text-center">
                <div
                  className="text-xs font-medium uppercase tracking-wide opacity-75"
                  style={{
                    color: getTextColorForBackground(
                      card.institutionLink?.institution.color,
                    ),
                  }}
                >
                  Vencimento
                </div>
                <div
                  className="mt-1 text-lg font-bold sm:text-xl"
                  style={{
                    color: getTextColorForBackground(
                      card.institutionLink?.institution.color,
                    ),
                  }}
                >
                  Dia {billing.card.billingPaymentDay}
                </div>
              </div>

              {/* Settings Button */}
              <CardSettingsEditDialog
                cardId={billing.card.id}
                accountId={card.id}
                currentSettings={{
                  billingCycleDay: billing.card.billingCycleDay,
                  billingPaymentDay: billing.card.billingPaymentDay,
                  defaultLimit: Number(billing.card.defaultLimit),
                }}
                institutionColor={card.institutionLink?.institution.color}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Overview */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          {/* Period Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                previousBillingId && loadBilling(previousBillingId)
              }
              disabled={!previousBillingId || isProcessing}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold sm:text-base">
                  {formatDate(billing.periodStart)} a{' '}
                  {formatDate(billing.periodEnd)}
                </span>
              </div>
              <CardBillingStatusBadge status={billing.status} />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => nextBillingId && loadBilling(nextBillingId)}
              disabled={!nextBillingId || isProcessing}
              className="gap-1"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {/* Total / A Pagar - label changes by status */}
            <div className="rounded-lg border bg-card p-3 sm:p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {isPending ? 'Total' : isPaid ? 'Valor Pago' : 'A Pagar'}
              </div>
              <div
                className={cn(
                  'mt-1 text-xl font-bold tracking-tight sm:text-2xl',
                  isOverdue
                    ? 'text-destructive'
                    : isPaid
                      ? 'text-emerald-500'
                      : '',
                )}
              >
                {formatCurrency(billing.totalAmount)}
              </div>
            </div>

            {/* Second Card - Context-dependent */}
            <div className="rounded-lg border bg-card p-3 sm:p-4">
              {isPending ? (
                <>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Disponível
                  </div>
                  <div
                    className={cn(
                      'mt-1 text-xl font-bold tracking-tight sm:text-2xl',
                      availableLimit < 0
                        ? 'text-destructive'
                        : availableLimit < billing.limit * 0.1
                          ? 'text-orange-500'
                          : 'text-emerald-500',
                    )}
                  >
                    {formatCurrency(availableLimit)}
                  </div>
                </>
              ) : isPaid && billing.paymentTransaction ? (
                <>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Pago em
                  </div>
                  <div className="mt-1 text-xl font-bold tracking-tight text-emerald-500 sm:text-2xl">
                    {formatDate(billing.paymentTransaction.date)}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Vencimento
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={cn(
                        'text-xl font-bold tracking-tight sm:text-2xl',
                        isOverdue ? 'text-destructive' : '',
                      )}
                    >
                      {billing.paymentDate
                        ? formatDate(billing.paymentDate)
                        : '-'}
                    </span>
                    {billing.paymentDate && (
                      <span className="text-sm text-muted-foreground">
                        {(() => {
                          const today = new Date();
                          const dueDate = new Date(billing.paymentDate);
                          const diffTime = dueDate.getTime() - today.getTime();
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24),
                          );
                          if (diffDays < 0)
                            return (
                              <span className="text-destructive">
                                ({Math.abs(diffDays)}d atraso)
                              </span>
                            );
                          if (diffDays === 0)
                            return (
                              <span className="text-orange-500">(hoje)</span>
                            );
                          if (diffDays === 1) return '(amanhã)';
                          return `(${diffDays} dias)`;
                        })()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Transaction Count */}
            <div className="rounded-lg border bg-card p-3 sm:p-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Transações
              </div>
              <div className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                {billing.transactionsCount ?? 0}
              </div>
            </div>

            {/* Usage */}
            <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
              <div className="flex-1 p-3 sm:p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Uso do Limite
                </div>
                <div
                  className={cn(
                    'mt-1 text-xl font-bold tracking-tight sm:text-2xl',
                    billing.usagePercentage > 90
                      ? 'text-destructive'
                      : billing.usagePercentage > 70
                        ? 'text-orange-500'
                        : '',
                  )}
                >
                  {formatPercentage(billing.usagePercentage)}
                </div>
              </div>
              <Progress
                value={billing.usagePercentage}
                className="h-2 rounded-none"
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

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-2">
            {isPending && (
              <>
                <ExpenseTransactionCreateForm
                  cardId={card.id}
                  triggerSize="sm"
                  triggerClassName="flex-1 sm:flex-none"
                  minDate={new Date(billing.periodStart)}
                  maxDate={new Date(billing.periodEnd)}
                  status={TransactionStatus.Completed}
                  paymentMethod={
                    billing.card.type === CardType.Credit
                      ? PaymentMethod.CreditCard
                      : billing.card.type === CardType.Debit
                        ? PaymentMethod.DebitCard
                        : undefined
                  }
                  hiddenFields={['sourceAccount', 'paymentMethod']}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        'Alterar Datas'
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Alterar Datas da Fatura</DialogTitle>
                    </DialogHeader>
                    <TsForm
                      form={changeBillingDatesForm}
                      schema={changeBillingDatesSchema}
                      onSubmit={handleChangeBillingDates}
                      props={{
                        closingDate: {
                          minDate: billing.periodStart,
                        },
                        paymentDate: {
                          minDate: billing.periodStart,
                        },
                      }}
                      renderAfter={() => (
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isProcessing}
                          loading={isProcessing}
                        >
                          Salvar Alterações
                        </Button>
                      )}
                    >
                      {(fields) => (
                        <>
                          {fields.closingDate}
                          {fields.paymentDate}
                        </>
                      )}
                    </TsForm>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="min-w-0 flex-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsCardList cardBillingId={billing.id} hideAccount />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
