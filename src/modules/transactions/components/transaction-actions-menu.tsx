import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  TransactionFragmentFragment,
  TransactionStatus,
  CardBillingStatus,
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


interface TransactionActionsMenuProps {
  transaction: TransactionFragmentFragment;
  onEdit: () => void;
}

export function TransactionActionsMenu({
  transaction,
  onEdit,
}: TransactionActionsMenuProps) {

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
  const isBillingPayment = !!transaction.billingPayment;

  // Fatura está fechada (pode ser paga) se status for CLOSED ou OVERDUE
  const billingStatus = transaction.billingPayment?.status;
  const isBillingClosed =
    billingStatus === CardBillingStatus.Closed ||
    billingStatus === CardBillingStatus.Overdue;


  const canCancel =
    (!isImmutable || (transaction.totalInstallments ?? 0) > 0) &&
    !isBillingPayment;
  const canPayBilling = isBillingPayment && isBillingClosed && !isImmutable;

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
          {/* Pagamento de fatura fechada: apenas opção de pagar */}
          {canPayBilling && (
            <DropdownMenuItem onClick={onEdit}>
              <Check className="mr-2 h-4 w-4 text-green-600" />
              Pagar fatura
            </DropdownMenuItem>
          )}



          {/* Cancelar transação (não disponível para pagamento de fatura) */}
          {canCancel && (
            <DropdownMenuItem
              onClick={() => setCancelDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar transação
            </DropdownMenuItem>
          )}

          {/* Editar - apenas para transações não-fatura */}
          {!isBillingPayment && (
            <>
              {canCancel && <DropdownMenuSeparator />}
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                {isCanceled ? 'Editar descrição' : 'Editar detalhes'}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>



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
