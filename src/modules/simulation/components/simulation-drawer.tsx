'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowUp,
  ArrowDown,
  PiggyBank,
  Plus,
  ArrowRightLeft,
} from 'lucide-react';
import {
  useSimulationStore,
  SimulatedItem,
} from '../hooks/use-simulation-store';
import { SimulationTransactionForm } from './simulation-transaction-form';
import { SimulationInvestmentForm } from './simulation-investment-form';
import { SimulationItemsList } from './simulation-items-list';

type DrawerMode =
  | 'list'
  | 'add-transaction-income'
  | 'add-transaction-expense'
  | 'add-transaction-between-accounts'
  | 'add-investment'
  | 'edit';

export function SimulationDrawer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DrawerMode>('list');
  const [editingItem, setEditingItem] = useState<SimulatedItem | null>(null);

  const { activeScenarioId, addItem, updateItem } = useSimulationStore();

  const openAdd = (type: DrawerMode) => {
    setMode(type);
    setEditingItem(null);
    setOpen(true);
  };

  const openEdit = (item: SimulatedItem) => {
    setEditingItem(item);
    setMode('edit');
    setOpen(true);
  };

  const handleTransactionSubmit = (
    data: Omit<
      import('../hooks/use-simulation-store').SimulatedTransactionItem,
      'id'
    >,
  ) => {
    if (mode === 'edit' && editingItem) {
      updateItem(activeScenarioId, {
        ...data,
        id: editingItem.id,
      } as SimulatedItem);
    } else {
      addItem(activeScenarioId, data);
    }
    setMode('list');
    if (mode !== 'edit') setOpen(false);
    else setOpen(false);
  };

  const handleInvestmentSubmit = (
    data: Omit<
      import('../hooks/use-simulation-store').SimulatedInvestmentItem,
      'id'
    >,
  ) => {
    if (mode === 'edit' && editingItem) {
      updateItem(activeScenarioId, {
        ...data,
        id: editingItem.id,
      } as SimulatedItem);
    } else {
      addItem(activeScenarioId, data);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setMode('list');
    if (mode !== 'list') setOpen(false);
  };

  const getTitle = () => {
    switch (mode) {
      case 'add-transaction-income':
        return 'Simular Receita';
      case 'add-transaction-expense':
        return 'Simular Despesa';
      case 'add-transaction-between-accounts':
        return 'Simular Transferência';
      case 'add-investment':
        return 'Simular Investimento';
      case 'edit':
        return 'Editar Item Simulado';
      default:
        return 'Itens Simulados';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'add-transaction-income':
        return 'Adicione uma receita hipotética para ver o impacto no seu saldo.';
      case 'add-transaction-expense':
        return 'Adicione uma despesa hipotética para ver o impacto no seu saldo.';
      case 'add-transaction-between-accounts':
        return 'Simule uma transferência de recursos entre duas contas.';
      case 'add-investment':
        return 'Simule um aporte e veja como ele afetaria seu saldo no período.';
      case 'edit':
        return 'Modifique o item simulado.';
      default:
        return 'Itens hipotéticos adicionados a este cenário.';
    }
  };

  return (
    <>
      {/* Trigger buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-emerald-500/40 text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          onClick={() => openAdd('add-transaction-income')}
        >
          <Plus className="h-3.5 w-3.5" />
          <ArrowUp className="h-3.5 w-3.5" />
          Receita
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-red-500/40 text-red-500 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={() => openAdd('add-transaction-expense')}
        >
          <Plus className="h-3.5 w-3.5" />
          <ArrowDown className="h-3.5 w-3.5" />
          Despesa
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-blue-500/40 text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          onClick={() => openAdd('add-transaction-between-accounts')}
        >
          <Plus className="h-3.5 w-3.5" />
          <ArrowRightLeft className="h-3.5 w-3.5" />
          Transferência
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-blue-500/40 text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
          onClick={() => openAdd('add-investment')}
        >
          <Plus className="h-3.5 w-3.5" />
          <PiggyBank className="h-3.5 w-3.5" />
          Investimento
        </Button>
      </div>

      {/* Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[420px] sm:max-w-[420px]"
        >
          <SheetHeader>
            <SheetTitle>{getTitle()}</SheetTitle>
            <SheetDescription>{getDescription()}</SheetDescription>
          </SheetHeader>

          <div className="mt-4 overflow-y-auto pr-1">
            {mode === 'list' && (
              <>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-emerald-500/40 text-emerald-600"
                    onClick={() => setMode('add-transaction-income')}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Receita
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-red-500/40 text-red-500"
                    onClick={() => setMode('add-transaction-expense')}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Despesa
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-blue-500/40 text-blue-500"
                    onClick={() => setMode('add-investment')}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Investimento
                  </Button>
                </div>
                <SimulationItemsList onEdit={openEdit} />
              </>
            )}

            {(mode === 'add-transaction-income' ||
              mode === 'add-transaction-expense' ||
              mode === 'add-transaction-between-accounts') && (
              <SimulationTransactionForm
                defaultValues={{
                  type:
                    mode === 'add-transaction-income'
                      ? 'INCOME'
                      : mode === 'add-transaction-expense'
                        ? 'EXPENSE'
                        : 'BETWEEN_ACCOUNTS',
                }}
                onSubmit={handleTransactionSubmit}
                onCancel={handleCancel}
              />
            )}

            {mode === 'add-investment' && (
              <SimulationInvestmentForm
                onSubmit={handleInvestmentSubmit}
                onCancel={handleCancel}
              />
            )}

            {mode === 'edit' && editingItem && (
              <>
                {editingItem.kind === 'transaction' ? (
                  <SimulationTransactionForm
                    defaultValues={editingItem}
                    onSubmit={handleTransactionSubmit}
                    onCancel={handleCancel}
                  />
                ) : (
                  <SimulationInvestmentForm
                    defaultValues={editingItem}
                    onSubmit={handleInvestmentSubmit}
                    onCancel={handleCancel}
                  />
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
