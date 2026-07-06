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
    type
    fixedRate
    currentMarketRate
    maturityDate
    regimeName
    regimePercentage
    brokerageFee
    institutionLinkId
    taxesAndFees {
      details {
        label
        amount
        reason
      }
      totalTaxesAndFees
    }
    sellFeasibility {
      status
      message
    }
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
    $status: InvestmentStatus
    $institutionLinkIds: [ID!]
  ) {
    investments(
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      last: $last
      before: $before
      regime: $regime
      status: $status
      institutionLinkIds: $institutionLinkIds
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

export const AvailableTreasuryBondsQuery = graphql(`
  query AvailableTreasuryBonds($regime: Regime!) {
    availableTreasuryBonds(regime: $regime)
  }
`);

export const GetInvestmentQuery = graphql(`
  query GetInvestment($id: String!) {
    investment(id: $id) {
      ...InvestmentFragment
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
      realVariation
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
  query InvestmentRegimes($institutionLinkId: String) {
    investmentRegimes(institutionLinkId: $institutionLinkId) {
      edges {
        cursor
        node {
          ...InvestmentRegimeSummaryFragment
        }
      }
    }
  }
`);

export const InvestmentEvolutionQuery = graphql(`
  query InvestmentEvolution(
    $period: InvestmentEvolutionPeriod
    $accountId: String
    $regime: Regime
  ) {
    investmentEvolution(period: $period, accountId: $accountId, regime: $regime) {
      dataPoints {
        date
        invested
        currentAmount
        taxedAmount
        profit
      }
      totalInvested
      totalCurrentAmount
      totalTaxedAmount
      totalProfit
      totalProfitPercentage
    }
  }
`);

export const InvestmentAccountsQuery = graphql(`
  query InvestmentAccounts($regime: Regime!) {
    investmentAccounts(regime: $regime) {
      id
      name
      institutionLogoUrl
      investmentCount
    }
  }
`);

export const InvestmentChartDataQuery = graphql(`
  query InvestmentChartData($investmentId: String!) {
    investmentChartData(investmentId: $investmentId) {
      date
      theoreticalValue
      marketValue
    }
  }
`);
