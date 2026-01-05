'use client';

import { useDataTable } from '@/components/data-table';
import { AccountFragmentFragment } from '@/graphql/graphql';
import { NetworkStatus } from '@apollo/client';
import { Spinner } from '@/components/spinner';
import { AccountCard } from './account-card';

export function AccountsTableBody() {
  const { table, networkStatus } = useDataTable<AccountFragmentFragment>();

  const loading = networkStatus === NetworkStatus.loading;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 p-4">
        <Spinner className="aspect-square h-4 w-4" />
        Carregando contas...
      </div>
    );
  }

  if (!table.getRowModel().rows?.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-muted-foreground">Nenhuma conta encontrada</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {table.getRowModel().rows.map((row) => (
        <AccountCard key={row.id} account={row.original} />
      ))}
    </div>
  );
}
