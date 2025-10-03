'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { selectSchema } from './utils/select-schema';
import { z } from 'zod';

interface SelectFieldProps extends BaseFieldProps {
  options: z.infer<typeof selectSchema>[];
}

export function SelectField({ options, ...baseProps }: SelectFieldProps) {
  const {
    field: { onChange, value, ...field },
  } = useTsController<z.infer<typeof selectSchema>>();
  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  console.log('value', value);

  return (
    <Select
      onValueChange={(value) =>
        setValue(field.name, {
          value,
          label: options.find((option) => option.value === value)?.label,
          data: options.find((option) => option.value === value)?.data,
        })
      }
      defaultValue={value?.value}
    >
      <BaseField {...baseProps}>
        <SelectTrigger disabled={baseProps.disabled}>
          <SelectValue placeholder={placeholder || 'Selecione'} />
        </SelectTrigger>
      </BaseField>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
