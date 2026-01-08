import { AuthRegisterForm } from '@/modules/auth/components/auth-register-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta',
};

export default function Page() {
  return <AuthRegisterForm />;
}
