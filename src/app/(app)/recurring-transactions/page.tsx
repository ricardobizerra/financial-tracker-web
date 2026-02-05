import type { Metadata } from 'next';
import { RecurringTransactionsContent } from './content';

export const metadata: Metadata = {
  title: 'Transações Recorrentes',
};

export default function RecurringTransactionsPage() {
  return <RecurringTransactionsContent />;
}
