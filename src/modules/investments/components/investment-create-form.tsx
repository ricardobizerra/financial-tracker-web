import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { z } from 'zod';
import { CreateInvestmentMutation } from '../graphql/investments-mutations';
import { useMutation } from '@apollo/client';
import { Regime } from '@/graphql/graphql';

const schema = z.object({
  amount: formFields.currency.describe('Valor // '),
  duration: formFields.number.describe(
    'Duração em dias // Insira aqui a duração em dias',
  ),
  regimeName: formFields.select.describe('Regime // '),
  // regimePercentage: InputMaybe<Scalars['Float']['input']>;
  // startDate: Scalars['DateTime']['input'];
});

export function InvestmentCreateForm() {
  const [createInvestment, { loading }] = useMutation(CreateInvestmentMutation);

  const investmentRegimeOptions = Object.values(Regime).map((regime) => ({
    value: regime,
    label: regime,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
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
          props={{
            regimeName: {
              options: investmentRegimeOptions,
            },
          }}
          onSubmit={async (data) => {
            await createInvestment({
              variables: {
                data: {
                  amount: data.amount,
                  duration: data.duration,
                  regimeName: data.regimeName?.value as Regime,
                  // regimePercentage: InputMaybe<Scalars['Float']['input']>;
                  // startDate: Scalars['DateTime']['input'];
                },
              },
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
