import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

interface SpinnerIconProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 4, className }: SpinnerIconProps) {
  return (
    <LoaderIcon className={cn(`animate-spin h-${size} w-${size}`, className)} />
  );
}
