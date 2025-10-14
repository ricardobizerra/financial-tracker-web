import { AuthSignInForm } from '@/modules/auth/components/auth-sign-in-form';

export default function Page() {
  return (
    <section className="max-w-screen flex h-full w-screen flex-col bg-muted px-6 py-4">
      <AuthSignInForm />
    </section>
  );
}
