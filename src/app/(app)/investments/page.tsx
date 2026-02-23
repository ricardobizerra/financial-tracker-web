import { InvestmentsTracking } from '@/modules/investments/components/pages/investments-tracking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investimentos',
};

export default function InvestmentsPage() {
  return <InvestmentsTracking />;
}
