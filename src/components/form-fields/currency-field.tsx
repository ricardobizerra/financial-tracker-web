'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { Input } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';

export interface CurrencyFieldProps extends BaseFieldProps {}

export function CurrencyField({ ...baseProps }: CurrencyFieldProps) {
  const {
    field: { onChange, value, ...field },
  } = useTsController<string>();
  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  const formatCurrency = (input: string) => {
    const numericValue = input.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(parseFloat(numericValue) / 100);
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value);
    setValue(field.name, formattedValue || undefined);
  };

  return (
    <BaseField {...baseProps}>
      <Input
        type="text"
        placeholder={placeholder ?? 'R$ 0,00'}
        onChange={handleChange}
        value={value ?? ''}
        {...field}
      />
    </BaseField>
  );
}
