'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CardType } from '@/graphql/graphql';
import { AccountCreditCardTracking } from '@/modules/accounts/components/pages/account-credit-card-tracking';
import { AccountWalletTracking } from '@/modules/accounts/components/pages/account-wallet-tracking';
import { CardQuery } from '@/modules/accounts/graphql/accounts-queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export function CardTracking() {
  const { cardId } = useParams<{ cardId: string }>();

  const cardQuery = useQuery(CardQuery, {
    variables: {
      id: cardId,
    },
  });

  const card = cardQuery.data?.card;
  const cardType = card?.type;

  if (cardQuery.loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="ml-auto text-right">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-1 h-8 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!card) {
    return <div>Conta não encontrada</div>;
  }

  // if (cardType === CardType.Debit) {
  //   return <AccountWalletTracking account={card} isDebitCard />;
  // }
  return <AccountCreditCardTracking card={card} />;
}
