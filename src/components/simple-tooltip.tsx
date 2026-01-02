import { PropsWithChildren, ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { cn } from '@/lib/utils';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

type SimpleTooltipProps = TooltipContentProps & {
  label: ReactNode;
  hidden?: boolean;
};

export function SimpleTooltip({
  children,
  label,
  hidden,
  ...contentProps
}: PropsWithChildren<SimpleTooltipProps>) {
  if (hidden) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          {...contentProps}
          className={cn(
            'bg-secondary text-secondary-foreground',
            contentProps.className,
          )}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
