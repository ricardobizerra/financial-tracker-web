'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const screenshots = [
  {
    src: '/screenshots/accounts.png',
    title: 'Gestão Multi-Contas',
    description:
      'Visualize todas as suas contas em um só lugar: corrente, poupança, carteira, cartões e investimentos.',
  },
  {
    src: '/screenshots/transactions.png',
    title: 'Transações Organizadas',
    description:
      'Acompanhe suas receitas e despesas organizadas por período, com visualização inteligente do fluxo financeiro.',
  },
  {
    src: '/screenshots/cash-flow.png',
    title: 'Fluxo de Caixa',
    description:
      'Gráficos detalhados mostrando a evolução do seu saldo, com projeções futuras baseadas em transações recorrentes.',
  },
  {
    src: '/screenshots/investments.png',
    title: 'Acompanhamento de Investimentos',
    description:
      'Monitore o desempenho dos seus investimentos com rentabilidade em tempo real, CDI e Poupança.',
  },
  {
    src: '/screenshots/recurring.png',
    title: 'Transações Recorrentes',
    description:
      'Configure pagamentos e recebimentos automáticos com frequência personalizada.',
  },
];

export function LandingScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="screenshots" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Veja o <span className="text-primary">aplicativo em ação</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça as principais funcionalidades e interface do sistema.
          </p>
        </div>

        {/* Screenshot carousel */}
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            {/* Main image container */}
            <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
              <div className="relative aspect-video w-full">
                <Image
                  src={screenshots[currentIndex].src}
                  alt={screenshots[currentIndex].title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/90 to-transparent" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {screenshots[currentIndex].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {screenshots[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Próximo</span>
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Screenshot {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
