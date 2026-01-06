import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <section className="max-w-screen flex h-full w-screen flex-col bg-muted/75 px-6 py-4">
      {children}
    </section>
  );
}
