'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { Input } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import { RefObject, useEffect, useRef, useState } from 'react';

const formatCurrency = (input: string | undefined) => {
  const numericValue = input?.replace(/[^0-9]/g, '');

  if (!numericValue) return '0,00';

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(parseFloat(numericValue) / 100);

  return formatted.replace('R$', '').trim();
};

const unformatCurrency = (input: string) => {
  const numericValue = input.replace(/[^0-9]/g, '');
  return parseInt(numericValue);
};

const handleFocusToEnd = (inputRef: RefObject<HTMLInputElement>) => {
  const input = inputRef.current;

  if (input) {
    const value = input.value;
    input.setSelectionRange(value.length, value.length);
  }
};

export interface CurrencyFieldProps extends BaseFieldProps {}

export function CurrencyField({ ...baseProps }: CurrencyFieldProps) {
  const {
    field: { onChange, value, ref, ...field },
  } = useTsController<number>();

  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  const [formattedValue, setFormattedValue] = useState(
    formatCurrency(value?.toString() || '0'),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = unformatCurrency(e.target.value);

    setFormattedValue(formatCurrency(formattedValue.toString()));
    setValue(field.name, formattedValue || undefined);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === undefined) {
      setValue(field.name, 0);
      setFormattedValue('0,00');
    }
  }, [value, field.name, setValue]);

  return (
    <BaseField {...baseProps}>
      <Input
        type="text"
        ref={inputRef}
        placeholder={placeholder ?? '0,00'}
        onChange={handleChange}
        onClick={() => handleFocusToEnd(inputRef)}
        onFocus={() => handleFocusToEnd(inputRef)}
        value={formattedValue ?? ''}
        leftSlot={<span className="text-muted-foreground">R$</span>}
        {...field}
      />
    </BaseField>
  );
}
