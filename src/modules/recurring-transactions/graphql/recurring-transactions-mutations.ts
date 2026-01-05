import { graphql } from '@/graphql';

export const CreateRecurringTransactionMutation = graphql(`
  mutation CreateRecurringTransaction($data: CreateRecurringTransactionInput!) {
    createRecurringTransaction(data: $data) {
      id
    }
  }
`);

export const UpdateRecurringTransactionFromDateMutation = graphql(`
  mutation UpdateRecurringTransactionFromDate(
    $id: String!
    $fromDate: DateTime!
    $data: UpdateRecurringTransactionInput!
  ) {
    updateRecurringTransactionFromDate(
      id: $id
      fromDate: $fromDate
      data: $data
    ) {
      id
    }
  }
`);

export const PauseRecurringTransactionMutation = graphql(`
  mutation PauseRecurringTransaction($id: String!) {
    pauseRecurringTransaction(id: $id) {
      id
      isActive
    }
  }
`);

export const ResumeRecurringTransactionMutation = graphql(`
  mutation ResumeRecurringTransaction($id: String!) {
    resumeRecurringTransaction(id: $id) {
      id
      isActive
    }
  }
`);

export const EndRecurringTransactionMutation = graphql(`
  mutation EndRecurringTransaction($id: String!, $endDate: DateTime!) {
    endRecurringTransaction(id: $id, endDate: $endDate) {
      id
      endDate
      isActive
    }
  }
`);

export const DeleteRecurringTransactionMutation = graphql(`
  mutation DeleteRecurringTransaction($id: String!) {
    deleteRecurringTransaction(id: $id) {
      id
    }
  }
`);
