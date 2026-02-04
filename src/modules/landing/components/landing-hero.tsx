'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-primary/10" />

      {/* Floating decorative elements */}
      <div className="absolute left-10 top-20 -z-10 h-72 w-72 animate-pulse rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-3xl delay-1000" />

      {/* Floating icons */}
      <div className="absolute left-[10%] top-[20%] hidden animate-bounce opacity-20 lg:block">
        <Wallet className="h-12 w-12 text-primary" />
      </div>
      <div className="absolute right-[15%] top-[30%] hidden animate-bounce opacity-20 delay-300 lg:block">
        <CreditCard className="h-10 w-10 text-primary" />
      </div>
      <div className="absolute bottom-[30%] left-[15%] hidden animate-bounce opacity-20 delay-500 lg:block">
        <PiggyBank className="h-14 w-14 text-primary" />
      </div>
      <div className="absolute bottom-[25%] right-[10%] hidden animate-bounce opacity-20 delay-700 lg:block">
        <BarChart3 className="h-11 w-11 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Controle financeiro inteligente
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Seu centro de comando{' '}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              financeiro completo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Acompanhe contas, gerencie investimentos e visualize seu fluxo de
            caixa — tudo em um aplicativo moderno e intuitivo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 px-8 text-base">
              <Link href="/register">
                Começar Grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 text-base"
            >
              <Link href="#features">Saiba Mais</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Dados seguros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
