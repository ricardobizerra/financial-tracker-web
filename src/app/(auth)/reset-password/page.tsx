import { ResetPasswordForm } from '@/modules/auth/components/reset-password-form';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
