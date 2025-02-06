import { graphql } from '@/graphql';

export const UserQuery = graphql(`
  query User {
    user {
      id
      name
      email
      role
    }
  }
`);
