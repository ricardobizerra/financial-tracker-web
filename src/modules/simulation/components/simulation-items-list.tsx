'use client';

import {
  useSimulationStore,
  SimulatedItem,
  SimulatedTransactionItem,
  SimulatedInvestmentItem,
} from '../hooks/use-simulation-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
  Repeat,
  PiggyBank,
} from 'lucide-react';
import { formatCurrency } from '@/lib/formatters/currency';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { OrdenationAccountModel, OrderDirection } from '@/graphql/graphql';
import { ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const FREQUENCY_LABELS: Record<string, string> = {
  WEEKLY: 'Semanal',
  BI_WEEKLY: 'Quinzenal',
  MONTHLY: 'Mensal',
  YEARLY: 'Anual',
};

interface SimulationItemsListProps {
  onEdit: (item: SimulatedItem) => void;
}

export function SimulationItemsList({ onEdit }: SimulationItemsListProps) {
  const { activeScenarioId, scenarios, removeItem } = useSimulationStore();
  const scenario = scenarios.find((s) => s.id === activeScenarioId);
  const items = scenario?.items ?? [];

  const { data: accountsData } = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
  });

  const accounts = accountsData?.accounts.edges?.map((e) => e.node) ?? [];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
        <p className="text-sm">Nenhum item simulado ainda.</p>
        <p className="text-xs">
          Use os botões acima para adicionar transações ou investimentos
          hipotéticos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <SimulationItemRow
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onRemove={() => removeItem(activeScenarioId, item.id)}
          accounts={accounts}
        />
      ))}
    </div>
  );
}

function SimulationItemRow({
  item,
  onEdit,
  onRemove,
  accounts,
}: {
  item: SimulatedItem;
  onEdit: () => void;
  onRemove: () => void;
  accounts: any[];
}) {
  if (item.kind === 'transaction') {
    return (
      <TransactionItemRow
        item={item}
        onEdit={onEdit}
        onRemove={onRemove}
        accounts={accounts}
      />
    );
  }
  return <InvestmentItemRow item={item} onEdit={onEdit} onRemove={onRemove} />;
}

function TransactionItemRow({
  item,
  onEdit,
  onRemove,
  accounts,
}: {
  item: SimulatedTransactionItem;
  onEdit: () => void;
  onRemove: () => void;
  accounts: any[];
}) {
  const isIncome = item.type === 'INCOME';
  const isBetweenAccounts = item.type === 'BETWEEN_ACCOUNTS';
  const date = new Date(item.date + 'T00:00:00');

  const sourceAccount = accounts.find((a) => a.id === item.accountId);
  const destinyAccount = accounts.find((a) => a.id === item.destinyAccountId);

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-muted/30',
        isBetweenAccounts
          ? 'border-blue-500/30'
          : isIncome
            ? 'border-emerald-500/30'
            : 'border-red-500/30',
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isBetweenAccounts
            ? 'bg-blue-500/10 text-blue-500'
            : isIncome
              ? 'bg-emerald-500/10 text-emerald-600'
              : 'bg-red-500/10 text-red-500',
        )}
      >
        {item.isRecurring ? (
          <Repeat className="h-4 w-4" />
        ) : isBetweenAccounts ? (
          <ArrowRightLeft className="h-4 w-4" />
        ) : isIncome ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {isBetweenAccounts ? (
          <div className="mb-0.5 flex items-center gap-2">
            <span className="max-w-[40%] truncate text-sm font-medium">
              {sourceAccount?.name ?? 'Conta'}
            </span>
            <ArrowRightLeft className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span className="max-w-[40%] truncate text-sm font-medium">
              {destinyAccount?.name ?? 'Conta'}
            </span>
          </div>
        ) : (
          <p className="mb-0.5 truncate text-sm font-medium">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {format(date, "dd 'de' MMM", { locale: ptBR })}
          </span>
          {item.isRecurring && item.recurrenceFrequency && (
            <Badge variant="secondary" className="h-4 px-1 text-[10px]">
              {FREQUENCY_LABELS[item.recurrenceFrequency] ??
                item.recurrenceFrequency}
            </Badge>
          )}
          <Badge
            variant="outline"
            className="h-4 border-dashed border-amber-500/60 px-1 text-[10px] text-amber-600"
          >
            Simulado
          </Badge>
        </div>
      </div>

      <span
        className={cn(
          'shrink-0 text-sm font-semibold',
          isBetweenAccounts
            ? 'text-foreground'
            : isIncome
              ? 'text-emerald-600'
              : 'text-red-500',
        )}
      >
        {isBetweenAccounts ? '' : isIncome ? '+' : '-'}
        {formatCurrency(item.amount)}
      </span>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onEdit}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function InvestmentItemRow({
  item,
  onEdit,
  onRemove,
}: {
  item: SimulatedInvestmentItem;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const date = new Date(item.startDate + 'T00:00:00');

  return (
    <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 px-3 py-2.5 transition-colors hover:bg-muted/30">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
        <PiggyBank className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {format(date, "dd 'de' MMM", { locale: ptBR })}
          </span>
          <Badge variant="secondary" className="h-4 px-1 text-[10px]">
            {item.regime} · {item.annualRate}% a.a.
          </Badge>
          <Badge
            variant="outline"
            className="h-4 border-dashed border-amber-500/60 px-1 text-[10px] text-amber-600"
          >
            Simulado
          </Badge>
        </div>
      </div>

      <span className="shrink-0 text-sm font-semibold text-blue-500">
        {formatCurrency(item.initialAmount)}
      </span>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onEdit}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
