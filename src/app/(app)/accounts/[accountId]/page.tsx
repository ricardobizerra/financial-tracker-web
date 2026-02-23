import { AccountTracking } from '@/modules/accounts/components/pages/account-tracking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conta',
};

export default function Page() {
  return <AccountTracking />;
}
