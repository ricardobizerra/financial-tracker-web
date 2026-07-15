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

export const DeleteTransactionMutation = graphql(`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id) {
      id
      deletedAt
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

export const DeleteRecurringTransactionsMutation = graphql(`
  mutation DeleteRecurringTransactions(
    $transactionId: String!
    $scope: UpdateRecurringScope!
  ) {
    deleteRecurringTransactions(transactionId: $transactionId, scope: $scope) {
      id
      deletedAt
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

export const BulkDeleteTransactionsMutation = graphql(`
  mutation BulkDeleteTransactions($data: BulkDeleteTransactionsInput!) {
    bulkDeleteTransactions(data: $data) {
      id
      deletedAt
    }
  }
`);
