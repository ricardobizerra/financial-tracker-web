'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
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
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  LucideProps,
  PiggyBank,
  PlusIcon,
  TrendingUp,
  Wallet2,
} from 'lucide-react';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  AccountType,
  CardType,
  CreateAccountInput,
  OrdenationInstitutionModel,
  OrderDirection,
} from '@/graphql/graphql';
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateAccountMutation } from '../graphql/accounts-mutations';
import { AccountsQuery, InstitutionsQuery } from '../graphql/accounts-queries';
import { accountTypeLabels, cardTypeLabels } from '../accounts-constants';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Skeleton } from '@/components/ui/skeleton';
import { TypeSelectionCard } from '@/components/form-stepper-shared';

// ============================================================================
// Types & Constants
// ============================================================================

interface InstitutionData {
  id: string;
  name: string;
  logoUrl?: string | null;
  color?: string | null;
}

interface FormStepperState {
  accountType?: AccountType;
  institution?: InstitutionData;
  accountDetails?: AccountDetailsFormData;
  accountDetailsValid: boolean;
  selectedCardType?: CardType;
  creditCardBillingDetails?: CreditCardBillingFormData;
  creditCardBillingValid: boolean;
}

const initialFormStepperState: FormStepperState = {
  accountDetailsValid: false,
  creditCardBillingValid: false,
};

const accountTypeIcons: Record<
  AccountType,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  [AccountType.Checking]: Building2,
  [AccountType.Savings]: PiggyBank,
  [AccountType.Investment]: TrendingUp,
  [AccountType.CreditCard]: CreditCard,
  [AccountType.Wallet]: Wallet2,
  [AccountType.Other]: Building2,
};

const accountTypeColors: Record<
  AccountType,
  { bg: string; border: string; text: string }
> = {
  [AccountType.Checking]: {
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
    border: 'border-blue-500',
    text: 'text-blue-500',
  },
  [AccountType.Savings]: {
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    border: 'border-emerald-500',
    text: 'text-emerald-500',
  },
  [AccountType.Investment]: {
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-500',
  },
  [AccountType.CreditCard]: {
    bg: 'bg-amber-500/10 hover:bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-500',
  },
  [AccountType.Wallet]: {
    bg: 'bg-cyan-500/10 hover:bg-cyan-500/20',
    border: 'border-cyan-500',
    text: 'text-cyan-500',
  },
  [AccountType.Other]: {
    bg: 'bg-gray-500/10 hover:bg-gray-500/20',
    border: 'border-gray-500',
    text: 'text-gray-500',
  },
};

// ============================================================================
// Schemas
// ============================================================================

const accountDetailsSchema = z.object({
  name: formFields.text.describe('Nome * // Insira o nome da conta'),
  description: formFields.text
    .describe('Descrição // Insira a descrição da conta')
    .optional(),
  initialBalance: formFields.currency.describe(
    'Saldo inicial * // Insira o saldo inicial da conta',
  ),
  isActive: formFields.switch.describe(
    'Conta ativa? // Indica se a conta está ativa e visível no sistema',
  ),
});

type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>;

const creditCardBillingSchema = z.object({
  billingCycleDay: formFields.number
    .describe(
      'Dia do ciclo de faturamento * // Insira o dia do ciclo de faturamento',
    )
    .min(1)
    .max(31),
  billingPaymentDay: formFields.number
    .describe('Dia do pagamento * // Insira o dia do pagamento')
    .min(1)
    .max(31),
  defaultLimit: formFields.currency.describe(
    'Limite do cartão * // Insira o limite do cartão',
  ),
});

type CreditCardBillingFormData = z.infer<typeof creditCardBillingSchema>;

// ============================================================================
// Step Indicator Component
// ============================================================================

function StepIndicator({
  currentStep,
  isCreditCard,
  selectedType,
  selectedInstitution,
  selectedCardType,
}: {
  currentStep: number;
  isCreditCard: boolean;
  selectedType?: AccountType;
  selectedInstitution?: InstitutionData;
  selectedCardType?: CardType;
}) {
  const isCreditCardSelected = selectedCardType === CardType.Credit;

  // Steps dinamicamente baseados no tipo de conta e cartão
  const remainingSteps = [
    { number: 3, label: 'Dados' },
    ...(isCreditCard ? [{ number: 4, label: 'Tipo' }] : []),
    ...(isCreditCardSelected ? [{ number: 5, label: 'Fatura' }] : []),
  ];

  // Also show step 1 and 2 if not yet completed
  const step1Completed = currentStep > 1 && selectedType;
  const step2Completed = currentStep > 2 && selectedInstitution;

  return (
    <div className="flex flex-col gap-2">
      {/* Step 1: Type - show as full width row when completed */}
      {step1Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1.5 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">Tipo</span>
          <div className="flex items-center gap-1">
            {(() => {
              const Icon = accountTypeIcons[selectedType];
              return <Icon className="h-4 w-4" />;
            })()}
            <span>{accountTypeLabels[selectedType]}</span>
          </div>
        </div>
      )}

      {/* Step 2: Institution - show as full width row when completed */}
      {step2Completed && (
        <div className="flex items-center gap-2 rounded-md border border-muted px-3 py-1 text-sm text-foreground">
          <span className="font-semibold text-muted-foreground">
            Instituição
          </span>
          <div className="flex items-center gap-1">
            <InstitutionLogo
              logoUrl={selectedInstitution.logoUrl}
              name={selectedInstitution.name}
              color={selectedInstitution.color}
              size="sm"
            />
            <span>{selectedInstitution.name}</span>
          </div>
        </div>
      )}

      {/* Steps row: show incomplete steps 1/2 and all remaining steps */}
      <div className="flex items-center justify-center gap-2">
        {/* Step 1 if not completed */}
        {!step1Completed && (
          <div
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep === 1
                ? 'bg-primary/80 text-primary-foreground'
                : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">1</div>
            <span className="hidden text-sm sm:block">Tipo</span>
          </div>
        )}

        {/* Step 2 if not completed */}
        {!step2Completed && (
          <div
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep > 1
                ? 'bg-primary text-primary-foreground'
                : currentStep === 2
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">
              {currentStep > 2 ? <Check className="h-4 w-4" /> : 2}
            </div>
            <span
              className={cn(
                'hidden text-sm sm:block',
                currentStep >= 2 ? 'text-white' : 'text-muted-foreground',
              )}
            >
              Instituição
            </span>
          </div>
        )}

        {/* Remaining steps (3, 4 e opcionalmente 5) */}
        {remainingSteps.map((step) => (
          <div
            key={step.number}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md py-1',
              currentStep > step.number
                ? 'bg-primary text-primary-foreground'
                : currentStep === step.number
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            <div className="text-sm font-bold">
              {currentStep > step.number ? (
                <Check className="h-4 w-4" />
              ) : (
                step.number
              )}
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
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Step 1: Account Type Selection
// ============================================================================

const accountTypeDescriptions: Record<AccountType, string> = {
  [AccountType.Checking]: 'Para transações do dia a dia',
  [AccountType.Savings]: 'Aplicações em poupança',
  [AccountType.Investment]: 'Aplicações gerais de investimento',
  [AccountType.CreditCard]: 'Compras parceladas e faturas',
  [AccountType.Wallet]: 'Pagamentos digitais e PIX',
  [AccountType.Other]: 'Outros tipos de conta',
};

function AccountTypeStep({
  selectedType,
  onSelect,
}: {
  selectedType?: AccountType;
  onSelect: (type: AccountType) => void;
}) {
  // Ordered by similarity:
  // - Transactional accounts: Checking, Wallet, Credit Card
  // - Investment accounts: Savings, Investment
  const orderedAccountTypes = [
    AccountType.Checking,
    AccountType.Wallet,
    AccountType.CreditCard,
    AccountType.Savings,
    AccountType.Investment,
  ];

  return (
    <div className="flex flex-col gap-2">
      {orderedAccountTypes.map((accountType) => (
        <TypeSelectionCard
          key={accountType}
          icon={accountTypeIcons[accountType]}
          label={accountTypeLabels[accountType]}
          description={accountTypeDescriptions[accountType]}
          isSelected={selectedType === accountType}
          onClick={() => onSelect(accountType)}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Step 2: Institution Selection
// ============================================================================

function InstitutionCard({
  institution,
  isSelected,
  onClick,
}: {
  institution: InstitutionData;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg border-2 p-3 transition-all duration-200',
        'cursor-pointer hover:bg-accent',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-transparent bg-muted/50',
      )}
    >
      <InstitutionLogo
        logoUrl={institution.logoUrl}
        name={institution.name}
        color={institution.color}
        size="lg"
      />
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div
          className="h-6 w-1 flex-shrink-0 rounded"
          style={{ backgroundColor: institution.color || '#888' }}
        />
        <span className="truncate text-sm font-medium">{institution.name}</span>
      </div>
      {isSelected && <Check className="h-5 w-5 flex-shrink-0 text-primary" />}
    </button>
  );
}

function InstitutionStep({
  accountType,
  selectedInstitutionId,
  onSelect,
}: {
  accountType: AccountType;
  selectedInstitutionId?: string;
  onSelect: (institution: InstitutionData) => void;
}) {
  const { data, loading, fetchMore, networkStatus } = useQuery(
    InstitutionsQuery,
    {
      variables: {
        first: 50,
        orderBy: OrdenationInstitutionModel.Name,
        orderDirection: OrderDirection.Asc,
        types: [accountType],
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const institutions = data?.institutions.edges?.map((edge) => edge.node) || [];
  const pageInfo = data?.institutions.pageInfo;

  const paginate = useCallback(() => {
    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          institutions: {
            ...prev.institutions,
            ...fetchMoreResult.institutions,
            edges: [
              ...(prev.institutions.edges || []),
              ...(fetchMoreResult.institutions.edges || []),
            ],
          },
        };
      },
    });
  }, [fetchMore, pageInfo]);

  if (loading && institutions.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-h-[340px] space-y-3 overflow-y-auto">
      <div className="grid grid-cols-1 gap-2">
        {institutions.map((institution) => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            isSelected={selectedInstitutionId === institution.id}
            onClick={() => onSelect(institution)}
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

// ============================================================================
// Step 3: Account Details
// ============================================================================

function AccountDetailsStep({
  showInitialBalance,
  defaultValues,
  onDataChange,
}: {
  showInitialBalance: boolean;
  defaultValues?: Partial<AccountDetailsFormData>;
  onDataChange: (data: AccountDetailsFormData, isValid: boolean) => void;
}) {
  const form = useForm<AccountDetailsFormData>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      isActive: true,
      initialBalance: 0,
      ...defaultValues,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      const isValid =
        form.formState.isValid && !!data.name && data.name.length > 0;
      onDataChange(data as AccountDetailsFormData, isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  useEffect(() => {
    const data = form.getValues();
    const isValid = !!data.name && data.name.length > 0;
    onDataChange(data, isValid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TsForm
      form={form}
      schema={accountDetailsSchema}
      onSubmit={() => {}}
      renderAfter={() => null}
    >
      {({ name, description, initialBalance, isActive }) => (
        <>
          {name}
          {description}
          {showInitialBalance && initialBalance}
          {isActive}
        </>
      )}
    </TsForm>
  );
}

// ============================================================================
// Step 4: Card Type Selection
// ============================================================================

const cardTypeIcons: Record<
  CardType,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  [CardType.Credit]: CreditCard,
  [CardType.Debit]: Wallet2,
};

const cardTypeDescriptions: Record<CardType, string> = {
  [CardType.Credit]: 'Compras parceladas, faturas mensais',
  [CardType.Debit]: 'Débito direto na conta corrente',
};

function CardTypeSelectionStep({
  selectedType,
  onSelect,
}: {
  selectedType?: CardType;
  onSelect: (type: CardType) => void;
}) {
  const orderedCardTypes = [CardType.Credit, CardType.Debit];

  return (
    <div className="flex flex-col gap-2">
      {orderedCardTypes.map((cardType) => (
        <TypeSelectionCard
          key={cardType}
          icon={cardTypeIcons[cardType]}
          label={cardTypeLabels[cardType]}
          description={cardTypeDescriptions[cardType]}
          isSelected={selectedType === cardType}
          onClick={() => onSelect(cardType)}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Step 5: Credit Card Billing Details (only for credit cards)
// ============================================================================

function CreditCardBillingStep({
  defaultValues,
  onDataChange,
}: {
  defaultValues?: Partial<CreditCardBillingFormData>;
  onDataChange: (data: CreditCardBillingFormData, isValid: boolean) => void;
}) {
  const form = useForm<CreditCardBillingFormData>({
    resolver: zodResolver(creditCardBillingSchema),
    defaultValues: {
      defaultLimit: 10000,
      ...defaultValues,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = form.watch((data) => {
      const isValid =
        !!data.billingCycleDay &&
        !!data.billingPaymentDay &&
        !!data.defaultLimit &&
        Number(data.defaultLimit) > 0;
      onDataChange(data as CreditCardBillingFormData, isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  useEffect(() => {
    const data = form.getValues();
    const isValid =
      !!data.billingCycleDay &&
      !!data.billingPaymentDay &&
      !!data.defaultLimit &&
      data.defaultLimit > 0;
    onDataChange(data, isValid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TsForm
      form={form}
      schema={creditCardBillingSchema}
      onSubmit={() => {}}
      renderAfter={() => null}
    >
      {({ billingCycleDay, billingPaymentDay, defaultLimit }) => (
        <>
          {billingCycleDay}
          {billingPaymentDay}
          {defaultLimit}
        </>
      )}
    </TsForm>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function AccountCreateForm({
  type,
  triggerClassName,
}: {
  type?: AccountType;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(type ? 2 : 1);
  const [formStepperState, setFormStepperState] = useState<FormStepperState>(
    () => ({
      ...initialFormStepperState,
      accountType: type,
    }),
  );

  const [createAccount, { loading }] = useMutation(CreateAccountMutation);

  const isCreditCard = formStepperState.accountType === AccountType.CreditCard;
  const isDebitCardSelected =
    formStepperState.selectedCardType === CardType.Debit;
  const isCreditCardSelected =
    formStepperState.selectedCardType === CardType.Credit;
  // Total de passos: 3 para contas normais, 4 para cartão de débito, 5 para cartão de crédito
  const totalSteps = isCreditCard ? (isCreditCardSelected ? 5 : 4) : 3;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          setFormStepperState({
            ...initialFormStepperState,
            accountType: type,
          });
          setCurrentStep(type ? 2 : 1);
        }, 200);
      }
    },
    [type],
  );

  const handleTypeSelect = useCallback(
    (accountType: AccountType) => {
      setFormStepperState((prev) => ({
        ...prev,
        accountType,
        institution: undefined,
      }));
      nextStep();
    },
    [nextStep],
  );

  const handleInstitutionSelect = useCallback(
    (institution: InstitutionData) => {
      setFormStepperState((prev) => ({
        ...prev,
        institution,
      }));
      nextStep();
    },
    [nextStep],
  );

  const handleAccountDetailsChange = useCallback(
    (data: AccountDetailsFormData, isValid: boolean) => {
      setFormStepperState((prev) => ({
        ...prev,
        accountDetails: data,
        accountDetailsValid: isValid,
      }));
    },
    [],
  );

  const handleCardTypeSelect = useCallback((cardType: CardType) => {
    setFormStepperState((prev) => ({
      ...prev,
      selectedCardType: cardType,
    }));
    // Para débito, não precisa de próximo passo - vai salvar direto
    // Para crédito, avança para passo 5 (billing)
    if (cardType === CardType.Credit) {
      setCurrentStep(5);
    }
  }, []);

  const handleBillingChange = useCallback(
    (data: CreditCardBillingFormData, isValid: boolean) => {
      setFormStepperState((prev) => ({
        ...prev,
        creditCardBillingDetails: data,
        creditCardBillingValid: isValid,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (
      !formStepperState.accountType ||
      !formStepperState.institution ||
      !formStepperState.accountDetails
    ) {
      return;
    }

    const {
      accountType,
      institution,
      accountDetails,
      selectedCardType,
      creditCardBillingDetails,
    } = formStepperState;

    await createAccount({
      variables: {
        data: {
          name: accountDetails.name,
          type: accountType,
          institutionId: institution.id,
          isActive: accountDetails.isActive,
          description: accountDetails.description,
          initialBalance: accountDetails.initialBalance,
          // Para contas de cartão, enviar cardInfos
          ...(accountType === AccountType.CreditCard &&
            selectedCardType && {
              cardInfos: {
                type: selectedCardType,
                // Campos de fatura apenas para cartão de crédito
                ...(selectedCardType === CardType.Credit &&
                  creditCardBillingDetails && {
                    billingCycleDay: creditCardBillingDetails.billingCycleDay,
                    billingPaymentDay:
                      creditCardBillingDetails.billingPaymentDay,
                    defaultLimit: creditCardBillingDetails.defaultLimit,
                  }),
              },
            }),
        },
      },
      refetchQueries: [AccountsQuery],
      onCompleted: () => {
        toast.success('Conta criada!', {
          description: 'As informações foram salvas com sucesso.',
        });
        handleOpenChange(false);
      },
      onError: (error) => {
        toast.error('Erro ao criar conta!', {
          description: error.message,
        });
      },
    });
  }, [formStepperState, createAccount, handleOpenChange]);

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Selecione o tipo de conta';
      case 2:
        return 'Selecione a instituição';
      case 3:
        return 'Informações da conta';
      case 4:
        return 'Tipo de cartão';
      case 5:
        return 'Informações de fatura';
      default:
        return 'Nova conta';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Escolha o tipo de conta que você deseja criar.';
      case 2:
        return 'Escolha a instituição financeira da sua conta.';
      case 3:
        return 'Preencha as informações básicas da conta.';
      case 4:
        return 'Selecione se o cartão é de crédito ou débito.';
      case 5:
        return 'Preencha as informações de fatura do cartão de crédito.';
      default:
        return '';
    }
  };

  const canProceedStep3 = formStepperState.accountDetailsValid;
  const canSubmitDebit = isDebitCardSelected; // Débito pode salvar no passo 4
  const canSubmitCredit =
    isCreditCardSelected && formStepperState.creditCardBillingValid; // Crédito precisa do passo 5

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn('flex items-center gap-1', triggerClassName)}
        >
          <PlusIcon />
          Nova conta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criação de conta</DialogTitle>
          <DialogDescription>
            Siga os passos abaixo para adicionar uma nova conta
          </DialogDescription>
        </DialogHeader>

        <StepIndicator
          currentStep={currentStep}
          isCreditCard={isCreditCard}
          selectedType={formStepperState.accountType}
          selectedInstitution={formStepperState.institution}
          selectedCardType={formStepperState.selectedCardType}
        />

        <div className="flex flex-col text-center text-muted-foreground sm:text-left">
          <p className="font-medium">{getStepTitle()}</p>
          <p className="text-sm">{getStepDescription()}</p>
        </div>

        {currentStep === 1 && (
          <AccountTypeStep
            selectedType={formStepperState.accountType}
            onSelect={handleTypeSelect}
          />
        )}

        {currentStep === 2 && formStepperState.accountType && (
          <InstitutionStep
            accountType={formStepperState.accountType}
            selectedInstitutionId={formStepperState.institution?.id}
            onSelect={handleInstitutionSelect}
          />
        )}

        {currentStep === 3 && (
          <AccountDetailsStep
            showInitialBalance={!isCreditCard}
            defaultValues={formStepperState.accountDetails}
            onDataChange={handleAccountDetailsChange}
          />
        )}

        {/* Step 4: Card Type Selection */}
        {currentStep === 4 && isCreditCard && (
          <CardTypeSelectionStep
            selectedType={formStepperState.selectedCardType}
            onSelect={handleCardTypeSelect}
          />
        )}

        {/* Step 5: Credit Card Billing (only for credit cards) */}
        {currentStep === 5 && isCreditCardSelected && (
          <CreditCardBillingStep
            defaultValues={formStepperState.creditCardBillingDetails}
            onDataChange={handleBillingChange}
          />
        )}

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

          {/* Non-card accounts: Save on step 3 */}
          {currentStep === 3 && !isCreditCard && (
            <Button
              type="button"
              disabled={loading || !canProceedStep3}
              loading={loading}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          )}

          {/* Card accounts: Next on step 3 */}
          {currentStep === 3 && isCreditCard && (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceedStep3}
              className="gap-1"
            >
              Próximo
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {/* Debit cards: Save on step 4 */}
          {currentStep === 4 && isDebitCardSelected && (
            <Button
              type="button"
              disabled={loading || !canSubmitDebit}
              loading={loading}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          )}

          {/* Credit cards: Save on step 5 */}
          {currentStep === 5 && (
            <Button
              type="button"
              disabled={loading || !canSubmitCredit}
              loading={loading}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
