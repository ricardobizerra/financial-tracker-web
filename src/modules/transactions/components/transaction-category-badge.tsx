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
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { transactionCategoryLabels } from '../transactions-constants';

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

export function TransactionCategoryBadge({
  category,
  className,
}: {
  category: TransactionCategory;
  className?: string;
}) {
  const transactionCategoryColors: Record<TransactionCategory, string> = {
    [TransactionCategory.Education]:
      'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
    [TransactionCategory.Entertainment]:
      'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20',
    [TransactionCategory.FoodDining]:
      'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
    [TransactionCategory.Healthcare]:
      'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    [TransactionCategory.Housing]:
      'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20',
    [TransactionCategory.InvestmentIncome]:
      'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
    [TransactionCategory.Other]:
      'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20',
    [TransactionCategory.Salary]:
      'bg-green-500/10 text-green-500 hover:bg-green-500/20',
    [TransactionCategory.Shopping]:
      'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20',
    [TransactionCategory.Transfer]:
      'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20',
    [TransactionCategory.Transport]:
      'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
    [TransactionCategory.Travel]:
      'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20',
    [TransactionCategory.Utilities]:
      'bg-orange-600/10 text-orange-600 hover:bg-orange-600/20',
  } as const;

  const Icon = transactionCategoryIcons[category];
  const label = transactionCategoryLabels[category];
  const colors = transactionCategoryColors[category];

  return (
    <Badge
      className={cn('gap-1 whitespace-nowrap transition-colors', colors, className)}
      variant="secondary"
      size="sm"
    >
      <Icon className="h-3 min-w-3 max-w-3" />
      <p>{label}</p>
    </Badge>
  );
}
