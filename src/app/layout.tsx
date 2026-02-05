import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppProvider } from '@/providers/app-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - FinancialTracker',
    default: 'Financial Tracker - Seu Centro de Comando Financeiro',
  },
  description:
    'Acompanhe contas, gerencie investimentos e visualize seu fluxo de caixa. Controle financeiro completo com suporte a PIX, boleto, cartões e investimentos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'absolute inset-0 font-sans antialiased',
          inter.className,
        )}
        suppressHydrationWarning
      >
        <main className="flex h-full">
          <AppProvider>{children}</AppProvider>
        </main>
        <Toaster closeButton duration={5000} pauseWhenPageIsHidden />
      </body>
    </html>
  );
}
