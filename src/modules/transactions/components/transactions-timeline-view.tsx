'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { subDays, addDays } from 'date-fns';
import { TransactionsTimelineList } from './transactions-timeline-list';
import { TransactionFilters } from './transactions-filters';
import { useTimelinePagination } from '../hooks/use-timeline-pagination';
import { useTimelineScroll } from '../hooks/use-timeline-scroll';
import { TimelineHeader } from './timeline-header';
import { TimelineSkeleton } from './timeline-skeleton';

interface TransactionsTimelineViewProps {
  accountId?: string;
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
  isDebitCard?: boolean;
}

export function TransactionsTimelineView({
  accountId,
  hideAccount = false,
  hideActions = [],
  compact = false,
  isDebitCard = false,
}: TransactionsTimelineViewProps) {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const { initialStartDate, initialEndDate } = useMemo(() => {
    const now = new Date();
    const start = subDays(now, 30);
    start.setHours(0, 0, 0, 0);
    const end = addDays(now, 30);
    end.setHours(23, 59, 59, 999);
    return {
      initialStartDate: start,
      initialEndDate: end,
    };
  }, []);

  const {
    transactions,
    loading,
    error,
    isInitialLoading,
    loadingDirection,
    hasMorePast,
    hasMoreFuture,
    loadMorePast,
    loadMoreFuture,
    windowStart,
    windowEnd,
    queryVariables,
    data,
  } = useTimelinePagination({
    accountId,
    filters,
    initialStartDate,
    initialEndDate,
  });

  const {
    todayRef,
    headerRef,
    prepareForFutureLoad,
    applyFutureScrollAdjustment,
  } = useTimelineScroll({
    loading,
    hasData: !!data,
    transactionsCount: transactions.length,
  });

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
        <CardContent className="p-4">
          <p className="text-red-600 dark:text-red-400">
            Erro ao carregar transações: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <TimelineHeader
        accountId={accountId}
        isDebitCard={isDebitCard}
        filters={filters}
        onFiltersChange={setFilters}
        queryVariables={queryVariables}
        headerRef={headerRef}
      />

      <div className="flex-1">
        {transactions.length === 0 && !isInitialLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma transação encontrada.
              </p>
            </CardContent>
          </Card>
        )}

        <TransactionsTimelineList
          transactions={transactions}
          hideAccount={hideAccount}
          hideActions={hideActions}
          compact={compact}
          todayRef={todayRef}
          hasMorePast={hasMorePast}
          hasMoreFuture={hasMoreFuture}
          onLoadMorePast={loadMorePast}
          onLoadMoreFuture={() =>
            loadMoreFuture(prepareForFutureLoad, applyFutureScrollAdjustment)
          }
          isLoadingPast={loadingDirection === 'past'}
          isLoadingFuture={loadingDirection === 'future'}
          windowStart={windowStart}
          windowEnd={windowEnd}
          refetchVariables={queryVariables}
        />

        {isInitialLoading && <TimelineSkeleton />}
      </div>
    </div>
  );
}
