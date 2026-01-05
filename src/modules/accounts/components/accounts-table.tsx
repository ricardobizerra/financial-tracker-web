import { DataTable } from '@/components/data-table';
import { OrderDirection } from '@/graphql/graphql';
import { AccountsQuery } from '../graphql/accounts-queries';
import { AccountsTableBody } from './accounts-table-body';
import { AccountCreateForm } from './account-create-form';

export function AccountsTable() {
  return (
    <DataTable
      mode="query"
      query={AccountsQuery}
      initialSorting={{
        direction: OrderDirection.Asc,
        key: 'name',
      }}
      columns={[]}
      CustomBody={<AccountsTableBody />}
      actionButtons={<AccountCreateForm />}
    />
  );
}
