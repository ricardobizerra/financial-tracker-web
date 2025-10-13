'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { DataTableNoQueryProps, DataTableProps, DataTableQueryProps } from '.';
import { generateColumns } from './utils';
import { useQuery } from '@apollo/client';
import { OrderDirection } from '@/graphql/graphql';

export type DataTableContextType<
  TData extends RowData = any, // eslint-disable-line @typescript-eslint/no-explicit-any
> = ReturnType<typeof useDataTableController<TData>>;

export const DataTableContext = createContext<DataTableContextType>(
  {} as DataTableContextType,
);

export function DataTableProvider<TData>({
  children,
  ...props
}: PropsWithChildren<DataTableQueryProps<TData>>) {
  const value = useDataTableController<TData>(props);

  return (
    <DataTableContext.Provider value={value as DataTableContextType}>
      {children}
    </DataTableContext.Provider>
  );
}

export function DataTableNoQueryProvider<TData>({
  children,
  ...props
}: PropsWithChildren<DataTableNoQueryProps<TData>>) {
  const value = useDataTableNoQueryController<TData>(props);

  return (
    <DataTableContext.Provider value={value as DataTableContextType}>
      {children}
    </DataTableContext.Provider>
  );
}

export interface BaseData<TData> {
  edges: Array<{
    node: TData;
    cursor: string;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

function useDataTableController<TData>({
  columns,
  query,
  variables,
  initialPageSize = 10,
  showPageCount = false,
  enableHiding = false,
  enableRowSelection = false,
  enableSorting = true,
  searchPlaceholder,
  initialSorting,
  actionButtons,
  CustomBody,
}: DataTableQueryProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: initialSorting?.key,
      desc: initialSorting?.direction === OrderDirection.Desc,
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageSize, setPageSize] = useState(initialPageSize);

  const generatedColumns = useMemo(
    () =>
      generateColumns({
        initialColumns: columns,
        enableRowSelection,
        globalEnableHiding: enableHiding,
        globalEnableSorting: enableSorting,
      }),
    [columns, enableRowSelection, enableHiding, enableSorting],
  );

  const columnHeaders = useMemo(
    () =>
      columns.reduce(
        (prev, column) =>
          !!column.accessorKey
            ? { ...prev, [column.accessorKey]: column.title }
            : prev,
        {} as Record<keyof TData, string>,
      ),
    [columns],
  );

  const graphQlQuery = useQuery(query, {
    variables: {
      first: pageSize,
      ...(!!search && {
        search,
      }),
      ...(sorting?.length > 0 && {
        orderBy: sorting?.[0]?.id,
        orderDirection: sorting?.[0]?.desc
          ? OrderDirection.Desc
          : OrderDirection.Asc,
      }),
      ...variables,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const data = useMemo(
    () =>
      graphQlQuery.data?.[Object.keys(graphQlQuery.data)[0]]?.edges?.map(
        (e) => e?.node,
      ) || [],
    [graphQlQuery.data],
  ) as TData[];

  const networkStatus = graphQlQuery.networkStatus;

  const pageInfo = useMemo(
    () => graphQlQuery.data?.[Object.keys(graphQlQuery.data)[0]]?.pageInfo,
    [graphQlQuery.data],
  );

  const paginate = useCallback(
    (mode: 'begin' | 'previous' | 'next' | 'end') => {
      const variables = {
        begin: {},
        previous: {
          before: pageInfo?.startCursor ? pageInfo.startCursor : '',
          last: pageSize,
          first: undefined,
        },
        next: {
          after: pageInfo?.endCursor as undefined,
        },
        end: {
          first: undefined,
          last: pageSize,
        },
      };

      graphQlQuery.fetchMore({
        variables: {
          ...variables[mode],
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            [Object.keys(graphQlQuery.data || {})[0]]: {
              ...fetchMoreResult[Object.keys(graphQlQuery.data || {})[0]],
              edges: [
                ...fetchMoreResult[Object.keys(graphQlQuery.data || {})[0]]
                  ?.edges,
              ],
            },
          };
        },
      });
    },
    [graphQlQuery, pageInfo, pageSize],
  );

  const table = useReactTable({
    data,
    columns: generatedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableHiding: enableHiding || columns.some((c) => c.enableHiding),
    enableRowSelection,
    enableSorting: enableSorting || columns.some((c) => c.enableSorting),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    table,
    columns,
    columnHeaders,
    data,
    pageSize,
    setPageSize,
    initialPageSize,
    showPageCount,
    enableHiding: enableHiding || columns.some((c) => c.enableHiding),
    enableRowSelection,
    enableSorting: enableSorting || columns.some((c) => c.enableSorting),
    searchPlaceholder,
    search,
    setSearch,
    pageInfo,
    paginate,
    networkStatus,
    actionButtons,
    CustomBody,
  };
}

function useDataTableNoQueryController<TData>({
  columns,
  data,
  pageSize = 10,
  setPageSize,
  initialPageSize = 10,
  showPageCount = false,
  enableHiding = false,
  enableRowSelection = false,
  enableSorting = true,
  searchPlaceholder,
  search,
  setSearch,
  sorting,
  setSorting,
  pageInfo,
  paginate,
  networkStatus,
  actionButtons,
  CustomBody,
}: DataTableNoQueryProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const generatedColumns = useMemo(
    () =>
      generateColumns({
        initialColumns: columns,
        enableRowSelection,
        globalEnableHiding: enableHiding,
        globalEnableSorting: enableSorting,
      }),
    [columns, enableRowSelection, enableHiding, enableSorting],
  );

  const columnHeaders = useMemo(
    () =>
      columns.reduce(
        (prev, column) =>
          !!column.accessorKey
            ? { ...prev, [column.accessorKey]: column.title }
            : prev,
        {} as Record<keyof TData, string>,
      ),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: generatedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableHiding: enableHiding || columns.some((c) => c.enableHiding),
    enableRowSelection,
    enableSorting: enableSorting || columns.some((c) => c.enableSorting),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    table,
    columns,
    columnHeaders,
    data,
    pageSize,
    setPageSize,
    initialPageSize,
    showPageCount,
    enableHiding: enableHiding || columns.some((c) => c.enableHiding),
    enableRowSelection,
    enableSorting: enableSorting || columns.some((c) => c.enableSorting),
    searchPlaceholder,
    search,
    setSearch,
    pageInfo,
    paginate,
    networkStatus,
    actionButtons,
    CustomBody,
  };
}
