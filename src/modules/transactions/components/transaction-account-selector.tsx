'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Plus } from 'lucide-react';

interface TransactionAccountSelectorProps {
  currentAccountId?: string | null;
  onSelect: (accountId: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

export function TransactionAccountSelector({
  currentAccountId,
  onSelect,
  disabled = false,
  readOnly = false,
  placeholder = 'Selecionar conta',
  className,
}: TransactionAccountSelectorProps) {
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(AccountsQuery);

  const accounts = data?.accounts.edges?.map((edge) => edge.node) || [];
  const currentAccount = accounts.find((a) => a.id === currentAccountId);

  const renderTrigger = () => {
    if (!currentAccount) {
      return (
        <Badge
          className={cn(
            'gap-1 whitespace-nowrap border border-dashed border-muted-foreground/30 bg-transparent text-muted-foreground transition-all hover:bg-muted/50 hover:text-muted-foreground',
            !disabled && !readOnly && 'cursor-pointer active:scale-95',
            disabled && !readOnly && 'cursor-default opacity-60',
            className,
          )}
          variant="outline"
          size="sm"
        >
          <Plus className="h-3 w-3 shrink-0" />
          <span className="text-xs font-medium">{placeholder}</span>
        </Badge>
      );
    }

    const institution = currentAccount.institutionLink?.institution;

    return (
      <div
        className={cn(
          'flex items-center gap-1.5 transition-all',
          !disabled &&
            !readOnly &&
            'cursor-pointer rounded-md px-1 py-0.5 hover:bg-muted/50 active:scale-[0.98]',
          disabled && !readOnly && 'opacity-60',
          className,
        )}
      >
        {institution && (
          <InstitutionLogo
            logoUrl={institution.logoUrl}
            name={institution.name}
            size="xs"
          />
        )}
        <span className="text-sm font-medium underline decoration-muted-foreground/30 underline-offset-4 hover:decoration-muted-foreground/60">
          {currentAccount.name}
        </span>
      </div>
    );
  };

  if (disabled || readOnly) {
    return renderTrigger();
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="inline-block">{renderTrigger()}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 space-y-1 p-2">
        {loading ? (
          <div className="p-2 text-center text-xs text-muted-foreground">
            Carregando contas...
          </div>
        ) : accounts.length === 0 ? (
          <div className="p-2 text-center text-xs text-muted-foreground">
            Nenhuma conta encontrada
          </div>
        ) : (
          accounts.map((account) => {
            const institution = account.institutionLink?.institution;
            const isSelected = account.id === currentAccountId;

            return (
              <DropdownMenuItem
                key={account.id}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted',
                  isSelected && 'bg-muted/50 font-medium',
                )}
                onClick={() => {
                  onSelect(account.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {institution && (
                    <InstitutionLogo
                      logoUrl={institution.logoUrl}
                      name={institution.name}
                      size="sm"
                    />
                  )}
                  <div className="flex flex-col truncate">
                    <span className="truncate text-sm">{account.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {institution?.name}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-muted-foreground opacity-60" />
                )}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
