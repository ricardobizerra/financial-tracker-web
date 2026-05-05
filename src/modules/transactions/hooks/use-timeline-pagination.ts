import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { subDays, addDays } from 'date-fns';
import { TransactionsQuery } from '../graphql/transactions-queries';
import {
  OrdenationTransactionModel,
  OrderDirection,
  TransactionFragmentFragment,
} from '@/graphql/graphql';
import { TransactionFilters } from '../components/transactions-filters';

interface UseTimelinePaginationProps {
  accountId?: string;
  filters: TransactionFilters;
  initialStartDate: Date;
  initialEndDate: Date;
}

export function useTimelinePagination({
  accountId,
  filters,
  initialStartDate,
  initialEndDate,
}: UseTimelinePaginationProps) {
  const [windowStart, setWindowStart] = useState<Date>(initialStartDate);
  const [windowEnd, setWindowEnd] = useState<Date>(initialEndDate);
  const [loadingDirection, setLoadingDirection] = useState<
    'past' | 'future' | null
  >(null);

  const hasActiveFilters = useMemo(
    () =>
      !!(
        filters.startDate ||
        filters.endDate ||
        (filters.types && filters.types.length > 0) ||
        (filters.statuses && filters.statuses.length > 0) ||
        filters.search
      ),
    [filters],
  );

  const queryVariables = useMemo(
    () => ({
      accountId,
      orderBy: OrdenationTransactionModel.Date,
      orderDirection: OrderDirection.Desc,
      startDate: hasActiveFilters
        ? filters.startDate?.toISOString()
        : windowStart.toISOString(),
      endDate: hasActiveFilters
        ? filters.endDate?.toISOString()
        : windowEnd.toISOString(),
      types: filters.types,
      statuses: filters.statuses,
      search: filters.search,
      first: undefined,
      last: undefined,
    }),
    [
      accountId,
      windowStart,
      windowEnd,
      filters.types,
      filters.statuses,
      filters.search,
      filters.startDate,
      filters.endDate,
      hasActiveFilters,
    ],
  );

  const { data, loading, error, fetchMore, previousData } = useQuery(
    TransactionsQuery,
    {
      variables: queryVariables,
      notifyOnNetworkStatusChange: true,
    },
  );

  // Resetar janelas de paginação quando os filtros de data mudarem
  useEffect(() => {
    setWindowStart(filters.startDate ?? initialStartDate);
    setWindowEnd(filters.endDate ?? initialEndDate);
    setLoadingDirection(null);
  }, [filters.startDate, filters.endDate, initialStartDate, initialEndDate]);

  const currentData = data || previousData;

  const transactions = useMemo(
    () =>
      currentData?.transactions?.edges
        ?.map((edge) => edge?.node)
        .filter(Boolean) || [],
    [currentData],
  );

  const pageInfo = currentData?.transactions?.pageInfo;

  const isInitialLoading =
    loading && !loadingDirection && (!currentData || hasActiveFilters);

  const hasMorePast =
    !hasActiveFilters &&
    (pageInfo?.hasNextPage || (transactions.length === 0 && !isInitialLoading));
  const hasMoreFuture =
    !hasActiveFilters &&
    (pageInfo?.hasPreviousPage ||
      (transactions.length === 0 && !isInitialLoading));

  const loadMorePast = () => {
    if (loading) return;
    setLoadingDirection('past');

    setTimeout(async () => {
      const newStart = subDays(windowStart, 30);
      const fetchEndDate = new Date(windowStart);
      fetchEndDate.setMilliseconds(fetchEndDate.getMilliseconds() - 1);

      try {
        await fetchMore({
          variables: {
            startDate: newStart.toISOString(),
            endDate: fetchEndDate.toISOString(),
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              transactions: {
                ...fetchMoreResult.transactions,
                edges: [
                  ...(prev.transactions?.edges || []),
                  ...(fetchMoreResult.transactions?.edges || []),
                ],
              },
            };
          },
        });
        setWindowStart(newStart);
      } finally {
        setLoadingDirection(null);
      }
    }, 0);
  };

  const loadMoreFuture = (
    onBeforeFetch?: () => void,
    onAfterFetch?: () => void,
  ) => {
    if (loading) return;
    setLoadingDirection('future');

    setTimeout(async () => {
      const newEnd = addDays(windowEnd, 30);
      const fetchStartDate = new Date(windowEnd);
      fetchStartDate.setMilliseconds(fetchStartDate.getMilliseconds() + 1);

      try {
        onBeforeFetch?.();

        await fetchMore({
          variables: {
            startDate: fetchStartDate.toISOString(),
            endDate: newEnd.toISOString(),
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              transactions: {
                ...fetchMoreResult.transactions,
                edges: [
                  ...(fetchMoreResult.transactions?.edges || []),
                  ...(prev.transactions?.edges || []),
                ],
              },
            };
          },
        });

        onAfterFetch?.();
        setWindowEnd(newEnd);
      } finally {
        setLoadingDirection(null);
      }
    }, 0);
  };

  return {
    transactions: transactions as TransactionFragmentFragment[],
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
  };
}
