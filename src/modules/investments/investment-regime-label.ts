import { Regime } from '@/graphql/graphql';

export const investmentRegimeLabel: Record<Regime, string> = {
  [Regime.Cdi]: 'CDI',
  [Regime.Poupanca]: 'Poupança',
};
