'use client';

import { DataTable } from '@/components/data-table';
import { OrdenationTransactionModel, OrderDirection } from '@/graphql/graphql';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { transactionsTableColumns } from './transactions-table-columns';
import { useParams } from 'next/navigation';
import { TransactionCreateForm } from './transaction-create-form';

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
      actionButtons={<TransactionCreateForm accountId={accountId} />}
    />
  );
}
