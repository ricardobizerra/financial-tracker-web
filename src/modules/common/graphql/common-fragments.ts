import { graphql } from '@/graphql';

export const PageInfoFragment = graphql(`
  fragment PageInfoFragment on PageInfo {
    startCursor
    endCursor
    hasPreviousPage
    hasNextPage
  }
`);
