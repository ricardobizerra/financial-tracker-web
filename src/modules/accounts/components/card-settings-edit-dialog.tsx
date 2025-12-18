'use client';

import { useMutation } from '@apollo/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { formFields, TsForm } from '@/components/ts-form';
import { UpdateAccountCardMutation } from '../graphql/accounts-mutations';
import { BillingQuery } from '../graphql/accounts-queries';

const cardSettingsSchema = z.object({
  billingCycleDay: formFields.number
    .describe('Dia de fechamento * // Dia do mês em que a fatura fecha')
    .min(1)
    .max(31),
  billingPaymentDay: formFields.number
    .describe('Dia de vencimento * // Dia do mês para pagamento')
    .min(1)
    .max(31),
  defaultLimit: formFields.currency.describe(
    'Limite do cartão * // Limite total do cartão',
  ),
});

interface CardSettingsEditDialogProps {
  cardId: string;
  accountId: string;
  currentSettings: {
    billingCycleDay: number;
    billingPaymentDay: number;
    defaultLimit: number;
  };
}

export function CardSettingsEditDialog({
  cardId,
  accountId,
  currentSettings,
}: CardSettingsEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateAccountCard, { loading }] = useMutation(
    UpdateAccountCardMutation,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          aria-label="Configurações do cartão"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span className="truncate">Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurações do Cartão</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <TsForm
            schema={cardSettingsSchema}
            onSubmit={async (data) => {
              await updateAccountCard({
                variables: {
                  cardId,
                  billingCycleDay: data.billingCycleDay,
                  billingPaymentDay: data.billingPaymentDay,
                  defaultLimit: data.defaultLimit,
                },
                refetchQueries: [
                  {
                    query: BillingQuery,
                    variables: { accountId },
                  },
                ],
                onCompleted: () => {
                  toast.success('Sucesso', {
                    description: 'Configurações do cartão atualizadas',
                  });
                  setOpen(false);
                },
                onError: (error) => {
                  toast.error('Erro', {
                    description: error.message,
                  });
                },
              });
            }}
            defaultValues={{
              billingCycleDay: currentSettings.billingCycleDay,
              billingPaymentDay: currentSettings.billingPaymentDay,
              defaultLimit: currentSettings.defaultLimit,
            }}
            renderAfter={() => (
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={loading}
                loading={loading}
              >
                Salvar
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
