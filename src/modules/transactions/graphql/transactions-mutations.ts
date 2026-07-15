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

export const CancelRecurringTransactionsMutation = graphql(`
  mutation CancelRecurringTransactions(
    $transactionId: String!
    $scope: UpdateRecurringScope!
  ) {
    cancelRecurringTransactions(transactionId: $transactionId, scope: $scope) {
      id
      status
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

export const BulkUpdateTransactionsMutation = graphql(`
  mutation BulkUpdateTransactions($data: BulkUpdateTransactionsInput!) {
    bulkUpdateTransactions(data: $data) {
      id
      category
      status
      sourceAccountId
      date
      paymentMethod
    }
  }
`);

export const BulkCancelTransactionsMutation = graphql(`
  mutation BulkCancelTransactions($data: BulkCancelTransactionsInput!) {
    bulkCancelTransactions(data: $data) {
      id
      status
    }
  }
`);
