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
import { Check, PlusIcon } from 'lucide-react';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import { OrdenationInstitutionModel, OrderDirection } from '@/graphql/graphql';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateInstitutionLinkMutation } from '../graphql/institution-links-mutations';
import { InstitutionLinksQuery } from '../graphql/institution-links-queries';
import { InstitutionsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { Skeleton } from '@/components/ui/skeleton';

// ============================================================================
// Types
// ============================================================================

interface InstitutionData {
  id: string;
  name: string;
  logoUrl?: string | null;
  color?: string | null;
}

// ============================================================================
// Schemas
// ============================================================================

const institutionLinkSchema = z.object({
  institutionId: formFields.text.describe(
    'Instituição * // Selecione uma instituição',
  ),
});

type InstitutionLinkFormData = z.infer<typeof institutionLinkSchema>;

// ============================================================================
// Institution Card Component
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

// ============================================================================
// Main Component
// ============================================================================

export function InstitutionLinkCreateForm({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<
    string | null
  >(null);

  const [createInstitutionLink, { loading: creating }] = useMutation(
    CreateInstitutionLinkMutation,
  );

  const { data, loading, fetchMore, networkStatus } = useQuery(
    InstitutionsQuery,
    {
      variables: {
        first: 50,
        orderBy: OrdenationInstitutionModel.Name,
        orderDirection: OrderDirection.Asc,
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

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setSelectedInstitutionId(null);
      }, 200);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedInstitutionId) {
      toast.error('Selecione uma instituição!');
      return;
    }

    await createInstitutionLink({
      variables: {
        data: {
          institutionId: selectedInstitutionId,
        },
      },
      // Atualiza a Grid que está logo atrás do dialog refetching-a
      refetchQueries: [InstitutionLinksQuery],
      onCompleted: () => {
        toast.success('Instituição vinculada!', {
          description: 'A instituição foi adicionada à sua conta.',
        });
        handleOpenChange(false);
      },
      onError: (error) => {
        toast.error('Erro ao vincular instituição!', {
          description: error.message,
        });
      },
    });
  }, [selectedInstitutionId, createInstitutionLink, handleOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          <PlusIcon className="h-4 w-4" />
          Nova instituição
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vincular Instituição</DialogTitle>
          <DialogDescription>
            Selecione uma instituição financeira para adicionar à sua conta e
            começar a gerenciar seus cartões e conta corrente.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="max-h-[340px] space-y-3 overflow-y-auto pr-1">
            {loading && institutions.length === 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {institutions.map((institution) => (
                  <InstitutionCard
                    key={institution.id}
                    institution={institution}
                    isSelected={selectedInstitutionId === institution.id}
                    onClick={() => setSelectedInstitutionId(institution.id)}
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

        <div className="mt-2 flex w-full justify-between border-t pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedInstitutionId || creating}
            className={cn('relative flex min-w-28 items-center justify-center')}
          >
            Vincular
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
