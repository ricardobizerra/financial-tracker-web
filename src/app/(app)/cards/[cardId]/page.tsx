import { CardTracking } from '@/modules/cards/components/pages/card-tracking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cartão',
};

export default function Page() {
  return <CardTracking />;
}
