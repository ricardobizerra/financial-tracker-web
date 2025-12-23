'use client';

import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { AccountType } from '@/graphql/graphql';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Building2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface InvestmentFilters {
  accountIds?: string[];
}

interface InvestmentsFiltersProps {
  filters: InvestmentFilters;
  onFiltersChange: (filters: InvestmentFilters) => void;
}

export function InvestmentsFilters({
  filters,
  onFiltersChange,
}: InvestmentsFiltersProps) {
  const { data } = useQuery(AccountsQuery, {
    variables: {
      types: [AccountType.Investment, AccountType.Savings],
    },
  });

  const accounts = data?.accounts?.edges?.map((e) => e.node) || [];

  const hasActiveFilters = filters.accountIds && filters.accountIds.length > 0;

  const handleAccountChange = (accountId: string, checked: boolean) => {
    const currentAccountIds = filters.accountIds || [];
    const newAccountIds = checked
      ? [...currentAccountIds, accountId]
      : currentAccountIds.filter((id) => id !== accountId);
    onFiltersChange({
      ...filters,
      accountIds: newAccountIds.length > 0 ? newAccountIds : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Account Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              filters.accountIds &&
                filters.accountIds.length > 0 &&
                'border-primary',
            )}
          >
            <Building2 className="h-4 w-4" />
            Conta
            {filters.accountIds && filters.accountIds.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                {filters.accountIds.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-3">
            {accounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma conta de investimento encontrada
              </p>
            ) : (
              accounts.map((account) => (
                <div key={account.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`account-${account.id}`}
                    checked={filters.accountIds?.includes(account.id) || false}
                    onCheckedChange={(checked) =>
                      handleAccountChange(account.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`account-${account.id}`}
                    className="cursor-pointer text-sm flex items-center gap-2"
                  >
                    <Image
                      src={account.institution.logoUrl!}
                      alt={account.institution.name}
                      width={24}
                      height={24}
                    />
                    <span>{account.name}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      (
                      {account.type === 'SAVINGS' ? 'Poupança' : 'Investimento'}
                      )
                    </span>
                  </Label>
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  );
}
