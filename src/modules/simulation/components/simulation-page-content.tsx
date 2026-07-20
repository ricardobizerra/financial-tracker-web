'use client';

import { SimulationScenarioBar } from './simulation-scenario-bar';
import { SimulationControls } from './simulation-controls';
import { SimulationDrawer } from './simulation-drawer';
import { SimulationChart } from './simulation-chart';
import { SimulationSummary } from './simulation-summary';
import { SimulationItemsList } from './simulation-items-list';
import {
  useSimulationStore,
  SimulatedItem,
} from '../hooks/use-simulation-store';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { SimulationTransactionForm } from './simulation-transaction-form';
import { SimulationInvestmentForm } from './simulation-investment-form';

export function SimulationPageContent() {
  const { activeScenarioId, updateItem } = useSimulationStore();
  const [editingItem, setEditingItem] = useState<SimulatedItem | null>(null);

  const handleEditSubmitTransaction = (
    data: Omit<
      import('../hooks/use-simulation-store').SimulatedTransactionItem,
      'id'
    >,
  ) => {
    if (editingItem) {
      updateItem(activeScenarioId, {
        ...data,
        id: editingItem.id,
      } as SimulatedItem);
    }
    setEditingItem(null);
  };

  const handleEditSubmitInvestment = (
    data: Omit<
      import('../hooks/use-simulation-store').SimulatedInvestmentItem,
      'id'
    >,
  ) => {
    if (editingItem) {
      updateItem(activeScenarioId, {
        ...data,
        id: editingItem.id,
      } as SimulatedItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Scenario tabs */}
      <SimulationScenarioBar />

      {/* Date range + add buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SimulationControls />
        <SimulationDrawer />
      </div>

      {/* Summary cards */}

      <SimulationSummary />

      {/* Simulation chart */}
      <SimulationChart />

      {/* Items list */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">
          Itens do cenário
        </h2>
        <SimulationItemsList onEdit={(item) => setEditingItem(item)} />
      </div>

      {/* Edit drawer */}
      <Sheet
        open={editingItem !== null}
        onOpenChange={(open) => !open && setEditingItem(null)}
      >
        <SheetContent
          side="right"
          className="w-full sm:w-[420px] sm:max-w-[420px]"
        >
          <SheetHeader>
            <SheetTitle>Editar item simulado</SheetTitle>
            <SheetDescription>
              Modifique os dados deste item hipotético.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 overflow-y-auto">
            {editingItem?.kind === 'transaction' && (
              <SimulationTransactionForm
                defaultValues={editingItem}
                onSubmit={handleEditSubmitTransaction}
                onCancel={() => setEditingItem(null)}
              />
            )}
            {editingItem?.kind === 'investment' && (
              <SimulationInvestmentForm
                defaultValues={editingItem}
                onSubmit={handleEditSubmitInvestment}
                onCancel={() => setEditingItem(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
