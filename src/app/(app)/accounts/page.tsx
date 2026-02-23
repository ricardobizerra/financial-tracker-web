import { AccountsTracking } from '@/modules/accounts/components/pages/accounts-tracking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contas',
};

export default function AccountsPage() {
  return <AccountsTracking />;
}
