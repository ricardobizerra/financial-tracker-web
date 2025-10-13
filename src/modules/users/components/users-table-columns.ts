import { InitialColumnDef } from '@/components/data-table/utils';
import { UserModel } from '@/graphql/graphql';

export const usersTableColumns: InitialColumnDef<UserModel>[] = [
  { title: 'ID', accessorKey: 'id' },
  { title: 'Nome', accessorKey: 'name' },
  { title: 'Email', accessorKey: 'email' },
  { title: 'Role', accessorKey: 'role', enableHiding: true },
];
