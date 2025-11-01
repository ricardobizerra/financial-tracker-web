'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { selectSchema } from './utils/select-schema';
import { z } from 'zod';
import { NetworkStatus } from '@apollo/client';

interface SelectFieldProps extends BaseFieldProps {
  options: z.infer<typeof selectSchema>[];
  renderLabel?: (option: z.infer<typeof selectSchema>) => React.ReactNode;
  networkStatus?: NetworkStatus;
  hasMore?: boolean;
  fetchMore?: () => void;
}

export function SelectField({
  options,
  renderLabel,
  networkStatus,
  hasMore = false,
  fetchMore,
  ...baseProps
}: SelectFieldProps) {
  const {
    field: { onChange, value, ...field },
  } = useTsController<z.infer<typeof selectSchema>>();
  const { placeholder } = useDescription();
  const { setValue } = useFormContext();

  const loading = networkStatus === NetworkStatus.loading;
  const fetchMoreLoading = networkStatus === NetworkStatus.fetchMore;

  return (
    <Select
      onValueChange={(value) =>
        setValue(field.name, {
          value,
          label: options.find((option) => option.value === value)?.label,
          data: options.find((option) => option.value === value)?.data,
        })
      }
      defaultValue={value?.value}
    >
      <BaseField {...baseProps}>
        <SelectTrigger disabled={baseProps.disabled}>
          <SelectValue placeholder={placeholder || 'Selecione'} />
        </SelectTrigger>
      </BaseField>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {renderLabel ? renderLabel(option) : option.label}
          </SelectItem>
        ))}
        {hasMore && (
          <div
            className="relative flex w-full cursor-default select-none items-center justify-center rounded-sm py-1.5 pl-2 pr-8 text-sm text-muted-foreground outline-none focus:bg-accent focus:text-accent-foreground"
            onClick={fetchMore}
          >
            {fetchMoreLoading ? 'Carregando...' : 'Carregar mais'}
          </div>
        )}
        {loading && (
          <div className="animate-pulse py-2 text-center text-sm text-muted-foreground">
            Carregando...
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
