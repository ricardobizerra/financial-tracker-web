import {
  TransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
} from '@/graphql/graphql';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TransactionAccountSelector } from './transaction-account-selector';

interface TransactionAccountDisplayProps {
  transaction: TransactionFragmentFragment;
  hideWarnings?: boolean;
  onUpdateAccount?: (accountId: string, type: 'source' | 'destiny') => void;
  disabled?: boolean;
}

export function TransactionAccountDisplay({
  transaction,
  hideWarnings = false,
  onUpdateAccount,
  disabled = false,
}: TransactionAccountDisplayProps) {
  const isIncome = transaction.type === TransactionType.Income;
  const isExpense = transaction.type === TransactionType.Expense;
  const isBetweenAccounts =
    transaction.type === TransactionType.BetweenAccounts;
  const isBillingPayment = !!transaction.billingPayment;
  const isPartOfBilling = !!transaction.cardBilling;
  const isExpenseForBilling =
    isExpense &&
    (isPartOfBilling || (transaction.totalInstallments ?? 0) > 0) &&
    !hideWarnings;

  if (isBillingPayment) {
    const card = transaction.billingPayment?.card;
    const cardInstitution = card?.institutionLink?.institution;
    if (!card) return null;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          {cardInstitution && (
            <InstitutionLogo
              logoUrl={cardInstitution.logoUrl}
              name={cardInstitution.name}
              size="xs"
            />
          )}
          <p className="text-sm">
            <span className="font-normal text-muted-foreground">Cartão</span>{' '}
            <span className="font-medium">{card.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-normal text-muted-foreground">
            {transaction.status === TransactionStatus.Completed
              ? 'Paga'
              : 'A pagar'}{' '}
            via
          </p>
          <TransactionAccountSelector
            currentAccountId={transaction.sourceAccount?.id}
            onSelect={(id) => onUpdateAccount?.(id, 'source')}
            disabled={disabled || !onUpdateAccount}
            placeholder="Adicionar conta"
          />
        </div>
      </div>
    );
  }

  if (isBetweenAccounts) {
    return (
      <div className="flex items-center gap-1.5">
        <TransactionAccountSelector
          currentAccountId={transaction.sourceAccount?.id}
          onSelect={(id) => onUpdateAccount?.(id, 'source')}
          disabled={disabled || !onUpdateAccount}
          placeholder="Origem"
        />
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <TransactionAccountSelector
          currentAccountId={transaction.destinyAccount?.id}
          onSelect={(id) => onUpdateAccount?.(id, 'destiny')}
          disabled={disabled || !onUpdateAccount}
          placeholder="Destino"
        />
      </div>
    );
  }

  const account = isIncome
    ? transaction.destinyAccount
    : (transaction.sourceAccount ??
      (transaction.sourceCard as typeof transaction.sourceAccount | null) ??
      transaction.cardBilling?.paymentTransaction?.sourceAccount);

  // Se for cartão mas não tiver conta (ex: despesa de fatura), mostramos o cartão de forma estática por enquanto
  if (transaction.sourceCard && !isIncome) {
    const institution = transaction.sourceCard.institutionLink?.institution;
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          {institution && (
            <InstitutionLogo
              logoUrl={institution.logoUrl}
              name={institution.name}
              size="xs"
            />
          )}
          <p className="text-sm">
            <span className="font-normal text-muted-foreground">Cartão</span>{' '}
            <span className="font-medium">{transaction.sourceCard.name}</span>
          </p>
        </div>
        {isExpenseForBilling && !hideWarnings && transaction.cardBilling && (
          <span className="text-xs font-normal text-muted-foreground">
            {(transaction.totalInstallments ?? 0) > 0 ? (
              <>
                Parcelado em{' '}
                <span className="font-semibold">
                  {transaction.totalInstallments}x
                </span>{' '}
                a partir da fatura de{' '}
                {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </>
            ) : (
              <>
                <span className="font-semibold">
                  Fatura de{' '}
                  {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                  {' • '}
                </span>
                {transaction.cardBilling.paymentDate && (
                  <span>
                    Vencimento em{' '}
                    {format(
                      new Date(transaction.cardBilling.paymentDate),
                      "dd 'de' MMMM",
                      {
                        locale: ptBR,
                      },
                    )}
                  </span>
                )}
              </>
            )}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <TransactionAccountSelector
          currentAccountId={account?.id}
          onSelect={(id) =>
            onUpdateAccount?.(id, isIncome ? 'destiny' : 'source')
          }
          disabled={disabled || !onUpdateAccount}
          placeholder="Adicionar conta"
        />
      </div>
    </div>
  );
}
