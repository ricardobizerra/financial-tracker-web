'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { OrdenationAccountModel, OrderDirection } from '@/graphql/graphql';
import { SimulatedInvestmentItem } from '../hooks/use-simulation-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ─── Schema ──────────────────────────────────────────────────────────────────

const investmentSchema = z.object({
  description: formFields.text.describe(
    'Nome do investimento * // Ex: CDB Banco XYZ',
  ),
  initialAmount: formFields.currency.describe('Valor do aporte * // '),
  regime: formFields.select.describe('Regime * // '),
  annualRate: formFields.number
    .min(0, 'Taxa deve ser ≥ 0')
    .max(100, 'Taxa deve ser ≤ 100')
    .describe('Taxa anual estimada (%) * // Ex: 12,5'),
  accountId: formFields.select.describe(
    'Conta de origem * // Selecione a conta',
  ),
  startDate: formFields.date.describe('Data do aporte * // '),
});

type FormData = z.infer<typeof investmentSchema>;

const REGIME_OPTIONS = [
  { value: 'CDI', label: 'CDI / Pós-fixado' },
  { value: 'POUPANCA', label: 'Poupança' },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SimulationInvestmentFormProps {
  defaultValues?: Partial<SimulatedInvestmentItem>;
  onSubmit: (data: Omit<SimulatedInvestmentItem, 'id'>) => void;
  onCancel: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SimulationInvestmentForm({
  defaultValues,
  onSubmit,
  onCancel,
}: SimulationInvestmentFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      description: defaultValues?.description ?? '',
      // CurrencyField stores cents; multiply stored decimal by 100
      initialAmount:
        defaultValues?.initialAmount != null
          ? defaultValues.initialAmount
          : undefined,
      regime: defaultValues?.regime
        ? {
            value: defaultValues.regime,
            label:
              REGIME_OPTIONS.find((o) => o.value === defaultValues.regime)
                ?.label ?? defaultValues.regime,
          }
        : undefined,
      annualRate: defaultValues?.annualRate ?? undefined,
      accountId: defaultValues?.accountId
        ? { value: defaultValues.accountId, label: '' }
        : undefined,
      startDate: defaultValues?.startDate
        ? new Date(defaultValues.startDate + 'T00:00:00')
        : new Date(),
    },
  });

  const { data: accountsData } = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
  });

  const accountOptions =
    accountsData?.accounts.edges?.map((e) => ({
      value: e.node.id,
      label: e.node.name,
    })) ?? [];

  const handleSubmit = (data: FormData) => {
    onSubmit({
      kind: 'investment',
      description: data.description,
      initialAmount: data.initialAmount ?? 0,
      annualRate: data.annualRate,
      regime: data.regime.value as SimulatedInvestmentItem['regime'],
      startDate: data.startDate.toISOString().split('T')[0],
      accountId: data.accountId.value,
    });
  };

  return (
    <TsForm
      form={form}
      schema={investmentSchema}
      props={{
        regime: { options: REGIME_OPTIONS },
        accountId: { options: accountOptions },
      }}
      onSubmit={handleSubmit}
      renderAfter={() => (
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Salvar
          </Button>
        </div>
      )}
    >
      {({
        description,
        initialAmount,
        regime,
        annualRate,
        accountId,
        startDate,
      }) => (
        <>
          {description}
          {initialAmount}
          {regime}
          {annualRate}
          {accountId}
          {startDate}
        </>
      )}
    </TsForm>
  );
}
