import { graphql } from '@/graphql';

export const TransactionsFragment = graphql(`
  fragment TransactionFragment on TransactionModel {
    id
    description
    amount
    date
    type
    createdAt
    updatedAt
    sourceAccount {
      id
      name
      type
      institution {
        id
        name
        logoUrl
      }
    }
    destinyAccount {
      id
      name
      type
      institution {
        id
        name
        logoUrl
      }
    }
    billingPayment {
      id
      status
      accountCard {
        account {
          id
          name
          institution {
            id
            name
            logoUrl
          }
        }
      }
    }
    cardBilling {
      id
      status
    }
    status
    paymentMethod
    recurringTransactionId
    installmentNumber
    totalInstallments
  }
`);

export const TransactionsQuery = graphql(`
  query Transactions(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
    $orderBy: OrdenationTransactionModel
    $orderDirection: OrderDirection
    $accountId: ID
    $cardBillingId: ID
    $startDate: DateTime
    $endDate: DateTime
    $types: [TransactionType!]
    $statuses: [TransactionStatus!]
  ) {
    transactions(
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
      orderBy: $orderBy
      orderDirection: $orderDirection
      accountId: $accountId
      cardBillingId: $cardBillingId
      startDate: $startDate
      endDate: $endDate
      types: $types
      statuses: $statuses
    ) {
      edges {
        cursor
        node {
          ...TransactionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const TransactionsSummaryQuery = graphql(`
  query TransactionsSummary(
    $search: String
    $accountId: ID
    $cardBillingId: ID
    $startDate: DateTime
    $endDate: DateTime
    $types: [TransactionType!]
    $statuses: [TransactionStatus!]
  ) {
    transactionsSummary(
      search: $search
      accountId: $accountId
      cardBillingId: $cardBillingId
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

export const TransactionsGroupedByPeriodQuery = graphql(`
  query TransactionsGroupedByPeriod(
    $accountId: ID
    $limitPerGroup: Int
    $startDate: DateTime
    $endDate: DateTime
    $types: [TransactionType!]
    $statuses: [TransactionStatus!]
  ) {
    transactionsGroupedByPeriod(
      accountId: $accountId
      limitPerGroup: $limitPerGroup
      startDate: $startDate
      endDate: $endDate
      types: $types
      statuses: $statuses
    ) {
      period
      label
      count
      hasMore
      transactions {
        ...TransactionFragment
      }
    }
  }
`);
