'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TransactionItemType = 'INCOME' | 'EXPENSE' | 'BETWEEN_ACCOUNTS';
export type RecurrenceFrequency = 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'YEARLY';
export type InvestmentRegime = 'CDI' | 'POUPANCA';

export interface SimulatedTransactionItem {
  id: string;
  kind: 'transaction';
  description: string;
  amount: number;
  type: TransactionItemType;
  date: string; // ISO date string
  isRecurring: boolean;
  recurrenceFrequency?: RecurrenceFrequency;
  recurrenceEndDate?: string;
  accountId: string;
  destinyAccountId?: string;
}

export interface SimulatedInvestmentItem {
  id: string;
  kind: 'investment';
  description: string;
  initialAmount: number;
  annualRate: number;
  regime: InvestmentRegime;
  startDate: string; // ISO date string
  accountId: string;
}

export type SimulatedItem = SimulatedTransactionItem | SimulatedInvestmentItem;

export interface Scenario {
  id: string;
  name: string;
  dateRange: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  items: SimulatedItem[];
}

// ─── Default date range (today → today + 1 month) ────────────────────────────

function defaultDateRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
}

function createDefaultScenario(): Scenario {
  return {
    id: crypto.randomUUID(),
    name: 'Cenário 1',
    dateRange: defaultDateRange(),
    items: [],
  };
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface SimulationState {
  scenarios: Scenario[];
  activeScenarioId: string;

  // Scenario management
  addScenario: () => void;
  deleteScenario: (id: string) => void;
  renameScenario: (id: string, name: string) => void;
  setActiveScenario: (id: string) => void;
  duplicateScenario: (id: string) => void;

  // Date range
  setDateRange: (scenarioId: string, start: string, end: string) => void;

  // Item management
  addItem: (scenarioId: string, item: Omit<SimulatedItem, 'id'>) => void;
  updateItem: (scenarioId: string, item: SimulatedItem) => void;
  removeItem: (scenarioId: string, itemId: string) => void;

  // Getters
  getActiveScenario: () => Scenario | undefined;
}

const defaultScenario = createDefaultScenario();

export const useSimulationStore = create<SimulationState>()(
  persist(
    (set, get) => ({
      scenarios: [defaultScenario],
      activeScenarioId: defaultScenario.id,

      addScenario: () => {
        const { scenarios } = get();
        const newScenario: Scenario = {
          id: crypto.randomUUID(),
          name: `Cenário ${scenarios.length + 1}`,
          dateRange: defaultDateRange(),
          items: [],
        };
        set((state) => ({
          scenarios: [...state.scenarios, newScenario],
          activeScenarioId: newScenario.id,
        }));
      },

      deleteScenario: (id) => {
        const { scenarios, activeScenarioId } = get();
        if (scenarios.length === 1) return; // keep at least one
        const remaining = scenarios.filter((s) => s.id !== id);
        const newActiveId =
          activeScenarioId === id ? remaining[0]?.id : activeScenarioId;
        set({ scenarios: remaining, activeScenarioId: newActiveId });
      },

      renameScenario: (id, name) => {
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === id ? { ...s, name } : s,
          ),
        }));
      },

      setActiveScenario: (id) => {
        set({ activeScenarioId: id });
      },

      duplicateScenario: (id) => {
        const { scenarios } = get();
        const source = scenarios.find((s) => s.id === id);
        if (!source) return;
        const copy: Scenario = {
          ...source,
          id: crypto.randomUUID(),
          name: `${source.name} (cópia)`,
          items: source.items.map((item) => ({
            ...item,
            id: crypto.randomUUID(),
          })),
        };
        set((state) => ({
          scenarios: [...state.scenarios, copy],
          activeScenarioId: copy.id,
        }));
      },

      setDateRange: (scenarioId, start, end) => {
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === scenarioId ? { ...s, dateRange: { start, end } } : s,
          ),
        }));
      },

      addItem: (scenarioId, item) => {
        const newItem = { ...item, id: crypto.randomUUID() } as SimulatedItem;
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === scenarioId ? { ...s, items: [...s.items, newItem] } : s,
          ),
        }));
      },

      updateItem: (scenarioId, item) => {
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === scenarioId
              ? {
                  ...s,
                  items: s.items.map((i) => (i.id === item.id ? item : i)),
                }
              : s,
          ),
        }));
      },

      removeItem: (scenarioId, itemId) => {
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === scenarioId
              ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
              : s,
          ),
        }));
      },

      getActiveScenario: () => {
        const { scenarios, activeScenarioId } = get();
        return scenarios.find((s) => s.id === activeScenarioId);
      },
    }),
    {
      name: 'financial-tracker:simulations',
    },
  ),
);
