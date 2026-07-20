import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { formatCurrency } from '@/lib/formatters/currency';
import { formatDate } from '@/lib/formatters/date';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CreditCard, TrendingUp, Wallet, Eye, Check } from 'lucide-react';
import { SimpleTooltip } from '@/components/simple-tooltip';
import {
  InstitutionLinkFragmentFragment,
  CardType,
  CardBillingStatus,
} from '@/graphql/graphql';
import { getTextColorForBackground } from '@/lib/color';
import { AccountCreateForm } from '@/modules/accounts/components/account-create-form';
import { CardCreateForm } from '@/modules/accounts/components/card-create-form';
import { differenceInCalendarDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CardBillingStatusBadge } from '@/modules/cards/components/card-billing-status-badge';

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

                const pendingBillings = currentBilling ? [currentBilling] : [];
                const closedBillings = payableBillings.filter(
                  (b) => b.status === CardBillingStatus.Closed,
                );
                const overdueBillings = payableBillings.filter(
                  (b) => b.status === CardBillingStatus.Overdue,
                );

                const renderBillingLabel = (billing: {
                  id: string;
                  status: CardBillingStatus;
                  periodEnd?: string | null;
                  periodStart: string;
                  paymentDate?: string | null;
                }) => {
                  const date = new Date(
                    billing.periodEnd ?? billing.periodStart,
                  );
                  const isPending =
                    billing.status === CardBillingStatus.Pending;
                  const isPayable =
                    billing.status === CardBillingStatus.Closed ||
                    billing.status === CardBillingStatus.Overdue;

                  const relativeDate = isPending
                    ? billing.periodEnd
                      ? formatRelativeDateLine(billing.periodEnd, 'closing')
                      : null
                    : isPayable && billing.paymentDate
                      ? formatRelativeDateLine(billing.paymentDate, 'due')
                      : null;

                  return (
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-foreground">
                        <span className="capitalize">
                          {format(date, 'MMMM', { locale: ptBR })}
                        </span>
                        <span>
                          {format(date, " 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      {relativeDate && (
                        <div className="text-xs leading-tight text-muted-foreground/80">
                          <span className="font-medium text-foreground/70">
                            {relativeDate.prefix}
                          </span>{' '}
                          <span>({relativeDate.date})</span>
                        </div>
                      )}
                    </div>
                  );
                };

                type BillingGroup = {
                  status: CardBillingStatus;
                  billings: typeof pendingBillings;
                  borderClass: string;
                  bgClass: string;
                  amountClass: string;
                  actionIcon: React.ReactNode;
                  actionTooltip: string;
                };

                const groups: BillingGroup[] = [
                  {
                    status: CardBillingStatus.Overdue,
                    billings: overdueBillings,
                    borderClass: 'border-red-700 dark:border-red-400',
                    bgClass: 'bg-red-50/50 dark:bg-red-900/15',
                    amountClass: 'text-red-700 dark:text-red-400',
                    actionIcon: <Check className="h-4 w-4" />,
                    actionTooltip: 'Confirmar pagamento',
                  },
                  {
                    status: CardBillingStatus.Closed,
                    billings: closedBillings,
                    borderClass: 'border-amber-500/50 dark:border-amber-400/50',
                    bgClass: 'bg-amber-50/40 dark:bg-amber-900/10',
                    amountClass: 'text-amber-700 dark:text-amber-400',
                    actionIcon: <Check className="h-4 w-4" />,
                    actionTooltip: 'Confirmar pagamento',
                  },
                  {
                    status: CardBillingStatus.Pending,
                    billings: pendingBillings,
                    borderClass: 'border-green-500/50 dark:border-green-400/50',
                    bgClass: 'bg-green-50/40 dark:bg-green-900/10',
                    amountClass: 'text-green-700 dark:text-green-400',
                    actionIcon: <Eye className="h-4 w-4" />,
                    actionTooltip: 'Ver detalhes da fatura',
                  },
                ].filter((g) => g.billings.length > 0);

                return (
                  <div
                    key={card.id}
                    className="flex flex-col overflow-hidden rounded-lg border bg-background"
                  >
                    {/* Card header: type · name */}
                    <div className="flex items-baseline gap-1.5 px-3 pb-2 pt-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Crédito
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {card.name}
                      </span>
                    </div>

                    {/* Status subcards */}
                    {groups.length > 0 ? (
                      <div className="flex flex-col gap-2 px-3 pb-3">
                        {groups.map((group) => (
                          <div
                            key={group.status}
                            className={cn(
                              'overflow-hidden rounded-md border',
                              group.bgClass,
                              group.borderClass,
                            )}
                          >
                            {/* Subcard header */}
                            <div className="flex items-center px-3 pb-1 pt-2">
                              <CardBillingStatusBadge
                                status={group.status}
                                className={cn(
                                  'border-0 bg-transparent p-0 dark:bg-transparent',
                                  group.amountClass,
                                )}
                                label={(label) =>
                                  `Fatura ${label.toLowerCase()}`
                                }
                              />
                            </div>
                            {/* Billing rows */}
                            <div className="flex flex-col divide-y divide-border/30">
                              {group.billings.map((billing) => (
                                <div
                                  key={billing.id}
                                  className="flex items-center justify-between px-3 pb-2 pt-1"
                                >
                                  {renderBillingLabel(billing)}
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={cn(
                                        'text-sm font-semibold',
                                        group.amountClass,
                                      )}
                                    >
                                      {formatCurrency(
                                        Number(billing.totalAmount ?? 0),
                                      )}
                                    </span>
                                    <SimpleTooltip
                                      label={group.actionTooltip}
                                      side="top"
                                    >
                                      <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-7 w-7"
                                        asChild
                                      >
                                        <Link
                                          href={`/cards/${card.id}?billingId=${billing.id}`}
                                        >
                                          {group.actionIcon}
                                          <span className="sr-only">
                                            {group.actionTooltip}
                                          </span>
                                        </Link>
                                      </Button>
                                    </SimpleTooltip>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-3 pb-3 text-xs text-muted-foreground">
                        Nenhuma fatura encontrada.
                      </div>
                    )}

                    {/* Footer */}
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
                  <div className="flex items-baseline gap-1.5 px-3 pb-2 pt-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Débito
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {card.name}
                    </span>
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
