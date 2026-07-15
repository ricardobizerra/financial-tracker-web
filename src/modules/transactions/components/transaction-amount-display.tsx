import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters/currency';
import { TransactionType } from '@/graphql/graphql';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleTooltip } from '@/components/simple-tooltip';

interface TransactionAmountDisplayProps {
  amount: string | number;
  type: TransactionType;
  isExpenseForBilling?: boolean;
  onUpdate?: (newAmount: number) => void;
  disabled?: boolean;
}

const formatValue = (input: string | undefined) => {
  const numericValue = input?.replace(/[^0-9]/g, '');
  if (!numericValue) return '0,00';
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(parseFloat(numericValue) / 100);
  return formatted.replace('R$', '').trim();
};

const unformatValue = (input: string) => {
  const numericValue = input.replace(/[^0-9]/g, '');
  return parseInt(numericValue);
};

export function TransactionAmountDisplay({
  amount,
  type,
  isExpenseForBilling = false,
  onUpdate,
  disabled = false,
}: TransactionAmountDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(formatValue(amount.toString()));
  const inputRef = useRef<HTMLInputElement>(null);

  const isIncome = type === TransactionType.Income;
  const isExpense = type === TransactionType.Expense;
  const isBetweenAccounts = type === TransactionType.BetweenAccounts;

  const colorClasses = cn(
    isIncome && 'text-green-700 dark:text-green-500',
    isExpense && 'text-destructive',
    isBetweenAccounts && 'text-blue-600 dark:text-blue-500',
    isExpenseForBilling && 'text-muted-foreground dark:text-muted-foreground',
  );

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      // Position cursor at the end
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleSave = () => {
    const numericValue = unformatValue(value);
    if (!isNaN(numericValue) && numericValue !== Number(amount)) {
      onUpdate?.(numericValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(formatValue(amount.toString()));
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = unformatValue(e.target.value);
    setValue(formatValue(numeric.toString()));
  };

  const hasChanges = unformatValue(value) !== Number(amount);

  if (isEditing && onUpdate && !disabled) {
    return (
      <div className="flex justify-end">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          leftSlot={
            <span className="text-xs font-bold text-muted-foreground opacity-70">
              R$
            </span>
          }
          rightSlot={
            <div className="flex items-center gap-0.5">
              <SimpleTooltip label="Salvar" side="top">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-7 w-7 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30',
                    !hasChanges && 'cursor-not-allowed opacity-30 grayscale',
                  )}
                  onClick={handleSave}
                  disabled={!hasChanges}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Salvar</span>
                </Button>
              </SimpleTooltip>
              <SimpleTooltip label="Cancelar" side="top">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancelar</span>
                </Button>
              </SimpleTooltip>
            </div>
          }
          className={cn(
            'h-9 w-48 text-right text-base font-medium',
            colorClasses,
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative text-right text-base font-medium transition-all',
        colorClasses,
        onUpdate &&
          !disabled &&
          'cursor-pointer underline-offset-4 hover:underline',
      )}
      onClick={(e) => {
        if (onUpdate && !disabled) {
          e.stopPropagation();
          setIsEditing(true);
        }
      }}
    >
      {isExpense && '-'}
      {formatCurrency(Number(amount))}
    </div>
  );
}
