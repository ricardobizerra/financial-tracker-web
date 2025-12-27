'use client';

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { z } from 'zod';
import {
  TransactionFragmentFragment,
  OrdenationAccountModel,
  OrderDirection,
} from '@/graphql/graphql';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formFields, TsForm } from '@/components/ts-form';
import { toast } from 'sonner';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { AccountsQuery } from '@/modules/accounts/graphql/accounts-queries';
import { PayBillingMutation } from '@/modules/accounts/graphql/accounts-mutations';
import {
  TransactionsQuery,
  TransactionsGroupedByPeriodQuery,
} from '../graphql/transactions-queries';

const editBillingPaymentSchema = z.object({
  sourceAccount: formFields.select.describe(
    'Conta de origem * // Selecione a conta para pagamento',
  ),
  date: formFields.date.describe('Data do pagamento * // Insira a data'),
  description: formFields.text.describe(
    'Descrição // Insira a descrição do pagamento',
  ),
});

interface BillingPaymentEditDialogProps {
  transaction: TransactionFragmentFragment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillingPaymentEditDialog({
  transaction,
  open,
  onOpenChange,
}: BillingPaymentEditDialogProps) {
  const billingPayment = transaction.billingPayment;

  const accountsQueryOptions = useQuery(AccountsQuery, {
    variables: {
      first: 50,
      orderBy: OrdenationAccountModel.Name,
      orderDirection: OrderDirection.Asc,
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
  });

  const accountsOptions = useMemo(
    () =>
      accountsQueryOptions.data?.accounts.edges?.map((edge) => ({
        value: edge.node.id,
        label: edge.node.name,
        data: {
          ...edge.node,
        },
      })) || [],
    [accountsQueryOptions.data?.accounts.edges],
  );

  const accountsPageInfo = accountsQueryOptions.data?.accounts.pageInfo;

  const paginate = useCallback(() => {
    accountsQueryOptions.fetchMore({
      variables: {
        after: accountsPageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          accounts: {
            ...prev.accounts,
            ...fetchMoreResult.accounts,
            edges: [
              ...(prev.accounts.edges || []),
              ...(fetchMoreResult.accounts.edges || []),
            ],
          },
        };
      },
    });
  }, [accountsQueryOptions, accountsPageInfo]);

  const [payBillingMutation, { loading }] = useMutation(PayBillingMutation, {
    refetchQueries: [TransactionsQuery, TransactionsGroupedByPeriodQuery],
    onCompleted: () => {
      toast.success('Pagamento de fatura atualizado!');
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof editBillingPaymentSchema>,
  ) => {
    if (!billingPayment) return;

    await payBillingMutation({
      variables: {
        billingId: billingPayment.id,
        sourceAccountId: data.sourceAccount.value,
        date: data.date.toISOString(),
        description: data.description,
      },
    });
  };

  if (!billingPayment) return null;

  // Encontrar a opção da conta de origem atual
  const currentSourceAccountOption = transaction.sourceAccount?.id
    ? {
        value: transaction.sourceAccount.id,
        label: transaction.sourceAccount.name,
        data: transaction.sourceAccount,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Pagamento da Fatura</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <TsForm
            schema={editBillingPaymentSchema}
            onSubmit={handleSubmit}
            defaultValues={{
              date: new Date(transaction.date),
              description: transaction.description || '',
              sourceAccount: currentSourceAccountOption,
            }}
            props={{
              sourceAccount: {
                options: accountsOptions,
                renderLabel: (option) => (
                  <div className="flex items-center gap-3 py-1.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
                      <InstitutionLogo
                        logoUrl={option.data?.institution?.logoUrl}
                        name={option.data?.institution?.name || ''}
                        size="sm"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <p className="truncate text-sm font-medium">
                        {option.label}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {option.data?.institution?.name}
                      </p>
                    </div>
                  </div>
                ),
                fetchMore: paginate,
                networkStatus: accountsQueryOptions.networkStatus,
                hasMore: accountsPageInfo?.hasNextPage,
              },
            }}
            renderAfter={() => (
              <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
