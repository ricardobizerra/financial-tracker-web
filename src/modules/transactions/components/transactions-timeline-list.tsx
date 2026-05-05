'use client';

import { TransactionFragmentFragment } from '@/graphql/graphql';
import { TransactionListItem } from './transaction-list-item';
import {
  useTimelineGrouping,
  TimelineGroup,
} from '../hooks/use-timeline-grouping';
import {
  format,
  isToday,
  isYesterday,
  isTomorrow,
  addDays,
  subDays,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimelinePaginationButton } from './timeline-pagination-button';

interface TransactionsTimelineListProps {
  transactions: TransactionFragmentFragment[];
  hideAccount?: boolean;
  hideActions?: ('confirm' | 'edit' | 'cancel')[];
  compact?: boolean;
  showType?: boolean;
  hideWarnings?: boolean;
  todayRef?: React.RefObject<HTMLDivElement>;
  onLoadMorePast?: () => void;
  onLoadMoreFuture?: () => void;
  hasMorePast?: boolean;
  hasMoreFuture?: boolean;
  isLoadingPast?: boolean;
  isLoadingFuture?: boolean;
  windowStart?: Date;
  windowEnd?: Date;
  refetchVariables?: any;
}

export function TransactionsTimelineList({
  transactions,
  hideAccount = false,
  hideActions = [],
  compact = false,
  showType = true,
  hideWarnings = false,
  todayRef,
  onLoadMorePast,
  onLoadMoreFuture,
  hasMorePast = false,
  hasMoreFuture = false,
  isLoadingPast = false,
  isLoadingFuture = false,
  windowStart,
  windowEnd,
  refetchVariables,
}: TransactionsTimelineListProps) {
  const groupedTransactions = useTimelineGrouping(transactions);

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Botão de Carregar Futuro (Manual) */}
      {windowEnd && (
        <TimelinePaginationButton
          direction="future"
          hasMore={hasMoreFuture}
          isLoading={isLoadingFuture}
          onClick={onLoadMoreFuture}
          targetDate={addDays(windowEnd, 30)}
        />
      )}

      {groupedTransactions.map((group) => {
        if (group.type === 'empty-range') {
          const formatDateRange = (d: Date, relative?: string) => {
            const dateStr = format(d, "dd 'de' MMMM", { locale: ptBR });
            return relative ? `${relative} (${dateStr})` : dateStr;
          };

          let dateLabel = '';
          if (group.count === 1) {
            dateLabel = formatDateRange(
              group.startDate,
              group.startRelativeLabel || group.endRelativeLabel,
            );
          } else {
            const startLabel = formatDateRange(
              group.startDate,
              group.startRelativeLabel,
            );
            const endLabel = formatDateRange(
              group.endDate,
              group.endRelativeLabel,
            );
            dateLabel = `${startLabel} a ${endLabel}`;
          }

          return (
            <div
              key={`${group.startDateStr}-${group.endDateStr}`}
              ref={group.isToday ? todayRef : undefined}
              className="flex items-center gap-4 py-1"
            >
              <div className="flex items-center gap-2 rounded-full border border-dashed bg-muted/5 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 opacity-50" />
                <span>{dateLabel}</span>
                <span className="mx-1 opacity-30">•</span>
                <span className="italic">
                  {group.count === 1
                    ? 'Nenhuma transação neste dia'
                    : 'Nenhuma transação nestes dias'}
                </span>
              </div>
              <div className="h-px flex-1 bg-border/30" />
            </div>
          );
        }

        return (
          <div
            key={group.dateStr}
            ref={group.isToday ? (todayRef as any) : undefined}
            className="relative flex flex-col gap-3"
          >
            {/* Cabeçalho do dia */}
            <div
              className="sticky z-10 flex items-center gap-2 bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              style={{ top: 'var(--transactions-header-height, 0px)' }}
            >
              <div
                className={cn(
                  'flex h-8 items-center rounded-full px-3 text-sm font-medium ring-1 transition-colors',
                  group.isToday
                    ? 'bg-primary/10 text-primary ring-primary/20'
                    : 'bg-muted/50 text-muted-foreground ring-border/50',
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {group.relativeLabel && (
                  <>
                    <span className="font-bold">{group.relativeLabel}</span>
                    <span
                      className={cn(
                        'mx-1.5',
                        group.isToday
                          ? 'text-primary'
                          : 'text-muted-foreground/50',
                      )}
                    >
                      •
                    </span>
                  </>
                )}
                <span>{group.fullDate}</span>
              </div>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            {/* Cartões do dia */}
            <div className="flex flex-col">
              {group.transactions.length > 0 ? (
                group.transactions.map((transaction) => (
                  <TransactionListItem
                    key={transaction.id}
                    transaction={transaction}
                    hideAccount={hideAccount}
                    hideActions={hideActions}
                    compact={compact}
                    showType={showType}
                    hideWarnings={hideWarnings}
                    refetchVariables={refetchVariables}
                  />
                ))
              ) : (
                <div className="flex items-center gap-4 py-1">
                  <div
                    className={cn(
                      'flex items-center gap-2 rounded-full border border-dashed px-3 py-1 text-xs font-medium',
                      group.isToday
                        ? 'border-primary/20 bg-primary/5 text-primary'
                        : 'border-border/50 bg-muted/5 text-muted-foreground',
                    )}
                  >
                    <Calendar
                      className={cn(
                        'h-3.5 w-3.5',
                        group.isToday ? 'opacity-70' : 'opacity-50',
                      )}
                    />
                    <span className="italic">Nenhuma transação neste dia</span>
                  </div>
                  <div
                    className={cn(
                      'h-px flex-1',
                      group.isToday ? 'bg-primary/20' : 'bg-border/30',
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Botão de Carregar Passado (Manual) */}
      {windowStart && (
        <TimelinePaginationButton
          direction="past"
          hasMore={hasMorePast}
          isLoading={isLoadingPast}
          onClick={onLoadMorePast}
          targetDate={subDays(windowStart, 30)}
        />
      )}
    </div>
  );
}
