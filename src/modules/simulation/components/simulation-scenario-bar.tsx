'use client';

import { useSimulationStore, Scenario } from '../hooks/use-simulation-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Copy,
  Trash2,
  FlaskConical,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export function SimulationScenarioBar() {
  const {
    scenarios,
    activeScenarioId,
    setActiveScenario,
    addScenario,
    deleteScenario,
    renameScenario,
    duplicateScenario,
  } = useSimulationStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const startEdit = (s: Scenario) => {
    setEditingId(s.id);
    setEditingName(s.name);
  };

  const commitEdit = () => {
    if (editingId && editingName.trim()) {
      renameScenario(editingId, editingName.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <FlaskConical className="h-4 w-4" />
          <span className="hidden sm:inline">Cenários:</span>
        </div>

        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
          {scenarios.map((s) => {
            const isActive = s.id === activeScenarioId;
            const isEditing = editingId === s.id;

            return (
              <div
                key={s.id}
                className={cn(
                  'group flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm transition-all',
                  isActive
                    ? 'border-primary bg-primary/10 font-medium text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50',
                )}
                onClick={() => !isEditing && setActiveScenario(s.id)}
              >
                {isEditing ? (
                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="h-6 w-32 px-1.5 py-0 text-xs"
                    />
                    <button
                      onClick={commitEdit}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="max-w-[120px] truncate">{s.name}</span>

                    {isActive && (
                      <div className="ml-1 hidden items-center gap-0.5 group-hover:flex">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(s);
                              }}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Renomear</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateScenario(s.id);
                              }}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Duplicar cenário</TooltipContent>
                        </Tooltip>

                        {scenarios.length > 1 && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Excluir cenário?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  O cenário &quot;{s.name}&quot; e todos os seus
                                  itens simulados serão removidos
                                  permanentemente.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteScenario(s.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5"
          onClick={addScenario}
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Novo cenário</span>
        </Button>
      </div>
    </TooltipProvider>
  );
}
