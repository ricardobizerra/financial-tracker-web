'use client';

import { useQuery } from '@apollo/client';
import { AccountQuery } from '../../graphql/accounts-queries';
import { useParams } from 'next/navigation';
import { AccountType, CardType } from '@/graphql/graphql';
import { AccountCreditCardTracking } from './account-credit-card-tracking';
import { AccountWalletTracking } from './account-wallet-tracking';
import { AccountInvestmentTracking } from './account-investment-tracking';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const WALLET_ACCOUNT_TYPES = [
  AccountType.Checking,
  AccountType.Wallet,
  AccountType.Other,
];

const INVESTMENT_ACCOUNT_TYPES = [AccountType.Investment, AccountType.Savings];

export function AccountTracking() {
  const { accountId } = useParams<{ accountId: string }>();

  const accountQuery = useQuery(AccountQuery, {
    variables: {
      id: accountId,
    },
  });

  const account = accountQuery.data?.account;
  const accountType = account?.type;

  if (accountQuery.loading) {
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

  if (!account) {
    return <div>Conta não encontrada</div>;
  }

  if (accountType === AccountType.CreditCard) {
    // Cartões de débito usam visão de conta corrente (sem faturas)
    if (account.accountCard?.type === CardType.Debit) {
      return <AccountWalletTracking account={account} isDebitCard />;
    }
    return <AccountCreditCardTracking account={account} />;
  }

  if (accountType && INVESTMENT_ACCOUNT_TYPES.includes(accountType)) {
    return <AccountInvestmentTracking account={account} />;
  }

  if (accountType && WALLET_ACCOUNT_TYPES.includes(accountType)) {
    return <AccountWalletTracking account={account} />;
  }

  // Fallback para tipos não suportados
  return <div>Tipo de conta não suportado: {accountType}</div>;
}
