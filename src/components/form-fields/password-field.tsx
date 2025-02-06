import { BaseFieldProps } from './base-field';
import { BaseTextField } from './base-text-field';

interface PasswordFieldProps extends BaseFieldProps {}

export function PasswordField({ ...baseProps }: PasswordFieldProps) {
  return (
    <BaseTextField
      inputType="password"
      autoComplete="current-password"
      {...baseProps}
    />
  );
}
