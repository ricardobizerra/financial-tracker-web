'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertTriangleIcon,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Banknote,
  CalendarClock,
  CreditCard,
  Receipt,
  Repeat,
} from 'lucide-react';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  TransactionType,
  OrdenationAccountModel,
  OrderDirection,
  PaymentMethod,
  RecurrenceFrequency,
  DayMode,
  TransactionCategory,
} from '@/graphql/graphql';
import { useCallback, useState, useMemo } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateRecurringTransactionMutation } from '../graphql/recurring-transactions-mutations';
import { RecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import { TransactionsQuery } from '@/modules/transactions/graphql/transactions-queries';
import { BalanceForecastQuery } from '@/modules/transactions/graphql/balance-forecast-queries';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { Separator } from '@/components/ui/separator';
import {
  paymentMethodLabel,
  transactionCategoryLabels,
} from '@/modules/transactions/transactions-constants';
import { transactionCategoryIcons } from '@/modules/transactions/components/transaction-category-badge';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PixIcon from '@/static/pix-icon.svg';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  getRecurrenceSummary,
  getRecurrenceDescription,
} from '../recurrence-utils';

interface RecurringTransactionCreateFormProps {
  accountId?: string;
  triggerClassName?: string;
  triggerSize?: ButtonProps['size'];
}

const categoryOptions = Object.values(TransactionCategory).map((c) => ({
  value: c,
  label: transactionCategoryLabels[c],
}));

const renderCategoryLabel = (option: { value: string; label: string }) => {
  const Icon = transactionCategoryIcons[option.value as TransactionCategory];
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <p>{option.label}</p>
    </div>
  );
};

const incomeRecurringSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Ex: Salário, Aluguel recebido',
  ),
  category: formFields.select
    .optional()
    .describe('Categoria // Categoria da movimentação'),
  estimatedAmount: formFields.currency.describe(
    'Valor estimado * // Valor aproximado',
  ),
  destinyAccount: formFields.select.describe(
    'Conta de destino * // Onde o dinheiro será creditado',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Como será recebido',
  ),
  startDate: formFields.date.describe('Data de início * // Quando começa'),
  endDate: formFields.date.optional().describe('Data de término // Opcional'),
});

const expenseRecurringSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Ex: Netflix, Conta de luz',
  ),
  category: formFields.select
    .optional()
    .describe('Categoria // Categoria da movimentação'),
  estimatedAmount: formFields.currency.describe(
    'Valor estimado * // Valor aproximado',
  ),
  sourceAccount: formFields.select.describe(
    'Conta de origem * // De onde sairá o dinheiro',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Como será pago',
  ),
  startDate: formFields.date.describe('Data de início * // Quando começa'),
  endDate: formFields.date.optional().describe('Data de término // Opcional'),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paymentMethodIcon: Record<PaymentMethod, any> = {
  CASH: Banknote,
  CREDIT_CARD: CreditCard,
  DEBIT_CARD: CreditCard,
  PIX: PixIcon,
  BOLETO: Receipt,
};

// Shared recurrence step UI component
function RecurrenceConfigStep({
  recurrenceFrequency,
  setRecurrenceFrequency,
  dayMode,
  setDayMode,
  dayOfWeek,
  setDayOfWeek,
  weekOfMonth,
  setWeekOfMonth,
  estimatedAmount,
  startDate,
}: {
  recurrenceFrequency: RecurrenceFrequency;
  setRecurrenceFrequency: (freq: RecurrenceFrequency) => void;
  dayMode: DayMode;
  setDayMode: (mode: DayMode) => void;
  dayOfWeek: number;
  setDayOfWeek: (day: number) => void;
  weekOfMonth: number;
  setWeekOfMonth: (week: number) => void;
  estimatedAmount?: number;
  startDate?: Date | null;
}) {
  return (
    <div className="space-y-4">
      {/* Value summary */}
      <div className="rounded-lg border border-muted bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">Valor estimado</p>
        <p className="text-lg font-semibold">
          {estimatedAmount ? formatCurrency(estimatedAmount) : 'R$ 0,00'}
        </p>
      </div>

      {/* Frequency selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Frequência</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() =>
              setRecurrenceFrequency(RecurrenceFrequency.Weekly)
            }
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
              recurrenceFrequency === RecurrenceFrequency.Weekly
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
            }`}
          >
            Semanal
          </button>
          <button
            type="button"
            onClick={() =>
              setRecurrenceFrequency(RecurrenceFrequency.BiWeekly)
            }
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
              recurrenceFrequency === RecurrenceFrequency.BiWeekly
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
            }`}
          >
            Quinzenal
          </button>
          <button
            type="button"
            onClick={() =>
              setRecurrenceFrequency(RecurrenceFrequency.Monthly)
            }
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
              recurrenceFrequency === RecurrenceFrequency.Monthly
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
            }`}
          >
            Mensal
          </button>
          <button
            type="button"
            onClick={() =>
              setRecurrenceFrequency(RecurrenceFrequency.Yearly)
            }
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
              recurrenceFrequency === RecurrenceFrequency.Yearly
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      {/* Day of week selection for weekly/bi-weekly */}
      {(recurrenceFrequency === RecurrenceFrequency.Weekly ||
        recurrenceFrequency === RecurrenceFrequency.BiWeekly) && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Dia da semana</label>
          <div className="flex flex-wrap gap-1">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
              (day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDayOfWeek(index)}
                  className={`min-w-[40px] flex-1 rounded-lg border-2 px-2 py-2 text-xs font-medium transition-all ${
                    dayOfWeek === index
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {day}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {/* Day mode selection for monthly/yearly */}
      {(recurrenceFrequency === RecurrenceFrequency.Monthly ||
        recurrenceFrequency === RecurrenceFrequency.Yearly) && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Dia do{' '}
            {recurrenceFrequency === RecurrenceFrequency.Monthly
              ? 'mês'
              : 'ano'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setDayMode(DayMode.SpecificDay)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                dayMode === DayMode.SpecificDay
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
              }`}
            >
              Dia específico
            </button>
            <button
              type="button"
              onClick={() => setDayMode(DayMode.LastDay)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                dayMode === DayMode.LastDay
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
              }`}
            >
              Último dia
            </button>
            <button
              type="button"
              onClick={() => setDayMode(DayMode.LastBusinessDay)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                dayMode === DayMode.LastBusinessDay
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
              }`}
            >
              Último dia útil
            </button>
            <button
              type="button"
              onClick={() => setDayMode(DayMode.FirstBusinessDay)}
              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                dayMode === DayMode.FirstBusinessDay
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
              }`}
            >
              Primeiro dia útil
            </button>
            <button
              type="button"
              onClick={() => setDayMode(DayMode.NthWeekday)}
              className={`col-span-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                dayMode === DayMode.NthWeekday
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
              }`}
            >
              Dia da semana específico
            </button>
          </div>
        </div>
      )}

      {/* Nth weekday selection */}
      {dayMode === DayMode.NthWeekday &&
        (recurrenceFrequency === RecurrenceFrequency.Monthly ||
          recurrenceFrequency === RecurrenceFrequency.Yearly) && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Qual semana?
              </label>
              <div className="flex gap-2">
                {['1ª', '2ª', '3ª', '4ª', '5ª'].map((week, index) => (
                  <button
                    key={week}
                    type="button"
                    onClick={() => setWeekOfMonth(index + 1)}
                    className={`flex-1 rounded-lg border-2 px-2 py-2 text-sm font-medium transition-all ${
                      weekOfMonth === index + 1
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {week}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dia da semana
              </label>
              <div className="flex flex-wrap gap-1">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
                  (day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDayOfWeek(index)}
                      className={`min-w-[40px] flex-1 rounded-lg border-2 px-2 py-2 text-xs font-medium transition-all ${
                        dayOfWeek === index
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-muted bg-muted/30 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {day}
                    </button>
                  ),
                )}
              </div>
            </div>
          </>
        )}

      {/* Summary */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm text-muted-foreground">Resumo</p>
        <p className="text-sm font-medium text-primary">
          {getRecurrenceSummary(
            recurrenceFrequency,
            dayMode,
            dayOfWeek,
            weekOfMonth,
            startDate,
          )}
        </p>
      </div>

      {/* Warning for days >= 29 */}
      {dayMode === DayMode.SpecificDay &&
        (recurrenceFrequency === RecurrenceFrequency.Monthly ||
          recurrenceFrequency === RecurrenceFrequency.Yearly) &&
        startDate &&
        startDate.getDate() >= 29 && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangleIcon className="inline w-4 h-4" /> Nos meses com menos de {startDate.getDate()} dias, a transação
            será criada no último dia do mês.
          </p>
        )}
    </div>
  );
}

// Build mutation data for recurrence fields
function buildRecurrenceData(
  recurrenceFrequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
  startDate: Date,
) {
  const isWeeklyOrBiWeekly =
    recurrenceFrequency === RecurrenceFrequency.Weekly ||
    recurrenceFrequency === RecurrenceFrequency.BiWeekly;
  const isYearly = recurrenceFrequency === RecurrenceFrequency.Yearly;
  const needsDayOfWeek =
    isWeeklyOrBiWeekly || dayMode === DayMode.NthWeekday;
  const needsDayOfMonth =
    dayMode === DayMode.SpecificDay && !isWeeklyOrBiWeekly;

  return {
    frequency: recurrenceFrequency,
    dayMode: isWeeklyOrBiWeekly ? DayMode.SpecificDay : dayMode,
    dayOfMonth: needsDayOfMonth ? startDate.getDate() : undefined,
    dayOfWeek: needsDayOfWeek ? dayOfWeek : undefined,
    weekOfMonth: dayMode === DayMode.NthWeekday ? weekOfMonth : undefined,
    monthOfYear: isYearly ? startDate.getMonth() + 1 : undefined,
  };
}

export function IncomeRecurringTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
}: RecurringTransactionCreateFormProps) {
  const [open, setOpen] = useState(false);
  const [createRecurringTransaction, { loading }] = useMutation(
    CreateRecurringTransactionMutation,
  );

  // Recurrence config state
  const [showRecurrenceStep, setShowRecurrenceStep] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<RecurrenceFrequency>(RecurrenceFrequency.Monthly);
  const [dayMode, setDayMode] = useState<DayMode>(DayMode.SpecificDay);
  const [dayOfWeek, setDayOfWeek] = useState<number>(1);
  const [weekOfMonth, setWeekOfMonth] = useState<number>(1);

  const form = useForm<z.infer<typeof incomeRecurringSchema>>({
    resolver: zodResolver(incomeRecurringSchema),
    defaultValues: {
      ...(!!accountId && {
        destinyAccount: {
          value: accountId,
          label: accountId,
        },
      }),
    },
  });

  const watchedAmount = useWatch({
    control: form.control,
    name: 'estimatedAmount',
  });

  const watchedStartDate = useWatch({
    control: form.control,
    name: 'startDate',
  });

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const institutionsOptions = useMemo(
    () =>
      institutionsQueryOptions.data?.accounts.edges?.map((edge) => ({
        value: edge.node.id,
        label: edge.node.name,
        data: {
          ...edge.node,
        },
      })) || [],
    [institutionsQueryOptions.data?.accounts.edges],
  );

  const institutionsPageInfo = institutionsQueryOptions.data?.accounts.pageInfo;

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter(
      (method) =>
        ![PaymentMethod.CreditCard, PaymentMethod.DebitCard].includes(method),
    )
    .map((method) => ({
      value: method,
      label: paymentMethodLabel[method],
    }));

  const paginate = useCallback(() => {
    institutionsQueryOptions.fetchMore({
      variables: {
        after: institutionsPageInfo?.endCursor,
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
  }, [institutionsQueryOptions, institutionsPageInfo]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          setShowRecurrenceStep(false);
          setRecurrenceFrequency(RecurrenceFrequency.Monthly);
          setDayMode(DayMode.SpecificDay);
          setDayOfWeek(1);
          setWeekOfMonth(1);
          form.reset();
        }, 200);
      }
    },
    [form],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size={triggerSize ?? 'sm'}
          className={cn('flex items-center gap-1', triggerClassName)}
          variant={'default'}
        >
          <Repeat className="h-4 w-4" />
          <ArrowUp className="h-3 w-3" />
          <p>Nova entrada recorrente</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Nova entrada recorrente
          </DialogTitle>
          <DialogDescription>
            {showRecurrenceStep
              ? 'Configure a frequência e o dia da recorrência.'
              : 'Preencha os dados da receita recorrente.'}
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={incomeRecurringSchema}
          props={{
            category: {
              options: categoryOptions,
              renderLabel: renderCategoryLabel,
            } as any,
            paymentMethod: {
              options: paymentMethodOptions,
              renderLabel: (option) => {
                const Icon = paymentMethodIcon[option.value as PaymentMethod];
                return (
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <p>{option.label}</p>
                  </div>
                );
              },
            },
            destinyAccount: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                    <InstitutionLogo
                      logoUrl={option.data.institutionLink?.institution?.logoUrl}
                      name={option.data.institutionLink?.institution?.name}
                      size="sm"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <p className="truncate text-sm font-medium">
                      {option.data.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {option.data.institutionLink?.institution?.name}
                    </p>
                  </div>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
          }}
          onSubmit={async (data) => {
            const recurrenceData = buildRecurrenceData(
              recurrenceFrequency,
              dayMode,
              dayOfWeek,
              weekOfMonth,
              data.startDate,
            );

            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.estimatedAmount,
                  type: TransactionType.Income,
                  destinyAccountId: data.destinyAccount.value,
                  paymentMethod: data.paymentMethod.value as PaymentMethod,
                  category: data.category?.value as
                    | TransactionCategory
                    | undefined,
                  ...recurrenceData,
                  startDate: data.startDate,
                  endDate: data.endDate,
                },
              },
              refetchQueries: [
                RecurringTransactionsQuery,
                TransactionsQuery,
                BalanceForecastQuery,
              ],
              onCompleted: () => {
                toast.success('Recorrência criada!', {
                  description: getRecurrenceDescription(
                    recurrenceFrequency,
                    dayMode,
                    dayOfWeek,
                    weekOfMonth,
                  ),
                });
                handleOpenChange(false);
              },
              onError: (error) => {
                toast.error('Erro ao criar recorrência', {
                  description: error.message,
                });
              },
            });
          }}
          renderAfter={() => (
            <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
              {showRecurrenceStep ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRecurrenceStep(false)}
                  className="gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                {!showRecurrenceStep && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={async () => {
                      const isValid = await form.trigger([
                        'description',
                        'estimatedAmount',
                        'destinyAccount',
                        'paymentMethod',
                        'startDate',
                      ]);
                      if (isValid) {
                        setShowRecurrenceStep(true);
                      }
                    }}
                  >
                    Próximo
                  </Button>
                )}
                {showRecurrenceStep && (
                  <Button type="submit" disabled={loading} loading={loading}>
                    Criar recorrência
                  </Button>
                )}
              </div>
            </DialogFooter>
          )}
        >
          {({
            destinyAccount,
            description,
            category,
            estimatedAmount,
            paymentMethod,
            startDate,
            endDate,
          }) => (
            <>
              {!showRecurrenceStep && (
                <>
                  {destinyAccount}
                  <Separator />
                  {description}
                  {category}
                  {estimatedAmount}
                  {paymentMethod}
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    {startDate}
                    {endDate}
                  </div>
                </>
              )}

              {showRecurrenceStep && (
                <RecurrenceConfigStep
                  recurrenceFrequency={recurrenceFrequency}
                  setRecurrenceFrequency={setRecurrenceFrequency}
                  dayMode={dayMode}
                  setDayMode={setDayMode}
                  dayOfWeek={dayOfWeek}
                  setDayOfWeek={setDayOfWeek}
                  weekOfMonth={weekOfMonth}
                  setWeekOfMonth={setWeekOfMonth}
                  estimatedAmount={watchedAmount}
                  startDate={watchedStartDate}
                />
              )}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}

export function ExpenseRecurringTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
}: RecurringTransactionCreateFormProps) {
  const [open, setOpen] = useState(false);
  const [createRecurringTransaction, { loading }] = useMutation(
    CreateRecurringTransactionMutation,
  );

  // Recurrence config state
  const [showRecurrenceStep, setShowRecurrenceStep] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<RecurrenceFrequency>(RecurrenceFrequency.Monthly);
  const [dayMode, setDayMode] = useState<DayMode>(DayMode.SpecificDay);
  const [dayOfWeek, setDayOfWeek] = useState<number>(1);
  const [weekOfMonth, setWeekOfMonth] = useState<number>(1);

  const form = useForm<z.infer<typeof expenseRecurringSchema>>({
    resolver: zodResolver(expenseRecurringSchema),
    defaultValues: {
      ...(!!accountId && {
        sourceAccount: {
          value: accountId,
          label: accountId,
        },
      }),
    },
  });

  const watchedAmount = useWatch({
    control: form.control,
    name: 'estimatedAmount',
  });

  const watchedStartDate = useWatch({
    control: form.control,
    name: 'startDate',
  });

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const institutionsOptions = useMemo(
    () =>
      institutionsQueryOptions.data?.accounts.edges?.map((edge) => ({
        value: edge.node.id,
        label: edge.node.name,
        data: {
          ...edge.node,
        },
      })) || [],
    [institutionsQueryOptions.data?.accounts.edges],
  );

  const institutionsPageInfo = institutionsQueryOptions.data?.accounts.pageInfo;

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter(
      (method) =>
        ![PaymentMethod.CreditCard, PaymentMethod.DebitCard].includes(method),
    )
    .map((method) => ({
      value: method,
      label: paymentMethodLabel[method],
    }));

  const paginate = useCallback(() => {
    institutionsQueryOptions.fetchMore({
      variables: {
        after: institutionsPageInfo?.endCursor,
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
  }, [institutionsQueryOptions, institutionsPageInfo]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          setShowRecurrenceStep(false);
          setRecurrenceFrequency(RecurrenceFrequency.Monthly);
          setDayMode(DayMode.SpecificDay);
          setDayOfWeek(1);
          setWeekOfMonth(1);
          form.reset();
        }, 200);
      }
    },
    [form],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size={triggerSize ?? 'sm'}
          className={cn('flex items-center gap-1', triggerClassName)}
          variant={'destructive'}
        >
          <Repeat className="h-4 w-4" />
          <ArrowDown className="h-3 w-3" />
          <p>Nova despesa recorrente</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Nova despesa recorrente
          </DialogTitle>
          <DialogDescription>
            {showRecurrenceStep
              ? 'Configure a frequência e o dia da recorrência.'
              : 'Preencha os dados da despesa recorrente.'}
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={expenseRecurringSchema}
          props={{
            category: {
              options: categoryOptions,
              renderLabel: renderCategoryLabel,
            } as any,
            paymentMethod: {
              options: paymentMethodOptions,
              renderLabel: (option) => {
                const Icon = paymentMethodIcon[option.value as PaymentMethod];
                return (
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <p>{option.label}</p>
                  </div>
                );
              },
            },
            sourceAccount: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                    <InstitutionLogo
                      logoUrl={option.data.institutionLink?.institution?.logoUrl}
                      name={option.data.institutionLink?.institution?.name}
                      size="sm"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <p className="truncate text-sm font-medium">
                      {option.data.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {option.data.institutionLink?.institution?.name}
                    </p>
                  </div>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
          }}
          onSubmit={async (data) => {
            const recurrenceData = buildRecurrenceData(
              recurrenceFrequency,
              dayMode,
              dayOfWeek,
              weekOfMonth,
              data.startDate,
            );

            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.estimatedAmount,
                  type: TransactionType.Expense,
                  sourceAccountId: data.sourceAccount.value,
                  paymentMethod: data.paymentMethod.value as PaymentMethod,
                  category: data.category?.value as
                    | TransactionCategory
                    | undefined,
                  ...recurrenceData,
                  startDate: data.startDate,
                  endDate: data.endDate,
                },
              },
              refetchQueries: [
                RecurringTransactionsQuery,
                TransactionsQuery,
                BalanceForecastQuery,
              ],
              onCompleted: () => {
                toast.success('Recorrência criada!', {
                  description: getRecurrenceDescription(
                    recurrenceFrequency,
                    dayMode,
                    dayOfWeek,
                    weekOfMonth,
                  ),
                });
                handleOpenChange(false);
              },
              onError: (error) => {
                toast.error('Erro ao criar recorrência', {
                  description: error.message,
                });
              },
            });
          }}
          renderAfter={() => (
            <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
              {showRecurrenceStep ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRecurrenceStep(false)}
                  className="gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                {!showRecurrenceStep && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={async () => {
                      const isValid = await form.trigger([
                        'description',
                        'estimatedAmount',
                        'sourceAccount',
                        'paymentMethod',
                        'startDate',
                      ]);
                      if (isValid) {
                        setShowRecurrenceStep(true);
                      }
                    }}
                  >
                    Próximo
                  </Button>
                )}
                {showRecurrenceStep && (
                  <Button type="submit" disabled={loading} loading={loading}>
                    Criar recorrência
                  </Button>
                )}
              </div>
            </DialogFooter>
          )}
        >
          {({
            sourceAccount,
            description,
            category,
            estimatedAmount,
            paymentMethod,
            startDate,
            endDate,
          }) => (
            <>
              {!showRecurrenceStep && (
                <>
                  {sourceAccount}
                  <Separator />
                  {description}
                  {category}
                  {estimatedAmount}
                  {paymentMethod}
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    {startDate}
                    {endDate}
                  </div>
                </>
              )}

              {showRecurrenceStep && (
                <RecurrenceConfigStep
                  recurrenceFrequency={recurrenceFrequency}
                  setRecurrenceFrequency={setRecurrenceFrequency}
                  dayMode={dayMode}
                  setDayMode={setDayMode}
                  dayOfWeek={dayOfWeek}
                  setDayOfWeek={setDayOfWeek}
                  weekOfMonth={weekOfMonth}
                  setWeekOfMonth={setWeekOfMonth}
                  estimatedAmount={watchedAmount}
                  startDate={watchedStartDate}
                />
              )}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
