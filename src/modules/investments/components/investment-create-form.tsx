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
import { CreateInvestmentMutation } from '../graphql/investments-mutations';
import { useMutation, useQuery } from '@apollo/client';
import {
  InstitutionType,
  OrdenationAccountModel,
  OrdenationInstitutionLinkModel,
  OrderDirection,
  Regime,
  InvestmentType,
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
import { InstitutionLinksQuery } from '@/modules/institution-link/graphql/institution-links-queries';

const schema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number.describe(
    'Duração em dias // Insira aqui a duração em dias',
  ).optional(),
  regimeName: formFields.select.describe('Regime // '),
  regimePercentage: formFields.number
    .describe('Percentual do regime // ')
    .min(0, 'Percentual deve ser entre 0 e 100')
    .max(100, 'Percentual deve ser entre 0 e 100')
    .optional(),
  startDate: formFields.date.describe('Data de início // '),
  institutionLink: formFields.select.describe('Conexão * // Insira a conexão'),
  
  fixedRate: formFields.number.describe('Taxa Fixa Anual (%) // ').optional(),
  maturityDate: formFields.date.describe('Data de Vencimento // ').optional(),
  hasBrokerageFee: z.boolean().default(false).describe('Cobrança de Taxa da Corretora? // '),
  brokerageFee: formFields.number.describe('Taxa da Corretora ao Ano (%) // ').optional(),
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

  const selectedRegime = useWatch({
    control: form.control,
    name: 'regimeName',
  });

  const hasBrokerageFee = useWatch({
    control: form.control,
    name: 'hasBrokerageFee',
  });

  const isTreasury = selectedRegime?.value === Regime.Selic || selectedRegime?.value === Regime.Ipca || selectedRegime?.value === Regime.Prefixed;

  const investmentRegimeOptions = Object.values(Regime).map((regime) => ({
    value: regime,
    label: investmentRegimeLabel[regime],
  }));

  const institutionLinksQueryOptions = useQuery(InstitutionLinksQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationInstitutionLinkModel.InstitutionId,
      orderDirection: OrderDirection.Asc,
      institutionTypes: [InstitutionType.Investment],
    },
    skip: !open || !selectedRegime,
    notifyOnNetworkStatusChange: true,
  });

  const institutionLinksOptions =
    institutionLinksQueryOptions.data?.institutionLinks.edges?.map((edge) => ({
      value: edge.node.id,
      label: edge.node.institution.name,
      data: {
        ...edge.node,
      },
    })) || [];

  const institutionLinksPageInfo =
    institutionLinksQueryOptions.data?.institutionLinks.pageInfo;

  const paginate = useCallback(() => {
    institutionLinksQueryOptions.fetchMore({
      variables: {
        after: institutionLinksPageInfo?.endCursor,
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
  }, [institutionLinksQueryOptions, institutionLinksPageInfo]);

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
            institutionLink: {
              options: institutionLinksOptions,
              renderLabel: (option) => (
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                    <InstitutionLogo
                      logoUrl={option.data.institution.logoUrl}
                      name={option.data.institution.name}
                      size="sm"
                    />
                  </div>
                  <p className="truncate text-sm font-medium">
                    {option.data.institution.name}
                  </p>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionLinksQueryOptions.networkStatus,
              hasMore: institutionLinksPageInfo?.hasNextPage,
              description: !selectedRegime?.value
                ? 'Selecione o regime de investimento para visualizar as contas disponíveis'
                : undefined,
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
                  institutionLinkId: data.institutionLink.value,
                  fixedRate: data.fixedRate,
                  brokerageFee: data.hasBrokerageFee ? data.brokerageFee : 0,
                  maturityDate: data.maturityDate,
                  type: [Regime.Ipca, Regime.Prefixed, Regime.Selic].includes(data.regimeName?.value as Regime) 
                    ? InvestmentType.Treasury 
                    : InvestmentType.FixedIncome
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
            institutionLink,
            fixedRate,
            maturityDate,
            hasBrokerageFee,
            brokerageFee,
          }) => (
            <>
              {regimeName}
              {institutionLink}
              {amount}
              {startDate}
              {!isTreasury && selectedRegime?.value !== Regime.Poupanca && duration}
              {!isTreasury && selectedRegime?.value !== Regime.Poupanca && regimePercentage}
              {isTreasury && maturityDate}
              {isTreasury && selectedRegime?.value !== Regime.Selic && fixedRate}
              {isTreasury && hasBrokerageFee}
              {isTreasury && hasBrokerageFee && brokerageFee}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
