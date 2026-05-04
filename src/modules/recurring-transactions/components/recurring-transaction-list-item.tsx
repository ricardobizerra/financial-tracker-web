'use client';

import React, { useState } from 'react';
import {
  RecurringTransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
} from '@/graphql/graphql';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  Trash2,
  History,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TransactionAccountDisplay } from '@/modules/transactions/components/transaction-account-display';
import { TransactionAmountDisplay } from '@/modules/transactions/components/transaction-amount-display';
import { TransactionTypeIcon } from '@/modules/transactions/components/transaction-type-icon';
import { TransactionListItem } from '@/modules/transactions/components/transaction-list-item';
import { TransactionFrequencyBadge } from './transaction-frequency-badge';
import { useRecurringTransactionMutations } from '../hooks/use-recurring-transaction-mutations';
import { RecurringTransactionEditDescriptionDialog } from './recurring-transaction-edit-description-dialog';

import { SimpleTooltip } from '@/components/simple-tooltip';

interface RecurringTransactionListItemProps {
  recurring: RecurringTransactionFragmentFragment;
}

export function RecurringTransactionListItem({
  recurring,
}: RecurringTransactionListItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [descriptionEditOpen, setDescriptionEditOpen] = useState(false);

  const {
    updateRecurringTransaction,
    deleteRecurringTransaction,
    updateLoading,
  } = useRecurringTransactionMutations();

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [secondConfirmOpen, setSecondConfirmOpen] = useState(false);
  const [deleteAllTransactions, setDeleteAllTransactions] = useState(false);

  const transactions = recurring.transactions || [];

  // Hybrid Focus: All PLANNED + last 3 COMPLETED
  const plannedTransactions = transactions.filter(
    (t) => t.status === TransactionStatus.Planned,
  );
  const completedTransactions = transactions
    .filter((t) => t.status === TransactionStatus.Completed)
    .slice(0, 3);

  const subListTransactions = [
    ...plannedTransactions,
    ...completedTransactions,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleUpdateAccount = (
    accountId: string,
    type: 'source' | 'destiny',
  ) => {
    updateRecurringTransaction(recurring.id, {
      [type === 'source' ? 'sourceAccountId' : 'destinyAccountId']: accountId,
    });
  };

  const handleUpdateAmount = (newAmount: number) => {
    updateRecurringTransaction(recurring.id, {
      estimatedAmount: newAmount,
    });
  };

  const handleUpdateDescription = (newDescription: string) => {
    updateRecurringTransaction(recurring.id, {
      description: newDescription,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div
        className={cn(
          'overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md dark:bg-zinc-900/50',
          isOpen &&
            'border-primary/20 bg-primary/5 shadow-sm ring-1 ring-primary/10',
        )}
      >
        {/* Card Header / Trigger */}
        <div className="flex items-center gap-4 p-4">
          <div className="flex flex-1 items-center gap-4">
            <TransactionTypeIcon type={recurring.type as TransactionType} />

            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-zinc-500 transition-transform duration-300',
                    isOpen && 'rotate-180 text-primary',
                  )}
                />
                <span className="sr-only">Alternar detalhes</span>
              </Button>
            </CollapsibleTrigger>

            <div className="flex flex-col gap-1">
              <div
                className="flex w-fit cursor-pointer items-center gap-2 transition-opacity hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  setDescriptionEditOpen(true);
                }}
              >
                <h3 className="text-base font-semibold leading-none tracking-tight">
                  {recurring.description}
                </h3>
              </div>

              <TransactionAccountDisplay
                transaction={recurring as any}
                onUpdateAccount={handleUpdateAccount}
              />
            </div>
          </div>

          {/* Middle: Frequency Badge */}
          <div className="hidden items-center gap-3 md:flex">
            <TransactionFrequencyBadge
              frequency={recurring.frequency}
              dayMode={recurring.dayMode}
              dayOfMonth={recurring.dayOfMonth}
              dayOfWeek={recurring.dayOfWeek}
              weekOfMonth={recurring.weekOfMonth}
              monthOfYear={recurring.monthOfYear}
            />
          </div>

          {/* Right: Amount & Actions */}
          <div className="flex items-center gap-6">
            <TransactionAmountDisplay
              amount={recurring.estimatedAmount}
              type={recurring.type as TransactionType}
              onUpdate={handleUpdateAmount}
            />

            <div className="flex items-center gap-2">
              <AlertDialog
                open={deleteAlertOpen}
                onOpenChange={setDeleteAlertOpen}
              >
                <SimpleTooltip label="Remover recorrência" side="top">
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
                    </Button>
                  </AlertDialogTrigger>
                </SimpleTooltip>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Remover recorrência{' '}
                      <span className="font-bold">{recurring.description}</span>
                      ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação irá interromper a geração de futuras transações.
                      As transações já geradas serão mantidas em seu histórico
                      por padrão.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="delete-all"
                      checked={deleteAllTransactions}
                      onCheckedChange={setDeleteAllTransactions}
                    />
                    <Label htmlFor="delete-all" className="text-sm font-normal">
                      Excluir também todas as transações já geradas
                    </Label>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        if (deleteAllTransactions) {
                          e.preventDefault();
                          setDeleteAlertOpen(false);
                          setTimeout(() => setSecondConfirmOpen(true), 100);
                        } else {
                          deleteRecurringTransaction(recurring.id, false);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Second Confirmation Dialog */}
              <AlertDialog
                open={secondConfirmOpen}
                onOpenChange={setSecondConfirmOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-400">
                      Confirmar exclusão total
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      Você tem certeza que deseja excluir esta recorrência{' '}
                      <span className="font-bold">
                        e TODAS as transações que já foram geradas
                      </span>{' '}
                      por ela? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        deleteRecurringTransaction(recurring.id, true)
                      }
                      className="bg-red-700 hover:bg-red-800"
                    >
                      Sim, excluir tudo
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Card Content (Sub-list) */}
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t bg-zinc-50/50 p-4 pt-3 dark:bg-zinc-950/20">
            <div className="mb-3 flex items-center gap-2 px-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              <History className="h-3 w-3" />
              Histórico e Futuras Transações
            </div>

            <div className="space-y-2 border-l-2 border-zinc-100 pl-4 dark:border-zinc-800">
              {subListTransactions.length > 0 ? (
                subListTransactions.map((transaction) => (
                  <TransactionListItem
                    key={transaction.id}
                    transaction={transaction as any}
                    compact
                    hideAccount={true}
                  />
                ))
              ) : (
                <p className="py-2 text-xs italic text-muted-foreground">
                  Nenhuma transação gerada ainda.
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>

      <RecurringTransactionEditDescriptionDialog
        open={descriptionEditOpen}
        onOpenChange={setDescriptionEditOpen}
        description={recurring.description}
        onSave={handleUpdateDescription}
        loading={updateLoading}
      />
    </Collapsible>
  );
}
