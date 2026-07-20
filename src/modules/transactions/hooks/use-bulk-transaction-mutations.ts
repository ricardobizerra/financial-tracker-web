import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  BulkUpdateTransactionsMutation,
  BulkDeleteTransactionsMutation,
} from '../graphql/transactions-mutations';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';
import { BillingQuery } from '@/modules/accounts/graphql/accounts-queries';
import { TransactionCategory } from '@/graphql/graphql';

interface UseBulkTransactionMutationsProps {
  refetchVariables?: any;
  onCompleted?: () => void;
}

export function useBulkTransactionMutations({
  refetchVariables,
  onCompleted,
}: UseBulkTransactionMutationsProps = {}) {
  const [bulkUpdateTransactions, { loading: isUpdating }] = useMutation(
    BulkUpdateTransactionsMutation,
    {
      refetchQueries: [
        refetchVariables
          ? { query: TransactionsQuery, variables: refetchVariables }
          : TransactionsQuery,
        TransactionsSummaryQuery,
        TransactionsGroupedByPeriodQuery,
        BillingQuery,
      ],
      onCompleted: () => {
        toast.success('Transações atualizadas com sucesso!');
        onCompleted?.();
      },
      onError: (error) => {
        toast.error(`Erro ao atualizar transações: ${error.message}`);
      },
    },
  );

  const [bulkDeleteTransactions, { loading: isDeleting }] = useMutation(
    BulkDeleteTransactionsMutation,
    {
      refetchQueries: [
        refetchVariables
          ? { query: TransactionsQuery, variables: refetchVariables }
          : TransactionsQuery,
        TransactionsSummaryQuery,
        TransactionsGroupedByPeriodQuery,
        BillingQuery,
      ],
      onCompleted: () => {
        toast.success('Transações excluídas com sucesso!');
        onCompleted?.();
      },
      onError: (error) => {
        toast.error(`Erro ao excluir transações: ${error.message}`);
      },
    },
  );

  const categorizeTransactions = (
    ids: string[],
    category: TransactionCategory,
  ) => {
    return bulkUpdateTransactions({
      variables: {
        data: {
          ids,
          category,
        },
      },
    });
  };

  const updateBulkFields = (
    ids: string[],
    fields: Omit<import('@/graphql/graphql').BulkUpdateTransactionsInput, 'ids'>
  ) => {
    return bulkUpdateTransactions({
      variables: {
        data: {
          ids,
          ...fields,
        },
      },
    });
  };

  const deleteTransactions = (ids: string[]) => {
    return bulkDeleteTransactions({
      variables: {
        data: {
          ids,
        },
      },
    });
  };

  return {
    categorizeTransactions,
    updateBulkFields,
    deleteTransactions,
    isUpdating,
    isDeleting,
    isLoading: isUpdating || isDeleting,
  };
}
