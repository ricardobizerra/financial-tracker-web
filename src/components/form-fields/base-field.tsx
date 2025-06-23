import { useDescription, useTsController } from '@ts-react/form';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { CircleXIcon } from 'lucide-react';

export interface BaseFieldProps {
  description?: string;
  withError?: boolean;
}

export function BaseField({
  description,
  children,
  withError = true,
}: PropsWithChildren<BaseFieldProps>) {
  const form = useForm();
  const { field, error } = useTsController();
  const { label } = useDescription();

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={() => (
        <FormItem className="flex flex-col gap-2 space-y-0">
          <FormLabel>{label}</FormLabel>
          <FormControl>{children}</FormControl>
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
