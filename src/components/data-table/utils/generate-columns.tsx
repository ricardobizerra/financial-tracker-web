'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../data-table-column-header';
import { DataTableProps } from '..';
import { Checkbox } from '@/components/ui/checkbox';

type InitialColumnDefType = 'custom' | 'text' | 'date';

export type InitialColumnDef<TData> = {
  title: string;
  accessorKey: keyof TData;
} & (
  | ({ type: 'custom' } & ColumnDef<TData>)
  | {
      type: Exclude<InitialColumnDefType, 'custom'>;
      subtitle?: string;
      enableSorting?: boolean;
      enableHiding?: boolean;
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

  for (const column of initialColumns) {
    if (column.type === 'custom') {
      const { type, ...rest } = column;
      columns.push({
        ...rest,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} {...rest} />
        ),
      });
    } else {
      const { accessorKey, enableSorting, enableHiding, ...rest } = column;

      columns.push({
        accessorKey,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} {...rest} />
        ),
        enableSorting: enableSorting ?? globalEnableSorting,
        enableHiding: enableHiding ?? globalEnableHiding,
      });
    }
  }

  return [...selectColumn, ...columns];
}
