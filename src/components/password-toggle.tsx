'use client';

import { Eye, EyeOff } from 'lucide-react';
import { ComponentProps } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface PasswordToggleProps
  extends Omit<ComponentProps<typeof Button>, 'onClick'> {
  isVisible: boolean;
  onToggle: () => void;
}

export function PasswordToggle({
  isVisible,
  onToggle,
  className,
  ...props
}: PasswordToggleProps) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      size="icon"
      variant="ghost"
      className={cn('-mr-1 h-7 w-7', className)}
      aria-label="Toggle password visibility"
      aria-pressed={isVisible}
      {...props}
    >
      {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </Button>
  );
}
