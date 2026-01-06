'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import RbIcon from '@/static/rb-icon.svg';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <RbIcon className="h-7 invert dark:invert-0" />
          <span className="text-lg font-semibold">Financial Tracker</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Recursos
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle triggerVariant="ghost" />
          {APP_CONFIG.withAuth && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Começar Grátis</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
