'use client';

import { useLazyQuery } from '@apollo/client';
import { useState, useCallback } from 'react';
import { SuggestCategoryQuery } from '../graphql/ai-queries';
import { TransactionCategory } from '@/graphql/graphql';

export interface CategorySuggestionResult {
  category: TransactionCategory;
  confidence: number;
  reasoning?: string | null;
}

export function useCategorySuggestion() {
  const [suggestion, setSuggestion] = useState<CategorySuggestionResult | null>(
    null,
  );

  const [fetchSuggestion, { loading }] = useLazyQuery(SuggestCategoryQuery, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.suggestCategory) {
        setSuggestion({
          category: data.suggestCategory.category,
          confidence: data.suggestCategory.confidence,
          reasoning: data.suggestCategory.reasoning,
        });
      }
    },
  });

  const suggestCategory = useCallback(
    async (description: string) => {
      if (!description || description.trim().length < 2) {
        setSuggestion(null);
        return null;
      }

      const result = await fetchSuggestion({
        variables: { description: description.trim() },
      });

      return result.data?.suggestCategory ?? null;
    },
    [fetchSuggestion],
  );

  const clearSuggestion = useCallback(() => {
    setSuggestion(null);
  }, []);

  return {
    suggestion,
    loading,
    suggestCategory,
    clearSuggestion,
  };
}
