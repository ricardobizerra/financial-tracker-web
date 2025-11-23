'use client';

import { AccountFragmentFragment } from '@/graphql/graphql';
import { TransactionsTable } from '@/modules/transactions/components/transactions-table';
import { useQuery } from '@apollo/client';
import { BillingQuery } from '../../graphql/accounts-queries';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Loader2,
  CreditCard as CreditCardIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { formatDate } from '@/lib/formatters/date';
import { formatCurrency } from '@/lib/formatters/currency';

export function AccountCreditCardTracking({
  account,
}: {
  account: AccountFragmentFragment;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data, loading, refetch } = useQuery(BillingQuery, {
    variables: {
      accountId: account.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const billing = data?.billing?.billing;
  const nextBillingId = data?.billing?.nextBillingId;
  const previousBillingId = data?.billing?.previousBillingId;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      {
        label: string;
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
      }
    > = {
      PENDING: { label: 'Pendente', variant: 'secondary' },
      PAID: { label: 'Pago', variant: 'default' },
      OVERDUE: { label: 'Atrasado', variant: 'destructive' },
      CLOSED: { label: 'Fechado', variant: 'outline' },
    };

    const config = statusConfig[status] || {
      label: status,
      variant: 'outline' as const,
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleCloseBilling = async () => {
    if (!billing) return;

    try {
      setIsProcessing(true);
      // TODO: Implement close billing mutation
      // await closeBilling({ variables: { id: billing.id } });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      await refetch();
      toast.success('Sucesso', {
        description: 'Fatura fechada com sucesso',
      });
    } catch (error) {
      toast.error('Erro', {
        description: 'Não foi possível fechar a fatura. Tente novamente.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayBilling = async () => {
    if (!billing) return;

    try {
      setIsProcessing(true);
      // TODO: Implement pay billing mutation
      // await payBilling({ variables: { id: billing.id } });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      await refetch();
      toast.success('Sucesso', {
        description: 'Pagamento realizado com sucesso',
      });
    } catch (error) {
      toast.error('Erro', {
        description: 'Não foi possível realizar o pagamento. Tente novamente.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadBilling = async (billingId: string) => {
    // The BillingQuery will be refetched with the new billingId
    // The component will automatically update with the new data
    await refetch({ accountId: account.id, id: billingId });
  };

  if (loading && !billing) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!billing) {
    return <div>Nenhuma fatura encontrada para este cartão.</div>;
  }

  const usagePercentage = (billing.totalAmount / billing.limit) * 100;

  return (
    <div className="space-y-6">
      {/* Card Summary */}
      <Card className="border border-border bg-muted/50 dark:bg-muted/10">
        <CardContent className="grid grid-cols-5 gap-4 p-6">
          <div className="col-span-4 flex flex-col items-start gap-2">
            <div>
              <CardTitle className="text-2xl">{account.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {account.institution?.logoUrl ? (
                <Image
                  src={account.institution.logoUrl}
                  alt={account.institution.name}
                  width={32}
                  height={32}
                  className="rounded-md border border-border object-cover"
                />
              ) : (
                <CreditCardIcon className="h-8 w-8 text-muted-foreground" />
              )}
              <p className="text-sm text-muted-foreground">
                {account.institution?.name || 'Instituição não informada'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousBillingId && loadBilling(previousBillingId)}
          disabled={!previousBillingId || isProcessing}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Fatura anterior</span>
        </Button>

        <div className="text-center">
          <h3 className="text-lg font-medium">
            {formatDate(billing.periodStart)} - {formatDate(billing.periodEnd)}
          </h3>
          <div className="flex items-center justify-center gap-2">
            {getStatusBadge(billing.status)}
            {billing.status === 'OVERDUE' && billing.paymentDate && (
              <span className="text-sm text-destructive">
                Vencimento: {formatDate(billing.paymentDate)}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => nextBillingId && loadBilling(nextBillingId)}
          disabled={!nextBillingId || isProcessing}
        >
          <span>Fatura seguinte</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Billing Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="space-y-2 p-4">
                <p className="text-sm text-muted-foreground">Total da fatura</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(billing.totalAmount)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2 p-4">
                <p className="text-sm text-muted-foreground">
                  Data de vencimento
                </p>
                <p className="text-lg">
                  {billing.paymentDate
                    ? formatDate(billing.paymentDate)
                    : 'N/A'}
                </p>
                {billing.status === 'CLOSED' && billing.paymentTransaction && (
                  <p className="text-xs text-muted-foreground">
                    Pago em: {formatDate(billing.paymentTransaction.createdAt)}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2 p-4">
                <div className="flex justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">Limite usado</span>
                  <span className="font-bold">{usagePercentage}%</span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <div className="text-right text-xs text-muted-foreground">
                  {formatCurrency(billing.totalAmount)} de{' '}
                  {formatCurrency(billing.limit)}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mb-6 flex justify-end gap-4">
              {billing.status === 'PENDING' && (
                <Button onClick={handleCloseBilling} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Fechar fatura'
                  )}
                </Button>
              )}

              {(billing.status === 'CLOSED' ||
                billing.status === 'OVERDUE') && (
                <Button onClick={handlePayBilling} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Pagar fatura'
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Transactions */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Transações</h3>
            <TransactionsTable cardBillingId={billing.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
