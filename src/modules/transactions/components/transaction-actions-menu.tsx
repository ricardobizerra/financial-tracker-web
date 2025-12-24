'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  TransactionFragmentFragment,
  TransactionStatus,
} from '@/graphql/graphql';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, Check, X, Pencil } from 'lucide-react';
import { CancelTransactionMutation } from '../graphql/transactions-mutations';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { toast } from 'sonner';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';

interface TransactionActionsMenuProps {
  transaction: TransactionFragmentFragment;
  onEdit: () => void;
}

export function TransactionActionsMenu({
  transaction,
  onEdit,
}: TransactionActionsMenuProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [cancelTransaction, { loading: cancelLoading }] = useMutation(
    CancelTransactionMutation,
    {
      refetchQueries: [TransactionsQuery],
      onCompleted: () => {
        toast.success('Transação cancelada!');
        setCancelDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const isCompleted = transaction.status === TransactionStatus.Completed;
  const isCanceled = transaction.status === TransactionStatus.Canceled;
  const isImmutable = isCompleted || isCanceled;

  const canConfirm = !isImmutable;
  const canCancel = !isImmutable;

  const handleConfirmCancel = () => {
    cancelTransaction({ variables: { id: transaction.id } });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {canConfirm && (
            <DropdownMenuItem onClick={() => setConfirmDialogOpen(true)}>
              <Check className="mr-2 h-4 w-4 text-green-600" />
              Confirmar pagamento
            </DropdownMenuItem>
          )}

          {canCancel && (
            <DropdownMenuItem
              onClick={() => setCancelDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar transação
            </DropdownMenuItem>
          )}

          {(canConfirm || canCancel) && <DropdownMenuSeparator />}

          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            {isImmutable ? 'Editar descrição' : 'Editar detalhes'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionConfirmDialog
        transaction={transaction}
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
      />

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar transação?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta transação? Esta ação não pode
              ser desfeita.
              <div className="mt-3 rounded-lg border bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="font-medium text-foreground">
                  {transaction.description}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={cancelLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelLoading ? 'Cancelando...' : 'Sim, cancelar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

