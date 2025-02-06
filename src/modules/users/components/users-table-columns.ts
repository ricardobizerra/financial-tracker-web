import { InitialColumnDef } from '@/components/data-table/utils';
import { UserModel } from '@/graphql/graphql';

export const usersTableColumns: InitialColumnDef<UserModel>[] = [
  { type: 'text', title: 'ID', accessorKey: 'id' },
  { type: 'text', title: 'Nome', accessorKey: 'name' },
  { type: 'text', title: 'Email', accessorKey: 'email' },
  { type: 'text', title: 'Role', accessorKey: 'role', enableHiding: true },
];
