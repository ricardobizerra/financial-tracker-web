'use client';

import { Sparkles, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TransactionCategory } from '@/graphql/graphql';

// Mapeamento de categorias para labels em português
export const categoryLabels: Record<TransactionCategory, string> = {
  FOOD_DINING: 'Alimentação',
  TRANSPORT: 'Transporte',
  HOUSING: 'Moradia',
  UTILITIES: 'Contas',
  HEALTHCARE: 'Saúde',
  ENTERTAINMENT: 'Lazer',
  SHOPPING: 'Compras',
  EDUCATION: 'Educação',
  TRAVEL: 'Viagens',
  SALARY: 'Salário',
  INVESTMENT_INCOME: 'Rendimentos',
  TRANSFER: 'Transferência',
  OTHER: 'Outros',
};

interface CategorySuggestButtonProps {
  description: string;
  loading?: boolean;
  suggestion?: {
    category: TransactionCategory;
    confidence: number;
    reasoning?: string | null;
  } | null;
  onSuggest: () => void;
  onApply?: (category: TransactionCategory) => void;
  className?: string;
  size?: 'sm' | 'default';
}

export function CategorySuggestButton({
  description,
  loading,
  suggestion,
  onSuggest,
  onApply,
  className,
  size = 'sm',
}: CategorySuggestButtonProps) {
  const isDisabled = !description || description.trim().length < 2 || loading;

  // Se já tem uma sugestão, mostra como badge clicável
  if (suggestion && !loading) {
    const confidenceColor =
      suggestion.confidence >= 0.8
        ? 'text-green-600 dark:text-green-400'
        : suggestion.confidence >= 0.5
          ? 'text-yellow-600 dark:text-yellow-400'
          : 'text-muted-foreground';

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size={size}
              className={cn(
                'gap-1.5 border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300 dark:hover:bg-violet-900',
                className,
              )}
              onClick={() => onApply?.(suggestion.category)}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{categoryLabels[suggestion.category]}</span>
              <span className={cn('text-xs', confidenceColor)}>
                ({Math.round(suggestion.confidence * 100)}%)
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="font-medium">Clique para aplicar</p>
            {suggestion.reasoning && (
              <p className="text-xs text-muted-foreground">
                {suggestion.reasoning}
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size={size}
            disabled={isDisabled}
            onClick={onSuggest}
            className={cn(
              'gap-1.5 text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400',
              className,
            )}
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {loading ? 'Analisando...' : 'Sugerir categoria'}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Usar IA para sugerir categoria</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
