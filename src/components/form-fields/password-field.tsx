'use client';

import { BaseFieldProps } from './base-field';
import { BaseTextField } from './base-text-field';
import { useState } from 'react';
import { PasswordToggle } from '../password-toggle';

interface PasswordFieldProps extends BaseFieldProps {}

export function PasswordField({ ...baseProps }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseTextField
      inputType={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      rightSlot={
        <PasswordToggle
          isVisible={showPassword}
          onToggle={() => setShowPassword((old) => !old)}
        />
      }
      {...baseProps}
    />
  );
}
