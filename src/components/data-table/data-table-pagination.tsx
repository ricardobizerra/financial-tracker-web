import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDataTable } from '.';
import { cn } from '@/lib/utils';
import { useSidebar } from '../ui/sidebar';
import { NetworkStatus } from '@apollo/client';
import { useEffect, useState } from 'react';

export function DataTablePagination() {
  const {
    table,
    pageSize,
    setPageSize,
    initialPageSize,
    showPageCount,
    pageInfo,
    paginate,
    networkStatus,
  } = useDataTable();
  const { state } = useSidebar();

  type PaginateMode = Parameters<typeof paginate>[0];

  const [loadingButton, setLoadingButton] = useState<PaginateMode | null>(null);
  const paginationLoading = networkStatus === NetworkStatus.fetchMore;

  const handlePaginate = (action: PaginateMode) => {
    setLoadingButton(action);
    paginate?.(action);
  };

  useEffect(() => {
    if (!paginationLoading) {
      setLoadingButton(null);
    }
  }, [paginationLoading]);

  if (!pageInfo) return <></>;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-4 px-2',
        state === 'expanded' ? 'lg:flex-row' : 'md:flex-row',
      )}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getSelectedRowModel().rows.length} de{' '}
        {table.getRowModel().rows.length} linha
        {table.getRowModel().rows.length !== 1 && 's'} selecionada
        {table.getSelectedRowModel().rows.length !== 1 && 's'}.
      </div>
      <div className="flex flex-col items-center gap-4 min-[450px]:flex-row lg:gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 3, 4, 5].map((multiplier) => {
                const size = multiplier * initialPageSize;
                return (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {!!showPageCount && (
          <div className="flex items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePaginate('begin')}
            disabled={paginationLoading || !pageInfo?.hasPreviousPage}
            loading={loadingButton === 'begin'}
          >
            <span className="sr-only">Vá à primeira página</span>
            {loadingButton !== 'begin' && <ChevronsLeft />}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate('previous')}
            disabled={paginationLoading || !pageInfo?.hasPreviousPage}
            loading={loadingButton === 'previous'}
          >
            <span className="sr-only">Vá à página anterior</span>
            {loadingButton !== 'previous' && <ChevronLeft />}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePaginate('next')}
            disabled={paginationLoading || !pageInfo?.hasNextPage}
            loading={loadingButton === 'next'}
          >
            <span className="sr-only">Vá à próxima página</span>
            {loadingButton !== 'next' && <ChevronRight />}
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePaginate('end')}
            disabled={paginationLoading || !pageInfo?.hasNextPage}
            loading={loadingButton === 'end'}
          >
            <span className="sr-only">Vá à última página</span>
            {loadingButton !== 'end' && <ChevronsRight />}
          </Button>
        </div>
      </div>
    </div>
  );
}
