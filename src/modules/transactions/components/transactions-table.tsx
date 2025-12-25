'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DataTable } from '@/components/data-table';
import {
  OrdenationTransactionModel,
  OrderDirection,
  TransactionType,
} from '@/graphql/graphql';
import {
  TransactionsQuery,
  TransactionsSummaryQuery,
} from '../graphql/transactions-queries';
import { transactionsTableColumns } from './transactions-table-columns';
import { useParams } from 'next/navigation';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import {
  IncomeRecurringTransactionCreateForm,
  ExpenseRecurringTransactionCreateForm,
} from '@/modules/recurring-transactions';
import { Separator } from '@/components/ui/separator';
import {
  TransactionsFilters,
  TransactionFilters,
} from './transactions-filters';
import { TransactionsSummaryCards } from './transactions-summary-cards';

interface TransactionsTableProps {
  cardBillingId?: string;
  hiddenActions?: TransactionType[];
  hiddenColumns?: string[];
  showSummary?: boolean;
  showFilters?: boolean;
}

export function TransactionsTable({
  cardBillingId,
  hiddenActions = [],
  hiddenColumns = [],
  showSummary = false,
  showFilters = true,
}: TransactionsTableProps) {
  const params = useParams();
  const accountId = params.accountId as string | undefined;

  const [filters, setFilters] = useState<TransactionFilters>({});

  const filterVariables = {
    accountId,
    cardBillingId,
    startDate: filters.startDate?.toISOString(),
    endDate: filters.endDate?.toISOString(),
    types: filters.types,
    statuses: filters.statuses,
  };

  const summaryQuery = useQuery(TransactionsSummaryQuery, {
    variables: filterVariables,
    skip: !showSummary,
  });

  const summary = summaryQuery.data?.transactionsSummary;

  return (
    <div className="space-y-4">
      {showSummary && (
        <TransactionsSummaryCards
          totalIncome={Number(summary?.totalIncome || 0)}
          totalExpense={Number(summary?.totalExpense || 0)}
          balance={Number(summary?.balance || 0)}
          transactionCount={summary?.transactionCount || 0}
          realizedIncome={Number(summary?.realizedIncome || 0)}
          realizedExpense={Number(summary?.realizedExpense || 0)}
          realizedBalance={Number(summary?.realizedBalance || 0)}
          forecastIncome={Number(summary?.forecastIncome || 0)}
          forecastExpense={Number(summary?.forecastExpense || 0)}
          forecastBalance={Number(summary?.forecastBalance || 0)}
          loading={summaryQuery.loading}
        />
      )}

      {showFilters && (
        <TransactionsFilters filters={filters} onFiltersChange={setFilters} />
      )}

      <DataTable
        mode="query"
        query={TransactionsQuery}
        variables={filterVariables}
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
            <Separator orientation="vertical" className="h-6" />
            {!hiddenActions.includes(TransactionType.Income) && (
              <IncomeRecurringTransactionCreateForm accountId={accountId} />
            )}
            {!hiddenActions.includes(TransactionType.Expense) && (
              <ExpenseRecurringTransactionCreateForm accountId={accountId} />
            )}
          </div>
        }
      />
    </div>
  );
}
