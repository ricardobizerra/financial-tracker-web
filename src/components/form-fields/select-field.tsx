'use client';

import { useDescription, useTsController } from '@ts-react/form';
import { useFormContext } from 'react-hook-form';
import { BaseField, BaseFieldProps } from './base-field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { selectSchema } from './utils/select-schema';
import { z } from 'zod';
import { NetworkStatus } from '@apollo/client';

interface SelectFieldProps extends BaseFieldProps {
  options: z.infer<typeof selectSchema>[];
  renderLabel?: (option: z.infer<typeof selectSchema>) => React.ReactNode;
  renderGroup?: (groupName: string) => React.ReactNode;
  networkStatus?: NetworkStatus;
  hasMore?: boolean;
  fetchMore?: () => void;
}

export function SelectField({
  options,
  renderLabel,
  renderGroup,
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

  const hasGroups = options?.some((option) => !!option.group);

  const groupedOptions = hasGroups
    ? options?.reduce<Record<string, z.infer<typeof selectSchema>[]>>(
        (groups, option) => {
          const group = option.group || 'Other';
          if (!groups[group]) {
            groups[group] = [];
          }
          groups[group].push(option);
          return groups;
        },
        {} as Record<string, z.infer<typeof selectSchema>[]>,
      )
    : undefined;

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
        {hasGroups
          ? Object.entries(groupedOptions || {}).map(
              ([groupName, groupOptions]) => (
                <SelectGroup key={groupName}>
                  {renderGroup ? (
                    renderGroup(groupName)
                  ) : (
                    <SelectLabel>{groupName}</SelectLabel>
                  )}
                  {groupOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {renderLabel ? renderLabel(option) : option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ),
            )
          : options?.map((option) => (
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
