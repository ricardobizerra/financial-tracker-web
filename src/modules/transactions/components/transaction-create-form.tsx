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
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Banknote,
  BriefcaseBusiness,
  Check,
  CheckSquare,
  CreditCard,
  History,
  LucideIcon,
  PlusIcon,
  Receipt,
  Wallet2,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { SuggestionLinkingSection } from '@/modules/recurring-transactions/components/shared/suggestion-linking-section';
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
  InstitutionType,
  RecurrenceFrequency,
  RecurrenceType,
  CardType,
  DayMode,
  TransactionCategory,
  OrdenationCard,
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
import {
  RecurringTransactionsQuery,
  PossibleRecurringTransactionsQuery,
} from '@/modules/recurring-transactions/graphql/recurring-transactions-queries';
import { TransactionTypeBadge } from './transaction-type-badge';
import { Badge } from '@/components/ui/badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import {
  AccountQuery,
  AccountsQuery,
  BillingQuery,
  CardQuery,
  CardsQuery,
} from '@/modules/accounts/graphql/accounts-queries';
import { TransactionStatusBadge } from './transaction-status-badge';
import { Separator } from '@/components/ui/separator';
import {
  paymentMethodLabel,
  transactionStatusLabel,
  transactionTypeLabels,
  transactionCategoryLabels,
  paymentMethodIcons,
} from '../transactions-constants';
import { transactionCategoryIcons } from './transaction-category-badge';
import { useForm, useWatch } from 'react-hook-form';
import {
  RecurrenceFormSection,
  RecurrenceData,
} from '@/modules/recurring-transactions/components/shared/recurrence-form-section';
import { zodResolver } from '@hookform/resolvers/zod';
import PixIcon from '@/static/pix-icon.svg';
import {
  CreateTransactionMutation,
  UpdateTransactionMutation,
  CreateInstallmentTransactionMutation,
} from '../graphql/transactions-mutations';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  getRecurrenceSummary,
  getRecurrenceDescription,
} from '@/modules/recurring-transactions/recurrence-utils';
import { Label } from '@/components/ui/label';
import { RecurrenceTimelinePreview } from '@/modules/recurring-transactions/components/shared/recurrence-timeline-preview';

interface TransactionCreateFormProps {
  accountId?: string;
  cardId?: string;
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
    category?: string;
  }) => Promise<boolean>;
  /** Variáveis para refetch da query de transações */
  refetchVariables?: any;
  /** Dados para pré-preenchimento (ex: vindo de uma sugestão) */
  prefilledData?: {
    description?: string;
    amount?: number;
    type?: TransactionType;
    sourceAccountId?: string;
    destinyAccountId?: string;
    frequency?: RecurrenceFrequency;
    dayOfMonth?: number;
    transactionIdsToLink?: string[];
    transactionsToLink?: any[];
  };
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

const incomeSchema = z.object({
  type: formFields.select.describe('Tipo * // Insira o tipo da movimentação'),
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
  category: formFields.select
    .optional()
    .describe('Categoria // Insira a categoria'),
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
export function IncomeTransactionCreateForm(props: TransactionCreateFormProps) {
  const {
    triggerClassName,
    accountId,
    triggerSize,
    editTransaction,
    open: externalOpen,
    onOpenChange: externalOnOpenChange,
    onBeforeSubmit,
  } = props;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;
  const isEditMode = !!editTransaction;

  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(
    editTransaction?.destinyAccount
      ? {
          id: editTransaction.destinyAccount.id,
          name: editTransaction.destinyAccount.name,
          institution:
            editTransaction.destinyAccount.institutionLink.institution,
        }
      : null,
  );

  const [currentStep, setCurrentStep] = useState(
    isEditMode || !!selectedAccount ? 2 : 1,
  );
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [recurrenceStep, setRecurrenceStep] = useState<'CONFIG' | 'PREVIEW'>(
    'CONFIG',
  );

  const accountQuery = useQuery(AccountQuery, {
    variables: { id: props.prefilledData?.destinyAccountId ?? '' },
    skip: !props.prefilledData?.destinyAccountId || !!selectedAccount,
  });

  useEffect(() => {
    if (accountQuery.data?.account && !selectedAccount) {
      const acc = accountQuery.data.account;
      setSelectedAccount({
        id: acc.id,
        name: acc.name,
        institution: acc.institutionLink.institution,
      });
      // Auto-advance if we have prefilled data
      if (props.prefilledData) {
        setCurrentStep(2);
      }
    }
  }, [accountQuery.data, selectedAccount, props.prefilledData]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          if (!isEditMode) {
            setCurrentStep(1);
            setSelectedAccount(null);
            setIsRecurrence(false);
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

    if (isRecurrence) {
      if (props.prefilledData?.transactionsToLink?.length) {
        steps.push({ number: 3, label: 'Histórico' });
        steps.push({ number: 4, label: 'Configurar' });
        steps.push({ number: 5, label: 'Visualizar' });
      } else {
        steps.push({ number: 3, label: 'Configurar' });
        steps.push({ number: 4, label: 'Visualizar' });
      }
    }

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

        {(currentStep >= 2 || isEditMode) && selectedAccount ? (
          <IncomeTransactionFormDetails
            destinyAccountId={selectedAccount.id}
            editTransaction={editTransaction}
            onBeforeSubmit={onBeforeSubmit}
            onClose={() => handleOpenChange(false)}
            onBack={!isEditMode ? prevStep : undefined}
            refetchVariables={props.refetchVariables}
            prefilledData={props.prefilledData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isRecurrence={isRecurrence}
            setIsRecurrence={setIsRecurrence}
          />
        ) : null}

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
  refetchVariables,
  prefilledData,
  currentStep,
  setCurrentStep,
  isRecurrence,
  setIsRecurrence,
}: {
  destinyAccountId: string;
  editTransaction?: TransactionFragmentFragment;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
  refetchVariables?: any;
  prefilledData?: TransactionCreateFormProps['prefilledData'];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isRecurrence: boolean;
  setIsRecurrence: (is: boolean) => void;
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
  const [isActive, setIsActive] = useState(true);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<
    string[]
  >(prefilledData?.transactionIdsToLink || []);
  const [recurrenceData, setRecurrenceData] = useState<RecurrenceData>({
    frequency: (prefilledData?.frequency as any) || RecurrenceFrequency.Monthly,
    dayMode: DayMode.SpecificDay,
    dayOfWeek: 1,
    weekOfMonth: 1,
    stopCondition: 'INFINITE',
  });

  const form = useForm<z.infer<typeof formStepperIncomeSchema>>({
    resolver: zodResolver(formStepperIncomeSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          category: editTransaction.category
            ? {
                value: editTransaction.category,

                label: transactionCategoryLabels[editTransaction.category],
              }
            : undefined,

          paymentMethod: editTransaction.paymentMethod
            ? {
                value: editTransaction.paymentMethod,
                label: paymentMethodLabel[editTransaction.paymentMethod],
              }
            : undefined,
        }
      : {
          isCompleted: false,
          description: prefilledData?.description || '',
          amount: prefilledData?.amount || 0,
          date: new Date(),
          category: prefilledData?.category
            ? {
                value: prefilledData.category,
                label:
                  transactionCategoryLabels[
                    prefilledData.category as TransactionCategory
                  ],
              }
            : undefined,
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

  const onSubmit = async (data: z.infer<typeof formStepperIncomeSchema>) => {
    if (isEditMode) {
      if (onBeforeSubmit) {
        const shouldContinue = await onBeforeSubmit({
          description: data.description,
          amount: data.amount,
          paymentMethod: data.paymentMethod?.value,
          category: data.category?.value as TransactionCategory | undefined,
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
            category: data.category?.value as TransactionCategory | undefined,
          },
        },
        refetchQueries: [
          refetchVariables
            ? { query: TransactionsQuery, variables: refetchVariables }
            : TransactionsQuery,
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
      if (isRecurrence) {
        // Create recurring transaction
        await createRecurringTransaction({
          variables: {
            data: {
              description: data.description,
              estimatedAmount: data.amount,
              type: TransactionType.Income,
              destinyAccountId: destinyAccountId,
              paymentMethod: data.paymentMethod?.value as PaymentMethod,

              category: data.category?.value as TransactionCategory | undefined,
              frequency: recurrenceData.frequency,
              dayMode:
                recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                recurrenceData.frequency === RecurrenceFrequency.BiWeekly
                  ? DayMode.SpecificDay
                  : recurrenceData.dayMode,
              dayOfMonth:
                recurrenceData.dayMode === DayMode.SpecificDay &&
                !(
                  recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                  recurrenceData.frequency === RecurrenceFrequency.BiWeekly
                )
                  ? (data.date?.getDate() ?? new Date().getDate())
                  : undefined,
              dayOfWeek:
                recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                recurrenceData.frequency === RecurrenceFrequency.BiWeekly ||
                recurrenceData.dayMode === DayMode.NthWeekday
                  ? recurrenceData.dayOfWeek
                  : undefined,
              weekOfMonth:
                recurrenceData.dayMode === DayMode.NthWeekday
                  ? recurrenceData.weekOfMonth
                  : undefined,
              monthOfYear:
                recurrenceData.frequency === RecurrenceFrequency.Yearly
                  ? (data.date?.getMonth() ?? 0) + 1
                  : undefined,
              startDate: (data.date ?? new Date()).toISOString(),
              endDate:
                recurrenceData.stopCondition === 'UNTIL_DATE'
                  ? recurrenceData.endDate?.toISOString()
                  : undefined,
              repeatCount:
                recurrenceData.stopCondition === 'REPEATS'
                  ? recurrenceData.repeatCount
                  : undefined,
              transactionIdsToLink: selectedTransactionIds,
              isActive: isActive,
            },
          },
          refetchQueries: [
            refetchVariables
              ? { query: TransactionsQuery, variables: refetchVariables }
              : TransactionsQuery,
            TransactionsGroupedByPeriodQuery,
            TransactionsSummaryQuery,
            BalanceForecastQuery,
            TransactionsCalendarQuery,
            FinancialAgendaQuery,
            BillingQuery,
            RecurringTransactionsQuery,
            PossibleRecurringTransactionsQuery,
          ],
          onCompleted: () => {
            toast.success('Entrada recorrente criada!', {
              description: getRecurrenceDescription(
                recurrenceData.frequency,
                recurrenceData.dayMode,
                recurrenceData.dayOfWeek,
                recurrenceData.weekOfMonth,
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

              category: data.category?.value as TransactionCategory | undefined,
            },
          },
          refetchQueries: [
            refetchVariables
              ? { query: TransactionsQuery, variables: refetchVariables }
              : TransactionsQuery,
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
  };

  return (
    <TsForm
      form={form}
      schema={formStepperIncomeSchema}
      props={{
        category: {
          options: categoryOptions,
          renderLabel: renderCategoryLabel,
        } as any,
        paymentMethod: {
          options: paymentMethodOptions,
          renderLabel: (option) => {
            const Icon = paymentMethodIcons[option.value as PaymentMethod];
            return (
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <p>{option.label}</p>
              </div>
            );
          },
        },
      }}
      onSubmit={onSubmit}
      renderAfter={() => (
        <DialogFooter className="flex-row justify-between gap-2 sm:justify-between">
          {/* Back button */}
          {currentStep > 2 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
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
            {prefilledData && currentStep === 2 && (
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await form.trigger([
                    'date',
                    'amount',
                    'description',
                    'paymentMethod',
                  ]);
                  if (isValid) {
                    if (isActive) {
                      setIsRecurrence(true);
                      // If we have transactions to link, go to linking step
                      if (prefilledData.transactionsToLink?.length) {
                        setCurrentStep(3);
                      } else {
                        setCurrentStep(4);
                      }
                    } else {
                      // Submit immediately if not extending to future
                      form.handleSubmit(onSubmit)();
                    }
                  }
                }}
              >
                {isActive ? 'Próximo' : 'Finalizar'}
              </Button>
            )}
            {currentStep === 2 && !isEditMode && !prefilledData && (
              <>
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
                      setIsRecurrence(true);
                      setCurrentStep(3);
                    }
                  }}
                >
                  Repetir
                </Button>
                <Button type="submit" disabled={loading} loading={loading}>
                  Salvar
                </Button>
              </>
            )}
            {currentStep === 3 && (
              <Button
                type="button"
                onClick={() => {
                  // If we are in the linking step of a suggestion, next is config (step 4)
                  // If we are in the config step of a manual entry, next is preview (step 4)
                  setCurrentStep(4);
                }}
                disabled={loading}
              >
                Próximo
              </Button>
            )}
            {currentStep === 4 && (
              <Button
                type="button"
                onClick={() => {
                  // If we are in the config step of a suggestion, next is preview (step 5)
                  // If we are in the preview step of a manual entry, next is FINISH
                  if (prefilledData?.transactionsToLink?.length) {
                    setCurrentStep(5);
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={loading}
              >
                Próximo
              </Button>
            )}
            {currentStep === 5 && (
              <Button type="submit" disabled={loading} loading={loading}>
                Finalizar
              </Button>
            )}
            {currentStep === 2 && isEditMode && (
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            )}
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
        category,
      }) => (
        <>
          {currentStep === 2 && (
            <>
              {prefilledData && (
                <div className="space-y-4 pb-4 duration-500 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/20 bg-primary/5 p-4">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Estender para o futuro
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Gerar novas transações automaticamente daqui para
                        frente.
                      </p>
                    </div>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                  </div>

                  <div className="my-2 h-px bg-border" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    Detalhes da movimentação
                  </p>
                </div>
              )}
              {date}
              {showIsCompleted && isCompleted}
              {amount}
              {paymentMethod}
              {description}
              {category}
            </>
          )}

          {/* Step 3: Linking history (only for suggestions) */}
          {currentStep === 3 && prefilledData?.transactionsToLink?.length ? (
            <SuggestionLinkingSection
              prefilledTransactions={prefilledData.transactionsToLink || []}
              selectedTransactionIds={selectedTransactionIds || []}
              onSelectedTransactionIdsChange={setSelectedTransactionIds}
            />
          ) : null}

          {/* Step 3 (Manual) or Step 4 (Suggestion): Recurrence configuration */}
          {((currentStep === 3 && !prefilledData?.transactionsToLink?.length) ||
            (currentStep === 4 &&
              prefilledData?.transactionsToLink?.length)) && (
            <div className="space-y-4">
              <div className="rounded-lg border border-muted bg-muted/30 p-4">
                <div className="flex items-center gap-2">{amount}</div>
              </div>

              <RecurrenceFormSection
                data={recurrenceData}
                onChange={(newData) =>
                  setRecurrenceData((prev) => ({ ...prev, ...newData }))
                }
                startDate={form.getValues('date')}
                className="mt-2"
              />
            </div>
          )}

          {/* Step 4 (Manual) or Step 5 (Suggestion): Recurrence preview */}
          {((currentStep === 4 && !prefilledData?.transactionsToLink?.length) ||
            (currentStep === 5 &&
              prefilledData?.transactionsToLink?.length)) && (
            <RecurrenceTimelinePreview
              startDate={form.getValues('date') || new Date()}
              data={recurrenceData}
            />
          )}
        </>
      )}
    </TsForm>
  );
}

export function ExpenseTransactionCreateForm({
  triggerClassName,
  accountId,
  cardId,
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
  refetchVariables,
  prefilledData,
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

  // Form stepper state - skip to step 3 if accountId or cardId provided or in edit mode with a source already selected
  const hasPreselectedAccount =
    !!accountId ||
    !!editTransaction?.sourceAccount ||
    !!prefilledData?.sourceAccountId;
  const hasPreselectedCard = !!cardId || !!editTransaction?.sourceCard;
  const hasPreselected = hasPreselectedAccount || hasPreselectedCard;

  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(
    editTransaction?.sourceAccount
      ? {
          id: editTransaction.sourceAccount.id,
          name: editTransaction.sourceAccount.name,
          institution:
            editTransaction.sourceAccount.institutionLink.institution,
        }
      : null,
  );

  const [selectedCard, setSelectedCard] = useState<CardData | null>(
    editTransaction?.sourceCard
      ? {
          id: editTransaction.sourceCard.id,
          name: editTransaction.sourceCard.name,
          institution: editTransaction.sourceCard.institutionLink.institution,
          type: editTransaction.sourceCard.type,
        }
      : null,
  );

  const [currentStep, setCurrentStep] = useState(
    hasPreselected ? 3 : editTransaction?.billingPayment ? 2 : 1,
  );
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [recurrenceStep, setRecurrenceStep] = useState<'CONFIG' | 'PREVIEW'>(
    'CONFIG',
  );

  const [selectedCardOrAccountStepType, setSelectedCardOrAccountStepType] =
    useState<TransactionCardOrAccountStepType | undefined>(
      editTransaction?.billingPayment
        ? TransactionCardOrAccountStepType.Account
        : undefined,
    );

  // If accountId provided, fetch its data
  const { data: preselectedAccountData } = useQuery(AccountQuery, {
    variables: {
      id: accountId!,
    },
    skip: !accountId || !!selectedAccount,
  });

  // If prefilled sourceAccountId provided, fetch its data
  const { data: suggestionAccountData } = useQuery(AccountQuery, {
    variables: {
      id: prefilledData?.sourceAccountId ?? '',
    },
    skip: !prefilledData?.sourceAccountId || !!selectedAccount,
  });

  // Set the account from suggestion when data is fetched
  useEffect(() => {
    if (
      prefilledData?.sourceAccountId &&
      suggestionAccountData?.account &&
      !selectedAccount
    ) {
      const account = suggestionAccountData.account;
      setSelectedAccount({
        id: account.id,
        name: account.name,
        institution: account.institutionLink.institution,
      });
      // Auto-advance if we have prefilled data
      if (prefilledData) {
        setCurrentStep(3);
      }
    }
  }, [prefilledData, suggestionAccountData, selectedAccount]);
  const { data: preselectedCardData } = useQuery(CardQuery, {
    variables: {
      id: cardId!,
    },
    skip: !cardId || !!selectedCard,
  });

  // Set the account when data is fetched
  useEffect(() => {
    if (accountId && preselectedAccountData?.account && !selectedAccount) {
      const account = preselectedAccountData.account;
      setSelectedAccount({
        id: account.id,
        name: account.name,
        institution: account.institutionLink.institution,
      });
    }
  }, [accountId, preselectedAccountData, selectedAccount]);

  // Set the card when data is fetched
  useEffect(() => {
    if (cardId && preselectedCardData?.card && !selectedCard) {
      const card = preselectedCardData.card;
      setSelectedCard({
        id: card.id,
        name: card.name,
        institution: card.institutionLink.institution,
        type: card.type,
      });
    }
  }, [cardId, preselectedCardData, selectedCard]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          if (!isEditMode && !hasPreselected) {
            setCurrentStep(1);
            setSelectedAccount(null);
            setSelectedCard(null);
            setSelectedCardOrAccountStepType(undefined);
            setIsRecurrence(false);
          }
        }, 200);
      }
    },
    [setOpen, isEditMode, hasPreselected],
  );

  const handleAccountSelect = useCallback((account: AccountData) => {
    setSelectedAccount(account);
    setSelectedCard(null);
    setCurrentStep(3);
  }, []);

  const handleCardSelect = useCallback((card: CardData) => {
    setSelectedCard(card);
    setSelectedAccount(null);
    setCurrentStep(3);
  }, []);

  const handleCardOrAccountStepSelect = useCallback(
    (type: TransactionCardOrAccountStepType) => {
      setSelectedCardOrAccountStepType(type);
      setCurrentStep(2);
    },
    [],
  );

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const isCardAccount = !!selectedCard;
  const isDebitCard = selectedCard?.type === CardType.Debit;

  // Step indicator for form stepper
  const renderStepIndicator = () => {
    if (isEditMode || hasPreselected) return null;

    const steps = [
      { number: 1, label: 'Tipo' },
      {
        number: 2,
        label: !selectedCardOrAccountStepType
          ? 'Conta ou cartão'
          : selectedCardOrAccountStepType ===
              TransactionCardOrAccountStepType.Account
            ? 'Conta'
            : 'Cartão',
      },
      { number: 3, label: 'Dados' },
    ];

    if (isRecurrence) {
      if (prefilledData?.transactionsToLink?.length) {
        steps.push({ number: 4, label: 'Histórico' });
        steps.push({ number: 5, label: 'Configurar' });
        steps.push({ number: 6, label: 'Visualizar' });
      } else {
        steps.push({ number: 4, label: 'Configurar' });
        steps.push({ number: 5, label: 'Visualizar' });
      }
    }

    const step2Completed = currentStep > 2 && (selectedAccount || selectedCard);

    return (
      <div className="flex flex-col gap-2">
        {step2Completed && selectedAccount && (
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

        {step2Completed && selectedCard && (
          <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
            <span className="font-semibold text-muted-foreground">Cartão</span>
            <div className="flex items-center gap-1">
              <InstitutionLogo
                logoUrl={selectedCard.institution.logoUrl}
                name={selectedCard.institution.name}
                color={selectedCard.institution.color}
                size="xs"
              />
              <span>{selectedCard.name}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            if (step.number <= 2 && step2Completed) return null;

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
              : currentStep === 2
                ? 'Selecione a conta de origem para a despesa.'
                : 'Preencha os dados da movimentação.'}
          </DialogDescription>
        </DialogHeader>

        {renderStepIndicator()}

        {currentStep === 1 && !hasPreselected && (
          <TransactionCardOrAccountStep
            selectedType={selectedCardOrAccountStepType}
            onSelect={handleCardOrAccountStepSelect}
          />
        )}

        {currentStep === 2 && !hasPreselected && (
          <>
            {selectedCardOrAccountStepType ===
              TransactionCardOrAccountStepType.Account && (
              <TransactionAccountStep
                transactionType={TransactionType.Expense}
                selectedAccountId={selectedAccount?.id}
                onSelect={handleAccountSelect}
              />
            )}
            {selectedCardOrAccountStepType ===
              TransactionCardOrAccountStepType.Card && (
              <TransactionCardStep
                transactionType={TransactionType.Expense}
                selectedCardId={selectedCard?.id}
                onSelect={handleCardSelect}
              />
            )}
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
          </>
        )}

        {(currentStep >= 3 || isEditMode || hasPreselected) &&
        (selectedAccount || selectedCard) ? (
          <ExpenseTransactionFormDetails
            sourceAccountId={selectedAccount?.id}
            sourceCardId={selectedCard?.id}
            isCardAccount={isCardAccount}
            isDebitCard={isDebitCard}
            editTransaction={editTransaction}
            hiddenFields={hiddenFields}
            minDate={minDate}
            maxDate={maxDate}
            presetPaymentMethod={paymentMethod}
            onBeforeSubmit={onBeforeSubmit}
            onClose={() => handleOpenChange(false)}
            onBack={!isEditMode && !hasPreselected ? prevStep : undefined}
            refetchVariables={refetchVariables}
            prefilledData={prefilledData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isRecurrence={isRecurrence}
            setIsRecurrence={setIsRecurrence}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

// Expense Form Details (for form step 2 and edit mode)
function ExpenseTransactionFormDetails({
  sourceAccountId,
  sourceCardId,
  isCardAccount,
  isDebitCard,
  editTransaction,
  hiddenFields = [],
  minDate,
  maxDate,
  presetPaymentMethod,
  onBeforeSubmit,
  onClose,
  onBack,
  refetchVariables,
  prefilledData,
  currentStep,
  setCurrentStep,
  isRecurrence,
  setIsRecurrence,
}: {
  sourceAccountId?: string;
  sourceCardId?: string;
  isCardAccount?: boolean;
  isDebitCard?: boolean;
  editTransaction?: TransactionFragmentFragment;
  hiddenFields?: Array<keyof typeof expenseSchema.shape>;
  minDate?: Date;
  maxDate?: Date;
  presetPaymentMethod?: PaymentMethod;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
  refetchVariables?: any;
  prefilledData?: TransactionCreateFormProps['prefilledData'];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isRecurrence: boolean;
  setIsRecurrence: (is: boolean) => void;
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
  const [isActive, setIsActive] = useState(true);
  const [selectedTransactionIds, setSelectedTransactionIds] = useState<
    string[] | undefined
  >(prefilledData?.transactionIdsToLink);
  const [recurrenceData, setRecurrenceData] = useState<RecurrenceData>({
    frequency: (prefilledData?.frequency as any) || RecurrenceFrequency.Monthly,
    dayMode: DayMode.SpecificDay,
    dayOfWeek: 1,
    weekOfMonth: 1,
    stopCondition: 'INFINITE',
  });

  const form = useForm<z.infer<typeof formStepperExpenseSchema>>({
    resolver: zodResolver(formStepperExpenseSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          category: editTransaction.category
            ? {
                value: editTransaction.category,

                label: transactionCategoryLabels[editTransaction.category],
              }
            : undefined,

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
          description: prefilledData?.description || '',
          amount: prefilledData?.amount || 0,
          date: new Date(),
          category: prefilledData?.category
            ? {
                value: prefilledData.category,
                label:
                  transactionCategoryLabels[
                    prefilledData.category as TransactionCategory
                  ],
              }
            : undefined,
          // For credit/debit card accounts, auto-set payment method based on card type
          paymentMethod: isCardAccount
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
  const showPaymentMethod = !isCardAccount;

  const paymentMethodOptions = Object.values(PaymentMethod)
    .filter((m) => !['CREDIT_CARD', 'DEBIT_CARD'].includes(m))
    .map((method) => ({
      value: method,
      label: paymentMethodLabel[method],
    }));

  const onSubmit = async (data: z.infer<typeof formStepperExpenseSchema>) => {
    if (isEditMode) {
      if (onBeforeSubmit) {
        const shouldContinue = await onBeforeSubmit({
          description: data.description,
          amount: data.amount,
          paymentMethod: data.paymentMethod?.value,

          category: data.category?.value as TransactionCategory | undefined,
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

            category: data.category?.value as TransactionCategory | undefined,
          },
        },
        refetchQueries: [
          refetchVariables
            ? { query: TransactionsQuery, variables: refetchVariables }
            : TransactionsQuery,
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
              startDate: data.date.toISOString(),
              sourceCardId: sourceCardId!,
            },
          },
          refetchQueries: [
            refetchVariables
              ? { query: TransactionsQuery, variables: refetchVariables }
              : TransactionsQuery,
            TransactionsGroupedByPeriodQuery,
            TransactionsSummaryQuery,
            BalanceForecastQuery,
            TransactionsCalendarQuery,
            FinancialAgendaQuery,
            BillingQuery,
          ],
          onCompleted: () => {
            toast.success(`Parcelamento criado em ${data.installmentCount}x!`, {
              description: 'As parcelas foram geradas com sucesso.',
            });
            onClose();
          },
          onError: (error) => {
            toast.error('Erro ao criar parcelamento', {
              description: error.message,
            });
          },
        });
      } else if (isRecurrence) {
        // If in recurrence step, create recurring transaction
        // Build data object based on frequency and dayMode
        const isWeeklyOrBiWeekly =
          recurrenceData.frequency === RecurrenceFrequency.Weekly ||
          recurrenceData.frequency === RecurrenceFrequency.BiWeekly;
        const isYearly =
          recurrenceData.frequency === RecurrenceFrequency.Yearly;
        const needsDayOfWeek =
          isWeeklyOrBiWeekly || recurrenceData.dayMode === DayMode.NthWeekday;
        const needsDayOfMonth =
          recurrenceData.dayMode === DayMode.SpecificDay && !isWeeklyOrBiWeekly;

        await createRecurringTransaction({
          variables: {
            data: {
              description: data.description,
              estimatedAmount: data.amount,
              frequency: recurrenceData.frequency,
              startDate: data.date.toISOString(),
              dayMode: isWeeklyOrBiWeekly
                ? DayMode.SpecificDay
                : recurrenceData.dayMode,
              dayOfMonth: needsDayOfMonth ? data.date.getDate() : undefined,
              dayOfWeek: needsDayOfWeek ? recurrenceData.dayOfWeek : undefined,
              weekOfMonth:
                recurrenceData.dayMode === DayMode.NthWeekday
                  ? recurrenceData.weekOfMonth
                  : undefined,
              monthOfYear: isYearly ? data.date.getMonth() + 1 : undefined,
              endDate:
                recurrenceData.stopCondition === 'UNTIL_DATE'
                  ? recurrenceData.endDate?.toISOString()
                  : undefined,
              repeatCount:
                recurrenceData.stopCondition === 'REPEATS'
                  ? recurrenceData.repeatCount
                  : undefined,
              sourceAccountId: isCardAccount ? undefined : sourceAccountId,
              sourceCardId: isCardAccount ? sourceCardId : undefined,
              type: TransactionType.Expense,
              transactionIdsToLink: selectedTransactionIds,
              isActive: isActive,
              paymentMethod: data.paymentMethod?.value as PaymentMethod,

              category: data.category?.value as TransactionCategory | undefined,
            },
          },
          refetchQueries: [
            refetchVariables
              ? { query: TransactionsQuery, variables: refetchVariables }
              : TransactionsQuery,
            TransactionsGroupedByPeriodQuery,
            TransactionsSummaryQuery,
            BalanceForecastQuery,
            TransactionsCalendarQuery,
            FinancialAgendaQuery,
            BillingQuery,
            RecurringTransactionsQuery,
            PossibleRecurringTransactionsQuery,
          ],
          onCompleted: () => {
            toast.success('Despesa recorrente criada!', {
              description: getRecurrenceDescription(
                recurrenceData.frequency,
                recurrenceData.dayMode,
                recurrenceData.dayOfWeek,
                recurrenceData.weekOfMonth,
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
              sourceAccountId: isCardAccount ? undefined : sourceAccountId,
              sourceCardId: isCardAccount ? sourceCardId : undefined,
              isCompleted: data.isCompleted,
              description: data.description,
              amount: data.amount,
              paymentMethod: data.paymentMethod?.value as PaymentMethod,

              category: data.category?.value as TransactionCategory | undefined,
            },
          },
          refetchQueries: [
            refetchVariables
              ? { query: TransactionsQuery, variables: refetchVariables }
              : TransactionsQuery,
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
        category: {
          options: categoryOptions,
          renderLabel: renderCategoryLabel,
        } as any,

        paymentMethod: {
          options: paymentMethodOptions,
          renderLabel: (option) => {
            const Icon = paymentMethodIcons[option.value as PaymentMethod];
            return (
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <p>{option.label}</p>
              </div>
            );
          },
        },
      }}
      onSubmit={onSubmit}
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
          ) : currentStep > 3 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
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
              isCardAccount &&
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
            {prefilledData && currentStep === 3 && (
              <Button
                type="button"
                onClick={async () => {
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
                    if (isActive) {
                      setIsRecurrence(true);
                      // If we have transactions to link, go to linking step (step 4)
                      if (prefilledData.transactionsToLink?.length) {
                        setCurrentStep(4);
                      } else {
                        // Otherwise go to config (step 5)
                        setCurrentStep(5);
                      }
                    } else {
                      // Submit immediately if not extending to future
                      form.handleSubmit(onSubmit)();
                    }
                  }
                }}
              >
                {isActive ? 'Próximo' : 'Finalizar'}
              </Button>
            )}
            {!showInstallmentStep &&
              currentStep === 3 &&
              !isEditMode &&
              !prefilledData && (
                <>
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
                        setIsRecurrence(true);
                        setCurrentStep(4);
                      }
                    }}
                  >
                    Repetir
                  </Button>
                  <Button type="submit" disabled={loading} loading={loading}>
                    Salvar
                  </Button>
                </>
              )}
            {currentStep === 4 && (
              <Button
                type="button"
                onClick={() => {
                  // If we are in the linking step of a suggestion, next is config (step 5)
                  // If we are in the config step of a manual entry, next is preview (step 5)
                  setCurrentStep(5);
                }}
                disabled={loading}
              >
                Próximo
              </Button>
            )}
            {currentStep === 5 && (
              <Button
                type="button"
                onClick={() => {
                  // If we are in the config step of a suggestion, next is preview (step 6)
                  // If we are in the preview step of a manual entry, next is FINISH
                  if (prefilledData?.transactionsToLink?.length) {
                    setCurrentStep(6);
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={loading}
              >
                Próximo
              </Button>
            )}
            {(showInstallmentStep || currentStep === 6) && (
              <Button type="submit" disabled={loading} loading={loading}>
                Finalizar
              </Button>
            )}
            {!showInstallmentStep && currentStep === 3 && isEditMode && (
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            )}
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
        category,
      }) => (
        <>
          {/* Step 3: Transaction details */}
          {!showInstallmentStep && currentStep === 3 && (
            <>
              {prefilledData && (
                <div className="space-y-4 pb-4 duration-500 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/20 bg-primary/5 p-4">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Estender para o futuro
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Gerar novas transações automaticamente daqui para
                        frente.
                      </p>
                    </div>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                  </div>

                  <div className="my-2 h-px bg-border" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    Detalhes da movimentação
                  </p>
                </div>
              )}
              {!hiddenFields.includes('date') && date}
              {showIsCompleted && isCompleted}
              {!hiddenFields.includes('amount') && amount}
              {!hiddenFields.includes('description') && description}
              {!hiddenFields.includes('paymentMethod') &&
                showPaymentMethod &&
                paymentMethod}
              {!hiddenFields.includes('category') && category}
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

          {/* Step 4: Linking history (only for suggestions) */}
          {currentStep === 4 && prefilledData?.transactionsToLink?.length ? (
            <SuggestionLinkingSection
              prefilledTransactions={prefilledData.transactionsToLink || []}
              selectedTransactionIds={selectedTransactionIds || []}
              onSelectedTransactionIdsChange={setSelectedTransactionIds}
            />
          ) : null}

          {/* Step 4 (Manual) or Step 5 (Suggestion): Recurrence configuration */}
          {((currentStep === 4 && !prefilledData?.transactionsToLink?.length) ||
            (currentStep === 5 &&
              prefilledData?.transactionsToLink?.length)) && (
            <div className="space-y-4">
              <div className="rounded-lg border border-muted bg-muted/30 p-4">
                <div className="flex items-center gap-2">{amount}</div>
              </div>

              <RecurrenceFormSection
                data={recurrenceData}
                onChange={(newData) =>
                  setRecurrenceData((prev) => ({ ...prev, ...newData }))
                }
                startDate={form.getValues('date')}
                className="mt-2"
              />
            </div>
          )}

          {/* Step 5 (Manual) or Step 6 (Suggestion): Recurrence preview */}
          {((currentStep === 5 && !prefilledData?.transactionsToLink?.length) ||
            (currentStep === 6 &&
              prefilledData?.transactionsToLink?.length)) && (
            <RecurrenceTimelinePreview
              startDate={form.getValues('date') || new Date()}
              data={recurrenceData}
            />
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
  refetchVariables,
}: TransactionCreateFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;
  const isEditMode = !!editTransaction;

  // Form stepper state - 3 steps for between accounts
  const [currentStep, setCurrentStep] = useState(isEditMode ? 3 : 1);
  const [isRecurrence, setIsRecurrence] = useState(false);
  const [recurrenceStep, setRecurrenceStep] = useState<'CONFIG' | 'PREVIEW'>(
    'CONFIG',
  );
  const [sourceAccount, setSourceAccount] = useState<AccountData | null>(
    editTransaction?.sourceAccount
      ? {
          id: editTransaction.sourceAccount.id,
          name: editTransaction.sourceAccount.name,
          institution:
            editTransaction.sourceAccount.institutionLink.institution,
        }
      : null,
  );
  const [destinyAccount, setDestinyAccount] = useState<AccountData | null>(
    editTransaction?.destinyAccount
      ? {
          id: editTransaction.destinyAccount.id,
          name: editTransaction.destinyAccount.name,
          institution:
            editTransaction.destinyAccount.institutionLink.institution,
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
            setIsRecurrence(false);
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

    if (isRecurrence) {
      steps.push({ number: 4, label: 'Configurar' });
      steps.push({ number: 5, label: 'Visualizar' });
    }

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

        {(currentStep >= 3 || isEditMode) &&
          sourceAccount &&
          destinyAccount && (
            <BetweenAccountsTransactionFormDetails
              sourceAccountId={sourceAccount.id}
              destinyAccountId={destinyAccount.id}
              editTransaction={editTransaction}
              onBeforeSubmit={onBeforeSubmit}
              onClose={() => handleOpenChange(false)}
              onBack={!isEditMode ? prevStep : undefined}
              refetchVariables={refetchVariables}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isRecurrence={isRecurrence}
              setIsRecurrence={setIsRecurrence}
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
  refetchVariables,
  currentStep,
  setCurrentStep,
  isRecurrence,
  setIsRecurrence,
}: {
  sourceAccountId: string;
  destinyAccountId: string;
  editTransaction?: TransactionFragmentFragment;
  onBeforeSubmit?: TransactionCreateFormProps['onBeforeSubmit'];
  onClose: () => void;
  onBack?: () => void;
  refetchVariables?: any;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isRecurrence: boolean;
  setIsRecurrence: (is: boolean) => void;
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
  const [recurrenceData, setRecurrenceData] = useState<RecurrenceData>({
    frequency: RecurrenceFrequency.Monthly,
    dayMode: DayMode.SpecificDay,
    dayOfWeek: 1,
    weekOfMonth: 1,
    stopCondition: 'INFINITE',
  });

  const form = useForm<z.infer<typeof formStepperBetweenAccountsSchema>>({
    resolver: zodResolver(formStepperBetweenAccountsSchema),
    defaultValues: isEditMode
      ? {
          date: new Date(editTransaction.date),
          amount: Number(editTransaction.amount ?? 0),
          description: editTransaction.description ?? '',
          isCompleted: editTransaction.status === TransactionStatus.Completed,
          category: editTransaction.category
            ? {
                value: editTransaction.category,

                label: transactionCategoryLabels[editTransaction.category],
              }
            : undefined,

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

  return (
    <TsForm
      form={form}
      schema={formStepperBetweenAccountsSchema}
      props={{
        category: {
          options: categoryOptions,
          renderLabel: renderCategoryLabel,
        } as any,

        paymentMethod: {
          options: paymentMethodOptions,
          renderLabel: (option) => {
            const Icon = paymentMethodIcons[option.value as PaymentMethod];
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

              category: data.category?.value as TransactionCategory | undefined,
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

                category: data.category?.value as
                  | TransactionCategory
                  | undefined,
              },
            },
            refetchQueries: [
              refetchVariables
                ? { query: TransactionsQuery, variables: refetchVariables }
                : TransactionsQuery,
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
          if (isRecurrence) {
            // Create recurring transaction
            await createRecurringTransaction({
              variables: {
                data: {
                  description: data.description,
                  estimatedAmount: data.amount,
                  frequency: recurrenceData.frequency,
                  startDate: data.date.toISOString(),
                  dayMode:
                    recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                    recurrenceData.frequency === RecurrenceFrequency.BiWeekly
                      ? DayMode.SpecificDay
                      : recurrenceData.dayMode,
                  dayOfMonth:
                    recurrenceData.dayMode === DayMode.SpecificDay &&
                    !(
                      recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                      recurrenceData.frequency === RecurrenceFrequency.BiWeekly
                    )
                      ? data.date.getDate()
                      : undefined,
                  dayOfWeek:
                    recurrenceData.frequency === RecurrenceFrequency.Weekly ||
                    recurrenceData.frequency === RecurrenceFrequency.BiWeekly ||
                    recurrenceData.dayMode === DayMode.NthWeekday
                      ? recurrenceData.dayOfWeek
                      : undefined,
                  weekOfMonth:
                    recurrenceData.dayMode === DayMode.NthWeekday
                      ? recurrenceData.weekOfMonth
                      : undefined,
                  monthOfYear:
                    recurrenceData.frequency === RecurrenceFrequency.Yearly
                      ? data.date.getMonth() + 1
                      : undefined,
                  endDate:
                    recurrenceData.stopCondition === 'UNTIL_DATE'
                      ? recurrenceData.endDate?.toISOString()
                      : undefined,
                  repeatCount:
                    recurrenceData.stopCondition === 'REPEATS'
                      ? recurrenceData.repeatCount
                      : undefined,
                  type: TransactionType.BetweenAccounts,
                  sourceAccountId: sourceAccountId,
                  destinyAccountId: destinyAccountId,
                  isActive: true,
                },
              },
              refetchQueries: [
                refetchVariables
                  ? { query: TransactionsQuery, variables: refetchVariables }
                  : TransactionsQuery,
                TransactionsGroupedByPeriodQuery,
                TransactionsSummaryQuery,
                BalanceForecastQuery,
                TransactionsCalendarQuery,
                FinancialAgendaQuery,
              ],
              onCompleted: () => {
                toast.success('Transferência recorrente criada!', {
                  description: getRecurrenceDescription(
                    recurrenceData.frequency,
                    recurrenceData.dayMode,
                    recurrenceData.dayOfWeek,
                    recurrenceData.weekOfMonth,
                  ),
                });
                onClose();
              },
              onError: (error) => {
                toast.error('Erro ao criar transferência recorrente', {
                  description: error.message,
                });
              },
            });
            return;
          }

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

                category: data.category?.value as
                  | TransactionCategory
                  | undefined,
              },
            },
            refetchQueries: [
              refetchVariables
                ? { query: TransactionsQuery, variables: refetchVariables }
                : TransactionsQuery,
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
          {/* Back button */}
          {currentStep > 3 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
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
            {currentStep === 3 && !isEditMode && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={async () => {
                    const isValid = await form.trigger([
                      'date',
                      'amount',
                      'description',
                    ]);
                    if (isValid) {
                      setIsRecurrence(true);
                      setCurrentStep(4);
                    }
                  }}
                >
                  Repetir
                </Button>
                <Button type="submit" disabled={loading} loading={loading}>
                  Salvar
                </Button>
              </>
            )}
            {currentStep === 4 && (
              <Button
                type="button"
                onClick={() => setCurrentStep(5)}
                disabled={loading}
              >
                Próximo
              </Button>
            )}
            {currentStep === 5 && (
              <Button type="submit" disabled={loading} loading={loading}>
                Finalizar
              </Button>
            )}
            {currentStep === 3 && isEditMode && (
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            )}
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
        category,
      }) => (
        <>
          {/* Step 3: Transaction details */}
          {currentStep === 3 && (
            <>
              {date}
              {showIsCompleted && isCompleted}
              {amount}
              {paymentMethod}
              {description}
              {category}
            </>
          )}

          {/* Step 4: Recurrence configuration */}
          {currentStep === 4 && (
            <>
              <div className="space-y-4">
                {/* Summary of previous step data */}
                <div className="rounded-lg border border-muted bg-muted/30 p-4">
                  <div className="flex items-center gap-2">{amount}</div>
                </div>

                <RecurrenceFormSection
                  data={recurrenceData}
                  onChange={(newData) =>
                    setRecurrenceData((prev) => ({ ...prev, ...newData }))
                  }
                  startDate={form.getValues('date')}
                  className="mt-2"
                />
              </div>
            </>
          )}

          {/* Step 5: Recurrence preview */}
          {currentStep === 5 && (
            <RecurrenceTimelinePreview
              startDate={form.getValues('date') || new Date()}
              data={recurrenceData}
            />
          )}
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
}

interface CardData extends AccountData {
  type: CardType;
}

interface TransactionWizardState {
  transactionType?: TransactionType;
  sourceAccount?: AccountData;
  destinyAccount?: AccountData;
}

const initialTransactionWizardState: TransactionWizardState = {};

enum TransactionCardOrAccountStepType {
  Account = 'account',
  Card = 'card',
}

const transactionCardOrAccountStepTypeIcons: Record<
  TransactionCardOrAccountStepType,
  LucideIcon
> = {
  [TransactionCardOrAccountStepType.Account]: Wallet2,
  [TransactionCardOrAccountStepType.Card]: CreditCard,
};

const transactionCardOrAccountStepTypeLabels: Record<
  TransactionCardOrAccountStepType,
  string
> = {
  [TransactionCardOrAccountStepType.Account]: 'Conta',
  [TransactionCardOrAccountStepType.Card]: 'Cartão',
};

const transactionCardOrAccountStepTypeDescriptions: Record<
  TransactionCardOrAccountStepType,
  string
> = {
  [TransactionCardOrAccountStepType.Account]: 'Conta-corrente',
  [TransactionCardOrAccountStepType.Card]: 'Cartão de crédito ou débito',
};

function TransactionCardOrAccountStep({
  selectedType,
  onSelect,
}: {
  selectedType?: TransactionCardOrAccountStepType;
  onSelect: (type: TransactionCardOrAccountStepType) => void;
}) {
  const orderedCardTypes = [
    TransactionCardOrAccountStepType.Account,
    TransactionCardOrAccountStepType.Card,
  ];

  return (
    <div className="flex flex-col gap-2">
      {orderedCardTypes.map((cardType) => (
        <TypeSelectionCard
          key={cardType}
          icon={transactionCardOrAccountStepTypeIcons[cardType]}
          label={transactionCardOrAccountStepTypeLabels[cardType]}
          description={transactionCardOrAccountStepTypeDescriptions[cardType]}
          isSelected={selectedType === cardType}
          onClick={() => onSelect(cardType)}
        />
      ))}
    </div>
  );
}

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

function TransactionCardCard({
  card,
  isSelected,
  onClick,
}: {
  card: CardData;
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
        logoUrl={card.institution.logoUrl}
        name={card.institution.name}
        color={card.institution.color}
        size="lg"
      />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div
          className="h-8 w-1 flex-shrink-0 rounded"
          style={{ backgroundColor: card.institution.color || '#888' }}
        />
        <div className="flex flex-col items-start">
          <span className="truncate font-semibold">{card.name}</span>
          <span className="truncate text-sm text-muted-foreground">
            {card.institution.name}
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
  const { data, loading, fetchMore, networkStatus } = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    notifyOnNetworkStatusChange: true,
  });

  const accounts = useMemo(() => {
    const allAccounts =
      data?.accounts.edges?.map((edge) => ({
        id: edge.node.id,
        name: edge.node.name,
        institution: edge.node.institutionLink.institution,
      })) || [];
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

interface TransactionCardStepProps {
  transactionType: TransactionType;
  selectedCardId?: string;
  excludeCardId?: string;
  onSelect: (card: CardData) => void;
}

function TransactionCardStep({
  transactionType,
  selectedCardId,
  excludeCardId,
  onSelect,
}: TransactionCardStepProps) {
  const { data, loading, fetchMore, networkStatus } = useQuery(CardsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationCard.Name,
      orderDirection: OrderDirection.Asc,
    },
    notifyOnNetworkStatusChange: true,
  });

  const accounts = useMemo(() => {
    const allAccounts =
      data?.cards.edges?.map((edge) => ({
        id: edge.node.id,
        name: edge.node.name,
        institution: edge.node.institutionLink.institution,
        type: edge.node.type,
      })) || [];
    if (excludeCardId) {
      return allAccounts.filter((a) => a.id !== excludeCardId);
    }
    return allAccounts;
  }, [data?.cards.edges, excludeCardId]);

  const pageInfo = data?.cards.pageInfo;

  const paginate = useCallback(() => {
    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          cards: {
            ...prev.cards,
            ...fetchMoreResult.cards,
            edges: [
              ...(prev.cards.edges || []),
              ...(fetchMoreResult.cards.edges || []),
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
          <TransactionCardCard
            key={account.id}
            card={account}
            isSelected={selectedCardId === account.id}
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
          sourceCardId={wizardState.sourceAccount.id}
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
  const [currentStep, setCurrentStep] = useState(2);
  const [isRecurrence, setIsRecurrence] = useState(false);

  return (
    <IncomeTransactionFormDetails
      destinyAccountId={destinyAccountId}
      onClose={onClose}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isRecurrence={isRecurrence}
      setIsRecurrence={setIsRecurrence}
    />
  );
}

function ExpenseTransactionFormContent({
  sourceAccountId,
  sourceCardId,
  onClose,
}: {
  sourceAccountId: string;
  sourceCardId: string;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(3);
  const [isRecurrence, setIsRecurrence] = useState(false);

  const { data: accountData } = useQuery(AccountQuery, {
    variables: { id: sourceAccountId },
  });

  const isCardAccount =
    accountData?.account?.institutionLink?.institution?.types?.includes(
      InstitutionType.Card,
    );
  const isDebitCard = accountData?.account?.institutionLink?.cards?.some(
    (c) => c.type === CardType.Debit,
  );

  if (!accountData?.account) return null;

  return (
    <ExpenseTransactionFormDetails
      sourceAccountId={sourceAccountId}
      sourceCardId={sourceCardId}
      isCardAccount={isCardAccount}
      isDebitCard={isDebitCard}
      onClose={onClose}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isRecurrence={isRecurrence}
      setIsRecurrence={setIsRecurrence}
    />
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
  const [currentStep, setCurrentStep] = useState(3);
  const [isRecurrence, setIsRecurrence] = useState(false);

  return (
    <BetweenAccountsTransactionFormDetails
      sourceAccountId={sourceAccountId}
      destinyAccountId={destinyAccountId}
      onClose={onClose}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      isRecurrence={isRecurrence}
      setIsRecurrence={setIsRecurrence}
    />
  );
}
