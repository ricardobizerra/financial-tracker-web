import { InstitutionLinksTracking } from '@/modules/institution-link/components/institution-links-tracking';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contas',
};

export default function AccountsPage() {
  return <InstitutionLinksTracking />;
}
