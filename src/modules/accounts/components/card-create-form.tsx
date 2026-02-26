'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  useCallback,
  useState,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { toast } from 'sonner';
import { CreateCardMutation } from '../graphql/accounts-mutations';
import { InstitutionLinksQuery } from '@/modules/institution-link/graphql/institution-links-queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreditCard,
  LucideProps,
  Wallet2,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardType, InstitutionLinkFragmentFragment } from '@/graphql/graphql';
import { TypeSelectionCard } from '@/components/form-stepper-shared';
import { InstitutionLogo } from './institution-logo';
import { Skeleton } from '@/components/ui/skeleton';

const cardTypeIcons: Record<
  CardType,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  [CardType.Credit]: CreditCard,
  [CardType.Debit]: Wallet2,
};

const cardTypeLabels: Record<CardType, string> = {
  [CardType.Credit]: 'Crédito',
  [CardType.Debit]: 'Débito',
};

const cardTypeDescriptions: Record<CardType, string> = {
  [CardType.Credit]: 'Compras parceladas, faturas mensais',
  [CardType.Debit]: 'Débito direto na conta corrente',
};

function InstitutionLinkSelectionCard({
  institutionLink,
  isSelected,
  onClick,
}: {
  institutionLink: InstitutionLinkFragmentFragment;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { institution } = institutionLink;
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

const cardDetailsSchema = z.object({
  name: formFields.text.describe('Nome do cartão * // Insira o nome do cartão'),
  billingCycleDay: formFields.number
    .describe('Dia do ciclo de faturamento * // Insira o dia do ciclo')
    .min(1)
    .max(31)
    .optional(),
  billingPaymentDay: formFields.number
    .describe('Dia do vencimento * // Insira o dia do vencimento')
    .min(1)
    .max(31)
    .optional(),
  defaultLimit: formFields.currency
    .describe('Limite do cartão * // Insira o limite do cartão')
    .optional(),
});

type CardDetailsFormData = z.infer<typeof cardDetailsSchema>;

export function CardCreateForm({
  institutionLinkId,
  triggerClassName,
  children,
}: {
  institutionLinkId?: string;
  triggerClassName?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(institutionLinkId ? 2 : 1);
  const [selectedLinkId, setSelectedLinkId] = useState<string | undefined>(
    institutionLinkId,
  );
  const [selectedType, setSelectedType] = useState<CardType | undefined>();

  const [createCard, { loading: creating }] = useMutation(CreateCardMutation);

  const {
    data,
    loading: loadingLinks,
    fetchMore,
    networkStatus,
  } = useQuery(InstitutionLinksQuery, {
    variables: {
      first: 50,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const institutionLinks =
    data?.institutionLinks.edges?.map((edge) => edge.node) || [];
  const pageInfo = data?.institutionLinks.pageInfo;

  const paginate = useCallback(() => {
    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          institutionLinks: {
            ...prev.institutionLinks,
            ...fetchMoreResult.institutionLinks,
            edges: [
              ...(prev.institutionLinks.edges || []),
              ...(fetchMoreResult.institutionLinks.edges || []),
            ],
          },
        };
      },
    });
  }, [fetchMore, pageInfo]);

  // Extend schema dynamically based on selectedType
  const actuaSchema = z
    .object({
      name: cardDetailsSchema.shape.name,
      ...(selectedType === CardType.Credit
        ? {
            billingCycleDay: cardDetailsSchema.shape.billingCycleDay,
            billingPaymentDay: cardDetailsSchema.shape.billingPaymentDay,
            defaultLimit: cardDetailsSchema.shape.defaultLimit,
          }
        : {}),
    })
    .superRefine((data, ctx) => {
      if (selectedType === CardType.Credit) {
        if (!data.billingCycleDay) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Obrigatório',
            path: ['billingCycleDay'],
          });
        }
        if (!data.billingPaymentDay) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Obrigatório',
            path: ['billingPaymentDay'],
          });
        }
        const limit = data.defaultLimit as number | undefined;
        if (!limit || limit <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Obrigatório',
            path: ['defaultLimit'],
          });
        }
      }
    });

  const form = useForm<CardDetailsFormData>({
    resolver: zodResolver(actuaSchema),
    defaultValues: {
      defaultLimit: 10000,
    },
    mode: 'onSubmit',
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTimeout(() => {
          setStep(institutionLinkId ? 2 : 1);
          setSelectedLinkId(institutionLinkId);
          setSelectedType(undefined);
          form.reset();
        }, 200);
      }
    },
    [form, institutionLinkId],
  );

  const handleSubmit = useCallback(
    async (formData: CardDetailsFormData) => {
      if (!selectedLinkId || !selectedType) return;

      await createCard({
        variables: {
          data: {
            name: formData.name,
            institutionLinkId: selectedLinkId,
            type: selectedType,
            ...(selectedType === CardType.Credit && {
              billingCycleDay: formData.billingCycleDay,
              billingPaymentDay: formData.billingPaymentDay,
              defaultLimit: formData.defaultLimit,
            }),
          },
        },
        refetchQueries: [InstitutionLinksQuery],
        onCompleted: () => {
          toast.success('Cartão criado!', {
            description: 'O novo cartão foi adicionado com sucesso.',
          });
          handleOpenChange(false);
        },
        onError: (error) => {
          toast.error('Erro ao criar cartão!', {
            description: error.message,
          });
        },
      });
    },
    [createCard, selectedLinkId, selectedType, handleOpenChange],
  );

  const handleNext = () => {
    if (step === 1 && selectedLinkId) {
      setStep(2);
    } else if (step === 2 && selectedType) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2 && !institutionLinkId) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const isCredit = selectedType === CardType.Credit;
  const selectedInstitutionLink = institutionLinks.find(
    (link) => link.id === selectedLinkId,
  );

  // If we are at step 2 onwards but need the back button (because no initial institution param was provided)
  const showBackButton =
    (!institutionLinkId && step > 1) || (institutionLinkId && step > 2);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" size="sm" className={triggerClassName}>
            <CreditCard className="mr-2 h-4 w-4 text-emerald-500" />
            Adicionar cartão
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Cartão</DialogTitle>
          <DialogDescription>
            {step === 1 && 'Selecione a instituição do novo cartão.'}
            {step === 2 && 'Selecione o tipo do novo cartão.'}
            {step === 3 && 'Insira os dados do novo cartão.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
                {loadingLinks && institutionLinks.length === 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {institutionLinks.map((link) => (
                      <InstitutionLinkSelectionCard
                        key={link.id}
                        institutionLink={link}
                        isSelected={selectedLinkId === link.id}
                        onClick={() => setSelectedLinkId(link.id)}
                      />
                    ))}
                  </div>
                )}
                {pageInfo?.hasNextPage && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={paginate}
                    disabled={networkStatus === 3}
                  >
                    Carregar mais
                  </Button>
                )}
              </div>
            </div>
          )}

          {step >= 2 && selectedInstitutionLink && (
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                <InstitutionLogo
                  logoUrl={selectedInstitutionLink.institution.logoUrl}
                  name={selectedInstitutionLink.institution.name}
                  color={selectedInstitutionLink.institution.color}
                  size="sm"
                />
                <div className="flex flex-col">
                  <span className="text-xs leading-none text-muted-foreground">
                    Instituição selecionada
                  </span>
                  <span className="text-sm font-medium">
                    {selectedInstitutionLink.institution.name}
                  </span>
                </div>
              </div>
              {step === 3 && selectedType && (
                <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background shadow-sm border">
                    {(() => {
                      const Icon = cardTypeIcons[selectedType];
                      return <Icon className="h-4 w-4 text-muted-foreground" />;
                    })()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs leading-none text-muted-foreground">
                      Tipo do cartão selecionado
                    </span>
                    <span className="text-sm font-medium">
                      {cardTypeLabels[selectedType]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <CardTypeSelectionStep
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <TsForm
                form={form}
                schema={cardDetailsSchema}
                onSubmit={handleSubmit}
                renderAfter={() => null}
              >
                {({
                  name,
                  billingCycleDay,
                  billingPaymentDay,
                  defaultLimit,
                }) => (
                  <>
                    {name}
                    {isCredit && (
                      <>
                        {billingCycleDay}
                        {billingPaymentDay}
                        {defaultLimit}
                      </>
                    )}
                  </>
                )}
              </TsForm>
            </div>
          )}
        </div>

        <div className="mt-2 flex w-full items-center justify-between border-t pt-4">
          {showBackButton ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
          )}

          {step === 1 ? (
            <Button
              type="button"
              disabled={!selectedLinkId}
              onClick={handleNext}
              className={cn(
                'relative flex min-w-28 items-center justify-center',
              )}
            >
              Avançar
            </Button>
          ) : step === 2 ? (
            <Button
              type="button"
              disabled={!selectedType}
              onClick={handleNext}
              className={cn(
                'relative flex min-w-28 items-center justify-center',
              )}
            >
              Avançar
            </Button>
          ) : (
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              disabled={creating}
              className={cn(
                'relative flex min-w-28 items-center justify-center',
              )}
            >
              Salvar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
