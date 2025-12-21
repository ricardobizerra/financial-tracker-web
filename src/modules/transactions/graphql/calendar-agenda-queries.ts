import { graphql } from '@/graphql';

export const TransactionsCalendarQuery = graphql(`
  query TransactionsCalendar($accountId: String, $year: Int!, $month: Int!) {
    transactionsCalendar(accountId: $accountId, year: $year, month: $month) {
      days {
        date
        totalIncome
        totalExpense
        transactionCount
        transactions {
          id
          description
          amount
          type
          status
        }
      }
      monthTotalIncome
      monthTotalExpense
      monthBalance
    }
  }
`);

export const FinancialAgendaQuery = graphql(`
  query FinancialAgenda($accountId: String, $daysAhead: Int!) {
    financialAgenda(accountId: $accountId, daysAhead: $daysAhead) {
      groups {
        label
        transactions {
          id
          description
          amount
          type
          status
          date
          daysUntilDue
          isOverdue
        }
      }
      totalIncome
      totalExpense
      balance
      pendingCount
    }
  }
`);
