'use client';

import { AccountFragmentFragment, AccountType } from '@/graphql/graphql';
import { TransactionsViews } from '@/modules/transactions/components/transactions-views';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters/currency';
import { AccountTypeBadge } from '../account-type-badge';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';

interface AccountWalletTrackingProps {
  account: AccountFragmentFragment;
  isDebitCard?: boolean;
}

export function AccountWalletTracking({ account, isDebitCard = false }: AccountWalletTrackingProps) {
  const balance = Number(account.balance || 0);

  return (
    <div className="space-y-6">
      {/* Account Header Card */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <InstitutionLogo
            logoUrl={account.institution?.logoUrl}
            name={account.institution?.name || 'Sem instituição'}
            color={account.institution?.color}
            size="xl"
          />
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
      <TransactionsViews accountId={account.id} hideAccount isDebitCard={isDebitCard} />
    </div>
  );
}
