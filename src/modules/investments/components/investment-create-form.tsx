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
import { useMutation } from '@apollo/client';
import { Regime } from '@/graphql/graphql';
import {
  InvestmentRegimesQuery,
  InvestmentsQuery,
} from '../graphql/investments-queries';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const schema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number.describe(
    'Duração em dias // Insira aqui a duração em dias',
  ),
  regimeName: formFields.select.describe('Regime // '),
  regimePercentage: formFields.number.describe('Percentual do regime // '),
  startDate: formFields.date.describe('Data de início // '),
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
    label: regime,
  }));

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
          defaultValues={{
            regimeName: {
              value: defaultRegime,
            },
          }}
          props={{
            regimeName: {
              options: investmentRegimeOptions,
              disabled: !!defaultRegime,
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
          {({ regimeName, amount, duration, regimePercentage, startDate }) => (
            <>
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
