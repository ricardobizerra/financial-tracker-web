import { TransactionsTimelineView } from '@/modules/transactions/components/transactions-timeline-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movimentações',
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* O header agora é stick na página toda, mas o scroll é o do body */}
      <TransactionsTimelineView />
    </div>
  );
}
