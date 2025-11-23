'use client';

import { useQuery } from '@apollo/client';
import { AccountQuery } from '../../graphql/accounts-queries';
import { useParams } from 'next/navigation';
import { TransactionsTable } from '@/modules/transactions/components/transactions-table';
import { AccountType } from '@/graphql/graphql';
import { AccountCreditCardTracking } from './account-credit-card-tracking';

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
    return <div>Carregando...</div>;
  }

  if (!account) {
    return <div>Conta não encontrada</div>;
  }

  if (accountType === AccountType.CreditCard) {
    return <AccountCreditCardTracking account={account} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Movimentações</h1>
      <TransactionsTable />
    </div>
  );
}
