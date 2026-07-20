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
import { Badge } from '@/components/ui/badge';
import { TransactionStatus, TransactionType } from '@/graphql/graphql';
import {
  CalendarIcon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
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
  search?: string;
}

interface TransactionsFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

export function TransactionsFilters({
  filters,
  onFiltersChange,
}: TransactionsFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchValue, 500);

  // Manter referência do valor atual para sincronização sem triggers extras
  const searchValueRef = useRef(searchValue);
  useEffect(() => {
    searchValueRef.current = searchValue;
  }, [searchValue]);

  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    const normalizedSearch = debouncedSearch || undefined;
    if (filtersRef.current.search !== normalizedSearch) {
      onFiltersChange({
        ...filtersRef.current,
        search: normalizedSearch,
      });
    }
  }, [debouncedSearch, onFiltersChange]);

  // Sincronizar se os filtros forem alterados externamente (ex: botão limpar)
  useEffect(() => {
    if (filters.search !== searchValueRef.current) {
      setSearchValue(filters.search || '');
    }
  }, [filters.search]);

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    (filters.types && filters.types.length > 0) ||
    (filters.statuses && filters.statuses.length > 0) ||
    filters.search;

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
    setSearchValue('');
    onFiltersChange({});
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Input
          type="text"
          placeholder="Buscar descrição..."
          className="h-8"
          leftSlot={<Search className="h-4 w-4 text-muted-foreground" />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'gap-2',
              (filters.startDate || filters.endDate) && 'border-primary',
            )}
          >
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Período</span>
            {(filters.startDate || filters.endDate) && (
              <Badge
                variant="secondary"
                size="sm"
                className="gap-1 font-normal"
              >
                {(() => {
                  const formatCustomDate = (date: Date) => {
                    const isCurrentYear =
                      date.getFullYear() === new Date().getFullYear();
                    return format(
                      date,
                      isCurrentYear ? "dd 'de' MMMM" : "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR },
                    );
                  };

                  if (filters.startDate && filters.endDate) {
                    const startFormatted = formatCustomDate(filters.startDate);
                    const endFormatted = formatCustomDate(filters.endDate);

                    if (startFormatted === endFormatted) {
                      return startFormatted;
                    }

                    return `${startFormatted} - ${endFormatted}`;
                  }
                  if (filters.startDate) {
                    return `Desde ${formatCustomDate(filters.startDate)}`;
                  }
                  return `Até ${formatCustomDate(filters.endDate!)}`;
                })()}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFiltersChange({
                      ...filters,
                      startDate: undefined,
                      endDate: undefined,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      onFiltersChange({
                        ...filters,
                        startDate: undefined,
                        endDate: undefined,
                      });
                    }
                  }}
                  className="ml-1 inline-flex cursor-pointer rounded-full p-0.5 transition-colors hover:bg-black/10"
                >
                  <X className="h-3 w-3" />
                </span>
              </Badge>
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
              'gap-2',
              filters.types && filters.types.length > 0 && 'border-primary',
            )}
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Tipo</span>
            {filters.types && filters.types.length > 0 && (
              <div className="flex gap-1">
                {filters.types.map((t) => (
                  <TransactionTypeBadge
                    key={t}
                    type={t}
                    onClear={() => {
                      onFiltersChange({
                        ...filters,
                        types: filters.types?.filter((type) => type !== t),
                      });
                    }}
                  />
                ))}
              </div>
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
              'gap-2',
              filters.statuses &&
                filters.statuses.length > 0 &&
                'border-primary',
            )}
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Status</span>
            {filters.statuses && filters.statuses.length > 0 && (
              <div className="flex gap-1">
                {filters.statuses.map((s) => (
                  <TransactionStatusBadge
                    key={s}
                    status={s}
                    onClear={() => {
                      onFiltersChange({
                        ...filters,
                        statuses: filters.statuses?.filter(
                          (status) => status !== s,
                        ),
                      });
                    }}
                  />
                ))}
              </div>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
