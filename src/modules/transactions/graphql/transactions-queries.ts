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
    accountId
    account {
      id
    }
    status
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
