import { AccountFragmentFragment } from '@/graphql/graphql';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AccountTypeBadge } from './account-type-badge';
import { AccountStatusBadge } from './account-status-badge';
import { LastUpdatedLabel } from '@/components/last-updated-label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { EyeIcon } from 'lucide-react';

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

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <AccountTypeBadge type={account.type} />
            <AccountStatusBadge isActive={account.isActive} />
          </div>
          <LastUpdatedLabel updatedAt={account.updatedAt} />
        </div>

        <CardFooter className="flex flex-wrap gap-4 px-0 pb-0 pt-6">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link
              href={`/accounts/${account.id}`}
              className="flex items-center gap-1"
            >
              <EyeIcon className="h-4 w-4" />
              Ver conta
            </Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
