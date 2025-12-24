import { graphql } from '@/graphql';

export const CreateTransactionMutation = graphql(`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
    }
  }
`);

export const UpdateTransactionMutation = graphql(`
  mutation UpdateTransaction($data: UpdateTransactionInput!) {
    updateTransaction(data: $data) {
      id
      description
      amount
      date
      status
      paymentMethod
    }
  }
`);
