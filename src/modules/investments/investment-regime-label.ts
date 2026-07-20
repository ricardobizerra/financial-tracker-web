import { Regime } from '@/graphql/graphql';

export const investmentRegimeLabel: Record<Regime, string> = {
  [Regime.Cdi]: 'CDI',
  [Regime.Poupanca]: 'Poupança',
  [Regime.Ipca]: 'Tesouro IPCA+',
  [Regime.Prefixed]: 'Tesouro Prefixado',
  [Regime.Selic]: 'Tesouro Selic',
};
