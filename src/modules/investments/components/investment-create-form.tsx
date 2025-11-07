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
import { CreateInvestmentMutation } from '../graphql/investments-mutations';
import { useMutation, useQuery } from '@apollo/client';
import {
  AccountType,
  OrdenationAccountModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import {
  InvestmentRegimesQuery,
  InvestmentsQuery,
} from '../graphql/investments-queries';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { investmentRegimeLabel } from '../investment-regime-label';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import Image from 'next/image';

const schema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number.describe(
    'Duração em dias // Insira aqui a duração em dias',
  ),
  regimeName: formFields.select.describe('Regime // '),
  regimePercentage: formFields.number.describe('Percentual do regime // '),
  startDate: formFields.date.describe('Data de início // '),
  account: formFields.select.describe('Conta * // Insira a conta'),
});

export function InvestmentCreateForm({
  defaultRegime,
  triggerClassName,
}: {
  defaultRegime?: Regime;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [createInvestment, { loading }] = useMutation(CreateInvestmentMutation);

  const investmentRegimeOptions = Object.values(Regime).map((regime) => ({
    value: regime,
    label: investmentRegimeLabel[regime],
  }));

  const institutionsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
      type: AccountType.Investment,
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
          Novo investimento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo investimento</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar um novo investimento.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          schema={schema}
          defaultValues={
            defaultRegime
              ? {
                  regimeName: {
                    value: defaultRegime,
                    label: investmentRegimeLabel[defaultRegime],
                  },
                }
              : undefined
          }
          props={{
            regimeName: {
              options: investmentRegimeOptions,
              disabled: !!defaultRegime,
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
            await createInvestment({
              variables: {
                data: {
                  amount: data.amount,
                  duration: data.duration,
                  regimeName: data.regimeName?.value as Regime,
                  regimePercentage: data.regimePercentage,
                  startDate: data.startDate,
                  account: {
                    connect: {
                      id: data.account.value,
                    },
                  },
                },
              },
              refetchQueries: [InvestmentsQuery, InvestmentRegimesQuery],
              onCompleted: () => {
                toast.success('Investimento criado!', {
                  description: 'As informações foram salvas com sucesso.',
                });
                setOpen(false);
              },
              onError: (error) => {
                toast.error('Erro ao criar investimento!', {
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
            regimeName,
            amount,
            duration,
            regimePercentage,
            startDate,
            account,
          }) => (
            <>
              {regimeName}
              {amount}
              {duration}
              {regimePercentage}
              {startDate}
              {account}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
