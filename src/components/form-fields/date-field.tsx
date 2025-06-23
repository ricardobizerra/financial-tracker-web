'use client';

import { useTsController } from '@ts-react/form';
import { BaseField, BaseFieldProps } from './base-field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export interface DateFieldProps extends BaseFieldProps {
  captionLayout?: CalendarProps['captionLayout'];
}

export function DateField({
  captionLayout = 'label',
  ...baseProps
}: DateFieldProps) {
  const {
    field: { onChange, value, ref, ...field },
  } = useTsController<Date>();

  return (
    <Popover modal>
      <BaseField {...baseProps}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            {value ? (
              format(value, 'dd/MM/yyyy')
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </BaseField>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          captionLayout={captionLayout}
        />
      </PopoverContent>
    </Popover>
  );
}
