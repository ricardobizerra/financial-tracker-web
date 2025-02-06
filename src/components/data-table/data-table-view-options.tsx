'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useDataTable } from '.';
import { SimpleTooltip } from '../simple-tooltip';

export function DataTableViewOptions() {
  const { table, columnHeaders } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 />
          Visualização
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.getAllColumns().map((column) => {
          const disabled =
            typeof column.accessorFn === 'undefined' || !column.getCanHide();

          return (
            <SimpleTooltip
              key={column.id}
              label="Essa coluna não pode ser ocultada"
              side="left"
              hidden={!disabled}
            >
              <div>
                <DropdownMenuCheckboxItem
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  disabled={disabled}
                >
                  {columnHeaders[column.id]}
                </DropdownMenuCheckboxItem>
              </div>
            </SimpleTooltip>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
