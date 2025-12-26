import { TransactionsCardView } from '@/modules/transactions/components/transactions-card-view';

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Movimentações</h1>
      <TransactionsCardView />
    </div>
  );
}
