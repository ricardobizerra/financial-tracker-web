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
import { AccountTypeBadge } from '@/modules/accounts/components/account-type-badge';
import { SelectLabel } from '@/components/ui/select';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number.describe(
    'Duração em dias // Insira aqui a duração em dias',
  ),
  regimeName: formFields.select.describe('Regime // '),
  regimePercentage: formFields.number.describe('Percentual do regime // '),
  startDate: formFields.date.describe('Data de início // '),
  account: formFields.select.describe('Conta * // Insira a conta'),
  connectAccount: formFields.select.describe(
    'Conta de conexão * // Insira a conta',
  ),
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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultRegime
      ? {
          regimeName: {
            value: defaultRegime,
            label: investmentRegimeLabel[defaultRegime],
          },
        }
      : undefined,
  });

  const selectedAccount = useWatch({
    control: form.control,
    name: 'account',
  });

  const investmentRegimeOptions = Object.values(Regime).map((regime) => ({
    value: regime,
    label: investmentRegimeLabel[regime],
  }));

  const accountsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const accountsOptions =
    accountsQueryOptions.data?.accounts.edges
      ?.map((edge) => ({
        value: edge.node.id,
        label: edge.node.name,
        data: {
          ...edge.node,
        },
        group: edge.node.type,
      }))
      ?.sort((a, b) => {
        if (a.group === b.group) return 0;
        return a.group === AccountType.Investment ? -1 : 1;
      }) || [];

  const accountsPageInfo = accountsQueryOptions.data?.accounts.pageInfo;

  const paginate = useCallback(() => {
    accountsQueryOptions.fetchMore({
      variables: {
        after: accountsPageInfo?.endCursor,
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
  }, [accountsQueryOptions, accountsPageInfo]);

  const connectAccountsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
      type: AccountType.Investment,
    },
    skip:
      !open ||
      !(
        !!selectedAccount &&
        selectedAccount.data?.type !== AccountType.Investment
      ),
    notifyOnNetworkStatusChange: true,
  });

  const connectAccountsOptions =
    connectAccountsQueryOptions.data?.accounts.edges?.map((edge) => ({
      value: edge.node.id,
      label: edge.node.name,
      data: {
        ...edge.node,
      },
    })) || [];

  const connectAccountsPageInfo =
    connectAccountsQueryOptions.data?.accounts.pageInfo;

  const connectAccountsPaginate = useCallback(() => {
    connectAccountsQueryOptions.fetchMore({
      variables: {
        after: connectAccountsPageInfo?.endCursor,
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
  }, [connectAccountsQueryOptions, connectAccountsPageInfo]);

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
              options: accountsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 px-2 py-1.5">
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
              renderGroup: (groupName) => (
                <SelectLabel className="px-0">
                  <AccountTypeBadge
                    type={groupName as AccountType}
                    className="flex w-full justify-center"
                  />
                </SelectLabel>
              ),
              fetchMore: paginate,
              networkStatus: accountsQueryOptions.networkStatus,
              hasMore: accountsPageInfo?.hasNextPage,
            },
            connectAccount: {
              options: connectAccountsOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 px-2 py-1.5">
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
              fetchMore: connectAccountsPaginate,
              networkStatus: connectAccountsQueryOptions.networkStatus,
              hasMore: connectAccountsPageInfo?.hasNextPage,
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
                  ...(data.account.data?.type !== AccountType.Investment && {
                    sourceAccountId: data.connectAccount.value,
                  }),
                  destinyAccountId: data.account.value,
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
            connectAccount,
          }) => (
            <>
              {account}
              {!!selectedAccount &&
                selectedAccount?.data?.type !== AccountType.Investment &&
                connectAccount}
              {regimeName}
              {amount}
              {duration}
              {regimePercentage}
              {startDate}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
