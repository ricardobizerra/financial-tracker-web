'use client';

import { cn } from '@/lib/utils';
import {
  AlertTriangleIcon,
  CheckIcon,
  CircleXIcon,
  HelpCircleIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Toaster as Sonner, toast, useSonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const baseToastClassName = 'group-[.toaster]:shadow-lg';

  const { toasts } = useSonner();

  useEffect(() => {
    if (toasts.length > (props.visibleToasts ?? 1)) {
      toast.dismiss(toasts?.[toasts.length - 1].id);
    }
  }, [toasts, props.visibleToasts]);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          error: cn(
            baseToastClassName,
            'group special group-[.toaster]:bg-destructive group-[.toaster]:border-destructive',
          ),
          success: cn(
            baseToastClassName,
            'group special group-[.toaster]:bg-emerald-700 group-[.toaster]:border-emerald-700',
          ),
          warning: cn(
            baseToastClassName,
            'group special group-[.toaster]:bg-orange-400 group-[.toaster]:border-orange-400',
          ),
          info: cn(
            baseToastClassName,
            'group toast group-[.toaster]:bg-foreground group-[.toaster]:border-foreground',
          ),
          title: 'group-[.toast]:text-background group-[.special]:text-white',
          description:
            'group-[.toaster]:opacity-75 group-[.toast]:text-background group-[.special]:text-white',
          actionButton:
            'group-[.toast]:bg-background group-[.toast]:text-foreground group-[.special]:text-white',
          cancelButton:
            'group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.special]:text-white',
          closeButton:
            'group-[.toaster]:bg-transparent  group-[.toaster]:absolute group-[.toaster]:top-3 group-[.toaster]:right-0 group-[.toaster]:ml-auto group-[.toaster]:border-none group-[.toast]:text-background/75 group-[.toast]:hover:text-background group-[.special]:text-white/75 group-[.special]:hover:text-white',
        },
      }}
      icons={{
        error: <CircleXIcon className="aspect-square h-5 w-5 text-white" />,
        warning: (
          <AlertTriangleIcon className="aspect-square h-5 w-5 text-white" />
        ),
        info: (
          <HelpCircleIcon className="aspect-square h-5 w-5 text-background" />
        ),
        success: <CheckIcon className="aspect-square h-5 w-5 text-white" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
