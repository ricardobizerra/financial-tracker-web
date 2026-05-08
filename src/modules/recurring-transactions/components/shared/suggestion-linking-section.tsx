'use client';

import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { History, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/formatters/currency';

interface SuggestionLinkingSectionProps {
  prefilledTransactions: any[];
  selectedTransactionIds: string[];
  onSelectedTransactionIdsChange: (ids: string[]) => void;
  className?: string;
}

export function SuggestionLinkingSection({
  prefilledTransactions,
  selectedTransactionIds,
  onSelectedTransactionIdsChange,
  className,
}: SuggestionLinkingSectionProps) {
  if (!prefilledTransactions || prefilledTransactions.length === 0) return null;

  const allIds = prefilledTransactions.map((t) => t.id);
  const isAllSelected = selectedTransactionIds.length === allIds.length;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-base font-semibold text-primary">
            <History className="h-5 w-5" />
            Vincular histórico detectado
          </Label>
          <p className="text-xs text-muted-foreground">
            Selecione quais transações passadas pertencem a este padrão.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 rounded-full text-[10px] uppercase tracking-wider"
          onClick={() => {
            onSelectedTransactionIdsChange(isAllSelected ? [] : allIds);
          }}
        >
          <CheckSquare className="mr-1.5 h-3.5 w-3.5" />
          {isAllSelected ? 'Limpar seleção' : 'Selecionar tudo'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prefilledTransactions.map((transaction) => {
          const isSelected = selectedTransactionIds.includes(transaction.id);
          return (
            <button
              key={transaction.id}
              type="button"
              onClick={() => {
                if (isSelected) {
                  onSelectedTransactionIdsChange(
                    selectedTransactionIds.filter(
                      (id) => id !== transaction.id,
                    ),
                  );
                } else {
                  onSelectedTransactionIdsChange([
                    ...selectedTransactionIds,
                    transaction.id,
                  ]);
                }
              }}
              className={cn(
                'group relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all duration-300',
                isSelected
                  ? 'border-primary/40 bg-primary/5 shadow-sm ring-1 ring-primary/20'
                  : 'border-muted bg-background/50 opacity-50 grayscale hover:opacity-100 hover:grayscale-0',
              )}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  {format(new Date(transaction.date), 'dd MMMM yyyy', {
                    locale: ptBR,
                  })}
                </span>
                {isSelected && (
                  <div className="rounded-full bg-primary p-0.5 text-primary-foreground">
                    <CheckSquare className="h-3 w-3" />
                  </div>
                )}
              </div>

              <div className="flex w-full items-end justify-between gap-2">
                <span className="truncate text-sm font-semibold text-primary/90">
                  {transaction.description}
                </span>
                <span className="shrink-0 text-sm font-bold text-foreground">
                  {formatCurrency(Number(transaction.amount))}
                </span>
              </div>

              {isSelected && (
                <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span>
          {selectedTransactionIds.length} de {prefilledTransactions.length}{' '}
          transações serão vinculadas ao histórico desta recorrência.
        </span>
      </div>
    </div>
  );
}
