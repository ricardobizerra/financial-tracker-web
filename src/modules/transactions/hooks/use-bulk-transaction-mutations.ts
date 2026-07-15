import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  BulkUpdateTransactionsMutation,
  BulkCancelTransactionsMutation,
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

  const [bulkCancelTransactions, { loading: isCanceling }] = useMutation(
    BulkCancelTransactionsMutation,
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

  const cancelTransactions = (ids: string[]) => {
    return bulkCancelTransactions({
      variables: {
        data: {
          ids,
        },
      },
    });
  };

  return {
    categorizeTransactions,
    cancelTransactions,
    isUpdating,
    isCanceling,
    isLoading: isUpdating || isCanceling,
  };
}
