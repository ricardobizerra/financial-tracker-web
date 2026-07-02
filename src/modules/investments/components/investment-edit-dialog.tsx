'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UpdateInvestmentMutation } from '../graphql/investments-mutations';
import { useMutation } from '@apollo/client';
import { Regime, InvestmentType } from '@/graphql/graphql';
import {
  InvestmentRegimesQuery,
  InvestmentsQuery,
} from '../graphql/investments-queries';
import { toast } from 'sonner';
import { InvestmentForm, InvestmentFormData } from './investment-form';
import { investmentRegimeLabel } from '../investment-regime-label';

export function InvestmentEditDialog({
  investment,
  open,
  onOpenChange,
}: {
  investment: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [updateInvestment, { loading }] = useMutation(UpdateInvestmentMutation);

  const defaultValues: Partial<InvestmentFormData> = {
    amount: investment.amount,
    duration: investment.duration ?? undefined,
    regimeName: investment.regimeName
      ? ({
          value: investment.regimeName,
          label: investmentRegimeLabel[investment.regimeName as Regime],
        } as any)
      : undefined,
    regimePercentage: investment.regimePercentage ?? undefined,
    startDate: new Date(investment.startDate),
    institutionLink: investment.institutionLinkId
      ? ({
          value: investment.institutionLinkId,
          label: 'Carregando...',
        } as any)
      : undefined,
    fixedRate: investment.fixedRate ?? undefined,
    maturityDate: investment.maturityDate
      ? new Date(investment.maturityDate)
      : undefined,
    hasBrokerageFee: !!investment.brokerageFee,
    brokerageFee: investment.brokerageFee ?? undefined,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar investimento</DialogTitle>
          <DialogDescription>
            Modifique os campos abaixo para atualizar o investimento.
          </DialogDescription>
        </DialogHeader>

        <InvestmentForm
          isEdit={true}
          defaultValues={defaultValues}
          onSubmit={async (data: InvestmentFormData) => {
            await updateInvestment({
              variables: {
                data: {
                  id: investment.id,
                  amount: data.amount,
                  duration: data.duration,
                  regimeName: data.regimeName?.value as Regime,
                  regimePercentage: data.regimePercentage,
                  startDate: data.startDate,
                  institutionLinkId: data.institutionLink.value,
                  fixedRate: data.fixedRate,
                  brokerageFee: data.hasBrokerageFee ? data.brokerageFee : 0,
                  maturityDate: data.maturityDate,
                  type: [Regime.Ipca, Regime.Prefixed, Regime.Selic].includes(
                    data.regimeName?.value as Regime,
                  )
                    ? InvestmentType.Treasury
                    : InvestmentType.FixedIncome,
                },
              },
              refetchQueries: [InvestmentsQuery, InvestmentRegimesQuery],
              onCompleted: () => {
                toast.success('Investimento atualizado!', {
                  description: 'As informações foram atualizadas com sucesso.',
                });
                onOpenChange(false);
              },
              onError: (error) => {
                toast.error('Erro ao atualizar investimento!', {
                  description: error.message,
                });
              },
            });
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Atualizar
              </Button>
            </DialogFooter>
          )}
        />
      </DialogContent>
    </Dialog>
  );
}
