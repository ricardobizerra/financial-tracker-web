import { AuthSignInForm } from '@/modules/auth/components/auth-sign-in-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
};

export default function Page() {
  return <AuthSignInForm />;
}
