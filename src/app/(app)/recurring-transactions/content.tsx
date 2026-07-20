'use client';

import {
  RecurringTransactionsList,
  RecurringTransactionSuggestionsList,
} from '@/modules/recurring-transactions';
import {
  IncomeTransactionCreateForm,
  ExpenseTransactionCreateForm,
} from '@/modules/transactions/components/transaction-create-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';
import { useState } from 'react';
import {
  RecurrenceFrequency,
  RecurringTransactionSuggestionFragmentFragment,
} from '@/graphql/graphql';

export function RecurringTransactionsContent() {
  const [suggestionToActivate, setSuggestionToActivate] =
    useState<RecurringTransactionSuggestionFragmentFragment | null>(null);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  const handleActivate = (
    suggestion: RecurringTransactionSuggestionFragmentFragment,
  ) => {
    setSuggestionToActivate(suggestion);
    if (suggestion.destinyAccountId && !suggestion.sourceAccountId) {
      setIsIncomeFormOpen(true);
    } else {
      setIsExpenseFormOpen(true);
    }
  };

  const handleIncomeOpenChange = (open: boolean) => {
    setIsIncomeFormOpen(open);
    if (!open) setSuggestionToActivate(null);
  };

  const handleExpenseOpenChange = (open: boolean) => {
    setIsExpenseFormOpen(open);
    if (!open) setSuggestionToActivate(null);
  };

  const prefilledData = suggestionToActivate
    ? {
        description: suggestionToActivate.description,
        amount: Math.round(suggestionToActivate.averageAmount),
        destinyAccountId: suggestionToActivate.destinyAccountId ?? undefined,
        sourceAccountId: suggestionToActivate.sourceAccountId ?? undefined,
        category: suggestionToActivate.transactions.find((t) => !!t.category)
          ?.category,
        frequency: suggestionToActivate.frequency,
        transactionIdsToLink: suggestionToActivate.transactionIds,
        transactionsToLink: suggestionToActivate.transactions,
      }
    : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transações Recorrentes</h1>
          <p className="text-muted-foreground">
            Gerencie suas receitas e despesas que se repetem automaticamente.
          </p>
        </div>
        <div className="flex gap-2">
          <IncomeTransactionCreateForm
            open={isIncomeFormOpen}
            onOpenChange={handleIncomeOpenChange}
            prefilledData={prefilledData}
          />
          <ExpenseTransactionCreateForm
            open={isExpenseFormOpen}
            onOpenChange={handleExpenseOpenChange}
            prefilledData={prefilledData}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Recorrências ativas
          </CardTitle>
          <CardDescription>
            Suas transações programadas para acontecer regularmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecurringTransactionsList />
        </CardContent>
      </Card>

      <RecurringTransactionSuggestionsList onActivate={handleActivate} />
    </div>
  );
}
