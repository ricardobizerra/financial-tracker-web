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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CreditCard as CreditCardIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useMemo, useState, useEffect, useRef } from 'react';
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

  const changeBillingDatesForm = useForm<
    z.infer<typeof changeBillingDatesSchema>
  >({
    values: {
      closingDate: billing?.periodEnd
        ? new Date(billing.periodEnd)
        : new Date(),
      paymentDate: billing?.paymentDate
        ? new Date(billing.paymentDate)
        : new Date(),
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
        description:
          'Não foi possível alterar as datas da fatura. Tente novamente.',
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

  const sortedBillings = useMemo(() => {
    if (!billing?.card?.billings) return [];
    return [...billing.card.billings].sort(
      (a, b) =>
        new Date(a.periodStart).getTime() - new Date(b.periodStart).getTime(),
    );
  }, [billing?.card?.billings]);

  const visibleBillings = useMemo(() => {
    if (!billing?.card?.billings) return [];

    // Sort all billings by start date ascending
    const sorted = [...billing.card.billings].sort(
      (a, b) =>
        new Date(a.periodStart).getTime() - new Date(b.periodStart).getTime(),
    );

    const activeIndex = sorted.findIndex((b) => b.id === billing.id);
    if (activeIndex === -1) return sorted.slice(0, 5);

    // Center window: up to 2 before and up to 2 after
    const start = Math.max(0, activeIndex - 2);
    const end = Math.min(sorted.length, activeIndex + 3);
    return sorted.slice(start, end);
  }, [billing?.card?.billings, billing?.id]);

  const activeCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [billing?.id]);

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

  const availableLimit = Number(billing.card.availableLimit ?? 0);
  const unpaidBalance = Number(billing.card.unpaidBalance ?? 0);
  const usagePercentage = Number(billing.card.usagePercentage ?? 0);
  const isPending = billing.status === CardBillingStatus.Pending;
  const isClosed = billing.status === CardBillingStatus.Closed;
  const isOverdue = billing.status === CardBillingStatus.Overdue;
  const isPaid = billing.status === CardBillingStatus.Paid;

  const formatMonthTab = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = d
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '');
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = d.toLocaleDateString('pt-BR', { year: '2-digit' });
    return `${capitalizedMonth} ${year}`;
  };
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header — Global Card Identity */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Left: Card Identity */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border bg-card p-2 shadow-sm">
            {card.institutionLink?.institution.logoUrl ? (
              <InstitutionLogo
                logoUrl={card.institutionLink?.institution.logoUrl}
                name={card.institutionLink?.institution.name}
                size="lg"
                className="h-full w-full bg-transparent object-contain"
              />
            ) : (
              <CreditCardIcon className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {card.name}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">
                {card.institutionLink?.institution.name || 'Cartão de Crédito'}
              </span>
              {billing.card.lastFourDigits && (
                <>
                  <span>•</span>
                  <span className="font-mono font-medium">
                    •••• {billing.card.lastFourDigits}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Global Card Settings */}
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Card Limit */}
          <div className="text-left sm:text-right">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Limite do Cartão
            </div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {formatCurrency(Number(billing.card.defaultLimit || 0))}
            </div>
          </div>

          {/* Dates & Settings */}
          <div className="flex items-center gap-4 sm:border-l sm:pl-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4 rounded-full border bg-muted/40 px-3 py-1 shadow-sm">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Fechamento
                </span>
                <span className="text-xs font-bold text-foreground">
                  Dia {billing.card.billingCycleDay}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-full border bg-muted/40 px-3 py-1 shadow-sm">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Vencimento
                </span>
                <span className="text-xs font-bold text-foreground">
                  Dia {billing.card.billingPaymentDay}
                </span>
              </div>
            </div>

            <div className="ml-1">
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
        </div>
      </div>

      {/* Billing Overview Carousel - Active Card Centered */}
      <div className="group relative mb-8 w-full max-w-full overflow-hidden">
        {/* Left Arrow Helper */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 flex w-16 items-center justify-start bg-gradient-to-r from-background to-transparent sm:w-24">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => previousBillingId && loadBilling(previousBillingId)}
            disabled={!previousBillingId || isProcessing}
            className="pointer-events-auto ml-2 h-10 w-10 rounded-full opacity-80 shadow-md transition-opacity hover:opacity-100 sm:ml-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="scrollbar-none flex w-full max-w-full snap-x snap-mandatory items-center justify-start gap-4 overflow-x-auto px-[calc(50%-140px)] pb-6 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-[calc(50%-160px)] [&::-webkit-scrollbar]:hidden">
          {sortedBillings.map((b) => {
            const isActive = b.id === billing.id;
            return (
              <button
                key={b.id}
                ref={isActive ? activeCardRef : undefined}
                onClick={() => !isActive && !isProcessing && loadBilling(b.id)}
                disabled={isProcessing}
                className={cn(
                  'relative flex shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300',
                  isActive
                    ? 'z-10 min-h-[160px] w-[280px] scale-100 border-zinc-700 bg-zinc-950/80 shadow-lg backdrop-blur-md sm:w-[320px]'
                    : 'min-h-[140px] w-[240px] scale-95 cursor-pointer border-zinc-800/60 bg-zinc-950/40 opacity-70 hover:bg-zinc-950/60 hover:opacity-100 sm:w-[260px]',
                )}
              >
                {/* Status Badge */}
                <div className="mb-2">
                  <CardBillingStatusBadge status={b.status} />
                </div>

                {/* Month Name */}
                <h3
                  className={cn(
                    'text-center font-bold tracking-tight text-foreground',
                    isActive ? 'mb-1 text-xl sm:text-2xl' : 'mb-1 text-lg',
                  )}
                >
                  {(() => {
                    const d = new Date(b.periodEnd);
                    const monthLong = d.toLocaleDateString('pt-BR', {
                      month: 'long',
                    });
                    const monthShort = d
                      .toLocaleDateString('pt-BR', { month: 'short' })
                      .replace('.', '');

                    const m = isActive ? monthLong : monthShort;
                    const capitalizedMonth =
                      m.charAt(0).toUpperCase() + m.slice(1);
                    return isActive
                      ? `${capitalizedMonth} de ${d.getFullYear()}`
                      : `${capitalizedMonth}/${d.getFullYear()}`;
                  })()}
                </h3>

                {/* Period Dates */}
                <div
                  className={cn(
                    'mb-3 text-center text-xs font-medium tracking-tight',
                    isActive
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground/70',
                  )}
                >
                  {formatDate(b.periodStart)} a {formatDate(b.periodEnd)}
                </div>

                {/* Current Value */}
                <div
                  className={cn(
                    'text-center font-bold',
                    isActive
                      ? 'text-lg text-primary'
                      : 'text-base text-muted-foreground',
                  )}
                >
                  {formatCurrency(Number(b.totalAmount ?? 0))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Helper */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-20 flex w-16 items-center justify-end bg-gradient-to-l from-background to-transparent sm:w-24">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => nextBillingId && loadBilling(nextBillingId)}
            disabled={!nextBillingId || isProcessing}
            className="pointer-events-auto mr-2 h-10 w-10 rounded-full opacity-80 shadow-md transition-opacity hover:opacity-100 sm:mr-4"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Stats & Actions */}
        <div className="space-y-6 lg:col-span-4">
          {/* Actions Panel */}
          {isPending && (
            <Card className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ações da Fatura
              </div>
              <div className="flex flex-col gap-2">
                <ExpenseTransactionCreateForm
                  cardId={card.id}
                  triggerSize="default"
                  triggerClassName="w-full justify-center"
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
                      variant="outline"
                      className="w-full justify-center"
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
              </div>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
            {/* Total / A Pagar - label changes by status */}
            <div className="flex min-h-[100px] flex-col justify-between rounded-xl border bg-card p-4 shadow-sm">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {isPending
                    ? 'Fatura Atual'
                    : isPaid
                      ? 'Valor Pago'
                      : 'A Pagar'}
                </div>
                <div
                  className={cn(
                    'mt-1 text-xl font-bold tabular-nums tracking-tight sm:text-2xl',
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
              <div className="mt-2 text-xs text-muted-foreground">
                {isPending ? (
                  <>Fechamento em {formatDate(billing.periodEnd)}</>
                ) : (
                  billing.paymentDate && (
                    <>Vencimento em {formatDate(billing.paymentDate)}</>
                  )
                )}
              </div>
            </div>

            {/* Second Card - Context-dependent */}
            <div className="flex min-h-[100px] flex-col justify-between rounded-xl border bg-card p-4 shadow-sm">
              {isPending ? (
                <>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Disponível
                    </div>
                    <div
                      className={cn(
                        'mt-1 text-xl font-bold tabular-nums tracking-tight sm:text-2xl',
                        availableLimit < 0
                          ? 'text-destructive'
                          : availableLimit <
                              Number(billing.card.defaultLimit) * 0.1
                            ? 'text-orange-500'
                            : 'text-emerald-500',
                      )}
                    >
                      {formatCurrency(availableLimit)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Limite total de{' '}
                    {formatCurrency(Number(billing.card.defaultLimit))}
                  </div>
                </>
              ) : isPaid && billing.paymentTransaction ? (
                <>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Pago em
                    </div>
                    <div className="mt-1 text-xl font-bold tabular-nums tracking-tight text-emerald-500 sm:text-2xl">
                      {formatDate(billing.paymentTransaction.date)}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Histórico de pagamento
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Vencimento
                    </div>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={cn(
                          'text-xl font-bold tabular-nums tracking-tight sm:text-2xl',
                          isOverdue ? 'text-destructive' : '',
                        )}
                      >
                        {billing.paymentDate
                          ? formatDate(billing.paymentDate)
                          : '-'}
                      </span>
                    </div>
                  </div>
                  {billing.paymentDate && (
                    <div className="mt-2 text-xs text-muted-foreground">
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
                              {Math.abs(diffDays)}d de atraso
                            </span>
                          );
                        if (diffDays === 0)
                          return (
                            <span className="text-orange-500">Vence hoje</span>
                          );
                        if (diffDays === 1) return 'Vence amanhã';
                        return `Vence em ${diffDays} dias`;
                      })()}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Third Card - Total Devedor */}
            <div className="flex min-h-[100px] flex-col justify-between rounded-xl border bg-card p-4 shadow-sm">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Devedor
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums tracking-tight sm:text-2xl">
                  {formatCurrency(unpaidBalance)}
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Fatura atual + parcelas futuras
              </div>
            </div>

            {/* Usage */}
            <div className="flex min-h-[100px] flex-col justify-between overflow-hidden rounded-xl border bg-card">
              <div className="flex-1 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Uso do Limite
                </div>
                <div
                  className={cn(
                    'mt-1 text-xl font-bold tabular-nums tracking-tight sm:text-2xl',
                    usagePercentage > 90
                      ? 'text-destructive'
                      : usagePercentage > 70
                        ? 'text-orange-500'
                        : '',
                  )}
                >
                  {formatPercentage(usagePercentage)}
                </div>
              </div>
              <div>
                <div className="px-4 pb-2 text-[10px] tabular-nums text-muted-foreground">
                  {formatCurrency(unpaidBalance)} de{' '}
                  {formatCurrency(Number(billing.card.defaultLimit))}
                </div>
                <Progress
                  value={usagePercentage}
                  className="h-2 rounded-none"
                  indicatorClassName={cn(
                    usagePercentage > 90
                      ? 'bg-destructive'
                      : usagePercentage > 70
                        ? 'bg-orange-500'
                        : 'bg-primary',
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transactions */}
        <div className="lg:col-span-8">
          <Card className="h-full rounded-xl border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">
                Transações
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6">
              <TransactionsCardList cardBillingId={billing.id} hideAccount />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
