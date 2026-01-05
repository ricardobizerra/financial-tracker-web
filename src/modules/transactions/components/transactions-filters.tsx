'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TransactionStatus, TransactionType } from '@/graphql/graphql';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  transactionStatusLabel,
  transactionTypeLabels,
} from '../transactions-constants';
import { TransactionTypeBadge } from './transaction-type-badge';
import { TransactionStatusBadge } from './transaction-status-badge';

export interface TransactionFilters {
  startDate?: Date;
  endDate?: Date;
  types?: TransactionType[];
  statuses?: TransactionStatus[];
}

interface TransactionsFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

export function TransactionsFilters({
  filters,
  onFiltersChange,
}: TransactionsFiltersProps) {
  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    (filters.types && filters.types.length > 0) ||
    (filters.statuses && filters.statuses.length > 0);

  const handleTypeChange = (type: TransactionType, checked: boolean) => {
    const currentTypes = filters.types || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter((t) => t !== type);
    onFiltersChange({
      ...filters,
      types: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleStatusChange = (status: TransactionStatus, checked: boolean) => {
    const currentStatuses = filters.statuses || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter((s) => s !== status);
    onFiltersChange({
      ...filters,
      statuses: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'justify-start text-left font-normal',
              (filters.startDate || filters.endDate) && 'border-primary',
            )}
          >
            <CalendarIcon />
            {filters.startDate && filters.endDate ? (
              <>
                {format(filters.startDate, 'dd/MM/yy', { locale: ptBR })} -{' '}
                {format(filters.endDate, 'dd/MM/yy', { locale: ptBR })}
              </>
            ) : filters.startDate ? (
              <>
                A partir de{' '}
                {format(filters.startDate, 'dd/MM/yy', { locale: ptBR })}
              </>
            ) : filters.endDate ? (
              <>Até {format(filters.endDate, 'dd/MM/yy', { locale: ptBR })}</>
            ) : (
              'Período'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{
              from: filters.startDate,
              to: filters.endDate,
            }}
            onSelect={(range) => {
              onFiltersChange({
                ...filters,
                startDate: range?.from,
                endDate: range?.to,
              });
            }}
            locale={ptBR}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Types Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              filters.types && filters.types.length > 0 && 'border-primary',
            )}
          >
            <Filter />
            Tipo
            {filters.types && filters.types.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                {filters.types.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="start">
          <div className="space-y-3">
            {Object.values(TransactionType).map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.types?.includes(type) || false}
                  onCheckedChange={(checked) =>
                    handleTypeChange(type, checked as boolean)
                  }
                />
                <Label htmlFor={`type-${type}`} className="cursor-pointer">
                  <TransactionTypeBadge type={type} />
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              filters.statuses &&
                filters.statuses.length > 0 &&
                'border-primary',
            )}
          >
            <Filter />
            Status
            {filters.statuses && filters.statuses.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                {filters.statuses.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="start">
          <div className="space-y-3">
            {Object.values(TransactionStatus).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.statuses?.includes(status) || false}
                  onCheckedChange={(checked) =>
                    handleStatusChange(status, checked as boolean)
                  }
                />
                <Label htmlFor={`status-${status}`} className="cursor-pointer">
                  <TransactionStatusBadge status={status} />
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
