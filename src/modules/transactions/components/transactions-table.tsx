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
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';

export function TransactionsTable({
  cardBillingId,
  hiddenActions = [],
  hiddenColumns = [],
}: {
  cardBillingId?: string;
  hiddenActions?: TransactionType[];
  hiddenColumns?: string[];
}) {
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
              cardBillingId,
            }
          : undefined
      }
      initialSorting={{
        key: OrdenationTransactionModel.Date,
        direction: OrderDirection.Desc,
      }}
      columns={transactionsTableColumns.filter(
        (column) => !hiddenColumns.includes(column.accessorKey as string),
      )}
      initialPageSize={50}
      actionButtons={
        <div className="flex items-center gap-2">
          {!hiddenActions.includes(TransactionType.Income) && (
            <IncomeTransactionCreateForm accountId={accountId} />
          )}
          {!hiddenActions.includes(TransactionType.Expense) && (
            <ExpenseTransactionCreateForm accountId={accountId} />
          )}
          {!hiddenActions.includes(TransactionType.BetweenAccounts) && (
            <BetweenAccountsTransactionCreateForm accountId={accountId} />
          )}
        </div>
      }
    />
  );
}
