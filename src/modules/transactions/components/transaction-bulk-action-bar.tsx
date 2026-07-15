import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, Trash2, Tag, Loader2, Check, CheckCircle, Wallet, MoreHorizontal, Calendar, CreditCard } from 'lucide-react';
import { TransactionCategory, TransactionStatus, PaymentMethod } from '@/graphql/graphql';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  transactionCategoryIcons,
  transactionCategoryColors,
} from './transaction-category-badge';
import { transactionCategoryLabels } from '../transactions-constants';
import { Badge } from '@/components/ui/badge';

interface TransactionBulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  onCategorize: (category: TransactionCategory) => void;
  onUpdateStatus: (status: TransactionStatus) => void;
  onUpdateAccount: (accountId: string) => void;
  onUpdateDate: (date: Date) => void;
  onUpdatePaymentMethod: (method: PaymentMethod) => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export function TransactionBulkActionBar({
  selectedCount,
  onClear,
  onCategorize,
  onUpdateStatus,
  onUpdateAccount,
  onUpdateDate,
  onUpdatePaymentMethod,
  onDelete,
  isLoading = false,
}: TransactionBulkActionBarProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  // Add state for date and payment method popovers if needed, or put them inside the More menu directly.

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 duration-200 animate-in fade-in zoom-in-95 slide-in-from-bottom-10">
      <div className="flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-4 py-2.5 text-background shadow-lg shadow-black/20 ring-1 ring-border/10 dark:shadow-black/40">
        <div className="flex items-center gap-2 pl-2 pr-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/20 text-xs font-bold tabular-nums">
            {selectedCount}
          </span>
          <span className="text-sm font-medium">selecionadas</span>
        </div>

        <div className="h-4 w-px bg-background/20" />

        <DropdownMenu open={categoryOpen} onOpenChange={setCategoryOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full text-background hover:bg-background/20 hover:text-background disabled:opacity-50"
              disabled={isLoading}
            >
              <Tag className="mr-2 h-4 w-4" />
              Categorizar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="max-h-80 w-52 space-y-1 overflow-y-auto p-2"
          >
            {Object.entries(transactionCategoryIcons).map(
              ([categoryKey, CategoryIcon]) => {
                const categoryTyped = categoryKey as TransactionCategory;
                const label = transactionCategoryLabels[categoryTyped];
                const colors = transactionCategoryColors[categoryTyped];

                return (
                  <DropdownMenuItem
                    key={categoryKey}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted"
                    onClick={() => {
                      onCategorize(categoryTyped);
                      setCategoryOpen(false);
                    }}
                  >
                    <div className="shrink-0">
                      <Badge
                        className={cn(
                          'gap-1.5 whitespace-nowrap border',
                          colors,
                        )}
                        variant="outline"
                        size="sm"
                      >
                        <CategoryIcon className="h-3 w-3 shrink-0" />
                        <span className="font-medium">{label}</span>
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                );
              },
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu open={statusOpen} onOpenChange={setStatusOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full text-background hover:bg-background/20 hover:text-background disabled:opacity-50"
              disabled={isLoading}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-40 p-2">
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 rounded-md transition-colors"
              onClick={() => {
                onUpdateStatus(TransactionStatus.Completed);
                setStatusOpen(false);
              }}
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Marcar como Pago</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 rounded-md transition-colors"
              onClick={() => {
                onUpdateStatus(TransactionStatus.Planned);
                setStatusOpen(false);
              }}
            >
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>Marcar como Pendente</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Note: In a real app, Account selector would use the TransactionAccountSelector component properly positioned inside a Dropdown or Popover, but for simplicity here we add a Button that could trigger it. Let's just add a quick placeholder dropdown or use the More menu for Account too to save space if needed. */}
        <DropdownMenu open={moreOpen} onOpenChange={setMoreOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full text-background hover:bg-background/20 hover:text-background disabled:opacity-50"
              disabled={isLoading}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56 p-2">
            {/* Payment Method Sub-actions */}
            <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Método de Pagamento
            </div>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                onUpdatePaymentMethod(PaymentMethod.CreditCard);
                setMoreOpen(false);
              }}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Cartão de Crédito
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                onUpdatePaymentMethod(PaymentMethod.Pix);
                setMoreOpen(false);
              }}
            >
              Pix
            </DropdownMenuItem>
            
            {/* Quick Dates */}
            <div className="mb-2 mt-4 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Mover Data
            </div>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                onUpdateDate(new Date());
                setMoreOpen(false);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Para Hoje
            </DropdownMenuItem>
            
            {/* Note: Account should ideally open a nested menu or dialog. We will trigger onUpdateAccount with a prompt or similar logic in parent, or add a nested dialog here. */}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 rounded-full text-background hover:bg-destructive/90 hover:text-white disabled:opacity-50"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Excluir
        </Button>

        <div className="h-4 w-px bg-background/20" />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-background hover:bg-background/20 hover:text-background"
          onClick={onClear}
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
