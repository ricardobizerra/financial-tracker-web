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
import { InvestmentForm, InvestmentFormData } from './investment-form';

export function InvestmentCreateForm({
  defaultRegime,
  triggerClassName,
}: {
  defaultRegime?: Regime;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [createInvestment, { loading }] = useMutation(CreateInvestmentMutation);

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

        <InvestmentForm
          defaultRegime={defaultRegime}
          onSubmit={async (data: InvestmentFormData) => {
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
                  maturityDate:
                    data.maturityDate && typeof data.maturityDate === 'object'
                      ? new Date(
                          (data.maturityDate as any).value
                            .split('/')
                            .reverse()
                            .join('-') + 'T12:00:00Z',
                        )
                      : data.maturityDate,
                  type: [Regime.Ipca, Regime.Prefixed, Regime.Selic].includes(
                    data.regimeName?.value as Regime,
                  )
                    ? InvestmentType.Treasury
                    : InvestmentType.FixedIncome,
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
        />
      </DialogContent>
    </Dialog>
  );
}
