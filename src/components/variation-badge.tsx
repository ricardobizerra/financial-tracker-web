'use client';

import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from 'lucide-react';
import { Badge, BadgeProps } from './ui/badge';
import { extractPercentage } from '@/lib/formatters/percentage';

interface VariationBadgeProps {
  variation: string;
  size?: BadgeProps['size'];
  showSign?: boolean;
  className?: string;
}

export function VariationBadge({
  variation,
  size,
  showSign = false,
  className,
}: VariationBadgeProps) {
  const value = extractPercentage(variation);

  const isNegative = value < 0;
  const isZero = value === 0;

  return (
    <Badge
      variant={isNegative ? 'destructive' : isZero ? 'outline' : 'success'}
      className={`font-medium ${className || ''}`}
      size={size}
    >
      {isNegative ? (
        <ArrowDownIcon className="h-4 w-4" />
      ) : isZero ? (
        <EqualIcon className="h-4 w-4" />
      ) : (
        <ArrowUpIcon className="h-4 w-4" />
      )}
      {!isNegative && !isZero && showSign ? '+' : ''}
      {variation}
    </Badge>
  );
}
