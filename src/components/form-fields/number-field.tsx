import { useDescription, useTsController } from '@ts-react/form';
import { Input } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import { HTMLInputTypeAttribute } from 'react';

export interface NumberFieldProps extends BaseFieldProps {}

export function NumberField({ ...baseProps }: NumberFieldProps) {
  const {
    field: { onChange, value, ...field },
  } = useTsController<number>();
  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  return (
    <BaseField {...baseProps}>
      <Input
        type="number"
        placeholder={placeholder}
        onChange={(e) =>
          setValue(field.name, Number(e.target.value) || undefined)
        }
        value={value ?? ''}
        {...field}
      />
    </BaseField>
  );
}
