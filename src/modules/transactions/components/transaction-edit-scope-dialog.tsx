'use client';

import { UpdateRecurringScope } from '@/graphql/graphql';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface TransactionEditScopeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectScope: (scope: UpdateRecurringScope) => void;
}

export function TransactionEditScopeDialog({
  open,
  onOpenChange,
  onSelectScope,
}: TransactionEditScopeDialogProps) {
  const [selectedScope, setSelectedScope] = useState<UpdateRecurringScope>(
    UpdateRecurringScope.ThisOnly,
  );

  const handleConfirm = () => {
    onSelectScope(selectedScope);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Editar transação recorrente</DialogTitle>
          <DialogDescription>
            Esta transação faz parte de uma recorrência. Escolha o escopo da
            edição:
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selectedScope}
          onValueChange={(value) =>
            setSelectedScope(value as UpdateRecurringScope)
          }
          className="space-y-3"
        >
          <div className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem
              value={UpdateRecurringScope.ThisOnly}
              id="this-only"
            />
            <Label htmlFor="this-only" className="flex-1 cursor-pointer">
              <p className="font-medium">Apenas esta</p>
              <p className="text-sm text-muted-foreground">
                Edita somente esta transação
              </p>
            </Label>
          </div>

          <div className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem
              value={UpdateRecurringScope.ThisAndFuture}
              id="this-and-future"
            />
            <Label htmlFor="this-and-future" className="flex-1 cursor-pointer">
              <p className="font-medium">Esta e próximas</p>
              <p className="text-sm text-muted-foreground">
                Edita esta e todas as transações futuras planejadas
              </p>
            </Label>
          </div>

          <div className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem
              value={UpdateRecurringScope.AllPlanned}
              id="all-planned"
            />
            <Label htmlFor="all-planned" className="flex-1 cursor-pointer">
              <p className="font-medium">Todas planejadas</p>
              <p className="text-sm text-muted-foreground">
                Edita todas as transações planejadas desta recorrência
              </p>
            </Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
