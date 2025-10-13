'use client';

import {
  AlertTriangleIcon,
  CheckIcon,
  CircleXIcon,
  InfoIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Toaster as Sonner, toast, useSonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  const { toasts } = useSonner();

  useEffect(() => {
    if (toasts.length > (props.visibleToasts ?? 3)) {
      toast.dismiss(toasts?.[toasts.length - 1].id);
    }
  }, [toasts, props.visibleToasts]);

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          error:
            'group special group-[.toaster]:bg-destructive group-[.toaster]:border-destructive',
          success:
            'group special group-[.toaster]:bg-green-700 group-[.toaster]:border-green-700',
          warning:
            'group special group-[.toaster]:bg-orange-400 group-[.toaster]:border-orange-400',
          info: 'group toast group-[.toaster]:bg-background group-[.toaster]:border-foreground/50',
          title:
            'text-sm group-[.toast]:text-foreground group-[.special]:text-white',
          description:
            'text-xs group-[.toaster]:opacity-75 group-[.toast]:text-foreground group-[.special]:text-white',
          actionButton:
            'group-[.toast]:bg-background group-[.toast]:text-foreground group-[.special]:text-white',
          cancelButton:
            'group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.special]:text-white',
          closeButton:
            'group-[.toaster]:bg-transparent group-[.toaster]:absolute group-[.toaster]:top-3 group-[.toaster]:right-0 group-[.toaster]:ml-auto group-[.toaster]:border-none group-[.toast]:text-foreground/75 group-[.toast]:hover:text-foreground group-[.special]:text-white/75 group-[.special]:hover:text-white',
        },
      }}
      icons={{
        error: <CircleXIcon className="aspect-square h-5 w-5 text-white" />,
        warning: (
          <AlertTriangleIcon className="aspect-square h-5 w-5 text-white" />
        ),
        info: <InfoIcon className="aspect-square h-5 w-5 text-foreground" />,
        success: <CheckIcon className="aspect-square h-5 w-5 text-white" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
