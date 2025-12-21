'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { TransactionType, TransactionStatus } from '@/graphql/graphql';
import { TransactionsCalendarQuery } from '../graphql/calendar-agenda-queries';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionTypeBadge } from './transaction-type-badge';
import { TransactionStatusBadge } from './transaction-status-badge';

interface TransactionsCalendarProps {
  accountId?: string;
}

export function TransactionsCalendar({ accountId }: TransactionsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { data, loading } = useQuery(TransactionsCalendarQuery, {
    variables: {
      accountId,
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth() + 1,
    },
  });

  const calendar = data?.transactionsCalendar;

  // Criar mapa de dias com transações
  type CalendarDay = NonNullable<typeof calendar>['days'][0];
  const daysMap = new Map<string, CalendarDay>();
  calendar?.days?.forEach((day) => {
    const dateKey = new Date(day.date).toISOString().split('T')[0];
    daysMap.set(dateKey, day);
  });

  // Gerar todos os dias do mês
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const allDays = eachDayOfInterval({ start, end });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const firstDayOfMonth = start.getDay();
  const emptyDays = Array(firstDayOfMonth).fill(null);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Calendário</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-medium capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {!loading && calendar && (
          <div className="mt-2 flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-muted-foreground">
                {formatCurrency(calendar.monthTotalIncome)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-muted-foreground">
                {formatCurrency(calendar.monthTotalExpense)}
              </span>
            </div>
            <div
              className={cn(
                'font-medium',
                calendar.monthBalance >= 0
                  ? 'text-emerald-600'
                  : 'text-red-600',
              )}
            >
              {calendar.monthBalance >= 0 ? '+' : ''}
              {formatCurrency(calendar.monthBalance)}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Week days header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty days */}
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Days */}
              {allDays.map((date) => {
                const dateKey = date.toISOString().split('T')[0];
                const dayData = daysMap.get(dateKey);
                const isToday = isSameDay(date, new Date());
                const hasTransactions =
                  !!dayData && dayData.transactionCount > 0;
                const hasIncome = (dayData?.totalIncome || 0) > 0;
                const hasExpense = (dayData?.totalExpense || 0) > 0;

                return (
                  <Popover key={dateKey}>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          'relative flex aspect-square flex-col items-center justify-center rounded-md p-1 text-sm transition-colors hover:bg-accent',
                          isToday && 'ring-2 ring-primary',
                          hasTransactions && 'cursor-pointer',
                          !hasTransactions && 'opacity-60',
                        )}
                        disabled={!hasTransactions}
                      >
                        <span
                          className={cn(
                            'font-medium',
                            isToday && 'text-primary',
                          )}
                        >
                          {format(date, 'd')}
                        </span>

                        {hasTransactions && (
                          <div className="mt-0.5 flex gap-0.5">
                            {hasIncome && (
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            )}
                            {hasExpense && (
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                        )}
                      </button>
                    </PopoverTrigger>

                    {hasTransactions && dayData && (
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="border-b p-3">
                          <p className="font-medium capitalize">
                            {format(date, "EEEE, dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                          <div className="mt-1 flex gap-4 text-sm">
                            {hasIncome && (
                              <span className="text-emerald-600">
                                +{formatCurrency(dayData.totalIncome)}
                              </span>
                            )}
                            {hasExpense && (
                              <span className="text-red-600">
                                -{formatCurrency(dayData.totalExpense)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto p-2">
                          {dayData.transactions.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex items-center justify-between rounded-md p-2 hover:bg-accent"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {tx.description}
                                </p>
                                <div className="flex items-center gap-2">
                                  <TransactionTypeBadge
                                    type={tx.type as TransactionType}
                                  />
                                  <TransactionStatusBadge
                                    status={tx.status as TransactionStatus}
                                  />
                                </div>
                              </div>
                              <span
                                className={cn(
                                  'text-sm font-medium',
                                  tx.type === 'INCOME'
                                    ? 'text-emerald-600'
                                    : tx.type === 'EXPENSE'
                                      ? 'text-red-600'
                                      : 'text-blue-600',
                                )}
                              >
                                {tx.type === 'INCOME'
                                  ? '+'
                                  : tx.type === 'EXPENSE'
                                    ? '-'
                                    : ''}
                                {formatCurrency(tx.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    )}
                  </Popover>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
