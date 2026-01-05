'use client';

import * as React from 'react';
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Building2 } from 'lucide-react';

const institutionLogoVariants = cva(
  'relative flex shrink-0 items-center justify-center rounded bg-muted dark:bg-white',
  {
    variants: {
      size: {
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        default: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const imageSizes = {
  xs: 16,
  sm: 24,
  default: 32,
  lg: 48,
  xl: 64,
};

const iconSizes = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  default: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
};

const fallbackTextSizes = {
  xs: 'text-[8px]',
  sm: 'text-[10px]',
  default: 'text-xs',
  lg: 'text-sm',
  xl: 'text-lg',
};

export interface InstitutionLogoProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof institutionLogoVariants> {
  logoUrl?: string | null;
  name: string;
  color?: string | null;
}

function InstitutionLogo({
  logoUrl,
  name,
  color,
  size = 'default',
  className,
  ...props
}: InstitutionLogoProps) {
  const [hasError, setHasError] = useState(false);
  const sizeKey = size || 'default';
  const imageSize = imageSizes[sizeKey];

  // Renderiza a imagem se tiver URL e não teve erro
  if (logoUrl && !hasError) {
    return (
      <div
        className={cn(institutionLogoVariants({ size }), className)}
        {...props}
      >
        <Image
          src={logoUrl}
          alt={name}
          width={imageSize}
          height={imageSize}
          className="object-contain"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback com cor: mostrar iniciais
  if (color) {
    return (
      <div
        className={cn(institutionLogoVariants({ size }), className)}
        style={{ backgroundColor: color }}
        {...props}
      >
        <span
          className={cn('font-medium text-white', fallbackTextSizes[sizeKey])}
        >
          {name.substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  // Fallback sem cor: mostrar ícone genérico
  return (
    <div
      className={cn(institutionLogoVariants({ size }), className)}
      {...props}
    >
      <Building2 className={cn('text-muted-foreground', iconSizes[sizeKey])} />
    </div>
  );
}

export { InstitutionLogo, institutionLogoVariants };
