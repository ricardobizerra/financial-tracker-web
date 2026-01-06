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
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Banknote,
  BriefcaseBusiness,
  Check,
  CreditCard,
  LucideIcon,
  PlusIcon,
  Receipt,
} from 'lucide-react';
import { TypeSelectionCard } from '@/components/form-stepper-shared';
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
  RecurrenceFrequency,
  RecurrenceType,
  CardType,
  DayMode,
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
import {
  TransactionsQuery,
  TransactionsGroupedByPeriodQuery,
  TransactionsSummaryQuery,
} from '../graphql/transactions-queries';
import { BalanceForecastQuery } from '../graphql/balance-forecast-queries';
import { CreateRecurringTransactionMutation } from '@/modules/recurring-transactions/graphql/recurring-transactions-mutations';
import {
  TransactionsCalendarQuery,
  FinancialAgendaQuery,
} from '../graphql/calendar-agenda-queries';
import { TransactionTypeBadge } from './transaction-type-badge';
import { Badge } from '@/components/ui/badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import {
  AccountQuery,
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
  CreateInstallmentTransactionMutation,
} from '../graphql/transactions-mutations';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

// Helper function to get day of week name in Portuguese
const getDayOfWeekName = (dayOfWeek: number): string => {
  const days = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];
  return days[dayOfWeek] || '';
};

// Helper function to get week ordinal in Portuguese
const getWeekOrdinal = (week: number): string => {
  const ordinals = ['', '1ª', '2ª', '3ª', '4ª', '5ª'];
  return ordinals[week] || '';
};

// Helper function to generate recurrence summary
const getRecurrenceSummary = (
  frequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
  selectedDate?: Date | null,
): string => {
  const dayName = getDayOfWeekName(dayOfWeek);
  const weekOrdinal = getWeekOrdinal(weekOfMonth);

  switch (frequency) {
    case RecurrenceFrequency.Weekly:
      return `Toda semana às ${dayName}s`;
    case RecurrenceFrequency.BiWeekly:
      return `A cada duas semanas às ${dayName}s`;
    case RecurrenceFrequency.Monthly:
    case RecurrenceFrequency.Yearly:
      const periodText =
        frequency === RecurrenceFrequency.Monthly ? 'todo mês' : 'todo ano';
      switch (dayMode) {
        case DayMode.SpecificDay:
          if (selectedDate) {
            const dayFormat =
              frequency === RecurrenceFrequency.Monthly ? 'dd' : "dd 'de' MMMM";
            return `Esta transação será repetida ${periodText} no dia ${format(selectedDate, dayFormat, { locale: ptBR })}`;
          }
          return `Esta transação será repetida ${periodText}`;
        case DayMode.LastDay:
          return `Esta transação será repetida no último dia de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.LastBusinessDay:
          return `Esta transação será repetida no último dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.FirstBusinessDay:
          return `Esta transação será repetida no primeiro dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.NthWeekday:
          return `Esta transação será repetida na ${weekOrdinal} ${dayName} de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        default:
          return `Esta transação será repetida ${periodText}`;
      }
    default:
      return 'Esta transação será repetida';
  }
};

// Helper function for toast description
const getRecurrenceDescription = (
  frequency: RecurrenceFrequency,
  dayMode: DayMode,
  dayOfWeek: number,
  weekOfMonth: number,
): string => {
  const dayName = getDayOfWeekName(dayOfWeek);
  const weekOrdinal = getWeekOrdinal(weekOfMonth);

  switch (frequency) {
    case RecurrenceFrequency.Weekly:
      return `Será repetida toda ${dayName}`;
    case RecurrenceFrequency.BiWeekly:
      return `Será repetida a cada duas semanas`;
    case RecurrenceFrequency.Monthly:
    case RecurrenceFrequency.Yearly:
      const periodText =
        frequency === RecurrenceFrequency.Monthly
          ? 'mensalmente'
          : 'anualmente';
      switch (dayMode) {
        case DayMode.LastDay:
          return `Será repetida no último dia de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.LastBusinessDay:
          return `Será repetida no último dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.FirstBusinessDay:
          return `Será repetida no primeiro dia útil de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        case DayMode.NthWeekday:
          return `Será repetida na ${weekOrdinal} ${dayName} de cada ${frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}`;
        default:
          return `Será repetida ${periodText}`;
      }
    default:
      return 'Será repetida';
  }
};

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
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
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
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
  isInstallment: formFields.switch
    .optional()
    .describe('Parcelar // Marque para criar transação parcelada'),
  installmentCount: formFields.number
    .optional()
    .describe('Número de parcelas // Quantas parcelas?'),
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
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

// Simplified schemas for form stepper (without type and account fields)
const formStepperIncomeSchema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

const formStepperExpenseSchema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
  isInstallment: formFields.switch
    .optional()
    .describe('Parcelar // Marque para criar transação parcelada'),
  installmentCount: formFields.number
    .optional()
    .describe('Número de parcelas // Quantas parcelas?'),
});

const formStepperBetweenAccountsSchema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  isCompleted: formFields.switch
    .optional()
    .describe('Já realizada // Marque se a transação já foi realizada'),
  paymentMethod: formFields.select.describe(
    'Método de pagamento * // Insira o método de pagamento',
  ),
});

// Função para verificar se a data é hoje
function isToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() === today.getTime();
}
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

  // Form stepper state
  const [currentStep, setCurrentStep] = useState(isEditMode ? 2 : 1);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(
    editTransaction?.destinyAccount
      ? {
          id: editTransaction.destinyAccount.id,
          name: editTransaction.destinyAccount.name,
          institution: editTransaction.destinyAccount.institution,
          type: editTransaction.destinyAccount.type,
        }
      : null,
  );

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          if (!isEditMode) {
            setCurrentStep(1);
            setSelectedAccount(null);
          }
        }, 200);
      }
    },
    [setOpen, isEditMode],
  );

  const handleAccountSelect = useCallback((account: AccountData) => {
    setSelectedAccount(account);
    setCurrentStep(2);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Step indicator for form stepper
  const renderStepIndicator = () => {
    if (isEditMode) return null;

    const steps = [
      { number: 1, label: 'Conta' },
      { number: 2, label: 'Dados' },
    ];

    const step1Completed = currentStep > 1 && selectedAccount;

    return (
      <div className="flex flex-col gap-2">
        {step1Completed && (
          <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
            <span className="font-semibold text-muted-foreground">Conta</span>
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={selectedAccount.institution.logoUrl}
                name={selectedAccount.institution.name}
                color={selectedAccount.institution.color}
                size="xs"
              />
              <span>{selectedAccount.name}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            if (step.number === 1 && step1Completed) return null;

            return (
              <div
                key={step.number}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                <div className="text-sm font-bold">
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    'hidden text-sm sm:block',
                    currentStep >= step.number
                      ? 'text-white'
                      : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn(
              'flex flex-1 items-center gap-1 md:flex-none',
              triggerClassName,
            )}
            variant={'default'}
          >
            <ArrowUp />
            <p>Nova entrada</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar entrada' : 'Nova entrada'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da entrada abaixo.'
              : currentStep === 1
                ? 'Selecione a conta de destino para a entrada.'
                : 'Preencha os dados da movimentação.'}
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        {currentStep === 1 && !isEditMode && (
          <TransactionAccountStep
            transactionType={TransactionType.Income}
            selectedAccountId={selectedAccount?.id}
            onSelect={handleAccountSelect}
          />
        )}

        {(currentStep === 2 || isEditMode) && selectedAccount && (
          <IncomeTransactionFormDetails
            destinyAccountId={selectedAccount.id}
            editTransaction={editTransaction}
            onBeforeSubmit={onBeforeSubmit}
            onClose={() => handleOpenChange(false)}
            onBack={!isEditMode ? prevStep : undefined}
          />
        )}

        {currentStep === 1 && !isEditMode && (
          <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
            <div />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function IncomeTransactionFormDetails({
  destinyAccountId,
  editTransaction,
  onBeforeSubmit,
  onClose,
  onBack,
}: {
  destinyAccountId: string;
  editTransaction?: TransactionFragmentFragment;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
}) {
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const [createRecurringTransaction, { loading: recurringLoading }] =
    useMutation(CreateRecurringTransactionMutation);
  const loading = isEditMode
    ? updateLoading
    : createLoading || recurringLoading;

  // Internal step state for recurrence configuration
  const [showRecurrenceStep, setShowRecurrenceStep] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<RecurrenceFrequency>(RecurrenceFrequency.Monthly);
  const [dayMode, setDayMode] = useState<DayMode>(DayMode.SpecificDay);
  const [dayOfWeek, setDayOfWeek] = useState<number>(1); // 0-6, default Monday
  const [weekOfMonth, setWeekOfMonth] = useState<number>(1); // 1-5, default 1st

  const form = useForm<z.infer<typeof formStepperIncomeSchema>>({
    resolver: zodResolver(formStepperIncomeSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
        }
      : {
          isCompleted: false,
        },
  });

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
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

  return (
    <TsForm
      form={form}
      schema={formStepperIncomeSchema}
      props={{
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
      }}
      onSubmit={async (data) => {
        if (isEditMode) {
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
                isCompleted: data.isCompleted,
                paymentMethod: data.paymentMethod?.value as PaymentMethod,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
            ],
            onCompleted: () => {
              toast.success('Movimentação atualizada!', {
                description: 'As informações foram salvas com sucesso.',
              });
              onClose();
            },
            onError: (error) => {
              toast.error('Erro ao atualizar movimentação', {
                description: error.message,
              });
            },
          });
        } else {
          // Check if recurrence mode is active
          if (showRecurrenceStep) {
            // Create recurring transaction
            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.amount,
                  type: TransactionType.Income,
                  destinyAccountId: destinyAccountId,
                  paymentMethod: data.paymentMethod?.value as PaymentMethod,
                  frequency: recurrenceFrequency,
                  dayMode:
                    recurrenceFrequency === RecurrenceFrequency.Weekly ||
                    recurrenceFrequency === RecurrenceFrequency.BiWeekly
                      ? DayMode.SpecificDay
                      : dayMode,
                  dayOfMonth:
                    dayMode === DayMode.SpecificDay &&
                    !(
                      recurrenceFrequency === RecurrenceFrequency.Weekly ||
                      recurrenceFrequency === RecurrenceFrequency.BiWeekly
                    )
                      ? (data.date?.getDate() ?? new Date().getDate())
                      : undefined,
                  dayOfWeek:
                    recurrenceFrequency === RecurrenceFrequency.Weekly ||
                    recurrenceFrequency === RecurrenceFrequency.BiWeekly ||
                    dayMode === DayMode.NthWeekday
                      ? dayOfWeek
                      : undefined,
                  weekOfMonth:
                    dayMode === DayMode.NthWeekday ? weekOfMonth : undefined,
                  monthOfYear:
                    recurrenceFrequency === RecurrenceFrequency.Yearly
                      ? (data.date?.getMonth() ?? 0) + 1
                      : undefined,
                  startDate: data.date ?? new Date(),
                },
              },
              refetchQueries: [
                TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
              ],
              onCompleted: () => {
                toast.success('Entrada recorrente criada!', {
                  description: getRecurrenceDescription(
                    recurrenceFrequency,
                    dayMode,
                    dayOfWeek,
                    weekOfMonth,
                  ),
                });
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar entrada recorrente', {
                  description: error.message,
                });
              },
            });
          } else {
            await createTransaction({
              variables: {
                data: {
                  date: data.date,
                  type: TransactionType.Income,
                  destinyAccountId: destinyAccountId,
                  isCompleted: data.isCompleted,
                  description: data.description,
                  amount: data.amount,
                  paymentMethod: data.paymentMethod?.value as PaymentMethod,
                },
              },
              refetchQueries: [
                TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
              ],
              onCompleted: () => {
                toast.success('Movimentação criada!', {
                  description: 'As informações foram salvas com sucesso.',
                });
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar movimentação', {
                  description: error.message,
                });
              },
            });
          }
        }
      }}
      renderAfter={() => (
        <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
          {/* Back button */}
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
          ) : onBack ? (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <div />
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Repetir button */}
            {!showRecurrenceStep && !isEditMode && (
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  const isValid = await form.trigger([
                    'date',
                    'amount',
                    'description',
                    'paymentMethod',
                  ]);
                  if (isValid) {
                    setShowRecurrenceStep(true);
                  }
                }}
              >
                Repetir
              </Button>
            )}
            <Button type="submit" disabled={loading} loading={loading}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      )}
    >
      {({ date, isCompleted, amount, description, paymentMethod }) => (
        <>
          {!showRecurrenceStep && (
            <>
              {date}
              {showIsCompleted && isCompleted}
              {amount}
              {paymentMethod}
              {description}
            </>
          )}

          {showRecurrenceStep && (
            <div className="space-y-4">
              <div className="rounded-lg border border-muted bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Valor</p>
                <p className="text-lg font-semibold">
                  {form.getValues('amount')
                    ? formatCurrency(form.getValues('amount'))
                    : 'R$ 0,00'}
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
                    form.getValues('date'),
                  )}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </TsForm>
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

  // Form stepper state - skip to step 2 if accountId provided or in edit mode
  const hasPreselectedAccount = !!accountId || isEditMode;
  const [currentStep, setCurrentStep] = useState(hasPreselectedAccount ? 2 : 1);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(
    editTransaction?.sourceAccount
      ? {
          id: editTransaction.sourceAccount.id,
          name: editTransaction.sourceAccount.name,
          institution: editTransaction.sourceAccount.institution,
          type: editTransaction.sourceAccount.type,
        }
      : null,
  );

  // If accountId provided, fetch its data
  const { data: preselectedAccountData } = useQuery(AccountQuery, {
    variables: {
      id: accountId!,
    },
    skip: !accountId || !!selectedAccount,
  });

  // Set the account when data is fetched
  useEffect(() => {
    if (accountId && preselectedAccountData?.account && !selectedAccount) {
      const account = preselectedAccountData.account as AccountData;
      setSelectedAccount(account);
    }
  }, [accountId, preselectedAccountData, selectedAccount]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          if (!isEditMode && !hasPreselectedAccount) {
            setCurrentStep(1);
            setSelectedAccount(null);
          }
        }, 200);
      }
    },
    [setOpen, isEditMode, hasPreselectedAccount],
  );

  const handleAccountSelect = useCallback((account: AccountData) => {
    setSelectedAccount(account);
    setCurrentStep(2);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const isCreditCardAccount = selectedAccount?.type === AccountType.CreditCard;
  const isDebitCard = selectedAccount?.accountCard?.type === CardType.Debit;

  // Step indicator for form stepper
  const renderStepIndicator = () => {
    if (isEditMode || hasPreselectedAccount) return null;

    const steps = [
      { number: 1, label: 'Conta' },
      { number: 2, label: 'Dados' },
    ];

    const step1Completed = currentStep > 1 && selectedAccount;

    return (
      <div className="flex flex-col gap-2">
        {step1Completed && (
          <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
            <span className="font-semibold text-muted-foreground">Conta</span>
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={selectedAccount.institution.logoUrl}
                name={selectedAccount.institution.name}
                color={selectedAccount.institution.color}
                size="xs"
              />
              <span>{selectedAccount.name}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            if (step.number === 1 && step1Completed) return null;

            return (
              <div
                key={step.number}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                <div className="text-sm font-bold">
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    'hidden text-sm sm:block',
                    currentStep >= step.number
                      ? 'text-white'
                      : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn(
              'flex flex-1 items-center gap-1 md:flex-none',
              triggerClassName,
            )}
            variant={'destructive'}
          >
            <ArrowDown />
            <p>Nova despesa</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar despesa' : 'Nova despesa'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da despesa abaixo.'
              : currentStep === 1
                ? 'Selecione a conta de origem para a despesa.'
                : 'Preencha os dados da movimentação.'}
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        {currentStep === 1 && !isEditMode && !hasPreselectedAccount && (
          <TransactionAccountStep
            transactionType={TransactionType.Expense}
            selectedAccountId={selectedAccount?.id}
            onSelect={handleAccountSelect}
          />
        )}

        {(currentStep === 2 || isEditMode || hasPreselectedAccount) &&
          selectedAccount && (
            <ExpenseTransactionFormDetails
              sourceAccountId={selectedAccount.id}
              isCreditCardAccount={isCreditCardAccount}
              isDebitCard={isDebitCard}
              editTransaction={editTransaction}
              hiddenFields={hiddenFields}
              minDate={minDate}
              maxDate={maxDate}
              presetPaymentMethod={paymentMethod}
              onBeforeSubmit={onBeforeSubmit}
              onClose={() => handleOpenChange(false)}
              onBack={
                !isEditMode && !hasPreselectedAccount ? prevStep : undefined
              }
            />
          )}

        {currentStep === 1 && !isEditMode && !hasPreselectedAccount && (
          <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
            <div />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Expense Form Details (for form step 2 and edit mode)
function ExpenseTransactionFormDetails({
  sourceAccountId,
  isCreditCardAccount,
  isDebitCard,
  editTransaction,
  hiddenFields = [],
  minDate,
  maxDate,
  presetPaymentMethod,
  onBeforeSubmit,
  onClose,
  onBack,
}: {
  sourceAccountId: string;
  isCreditCardAccount?: boolean;
  isDebitCard?: boolean;
  editTransaction?: TransactionFragmentFragment;
  hiddenFields?: Array<keyof typeof expenseSchema.shape>;
  minDate?: Date;
  maxDate?: Date;
  presetPaymentMethod?: PaymentMethod;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
}) {
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [createInstallmentTransaction, { loading: installmentLoading }] =
    useMutation(CreateInstallmentTransactionMutation);
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const [createRecurringTransaction, { loading: recurringLoading }] =
    useMutation(CreateRecurringTransactionMutation);
  const loading = isEditMode
    ? updateLoading
    : createLoading || installmentLoading || recurringLoading;

  // Internal step state for installment configuration
  const [showInstallmentStep, setShowInstallmentStep] = useState(false);
  // Internal step state for recurrence configuration
  const [showRecurrenceStep, setShowRecurrenceStep] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<RecurrenceFrequency>(RecurrenceFrequency.Monthly);
  const [dayMode, setDayMode] = useState<DayMode>(DayMode.SpecificDay);
  const [dayOfWeek, setDayOfWeek] = useState<number>(1); // 0-6, default Monday
  const [weekOfMonth, setWeekOfMonth] = useState<number>(1); // 1-5, default 1st

  const form = useForm<z.infer<typeof formStepperExpenseSchema>>({
    resolver: zodResolver(formStepperExpenseSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
          isInstallment: (editTransaction.totalInstallments ?? 0) > 1,
          installmentCount: editTransaction.totalInstallments ?? undefined,
        }
      : {
          isCompleted: false,
          isInstallment: false,
          // For credit/debit card accounts, auto-set payment method based on card type
          paymentMethod: isCreditCardAccount
            ? isDebitCard
              ? {
                  value: PaymentMethod.DebitCard,
                  label: paymentMethodLabel[PaymentMethod.DebitCard],
                }
              : {
                  value: PaymentMethod.CreditCard,
                  label: paymentMethodLabel[PaymentMethod.CreditCard],
                }
            : presetPaymentMethod
              ? {
                  value: presetPaymentMethod,
                  label: paymentMethodLabel[presetPaymentMethod],
                }
              : undefined,
        },
  });

  const isInstallment = useWatch({
    control: form.control,
    name: 'isInstallment',
  });

  const watchedAmount = useWatch({
    control: form.control,
    name: 'amount',
  });

  const watchedInstallmentCount = useWatch({
    control: form.control,
    name: 'installmentCount',
  });

  const installmentValue = useMemo(() => {
    if (
      isInstallment &&
      watchedAmount &&
      watchedInstallmentCount &&
      watchedInstallmentCount > 1
    ) {
      return (watchedAmount / watchedInstallmentCount).toFixed(2);
    }
    return null;
  }, [isInstallment, watchedAmount, watchedInstallmentCount]);

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);
  const showPaymentMethod = !isCreditCardAccount;

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
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

  return (
    <TsForm
      form={form}
      schema={formStepperExpenseSchema}
      props={{
        date: {
          minDate,
          maxDate,
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
      }}
      onSubmit={async (data) => {
        if (isEditMode) {
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
                isCompleted: data.isCompleted,
                paymentMethod: data.paymentMethod?.value as PaymentMethod,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
              BillingQuery,
            ],
            onCompleted: () => {
              toast.success('Movimentação atualizada!', {
                description: 'As informações foram salvas com sucesso.',
              });
              onClose();
            },
            onError: (error) => {
              toast.error('Erro ao atualizar movimentação', {
                description: error.message,
              });
            },
          });
        } else {
          // If in installment step and has valid installment count, create installment transaction
          if (
            showInstallmentStep &&
            data.installmentCount &&
            data.installmentCount > 1
          ) {
            await createInstallmentTransaction({
              variables: {
                data: {
                  description: data.description,
                  totalAmount: data.amount,
                  totalInstallments: data.installmentCount,
                  startDate: data.date,
                  sourceAccountId: sourceAccountId,
                },
              },
              refetchQueries: [
                TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
                BillingQuery,
              ],
              onCompleted: () => {
                toast.success(
                  `Parcelamento criado em ${data.installmentCount}x!`,
                  {
                    description: 'As parcelas foram geradas com sucesso.',
                  },
                );
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar parcelamento', {
                  description: error.message,
                });
              },
            });
          } else if (showRecurrenceStep) {
            // If in recurrence step, create recurring transaction
            // Build data object based on frequency and dayMode
            const isWeeklyOrBiWeekly =
              recurrenceFrequency === RecurrenceFrequency.Weekly ||
              recurrenceFrequency === RecurrenceFrequency.BiWeekly;
            const isYearly = recurrenceFrequency === RecurrenceFrequency.Yearly;
            const needsDayOfWeek =
              isWeeklyOrBiWeekly || dayMode === DayMode.NthWeekday;
            const needsDayOfMonth =
              dayMode === DayMode.SpecificDay && !isWeeklyOrBiWeekly;

            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.amount,
                  frequency: recurrenceFrequency,
                  startDate: data.date,
                  dayMode: isWeeklyOrBiWeekly ? DayMode.SpecificDay : dayMode,
                  dayOfMonth: needsDayOfMonth ? data.date.getDate() : undefined,
                  dayOfWeek: needsDayOfWeek ? dayOfWeek : undefined,
                  weekOfMonth:
                    dayMode === DayMode.NthWeekday ? weekOfMonth : undefined,
                  monthOfYear: isYearly ? data.date.getMonth() + 1 : undefined,
                  sourceAccountId: sourceAccountId,
                  type: TransactionType.Expense,
                  paymentMethod: data.paymentMethod?.value as PaymentMethod,
                },
              },
              refetchQueries: [
                TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
              ],
              onCompleted: () => {
                toast.success('Despesa recorrente criada!', {
                  description: getRecurrenceDescription(
                    recurrenceFrequency,
                    dayMode,
                    dayOfWeek,
                    weekOfMonth,
                  ),
                });
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar despesa recorrente', {
                  description: error.message,
                });
              },
            });
          } else {
            await createTransaction({
              variables: {
                data: {
                  date: data.date,
                  type: TransactionType.Expense,
                  sourceAccountId: sourceAccountId,
                  isCompleted: data.isCompleted,
                  description: data.description,
                  amount: data.amount,
                  paymentMethod: isCreditCardAccount
                    ? undefined
                    : (data.paymentMethod?.value as PaymentMethod),
                },
              },
              refetchQueries: [
                TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
                BillingQuery,
              ],
              onCompleted: () => {
                toast.success('Movimentação criada!', {
                  description: 'As informações foram salvas com sucesso.',
                });
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar movimentação', {
                  description: error.message,
                });
              },
            });
          }
        }
      }}
      renderAfter={() => (
        <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
          {/* Back button */}
          {showInstallmentStep ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowInstallmentStep(false)}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : showRecurrenceStep ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRecurrenceStep(false)}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : onBack ? (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <div />
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Parcelar button - only for credit cards, not debit cards */}
            {!showInstallmentStep &&
              !showRecurrenceStep &&
              !isEditMode &&
              isCreditCardAccount &&
              !isDebitCard && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={async () => {
                    // Validate form before navigating to installment step
                    const fieldsToValidate = showPaymentMethod
                      ? ([
                          'date',
                          'amount',
                          'description',
                          'paymentMethod',
                        ] as const)
                      : (['date', 'amount', 'description'] as const);
                    const isValid = await form.trigger(fieldsToValidate);
                    if (isValid) {
                      setShowInstallmentStep(true);
                    }
                  }}
                >
                  Parcelar
                </Button>
              )}
            {/* Repetir button - available for all accounts */}
            {!showInstallmentStep && !showRecurrenceStep && !isEditMode && (
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  // Validate form before navigating to recurrence step
                  const fieldsToValidate = showPaymentMethod
                    ? ([
                        'date',
                        'amount',
                        'description',
                        'paymentMethod',
                      ] as const)
                    : (['date', 'amount', 'description'] as const);
                  const isValid = await form.trigger(fieldsToValidate);
                  if (isValid) {
                    setShowRecurrenceStep(true);
                  }
                }}
              >
                Repetir
              </Button>
            )}
            <Button type="submit" disabled={loading} loading={loading}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      )}
    >
      {({
        date,
        isCompleted,
        amount,
        description,
        paymentMethod,
        installmentCount,
      }) => (
        <>
          {/* Step 2: Transaction details */}
          {!showInstallmentStep && !showRecurrenceStep && (
            <>
              {!hiddenFields.includes('date') && date}
              {showIsCompleted && isCompleted}
              {!hiddenFields.includes('amount') && amount}
              {!hiddenFields.includes('description') && description}
              {!hiddenFields.includes('paymentMethod') &&
                showPaymentMethod &&
                paymentMethod}
            </>
          )}

          {/* Step 3: Installment configuration */}
          {showInstallmentStep && (
            <>
              <div className="space-y-4">
                {/* Summary of previous step data */}
                <div className="rounded-lg border border-muted bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Valor total</p>
                  <p className="text-lg font-semibold">
                    {watchedAmount ? formatCurrency(watchedAmount) : 'R$ 0,00'}
                  </p>
                </div>

                {installmentCount}

                {/* Installment value calculation */}
                {watchedInstallmentCount &&
                  watchedInstallmentCount > 1 &&
                  watchedAmount && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm text-muted-foreground">
                        Valor de cada parcela
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        {formatCurrency(
                          watchedAmount / watchedInstallmentCount,
                        )}
                      </p>
                    </div>
                  )}
              </div>
            </>
          )}

          {/* Step 3: Recurrence configuration */}
          {showRecurrenceStep && (
            <>
              <div className="space-y-4">
                {/* Summary of previous step data */}
                <div className="rounded-lg border border-muted bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="text-lg font-semibold">
                    {watchedAmount ? formatCurrency(watchedAmount) : 'R$ 0,00'}
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
                          {[
                            'Dom',
                            'Seg',
                            'Ter',
                            'Qua',
                            'Qui',
                            'Sex',
                            'Sáb',
                          ].map((day, index) => (
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
                          ))}
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
                      selectedDate,
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Edit mode: show installment info */}
          {isEditMode && (editTransaction?.totalInstallments ?? 0) > 0 && (
            <>
              <Separator />
              {installmentCount}
              {installmentValue && (
                <p className="text-sm text-muted-foreground">
                  Valor de cada parcela:{' '}
                  <strong>{formatCurrency(Number(installmentValue))}</strong>
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Ao alterar o valor ou número de parcelas, todas as parcelas
                serão recalculadas.
              </p>
            </>
          )}
        </>
      )}
    </TsForm>
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

  // Form stepper state - 3 steps for between accounts
  const [currentStep, setCurrentStep] = useState(isEditMode ? 3 : 1);
  const [sourceAccount, setSourceAccount] = useState<AccountData | null>(
    editTransaction?.sourceAccount
      ? {
          id: editTransaction.sourceAccount.id,
          name: editTransaction.sourceAccount.name,
          institution: editTransaction.sourceAccount.institution,
          type: editTransaction.sourceAccount.type,
        }
      : null,
  );
  const [destinyAccount, setDestinyAccount] = useState<AccountData | null>(
    editTransaction?.destinyAccount
      ? {
          id: editTransaction.destinyAccount.id,
          name: editTransaction.destinyAccount.name,
          institution: editTransaction.destinyAccount.institution,
          type: editTransaction.destinyAccount.type,
        }
      : null,
  );

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          if (!isEditMode) {
            setCurrentStep(1);
            setSourceAccount(null);
            setDestinyAccount(null);
          }
        }, 200);
      }
    },
    [setOpen, isEditMode],
  );

  const handleSourceAccountSelect = useCallback((account: AccountData) => {
    setSourceAccount(account);
    setCurrentStep(2);
  }, []);

  const handleDestinyAccountSelect = useCallback((account: AccountData) => {
    setDestinyAccount(account);
    setCurrentStep(3);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Step indicator for form stepper
  const renderStepIndicator = () => {
    if (isEditMode) return null;

    const steps = [
      { number: 1, label: 'Origem' },
      { number: 2, label: 'Destino' },
      { number: 3, label: 'Dados' },
    ];

    const step1Completed = currentStep > 1 && sourceAccount;
    const step2Completed = currentStep > 2 && destinyAccount;

    return (
      <div className="flex flex-col gap-2">
        {/* Show completed steps as info bars */}
        {step1Completed && (
          <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
            <span className="font-semibold text-muted-foreground">Origem</span>
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={sourceAccount.institution.logoUrl}
                name={sourceAccount.institution.name}
                color={sourceAccount.institution.color}
                size="xs"
              />
              <span>{sourceAccount.name}</span>
            </div>
          </div>
        )}
        {step2Completed && (
          <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
            <span className="font-semibold text-muted-foreground">Destino</span>
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={destinyAccount.institution.logoUrl}
                name={destinyAccount.institution.name}
                color={destinyAccount.institution.color}
                size="xs"
              />
              <span>{destinyAccount.name}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            // Hide completed steps from the indicator
            if (step.number === 1 && step1Completed) return null;
            if (step.number === 2 && step2Completed) return null;

            return (
              <div
                key={step.number}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                <div className="text-sm font-bold">
                  {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    'hidden text-sm sm:block',
                    currentStep >= step.number
                      ? 'text-white'
                      : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize ?? 'sm'}
            className={cn(
              'flex flex-1 items-center gap-1 md:flex-none',
              triggerClassName,
            )}
            variant={'secondary'}
          >
            <ArrowLeftRight />
            <p>Nova movimentação</p>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar movimentação' : 'Nova movimentação'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite os campos da movimentação abaixo.'
              : currentStep === 1
                ? 'Selecione a conta de origem.'
                : currentStep === 2
                  ? 'Selecione a conta de destino.'
                  : 'Preencha os dados da movimentação.'}
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        {currentStep === 1 && !isEditMode && (
          <TransactionAccountStep
            transactionType={TransactionType.BetweenAccounts}
            selectedAccountId={sourceAccount?.id}
            onSelect={handleSourceAccountSelect}
          />
        )}

        {currentStep === 2 && !isEditMode && (
          <TransactionAccountStep
            transactionType={TransactionType.BetweenAccounts}
            selectedAccountId={destinyAccount?.id}
            onSelect={handleDestinyAccountSelect}
            excludeAccountId={sourceAccount?.id}
          />
        )}

        {(currentStep === 3 || isEditMode) &&
          sourceAccount &&
          destinyAccount && (
            <BetweenAccountsTransactionFormDetails
              sourceAccountId={sourceAccount.id}
              destinyAccountId={destinyAccount.id}
              editTransaction={editTransaction}
              onBeforeSubmit={onBeforeSubmit}
              onClose={() => handleOpenChange(false)}
              onBack={!isEditMode ? prevStep : undefined}
            />
          )}

        {currentStep === 1 && !isEditMode && (
          <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
            <div />
          </DialogFooter>
        )}

        {currentStep === 2 && !isEditMode && (
          <DialogFooter className="flex-row justify-start gap-2 sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Between Accounts Form Details (for form step 3 and edit mode)
function BetweenAccountsTransactionFormDetails({
  sourceAccountId,
  destinyAccountId,
  editTransaction,
  onBeforeSubmit,
  onClose,
  onBack,
}: {
  sourceAccountId: string;
  destinyAccountId: string;
  editTransaction?: TransactionFragmentFragment;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
}) {
  const isEditMode = !!editTransaction;

  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
  );
  const loading = isEditMode ? updateLoading : createLoading;

  const form = useForm<z.infer<typeof formStepperBetweenAccountsSchema>>({
    resolver: zodResolver(formStepperBetweenAccountsSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
        }
      : {
          isCompleted: false,
        },
  });

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
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

  return (
    <TsForm
      form={form}
      schema={formStepperBetweenAccountsSchema}
      props={{
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
      }}
      onSubmit={async (data) => {
        if (isEditMode) {
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
                isCompleted: data.isCompleted,
                paymentMethod: data.paymentMethod?.value as PaymentMethod,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
            ],
            onCompleted: () => {
              toast.success('Movimentação atualizada!', {
                description: 'As informações foram salvas com sucesso.',
              });
              onClose();
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
                type: TransactionType.BetweenAccounts,
                sourceAccountId: sourceAccountId,
                destinyAccountId: destinyAccountId,
                isCompleted: data.isCompleted,
                description: data.description,
                amount: data.amount,
                paymentMethod: data.paymentMethod?.value as PaymentMethod,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
            ],
            onCompleted: () => {
              toast.success('Movimentação criada!', {
                description: 'As informações foram salvas com sucesso.',
              });
              onClose();
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
        <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
          {onBack ? (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <div />
          )}
          <Button type="submit" disabled={loading} loading={loading}>
            Salvar
          </Button>
        </DialogFooter>
      )}
    >
      {({ date, isCompleted, amount, description, paymentMethod }) => (
        <>
          {date}
          {showIsCompleted && isCompleted}
          {amount}
          {paymentMethod}
          {description}
        </>
      )}
    </TsForm>
  );
}

// ============================================================================
// Unified Transaction Create Form (Multi-step Wizard)
// ============================================================================

const transactionTypeIcons: Record<TransactionType, LucideIcon> = {
  [TransactionType.Income]: ArrowUp,
  [TransactionType.Expense]: ArrowDown,
  [TransactionType.BetweenAccounts]: ArrowLeftRight,
};

const transactionTypeDescriptions: Record<TransactionType, string> = {
  [TransactionType.Income]: 'Dinheiro que entra na conta',
  [TransactionType.Expense]: 'Dinheiro que sai da conta',
  [TransactionType.BetweenAccounts]: 'Transferência entre suas contas',
};

interface TransactionTypeStepProps {
  selectedType?: TransactionType;
  onSelect: (type: TransactionType) => void;
}

function TransactionTypeStep({
  selectedType,
  onSelect,
}: TransactionTypeStepProps) {
  const orderedTypes = [
    TransactionType.Expense,
    TransactionType.Income,
    TransactionType.BetweenAccounts,
  ];

  return (
    <div className="flex flex-col gap-2">
      {orderedTypes.map((type) => (
        <TypeSelectionCard
          key={type}
          icon={transactionTypeIcons[type]}
          label={transactionTypeLabels[type]}
          description={transactionTypeDescriptions[type]}
          isSelected={selectedType === type}
          onClick={() => onSelect(type)}
        />
      ))}
    </div>
  );
}

interface AccountData {
  id: string;
  name: string;
  institution: {
    id: string;
    name: string;
    logoUrl?: string | null;
    color?: string | null;
  };
  type: AccountType;
  accountCard?: {
    type: CardType;
  } | null;
}

interface TransactionWizardState {
  transactionType?: TransactionType;
  sourceAccount?: AccountData;
  destinyAccount?: AccountData;
}

const initialTransactionWizardState: TransactionWizardState = {};

function TransactionAccountCard({
  account,
  isSelected,
  onClick,
}: {
  account: AccountData;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-all duration-200 hover:bg-accent',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-transparent bg-muted/50',
      )}
    >
      <InstitutionLogo
        logoUrl={account.institution.logoUrl}
        name={account.institution.name}
        color={account.institution.color}
        size="lg"
      />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div
          className="h-8 w-1 flex-shrink-0 rounded"
          style={{ backgroundColor: account.institution.color || '#888' }}
        />
        <div className="flex flex-col items-start">
          <span className="truncate font-semibold">{account.name}</span>
          <span className="truncate text-sm text-muted-foreground">
            {account.institution.name}
          </span>
        </div>
      </div>
      {isSelected && <Check className="h-5 w-5 flex-shrink-0 text-primary" />}
    </button>
  );
}

interface TransactionAccountStepProps {
  transactionType: TransactionType;
  selectedAccountId?: string;
  excludeAccountId?: string;
  onSelect: (account: AccountData) => void;
}

function TransactionAccountStep({
  transactionType,
  selectedAccountId,
  excludeAccountId,
  onSelect,
}: TransactionAccountStepProps) {
  const accountTypeFilter = useMemo(() => {
    if (transactionType === TransactionType.Income) {
      return Object.values(AccountType).filter(
        (t) =>
          t !== AccountType.CreditCard &&
          t !== AccountType.Savings &&
          t !== AccountType.Investment,
      );
    }
    if (transactionType === TransactionType.Expense) {
      return Object.values(AccountType).filter(
        (t) => t !== AccountType.Savings && t !== AccountType.Investment,
      );
    }
    if (transactionType === TransactionType.BetweenAccounts) {
      // Card accounts cannot participate in between-accounts transactions
      return Object.values(AccountType).filter(
        (t) => t !== AccountType.CreditCard,
      );
    }
    return undefined;
  }, [transactionType]);

  const { data, loading, fetchMore, networkStatus } = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
      types: accountTypeFilter,
    },
    notifyOnNetworkStatusChange: true,
  });

  const accounts = useMemo(() => {
    const allAccounts =
      data?.accounts.edges?.map((edge) => edge.node as AccountData) || [];
    if (excludeAccountId) {
      return allAccounts.filter((a) => a.id !== excludeAccountId);
    }
    return allAccounts;
  }, [data?.accounts.edges, excludeAccountId]);

  const pageInfo = data?.accounts.pageInfo;

  const paginate = useCallback(() => {
    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
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
  }, [fetchMore, pageInfo]);

  if (loading && accounts.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-14 w-full animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="max-h-[300px] space-y-2 overflow-y-auto">
        {accounts.map((account) => (
          <TransactionAccountCard
            key={account.id}
            account={account}
            isSelected={selectedAccountId === account.id}
            onClick={() => onSelect(account)}
          />
        ))}
      </div>
      {pageInfo?.hasNextPage && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={paginate}
          disabled={networkStatus === 3}
        >
          Carregar mais
        </Button>
      )}
    </div>
  );
}

function TransactionWizardStepIndicator({
  currentStep,
  transactionType,
  state,
}: {
  currentStep: number;
  transactionType?: TransactionType;
  state: TransactionWizardState;
}) {
  const isBetweenAccounts = transactionType === TransactionType.BetweenAccounts;

  const steps = [
    { number: 1, label: 'Tipo' },
    { number: 2, label: isBetweenAccounts ? 'Origem' : 'Conta' },
    ...(isBetweenAccounts ? [{ number: 3, label: 'Destino' }] : []),
    { number: isBetweenAccounts ? 4 : 3, label: 'Dados' },
  ];

  const step1Completed = currentStep > 1 && transactionType;
  const step2Completed = currentStep > 2 && state.sourceAccount;
  const step3Completed =
    isBetweenAccounts && currentStep > 3 && state.destinyAccount;

  return (
    <div className="flex flex-col gap-2">
      {step1Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1.5 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">Tipo</span>
          <div className="flex items-center gap-1">
            {(() => {
              const Icon = transactionTypeIcons[transactionType];
              return <Icon className="h-4 w-4" />;
            })()}
            <span>{transactionTypeLabels[transactionType]}</span>
          </div>
        </div>
      )}

      {step2Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">
            {isBetweenAccounts ? 'Origem' : 'Conta'}
          </span>
          <div className="flex items-center gap-1">
            <InstitutionLogo
              logoUrl={state.sourceAccount!.institution.logoUrl}
              name={state.sourceAccount!.institution.name}
              color={state.sourceAccount!.institution.color}
              size="xs"
            />
            <span>{state.sourceAccount!.name}</span>
          </div>
        </div>
      )}

      {step3Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">Destino</span>
          <div className="flex items-center gap-1">
            <InstitutionLogo
              logoUrl={state.destinyAccount!.institution.logoUrl}
              name={state.destinyAccount!.institution.name}
              color={state.destinyAccount!.institution.color}
              size="xs"
            />
            <span>{state.destinyAccount!.name}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          const shouldShow =
            (step.number === 1 && !step1Completed) ||
            (step.number === 2 && !step2Completed) ||
            (step.number === 3 && isBetweenAccounts && !step3Completed) ||
            step.number > 3 ||
            (step.number === 3 && !isBetweenAccounts);

          if (!shouldShow) return null;

          return (
            <div
              key={step.number}
              className={cn(
                'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
                isCompleted
                  ? 'bg-primary text-primary-foreground'
                  : isCurrent
                    ? 'bg-primary/80 text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              <div className="text-sm font-bold">
                {isCompleted ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span
                className={cn(
                  'hidden text-sm sm:block',
                  currentStep >= step.number
                    ? 'text-white'
                    : 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TransactionCreateForm({
  triggerClassName,
  triggerSize,
}: {
  triggerClassName?: string;
  triggerSize?: ButtonProps['size'];
}) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardState, setWizardState] = useState<TransactionWizardState>(
    initialTransactionWizardState,
  );

  const isBetweenAccounts =
    wizardState.transactionType === TransactionType.BetweenAccounts;
  const totalSteps = isBetweenAccounts ? 4 : 3;

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setWizardState(initialTransactionWizardState);
        setCurrentStep(1);
      }, 200);
    }
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleTypeSelect = useCallback(
    (type: TransactionType) => {
      setWizardState((prev) => ({
        ...prev,
        transactionType: type,
        sourceAccount: undefined,
        destinyAccount: undefined,
      }));
      nextStep();
    },
    [nextStep],
  );

  const handleSourceAccountSelect = useCallback(
    (account: AccountData) => {
      setWizardState((prev) => ({
        ...prev,
        sourceAccount: account,
      }));
      nextStep();
    },
    [nextStep],
  );

  const handleDestinyAccountSelect = useCallback(
    (account: AccountData) => {
      setWizardState((prev) => ({
        ...prev,
        destinyAccount: account,
      }));
      nextStep();
    },
    [nextStep],
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Selecione o tipo';
      case 2:
        if (wizardState.transactionType === TransactionType.Income) {
          return 'Selecione a conta de destino';
        }
        return 'Selecione a conta de origem';
      case 3:
        if (isBetweenAccounts) {
          return 'Selecione a conta de destino';
        }
        return 'Preencha os dados';
      case 4:
        return 'Preencha os dados';
      default:
        return 'Nova movimentação';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Qual tipo de movimentação você quer criar?';
      case 2:
        if (wizardState.transactionType === TransactionType.Income) {
          return 'Para qual conta o dinheiro vai entrar?';
        }
        return 'De qual conta o dinheiro vai sair?';
      case 3:
        if (isBetweenAccounts) {
          return 'Para qual conta o dinheiro vai entrar?';
        }
        return 'Complete as informações da movimentação.';
      case 4:
        return 'Complete as informações da movimentação.';
      default:
        return '';
    }
  };

  const isDetailsStep = isBetweenAccounts
    ? currentStep === 4
    : currentStep === 3;

  const renderDetailsForm = () => {
    if (!wizardState.transactionType || !wizardState.sourceAccount) {
      return null;
    }

    const onClose = () => handleOpenChange(false);

    if (wizardState.transactionType === TransactionType.Income) {
      return (
        <IncomeTransactionFormContent
          destinyAccountId={wizardState.sourceAccount.id}
          onClose={onClose}
        />
      );
    }

    if (wizardState.transactionType === TransactionType.Expense) {
      return (
        <ExpenseTransactionFormContent
          sourceAccountId={wizardState.sourceAccount.id}
          onClose={onClose}
        />
      );
    }

    if (
      wizardState.transactionType === TransactionType.BetweenAccounts &&
      wizardState.destinyAccount
    ) {
      return (
        <BetweenAccountsTransactionFormContent
          sourceAccountId={wizardState.sourceAccount.id}
          destinyAccountId={wizardState.destinyAccount.id}
          onClose={onClose}
        />
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size={triggerSize ?? 'sm'}
          className={cn(
            'flex flex-1 items-center gap-1 md:flex-none',
            triggerClassName,
          )}
        >
          <PlusIcon />
          Nova movimentação
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criação de movimentação</DialogTitle>
          <DialogDescription>
            Siga os passos abaixo para adicionar uma nova movimentação
          </DialogDescription>
        </DialogHeader>

        <TransactionWizardStepIndicator
          currentStep={currentStep}
          transactionType={wizardState.transactionType}
          state={wizardState}
        />

        <div className="flex flex-col text-center text-muted-foreground sm:text-left">
          <p className="font-medium">{getStepTitle()}</p>
          <p className="text-sm">{getStepDescription()}</p>
        </div>

        {currentStep === 1 && (
          <TransactionTypeStep
            selectedType={wizardState.transactionType}
            onSelect={handleTypeSelect}
          />
        )}

        {currentStep === 2 && wizardState.transactionType && (
          <TransactionAccountStep
            transactionType={wizardState.transactionType}
            selectedAccountId={wizardState.sourceAccount?.id}
            onSelect={handleSourceAccountSelect}
          />
        )}

        {currentStep === 3 &&
          isBetweenAccounts &&
          wizardState.transactionType && (
            <TransactionAccountStep
              transactionType={wizardState.transactionType}
              selectedAccountId={wizardState.destinyAccount?.id}
              excludeAccountId={wizardState.sourceAccount?.id}
              onSelect={handleDestinyAccountSelect}
            />
          )}

        {isDetailsStep && renderDetailsForm()}

        {!isDetailsStep && (
          <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            ) : (
              <div />
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// Internal Form Content Components (for embedding in wizard)
// ============================================================================

function IncomeTransactionFormContent({
  destinyAccountId,
  onClose,
}: {
  destinyAccountId: string;
  onClose: () => void;
}) {
  const [createTransaction, { loading }] = useMutation(
    CreateTransactionMutation,
  );

  const form = useForm<z.infer<typeof formStepperIncomeSchema>>({
    resolver: zodResolver(formStepperIncomeSchema),
    defaultValues: {
      isCompleted: false,
    },
  });

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
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

  return (
    <TsForm
      form={form}
      schema={formStepperIncomeSchema}
      props={{
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
      }}
      onSubmit={async (data) => {
        await createTransaction({
          variables: {
            data: {
              date: data.date,
              type: TransactionType.Income,
              destinyAccountId: destinyAccountId,
              isCompleted: data.isCompleted,
              description: data.description,
              amount: data.amount,
              paymentMethod: data.paymentMethod?.value as PaymentMethod,
            },
          },
          refetchQueries: [
            TransactionsQuery,
            TransactionsGroupedByPeriodQuery,
            TransactionsSummaryQuery,
            BalanceForecastQuery,
            TransactionsCalendarQuery,
            FinancialAgendaQuery,
          ],
          onCompleted: () => {
            toast.success('Movimentação criada!', {
              description: 'As informações foram salvas com sucesso.',
            });
            onClose();
          },
          onError: (error) => {
            toast.error('Erro ao criar movimentação', {
              description: error.message,
            });
          },
        });
      }}
      renderAfter={() => (
        <DialogFooter>
          <Button type="submit" disabled={loading} loading={loading}>
            Salvar
          </Button>
        </DialogFooter>
      )}
    >
      {({ date, isCompleted, amount, description, paymentMethod }) => (
        <>
          {date}
          {showIsCompleted && isCompleted}
          {amount}
          {paymentMethod}
          {description}
        </>
      )}
    </TsForm>
  );
}

function ExpenseTransactionFormContent({
  sourceAccountId,
  onClose,
}: {
  sourceAccountId: string;
  onClose: () => void;
}) {
  const [createTransaction, { loading: createLoading }] = useMutation(
    CreateTransactionMutation,
  );
  const [createInstallmentTransaction, { loading: installmentLoading }] =
    useMutation(CreateInstallmentTransactionMutation);
  const loading = createLoading || installmentLoading;

  const form = useForm<z.infer<typeof formStepperExpenseSchema>>({
    resolver: zodResolver(formStepperExpenseSchema),
    defaultValues: {
      isCompleted: false,
      isInstallment: false,
    },
  });

  const isInstallment = useWatch({
    control: form.control,
    name: 'isInstallment',
  });

  const watchedAmount = useWatch({
    control: form.control,
    name: 'amount',
  });

  const watchedInstallmentCount = useWatch({
    control: form.control,
    name: 'installmentCount',
  });

  const installmentValue = useMemo(() => {
    if (
      isInstallment &&
      watchedAmount &&
      watchedInstallmentCount &&
      watchedInstallmentCount > 1
    ) {
      return (watchedAmount / watchedInstallmentCount).toFixed(2);
    }
    return null;
  }, [isInstallment, watchedAmount, watchedInstallmentCount]);

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
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

  return (
    <TsForm
      form={form}
      schema={formStepperExpenseSchema}
      props={{
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
      }}
      onSubmit={async (data) => {
        if (
          data.isInstallment &&
          data.installmentCount &&
          data.installmentCount > 1
        ) {
          await createInstallmentTransaction({
            variables: {
              data: {
                description: data.description,
                totalAmount: data.amount,
                totalInstallments: data.installmentCount,
                startDate: data.date,
                sourceAccountId: sourceAccountId,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
              BillingQuery,
            ],
            onCompleted: () => {
              toast.success(
                `Parcelamento criado em ${data.installmentCount}x!`,
                {
                  description: 'As parcelas foram geradas com sucesso.',
                },
              );
              onClose();
            },
            onError: (error) => {
              toast.error('Erro ao criar parcelamento', {
                description: error.message,
              });
            },
          });
        } else {
          await createTransaction({
            variables: {
              data: {
                date: data.date,
                type: TransactionType.Expense,
                sourceAccountId: sourceAccountId,
                isCompleted: data.isCompleted,
                description: data.description,
                amount: data.amount,
                paymentMethod: data.paymentMethod?.value as PaymentMethod,
              },
            },
            refetchQueries: [
              TransactionsQuery,
              TransactionsGroupedByPeriodQuery,
              TransactionsSummaryQuery,
              BalanceForecastQuery,
              TransactionsCalendarQuery,
              FinancialAgendaQuery,
              BillingQuery,
            ],
            onCompleted: () => {
              toast.success('Movimentação criada!', {
                description: 'As informações foram salvas com sucesso.',
              });
              onClose();
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
        date,
        isCompleted,
        amount,
        description,
        paymentMethod,
        isInstallment: isInstallmentField,
        installmentCount,
      }) => (
        <>
          {date}
          {showIsCompleted && isCompleted}
          {amount}
          {description}
          {paymentMethod}
          <Separator />
          {isInstallmentField}
          {isInstallment && installmentCount}
          {installmentValue && (
            <p className="text-sm text-muted-foreground">
              Valor de cada parcela:{' '}
              <strong>{formatCurrency(Number(installmentValue))}</strong>
            </p>
          )}
        </>
      )}
    </TsForm>
  );
}

function BetweenAccountsTransactionFormContent({
  sourceAccountId,
  destinyAccountId,
  onClose,
}: {
  sourceAccountId: string;
  destinyAccountId: string;
  onClose: () => void;
}) {
  const [createTransaction, { loading }] = useMutation(
    CreateTransactionMutation,
  );

  const form = useForm<z.infer<typeof formStepperBetweenAccountsSchema>>({
    resolver: zodResolver(formStepperBetweenAccountsSchema),
    defaultValues: {
      isCompleted: false,
    },
  });

  const selectedDate = useWatch({
    control: form.control,
    name: 'date',
  });

  const showIsCompleted = selectedDate && isToday(selectedDate);

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter(
      (option) =>
        ![PaymentMethod.CreditCard, PaymentMethod.DebitCard].includes(option),
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

  return (
    <TsForm
      form={form}
      schema={formStepperBetweenAccountsSchema}
      props={{
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
      }}
      onSubmit={async (data) => {
        await createTransaction({
          variables: {
            data: {
              date: data.date,
              type: TransactionType.BetweenAccounts,
              sourceAccountId: sourceAccountId,
              destinyAccountId: destinyAccountId,
              isCompleted: data.isCompleted,
              description: data.description,
              amount: data.amount,
              paymentMethod: data.paymentMethod?.value as PaymentMethod,
            },
          },
          refetchQueries: [
            TransactionsQuery,
            TransactionsGroupedByPeriodQuery,
            TransactionsSummaryQuery,
            BalanceForecastQuery,
            TransactionsCalendarQuery,
            FinancialAgendaQuery,
          ],
          onCompleted: () => {
            toast.success('Movimentação criada!', {
              description: 'As informações foram salvas com sucesso.',
            });
            onClose();
          },
          onError: (error) => {
            toast.error('Erro ao criar movimentação', {
              description: error.message,
            });
          },
        });
      }}
      renderAfter={() => (
        <DialogFooter>
          <Button type="submit" disabled={loading} loading={loading}>
            Salvar
          </Button>
        </DialogFooter>
      )}
    >
      {({ date, isCompleted, amount, description, paymentMethod }) => (
        <>
          {date}
          {showIsCompleted && isCompleted}
          {amount}
          {description}
          {paymentMethod}
        </>
      )}
    </TsForm>
  );
}
