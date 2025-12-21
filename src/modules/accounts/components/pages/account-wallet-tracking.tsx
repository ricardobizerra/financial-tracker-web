'use client';

import { AccountFragmentFragment, AccountType } from '@/graphql/graphql';
import { TransactionsViews } from '@/modules/transactions/components/transactions-views';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters/currency';
import Image from 'next/image';
import { AccountTypeBadge } from '../account-type-badge';

interface AccountWalletTrackingProps {
  account: AccountFragmentFragment;
}

export function AccountWalletTracking({
  account,
}: AccountWalletTrackingProps) {
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

      {/* Transaction Views with multiple visualization options */}
      <TransactionsViews
        accountId={account.id}
        hiddenColumns={['account']}
      />
    </div>
  );
}
