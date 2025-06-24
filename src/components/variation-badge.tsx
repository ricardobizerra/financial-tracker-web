'use client';

import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface VariationBadgeProps {
  variation: string;
}

export function VariationBadge({ variation }: VariationBadgeProps) {
  return (
    <Badge
      variant={
        variation.startsWith('-')
          ? 'destructive'
          : variation === '0,00%'
            ? 'outline'
            : 'success'
      }
      className="flex items-center gap-1 font-medium"
    >
      {variation.startsWith('-') ? (
        <ArrowDownIcon className="h-4 w-4" />
      ) : variation === '0,00%' ? (
        <EqualIcon className="h-4 w-4" />
      ) : (
        <ArrowUpIcon className="h-4 w-4" />
      )}
      {variation}
    </Badge>
  );
}
