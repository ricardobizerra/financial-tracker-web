import { graphql } from '@/graphql';

export const AccountFragment = graphql(`
  fragment AccountFragment on AccountModel {
    id
    name
    balance
    description
    isActive
    institutionLinkId
    createdAt
    updatedAt
    institutionLink {
      institution {
        id
        code
        name
        logoUrl
        color
        createdAt
        updatedAt
      }
    }
  }
`);

export const AccountsQuery = graphql(`
  query Accounts(
    $orderBy: OrdenationAccountModel
    $orderDirection: OrderDirection
    $first: Int
    $after: String
    $search: String
    $last: Int
    $before: String
  ) {
    accounts(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
      search: $search
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          ...AccountFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const AccountQuery = graphql(`
  query Account($id: ID!) {
    account(id: $id) {
      ...AccountFragment
      institutionLink {
        cards {
          id
          type
        }
      }
    }
  }
`);

export const CardFragment = graphql(`
  fragment CardFragment on Card {
    id
    name
    lastFourDigits
    billingCycleDay
    billingPaymentDay
    defaultLimit
    type
    institutionLinkId
    createdAt
    updatedAt
    institutionLink {
      institution {
        id
        code
        name
        logoUrl
        color
        createdAt
        updatedAt
      }
      cards {
        id
        type
      }
    }
  }
`);

export const CardQuery = graphql(`
  query Card($id: ID!) {
    card(id: $id) {
      ...CardFragment
    }
  }
`);

export const CardsQuery = graphql(`
  query Cards(
    $orderBy: OrdenationCard
    $orderDirection: OrderDirection
    $first: Int
    $after: String
    $search: String
    $last: Int
    $before: String
  ) {
    cards(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
      search: $search
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          ...CardFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const InstitutionFragment = graphql(`
  fragment InstitutionFragment on InstitutionModel {
    id
    code
    name
    logoUrl
    color
    createdAt
    updatedAt
  }
`);

export const InstitutionsQuery = graphql(`
  query Institutions(
    $first: Int
    $after: String
    $search: String
    $orderBy: OrdenationInstitutionModel
    $orderDirection: OrderDirection
    $types: [InstitutionType!]
  ) {
    institutions(
      first: $first
      after: $after
      search: $search
      orderBy: $orderBy
      orderDirection: $orderDirection
      types: $types
    ) {
      edges {
        cursor
        node {
          ...InstitutionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const BillingQuery = graphql(`
  query Billing($accountId: ID!, $id: ID) {
    billing(accountId: $accountId, id: $id) {
      billing {
        id
        periodStart
        periodEnd
        paymentDate
        totalAmount
        limit
        usagePercentage
        status
        cardId
        createdAt
        updatedAt
        card {
          id
          lastFourDigits
          billingCycleDay
          billingPaymentDay
          defaultLimit
          type
          institutionLinkId
          createdAt
          updatedAt
        }
        paymentTransaction {
          id
          description
          amount
          date
          status
          type
          paymentMethod
          sourceAccountId
          destinyAccountId
          cardBillingId
          userId
          createdAt
          updatedAt
        }
        transactionsCount
        transactions {
          id
          status
        }
      }
      nextBillingId
      previousBillingId
    }
  }
`);
