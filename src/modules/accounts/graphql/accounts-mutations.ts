import { graphql } from '@/graphql';

export const CreateAccountMutation = graphql(`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data) {
      id
    }
  }
`);

export const CloseBillingMutation = graphql(`
  mutation CloseBilling($billingId: String!) {
    closeBilling(billingId: $billingId) {
      id
      periodStart
      periodEnd
      paymentDate
      limit
      status
      accountCardId
      paymentTransactionId
      createdAt
      updatedAt
    }
  }
`);
