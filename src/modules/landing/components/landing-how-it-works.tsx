'use client';

import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Wallet, LineChart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Crie sua conta',
    description:
      'Cadastre-se gratuitamente em segundos com e-mail ou Google.',
  },
  {
    number: '02',
    icon: Wallet,
    title: 'Adicione suas contas',
    description:
      'Configure suas contas bancárias, cartões e carteiras de forma simples.',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Acompanhe e planeje',
    description:
      'Visualize seu fluxo de caixa, transações e alcance seus objetivos.',
  },
];

export function LandingHowItWorks() {
  return (
    <section className="bg-muted/50 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Comece em <span className="text-primary">3 passos simples</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Configurar sua vida financeira nunca foi tão fácil.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile and after last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-24 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-primary/10 md:block" />
              )}

              <Card className="relative h-full border-none bg-background shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
