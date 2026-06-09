import { SimulationPageContent } from '@/modules/simulation/components/simulation-page-content';
import { FlaskConical } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulações',
};

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-4 lg:min-h-0 lg:flex-1">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <FlaskConical className="h-4 w-4" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Simulações</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Crie cenários hipotéticos para planejar receitas, despesas e
          investimentos sem impactar seus dados reais.
        </p>
      </div>
      <SimulationPageContent />
    </div>
  );
}
