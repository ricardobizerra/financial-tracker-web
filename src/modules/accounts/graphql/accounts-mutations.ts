import { graphql } from '@/graphql';

export const CreateAccountMutation = graphql(`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data) {
      id
    }
  }
`);
