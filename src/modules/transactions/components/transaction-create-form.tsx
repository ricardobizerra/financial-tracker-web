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

// Income Form Details (for form step 2 and edit mode)
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
  const loading = isEditMode ? updateLoading : createLoading;

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
              editTransaction={editTransaction}
              hiddenFields={hiddenFields}
              minDate={minDate}
              maxDate={maxDate}
              presetPaymentMethod={paymentMethod}
              onBeforeSubmit={onBeforeSubmit}
              onClose={() => handleOpenChange(false)}
              onBack={!isEditMode && !hasPreselectedAccount ? prevStep : undefined}
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
  const loading = isEditMode
    ? updateLoading
    : createLoading || installmentLoading;

  // Internal step state for installment configuration
  const [showInstallmentStep, setShowInstallmentStep] = useState(false);

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
          // For credit card accounts, auto-set payment method to CREDIT_CARD
          paymentMethod: isCreditCardAccount
            ? {
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
            {/* Parcelar button - only in step 2 (not installment step) and not in edit mode */}
            {!showInstallmentStep && !isEditMode && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowInstallmentStep(true)}
              >
                Parcelar
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
          {!showInstallmentStep && (
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
                {watchedInstallmentCount && watchedInstallmentCount > 1 && watchedAmount && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">Valor de cada parcela</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatCurrency(watchedAmount / watchedInstallmentCount)}
                    </p>
                  </div>
                )}
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
                Ao alterar o valor ou número de parcelas, todas as parcelas serão
                recalculadas.
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
        'flex items-center gap-3 rounded-lg border-2 p-3 transition-all duration-200 cursor-pointer hover:bg-accent w-full',
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

  const isDetailsStep = isBetweenAccounts ? currentStep === 4 : currentStep === 3;

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
