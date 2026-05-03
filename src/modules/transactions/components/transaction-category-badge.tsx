import { TransactionCategory } from '@/graphql/graphql';
import {
  ArrowLeftRight,
  BookOpen,
  Bus,
  CircleEllipsis,
  HeartPulse,
  Home,
  LucideProps,
  PartyPopper,
  Plane,
  ShoppingBag,
  TrendingUp,
  Utensils,
  Wallet,
  Zap,
  Check,
  Plus,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { transactionCategoryLabels } from '../transactions-constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const transactionCategoryIcons: Record<
  TransactionCategory,
  ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
> = {
  [TransactionCategory.Education]: BookOpen,
  [TransactionCategory.Entertainment]: PartyPopper,
  [TransactionCategory.FoodDining]: Utensils,
  [TransactionCategory.Healthcare]: HeartPulse,
  [TransactionCategory.Housing]: Home,
  [TransactionCategory.InvestmentIncome]: TrendingUp,
  [TransactionCategory.Other]: CircleEllipsis,
  [TransactionCategory.Salary]: Wallet,
  [TransactionCategory.Shopping]: ShoppingBag,
  [TransactionCategory.Transfer]: ArrowLeftRight,
  [TransactionCategory.Transport]: Bus,
  [TransactionCategory.Travel]: Plane,
  [TransactionCategory.Utilities]: Zap,
} as const;

export const transactionCategoryColors: Record<TransactionCategory, string> = {
  [TransactionCategory.Education]:
    'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20',
  [TransactionCategory.Entertainment]:
    'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20',
  [TransactionCategory.FoodDining]:
    'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20',
  [TransactionCategory.Healthcare]:
    'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20',
  [TransactionCategory.Housing]:
    'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20',
  [TransactionCategory.InvestmentIncome]:
    'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20',
  [TransactionCategory.Other]:
    'bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20 border-zinc-500/20',
  [TransactionCategory.Salary]:
    'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20',
  [TransactionCategory.Shopping]:
    'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 border-pink-500/20',
  [TransactionCategory.Transfer]:
    'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20',
  [TransactionCategory.Transport]:
    'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20',
  [TransactionCategory.Travel]:
    'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-cyan-500/20',
  [TransactionCategory.Utilities]:
    'bg-orange-600/10 text-orange-600 hover:bg-orange-600/20 border-orange-600/20',
} as const;

export function TransactionCategoryBadge({
  category,
  className,
  onSelect,
  disabled = false,
}: {
  category?: TransactionCategory | null;
  className?: string;
  onSelect?: (category: TransactionCategory) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const renderBadge = (
    transactionCategory: TransactionCategory | null | undefined,
    isInteractive = false,
  ) => {
    if (!transactionCategory) {
      return (
        <Badge
          className={cn(
            'gap-1 whitespace-nowrap border border-dashed border-muted-foreground/30 bg-transparent text-muted-foreground transition-all hover:bg-muted/50 hover:text-muted-foreground',
            isInteractive && !disabled && 'cursor-pointer active:scale-95',
            disabled && 'cursor-default opacity-60',
            className,
          )}
          variant="outline"
          size="sm"
        >
          <Plus className="h-3 w-3 shrink-0" />
          <span className="text-xs font-medium">Adicionar categoria</span>
        </Badge>
      );
    }

    const Icon = transactionCategoryIcons[transactionCategory];
    const label = transactionCategoryLabels[transactionCategory];
    const colors = transactionCategoryColors[transactionCategory];

    return (
      <Badge
        className={cn(
          'gap-1.5 whitespace-nowrap border transition-all',
          colors,
          isInteractive && !disabled && 'cursor-pointer active:scale-95',
          disabled && 'cursor-default opacity-60',
          className,
        )}
        variant="outline"
        size="sm"
      >
        <Icon className="h-3 w-3 shrink-0" />
        <span className="font-medium">{label}</span>
      </Badge>
    );
  };

  if (disabled || !onSelect) {
    return renderBadge(category);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="inline-block">{renderBadge(category, true)}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-80 w-52 space-y-1 overflow-y-auto p-2"
      >
        {Object.entries(transactionCategoryIcons).map(
          ([categoryKey, CategoryIcon]) => {
            const categoryTyped = categoryKey as TransactionCategory;
            const isSelected = category === categoryTyped;

            return (
              <DropdownMenuItem
                key={categoryKey}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted',
                  isSelected && 'bg-muted/50',
                )}
                onClick={() => {
                  onSelect(categoryTyped);
                  setOpen(false);
                }}
              >
                <div className="shrink-0">{renderBadge(categoryTyped)}</div>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-muted-foreground opacity-60" />
                )}
              </DropdownMenuItem>
            );
          },
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
