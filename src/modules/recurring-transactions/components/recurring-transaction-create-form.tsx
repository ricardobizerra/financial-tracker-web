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
  AccountType,
} from '@/graphql/graphql';
import { useCallback, useState, useMemo } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateRecurringTransactionMutation } from '../graphql/recurring-transactions-mutations';
import { RecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import { TransactionTypeBadge } from '@/modules/transactions/components/transaction-type-badge';
import Image from 'next/image';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { Separator } from '@/components/ui/separator';
import {
  paymentMethodLabel,
  transactionTypeLabels,
} from '@/modules/transactions/transactions-constants';
import {
  recurrenceFrequencyLabels,
  monthLabels,
} from '../recurring-transactions-constants';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PixIcon from '@/static/pix-icon.svg';

interface RecurringTransactionCreateFormProps {
  accountId?: string;
  triggerClassName?: string;
  triggerSize?: ButtonProps['size'];
}

const incomeRecurringSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Ex: Salário, Aluguel recebido',
  ),
  estimatedAmount: formFields.currency.describe(
    'Valor estimado * // Valor aproximado',
  ),
  destinyAccount: formFields.select.describe(
    'Conta de destino * // Onde o dinheiro será creditado',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Como será recebido',
  ),
  frequency: formFields.select.describe('Frequência * // Com que frequência'),
  dayOfMonth: formFields.number.describe('Dia do mês * // Dia do recebimento (1-28)'),
  monthOfYear: formFields.select
    .optional()
    .describe('Mês do ano // Para recorrências anuais'),
  startDate: formFields.date.describe('Data de início * // Quando começa'),
  endDate: formFields.date.optional().describe('Data de término // Opcional'),
});

const expenseRecurringSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Ex: Netflix, Conta de luz',
  ),
  estimatedAmount: formFields.currency.describe(
    'Valor estimado * // Valor aproximado',
  ),
  sourceAccount: formFields.select.describe(
    'Conta de origem * // De onde sairá o dinheiro',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Como será pago',
  ),
  frequency: formFields.select.describe('Frequência * // Com que frequência'),
  dayOfMonth: formFields.number.describe('Dia do mês * // Dia do vencimento (1-28)'),
  monthOfYear: formFields.select
    .optional()
    .describe('Mês do ano // Para recorrências anuais'),
  startDate: formFields.date.describe('Data de início * // Quando começa'),
  endDate: formFields.date.optional().describe('Data de término // Opcional'),
});

export function IncomeRecurringTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
}: RecurringTransactionCreateFormProps) {
  const [open, setOpen] = useState(false);
  const [createRecurringTransaction, { loading }] = useMutation(
    CreateRecurringTransactionMutation,
  );

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

  const selectedFrequency = useWatch({
    control: form.control,
    name: 'frequency',
  });

  const frequencyOptions = Object.values(RecurrenceFrequency).map((freq) => ({
    value: freq,
    label: recurrenceFrequencyLabels[freq],
  }));

  const monthOptions = Object.entries(monthLabels).map(([value, label]) => ({
    value: value,
    label,
  }));

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
      types: Object.values(AccountType).filter(t => t !== AccountType.CreditCard),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paymentMethodIcon: Record<PaymentMethod, any> = {
    CASH: Banknote,
    CREDIT_CARD: CreditCard,
    DEBIT_CARD: CreditCard,
    PIX: PixIcon,
    BOLETO: Receipt,
  };

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="min-w-fit max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Nova entrada recorrente
          </DialogTitle>
          <DialogDescription>
            Configure uma receita que se repete automaticamente.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={incomeRecurringSchema}
          props={{
            frequency: {
              options: frequencyOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4" />
                  <p>{option.label}</p>
                </div>
              ),
            },
            monthOfYear: {
              options: monthOptions,
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
                      {option.data.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {option.data.institution.name}
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
            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.estimatedAmount,
                  type: TransactionType.Income,
                  destinyAccountId: data.destinyAccount.value,
                  paymentMethod: data.paymentMethod.value as PaymentMethod,
                  frequency: data.frequency.value as RecurrenceFrequency,
                  dayOfMonth: data.dayOfMonth,
                  monthOfYear: data.monthOfYear?.value
                    ? parseInt(data.monthOfYear.value as string)
                    : undefined,
                  startDate: data.startDate,
                  endDate: data.endDate,
                },
              },
              refetchQueries: [RecurringTransactionsQuery],
              onCompleted: () => {
                toast.success('Recorrência criada!', {
                  description: 'As transações foram geradas automaticamente.',
                });
                setOpen(false);
                form.reset();
              },
              onError: (error) => {
                toast.error('Erro ao criar recorrência', {
                  description: error.message,
                });
              },
            });
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Criar recorrência
              </Button>
            </DialogFooter>
          )}
        >
          {({
            destinyAccount,
            description,
            estimatedAmount,
            paymentMethod,
            frequency,
            dayOfMonth,
            monthOfYear,
            startDate,
            endDate,
          }) => (
            <>
              {destinyAccount}
              <Separator />
              {description}
              {estimatedAmount}
              {paymentMethod}
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                {frequency}
                {dayOfMonth}
              </div>
              {selectedFrequency?.value === RecurrenceFrequency.Yearly &&
                monthOfYear}
              <div className="grid grid-cols-2 gap-4">
                {startDate}
                {endDate}
              </div>
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

  const selectedFrequency = useWatch({
    control: form.control,
    name: 'frequency',
  });

  const selectedAccount = useWatch({
    control: form.control,
    name: 'sourceAccount',
  });

  const frequencyOptions = Object.values(RecurrenceFrequency).map((freq) => ({
    value: freq,
    label: recurrenceFrequencyLabels[freq],
  }));

  const monthOptions = Object.entries(monthLabels).map(([value, label]) => ({
    value: value,
    label,
  }));

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

  const allPaymentMethodOptions = Object.values(PaymentMethod).map(
    (method) => ({
      value: method,
      label: paymentMethodLabel[method],
    }),
  );

  const paymentMethodOptions = useMemo(() => {
    if (selectedAccount?.data?.type !== 'CREDIT_CARD') {
      return allPaymentMethodOptions.filter(
        (option) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(option.value),
      );
    }
    return allPaymentMethodOptions;
  }, [selectedAccount?.data?.type, allPaymentMethodOptions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paymentMethodIcon: Record<PaymentMethod, any> = {
    CASH: Banknote,
    CREDIT_CARD: CreditCard,
    DEBIT_CARD: CreditCard,
    PIX: PixIcon,
    BOLETO: Receipt,
  };

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="min-w-fit max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Nova despesa recorrente
          </DialogTitle>
          <DialogDescription>
            Configure uma despesa que se repete automaticamente.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={expenseRecurringSchema}
          props={{
            frequency: {
              options: frequencyOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4" />
                  <p>{option.label}</p>
                </div>
              ),
            },
            monthOfYear: {
              options: monthOptions,
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
                      {option.data.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {option.data.institution.name}
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
            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.estimatedAmount,
                  type: TransactionType.Expense,
                  sourceAccountId: data.sourceAccount.value,
                  paymentMethod: data.paymentMethod.value as PaymentMethod,
                  frequency: data.frequency.value as RecurrenceFrequency,
                  dayOfMonth: data.dayOfMonth,
                  monthOfYear: data.monthOfYear?.value
                    ? parseInt(data.monthOfYear.value as string)
                    : undefined,
                  startDate: data.startDate,
                  endDate: data.endDate,
                },
              },
              refetchQueries: [RecurringTransactionsQuery],
              onCompleted: () => {
                toast.success('Recorrência criada!', {
                  description: 'As transações foram geradas automaticamente.',
                });
                setOpen(false);
                form.reset();
              },
              onError: (error) => {
                toast.error('Erro ao criar recorrência', {
                  description: error.message,
                });
              },
            });
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Criar recorrência
              </Button>
            </DialogFooter>
          )}
        >
          {({
            sourceAccount,
            description,
            estimatedAmount,
            paymentMethod,
            frequency,
            dayOfMonth,
            monthOfYear,
            startDate,
            endDate,
          }) => (
            <>
              {sourceAccount}
              <Separator />
              {description}
              {estimatedAmount}
              {paymentMethod}
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                {frequency}
                {dayOfMonth}
              </div>
              {selectedFrequency?.value === RecurrenceFrequency.Yearly &&
                monthOfYear}
              <div className="grid grid-cols-2 gap-4">
                {startDate}
                {endDate}
              </div>
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
