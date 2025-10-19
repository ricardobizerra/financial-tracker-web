import { graphql } from '@/graphql';

export const AuthSignInMutation = graphql(`
  mutation AuthSignIn($data: AuthSignInInput!) {
    authSignIn(data: $data) {
      user {
        id
        email
        name
      }
    }
  }
`);

export const CreateUserMutation = graphql(`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      user {
        id
      }
    }
  }
`);
