'use client';

import React, { useState } from 'react';
import {
  RecurrenceFrequency,
  TransactionType,
  DayMode,
  TransactionStatus,
} from '@/graphql/graphql';
import { cn } from '@/lib/utils';
import { Sparkles, X, Plus, ChevronDown, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransactionAmountDisplay } from '@/modules/transactions/components/transaction-amount-display';
import { TransactionTypeIcon } from '@/modules/transactions/components/transaction-type-icon';
import { TransactionFrequencyBadge } from './transaction-frequency-badge';
import { useRecurringTransactionMutations } from '../hooks/use-recurring-transaction-mutations';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { TransactionListItem } from '@/modules/transactions/components/transaction-list-item';

interface SuggestionData {
  description: string;
  averageAmount: number;
  frequency: RecurrenceFrequency;
  suggestedDay: number;
  sourceAccountId?: string;
  destinyAccountId?: string;
  transactionIds: string[];
  occurrenceCount: number;
  transactions: Array<{
    id: string;
    description: string;
    amount: any;
    date: any;
    status: TransactionStatus;
    type: TransactionType;
    category?: any;
    paymentMethod?: any;
  }>;
}

interface RecurringTransactionSuggestionItemProps {
  suggestion: SuggestionData;
  onActivate: (suggestion: SuggestionData) => void;
}

export function RecurringTransactionSuggestionItem({
  suggestion,
  onActivate,
}: RecurringTransactionSuggestionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { ignorePossibleRecurrence } = useRecurringTransactionMutations();

  const isIncome = !!suggestion.destinyAccountId && !suggestion.sourceAccountId;
  const type = isIncome ? TransactionType.Income : TransactionType.Expense;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl border border-dashed border-primary/30 bg-primary/5 transition-all hover:border-primary/50 hover:shadow-md dark:bg-primary/10',
          isOpen && 'border-solid border-primary/50 bg-primary/10 shadow-sm',
        )}
      >
        <div className="flex items-center gap-4 p-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <TransactionTypeIcon type={type} />
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground shadow-sm">
                  <Sparkles className="h-2.5 w-2.5" />
                </div>
              </div>

              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                >
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-primary/60 transition-transform duration-300',
                      isOpen && 'rotate-180 text-primary',
                    )}
                  />
                  <span className="sr-only">Alternar detalhes</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold leading-none tracking-tight text-primary/90">
                  {suggestion.description}
                </h3>
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary/60">
                  Sugerido ({suggestion.occurrenceCount}x)
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Detectamos um padrão nas suas transações recentes.
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <TransactionFrequencyBadge
              frequency={suggestion.frequency}
              dayOfMonth={suggestion.suggestedDay}
              dayMode={DayMode.SpecificDay}
            />
          </div>

          <div className="flex items-center gap-6">
            <TransactionAmountDisplay
              amount={suggestion.averageAmount}
              type={type}
            />

            <div className="flex items-center gap-2">
              <SimpleTooltip label="Ignorar sugestão" side="top">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  onClick={() =>
                    ignorePossibleRecurrence(suggestion.description)
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </SimpleTooltip>

              <Button
                variant="default"
                size="sm"
                className="gap-1 px-4 shadow-sm"
                onClick={() => onActivate(suggestion)}
              >
                <Plus className="h-4 w-4" />
                Ativar
              </Button>
            </div>
          </div>
        </div>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-primary/10 bg-primary/5 p-4 pt-3 dark:bg-primary/5">
            <div className="mb-3 flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-primary/60">
              <History className="h-3 w-3" />
              Ocorrências Detectadas
            </div>

            <div className="space-y-2 border-l-2 border-primary/10 pl-4">
              {suggestion.transactions.map((transaction) => (
                <TransactionListItem
                  key={transaction.id}
                  transaction={transaction as any}
                  compact
                  hideAccount={true}
                  hideActions={['confirm', 'edit', 'cancel']}
                />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
