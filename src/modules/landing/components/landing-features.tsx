'use client';

import {
  ArrowLeftRight,
  BarChart3,
  CreditCard,
  Landmark,
  PiggyBank,
  Repeat,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Landmark,
    title: 'Gestão Multi-Contas',
    description:
      'Gerencie contas correntes, poupanças, carteiras, cartões de crédito e investimentos em um só lugar.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transações Inteligentes',
    description:
      'Registre receitas, despesas e transferências com PIX, cartão, boleto e dinheiro.',
  },
  {
    icon: Repeat,
    title: 'Recorrências Automáticas',
    description:
      'Configure pagamentos recorrentes com opções avançadas: semanal, quinzenal, mensal ou anual.',
  },
  {
    icon: PiggyBank,
    title: 'Acompanhamento de Investimentos',
    description:
      'Visualize seus investimentos corrigidos em tempo real pelo CDI e Poupança.',
  },
  {
    icon: CreditCard,
    title: 'Gestão de Cartões',
    description:
      'Controle faturas, limites e parcelas do cartão de crédito com ciclos de faturamento automáticos.',
  },
  {
    icon: BarChart3,
    title: 'Previsão de Fluxo de Caixa',
    description:
      'Visualize gráficos de evolução do saldo e projete suas finanças para o futuro.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-16 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo que você precisa para{' '}
            <span className="text-primary">controlar suas finanças</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Recursos poderosos projetados para simplificar sua vida financeira.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
