import { graphql } from '@/graphql';

export const RecurringTransactionFragment = graphql(`
  fragment RecurringTransactionFragment on RecurringTransactionModel {
    id
    description
    estimatedAmount
    type
    paymentMethod
    frequency
    dayMode
    dayOfMonth
    dayOfWeek
    weekOfMonth
    monthOfYear
    startDate
    endDate
    isActive
    sourceAccount {
      id
      name
      institution {
        name
        logoUrl
      }
    }
    destinyAccount {
      id
      name
      institution {
        name
        logoUrl
      }
    }
    createdAt
    updatedAt
  }
`);

export const RecurringTransactionsQuery = graphql(`
  query RecurringTransactions(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $search: String
    $orderBy: OrdenationRecurringTransactionModel
    $orderDirection: OrderDirection
    $accountId: ID
    $isActive: Boolean
  ) {
    recurringTransactions(
      first: $first
      after: $after
      last: $last
      before: $before
      search: $search
      orderBy: $orderBy
      orderDirection: $orderDirection
      accountId: $accountId
      isActive: $isActive
    ) {
      edges {
        cursor
        node {
          ...RecurringTransactionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const RecurringTransactionQuery = graphql(`
  query RecurringTransaction($id: String!) {
    recurringTransaction(id: $id) {
      ...RecurringTransactionFragment
    }
  }
`);
