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
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <History className="h-4 w-4 text-primary" />
          Vincular histórico detectado
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-[10px] uppercase tracking-wider"
          onClick={() => {
            onSelectedTransactionIdsChange(isAllSelected ? [] : allIds);
          }}
        >
          <CheckSquare className="mr-1 h-3 w-3" />
          {isAllSelected ? 'Desmarcar todos' : 'Marcar todos'}
        </Button>
      </div>

      <div className="rounded-xl border border-dashed border-primary/20 bg-primary/5 p-1 transition-all">
        <div className="max-h-[200px] overflow-y-auto pr-1">
          {prefilledTransactions.map((transaction) => {
            const isSelected = selectedTransactionIds.includes(transaction.id);
            return (
              <div
                key={transaction.id}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-primary/5',
                  isSelected ? 'bg-primary/5' : 'opacity-40',
                )}
              >
                <Checkbox
                  id={`link-tx-${transaction.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectedTransactionIdsChange([
                        ...selectedTransactionIds,
                        transaction.id,
                      ]);
                    } else {
                      onSelectedTransactionIdsChange(
                        selectedTransactionIds.filter(
                          (id) => id !== transaction.id,
                        ),
                      );
                    }
                  }}
                  className="h-4 w-4"
                />
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden text-left text-xs">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="shrink-0 font-medium text-muted-foreground/70">
                      {format(new Date(transaction.date), 'dd/MM', {
                        locale: ptBR,
                      })}
                    </span>
                    <span className="truncate text-left font-semibold text-primary/80">
                      {transaction.description}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono font-medium">
                    {formatCurrency(Number(transaction.amount))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-3 py-2 text-[10px] text-muted-foreground/80">
          {selectedTransactionIds.length} de {prefilledTransactions.length}{' '}
          transações selecionadas para vínculo.
        </div>
      </div>
    </div>
  );
}
