'use client';

import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TransactionFragmentFragment,
  TransactionType,
} from '@/graphql/graphql';
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
import { TransactionsQuery, TransactionsGroupedByPeriodQuery } from '../graphql/transactions-queries';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { TsForm, formFields } from '@/components/ts-form';
import { TransactionStatusBadge } from './transaction-status-badge';
import { paymentMethodLabel } from '../transactions-constants';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { ArrowRight } from 'lucide-react';

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

function AccountDisplay({
  account,
}: {
  account?: {
    name: string;
    institution: { name: string; logoUrl: string | null };
  } | null;
}) {
  if (!account) return null;

  return (
    <div className="flex items-center gap-2">
      <InstitutionLogo
        logoUrl={account.institution.logoUrl}
        name={account.institution.name}
        size="sm"
      />
      <span className="text-sm font-medium">{account.name}</span>
    </div>
  );
}

export function TransactionConfirmDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionConfirmDialogProps) {
  const [confirmTransaction, { loading }] = useMutation(
    ConfirmTransactionMutation,
    {
      refetchQueries: [TransactionsQuery, TransactionsGroupedByPeriodQuery],
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

  const renderAccountInfo = () => {
    if (transaction.type === TransactionType.BetweenAccounts) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Conta</span>
          <div className="flex items-center gap-2">
            <AccountDisplay account={transaction.sourceAccount} />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <AccountDisplay account={transaction.destinyAccount} />
          </div>
        </div>
      );
    }

    if (transaction.type === TransactionType.Income) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Creditada em</span>
          <AccountDisplay account={transaction.destinyAccount} />
        </div>
      );
    }

    if (transaction.type === TransactionType.Expense) {
      return (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Debitada de</span>
          <AccountDisplay account={transaction.sourceAccount} />
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Confirmar Pagamento</DialogTitle>
          <DialogDescription>
            Confirme o valor e data do pagamento da transação.
          </DialogDescription>
        </DialogHeader>

        {/* Informações da transação (somente leitura) */}
        <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <TransactionStatusBadge status={transaction.status} />
          </div>
          {renderAccountInfo()}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Descrição</span>
            <span className="text-sm font-medium">
              {transaction.description || 'Sem descrição'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Data prevista</span>
            <span className="text-sm font-medium">
              {formatDate(transaction.date)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Valor previsto</span>
            <span className="text-sm font-medium">
              {formatCurrency(Number(transaction.amount))}
            </span>
          </div>
          {transaction.paymentMethod && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Método de pagamento
              </span>
              <span className="text-sm font-medium">
                {paymentMethodLabel[transaction.paymentMethod]}
              </span>
            </div>
          )}
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
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  O valor foi alterado de{' '}
                  {formatCurrency(Number(transaction.amount))} para{' '}
                  {formatCurrency(watchedAmount)}
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
