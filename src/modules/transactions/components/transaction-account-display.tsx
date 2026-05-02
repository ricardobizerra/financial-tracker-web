import {
  TransactionFragmentFragment,
  TransactionType,
  TransactionStatus,
} from '@/graphql/graphql';
import { InstitutionLogo } from '@/modules/accounts/components/institution-logo';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionAccountDisplayProps {
  transaction: TransactionFragmentFragment;
  hideWarnings?: boolean;
}

export function TransactionAccountDisplay({
  transaction,
  hideWarnings = false,
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
    const account = transaction.sourceAccount;
    const accountInstitution = account?.institutionLink?.institution;
    if (!card) return null;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          {cardInstitution && (
            <InstitutionLogo
              logoUrl={cardInstitution.logoUrl}
              name={cardInstitution.name}
              size="sm"
            />
          )}
          <p className="text-sm font-medium">
            <span className="text-muted-foreground">Cartão</span>{' '}
            <span>{card.name}</span>
          </p>
        </div>
        {account ? (
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              {transaction.status === TransactionStatus.Completed
                ? 'Paga'
                : 'A pagar'}{' '}
              via
            </p>
            {accountInstitution && (
              <InstitutionLogo
                logoUrl={accountInstitution.logoUrl}
                name={accountInstitution.name}
                size="sm"
              />
            )}
            <p className="text-sm font-medium">
              <span className="text-muted-foreground">Conta</span>{' '}
              <span>{account.name}</span>
            </p>
          </div>
        ) : (
          <p className="text-xs font-medium text-muted-foreground">
            Conta de pagamento não definida
          </p>
        )}
      </div>
    );
  }

  if (isBetweenAccounts) {
    const sourceInst = transaction.sourceAccount?.institutionLink?.institution;
    const destInst = transaction.destinyAccount?.institutionLink?.institution;
    return (
      <div className="flex items-center gap-1.5">
        {sourceInst && (
          <>
            <InstitutionLogo
              logoUrl={sourceInst.logoUrl}
              name={sourceInst.name}
              size="sm"
            />
            <p className="text-sm font-medium">
              <span className="text-muted-foreground">Conta</span>{' '}
              <span>{transaction.sourceAccount?.name}</span>
            </p>
            <ArrowRight className="h-3 w-3" />
          </>
        )}
        {destInst && (
          <InstitutionLogo
            logoUrl={destInst.logoUrl}
            name={destInst.name}
            size="sm"
          />
        )}
        <p className="text-sm font-medium">
          <span className="text-muted-foreground">Conta</span>{' '}
          <span>{transaction.destinyAccount?.name}</span>
        </p>
      </div>
    );
  }

  const account = isIncome
    ? transaction.destinyAccount
    : (transaction.sourceAccount ??
      (transaction.sourceCard as typeof transaction.sourceAccount | null) ??
      transaction.cardBilling?.paymentTransaction?.sourceAccount);

  if (!account) return null;

  const institution = account.institutionLink?.institution;

  return (
    <div className="flex items-center gap-1.5">
      {institution && (
        <InstitutionLogo
          logoUrl={institution.logoUrl}
          name={institution.name}
          size="sm"
        />
      )}
      <div className="flex flex-col">
        <p className="text-sm font-medium">
          <span className="text-muted-foreground">
            {transaction.sourceCard ? 'Cartão' : 'Conta'}
          </span>{' '}
          <span>{account.name}</span>
        </p>
        {isExpenseForBilling && !hideWarnings && transaction.cardBilling && (
          <span className="text-xs font-normal">
            {(transaction.installments?.length ?? 0) > 0 ? (
              <>
                Parcelado em{' '}
                <span className="font-semibold">
                  {transaction.installments?.length}x
                </span>{' '}
                a partir da fatura de{' '}
                {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </>
            ) : (
              <>
                Fatura de{' '}
                {format(transaction.cardBilling.periodEnd, "MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
                {transaction.cardBilling.paymentDate && (
                  <>
                    {' '}
                    ·{' '}
                    <span className="font-semibold">
                      A ser paga até{' '}
                      {format(
                        transaction.cardBilling.paymentDate,
                        "dd 'de' MMMM 'de' yyyy",
                        { locale: ptBR },
                      )}
                    </span>
                  </>
                )}
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
