import { graphql } from '@/graphql';

export const BalanceForecastQuery = graphql(`
  query BalanceForecast(
    $accountId: String
    $period: BalanceForecastPeriod!
    $startDate: DateTime
    $endDate: DateTime
  ) {
    balanceForecast(
      accountId: $accountId
      period: $period
      startDate: $startDate
      endDate: $endDate
    ) {
      dataPoints {
        date
        balance
        isProjected
        incomeAmount
        expenseAmount
        transactionCount
        transactions {
          id
          description
          amount
          isIncome
        }
      }
      currentBalance
      projectedBalance
      balanceTrend
      startDate
      endDate
    }
  }
`);

export const TransactionsSummaryQuery = graphql(`
  query TransactionsSummaryForCashFlow(
    $accountId: ID
    $startDate: DateTime
    $endDate: DateTime
    $types: [TransactionType!]
    $statuses: [TransactionStatus!]
  ) {
    transactionsSummary(
      accountId: $accountId
      startDate: $startDate
      endDate: $endDate
      types: $types
      statuses: $statuses
    ) {
      totalIncome
      totalExpense
      balance
      transactionCount
      realizedIncome
      realizedExpense
      realizedBalance
      forecastIncome
      forecastExpense
      forecastBalance
    }
  }
`);
