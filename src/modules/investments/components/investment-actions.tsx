'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { DeleteInvestmentMutation } from '../graphql/investments-mutations';
import { toast } from 'sonner';
import {
  InvestmentsQuery,
  TotalInvestmentsQuery,
} from '../graphql/investments-queries';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Slot } from '@radix-ui/react-slot';

export function InvestmentActions({ id }: { id: string }) {
  const [deleteInvestment, { loading }] = useMutation(DeleteInvestmentMutation);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <AlertDialogTrigger asChild>
            <Slot onSelect={(e) => e.preventDefault()}>
              <DropdownMenuItem className="bg-destructive text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground">
                <Trash2 className="h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </Slot>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir investimento?</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="font-medium">
                  Esta ação não pode ser desfeita.
                </span>{' '}
                Esta ação irá remover permanentemente as informações do
                investimento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={loading}
                onClick={() => {
                  deleteInvestment({
                    variables: {
                      id,
                    },
                    refetchQueries: [InvestmentsQuery, TotalInvestmentsQuery],
                    onCompleted: () => {
                      toast.info('Investimento excluído', {
                        description: 'As informações foram excluidas.',
                      });
                      setOpenAlertDialog(false);
                    },
                    onError: (error) => {
                      toast.error('Erro ao excluir investimento', {
                        description: error.message,
                      });
                    },
                  });
                }}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
