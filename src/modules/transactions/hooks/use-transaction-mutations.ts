import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  TransactionFragmentFragment,
  UpdateRecurringScope,
  PaymentMethod,
  TransactionCategory,
  TransactionStatus,
} from '@/graphql/graphql';
import {
  UpdateRecurringTransactionsMutation,
  CancelTransactionMutation,
  UpdateTransactionMutation,
  CancelRecurringTransactionsMutation,
} from '../graphql/transactions-mutations';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';
import { BillingQuery } from '@/modules/accounts/graphql/accounts-queries';

interface UseTransactionMutationsProps {
  transaction: TransactionFragmentFragment;
  refetchVariables?: any;
}

export function useTransactionMutations({
  transaction,
  refetchVariables,
}: UseTransactionMutationsProps) {
  const [scopeDialogOpen, setScopeDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [pendingData, setPendingData] = useState<any | null>(null);
  const [pendingAction, setPendingAction] = useState<
    'UPDATE' | 'CANCEL' | null
  >(null);

  const scopeResolverRef = useRef<((shouldContinue: boolean) => void) | null>(
    null,
  );

  const [updateRecurringTransactions] = useMutation(
    UpdateRecurringTransactionsMutation,
    {
      refetchQueries: [
        refetchVariables
          ? { query: TransactionsQuery, variables: refetchVariables }
          : TransactionsQuery,
        TransactionsSummaryQuery,
        TransactionsGroupedByPeriodQuery,
      ],
      onCompleted: () => {
        toast.success('Transações atualizadas!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UpdateTransactionMutation,
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
        toast.success('Transação atualizada!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const [cancelTransaction, { loading: cancelLoading }] = useMutation(
    CancelTransactionMutation,
    {
      refetchQueries: [
        TransactionsQuery,
        TransactionsGroupedByPeriodQuery,
        TransactionsSummaryQuery,
        BillingQuery,
      ],
      onCompleted: () => {
        toast.success('Transação cancelada!');
        setCancelDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const [cancelRecurringTransactions] = useMutation(
    CancelRecurringTransactionsMutation,
    {
      refetchQueries: [
        TransactionsQuery,
        TransactionsGroupedByPeriodQuery,
        TransactionsSummaryQuery,
        BillingQuery,
      ],
      onCompleted: () => {
        toast.success('Transações canceladas!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const handleBeforeSubmit = async (data: any): Promise<boolean> => {
    const isRecurring = !!transaction.recurringTransactionId;
    if (!isRecurring) {
      return true;
    }

    setPendingData(data);
    setPendingAction('UPDATE');
    setScopeDialogOpen(true);

    return new Promise((resolve) => {
      scopeResolverRef.current = resolve;
    });
  };

  const handleScopeSelected = async (scope: UpdateRecurringScope) => {
    setScopeDialogOpen(false);

    if (scope === UpdateRecurringScope.ThisOnly) {
      scopeResolverRef.current?.(true);
      // For fast updates that already have pendingData, we need to trigger the updateTransaction mutation
      if (
        pendingAction === 'UPDATE' &&
        pendingData &&
        !scopeResolverRef.current
      ) {
        await updateTransaction({
          variables: {
            data: {
              ...pendingData,
              id: transaction.id,
            },
          },
        });
      } else if (pendingAction === 'CANCEL' && !scopeResolverRef.current) {
        await cancelTransaction({ variables: { id: transaction.id } });
      }
    } else {
      scopeResolverRef.current?.(false);

      if (pendingAction === 'UPDATE' && pendingData) {
        // Recurring update only supports a subset of fields
        const recurringData: any = {
          transactionId: transaction.id,
          scope,
        };

        if (pendingData.description !== undefined)
          recurringData.description = pendingData.description;
        if (pendingData.amount !== undefined)
          recurringData.amount = Number(pendingData.amount);
        if (pendingData.paymentMethod !== undefined)
          recurringData.paymentMethod = pendingData.paymentMethod;

        await updateRecurringTransactions({
          variables: {
            data: recurringData,
          },
        });
      } else if (pendingAction === 'CANCEL') {
        await cancelRecurringTransactions({
          variables: {
            transactionId: transaction.id,
            scope,
          },
        });
      }
    }

    scopeResolverRef.current = null;
    setPendingData(null);
    setPendingAction(null);
  };

  const handleScopeDialogClose = (open: boolean) => {
    if (!open && scopeResolverRef.current) {
      scopeResolverRef.current(false);
      scopeResolverRef.current = null;
      setPendingData(null);
      setPendingAction(null);
    }
    setScopeDialogOpen(open);
  };

  const handleCancel = () => {
    // Se for recorrente, abre o dialog de escopo, senão usa a mutation original.
    // Usado pela lista de transações (fast-cancel)
    const isRecurring = !!transaction.recurringTransactionId;
    if (isRecurring) {
      setPendingAction('CANCEL');
      setScopeDialogOpen(true);
    } else {
      cancelTransaction({ variables: { id: transaction.id } });
    }
  };

  const handleFastUpdate = async (update: any) => {
    const isRecurring = !!transaction.recurringTransactionId;

    // Only paymentMethod, amount, and description are currently supported by the recurring update API
    const canRecur =
      update.paymentMethod !== undefined ||
      update.amount !== undefined ||
      update.description !== undefined;

    if (isRecurring && canRecur) {
      setPendingData(update);
      setPendingAction('UPDATE');
      setScopeDialogOpen(true);
    } else {
      await updateTransaction({
        variables: {
          data: {
            ...update,
            id: transaction.id,
          },
        },
      });
    }
  };

  return {
    cancelLoading,
    updateLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    scopeDialogOpen,
    handleScopeDialogClose,
    handleScopeSelected,
    handleBeforeSubmit,
    handleCancel,
    handleFastUpdate,
    pendingAction,
  };
}
