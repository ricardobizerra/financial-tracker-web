'use client';

import { useSimulationStore } from '../hooks/use-simulation-store';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format, addMonths, addYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const QUICK_PICKS = [
  { label: '1 mês', getEnd: (start: Date) => addMonths(start, 1) },
  { label: '3 meses', getEnd: (start: Date) => addMonths(start, 3) },
  { label: '6 meses', getEnd: (start: Date) => addMonths(start, 6) },
  { label: '1 ano', getEnd: (start: Date) => addYears(start, 1) },
];

export function SimulationControls() {
  const { activeScenarioId, scenarios, setDateRange } = useSimulationStore();
  const scenario = scenarios.find((s) => s.id === activeScenarioId);

  if (!scenario) return null;

  const startDate = new Date(scenario.dateRange.start + 'T00:00:00');
  const endDate = new Date(scenario.dateRange.end + 'T00:00:00');

  const handleStartDate = (date?: Date) => {
    if (!date) return;
    const start = date.toISOString().split('T')[0];
    setDateRange(activeScenarioId, start, scenario.dateRange.end);
  };

  const handleEndDate = (date?: Date) => {
    if (!date) return;
    const end = date.toISOString().split('T')[0];
    setDateRange(activeScenarioId, scenario.dateRange.start, end);
  };

  const handleQuickPick = (getEnd: (start: Date) => Date) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = getEnd(start);
    setDateRange(
      activeScenarioId,
      start.toISOString().split('T')[0],
      end.toISOString().split('T')[0],
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Período:</span>

      {/* Start date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'w-[130px] justify-start text-left font-normal',
              !startDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(startDate, 'dd/MM/yyyy', { locale: ptBR })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleStartDate}
          />
        </PopoverContent>
      </Popover>

      <span className="text-sm text-muted-foreground">até</span>

      {/* End date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'w-[130px] justify-start text-left font-normal',
              !endDate && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(endDate, 'dd/MM/yyyy', { locale: ptBR })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={handleEndDate}
            disabled={(date) => date < startDate}
          />
        </PopoverContent>
      </Popover>

      {/* Quick picks */}
      <div className="flex items-center gap-1.5">
        {QUICK_PICKS.map((pick) => (
          <Button
            key={pick.label}
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => handleQuickPick(pick.getEnd)}
          >
            {pick.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
