'use client';

import { useQuery } from '@apollo/client';
import { PossibleRecurringTransactionsQuery } from '../graphql/recurring-transactions-queries';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { RecurringTransactionSuggestionItem } from './recurring-transaction-suggestion-item';
import { RecurrenceFrequency, TransactionType } from '@/graphql/graphql';

export interface SuggestionData {
  description: string;
  averageAmount: number;
  frequency: RecurrenceFrequency;
  suggestedDay: number;
  sourceAccountId?: string;
  destinyAccountId?: string;
  transactionIds: string[];
  occurrenceCount: number;
  transactions: any[];
}

interface RecurringTransactionSuggestionsListProps {
  onActivate: (suggestion: SuggestionData) => void;
}

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
    <div className="mb-8 flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-widest text-primary/60">
        <Sparkles className="h-3 w-3" />
        Sugestões de Recorrência
      </div>
      <div className="flex flex-col gap-3">
        {suggestions.map((suggestion: any) => (
          <RecurringTransactionSuggestionItem
            key={suggestion.description}
            suggestion={suggestion}
            onActivate={onActivate}
          />
        ))}
      </div>
    </div>
  );
}
