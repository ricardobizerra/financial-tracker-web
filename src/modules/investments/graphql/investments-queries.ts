import { graphql } from '@/graphql';

export const InvestmentFragment = graphql(`
  fragment InvestmentFragment on InvestmentModel {
    id
    amount
    correctedAmount
    currentVariation
    taxPercentage
    taxedAmount
    taxedVariation
    startDate
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
        ...PageInfoFragment
      }
    }
  }
`);

export const TotalInvestmentsQuery = graphql(`
  query TotalInvestments {
    totalInvestments {
      initialAmount
      currentAmount
      currentVariation
      taxedAmount
      taxedVariation
    }
  }
`);
