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
      }
      currentBalance
      projectedBalance
      balanceTrend
      startDate
      endDate
    }
  }
`);
