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
import { formatCurrency } from '@/lib/formatters/currency';
import { Skeleton } from '@/components/ui/skeleton';

export function InvestmentsCards() {
  const { data, loading } = useQuery(TotalInvestmentsQuery);

  const cards = [
    {
      title: 'Total investido',
      value: formatCurrency(data?.totalInvestments.initialAmount || 0),
    },
    {
      title: 'Saldo Líquido (c/ IRPF)',
      value: formatCurrency(data?.totalInvestments.taxedAmount || 0),
      variation: data?.totalInvestments.taxedVariation,
    },
    {
      title: 'Rentabilidade Real (vs IPCA)',
      value: data?.totalInvestments.realVariation || '0,00%',
      isRealYield: true,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {loading ? (
        <>
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </>
      ) : (
        cards.map((card) => {
          const isNegative =
            card.isRealYield && (card.value as string)?.startsWith('-');
          const isPositive =
            card.isRealYield && (card.value as string)?.startsWith('+');

          let cardClasses = '';
          let textClasses = '';

          if (isNegative) {
            cardClasses = 'border-destructive/50 bg-destructive/5';
            textClasses = 'text-destructive';
          } else if (isPositive) {
            cardClasses = 'border-emerald-500/30 bg-emerald-500/5';
            textClasses = 'text-emerald-500';
          }

          return (
            <Card key={card.title} className={cardClasses}>
              <CardHeader className="relative h-full justify-center">
                <CardDescription className={textClasses}>
                  {card.title}
                </CardDescription>

                <CardTitle
                  className={`text-2xl font-semibold min-[250px]:text-3xl ${textClasses}`}
                >
                  {card.value}
                </CardTitle>

                {card.variation && (
                  <div className="absolute right-4 top-4">
                    <VariationBadge variation={card.variation} size="lg" />
                  </div>
                )}
              </CardHeader>
            </Card>
          );
        })
      )}
    </div>
  );
}
