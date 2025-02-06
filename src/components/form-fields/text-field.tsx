import { BaseTextField } from './base-text-field';
import { BaseFieldProps } from './base-field';

interface TextFieldProps extends BaseFieldProps {}

export function TextField({ ...baseProps }: TextFieldProps) {
  return <BaseTextField inputType="text" {...baseProps} />;
}
