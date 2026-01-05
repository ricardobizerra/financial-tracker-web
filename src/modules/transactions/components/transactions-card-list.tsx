'use client';

import { useQuery } from '@apollo/client';
import {
  TransactionsQuery,
  BillingTransactionsQuery,
} from '../graphql/transactions-queries';
import { TransactionCard } from './transaction-card';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  OrderDirection,
  OrdenationTransactionModel,
  TransactionStatus,
} from '@/graphql/graphql';

interface TransactionsCardListProps {
  cardBillingId?: string;
  hideAccount?: boolean;
}

export function TransactionsCardList({
  cardBillingId,
  hideAccount = false,
}: TransactionsCardListProps) {
  const {
    data: billingData,
    loading: billingLoading,
    error: billingError,
  } = useQuery(BillingTransactionsQuery, {
    variables: {
      billingId: cardBillingId || '',
    },
    fetchPolicy: 'cache-and-network',
  });

  if (billingLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (billingError) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-destructive">
          Erro ao carregar transações.
        </CardContent>
      </Card>
    );
  }

  const transactions = billingData?.billingTransactions || [];

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
          hideActions={[]}
          compact={false}
          hideWarnings={true}
          showType={false}
        />
      ))}
    </div>
  );
}
