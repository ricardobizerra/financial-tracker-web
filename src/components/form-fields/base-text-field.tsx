import { useDescription, useTsController } from '@ts-react/form';
import { Input, InputProps } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from 'react';

export interface BaseTextFieldProps extends BaseFieldProps {
  inputType: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute | undefined;
  rightSlot?: InputProps['rightSlot'];
}

export function BaseTextField({
  inputType,
  autoComplete,
  rightSlot,
  ...baseProps
}: BaseTextFieldProps) {
  const {
    field: { onChange, value, ...field },
  } = useTsController<string>();
  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  return (
    <BaseField {...baseProps}>
      <Input
        type={inputType}
        placeholder={placeholder}
        onChange={(e) => setValue(field.name, e.target.value || undefined)}
        value={value ?? ''}
        autoComplete={autoComplete}
        rightSlot={rightSlot}
        {...field}
      />
    </BaseField>
  );
}
