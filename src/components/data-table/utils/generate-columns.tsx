'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../data-table-column-header';
import { DataTableProps } from '..';
import { Checkbox } from '@/components/ui/checkbox';

export type InitialColumnDef<TData> = Omit<ColumnDef<TData>, 'header'> &
  (
    | {
        header: ColumnDef<TData>['header'];
        title?: never;
        subtitle?: never;
      }
    | {
        header?: never;
        title: string;
        subtitle?: string;
      }
  ) &
  (
    | {
        id: string;
        accessorKey?: never;
      }
    | {
        accessorKey: string;
        id?: never;
      }
  );

export function generateColumns<TData>({
  initialColumns,
  enableRowSelection,
  globalEnableSorting,
  globalEnableHiding,
}: {
  initialColumns: InitialColumnDef<TData>[];
  enableRowSelection: DataTableProps<TData>['enableRowSelection'];
  globalEnableSorting: boolean;
  globalEnableHiding: boolean;
}): ColumnDef<TData>[] {
  const selectColumn: ColumnDef<TData>[] =
    (typeof enableRowSelection === 'boolean' && enableRowSelection) ||
    typeof enableRowSelection === 'function'
      ? [
          {
            id: 'select',
            accessorKey: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                disabled={!row.getCanSelect()}
              />
            ),
            enableSorting: false,
            enableHiding: false,
          },
        ]
      : [];

  const columns: ColumnDef<TData>[] = [];

  for (const initialColumn of initialColumns) {
    columns.push({
      ...initialColumn,
      id: initialColumn.id ?? initialColumn.accessorKey,
      ...(!!initialColumn.accessorKey && {
        accessorKey: initialColumn.accessorKey,
      }),
      header: !!initialColumn.header
        ? initialColumn.header
        : ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title={initialColumn.title ?? ''}
              subtitle={initialColumn.subtitle}
            />
          ),
      enableSorting: initialColumn.enableSorting ?? globalEnableSorting,
      enableHiding: initialColumn.enableHiding ?? globalEnableHiding,
    });
  }

  return [...selectColumn, ...columns];
}
