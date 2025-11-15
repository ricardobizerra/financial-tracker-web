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
    status
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
    $regime: Regime
  ) {
    investments(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      last: $last
      before: $before
      regime: $regime
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

export const InvestmentRegimeSummaryFragment = graphql(`
  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {
    name
    quantity
    totalInvested
    currentInvested
    currentInvestedPercentage
    taxedInvested
    taxedInvestedPercentage
  }
`);

export const InvestmentRegimesQuery = graphql(`
  query InvestmentRegimes {
    investmentRegimes {
      edges {
        cursor
        node {
          ...InvestmentRegimeSummaryFragment
        }
      }
    }
  }
`);
