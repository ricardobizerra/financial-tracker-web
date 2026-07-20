'use client';

import { useQuery } from '@apollo/client';
import {
  TransactionsQuery,
  BillingTransactionsQuery,
} from '../graphql/transactions-queries';
import { TransactionsTimelineList } from './transactions-timeline-list';
import { TransactionFragmentFragment } from '@/graphql/graphql';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  OrderDirection,
  OrdenationTransactionModel,
  TransactionStatus,
} from '@/graphql/graphql';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

interface TransactionsCardListProps {
  cardBillingId?: string;
  hideAccount?: boolean;
}

export function TransactionsCardList({
  cardBillingId,
  hideAccount = false,
}: TransactionsCardListProps) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data: billingData,
    loading: billingLoading,
    error: billingError,
  } = useQuery(BillingTransactionsQuery, {
    variables: {
      billingId: cardBillingId || '',
      search: debouncedSearch || undefined,
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

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar descrição..."
          className="h-9"
          leftSlot={<Search className="h-4 w-4 text-muted-foreground" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {transactions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Nenhuma transação encontrada.
          </CardContent>
        </Card>
      ) : (
        <TransactionsTimelineList
          transactions={transactions as TransactionFragmentFragment[]}
          hideAccount={hideAccount}
          hideActions={[]}
          compact={false}
          hideWarnings={true}
          showType={false}
        />
      )}
    </div>
  );
}
