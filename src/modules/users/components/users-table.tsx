'use client';

import { DataTable } from '@/components/data-table';
import { OrderDirection } from '@/graphql/graphql';
import { UsersQuery } from '../graphql/users-queries';
import { usersTableColumns } from './users-table-columns';

export function UsersTable() {
  return (
    <DataTable
      mode="query"
      columns={usersTableColumns}
      query={UsersQuery}
      initialSorting={{ key: 'id', direction: OrderDirection.Asc }}
    />
  );
}
