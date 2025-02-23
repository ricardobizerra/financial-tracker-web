import { graphql } from '@/graphql';

export const InvestmentFragment = graphql(`
  fragment InvestmentFragment on InvestmentModel {
    id
    initialAmount
    currentAmount
    currentVariation
    taxPercentage
    taxedAmount
    taxedVariation
    period
    duration
  }
`);

export const InvestmentsQuery = graphql(`
  query Investments(
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: OrdenationInvestmentModel
    $after: String
    $last: Int
    $before: String
  ) {
    investments(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          ...InvestmentFragment
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`);
