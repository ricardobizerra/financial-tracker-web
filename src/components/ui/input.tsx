import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftSlot, rightSlot, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-9 w-full gap-1 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
          className,
        )}
      >
        {!!leftSlot && (
          <div className="flex items-center justify-center pl-3">
            {leftSlot}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'h-full w-full bg-transparent py-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
            {
              'pl-3': !leftSlot,
              'pr-3': !rightSlot,
            },
          )}
          ref={ref}
          {...props}
        />
        {!!rightSlot && (
          <div className="flex items-center justify-center pr-3">
            {rightSlot}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
