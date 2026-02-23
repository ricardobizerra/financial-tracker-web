import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getSidebarState } from '@/lib/sidebar';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const defaultOpen = await getSidebarState();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <section className="max-w-screen flex h-full w-screen flex-col px-6 py-4">
        {children}
      </section>
    </SidebarProvider>
  );
}
