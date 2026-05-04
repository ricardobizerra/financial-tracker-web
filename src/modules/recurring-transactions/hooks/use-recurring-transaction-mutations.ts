'use client';

import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  UpdateRecurringTransactionFromDateMutation,
  DeleteRecurringTransactionMutation,
} from '../graphql/recurring-transactions-mutations';
import { RecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import { UpdateRecurringTransactionInput } from '@/graphql/graphql';

export function useRecurringTransactionMutations() {
  const [updateMutation, { loading: updateLoading }] = useMutation(
    UpdateRecurringTransactionFromDateMutation,
    {
      refetchQueries: [RecurringTransactionsQuery],
    },
  );

  const [deleteMutation, { loading: deleteLoading }] = useMutation(
    DeleteRecurringTransactionMutation,
    {
      refetchQueries: [RecurringTransactionsQuery],
    },
  );

  const updateRecurringTransaction = async (
    id: string,
    data: UpdateRecurringTransactionInput,
    fromDate: Date = new Date(),
  ) => {
    try {
      await updateMutation({
        variables: {
          id,
          fromDate,
          data,
        },
      });
      toast.success('Recorrência atualizada com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar recorrência');
    }
  };

  const deleteRecurringTransaction = async (
    id: string,
    deleteAllTransactions = false,
  ) => {
    try {
      await deleteMutation({
        variables: { id, deleteAllTransactions },
      });
      toast.success('Recorrência removida com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover recorrência');
    }
  };

  return {
    updateRecurringTransaction,
    deleteRecurringTransaction,
    updateLoading,
    deleteLoading,
  };
}
