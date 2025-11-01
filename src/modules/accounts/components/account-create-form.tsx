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
import { PlusIcon } from 'lucide-react';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  AccountType,
  OrdenationInstitutionModel,
  OrderDirection,
} from '@/graphql/graphql';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateAccountMutation } from '../graphql/accounts-mutations';
import { AccountsQuery, InstitutionsQuery } from '../graphql/accounts-queries';
import { accountTypeLabels } from '../accounts-constants';
import { AccountTypeBadge } from './account-type-badge';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const schema = z.object({
  name: formFields.text.describe('Nome * // Insira o nome da conta'),
  description: formFields.text
    .describe('Descrição // Insira a descrição da conta')
    .optional(),
  type: formFields.select.describe('Tipo * // Insira o tipo da conta'),
  institution: formFields.select.describe(
    'Instituição * // Insira a instituição',
  ),
  balance: formFields.currency.describe(
    'Saldo inicial * // Insira o saldo inicial da conta',
  ),
  isActive: formFields.switch.describe(
    'Conta ativa? // Indica se a conta está ativa e visível no sistema',
  ),
});

export function AccountCreateForm({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [createAccount, { loading }] = useMutation(CreateAccountMutation);

  const accountTypeOptions = Object.values(AccountType).map((type) => ({
    value: type,
    label: accountTypeLabels[type],
  }));

  const institutionsQueryOptions = useQuery(InstitutionsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationInstitutionModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const institutionsOptions =
    institutionsQueryOptions.data?.institutions.edges?.map((edge) => ({
      value: edge.node.id,
      label: edge.node.name,
      data: {
        ...edge.node,
      },
    })) || [];

  const institutionsPageInfo =
    institutionsQueryOptions.data?.institutions.pageInfo;

  const paginate = useCallback(() => {
    institutionsQueryOptions.fetchMore({
      variables: {
        after: institutionsPageInfo?.endCursor,
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
  }, [institutionsQueryOptions, institutionsPageInfo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn('flex items-center gap-1', triggerClassName)}
        >
          <PlusIcon />
          Nova conta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova conta</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar uma nova conta.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          schema={schema}
          defaultValues={{
            isActive: true,
          }}
          props={{
            type: {
              options: accountTypeOptions,
              renderLabel: (option) => (
                <AccountTypeBadge type={option.value as AccountType} />
              ),
            },
            institution: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-2">
                  <Image
                    src={option.data.logoUrl}
                    alt={option.data.name}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <Badge variant="outline" size="xs">
                    {option.data.code}
                  </Badge>
                  <p>{option.label}</p>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
          }}
          onSubmit={async (data) => {
            await createAccount({
              variables: {
                data: {
                  name: data.name,
                  type: data.type.value as AccountType,
                  institution: {
                    connect: {
                      id: data.institution.value,
                    },
                  },
                  isActive: data.isActive,
                  description: data.description,
                  balance: data.balance,
                },
              },
              refetchQueries: [AccountsQuery],
              onCompleted: () => {
                toast.success('Conta criada!', {
                  description: 'As informações foram salvas com sucesso.',
                });
                setOpen(false);
              },
              onError: (error) => {
                toast.error('Erro ao criar conta!', {
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
        />
      </DialogContent>
    </Dialog>
  );
}
