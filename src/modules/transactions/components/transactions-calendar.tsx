'use client';

import { useMemo, useState } from 'react';
import {
  TransactionFragmentFragment,
  TransactionStatus,
  TransactionType,
} from '@/graphql/graphql';
import { formatCurrency } from '@/lib/formatters/currency';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
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
  ArrowLeftRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransactionTypeBadge } from './transaction-type-badge';
import { TransactionStatusBadge } from './transaction-status-badge';

interface TransactionsCalendarProps {
  transactions: TransactionFragmentFragment[];
}

interface DayData {
  date: Date;
  transactions: TransactionFragmentFragment[];
  totalIncome: number;
  totalExpense: number;
  hasTransactions: boolean;
}

export function TransactionsCalendar({
  transactions,
}: TransactionsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const calendarData = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    return days.map((date) => {
      const dayTransactions = transactions.filter((tx) =>
        isSameDay(new Date(tx.date), date),
      );

      let totalIncome = 0;
      let totalExpense = 0;

      dayTransactions.forEach((tx) => {
        if (tx.status === TransactionStatus.Canceled) return;
        const amount = Number(tx.amount);
        if (tx.type === TransactionType.Income) {
          totalIncome += amount;
        } else if (tx.type === TransactionType.Expense) {
          totalExpense += amount;
        }
      });

      return {
        date,
        transactions: dayTransactions,
        totalIncome,
        totalExpense,
        hasTransactions: dayTransactions.length > 0,
      };
    });
  }, [transactions, currentMonth]);

  const monthStats = useMemo(() => {
    let income = 0;
    let expense = 0;

    calendarData.forEach((day) => {
      income += day.totalIncome;
      expense += day.totalExpense;
    });

    return { income, expense, balance: income - expense };
  }, [calendarData]);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Adicionar dias vazios no início para alinhar com o dia da semana correto
  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
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
        <div className="mt-2 flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-muted-foreground">
              {formatCurrency(monthStats.income)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="text-muted-foreground">
              {formatCurrency(monthStats.expense)}
            </span>
          </div>
          <div
            className={cn(
              'font-medium',
              monthStats.balance >= 0 ? 'text-emerald-600' : 'text-red-600',
            )}
          >
            {monthStats.balance >= 0 ? '+' : ''}
            {formatCurrency(monthStats.balance)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
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

          {/* Days with transactions */}
          {calendarData.map((day) => {
            const isToday = isSameDay(day.date, new Date());
            const hasIncome = day.totalIncome > 0;
            const hasExpense = day.totalExpense > 0;

            return (
              <Popover key={day.date.toISOString()}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      'relative flex aspect-square flex-col items-center justify-center rounded-md p-1 text-sm transition-colors hover:bg-accent',
                      isToday && 'ring-2 ring-primary',
                      day.hasTransactions && 'cursor-pointer',
                      !day.hasTransactions && 'opacity-60',
                    )}
                    disabled={!day.hasTransactions}
                  >
                    <span
                      className={cn('font-medium', isToday && 'text-primary')}
                    >
                      {format(day.date, 'd')}
                    </span>

                    {day.hasTransactions && (
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

                {day.hasTransactions && (
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="border-b p-3">
                      <p className="font-medium capitalize">
                        {format(day.date, "EEEE, dd 'de' MMMM", {
                          locale: ptBR,
                        })}
                      </p>
                      <div className="mt-1 flex gap-4 text-sm">
                        {hasIncome && (
                          <span className="text-emerald-600">
                            +{formatCurrency(day.totalIncome)}
                          </span>
                        )}
                        {hasExpense && (
                          <span className="text-red-600">
                            -{formatCurrency(day.totalExpense)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                      {day.transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between rounded-md p-2 hover:bg-accent"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {tx.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <TransactionTypeBadge type={tx.type} />
                              <TransactionStatusBadge status={tx.status} />
                            </div>
                          </div>
                          <span
                            className={cn(
                              'text-sm font-medium',
                              tx.type === TransactionType.Income
                                ? 'text-emerald-600'
                                : tx.type === TransactionType.Expense
                                  ? 'text-red-600'
                                  : 'text-blue-600',
                            )}
                          >
                            {tx.type === TransactionType.Income
                              ? '+'
                              : tx.type === TransactionType.Expense
                                ? '-'
                                : ''}
                            {formatCurrency(Number(tx.amount))}
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
      </CardContent>
    </Card>
  );
}
