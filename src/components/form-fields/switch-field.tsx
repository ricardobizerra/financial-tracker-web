'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { Switch } from '../ui/switch';
import { BaseFieldProps } from './base-field';
import { useForm } from 'react-hook-form';
import {
  FormDescription,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { CircleXIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwitchFieldProps extends BaseFieldProps {}

export function SwitchField({
  description,
  withError = true,
  disabled,
}: SwitchFieldProps) {
  const form = useForm();
  const { field, error } = useTsController<boolean>();
  const { label, placeholder } = useDescription();

  return (
    <FormField
      control={form.control}
      name={field.name}
      disabled={disabled}
      render={() => (
        <FormItem
          className={cn(
            'flex flex-col gap-2 space-y-0 rounded-md border border-border p-4',
            withError && error && 'border-destructive',
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex w-full flex-col gap-1">
              <FormLabel>{label}</FormLabel>
              {!!placeholder && (
                <p className="text-sm leading-none text-muted-foreground">
                  {placeholder}
                </p>
              )}
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
          {!!description && <FormDescription>{description}</FormDescription>}
          {!!withError && !!error && (
            <div className="flex items-center gap-1 rounded-md bg-destructive px-1">
              <CircleXIcon className="aspect-square h-[0.8rem] w-[0.8rem] text-white" />
              <FormMessage className="text-white" />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
