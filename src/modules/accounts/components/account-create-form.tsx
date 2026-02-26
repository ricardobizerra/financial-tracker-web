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
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { CreateAccountMutation } from '../graphql/accounts-mutations';
import { InstitutionLinksQuery } from '@/modules/institution-link/graphql/institution-links-queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InstitutionLogo } from './institution-logo';
import { Skeleton } from '@/components/ui/skeleton';
import { InstitutionLinkFragmentFragment } from '@/graphql/graphql';

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

export function AccountCreateForm({
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

  const [createAccount, { loading: creating }] = useMutation(
    CreateAccountMutation,
  );

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

  const form = useForm<AccountDetailsFormData>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      isActive: true,
      initialBalance: 0,
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
          form.reset();
        }, 200);
      }
    },
    [form, institutionLinkId],
  );

  const handleSubmit = useCallback(
    async (formData: AccountDetailsFormData) => {
      if (!selectedLinkId) return;
      await createAccount({
        variables: {
          data: {
            name: formData.name,
            institutionLinkId: selectedLinkId,
            isActive: formData.isActive,
            description: formData.description,
            initialBalance: formData.initialBalance,
          },
        },
        refetchQueries: [InstitutionLinksQuery],
        onCompleted: () => {
          toast.success('Conta criada!', {
            description: 'A nova conta foi adicionada com sucesso.',
          });
          handleOpenChange(false);
        },
        onError: (error) => {
          toast.error('Erro ao criar conta!', {
            description: error.message,
          });
        },
      });
    },
    [createAccount, selectedLinkId, handleOpenChange],
  );

  const handleNext = () => {
    if (!selectedLinkId) return;
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const selectedInstitutionLink = institutionLinks.find(
    (link) => link.id === selectedLinkId,
  );

  const showBackButton = !institutionLinkId;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" size="sm" className={triggerClassName}>
            <Building2 className="mr-2 h-4 w-4 text-emerald-500" />
            Adicionar conta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Conta</DialogTitle>
          <DialogDescription>
            {step === 1
              ? 'Selecione a instituição.'
              : 'Insira os dados da nova conta para adicioná-la à instituição.'}
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

          {step === 2 && (
            <div className="flex flex-col gap-4">
              {selectedInstitutionLink && (
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
              )}
              <TsForm
                form={form}
                schema={accountDetailsSchema}
                onSubmit={handleSubmit}
                renderAfter={() => null}
              >
                {({ name, description, initialBalance, isActive }) => (
                  <>
                    {name}
                    {description}
                    {initialBalance}
                    {isActive}
                  </>
                )}
              </TsForm>
            </div>
          )}
        </div>

        <div className="mt-2 flex w-full items-center justify-between border-t pt-4">
          {step === 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
          ) : (
            <>
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
            </>
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
