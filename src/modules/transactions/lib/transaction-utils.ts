import {
  TransactionFragmentFragment,
  CardBillingStatus,
} from '@/graphql/graphql';

/**
 * Normaliza uma transação para edição, ajustando o valor para o total caso seja uma parcela.
 */
export function normalizeTransactionForEdit(
  transaction: TransactionFragmentFragment,
): TransactionFragmentFragment {
  const totalInstallments = transaction.totalInstallments ?? 0;
  const installmentNumber = transaction.installmentNumber ?? 0;

  if (totalInstallments <= 0 || installmentNumber <= 0) {
    return transaction;
  }

  const currentInstallment =
    transaction.installments?.find((i) =>
      transaction.installmentId
        ? i.id === transaction.installmentId
        : i.installmentNumber === installmentNumber,
    ) ?? null;

  if (!currentInstallment) {
    return transaction;
  }

  const totalInstallmentAmount = (transaction.installments || []).reduce(
    (acc, installment) => acc + Number(installment.amount || 0),
    0,
  );
  const currentAmount = Number(transaction.amount);
  const installmentAmount = Number(currentInstallment.amount);

  if (
    Math.abs(currentAmount - installmentAmount) < 0.000001 &&
    totalInstallmentAmount > 0
  ) {
    return {
      ...transaction,
      amount: totalInstallmentAmount,
      installmentNumber: 1,
      installmentId:
        transaction.installments?.find((i) => i.installmentNumber === 1)?.id ??
        null,
    };
  }

  return transaction;
}

/**
 * Formata data com mês por extenso e ano só se não for o ano atual
 * ou se for diferente do ano de referência (para parcelas)
 */
export function formatDateExtended(
  dateStr: string,
  referenceDateStr?: string | null,
): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();

  // Se tiver data de referência, comparar com ela
  if (referenceDateStr) {
    const referenceDate = new Date(referenceDateStr);
    const referenceYear = referenceDate.getFullYear();

    if (year !== referenceYear) {
      return `${day} de ${month} de ${year}`;
    }
    return `${day} de ${month}`;
  }

  // Caso padrão: comparar com o ano atual
  const currentYear = new Date().getFullYear();
  if (year === currentYear) {
    return `${day} de ${month}`;
  } else {
    return `${day} de ${month} de ${year}`;
  }
}

/**
 * Formata período da fatura (mês/ano)
 */
export function formatBillingPeriod(periodStartStr: string): string {
  const date = new Date(periodStartStr);
  const month = date
    .toLocaleDateString('pt-BR', { month: 'short' })
    .replace('.', '');
  const year = date.getFullYear();
  return `${month}/${year}`;
}

/**
 * Retorna informações formatadas sobre o status da fatura
 */
export function getBillingStatusInfo(status: CardBillingStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case CardBillingStatus.Pending:
      return {
        label: 'Aberta',
        className:
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      };
    case CardBillingStatus.Closed:
      return {
        label: 'Fechada',
        className:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      };
    case CardBillingStatus.Overdue:
      return {
        label: 'Vencida',
        className:
          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      };
    case CardBillingStatus.Paid:
      return {
        label: 'Paga',
        className:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      };
    case CardBillingStatus.Completed:
      return {
        label: 'Concluída',
        className:
          'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      };
    default:
      return { label: status, className: 'bg-gray-100 text-gray-700' };
  }
}
