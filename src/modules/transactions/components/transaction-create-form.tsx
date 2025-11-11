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
import { ArrowRight, BriefcaseBusiness, PlusIcon } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import {
  transactionStatusLabel,
  transactionTypeLabels,
} from '../transactions-constants';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: !!accountId
      ? {
          destinyAccount: {
            value: accountId,
            label: accountId,
          },
        }
      : undefined,
  });

  const selectedType = useWatch({
    control: form.control,
    name: 'type',
  });

  const accountTypeOptions = Object.values(TransactionType).map((type) => ({
    value: type,
    label: transactionTypeLabels[type],
  }));

  const accountStatusOptions = Object.values(TransactionStatus).map(
    (status) => ({
      value: status,
      label: transactionStatusLabel[status],
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
      <DialogContent className="min-w-fit max-w-[90vw] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>Nova movimentação</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar uma nova movimentação.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={schema}
          defaultValues={
            !!accountId
              ? {
                  destinyAccount: {
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
            sourceAccount: {
              options: institutionsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                    <Image
                      src={option.data.institution.logoUrl}
                      alt={option.data.institution.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
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
                    <Image
                      src={option.data.institution.logoUrl}
                      alt={option.data.institution.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
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
            await createTransaction({
              variables: {
                data: {
                  date: data.date,
                  type: data.type.value as TransactionType,
                  ...((data.type.value === TransactionType.Expense ||
                    data.type.value === TransactionType.BetweenAccounts) && {
                    sourceAccount: {
                      connect: {
                        id: data.sourceAccount.value,
                      },
                    },
                  }),
                  ...((data.type.value === TransactionType.Income ||
                    data.type.value === TransactionType.BetweenAccounts) && {
                    destinyAccount: {
                      connect: {
                        id: data.destinyAccount.value,
                      },
                    },
                  }),
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
        >
          {({
            sourceAccount,
            destinyAccount,
            date,
            status,
            amount,
            description,
            type,
          }) => (
            <>
              {type}
              {selectedType?.value === TransactionType.Expense ? (
                sourceAccount
              ) : selectedType?.value === TransactionType.Income ? (
                destinyAccount
              ) : selectedType?.value === TransactionType.BetweenAccounts ? (
                <div className="grid grid-cols-[1fr_20px_1fr] gap-4">
                  {sourceAccount}
                  <ArrowRight className="m-auto h-4 min-w-4 max-w-4" />
                  {destinyAccount}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  Selecione um tipo para selecionar as contas
                </p>
              )}
              <Separator />
              {date}
              {status}
              {amount}
              {description}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
