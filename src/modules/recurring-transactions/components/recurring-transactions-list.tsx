'use client';

import { useQuery, useMutation } from '@apollo/client';
import { RecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import {
  PauseRecurringTransactionMutation,
  ResumeRecurringTransactionMutation,
  DeleteRecurringTransactionMutation,
} from '../graphql/recurring-transactions-mutations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
} from 'lucide-react';
import {
  TransactionType,
  OrderDirection,
  OrdenationRecurringTransactionModel,
} from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import { toast } from 'sonner';
import { monthLabels } from '../recurring-transactions-constants';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { Skeleton } from '@/components/ui/skeleton';
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

export function RecurringTransactionsList() {
  const { data, loading, refetch } = useQuery(RecurringTransactionsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationRecurringTransactionModel.CreatedAt,
      orderDirection: OrderDirection.Desc,
    },
  });

  const [pauseRecurring] = useMutation(PauseRecurringTransactionMutation);
  const [resumeRecurring] = useMutation(ResumeRecurringTransactionMutation);
  const [deleteRecurring] = useMutation(DeleteRecurringTransactionMutation);

  const handlePause = async (id: string) => {
    await pauseRecurring({
      variables: { id },
      onCompleted: () => {
        toast.success('Recorrência pausada');
        refetch();
      },
      onError: (error) => {
        toast.error('Erro ao pausar recorrência', {
          description: error.message,
        });
      },
    });
  };

  const handleResume = async (id: string) => {
    await resumeRecurring({
      variables: { id },
      onCompleted: () => {
        toast.success('Recorrência retomada');
        refetch();
      },
      onError: (error) => {
        toast.error('Erro ao retomar recorrência', {
          description: error.message,
        });
      },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteRecurring({
      variables: { id },
      onCompleted: () => {
        toast.success('Recorrência excluída', {
          description: 'As transações existentes foram mantidas.',
        });
        refetch();
      },
      onError: (error) => {
        toast.error('Erro ao excluir recorrência', {
          description: error.message,
        });
      },
    });
  };

  const formatRecurrenceInfo = (
    frequency: string,
    dayOfMonth: number | null,
    monthOfYear?: number | null,
    dayOfWeek?: number | null,
  ) => {
    const dayOfWeekNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    switch (frequency) {
      case 'WEEKLY':
        return `Semanal (${dayOfWeekNames[dayOfWeek ?? 0]})`;
      case 'BI_WEEKLY':
        return `Quinzenal (${dayOfWeekNames[dayOfWeek ?? 0]})`;
      case 'YEARLY':
        if (monthOfYear && dayOfMonth) {
          return `Anual (dia ${dayOfMonth} de ${monthLabels[monthOfYear]})`;
        }
        return 'Anual';
      case 'MONTHLY':
      default:
        if (dayOfMonth) {
          return `Mensal (dia ${dayOfMonth})`;
        }
        return 'Mensal';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  const recurringTransactions = data?.recurringTransactions.edges || [];

  if (recurringTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">
          Nenhuma transação recorrente cadastrada.
        </p>
        <p className="text-sm text-muted-foreground">
          Crie uma recorrência para automatizar suas transações.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Frequência</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recurringTransactions.map(({ node }) => {
          const account = node.sourceAccount || node.destinyAccount;
          const isIncome = node.type === TransactionType.Income;

          return (
            <TableRow key={node.id}>
              <TableCell className="font-medium">{node.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {isIncome ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {isIncome ? 'Entrada' : 'Despesa'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {account && (
                  <div className="flex items-center gap-2">
                    <InstitutionLogo
                      logoUrl={account.institution?.logoUrl}
                      name={account.institution?.name || account.name}
                      size="sm"
                    />
                    <span className="text-sm">{account.name}</span>
                  </div>
                )}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}
              >
                {formatCurrency(Number(node.estimatedAmount))}
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {formatRecurrenceInfo(
                    node.frequency,
                    node.dayOfMonth,
                    node.monthOfYear,
                    node.dayOfWeek,
                  )}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={node.isActive ? 'default' : 'secondary'}>
                  {node.isActive ? 'Ativa' : 'Pausada'}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {node.isActive ? (
                      <DropdownMenuItem onClick={() => handlePause(node.id)}>
                        <Pause className="mr-2 h-4 w-4" />
                        Pausar
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleResume(node.id)}>
                        <Play className="mr-2 h-4 w-4" />
                        Retomar
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Excluir recorrência?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação irá excluir o template de recorrência. As
                            transações já criadas serão mantidas.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(node.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
