import type { Metadata } from 'next';
import { InvestmentRegimeContent } from './content';

export const metadata: Metadata = {
  title: 'Investimentos',
};

export default function InvestmentsPage() {
  return <InvestmentRegimeContent />;
}
