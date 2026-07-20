import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getSidebarState } from '@/lib/sidebar';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const defaultOpen = await getSidebarState();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <section className="flex min-w-0 flex-1 flex-col overflow-x-hidden px-6 py-4">
        {children}
      </section>
    </SidebarProvider>
  );
}
