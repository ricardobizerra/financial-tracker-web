'use client';

import { BalanceForecastPeriod } from '@/graphql/graphql';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { AccountType } from '@/graphql/graphql';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';

interface CashFlowFiltersProps {
  period: BalanceForecastPeriod;
  onPeriodChange: (period: BalanceForecastPeriod) => void;
  accountId?: string;
  onAccountIdChange: (accountId: string | undefined) => void;
  customStartDate?: Date;
  onCustomStartDateChange: (date: Date | undefined) => void;
  customEndDate?: Date;
  onCustomEndDateChange: (date: Date | undefined) => void;
}

const PERIOD_OPTIONS = [
  { value: BalanceForecastPeriod.Week, label: '1 Semana' },
  { value: BalanceForecastPeriod.Month, label: '1 Mês' },
  { value: BalanceForecastPeriod.ThreeMonths, label: '3 Meses' },
  { value: BalanceForecastPeriod.SixMonths, label: '6 Meses' },
  { value: BalanceForecastPeriod.Year, label: '1 Ano' },
  { value: BalanceForecastPeriod.Custom, label: 'Personalizado' },
];

export function CashFlowFilters({
  period,
  onPeriodChange,
  accountId,
  onAccountIdChange,
  customStartDate,
  onCustomStartDateChange,
  customEndDate,
  onCustomEndDateChange,
}: CashFlowFiltersProps) {
  const isCustomPeriod = period === BalanceForecastPeriod.Custom;

  const { data: accountsData } = useQuery(AccountsQuery, {
    variables: {
      first: 100,
      types: [AccountType.Checking, AccountType.Wallet],
    },
  });

  const accounts = accountsData?.accounts?.edges?.map((edge) => edge.node) || [];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Seletor de período */}
      <Select
        value={period}
        onValueChange={(value) => onPeriodChange(value as BalanceForecastPeriod)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          {PERIOD_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Seletor de conta */}
      <Select
        value={accountId ?? 'all'}
        onValueChange={(value) =>
          onAccountIdChange(value === 'all' ? undefined : value)
        }
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Todas as contas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as contas</SelectItem>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <div className="flex items-center gap-2">
                <InstitutionLogo
                  logoUrl={account.institution?.logoUrl}
                  name={account.institution?.name || account.name}
                  size="sm"
                />
                <span>{account.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date pickers para período customizado */}
      {isCustomPeriod && (
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'w-[130px] justify-start text-left font-normal',
                  !customStartDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customStartDate ? format(customStartDate, 'dd/MM/yy') : 'Início'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customStartDate}
                onSelect={onCustomStartDateChange}
              />
            </PopoverContent>
          </Popover>
          <span className="text-muted-foreground">até</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'w-[130px] justify-start text-left font-normal',
                  !customEndDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {customEndDate ? format(customEndDate, 'dd/MM/yy') : 'Fim'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={customEndDate}
                onSelect={onCustomEndDateChange}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
