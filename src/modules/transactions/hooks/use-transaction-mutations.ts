import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import {
  TransactionFragmentFragment,
  UpdateRecurringScope,
  PaymentMethod,
} from '@/graphql/graphql';
import {
  UpdateRecurringTransactionsMutation,
  CancelTransactionMutation,
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
  const [pendingData, setPendingData] = useState<{
    description: string;
    amount: number;
    paymentMethod?: string;
  } | null>(null);

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

  const handleBeforeSubmit = async (data: {
    description: string;
    amount: number;
    paymentMethod?: string;
  }): Promise<boolean> => {
    const isRecurring = !!transaction.recurringTransactionId;
    if (!isRecurring) {
      return true;
    }

    setPendingData(data);
    setScopeDialogOpen(true);

    return new Promise((resolve) => {
      scopeResolverRef.current = resolve;
    });
  };

  const handleScopeSelected = async (scope: UpdateRecurringScope) => {
    setScopeDialogOpen(false);

    if (scope === UpdateRecurringScope.ThisOnly) {
      scopeResolverRef.current?.(true);
    } else {
      scopeResolverRef.current?.(false);

      if (pendingData) {
        await updateRecurringTransactions({
          variables: {
            data: {
              transactionId: transaction.id,
              scope,
              description: pendingData.description,
              amount: pendingData.amount,
              paymentMethod: pendingData.paymentMethod as PaymentMethod,
            },
          },
        });
      }
    }

    scopeResolverRef.current = null;
    setPendingData(null);
  };

  const handleScopeDialogClose = (open: boolean) => {
    if (!open && scopeResolverRef.current) {
      scopeResolverRef.current(false);
      scopeResolverRef.current = null;
      setPendingData(null);
    }
    setScopeDialogOpen(open);
  };

  const handleCancel = () => {
    cancelTransaction({ variables: { id: transaction.id } });
  };

  return {
    cancelLoading,
    cancelDialogOpen,
    setCancelDialogOpen,
    scopeDialogOpen,
    handleScopeDialogClose,
    handleScopeSelected,
    handleBeforeSubmit,
    handleCancel,
  };
}
