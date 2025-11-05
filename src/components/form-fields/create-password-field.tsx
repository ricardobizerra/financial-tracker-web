import { useDescription, useTsController } from '@ts-react/form';
import { BaseFieldProps } from './base-field';
import { BaseTextField } from './base-text-field';
import { CheckIcon, XIcon } from 'lucide-react';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useFormField } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useFormContext } from 'react-hook-form';
import { PasswordToggle } from '../password-toggle';

interface CreatePasswordFieldProps extends BaseFieldProps {}

export function CreatePasswordField({
  ...baseProps
}: CreatePasswordFieldProps) {
  const { field } = useTsController<string>();
  const { label } = useDescription();
  const { formItemId } = useFormField();
  const { setError } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordCriteria = useMemo(
    () => [
      {
        key: 'hasMinLength',
        value: !!field.value && field.value.length >= 6,
        label: 'Mínimo de 6 caracteres',
      },
      {
        key: 'hasUppercase',
        value: !!field.value && /[A-Z]/.test(field.value),
        label: 'Letra maiúscula',
      },
      {
        key: 'hasLowercase',
        value: !!field.value && /[a-z]/.test(field.value),
        label: 'Letra minúscula',
      },
      {
        key: 'hasNumber',
        value: !!field.value && /\d/.test(field.value),
        label: 'Número',
      },
      {
        key: 'hasSpecialChar',
        value: !!field.value && /[@$!%*?&#]/.test(field.value),
        label: 'Caractere especial (@, $, !, %, *, ?, &, ou #)',
      },
    ],
    [field.value],
  );

  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!!field.value && !!confirmPassword && field.value !== confirmPassword) {
      setError(field.name, {
        type: 'manual',
        message: 'As senhas devem ser iguais',
      });
    }
  }, [field.value, confirmPassword, setError, field.name]);

  return (
    <div className="flex flex-col gap-2">
      <BaseTextField
        inputType={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        rightSlot={
          <PasswordToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword((old) => !old)}
          />
        }
        withError={false}
        {...baseProps}
      />

      <ValidationGroup>
        {passwordCriteria.map(({ key, value, label }) => (
          <ValidationItem key={key} isValid={value} label={label} />
        ))}
      </ValidationGroup>

      <Label className="mt-4" htmlFor={`confirm-${formItemId}`}>
        Confirme sua {label?.toLowerCase() || 'senha'}
      </Label>

      <Input
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder={`Insira sua ${label?.toLowerCase() || 'senha'} novamente`}
        onChange={(e) => setConfirmPassword(e.target.value || undefined)}
        value={confirmPassword ?? ''}
        rightSlot={
          <PasswordToggle
            isVisible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((old) => !old)}
          />
        }
      />

      <ValidationGroup>
        <ValidationItem
          isValid={!!field.value && field.value === confirmPassword}
          label="As senhas devem ser iguais"
        />
      </ValidationGroup>
    </div>
  );
}

function ValidationGroup({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border px-2 py-1">
      {children}
    </div>
  );
}

function ValidationItem({
  isValid,
  label,
}: {
  isValid: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center justify-start gap-1">
      {isValid ? (
        <CheckIcon size={16} className="text-green-700 dark:text-green-500" />
      ) : (
        <XIcon size={16} className="text-red-700 dark:text-red-500" />
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
