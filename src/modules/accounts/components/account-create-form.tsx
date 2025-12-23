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
  CardType,
  CreateAccountInput,
  OrdenationInstitutionModel,
  OrderDirection,
} from '@/graphql/graphql';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateAccountMutation } from '../graphql/accounts-mutations';
import { AccountsQuery, InstitutionsQuery } from '../graphql/accounts-queries';
import { accountTypeLabels, cardTypeLabels } from '../accounts-constants';
import { AccountTypeBadge } from './account-type-badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';

const schema = z
  .object({
    name: formFields.text.describe('Nome * // Insira o nome da conta'),
    description: formFields.text
      .describe('Descrição // Insira a descrição da conta')
      .optional(),
    type: formFields.select.describe('Tipo * // Insira o tipo da conta'),
    institution: formFields.select.describe(
      'Instituição * // Insira a instituição',
    ),
    initialBalance: formFields.currency.describe(
      'Saldo inicial * // Insira o saldo inicial da conta',
    ),
    isActive: formFields.switch.describe(
      'Conta ativa? // Indica se a conta está ativa e visível no sistema',
    ),
    cardType: formFields.select
      .describe('Tipo de cartão * // Insira o tipo de cartão')
      .optional(),
    billingCycleDay: formFields.number
      .describe(
        'Dia do ciclo de faturamento * // Insira o dia do ciclo de faturamento',
      )
      .min(1)
      .max(31)
      .optional(),
    billingPaymentDay: formFields.number
      .describe('Dia do pagamento * // Insira o dia do pagamento')
      .min(1)
      .max(31)
      .optional(),
    defaultLimit: formFields.currency
      .describe('Limite do cartão * // Insira o limite do cartão')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type.value === AccountType.CreditCard) {
      if (data.cardType?.value === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cardType'],
          message: 'Tipo de cartão é obrigatório',
        });
      }

      if (data.billingCycleDay === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['billingCycleDay'],
          message: 'Dia do ciclo de faturamento é obrigatório',
        });
      }

      if (data.billingPaymentDay === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['billingPaymentDay'],
          message: 'Dia do pagamento é obrigatório',
        });
      }

      if (data.defaultLimit === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['defaultLimit'],
          message: 'Limite do cartão é obrigatório',
        });
      }

      if (data.defaultLimit && data.defaultLimit === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['defaultLimit'],
          message: 'Limite do cartão não pode ser zero',
        });
      }
    }
  });

export function AccountCreateForm({
  type,
  triggerClassName,
}: {
  type?: AccountType;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [createAccount, { loading }] = useMutation(CreateAccountMutation);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: !!type
        ? {
            value: type,
            label: accountTypeLabels[type],
          }
        : undefined,
      isActive: true,
      initialBalance: 0,
      defaultLimit: 10000,
    },
  });

  const selectedType = useWatch({
    control: form.control,
    name: 'type',
  });

  const accountTypeOptions = Object.values(AccountType).map((type) => ({
    value: type,
    label: accountTypeLabels[type],
  }));

  const institutionsQueryOptions = useQuery(InstitutionsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationInstitutionModel.Name,
      orderDirection: OrderDirection.Asc,
      types: !!selectedType ? [selectedType?.value as AccountType] : undefined,
    },
    skip: !open || !selectedType,
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

  const cardTypeOptions = Object.values(CardType).map((type) => ({
    value: type,
    label: cardTypeLabels[type],
  }));

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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova conta</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar uma nova conta.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={schema}
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
                  <InstitutionLogo
                    logoUrl={option.data.logoUrl}
                    name={option.data.name}
                    color={option.data.color}
                    size="sm"
                  />
                  <div
                    className="h-5 w-1 rounded"
                    style={{ backgroundColor: option.data.color }}
                  ></div>
                  <p>{option.label}</p>
                </div>
              ),
              fetchMore: paginate,
              networkStatus: institutionsQueryOptions.networkStatus,
              hasMore: institutionsPageInfo?.hasNextPage,
              ...(!selectedType?.value && {
                disabled: true,
                description:
                  'Selecione um tipo de conta para selecionar a instituição',
              }),
            },
            cardType: {
              options: cardTypeOptions,
            } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          }}
          onSubmit={async (data) => {
            await createAccount({
              variables: {
                data: {
                  name: data.name,
                  type: data.type.value as AccountType,
                  institutionId: data.institution.value,
                  isActive: data.isActive,
                  description: data.description,
                  initialBalance: data.initialBalance,
                  ...(data.type.value === AccountType.CreditCard && {
                    cardInfos: {
                      type: data.cardType?.value as CardType,
                      billingCycleDay: data.billingCycleDay,
                      billingPaymentDay: data.billingPaymentDay,
                      defaultLimit: data.defaultLimit,
                    } as CreateAccountInput['cardInfos'],
                  }),
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
        >
          {({
            type,
            institution,
            name,
            description,
            initialBalance,
            isActive,
            cardType,
            billingCycleDay,
            billingPaymentDay,
            defaultLimit,
          }) => (
            <>
              {type}
              {institution}
              <Separator />
              {name}
              {description}
              {selectedType?.value !== AccountType.CreditCard && initialBalance}
              {isActive}
              {selectedType?.value === AccountType.CreditCard && (
                <>
                  <Separator />
                  <p className="font-semibold">Informações do cartão</p>
                  {cardType}
                  {billingCycleDay}
                  {billingPaymentDay}
                  {defaultLimit}
                </>
              )}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
