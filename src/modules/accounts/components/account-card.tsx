import { AccountFragmentFragment } from '@/graphql/graphql';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AccountTypeBadge } from './account-type-badge';
import { AccountStatusBadge } from './account-status-badge';
import { LastUpdatedLabel } from '@/components/last-updated-label';

export function AccountCard({ account }: { account: AccountFragmentFragment }) {
  return (
    <Card
      key={account.id}
      className="relative overflow-hidden border-l-4 transition-shadow hover:shadow-md"
      style={{
        borderColor: account.institution?.color || '#e5e7eb',
      }}
    >
      <CardContent className="p-4">
        <CardHeader className="mb-4 flex flex-row items-center justify-between gap-4 p-0">
          <div className="flex items-center gap-3">
            {account.institution?.logoUrl ? (
              <div className="relative h-8 w-8">
                <Image
                  src={account.institution.logoUrl}
                  alt={account.institution.name}
                  className="rounded-full object-cover"
                  fill
                  sizes="32px"
                />
              </div>
            ) : (
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor: account.institution?.color || '#e5e7eb',
                }}
              >
                <span className="text-xs font-medium text-white">
                  {account.institution?.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-base">{account.name}</CardTitle>
              <CardDescription className="text-xs">
                {account.institution?.name || 'Sem instituição'}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={cn(
                'text-lg font-semibold',
                account.balance >= 0
                  ? 'text-green-700 dark:text-green-500'
                  : 'text-red-700 dark:text-red-500',
              )}
            >
              {formatCurrency(account.balance)}
            </span>
          </div>
        </CardHeader>

        {account.description && (
          <p className="mb-4 text-sm text-muted-foreground">
            {account.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <AccountTypeBadge type={account.type} />
            <AccountStatusBadge isActive={account.isActive} />
          </div>
          <LastUpdatedLabel updatedAt={account.updatedAt} />
        </div>
      </CardContent>
    </Card>
  );
}
