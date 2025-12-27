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
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Banknote,
  BriefcaseBusiness,
  CreditCard,
  PlusIcon,
  Receipt,
} from 'lucide-react';
import { BRAND, z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  TransactionType,
  OrdenationInstitutionModel,
  OrderDirection,
  OrdenationAccountModel,
  TransactionStatus,
  PaymentMethod,
  AccountType,
} from '@/graphql/graphql';
import {
  PropsWithChildren,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { BalanceForecastQuery } from '../graphql/balance-forecast-queries';
import {
  TransactionsCalendarQuery,
  FinancialAgendaQuery,
} from '../graphql/calendar-agenda-queries';
import { TransactionTypeBadge } from './transaction-type-badge';
import { Badge } from '@/components/ui/badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import {
  AccountsQuery,
  BillingQuery,
} from '@/modules/accounts/graphql/accounts-queries';
import { TransactionStatusBadge } from './transaction-status-badge';
import { Separator } from '@/components/ui/separator';
import {
  paymentMethodLabel,
  transactionStatusLabel,
  transactionTypeLabels,
} from '../transactions-constants';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PixIcon from '@/static/pix-icon.svg';
import {
  CreateTransactionMutation,
  UpdateTransactionMutation,
} from '../graphql/transactions-mutations';
import { TransactionFragmentFragment } from '@/graphql/graphql';

interface TransactionCreateFormProps {
  accountId?: string;
  triggerClassName?: string;
  triggerSize?: ButtonProps['size'];
  /** Para modo de edição: transação a ser editada */
  editTransaction?: TransactionFragmentFragment;
  /** Para modo de edição: controle externo do Dialog */
  open?: boolean;
  /** Para modo de edição: callback de mudança do Dialog */
  onOpenChange?: (open: boolean) => void;
  /** Para transações recorrentes: callback chamado antes do submit com os dados.
   * Retorne true para continuar com submit normal, false para cancelar.
   * Use para interceptar dados e mostrar dialog de escopo. */
  onBeforeSubmit?: (data: {
    description: string;
    amount: number;
    paymentMethod?: string;
  }) => Promise<boolean>;
}

const incomeSchema = z.object({
  type: formFields.select.describe('Tipo * // Insira o tipo da movimentação'),
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  destinyAccount: formFields.select.describe(
    'Conta de destino * // Insira a conta',
  ),
  status: formFields.select.describe(
    'Status * // Insira o status da movimentação',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

const expenseSchema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  type: formFields.select.describe('Tipo * // Insira o tipo da movimentação'),
  sourceAccount: formFields.select.describe(
    'Conta de origem * // Insira a conta',
  ),
  status: formFields.select.describe(
    'Status * // Insira o status da movimentação',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

const betweenAccountsSchema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  type: formFields.select.describe('Tipo * // Insira o tipo da movimentação'),
  sourceAccount: formFields.select.describe(
    'Conta de origem * // Insira a conta',
  ),
  destinyAccount: formFields.select.describe(
    'Conta de destino * // Insira a conta',
  ),
  status: formFields.select.describe(
    'Status * // Insira o status da movimentação',
  ),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

export function IncomeTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
  editTransaction,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  onBeforeSubmit,
}: TransactionCreateFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const loading = isEditMode ? updateLoading : createLoading;

  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: isEditMode
      ? {
          type: {
            value: editTransaction.type,
            label: transactionTypeLabels[editTransaction.type],
          },
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          status: editTransaction.status
            ? {
                value: editTransaction.status,
                label: transactionStatusLabel[editTransaction.status],
              }
            : undefined,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
          destinyAccount: editTransaction.destinyAccount
            ? {
                value: editTransaction.destinyAccount.id,
                label: editTransaction.destinyAccount.name,
                data: editTransaction.destinyAccount,
              }
            : undefined,
        }
      : {
          type: {
            value: TransactionType.Income,
            label: transactionTypeLabels[TransactionType.Income],
          },
          ...(!!accountId && {
            destinyAccount: {
              value: accountId,
              label: accountId,
            },
          }),
        },
  });

  const selectedAccount = useWatch({
    control: form.control,
    name: 'destinyAccount',
  });

  const accountTypeOptions = Object.values(TransactionType).map((type) => ({
    value: type,
    label: transactionTypeLabels[type],
  }));

  const accountStatusOptions = Object.values(TransactionStatus)
    .filter((status) => status !== TransactionStatus.Overdue)
    .map((status) => ({
      value: status,
      label: transactionStatusLabel[status],
    }));

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
      types: Object.values(AccountType).filter(
        (t) => t !== AccountType.CreditCard,
      ),
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

  const paymentMethodOptions = Object.values(PaymentMethod).map((method) => ({
    value: method,
    label: paymentMethodLabel[method],
  }));

  const filteredPaymentMethodOptions = useMemo(() => {
    if (selectedAccount?.data?.type !== 'CREDIT_CARD') {
      return paymentMethodOptions.filter(
        (option) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(option.value),
      );
    }
    return paymentMethodOptions;
  }, [selectedAccount?.data?.type, paymentMethodOptions]);

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
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn('flex items-center gap-1 flex-1 md:flex-none', triggerClassName)}
            variant={'default'}
          >
            <ArrowUp />
            <p>Nova entrada</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[500px] max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar entrada' : 'Nova entrada'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da entrada abaixo.'
              : 'Preencha os campos abaixo para registrar uma nova entrada.'}
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={incomeSchema}
          props={{
            type: {
              options: accountTypeOptions,
              renderLabel: (option) => (
                <TransactionTypeBadge type={option.value as TransactionType} />
              ),
            },
            status: {
              options: accountStatusOptions,
              renderLabel: (option) => (
                <TransactionStatusBadge
                  status={option.value as TransactionStatus}
                />
              ),
            },
            paymentMethod: {
              options: filteredPaymentMethodOptions,
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
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
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
            if (isEditMode) {
              // Para transações recorrentes, chamar onBeforeSubmit primeiro
              if (onBeforeSubmit) {
                const shouldContinue = await onBeforeSubmit({
                  description: data.description,
                  amount: data.amount,
                  paymentMethod: data.paymentMethod?.value,
                });
                if (!shouldContinue) return;
              }

              await updateTransaction({
                variables: {
                  data: {
                    id: editTransaction.id,
                    date: data.date,
                    description: data.description,
                    amount: data.amount,
                    status: data.status.value as TransactionStatus,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação atualizada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao atualizar movimentação', {
                    description: error.message,
                  });
                },
              });
            } else {
              await createTransaction({
                variables: {
                  data: {
                    date: data.date,
                    type: data.type.value as TransactionType,
                    destinyAccountId: data.destinyAccount.value,
                    status: data.status.value as TransactionStatus,
                    description: data.description,
                    amount: data.amount,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação criada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao criar movimentação', {
                    description: error.message,
                  });
                },
              });
            }
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            </DialogFooter>
          )}
        >
          {({
            destinyAccount,
            date,
            status,
            amount,
            description,
            paymentMethod,
          }) => (
            <>
              {destinyAccount}
              <Separator />
              {date}
              {status}
              {amount}
              {paymentMethod}
              {description}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}

export function ExpenseTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
  hiddenFields = [],
  minDate,
  maxDate,
  status,
  paymentMethod,
  editTransaction,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  onBeforeSubmit,
}: TransactionCreateFormProps & {
  hiddenFields?: Array<keyof typeof expenseSchema.shape>;
  minDate?: Date;
  maxDate?: Date;
  status?: TransactionStatus;
  paymentMethod?: PaymentMethod;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const loading = isEditMode ? updateLoading : createLoading;

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: isEditMode
      ? {
          type: {
            value: editTransaction.type,
            label: transactionTypeLabels[editTransaction.type],
          },
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          status: editTransaction.status
            ? {
                value: editTransaction.status,
                label: transactionStatusLabel[editTransaction.status],
              }
            : undefined,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
          sourceAccount: editTransaction.sourceAccount
            ? {
                value: editTransaction.sourceAccount.id,
                label: editTransaction.sourceAccount.name,
                data: editTransaction.sourceAccount,
              }
            : undefined,
        }
      : {
          type: {
            value: TransactionType.Expense,
            label: transactionTypeLabels[TransactionType.Expense],
          },
          ...(!!accountId && {
            sourceAccount: {
              value: accountId,
              label: accountId,
            },
          }),
          status: !!status
            ? {
                value: status,
                label: transactionStatusLabel[status],
              }
            : undefined,
          paymentMethod: !!paymentMethod
            ? {
                value: paymentMethod,
                label: paymentMethodLabel[paymentMethod],
              }
            : undefined,
        },
  });

  const selectedAccount = useWatch({
    control: form.control,
    name: 'sourceAccount',
  });

  const paymentMethodOptions = Object.values(PaymentMethod).map((method) => ({
    value: method,
    label: paymentMethodLabel[method],
  }));

  const filteredPaymentMethodOptions = useMemo(() => {
    if (selectedAccount?.data?.type !== 'CREDIT_CARD') {
      return paymentMethodOptions.filter(
        (option) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(option.value),
      );
    }
    return paymentMethodOptions;
  }, [selectedAccount?.data?.type, paymentMethodOptions]);

  const accountTypeOptions = Object.values(TransactionType).map((type) => ({
    value: type,
    label: transactionTypeLabels[type],
  }));

  const accountStatusOptions = Object.values(TransactionStatus)
    .filter((status) => status !== TransactionStatus.Overdue)
    .map((status) => ({
      value: status,
      label: transactionStatusLabel[status],
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

  useEffect(() => {
    const currentPaymentMethod = form.getValues('paymentMethod');
    if (
      selectedAccount?.data?.type === 'CREDIT_CARD' &&
      currentPaymentMethod?.value &&
      !['CREDIT_CARD', 'DEBIT_CARD'].includes(currentPaymentMethod.value)
    ) {
      form.setValue('paymentMethod', {
        value: '',
        label: '',
        [BRAND]: { select: true },
      });
    }
  }, [selectedAccount, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn('flex items-center gap-1 flex-1 md:flex-none', triggerClassName)}
            variant={'destructive'}
          >
            <ArrowDown />
            <p>Nova despesa</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[500px] max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar despesa' : 'Nova despesa'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da despesa abaixo.'
              : 'Preencha os campos abaixo para registrar uma nova despesa.'}
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={expenseSchema}
          props={{
            type: {
              options: accountTypeOptions,
              renderLabel: (option) => (
                <TransactionTypeBadge type={option.value as TransactionType} />
              ),
            },
            date: {
              minDate,
              maxDate,
            },
            status: {
              options: accountStatusOptions,
              renderLabel: (option) => (
                <TransactionStatusBadge
                  status={option.value as TransactionStatus}
                />
              ),
            },
            paymentMethod: {
              options: filteredPaymentMethodOptions,
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
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
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
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
          }}
          onSubmit={async (data) => {
            if (isEditMode) {
              // Para transações recorrentes, chamar onBeforeSubmit primeiro
              if (onBeforeSubmit) {
                const shouldContinue = await onBeforeSubmit({
                  description: data.description,
                  amount: data.amount,
                  paymentMethod: data.paymentMethod?.value,
                });
                if (!shouldContinue) return;
              }

              await updateTransaction({
                variables: {
                  data: {
                    id: editTransaction.id,
                    date: data.date,
                    description: data.description,
                    amount: data.amount,
                    status: data.status.value as TransactionStatus,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                  BillingQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação atualizada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao atualizar movimentação', {
                    description: error.message,
                  });
                },
              });
            } else {
              await createTransaction({
                variables: {
                  data: {
                    date: data.date,
                    type: data.type.value as TransactionType,
                    sourceAccountId: data.sourceAccount.value,
                    status: data.status.value as TransactionStatus,
                    description: data.description,
                    amount: data.amount,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                  BillingQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação criada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao criar movimentação', {
                    description: error.message,
                  });
                },
              });
            }
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            </DialogFooter>
          )}
        >
          {({
            sourceAccount,
            date,
            status,
            amount,
            description,
            paymentMethod,
          }) => (
            <>
              {!hiddenFields.includes('sourceAccount') && (
                <>
                  {sourceAccount}
                  <Separator />
                </>
              )}
              {!hiddenFields.includes('date') && date}
              {!hiddenFields.includes('status') && status}
              {!hiddenFields.includes('amount') && amount}
              {!hiddenFields.includes('description') && description}
              {!hiddenFields.includes('paymentMethod') && paymentMethod}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}

export function BetweenAccountsTransactionCreateForm({
  triggerClassName,
  accountId,
  triggerSize,
  editTransaction,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  onBeforeSubmit,
}: TransactionCreateFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const loading = isEditMode ? updateLoading : createLoading;

  const form = useForm<z.infer<typeof betweenAccountsSchema>>({
    resolver: zodResolver(betweenAccountsSchema),
    defaultValues: isEditMode
      ? {
          type: {
            value: editTransaction.type,
            label: transactionTypeLabels[editTransaction.type],
          },
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          status: editTransaction.status
            ? {
                value: editTransaction.status,
                label: transactionStatusLabel[editTransaction.status],
              }
            : undefined,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
          sourceAccount: editTransaction.sourceAccount
            ? {
                value: editTransaction.sourceAccount.id,
                label: editTransaction.sourceAccount.name,
                data: editTransaction.sourceAccount,
              }
            : undefined,
          destinyAccount: editTransaction.destinyAccount
            ? {
                value: editTransaction.destinyAccount.id,
                label: editTransaction.destinyAccount.name,
                data: editTransaction.destinyAccount,
              }
            : undefined,
        }
      : {
          type: {
            value: TransactionType.BetweenAccounts,
            label: transactionTypeLabels[TransactionType.BetweenAccounts],
          },
          ...(!!accountId && {
            destinyAccount: {
              value: accountId,
              label: accountId,
            },
          }),
        },
  });

  const selectedAccount = useWatch({
    control: form.control,
    name: 'sourceAccount',
  });

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter(
      (option) =>
        ![PaymentMethod.CreditCard, PaymentMethod.DebitCard].includes(option),
    )
    .map((method) => ({
      value: method,
      label: paymentMethodLabel[method],
    }));

  const accountTypeOptions = Object.values(TransactionType).map((type) => ({
    value: type,
    label: transactionTypeLabels[type],
  }));

  const accountStatusOptions = Object.values(TransactionStatus)
    .filter((status) => status !== TransactionStatus.Overdue)
    .map((status) => ({
      value: status,
      label: transactionStatusLabel[status],
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

  useEffect(() => {
    const currentPaymentMethod = form.getValues('paymentMethod');
    if (
      selectedAccount?.data?.type === 'CREDIT_CARD' &&
      currentPaymentMethod?.value &&
      !['CREDIT_CARD', 'DEBIT_CARD'].includes(currentPaymentMethod.value)
    ) {
      form.setValue('paymentMethod', {
        value: '',
        label: '',
        [BRAND]: { select: true },
      });
    }
  }, [selectedAccount, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn('flex items-center gap-1 flex-1 md:flex-none', triggerClassName)}
            variant={'secondary'}
          >
            <ArrowLeftRight />
            <p>Nova movimentação</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[500px] max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar movimentação' : 'Nova movimentação'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da movimentação abaixo.'
              : 'Preencha os campos abaixo para registrar uma nova movimentação.'}
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={betweenAccountsSchema}
          props={{
            type: {
              options: accountTypeOptions,
              renderLabel: (option) => (
                <TransactionTypeBadge type={option.value as TransactionType} />
              ),
            },
            status: {
              options: accountStatusOptions,
              renderLabel: (option) => (
                <TransactionStatusBadge
                  status={option.value as TransactionStatus}
                />
              ),
            },
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
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
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
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
            destinyAccount: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                    <InstitutionLogo
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
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
            if (isEditMode) {
              // Para transações recorrentes, chamar onBeforeSubmit primeiro
              if (onBeforeSubmit) {
                const shouldContinue = await onBeforeSubmit({
                  description: data.description,
                  amount: data.amount,
                  paymentMethod: data.paymentMethod?.value,
                });
                if (!shouldContinue) return;
              }

              await updateTransaction({
                variables: {
                  data: {
                    id: editTransaction.id,
                    date: data.date,
                    description: data.description,
                    amount: data.amount,
                    status: data.status.value as TransactionStatus,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação atualizada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao atualizar movimentação', {
                    description: error.message,
                  });
                },
              });
            } else {
              await createTransaction({
                variables: {
                  data: {
                    date: data.date,
                    type: data.type.value as TransactionType,
                    ...((data.type.value === TransactionType.Expense ||
                      data.type.value === TransactionType.BetweenAccounts) && {
                      sourceAccountId: data.sourceAccount.value,
                    }),
                    ...((data.type.value === TransactionType.Income ||
                      data.type.value === TransactionType.BetweenAccounts) && {
                      destinyAccountId: data.destinyAccount.value,
                    }),
                    status: data.status.value as TransactionStatus,
                    description: data.description,
                    amount: data.amount,
                    paymentMethod: data.paymentMethod.value as PaymentMethod,
                  },
                },
                refetchQueries: [
                  TransactionsQuery,
                  BalanceForecastQuery,
                  TransactionsCalendarQuery,
                  FinancialAgendaQuery,
                ],
                onCompleted: () => {
                  toast.success('Movimentação criada!', {
                    description: 'As informações foram salvas com sucesso.',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro ao criar movimentação', {
                    description: error.message,
                  });
                },
              });
            }
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            </DialogFooter>
          )}
        >
          {({
            sourceAccount,
            destinyAccount,
            date,
            status,
            amount,
            description,
            paymentMethod,
          }) => (
            <>
              {
                <div className="grid grid-cols-[1fr_20px_1fr] gap-4">
                  {sourceAccount}
                  <ArrowRight className="m-auto h-4 min-w-4 max-w-4" />
                  {destinyAccount}
                </div>
              }
              <Separator />
              {date}
              {status}
              {amount}
              {description}
              {paymentMethod}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
