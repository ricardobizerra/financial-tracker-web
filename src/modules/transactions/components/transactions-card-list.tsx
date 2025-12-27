'use client';

import { useQuery } from '@apollo/client';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { TransactionCard } from './transaction-card';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderDirection, OrdenationTransactionModel, TransactionStatus } from '@/graphql/graphql';

interface TransactionsCardListProps {
  accountId?: string;
  cardBillingId?: string;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
}

export function TransactionsCardList({
  accountId,
  cardBillingId,
  hideAccount = false,
  hideActions = [],
  compact = false,
}: TransactionsCardListProps) {
  const { data, loading, error } = useQuery(TransactionsQuery, {
    variables: {
      first: 100,
      accountId,
      cardBillingId,
      orderBy: OrdenationTransactionModel.Date,
      orderDirection: OrderDirection.Asc,
      statuses: [TransactionStatus.Planned, TransactionStatus.Overdue, TransactionStatus.Completed],
    },
  });

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-destructive">
          Erro ao carregar transações.
        </CardContent>
      </Card>
    );
  }

  const transactions = data?.transactions?.edges?.map((edge) => edge.node) || [];

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Nenhuma transação encontrada.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          hideAccount={hideAccount}
          hideActions={hideActions}
          compact={compact}
        />
      ))}
    </div>
  );
}
