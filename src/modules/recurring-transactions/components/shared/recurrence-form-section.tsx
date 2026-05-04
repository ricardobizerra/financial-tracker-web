'use client';

import React from 'react';
import { RecurrenceFrequency, DayMode } from '@/graphql/graphql';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  Hash,
  Infinity,
  AlertTriangleIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecurrenceTimelinePreview } from './recurrence-timeline-preview';
import { getRecurrenceSummary } from '../../recurrence-utils';

export type StopCondition = 'INFINITE' | 'UNTIL_DATE' | 'REPEATS';

export interface RecurrenceData {
  frequency: RecurrenceFrequency;
  dayMode: DayMode;
  dayOfWeek: number;
  weekOfMonth: number;
  stopCondition: StopCondition;
  endDate?: Date;
  repeatCount?: number;
}

interface RecurrenceFormSectionProps {
  data: RecurrenceData;
  onChange: (newData: Partial<RecurrenceData>) => void;
  startDate?: Date;
  className?: string;
}

export function RecurrenceFormSection({
  data,
  onChange,
  startDate,
  className,
}: RecurrenceFormSectionProps) {
  const {
    frequency,
    dayMode,
    dayOfWeek,
    weekOfMonth,
    stopCondition,
    endDate,
    repeatCount,
  } = data;

  return (
    <div className={cn('space-y-6', className)}>
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Configurar</TabsTrigger>
          <TabsTrigger value="preview">Visualizar</TabsTrigger>
        </TabsList>

        <TabsContent
          value="config"
          className="mt-6 space-y-6 duration-300 animate-in fade-in slide-in-from-left-2"
        >
          {/* Frequency selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Frequência</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { value: RecurrenceFrequency.Weekly, label: 'Semanal' },
                { value: RecurrenceFrequency.BiWeekly, label: 'Quinzenal' },
                { value: RecurrenceFrequency.Monthly, label: 'Mensal' },
                { value: RecurrenceFrequency.Yearly, label: 'Anual' },
              ].map((item) => (
                <Button
                  key={item.value}
                  type="button"
                  variant={frequency === item.value ? 'default' : 'outline'}
                  className="w-full text-xs"
                  onClick={() =>
                    onChange({ frequency: item.value as RecurrenceFrequency })
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Day Mode Selection (for Monthly/Yearly) */}
          {(frequency === RecurrenceFrequency.Monthly ||
            frequency === RecurrenceFrequency.Yearly) && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Dia do{' '}
                {frequency === RecurrenceFrequency.Monthly ? 'mês' : 'ano'}
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: DayMode.SpecificDay, label: 'Dia específico' },
                  { value: DayMode.LastDay, label: 'Último dia' },
                  { value: DayMode.LastBusinessDay, label: 'Último dia útil' },
                  {
                    value: DayMode.FirstBusinessDay,
                    label: 'Primeiro dia útil',
                  },
                  {
                    value: DayMode.NthWeekday,
                    label: 'Dia da semana específico',
                  },
                ].map((item) => (
                  <Button
                    key={item.value}
                    type="button"
                    variant={dayMode === item.value ? 'secondary' : 'ghost'}
                    className={cn(
                      'h-9 w-full justify-start border px-3 text-xs',
                      dayMode === item.value
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-transparent',
                    )}
                    onClick={() => onChange({ dayMode: item.value as DayMode })}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Day of week selection (for Weekly/Bi-Weekly or NthWeekday) */}
          {(frequency === RecurrenceFrequency.Weekly ||
            frequency === RecurrenceFrequency.BiWeekly ||
            dayMode === DayMode.NthWeekday) && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Dia da semana</Label>
              <div className="flex flex-wrap gap-1">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={dayOfWeek === index ? 'default' : 'outline'}
                    className="h-9 w-9 p-0"
                    onClick={() => onChange({ dayOfWeek: index })}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Nth Week Selection */}
          {dayMode === DayMode.NthWeekday && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Em qual semana?</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((week) => (
                  <Button
                    key={week}
                    type="button"
                    variant={weekOfMonth === week ? 'default' : 'outline'}
                    className="h-9 flex-1 px-2 text-xs"
                    onClick={() => onChange({ weekOfMonth: week })}
                  >
                    {week}ª
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Stop Condition */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Até quando?</Label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Infinite */}
              <button
                type="button"
                onClick={() => onChange({ stopCondition: 'INFINITE' })}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:bg-muted/50',
                  stopCondition === 'INFINITE'
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-muted bg-card text-muted-foreground',
                )}
              >
                <Infinity className="h-5 w-5" />
                <span className="text-xs font-semibold">Para sempre</span>
              </button>

              {/* Until Date */}
              <button
                type="button"
                onClick={() => {
                  if (!endDate) {
                    onChange({
                      stopCondition: 'UNTIL_DATE',
                      endDate: addMonths(startDate || new Date(), 12),
                    });
                  } else {
                    onChange({ stopCondition: 'UNTIL_DATE' });
                  }
                }}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:bg-muted/50',
                  stopCondition === 'UNTIL_DATE'
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-muted bg-card text-muted-foreground',
                )}
              >
                <CalendarIcon className="h-5 w-5" />
                <span className="text-xs font-semibold">Até data</span>
              </button>

              {/* Repeats */}
              <button
                type="button"
                onClick={() =>
                  onChange({
                    stopCondition: 'REPEATS',
                    repeatCount: repeatCount,
                  })
                }
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:bg-muted/50',
                  stopCondition === 'REPEATS'
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-muted bg-card text-muted-foreground',
                )}
              >
                <Hash className="h-5 w-5" />
                <span className="text-xs font-semibold">Repetições</span>
              </button>
            </div>

            {/* Stop Condition Details */}
            <div className="mt-2 min-h-[40px]">
              {stopCondition === 'UNTIL_DATE' && (
                <div className="animate-in fade-in slide-in-from-top-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-10 w-full justify-start text-left font-normal',
                          !endDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) =>
                          onChange({ endDate: date || undefined })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {stopCondition === 'REPEATS' && (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <Input
                    type="number"
                    min={1}
                    max={500}
                    value={repeatCount || ''}
                    onChange={(e) =>
                      onChange({
                        repeatCount: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="h-10"
                    placeholder="Ex: 12"
                  />
                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    repetições
                  </span>
                </div>
              )}

              {stopCondition === 'INFINITE' && (
                <p className="px-1 text-xs italic text-muted-foreground animate-in fade-in slide-in-from-top-1">
                  Transações serão geradas continuamente (limite de 2 anos).
                </p>
              )}
            </div>
          </div>

          {/* Summary Box */}
          <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              Resumo da regra
            </p>
            <p className="text-sm font-medium leading-relaxed text-primary">
              {getRecurrenceSummary(
                frequency,
                dayMode,
                dayOfWeek,
                weekOfMonth,
                startDate || new Date(),
              )}
              {stopCondition === 'UNTIL_DATE' && endDate && (
                <span className="mt-1 block font-normal italic opacity-80">
                  Válido até{' '}
                  {format(endDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}.
                </span>
              )}
              {stopCondition === 'REPEATS' && repeatCount && (
                <span className="mt-1 block font-normal italic opacity-80">
                  Será repetido {repeatCount} vezes.
                </span>
              )}
            </p>
          </div>

          {/* Warning for days >= 29 */}
          {dayMode === DayMode.SpecificDay &&
            (frequency === RecurrenceFrequency.Monthly ||
              frequency === RecurrenceFrequency.Yearly) &&
            startDate &&
            startDate.getDate() >= 29 && (
              <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400">
                <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-xs leading-normal">
                  Nos meses com menos de {startDate.getDate()} dias, a transação
                  será criada no último dia do mês.
                </p>
              </div>
            )}
        </TabsContent>

        <TabsContent
          value="preview"
          className="mt-6 duration-300 animate-in fade-in slide-in-from-right-2"
        >
          <RecurrenceTimelinePreview
            startDate={startDate || new Date()}
            data={data}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
