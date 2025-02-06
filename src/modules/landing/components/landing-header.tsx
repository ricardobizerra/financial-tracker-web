import { ThemeToggle } from '@/components/theme-toggle';
import { UserAvatar } from '@/components/user-avatar';
import { APP_CONFIG } from '@/lib/config';

export function LandingHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-full">
        <p className="text-base font-semibold">Base Template</p>
        <p className="text-sm">Next.JS + TailwindCSS + GraphQL</p>
      </div>

      {APP_CONFIG.sidebarAppearance === 'only-app' && (
        <>
          {APP_CONFIG.withAuth && <UserAvatar loginClassName="w-auto" />}
          <ThemeToggle />
        </>
      )}
    </div>
  );
}
