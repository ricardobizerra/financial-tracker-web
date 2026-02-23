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
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { investmentRegimeLabel } from '../investment-regime-label';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountCreateForm } from '@/modules/accounts/components/account-create-form';

const schema = z
  .object({
    amount: formFields.currency.describe('Valor // '),
    duration: formFields.number.describe(
      'Duração em dias // Insira aqui a duração em dias',
    ),
    regimeName: formFields.select.describe('Regime // '),
    regimePercentage: formFields.number
      .describe('Percentual do regime // ')
      .min(0, 'Percentual deve ser entre 0 e 100')
      .max(100, 'Percentual deve ser entre 0 e 100'),
    startDate: formFields.date.describe('Data de início // '),
    account: formFields.select.describe('Conta * // Insira a conta'),
  })
  .refine(
    (data) => {
      const regimeName = data.regimeName?.value;
      const accountType = data.account?.data?.type;

      return (
        (regimeName === Regime.Poupanca &&
          accountType === AccountType.Savings) ||
        (regimeName !== Regime.Poupanca &&
          accountType === AccountType.Investment)
      );
    },
    (data) => {
      const regimeName = data.regimeName?.value;
      return {
        message:
          regimeName === Regime.Poupanca
            ? 'Conta de poupança inválida'
            : 'Conta de investimento inválida',
        path: ['account'],
      };
    },
  );

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

  const selectedRegime = useWatch({
    control: form.control,
    name: 'regimeName',
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
      types:
        selectedRegime?.value === Regime.Poupanca
          ? [AccountType.Savings]
          : [AccountType.Investment],
    },
    skip: !open || !selectedRegime,
    notifyOnNetworkStatusChange: true,
  });

  const accountsOptions =
    accountsQueryOptions.data?.accounts.edges?.map((edge) => ({
      value: edge.node.id,
      label: edge.node.name,
      data: {
        ...edge.node,
      },
    })) || [];

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

  useEffect(() => {
    if (selectedRegime?.value === Regime.Poupanca) {
      form.setValue('regimePercentage', 100);
      form.setValue('duration', 31);
    }
  }, [selectedRegime, form]);

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
          form={form}
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
                    <InstitutionLogo
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
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
              networkStatus: accountsQueryOptions.networkStatus,
              hasMore: accountsPageInfo?.hasNextPage,
              description: !selectedRegime?.value
                ? 'Selecione o regime de investimento para visualizar as contas disponíveis'
                : undefined,
              NoResultAction: (
                <AccountCreateForm
                  type={
                    selectedRegime?.value === Regime.Poupanca
                      ? AccountType.Savings
                      : AccountType.Investment
                  }
                />
              ),
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
                  accountId: data.account.value,
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
              {account}
              {amount}
              {selectedRegime?.value !== Regime.Poupanca && duration}
              {selectedRegime?.value !== Regime.Poupanca && regimePercentage}
              {startDate}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
