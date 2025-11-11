'use client';

import { DataTable } from '@/components/data-table';
import {
  OrdenationTransactionModel,
  OrderDirection,
  TransactionType,
} from '@/graphql/graphql';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { transactionsTableColumns } from './transactions-table-columns';
import { useParams } from 'next/navigation';
import { TransactionCreateForm } from './transaction-create-form';
import { ArrowDown, ArrowLeftRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TransactionsTable() {
  const params = useParams();
  const accountId = params.accountId as string | undefined;

  return (
    <DataTable
      mode="query"
      query={TransactionsQuery}
      variables={
        !!accountId
          ? {
              accountId,
            }
          : undefined
      }
      initialSorting={{
        key: OrdenationTransactionModel.Date,
        direction: OrderDirection.Desc,
      }}
      columns={transactionsTableColumns}
      initialPageSize={50}
      actionButtons={
        <div className="flex items-center gap-2">
          {Object.values(TransactionType)
            .reverse()
            .map((type) => (
              <TransactionCreateForm
                key={type}
                type={type}
                accountId={accountId}
              />
            ))}
        </div>
      }
    />
  );
}
