'use client';

import { useQuery } from '@apollo/client';
import { RecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import {
  OrdenationRecurringTransactionModel,
  OrderDirection,
} from '@/graphql/graphql';
import { History } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { RecurringTransactionListItem } from './recurring-transaction-list-item';

export function RecurringTransactionsList() {
  const { data, loading, refetch } = useQuery(RecurringTransactionsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationRecurringTransactionModel.CreatedAt,
      orderDirection: OrderDirection.Desc,
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  const recurringTransactions = data?.recurringTransactions.edges || [];

  if (recurringTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900">
          <History className="h-10 w-10 text-zinc-300" />
        </div>
        <h3 className="text-lg font-semibold">
          Nenhuma recorrência encontrada
        </h3>
        <p className="max-w-[300px] text-sm text-muted-foreground">
          Crie uma transação recorrente para vê-la listada aqui e acompanhar seu
          histórico.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {recurringTransactions.map(({ node }) => (
        <RecurringTransactionListItem key={node.id} recurring={node as any} />
      ))}
    </div>
  );
}
