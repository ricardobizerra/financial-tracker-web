'use client';

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { TransactionsQuery } from '../graphql/transactions-queries';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  OrdenationTransactionModel,
  OrderDirection,
  TransactionFragmentFragment,
} from '@/graphql/graphql';
import { subDays, addDays } from 'date-fns';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
  BetweenAccountsTransactionCreateForm,
} from './transaction-create-form';
import { TransactionsTimelineList } from './transactions-timeline-list';
import {
  TransactionsFilters,
  TransactionFilters,
} from './transactions-filters';

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
  const [hasAnchored, setHasAnchored] = useState(false);
  const todayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollAdjustmentRef = useRef(false);
  const oldScrollHeightRef = useRef(0);
  const oldScrollTopRef = useRef(0);

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

  const [windowStart, setWindowStart] = useState<Date>(initialStartDate);
  const [windowEnd, setWindowEnd] = useState<Date>(initialEndDate);
  const [loadingDirection, setLoadingDirection] = useState<
    'past' | 'future' | null
  >(null);

  const queryVariables = {
    accountId,
    orderBy: OrdenationTransactionModel.Date,
    orderDirection: OrderDirection.Desc,
    startDate: windowStart.toISOString(),
    endDate: windowEnd.toISOString(),
    types: filters.types,
    statuses: filters.statuses,
    first: undefined,
    last: undefined,
  };

  const { data, loading, error, fetchMore, previousData } = useQuery(
    TransactionsQuery,
    {
      variables: queryVariables,
      notifyOnNetworkStatusChange: true,
    },
  );

  // Resetar janelas de paginação quando os filtros mudarem
  useEffect(() => {
    setWindowStart(filters.startDate ?? initialStartDate);
    setWindowEnd(filters.endDate ?? initialEndDate);
    setLoadingDirection(null);
  }, [filters, initialStartDate, initialEndDate]);

  // Scroll para "Hoje" no carregamento inicial
  useEffect(() => {
    if (!loading && data && !hasAnchored && todayRef.current) {
      setTimeout(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const elementPosition =
          todayRef.current?.getBoundingClientRect().top || 0;
        const offsetPosition =
          elementPosition + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setHasAnchored(true);
      }, 200);
    }
  }, [loading, data, hasAnchored]);

  // Atualiza a variável CSS com a altura do header
  useEffect(() => {
    if (headerRef.current) {
      const updateHeaderHeight = () => {
        const height = headerRef.current?.offsetHeight || 0;
        document.documentElement.style.setProperty(
          '--transactions-header-height',
          `${height}px`,
        );
      };

      updateHeaderHeight();
      window.addEventListener('resize', updateHeaderHeight);
      return () => window.removeEventListener('resize', updateHeaderHeight);
    }
  }, []);

  const currentData = data || previousData;

  const transactions = useMemo(
    () =>
      currentData?.transactions?.edges
        ?.map((edge) => edge?.node)
        .filter(Boolean) || [],
    [currentData],
  );

  // Scroll anchoring para quando adicionamos itens no topo (future)
  useLayoutEffect(() => {
    if (scrollAdjustmentRef.current && transactions.length > 0) {
      const newScrollHeight = document.documentElement.scrollHeight;
      const heightDiff = newScrollHeight - oldScrollHeightRef.current;
      if (heightDiff > 0) {
        window.scrollTo(0, oldScrollTopRef.current + heightDiff);
      }
      scrollAdjustmentRef.current = false;
    }
  }, [transactions]);

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
  const pageInfo = currentData?.transactions?.pageInfo;

  const isInitialLoading =
    loading && !data && !previousData && !loadingDirection;

  // Se o lote atual for vazio, permitimos carregar mais para pular lacunas no histórico
  const hasMorePast =
    pageInfo?.hasNextPage || (transactions.length === 0 && !isInitialLoading);
  const hasMoreFuture =
    pageInfo?.hasPreviousPage ||
    (transactions.length === 0 && !isInitialLoading);

  const handleLoadPast = () => {
    if (loading) return;
    setLoadingDirection('past');

    // Deferimos o fetchMore para o próximo tick para permitir que o spinner renderize instantaneamente
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

  const handleLoadFuture = () => {
    if (loading) return;
    setLoadingDirection('future');

    // Deferimos o fetchMore para o próximo tick para permitir que o spinner renderize instantaneamente
    setTimeout(async () => {
      const newEnd = addDays(windowEnd, 30);
      const fetchStartDate = new Date(windowEnd);
      fetchStartDate.setMilliseconds(fetchStartDate.getMilliseconds() + 1);

      try {
        oldScrollHeightRef.current = document.documentElement.scrollHeight;
        oldScrollTopRef.current = window.scrollY;

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

        scrollAdjustmentRef.current = true;
        setWindowEnd(newEnd);
      } finally {
        setLoadingDirection(null);
      }
    }, 0);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div
        ref={headerRef}
        className="sticky top-0 z-20 space-y-4 bg-background/95 pb-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        {!accountId && (
          <div className="flex flex-col gap-1 pt-4">
            <h1 className="text-3xl font-bold tracking-tight">Movimentações</h1>
            <p className="text-muted-foreground">
              Acompanhe e gerencie seu histórico financeiro em uma linha do
              tempo interativa.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <TransactionsFilters
              filters={filters}
              onFiltersChange={setFilters}
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
          transactions={transactions as TransactionFragmentFragment[]}
          hideAccount={hideAccount}
          hideActions={hideActions}
          compact={compact}
          todayRef={todayRef}
          hasMorePast={hasMorePast}
          hasMoreFuture={hasMoreFuture}
          onLoadMorePast={handleLoadPast}
          onLoadMoreFuture={handleLoadFuture}
          isLoadingPast={loadingDirection === 'past'}
          isLoadingFuture={loadingDirection === 'future'}
          windowStart={windowStart}
          windowEnd={windowEnd}
          refetchVariables={queryVariables}
        />

        {isInitialLoading && (
          <div className="flex flex-col gap-8 pt-6">
            {[1, 2].map((day) => (
              <div key={day} className="space-y-4">
                {/* Cabeçalho do dia */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-56 rounded-full" />
                  <div className="h-px flex-1 bg-border/30" />
                </div>

                {/* Lista de transações */}
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm"
                    >
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-5 w-20 rounded-md" />
                        <Skeleton className="h-3 w-12 rounded-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
