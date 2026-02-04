'use client';

import { Separator } from '@/components/ui/separator';
import { ReceiptIcon } from 'lucide-react';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <ReceiptIcon className="h-6 invert dark:invert-0" />
            <span className="font-semibold">Financial Tracker</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">
              Recursos
            </a>
            <a href="/login" className="transition-colors hover:text-foreground">
              Entrar
            </a>
            <a href="/register" className="transition-colors hover:text-foreground">
              Criar Conta
            </a>
          </nav>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Financial Tracker. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
