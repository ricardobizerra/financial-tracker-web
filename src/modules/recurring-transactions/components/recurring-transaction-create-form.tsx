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
import { getRecurrenceDescription, RecurrenceData } from '../recurrence-utils';
import { RecurrenceFormSection } from './shared/recurrence-form-section';

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
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paymentMethodIcon: Record<PaymentMethod, any> = {
  CASH: Banknote,
  CREDIT_CARD: CreditCard,
  DEBIT_CARD: CreditCard,
  PIX: PixIcon,
  BOLETO: Receipt,
};

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
  const [recurrenceData, setRecurrenceData] = useState<RecurrenceData>({
    frequency: RecurrenceFrequency.Monthly,
    dayMode: DayMode.SpecificDay,
    dayOfWeek: 1,
    weekOfMonth: 1,
    stopCondition: 'INFINITE',
  });

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
          setRecurrenceData({
            frequency: RecurrenceFrequency.Monthly,
            dayMode: DayMode.SpecificDay,
            dayOfWeek: 1,
            weekOfMonth: 1,
            stopCondition: 'INFINITE',
          });
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
                      logoUrl={
                        option.data.institutionLink?.institution?.logoUrl
                      }
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
            const isWeeklyOrBiWeekly =
              recurrenceData.frequency === RecurrenceFrequency.Weekly ||
              recurrenceData.frequency === RecurrenceFrequency.BiWeekly;
            const isYearly =
              recurrenceData.frequency === RecurrenceFrequency.Yearly;
            const needsDayOfWeek =
              isWeeklyOrBiWeekly ||
              recurrenceData.dayMode === DayMode.NthWeekday;
            const needsDayOfMonth =
              recurrenceData.dayMode === DayMode.SpecificDay &&
              !isWeeklyOrBiWeekly;

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
                  frequency: recurrenceData.frequency,
                  dayMode: isWeeklyOrBiWeekly
                    ? DayMode.SpecificDay
                    : recurrenceData.dayMode,
                  dayOfMonth: needsDayOfMonth
                    ? data.startDate.getDate()
                    : undefined,
                  dayOfWeek: needsDayOfWeek
                    ? recurrenceData.dayOfWeek
                    : undefined,
                  weekOfMonth:
                    recurrenceData.dayMode === DayMode.NthWeekday
                      ? recurrenceData.weekOfMonth
                      : undefined,
                  monthOfYear: isYearly
                    ? data.startDate.getMonth() + 1
                    : undefined,
                  startDate: data.startDate,
                  endDate:
                    recurrenceData.stopCondition === 'UNTIL_DATE'
                      ? recurrenceData.endDate
                      : undefined,
                  repeatCount:
                    recurrenceData.stopCondition === 'REPEATS'
                      ? recurrenceData.repeatCount
                      : undefined,
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
                    recurrenceData.frequency,
                    recurrenceData.dayMode,
                    recurrenceData.dayOfWeek,
                    recurrenceData.weekOfMonth,
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
                  <div className="flex flex-col gap-4">{startDate}</div>
                </>
              )}

              {showRecurrenceStep && (
                <RecurrenceFormSection
                  data={recurrenceData}
                  onChange={(newData) =>
                    setRecurrenceData((prev) => ({ ...prev, ...newData }))
                  }
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
  const [recurrenceData, setRecurrenceData] = useState<RecurrenceData>({
    frequency: RecurrenceFrequency.Monthly,
    dayMode: DayMode.SpecificDay,
    dayOfWeek: 1,
    weekOfMonth: 1,
    stopCondition: 'INFINITE',
  });

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
          setRecurrenceData({
            frequency: RecurrenceFrequency.Monthly,
            dayMode: DayMode.SpecificDay,
            dayOfWeek: 1,
            weekOfMonth: 1,
            stopCondition: 'INFINITE',
          });
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
                      logoUrl={
                        option.data.institutionLink?.institution?.logoUrl
                      }
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
            const isWeeklyOrBiWeekly =
              recurrenceData.frequency === RecurrenceFrequency.Weekly ||
              recurrenceData.frequency === RecurrenceFrequency.BiWeekly;
            const isYearly =
              recurrenceData.frequency === RecurrenceFrequency.Yearly;
            const needsDayOfWeek =
              isWeeklyOrBiWeekly ||
              recurrenceData.dayMode === DayMode.NthWeekday;
            const needsDayOfMonth =
              recurrenceData.dayMode === DayMode.SpecificDay &&
              !isWeeklyOrBiWeekly;

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
                  frequency: recurrenceData.frequency,
                  dayMode: isWeeklyOrBiWeekly
                    ? DayMode.SpecificDay
                    : recurrenceData.dayMode,
                  dayOfMonth: needsDayOfMonth
                    ? data.startDate.getDate()
                    : undefined,
                  dayOfWeek: needsDayOfWeek
                    ? recurrenceData.dayOfWeek
                    : undefined,
                  weekOfMonth:
                    recurrenceData.dayMode === DayMode.NthWeekday
                      ? recurrenceData.weekOfMonth
                      : undefined,
                  monthOfYear: isYearly
                    ? data.startDate.getMonth() + 1
                    : undefined,
                  startDate: data.startDate,
                  endDate:
                    recurrenceData.stopCondition === 'UNTIL_DATE'
                      ? recurrenceData.endDate
                      : undefined,
                  repeatCount:
                    recurrenceData.stopCondition === 'REPEATS'
                      ? recurrenceData.repeatCount
                      : undefined,
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
                    recurrenceData.frequency,
                    recurrenceData.dayMode,
                    recurrenceData.dayOfWeek,
                    recurrenceData.weekOfMonth,
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
                  <div className="flex flex-col gap-4">{startDate}</div>
                </>
              )}

              {showRecurrenceStep && (
                <RecurrenceFormSection
                  data={recurrenceData}
                  onChange={(newData) =>
                    setRecurrenceData((prev) => ({ ...prev, ...newData }))
                  }
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
