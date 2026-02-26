import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { formatCurrency } from '@/lib/formatters/currency';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CreditCard, TrendingUp, Wallet } from 'lucide-react';
import { InstitutionLinkFragmentFragment, CardType } from '@/graphql/graphql';
import { getTextColorForBackground } from '@/lib/color';
import { AccountCreateForm } from '@/modules/accounts/components/account-create-form';
import { CardCreateForm } from '@/modules/accounts/components/card-create-form';

function calculateCardBillingTotal(
  billings:
    | NonNullable<InstitutionLinkFragmentFragment['cards']>[number]['billings']
    | undefined
    | null,
) {
  if (!billings || billings.length === 0) return 0;
  // Get the most relevant billing - normally PENDING
  const activeBilling =
    billings.find((b) => b.status === 'PENDING') || billings[0];

  if (!activeBilling.transactions || activeBilling.transactions.length === 0) {
    return 0; // Backend totalAmount is missing, fallback to transaction sum if available
  }

  return activeBilling.transactions.reduce((acc, t) => {
    return acc + Number(t.amount || 0);
  }, 0);
}

function getCardStatusColor(status: string) {
  switch (status) {
    case 'OVERDUE':
      return 'bg-red-500/10 text-red-600 dark:text-red-400';
    case 'PENDING':
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
    case 'COMPLETED':
    case 'CLOSED':
    case 'PAID':
      return 'bg-green-500/10 text-green-600 dark:text-green-400';
    default:
      return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  }
}

export function InstitutionLinkCard({
  institutionLink,
}: {
  institutionLink: InstitutionLinkFragmentFragment;
}) {
  const account = institutionLink.account;
  const cards = institutionLink.cards || [];
  const investments = institutionLink.investments || [];

  const creditCards = cards.filter((c) => c.type === CardType.Credit);
  const debitCards = cards.filter((c) => c.type === CardType.Debit);

  const totalInvestments = investments.reduce(
    (sum, inv) => sum + Number(inv.amount || 0),
    0,
  );

  const institutionColor = institutionLink.institution?.color || '#e5e7eb';
  const textColor = getTextColorForBackground(
    institutionLink.institution?.color || null,
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
      {/* Institution Header */}
      <div
        className="relative flex items-center gap-4 border-b px-5 py-4 transition-colors"
        style={{
          backgroundColor: institutionColor,
          color: textColor,
          borderBottomColor: `${institutionColor}20`,
        }}
      >
        <InstitutionLogo
          logoUrl={institutionLink.institution?.logoUrl}
          name={institutionLink.institution?.name || 'Instituição'}
          color={institutionColor}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {institutionLink.institution?.name || 'Instituição'}
          </h3>
        </div>
      </div>

      <CardContent
        className="flex flex-1 flex-col gap-4 p-4 sm:p-5"
        style={{
          backgroundColor: `${institutionColor}08`, // Very subtle 3% tint of the institution color
        }}
      >
        {/* Account Subcard */}
        {account ? (
          <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Conta Corrente
                  </span>
                </div>
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight">
                <div
                  className={cn(
                    Number(account.balance) >= 0
                      ? 'text-emerald-600 dark:text-emerald-500'
                      : 'text-red-600 dark:text-red-500',
                  )}
                >
                  {formatCurrency(Number(account.balance || 0))}
                </div>
                <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                  {account.name}
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t bg-muted/30 px-4 py-3">
              <Button asChild variant="outline" size="sm">
                <Link href={`/accounts/${account.id}`}>Ver detalhes</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Conta Corrente
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Nenhuma conta cadastrada nesta instituição.
              </div>
            </div>
            <div className="flex justify-end border-t bg-muted/30 px-4 py-3">
              <AccountCreateForm institutionLinkId={institutionLink.id}>
                <Button variant="outline" size="sm">
                  Adicionar conta
                </Button>
              </AccountCreateForm>
            </div>
          </div>
        )}

        {/* Cards Subcard */}
        {cards.length > 0 ? (
          <div className="flex flex-col rounded-xl border bg-card p-1 shadow-sm">
            <div className="flex items-center gap-2 px-3 pb-2 pt-3 text-muted-foreground">
              <CreditCard className="h-4 w-4 text-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Cartões
              </span>
            </div>

            <div className="flex flex-col gap-1 px-1 pb-1">
              {creditCards.map((card) => {
                const activeBilling =
                  card.billings?.find((b) => b.status === 'PENDING') ||
                  card.billings?.[0];
                const totalAmount = calculateCardBillingTotal(card.billings);
                const statusLabel = activeBilling?.status || 'UNKNOWN';

                return (
                  <div
                    key={card.id}
                    className="flex flex-col overflow-hidden rounded-lg border bg-background"
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">
                          Final {card.lastFourDigits || '****'}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          Crédito
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-bold">
                          {formatCurrency(totalAmount)}
                        </span>
                        <div
                          className={cn(
                            'flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                            getCardStatusColor(statusLabel),
                          )}
                        >
                          {statusLabel}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end border-t bg-muted/30 px-3 py-2">
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/cards/${card.id}`}>Ver cartão</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}

              {debitCards.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-background"
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">
                        Final {card.lastFourDigits || '****'}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        Débito
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end border-t bg-muted/30 px-3 py-2">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/cards/${card.id}`}>Ver cartão</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-violet-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Cartões
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Nenhum cartão cadastrado nesta instituição.
              </div>
            </div>
            <div className="flex justify-end border-t bg-muted/30 px-4 py-3">
              <CardCreateForm institutionLinkId={institutionLink.id}>
                <Button variant="outline" size="sm">
                  Adicionar cartão
                </Button>
              </CardCreateForm>
            </div>
          </div>
        )}

        {/* Investments Subcard */}
        {investments.length > 0 ? (
          <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Investimentos
                  </span>
                </div>
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
                <div>{formatCurrency(totalInvestments)}</div>
                <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                  {investments.length} ativo{investments.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t bg-muted/30 px-4 py-3">
              <Button asChild variant="outline" size="sm">
                <Link href={`/investments?institution=${institutionLink.id}`}>
                  Ver investimentos
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Investimentos
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Nenhum investimento cadastrado nesta instituição.
              </div>
            </div>
            <div className="flex justify-end border-t bg-muted/30 px-4 py-3">
              <Button asChild variant="outline" size="sm">
                <Link
                  href={`/investments/new?institutionLinkId=${institutionLink.id}`}
                >
                  Adicionar investimento
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
