'use client';

import {
  TransactionFilters,
  TransactionsFilters,
} from './transactions-filters';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';

interface TimelineHeaderProps {
  accountId?: string;
  isDebitCard?: boolean;
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  queryVariables: any;
  headerRef: React.RefObject<HTMLDivElement>;
}

export function TimelineHeader({
  accountId,
  isDebitCard,
  filters,
  onFiltersChange,
  queryVariables,
  headerRef,
}: TimelineHeaderProps) {
  return (
    <div
      ref={headerRef}
      className="sticky top-0 z-20 space-y-4 bg-background/95 pb-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {!accountId && (
        <div className="flex flex-col gap-1 pt-4">
          <h1 className="text-3xl font-bold tracking-tight">Movimentações</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie seu histórico financeiro em uma linha do tempo
            interativa.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <TransactionsFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
          {!isDebitCard && (
            <IncomeTransactionCreateForm
              accountId={accountId}
              refetchVariables={queryVariables}
            />
          )}
          <ExpenseTransactionCreateForm
            accountId={accountId}
            refetchVariables={queryVariables}
          />
          {!isDebitCard && (
            <BetweenAccountsTransactionCreateForm
              accountId={accountId}
              refetchVariables={queryVariables}
            />
          )}
        </div>
      </div>
    </div>
  );
}
