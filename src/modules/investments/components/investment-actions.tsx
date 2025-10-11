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

export function InvestmentActions({ id }: { id: string }) {
  const [deleteInvestment] = useMutation(DeleteInvestmentMutation);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          className="bg-destructive text-destructive-foreground focus:bg-destructive/75 focus:text-destructive-foreground"
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
              },
              onError: (error) => {
                toast.error('Erro ao excluir investimento', {
                  description: error.message,
                });
              },
            });
          }}
        >
          <Trash2 className="h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
