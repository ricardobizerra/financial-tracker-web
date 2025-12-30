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

export const ConfirmTransactionMutation = graphql(`
  mutation ConfirmTransaction($data: ConfirmTransactionInput!) {
    confirmTransaction(data: $data) {
      id
      status
      amount
      date
    }
  }
`);

export const CancelTransactionMutation = graphql(`
  mutation CancelTransaction($id: String!) {
    cancelTransaction(id: $id) {
      id
      status
    }
  }
`);

export const RescheduleTransactionMutation = graphql(`
  mutation RescheduleTransaction($data: RescheduleTransactionInput!) {
    rescheduleTransaction(data: $data) {
      id
      date
    }
  }
`);

export const UpdateRecurringTransactionsMutation = graphql(`
  mutation UpdateRecurringTransactions(
    $data: UpdateRecurringTransactionsInput!
  ) {
    updateRecurringTransactions(data: $data) {
      id
      description
      amount
      paymentMethod
    }
  }
`);

export const CreateInstallmentTransactionMutation = graphql(`
  mutation CreateInstallmentTransaction(
    $data: CreateInstallmentTransactionInput!
  ) {
    createInstallmentTransaction(data: $data) {
      id
      description
      amount
      date
      status
    }
  }
`);
