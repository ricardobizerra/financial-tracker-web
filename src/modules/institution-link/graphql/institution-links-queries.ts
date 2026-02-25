import { graphql } from '@/graphql';

export const InstitutionLinkFragment = graphql(`
  fragment InstitutionLinkFragment on InstitutionLinkModel {
    id
    institutionId
    createdAt
    updatedAt
    institution {
      id
      code
      name
      logoUrl
      color
    }
    account {
      id
      name
      initialBalance
      description
      isActive
    }
    cards {
      id
      name
      lastFourDigits
      billingCycleDay
      billingPaymentDay
      type
      defaultLimit
      billings {
        id
        status
        limit
        periodStart
        periodEnd
        paymentDate
        transactions {
          amount
          type
        }
      }
    }
    investments {
      id
      amount
      startDate
      duration
      status
      regimeName
      regimePercentage
    }
  }
`);

export const InstitutionLinksQuery = graphql(`
  query InstitutionLinks(
    $first: Int
    $after: String
    $search: String
    $orderBy: OrdenationInstitutionLinkModel
    $orderDirection: OrderDirection
    $institutionTypes: [InstitutionType!]
  ) {
    institutionLinks(
      first: $first
      after: $after
      search: $search
      orderBy: $orderBy
      orderDirection: $orderDirection
      institutionTypes: $institutionTypes
    ) {
      edges {
        cursor
        node {
          ...InstitutionLinkFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);
