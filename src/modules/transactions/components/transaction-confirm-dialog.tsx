'use client';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ConfirmTransactionMutation } from '../graphql/transactions-mutations';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { formatCurrency } from '@/lib/formatters/currency';
import { TsForm, formFields } from '@/components/ts-form';

const confirmSchema = z.object({
  amount: formFields.currency.describe(
    'Valor do pagamento * // Insira o valor do pagamento',
  ),
  date: formFields.date.describe(
    'Data do pagamento * // Insira a data do pagamento',
  ),
});

interface TransactionConfirmDialogProps {
  transaction: TransactionFragmentFragment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionConfirmDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionConfirmDialogProps) {
  const [confirmTransaction, { loading }] = useMutation(
    ConfirmTransactionMutation,
    {
      refetchQueries: [TransactionsQuery],
      onCompleted: () => {
        toast.success('Pagamento confirmado!');
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const form = useForm<z.infer<typeof confirmSchema>>({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      amount: Number(transaction.amount ?? 0),
      date: new Date(transaction.date),
    },
  });

  const watchedAmount = form.watch('amount');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Confirmar Pagamento</DialogTitle>
          <DialogDescription>
            Confirme o valor e data do pagamento da transação.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">Descrição</p>
          <p className="font-medium">{transaction.description}</p>
        </div>

        <TsForm
          form={form}
          schema={confirmSchema}
          onSubmit={async (data) => {
            await confirmTransaction({
              variables: {
                data: {
                  id: transaction.id,
                  amount: data.amount,
                  date: data.date.toISOString(),
                },
              },
            });
          }}
          renderAfter={() => (
            <>
              {Number(transaction.amount) !== watchedAmount && (
                <p className="text-xs text-muted-foreground">
                  Valor previsto: {formatCurrency(Number(transaction.amount))}
                </p>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} loading={loading}>
                  Confirmar
                </Button>
              </DialogFooter>
            </>
          )}
        >
          {({ amount, date }) => (
            <>
              {amount}
              {date}
            </>
          )}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}

