'use client';

import React, { useState } from 'react';
import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { OrdenationAccountModel, OrderDirection } from '@/graphql/graphql';
import { ArrowRightLeft } from 'lucide-react';
import {
  SimulatedTransactionItem,
  TransactionItemType,
} from '../hooks/use-simulation-store';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ─── Schema ──────────────────────────────────────────────────────────────────
// Optional recurrence fields are handled with raw FormField below TsForm
// to avoid ts-react/form typing issues with optional formFields.select

const transactionSchema = z.object({
  description: formFields.text.describe(
    'Descrição * // Ex: Freelance de junho',
  ),
  amount: formFields.currency.describe('Valor * // '),
  date: formFields.date.describe('Data * // '),
  accountId: formFields.select.describe('Conta * // Selecione a conta'),
});

type TsFormData = z.infer<typeof transactionSchema>;

// Full schema (for useForm) includes optional recurrence fields
const fullSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  amount: z.number().positive('Valor deve ser positivo'),
  date: z.date(),
  accountId: z.object({ value: z.string(), label: z.string() }),
  destinyAccountId: z
    .object({ value: z.string(), label: z.string() })
    .optional(),
  isRecurring: z.boolean(),
  recurrenceFrequency: z
    .enum(['WEEKLY', 'BI_WEEKLY', 'MONTHLY', 'YEARLY'])
    .optional(),
  recurrenceEndDate: z.date().optional(),
});

type FormData = z.infer<typeof fullSchema>;

const FREQUENCY_OPTIONS = [
  { value: 'WEEKLY', label: 'Semanal' },
  { value: 'BI_WEEKLY', label: 'Quinzenal' },
  { value: 'MONTHLY', label: 'Mensal' },
  { value: 'YEARLY', label: 'Anual' },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SimulationTransactionFormProps {
  defaultValues?: Partial<SimulatedTransactionItem>;
  onSubmit: (data: Omit<SimulatedTransactionItem, 'id'>) => void;
  onCancel: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SimulationTransactionForm({
  defaultValues,
  onSubmit,
  onCancel,
}: SimulationTransactionFormProps) {
  const initialType = defaultValues?.type ?? 'EXPENSE';
  const [transactionType, setTransactionType] =
    useState<TransactionItemType>(initialType);

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      description: defaultValues?.description ?? '',
      amount: defaultValues?.amount != null ? defaultValues.amount : undefined,
      date: defaultValues?.date
        ? new Date(defaultValues.date + 'T00:00:00')
        : new Date(),
      accountId: defaultValues?.accountId
        ? { value: defaultValues.accountId, label: '' }
        : undefined,
      isRecurring: defaultValues?.isRecurring ?? false,
      recurrenceFrequency: defaultValues?.recurrenceFrequency,
      recurrenceEndDate: defaultValues?.recurrenceEndDate
        ? new Date(defaultValues.recurrenceEndDate + 'T00:00:00')
        : undefined,
    },
  });

  const isRecurring = useWatch({ control: form.control, name: 'isRecurring' });

  const { data: accountsData } = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
  });

  const accountOptions =
    accountsData?.accounts.edges?.map((e) => ({
      value: e.node.id,
      label: e.node.name,
    })) ?? [];

  const handleSubmit = () => {
    const data = form.getValues();

    if (transactionType === 'BETWEEN_ACCOUNTS' && !data.destinyAccountId) {
      form.setError('destinyAccountId', {
        type: 'manual',
        message: 'Conta destino é obrigatória para transferências',
      });
      return;
    }

    onSubmit({
      kind: 'transaction',
      description: data.description,
      amount: data.amount ?? 0,
      type: transactionType,
      date: data.date.toISOString().split('T')[0],
      accountId: data.accountId.value,
      destinyAccountId: data.destinyAccountId?.value,
      isRecurring: data.isRecurring ?? false,
      recurrenceFrequency: data.isRecurring
        ? (data.recurrenceFrequency as SimulatedTransactionItem['recurrenceFrequency'])
        : undefined,
      recurrenceEndDate:
        data.isRecurring && data.recurrenceEndDate
          ? data.recurrenceEndDate.toISOString().split('T')[0]
          : undefined,
    });
  };

  return (
    <TsForm
      form={form as any}
      schema={transactionSchema}
      props={{
        accountId: { options: accountOptions },
      }}
      onSubmit={handleSubmit as any}
      renderBefore={() => (
        <div className="flex gap-2 pb-2">
          <Button
            type="button"
            variant={transactionType === 'INCOME' ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'flex-1',
              transactionType === 'INCOME' &&
                'bg-emerald-600 hover:bg-emerald-700',
            )}
            onClick={() => setTransactionType('INCOME')}
          >
            Receita
          </Button>
          <Button
            type="button"
            variant={transactionType === 'EXPENSE' ? 'default' : 'outline'}
            size="sm"
            className={cn(
              'flex-1',
              transactionType === 'EXPENSE' && 'bg-red-600 hover:bg-red-700',
            )}
            onClick={() => setTransactionType('EXPENSE')}
          >
            Despesa
          </Button>
          <Button
            type="button"
            variant={
              transactionType === 'BETWEEN_ACCOUNTS' ? 'default' : 'outline'
            }
            size="sm"
            className={cn(
              'flex-1',
              transactionType === 'BETWEEN_ACCOUNTS' &&
                'bg-blue-600 hover:bg-blue-700',
            )}
            onClick={() => setTransactionType('BETWEEN_ACCOUNTS')}
          >
            Transferência
          </Button>
        </div>
      )}
      renderAfter={() => (
        <>
          {/* Conditionally rendered destiny account for transfers */}
          {transactionType === 'BETWEEN_ACCOUNTS' && (
            <div className="pb-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="destinyAccountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conta Destino *</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          const option = accountOptions.find(
                            (o) => o.value === val,
                          );
                          field.onChange(
                            option
                              ? { value: option.value, label: option.label }
                              : undefined,
                          );
                        }}
                        defaultValue={field.value?.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a conta destino" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accountOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          )}

          {/* Recurrence toggle + conditional fields rendered outside TsForm schema */}
          <Form {...form}>
            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel className="text-sm font-medium">
                      Recorrente
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Repetir automaticamente no período
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isRecurring && (
              <>
                <FormField
                  control={form.control}
                  name="recurrenceFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequência</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FREQUENCY_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recurrenceEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de término (opcional)</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? format(field.value, 'dd/MM/yyyy', {
                                    locale: ptBR,
                                  })
                                : 'Sem data de término'}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </Form>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar
            </Button>
          </div>
        </>
      )}
    >
      {({ description, amount, date, accountId }) => (
        <>
          {description}
          {amount}
          {date}
          {accountId}
        </>
      )}
    </TsForm>
  );
}
