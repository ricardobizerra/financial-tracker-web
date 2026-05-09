import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CreditCard, TrendingUp, Wallet } from 'lucide-react';
import {
  InstitutionLinkFragmentFragment,
  CardType,
  CardBillingStatus,
} from '@/graphql/graphql';
import { getTextColorForBackground } from '@/lib/color';
import { AccountCreateForm } from '@/modules/accounts/components/account-create-form';
import { CardCreateForm } from '@/modules/accounts/components/card-create-form';
import { differenceInCalendarDays } from 'date-fns';

function getCardStatusUi(status: CardBillingStatus) {
  const statusConfig: Record<
    CardBillingStatus,
    { label: string; className: string }
  > = {
    [CardBillingStatus.Pending]: {
      label: 'Pendente',
      className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    [CardBillingStatus.Paid]: {
      label: 'Pago',
      className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    [CardBillingStatus.Overdue]: {
      label: 'Atrasado',
      className: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    [CardBillingStatus.Closed]: {
      label: 'Fechado',
      className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    },
    [CardBillingStatus.Completed]: {
      label: 'Concluída',
      className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
  };

  return (
    statusConfig[status] || {
      label: status,
      className: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    }
  );
}

function formatRelativeDateLine(
  date: Date | string,
  type: 'closing' | 'due',
): { prefix: string; date: string } {
  const targetDate = new Date(date);
  const now = new Date();
  const dayDiff = differenceInCalendarDays(targetDate, now);
  const absoluteDate = formatDate(targetDate);

  const isPast = dayDiff < 0;
  const verb =
    type === 'closing'
      ? isPast
        ? 'Fechada'
        : 'Fecha'
      : isPast
        ? 'Vencida'
        : 'Vence';

  let relativeLabel = '';
  if (dayDiff === 0) {
    relativeLabel = 'hoje';
  } else if (dayDiff === 1) {
    relativeLabel = 'amanhã';
  } else {
    const absDiff = Math.abs(dayDiff);
    if (absDiff >= 7) {
      const weeks = Math.round(absDiff / 7);
      const weeksLabel = `${weeks} semana${weeks > 1 ? 's' : ''}`;
      relativeLabel = isPast ? `há ${weeksLabel}` : `em ${weeksLabel}`;
    } else {
      const daysLabel = `${absDiff} dia${absDiff > 1 ? 's' : ''}`;
      relativeLabel = isPast ? `há ${daysLabel}` : `em ${daysLabel}`;
    }
  }

  return {
    prefix: `${verb} ${relativeLabel}`,
    date: absoluteDate,
  };
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
                const currentBilling = card.currentBilling;
                const payableBillings = card.payableBillings ?? [];
                const totalAmount = Number(currentBilling?.totalAmount ?? 0);
                const statusUi = getCardStatusUi(
                  currentBilling?.status ?? CardBillingStatus.Pending,
                );
                const payableTotal = payableBillings.reduce(
                  (acc: number, billing) =>
                    acc + Number(billing.totalAmount ?? 0),
                  0,
                );
                const hasOverduePayable = payableBillings.some(
                  (billing) => billing.status === CardBillingStatus.Overdue,
                );
                const payableStatusUi = getCardStatusUi(
                  hasOverduePayable
                    ? CardBillingStatus.Overdue
                    : CardBillingStatus.Closed,
                );
                const closingLine = currentBilling?.periodEnd
                  ? formatRelativeDateLine(currentBilling.periodEnd, 'closing')
                  : null;
                const dueLine = currentBilling?.paymentDate
                  ? formatRelativeDateLine(currentBilling.paymentDate, 'due')
                  : null;

                return (
                  <div
                    key={card.id}
                    className="flex flex-col overflow-hidden rounded-lg border bg-background"
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex flex-col">
                        <span className="font-medium leading-none">
                          {card.name}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          Crédito
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">
                          {formatCurrency(totalAmount)}
                        </span>
                        <div
                          className={cn(
                            'flex items-center gap-1 rounded-full px-1.5 py-0.5 text-sm font-bold',
                            statusUi.className,
                          )}
                        >
                          {statusUi.label}
                        </div>
                      </div>
                    </div>
                    {(closingLine || dueLine) && (
                      <div className="flex flex-col gap-1 px-3 pb-3">
                        {closingLine && (
                          <div className="text-sm font-semibold text-foreground">
                            {closingLine.prefix}{' '}
                            <span className="font-normal text-muted-foreground">
                              ({closingLine.date})
                            </span>
                          </div>
                        )}
                        {dueLine && (
                          <div className="text-sm font-semibold text-foreground">
                            {dueLine.prefix}{' '}
                            <span className="font-normal text-muted-foreground">
                              ({dueLine.date})
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {payableBillings.length > 0 && (
                      <div className="border-t bg-muted/20 px-3 py-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">
                            Em aberto para pagamento ({payableBillings.length})
                          </span>
                          <span className="text-xs font-semibold">
                            {formatCurrency(payableTotal)}
                          </span>
                        </div>
                        <div className="mt-1 flex justify-end">
                          <div
                            className={cn(
                              'rounded-full px-1.5 py-0.5 text-sm font-bold',
                              payableStatusUi.className,
                            )}
                          >
                            {payableStatusUi.label}
                          </div>
                        </div>
                      </div>
                    )}
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
                      <span className="font-medium leading-none">
                        {card.name}
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
