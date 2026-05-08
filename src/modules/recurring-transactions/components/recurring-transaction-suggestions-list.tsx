'use client';

import { useQuery } from '@apollo/client';
import { PossibleRecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { RecurringTransactionSuggestionItem } from './recurring-transaction-suggestion-item';
import {
  RecurrenceFrequency,
  RecurringTransactionSuggestionFragmentFragment,
  TransactionType,
} from '@/graphql/graphql';

interface RecurringTransactionSuggestionsListProps {
  onActivate: (
    suggestion: RecurringTransactionSuggestionFragmentFragment,
  ) => void;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function RecurringTransactionSuggestionsList({
  onActivate,
}: RecurringTransactionSuggestionsListProps) {
  const { data, loading } = useQuery(PossibleRecurringTransactionsQuery);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  const suggestions = data?.possibleRecurringTransactions || [];

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          Sugestões de Recorrência
        </CardTitle>
        <CardDescription>
          Identificamos padrões nas suas transações que podem ser automatizados.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {suggestions.map((suggestion) => (
          <RecurringTransactionSuggestionItem
            key={suggestion.description}
            suggestion={suggestion}
            onActivate={onActivate}
          />
        ))}
      </CardContent>
    </Card>
  );
}
