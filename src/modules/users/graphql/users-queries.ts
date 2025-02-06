import { graphql } from '@/graphql';

export const UsersQuery = graphql(`
  query Users(
    $first: Int
    $after: String
    $search: String
    $before: String
    $last: Int
    $orderBy: OrdenationUserModel
    $orderDirection: OrderDirection
  ) {
    users(
      first: $first
      after: $after
      search: $search
      before: $before
      last: $last
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        cursor
        node {
          id
          email
          name
          role
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
