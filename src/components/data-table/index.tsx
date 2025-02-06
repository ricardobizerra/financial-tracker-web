'use client';

import { ColumnSort, Row, SortingState } from '@tanstack/react-table';
import {
  BaseData,
  DataTableContext,
  DataTableNoQueryProvider,
  DataTableProvider,
} from './data-table-provider';
import { DataTableContent } from './data-table-content';
import { Dispatch, SetStateAction, useContext } from 'react';
import { InitialColumnDef } from './utils';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { NetworkStatus, OperationVariables } from '@apollo/client';
import { OrderDirection } from '@/graphql/graphql';

type DataTableBaseProps<TData> = {
  columns: InitialColumnDef<TData>[];
  showPageCount?: boolean;
  enableHiding?: boolean;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableSorting?: boolean;
  searchPlaceholder?: string;
};

type DataTableSortingState<TData> = Array<{
  key: Extract<keyof TData, string>;
  direction: OrderDirection;
}>;

export type DataTableQueryProps<TData> = {
  mode: 'query';
  query:
    | DocumentNode
    | TypedDocumentNode<
        { __typename?: string } & { [key: string]: BaseData<TData> },
        OperationVariables
      >;
  variables?: OperationVariables;
  initialPageSize?: number;
  initialSorting: DataTableSortingState<TData>[number];
} & DataTableBaseProps<TData>;

export type DataTableNoQueryProps<TData> = {
  mode: 'no-query';
  data: TData[];
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  pageSize?: number;
  setPageSize?: Dispatch<SetStateAction<number>>;
  initialPageSize?: number;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
  paginate?: (mode: 'begin' | 'previous' | 'next' | 'end') => void;
  networkStatus?: NetworkStatus;
} & DataTableBaseProps<TData>;

export type DataTableProps<TData> =
  | DataTableQueryProps<TData>
  | DataTableNoQueryProps<TData>;

export function DataTable<TData>(props: DataTableProps<TData>) {
  if (props.mode === 'query') {
    return (
      <DataTableProvider {...props}>
        <DataTableContent />
      </DataTableProvider>
    );
  }

  return (
    <DataTableNoQueryProvider {...props}>
      <DataTableContent />
    </DataTableNoQueryProvider>
  );
}

export function useDataTable() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }

  return context;
}
