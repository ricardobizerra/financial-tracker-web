'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { z } from 'zod';
import { useQuery } from '@apollo/client';
import {
  InstitutionType,
  OrdenationInstitutionLinkModel,
  OrderDirection,
  Regime,
} from '@/graphql/graphql';
import { useCallback, useEffect } from 'react';
import { investmentRegimeLabel } from '../investment-regime-label';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InstitutionLinksQuery } from '@/modules/institution-link/graphql/institution-links-queries';
import { AvailableTreasuryBondsQuery } from '../graphql/investments-queries';

export const InvestmentFormSchema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number
    .describe('Duração em dias // Insira aqui a duração em dias')
    .optional(),
  regimeName: formFields.select.describe('Regime // '),
  regimePercentage: formFields.number
    .describe('Percentual do regime // ')
    .min(0, 'Percentual deve ser entre 0 e 100')
    .max(100, 'Percentual deve ser entre 0 e 100')
    .optional(),
  startDate: formFields.date.describe('Data de início // '),
  institutionLink: formFields.select.describe('Conexão * // Insira a conexão'),

  fixedRate: formFields.number.describe('Taxa Fixa Anual (%) // ').optional(),
  maturityDate: formFields.select
    .describe('Data de Vencimento // Selecione o vencimento')
    .optional(),
  hasBrokerageFee: z
    .boolean()
    .default(false)
    .describe('Cobrança de Taxa da Corretora? // '),
  brokerageFee: formFields.number
    .describe('Taxa da Corretora ao Ano (%) // ')
    .optional(),
});

export type InvestmentFormData = z.infer<typeof InvestmentFormSchema>;

export function InvestmentForm({
  defaultRegime,
  defaultValues,
  onSubmit,
  renderAfter,
  isEdit = false,
}: {
  defaultRegime?: Regime;
  defaultValues?: Partial<InvestmentFormData>;
  onSubmit: (data: InvestmentFormData) => void | Promise<void>;
  renderAfter?: () => React.ReactNode;
  isEdit?: boolean;
}) {
  const form = useForm<InvestmentFormData>({
    resolver: zodResolver(InvestmentFormSchema),
    defaultValues:
      defaultValues ||
      (defaultRegime
        ? {
            regimeName: {
              value: defaultRegime,
              label: investmentRegimeLabel[defaultRegime],
            },
          }
        : undefined),
  });

  const selectedRegime = useWatch({
    control: form.control,
    name: 'regimeName',
  });

  const hasBrokerageFee = useWatch({
    control: form.control,
    name: 'hasBrokerageFee',
  });

  const isTreasury =
    selectedRegime?.value === Regime.Selic ||
    selectedRegime?.value === Regime.Ipca ||
    selectedRegime?.value === Regime.Prefixed;

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
    skip: !selectedRegime,
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

  const { data: treasuryBondsData } = useQuery(AvailableTreasuryBondsQuery, {
    variables: {
      regime: selectedRegime?.value as Regime,
    },
    skip: !isTreasury || !selectedRegime,
  });

  const treasuryBondsOptions =
    treasuryBondsData?.availableTreasuryBonds.map((dateStr) => {
      const year = dateStr.split('/')[2];
      const prefix = selectedRegime?.label || 'Tesouro';
      return {
        value: dateStr,
        label: `${prefix} ${year} (${dateStr})`,
        dateStr,
      };
    }) || [];

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
    if (!isEdit && selectedRegime?.value === Regime.Poupanca) {
      form.setValue('regimePercentage', 100);
      form.setValue('duration', 31);
    }
  }, [selectedRegime, form, isEdit]);

  return (
    <TsForm
      form={form}
      schema={InvestmentFormSchema}
      onSubmit={onSubmit}
      renderAfter={renderAfter}
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
        maturityDate: {
          options: treasuryBondsOptions,
          renderLabel: (option) => {
            const labelMain = option.label.split(' (')[0];
            return (
              <span className="px-2 py-1.5">
                {labelMain}{' '}
                <span className="text-muted-foreground">
                  ({option.dateStr})
                </span>
              </span>
            );
          },
        },
      }}
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
          {!isTreasury &&
            selectedRegime?.value !== Regime.Poupanca &&
            regimePercentage}
          {isTreasury && maturityDate}
          {isTreasury && selectedRegime?.value !== Regime.Selic && fixedRate}
          {isTreasury && hasBrokerageFee}
          {isTreasury && hasBrokerageFee && brokerageFee}
        </>
      )}
    </TsForm>
  );
}
