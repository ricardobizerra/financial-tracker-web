'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CardsQuery } from '@/modules/accounts/graphql/accounts-queries';
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

interface TransactionCardSelectorProps {
  currentCardId?: string | null;
  onSelect: (cardId: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function TransactionCardSelector({
  currentCardId,
  onSelect,
  disabled = false,
  placeholder = 'Selecionar cartão',
  className,
}: TransactionCardSelectorProps) {
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(CardsQuery, {
    variables: {
      first: 50,
    },
  });

  const cards = data?.cards.edges?.map((edge) => edge.node) || [];
  const currentCard = cards.find((c) => c.id === currentCardId);

  const renderTrigger = () => {
    if (!currentCard) {
      return (
        <Badge
          className={cn(
            'gap-1 whitespace-nowrap border border-dashed border-muted-foreground/30 bg-transparent text-muted-foreground transition-all hover:bg-muted/50 hover:text-muted-foreground',
            !disabled && 'cursor-pointer active:scale-95',
            disabled && 'cursor-default opacity-60',
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

    const institution = currentCard.institutionLink?.institution;

    return (
      <div
        className={cn(
          'flex items-center gap-1.5 transition-all',
          !disabled &&
            'cursor-pointer rounded-md px-1 py-0.5 hover:bg-muted/50 active:scale-[0.98]',
          disabled && 'opacity-60',
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
        <p className="text-sm">
          <span className="font-normal text-muted-foreground">Cartão</span>{' '}
          <span className="font-medium underline decoration-muted-foreground/30 underline-offset-4 hover:decoration-muted-foreground/60">
            {currentCard.name}
          </span>
        </p>
      </div>
    );
  };

  if (disabled) {
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
            Carregando cartões...
          </div>
        ) : cards.length === 0 ? (
          <div className="p-2 text-center text-xs text-muted-foreground">
            Nenhum cartão encontrado
          </div>
        ) : (
          cards.map((card) => {
            const institution = card.institutionLink?.institution;
            const isSelected = card.id === currentCardId;

            return (
              <DropdownMenuItem
                key={card.id}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors focus:bg-muted',
                  isSelected && 'bg-muted/50 font-medium',
                )}
                onClick={() => {
                  onSelect(card.id);
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
                    <span className="truncate text-sm">{card.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {institution?.name} • Final {card.lastFourDigits}
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
