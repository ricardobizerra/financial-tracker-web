import { BaseFieldProps } from './base-field';
import { BaseTextField } from './base-text-field';

interface EmailFieldProps extends BaseFieldProps {}

export function EmailField({ ...baseProps }: EmailFieldProps) {
  return (
    <BaseTextField inputType="email" autoComplete="username" {...baseProps} />
  );
}
