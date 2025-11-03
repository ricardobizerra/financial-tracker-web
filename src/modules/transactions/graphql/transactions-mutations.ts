import { graphql } from '@/graphql';

export const CreateTransactionMutation = graphql(`
  mutation CreateTransaction($data: TransactionCreateWithoutUserInput!) {
    createTransaction(data: $data) {
      id
    }
  }
`);
