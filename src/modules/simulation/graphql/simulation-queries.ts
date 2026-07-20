import { graphql } from '@/graphql';

export const RealBalanceForecastQuery = graphql(`
  query RealBalanceForecastSimulation(
    $accountId: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    balanceForecast(
      accountId: $accountId
      period: CUSTOM
      startDate: $startDate
      endDate: $endDate
    ) {
      accountSeries {
        accountId
        accountName
        color
        dataPoints {
          date
          balance
          isProjected
          isInitialBalance
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
      }
      startDate
      endDate
    }
  }
`);

export const SimulateBalanceForecastQuery = graphql(`
  query SimulateBalanceForecast($input: SimulateBalanceForecastInput!) {
    simulateBalanceForecast(input: $input) {
      accountSeries {
        accountId
        accountName
        color
        dataPoints {
          date
          balance
          isProjected
          isInitialBalance
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
      }
      startDate
      endDate
    }
  }
`);
