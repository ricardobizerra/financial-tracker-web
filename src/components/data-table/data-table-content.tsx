'use client';

import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '../ui/input';
import { DataTablePagination } from './data-table-pagination';
import { DataTableViewOptions } from './data-table-view-options';
import { useDataTable } from '.';
import { NetworkStatus } from '@apollo/client';
import { Spinner } from '../spinner';

export function DataTableContent() {
  const {
    table,
    columns,
    enableHiding,
    searchPlaceholder,
    search,
    setSearch,
    networkStatus,
    actionButtons,
  } = useDataTable();

  const loading = networkStatus === NetworkStatus.loading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        {search !== undefined && (
          <Input
            placeholder={searchPlaceholder || 'Buscar itens...'}
            value={search ?? ''}
            onChange={(e) => setSearch?.(e.target.value)}
            className="max-w-sm"
          />
        )}
        <div className="flex items-center gap-4">
          {actionButtons}
          {!!enableHiding && <DataTableViewOptions />}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-10 w-full text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Spinner className="aspect-square h-4 w-4" />
                    Carregando...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-10 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination />
    </div>
  );
}
