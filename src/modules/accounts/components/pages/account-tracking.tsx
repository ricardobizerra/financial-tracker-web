'use client';

import { useQuery } from '@apollo/client';
import { AccountQuery } from '../../graphql/accounts-queries';
import { useParams } from 'next/navigation';
import { TransactionsTable } from '@/modules/transactions/components/transactions-table';
import { AccountType } from '@/graphql/graphql';
import { AccountCreditCardTracking } from './account-credit-card-tracking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters/currency';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountTypeBadge } from '../account-type-badge';

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
    return <AccountCreditCardTracking account={account} />;
  }

  const balance = Number(account.balance || 0);

  return (
    <div className="space-y-6">
      {/* Account Header Card */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
            {account.institution?.logoUrl && (
              <Image
                src={account.institution.logoUrl}
                alt={account.institution.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{account.name}</h1>
              <AccountTypeBadge type={account.type} />
              {!account.isActive && <Badge variant="secondary">Inativa</Badge>}
            </div>
            <p className="text-muted-foreground">
              {account.institution?.name}
              {account.description && ` • ${account.description}`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Saldo atual</p>
            <p
              className={`text-2xl font-bold ${
                balance >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatCurrency(balance)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table with Summary - hide account column since we're in account page */}
      <TransactionsTable hiddenColumns={['account']} />
    </div>
  );
}
