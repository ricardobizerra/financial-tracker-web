import { cn } from '@/lib/utils';
import { TransactionType, PaymentMethod } from '@/graphql/graphql';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  paymentMethodIcons,
  paymentMethodLabel,
} from '../transactions-constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransactionPaymentMethodProps {
  paymentMethod?: string | null;
  type: TransactionType;
  isExpenseForBilling?: boolean;
  onSelect?: (method: PaymentMethod) => void;
  disabled?: boolean;
}

export function TransactionPaymentMethod({
  paymentMethod,
  type,
  isExpenseForBilling = false,
  onSelect,
  disabled = false,
}: TransactionPaymentMethodProps) {
  const isIncome = type === TransactionType.Income;
  const isExpense = type === TransactionType.Expense;
  const isBetweenAccounts = type === TransactionType.BetweenAccounts;

  const renderContent = (isInteractive = false) => {
    if (!paymentMethod) {
      return (
        <Badge
          className={cn(
            'gap-1 whitespace-nowrap border border-dashed border-muted-foreground/30 bg-transparent text-muted-foreground transition-all hover:bg-muted/50 hover:text-muted-foreground',
            isInteractive && !disabled && 'cursor-pointer active:scale-95',
            disabled && 'cursor-default opacity-60',
          )}
          variant="outline"
          size="sm"
        >
          <Plus className="h-3 w-3 shrink-0" />
          <span className="text-xs font-medium">Adicionar método</span>
        </Badge>
      );
    }

    const PayIcon =
      paymentMethodIcons[paymentMethod as keyof typeof paymentMethodIcons];

    if (!PayIcon) return null;

    return (
      <PayIcon
        className={cn(
          'h-5 w-5 shrink-0 transition-transform active:scale-95',
          isExpense && 'text-red-600 dark:text-red-400',
          isIncome && 'text-emerald-600 dark:text-emerald-400',
          isBetweenAccounts && 'text-blue-600 dark:text-blue-400',
          isExpenseForBilling &&
            'text-muted-foreground dark:text-muted-foreground',
          !disabled && 'cursor-pointer hover:scale-110',
        )}
      />
    );
  };

  const currentLabel = paymentMethod
    ? paymentMethodLabel[paymentMethod as keyof typeof paymentMethodLabel]
    : 'Adicionar método de pagamento';

  if (disabled || !onSelect) {
    return (
      <SimpleTooltip label={currentLabel} side="top">
        <div className="flex items-center justify-center">
          {renderContent()}
        </div>
      </SimpleTooltip>
    );
  }

  return (
    <DropdownMenu>
      <SimpleTooltip label={currentLabel} side="top">
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center rounded-sm outline-none focus:ring-2 focus:ring-primary/20">
            {renderContent(true)}
          </button>
        </DropdownMenuTrigger>
      </SimpleTooltip>

      <DropdownMenuContent align="end" className="w-52 space-y-1 p-2">
        {Object.entries(paymentMethodIcons).map(([methodKey, MethodIcon]) => {
          const isSelected = paymentMethod === methodKey;
          const methodTyped = methodKey as PaymentMethod;
          const methodLabel =
            paymentMethodLabel[methodKey as keyof typeof paymentMethodLabel];

          return (
            <DropdownMenuItem
              key={methodKey}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted',
                isSelected && 'bg-muted/50 font-medium',
              )}
              onClick={() => onSelect(methodTyped)}
            >
              <div className="flex items-center gap-2.5">
                <MethodIcon className="h-4 w-4 shrink-0" />
                <span className="text-sm">{methodLabel}</span>
              </div>
              {isSelected && (
                <Check className="h-4 w-4 shrink-0 text-muted-foreground opacity-60" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
