import { TransactionsTable } from '@/modules/transactions/components/transactions-table';

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Movimentações</h1>
      <TransactionsTable />
    </div>
  );
}
