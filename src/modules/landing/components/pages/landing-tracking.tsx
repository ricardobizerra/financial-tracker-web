import { AppSidebar } from '@/components/app-sidebar';
import { LandingHeader } from '../landing-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getSidebarState } from '@/lib/sidebar';
import { APP_CONFIG } from '@/lib/config';
import { UsersTable } from '@/modules/users/components/users-table';

export async function LandingTracking() {
  const defaultOpen = await getSidebarState();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {APP_CONFIG.sidebarAppearance === 'app-and-landing' && <AppSidebar />}
      <main className="max-w-screen flex h-full w-screen flex-col gap-8 px-6 py-4">
        <LandingHeader />
        <UsersTable />
      </main>
    </SidebarProvider>
  );
}
