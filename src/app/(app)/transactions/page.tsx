import { TransactionsCardView } from '@/modules/transactions/components/transactions-card-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movimentações',
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
      <h1 className="text-2xl font-bold">Movimentações</h1>
      <TransactionsCardView />
    </div>
  );
}
