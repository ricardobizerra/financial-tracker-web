'use client';

import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  UpdateRecurringTransactionFromDateMutation,
  IgnorePossibleRecurrenceMutation,
  DeleteRecurringTransactionMutation,
} from '../graphql/recurring-transactions-mutations';
import {
  RecurringTransactionsQuery,
  PossibleRecurringTransactionsQuery,
} from '../graphql/recurring-transactions-queries';
import { UpdateRecurringTransactionInput } from '@/graphql/graphql';

export function useRecurringTransactionMutations() {
  const [updateMutation, { loading: updateLoading }] = useMutation(
    UpdateRecurringTransactionFromDateMutation,
    {
      refetchQueries: [
        RecurringTransactionsQuery,
        PossibleRecurringTransactionsQuery,
      ],
    },
  );

  const [deleteMutation, { loading: deleteLoading }] = useMutation(
    DeleteRecurringTransactionMutation,
    {
      refetchQueries: [
        RecurringTransactionsQuery,
        PossibleRecurringTransactionsQuery,
      ],
    },
  );

  const [ignoreMutation] = useMutation(IgnorePossibleRecurrenceMutation, {
    refetchQueries: [PossibleRecurringTransactionsQuery],
  });

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

  const ignorePossibleRecurrence = async (description: string) => {
    try {
      await ignoreMutation({
        variables: { description },
      });
      toast.success('Sugestão ignorada');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao ignorar sugestão');
    }
  };

  return {
    updateRecurringTransaction,
    deleteRecurringTransaction,
    ignorePossibleRecurrence,
    updateLoading,
    deleteLoading,
  };
}
