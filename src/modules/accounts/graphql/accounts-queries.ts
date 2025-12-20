import { graphql } from '@/graphql';

export const AccountFragment = graphql(`
  fragment AccountFragment on AccountModel {
    id
    name
    type
    balance
    description
    isActive
    institutionId
    createdAt
    updatedAt
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
    $types: [AccountType!]
  ) {
    accounts(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
      search: $search
      last: $last
      before: $before
      types: $types
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
    $types: [AccountType!]
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
        accountCardId
        createdAt
        updatedAt
        accountCard {
          id
          lastFourDigits
          billingCycleDay
          billingPaymentDay
          defaultLimit
          type
          accountId
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
        transactions {
          id
        }
      }
      nextBillingId
      previousBillingId
    }
  }
`);
