import { createTsForm, createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';
import { TextField } from './form-fields/text-field';
import { NumberField } from './form-fields/number-field';
import { cn } from '@/lib/utils';
import { EmailField } from './form-fields/email-field';
import { CreatePasswordField } from './form-fields/create-password-field';
import { PasswordField } from './form-fields/password-field';
import { CurrencyField } from './form-fields/currency-field';

interface FormComponentProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isPreventDefault?: boolean;
  disabled?: boolean;
}

function FormComponent({
  children,
  onSubmit,
  isPreventDefault,
  className,
  disabled,
  ...rest
}: FormComponentProps) {
  return (
    <fieldset disabled={disabled}>
      <form
        className={cn('space-y-4', className)}
        {...rest}
        onSubmit={(e) => {
          if (isPreventDefault) {
            e.preventDefault();
            e.stopPropagation();
          }
          onSubmit?.(e);
        }}
      >
        {children}
      </form>
    </fieldset>
  );
}

const createPasswordSchema = z
  .string()
  .min(6, 'A senha deve conter, no mínimo, 6 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter, no mínimo, uma letra maiúscula')
  .regex(/[a-z]/, 'A senha deve conter, no mínimo, uma letra minúscula')
  .regex(/\d/, 'A senha deve conter, no mínimo, um caractere numérico')
  .regex(/[@$!%*?&#]/, 'A senha deve conter, no mínimo, um caractere especial');

export const formFields = {
  text: z.string(),
  number: z.number(),
  email: createUniqueFieldSchema(z.string().email(), 'email'),
  password: createUniqueFieldSchema(z.string(), 'password'),
  createPassword: createUniqueFieldSchema(
    createPasswordSchema,
    'createPassword',
  ),
  currency: createUniqueFieldSchema(z.string(), 'currency'),
};

const mapping = [
  [formFields.text, TextField],
  [formFields.number, NumberField],
  [formFields.email, EmailField],
  [formFields.password, PasswordField],
  [formFields.createPassword, CreatePasswordField],
  [formFields.currency, CurrencyField],
] as const;

export const TsForm = createTsForm(mapping, { FormComponent });
