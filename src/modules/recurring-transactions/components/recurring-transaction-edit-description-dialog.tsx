'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TsForm, formFields } from '@/components/ts-form';

const descriptionSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Edite a descrição da recorrência',
  ),
});

interface RecurringTransactionEditDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  onSave: (newDescription: string) => void;
  loading?: boolean;
}

export function RecurringTransactionEditDescriptionDialog({
  open,
  onOpenChange,
  description,
  onSave,
  loading,
}: RecurringTransactionEditDescriptionDialogProps) {
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: description ?? '',
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar descrição da recorrência</DialogTitle>
          <DialogDescription>
            A nova descrição será aplicada a todas as futuras transações geradas
            por este template.
          </DialogDescription>
        </DialogHeader>

        <TsForm
          form={form}
          schema={descriptionSchema}
          onSubmit={async (data) => {
            onSave(data.description);
            onOpenChange(false);
          }}
          renderAfter={() => (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} loading={loading}>
                Salvar
              </Button>
            </DialogFooter>
          )}
        >
          {({ description }) => <>{description}</>}
        </TsForm>
      </DialogContent>
    </Dialog>
  );
}
