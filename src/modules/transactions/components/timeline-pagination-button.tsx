'use client';

import { Button } from '@/components/ui/button';
import { Loader2, ChevronUp, ChevronDown } from 'lucide-react';

import { getYear, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TimelinePaginationButtonProps {
  isLoading: boolean;
  hasMore: boolean;
  onClick?: () => void;
  direction: 'past' | 'future';
  targetDate: Date;
}

export function TimelinePaginationButton({
  isLoading,
  hasMore,
  onClick,
  direction,
  targetDate,
}: TimelinePaginationButtonProps) {
  if (!hasMore) return null;

  const isFuture = direction === 'future';
  const Icon = isFuture ? ChevronUp : ChevronDown;

  const isCurrentYear = getYear(targetDate) === getYear(new Date());
  const formatStr = isCurrentYear ? "dd 'de' MMMM" : "dd 'de' MMMM 'de' yyyy";
  const dateLabel = format(targetDate, formatStr, { locale: ptBR });
  const label = `${isLoading ? 'Carregando' : 'Carregar'} transações até ${dateLabel}`;

  return (
    <div className="flex justify-center p-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={isLoading}
        className="rounded-full text-muted-foreground hover:text-primary"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
        {label}
      </Button>
    </div>
  );
}
