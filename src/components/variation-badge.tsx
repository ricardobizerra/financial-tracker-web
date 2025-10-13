'use client';

import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from 'lucide-react';
import { Badge, BadgeProps } from './ui/badge';

interface VariationBadgeProps {
  variation: string;
  size?: BadgeProps['size'];
}

export function VariationBadge({ variation, size }: VariationBadgeProps) {
  return (
    <Badge
      variant={
        variation.startsWith('-')
          ? 'destructive'
          : variation === '0,00%'
            ? 'outline'
            : 'success'
      }
      className="font-medium"
      size={size}
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
