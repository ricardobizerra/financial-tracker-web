import { graphql } from '@/graphql';

export const CreateAccountMutation = graphql(`
  mutation CreateAccount($data: AccountCreateWithoutUserInput!) {
    createAccount(data: $data) {
      id
    }
  }
`);
