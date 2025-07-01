'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@apollo/client';
import { TotalInvestmentsQuery } from '../graphql/investments-queries';
import { VariationBadge } from '@/components/variation-badge';

export function InvestmentsCards() {
  const { data } = useQuery(TotalInvestmentsQuery);

  const cards = [
    {
      title: 'Total investido',
      value: data?.totalInvestments.initialAmount,
    },
    {
      title: 'Total atual',
      value: data?.totalInvestments.currentAmount,
      variation: data?.totalInvestments.currentVariation,
    },
    {
      title: 'Total c/ dedução IRPF',
      value: data?.totalInvestments.taxedAmount,
      variation: data?.totalInvestments.taxedVariation,
    },
  ];

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="relative">
            <CardDescription>{card.title}</CardDescription>

            <CardTitle className="text-2xl font-semibold min-[250px]:text-3xl">
              {card.value}
            </CardTitle>

            {card.variation && (
              <div className="absolute right-4 top-4">
                <VariationBadge variation={card.variation} size="lg" />
              </div>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
