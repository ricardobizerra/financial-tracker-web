'use client';

import { useQuery } from '@apollo/client';
import { Regime } from '@/graphql/graphql';
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
import { InvestmentAccountsQuery } from '../graphql/investments-queries';
import { Badge } from '@/components/ui/badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';

export interface InvestmentFilters {
  institutionLinkIds?: string[];
}

interface InvestmentsFiltersProps {
  filters: InvestmentFilters;
  onFiltersChange: (filters: InvestmentFilters) => void;
  regime: Regime;
}

export function InvestmentsFilters({
  filters,
  onFiltersChange,
  regime,
}: InvestmentsFiltersProps) {
  const { data } = useQuery(InvestmentAccountsQuery, {
    variables: {
      regime,
    },
  });

  const accounts = data?.investmentAccounts || [];

  const hasActiveFilters = filters.institutionLinkIds && filters.institutionLinkIds.length > 0;

  const handleAccountChange = (accountId: string, checked: boolean) => {
    const currentAccountIds = filters.institutionLinkIds || [];
    const newAccountIds = checked
      ? [...currentAccountIds, accountId]
      : currentAccountIds.filter((id) => id !== accountId);
    onFiltersChange({
      ...filters,
      institutionLinkIds: newAccountIds.length > 0 ? newAccountIds : undefined,
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
              filters.institutionLinkIds &&
                filters.institutionLinkIds.length > 0 &&
                'border-primary',
            )}
          >
            <Building2 className="h-4 w-4" />
            Conta
            {filters.institutionLinkIds && filters.institutionLinkIds.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                {filters.institutionLinkIds.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-3">
            {accounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma conta encontrada
              </p>
            ) : (
              accounts.map((account) => (
                <div key={account.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`account-${account.id}`}
                    checked={filters.institutionLinkIds?.includes(account.id) || false}
                    onCheckedChange={(checked) =>
                      handleAccountChange(account.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`account-${account.id}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <InstitutionLogo
                        logoUrl={account.institutionLogoUrl}
                        name={account.name}
                        size="sm"
                      />
                      <span>{account.name}</span>
                    </div>
                    <Badge variant="secondary" size="sm">
                      {account.investmentCount}
                    </Badge>
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
