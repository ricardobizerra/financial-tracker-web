'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-emerald-600" />

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Comece hoje mesmo
            </span>
          </div>

          {/* Headline */}
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Pronto para transformar sua vida financeira?
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/80">
            Junte-se a milhares de pessoas que já estão organizando suas
            finanças de forma simples e eficiente.
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 px-8 text-base font-semibold"
          >
            <Link href="/register">
              Criar Conta Gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {/* Trust note */}
          <p className="mt-6 text-sm text-white/60">
            Sem cartão de crédito • Configuração em 2 minutos
          </p>
        </div>
      </div>
    </section>
  );
}
