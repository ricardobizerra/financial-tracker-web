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
  TransactionType,
  OrdenationInstitutionModel,
  OrderDirection,
  OrdenationAccountModel,
  TransactionStatus,
} from '@/graphql/graphql';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateTransactionMutation } from '../graphql/transactions-mutations';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { TransactionTypeBadge } from './transaction-type-badge';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { TransactionStatusBadge } from './transaction-status-badge';

const schema = z.object({
  date: formFields.date.describe('Data * // Insira a data da movimentação'),
  amount: formFields.currency.describe(
    'Valor * // Insira o valor da movimentação',
  ),
  description: formFields.text.describe(
    'Descrição * // Insira a descrição da movimentação',
  ),
  type: formFields.select.describe('Tipo * // Insira o tipo da movimentação'),
  account: formFields.select.describe('Conta * // Insira a conta'),
  status: formFields.select.describe(
    'Status * // Insira o status da movimentação',
  ),
});

export function TransactionCreateForm({
  triggerClassName,
  accountId,
}: {
  triggerClassName?: string;
  accountId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [createTransaction, { loading }] = useMutation(
    CreateTransactionMutation,
  );

  const accountTypeOptions = Object.values(TransactionType).map((type) => ({
    value: type,
    label: type,
  }));

  const accountStatusOptions = Object.values(TransactionStatus).map(
    (status) => ({
      value: status,
      label: status,
    }),
  );

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const institutionsOptions =
    institutionsQueryOptions.data?.accounts.edges?.map((edge) => ({
      value: edge.node.id,
      label: edge.node.name,
      data: {
        ...edge.node,
      },
    })) || [];

  const institutionsPageInfo = institutionsQueryOptions.data?.accounts.pageInfo;

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
          size="sm"
          className={cn('flex items-center gap-1', triggerClassName)}
        >
          <PlusIcon />
          Nova movimentação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova movimentação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar uma nova movimentação.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          schema={schema}
          defaultValues={
            !!accountId
              ? {
                  account: {
                    value: accountId,
                    label: accountId,
                  },
                }
              : undefined
          }
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
            account: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-2">
                  <Image
                    src={option.data.institution.logoUrl}
                    alt={option.data.institution.name}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <p>{option.data.name}</p>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
            },
          }}
          onSubmit={async (data) => {
            await createTransaction({
              variables: {
                data: {
                  date: data.date,
                  type: data.type.value as TransactionType,
                  account: {
                    connect: {
                      id: data.account.value,
                    },
                  },
                  status: data.status.value as TransactionStatus,
                  description: data.description,
                  amount: data.amount,
                },
              },
              refetchQueries: [TransactionsQuery],
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
