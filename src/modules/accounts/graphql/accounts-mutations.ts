import { graphql } from '@/graphql';

export const CreateAccountMutation = graphql(`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data) {
      id
    }
  }
`);

export const CloseBillingMutation = graphql(`
  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {
    closeBilling(billingId: $billingId, closingDate: $closingDate) {
      id
      periodStart
      periodEnd
      paymentDate
      limit
      status
      cardId
      paymentTransactionId
      createdAt
      updatedAt
    }
  }
`);

export const UpdateAccountCardMutation = graphql(`
  mutation UpdateAccountCard(
    $cardId: ID!
    $billingCycleDay: Float
    $billingPaymentDay: Float
    $defaultLimit: Float
  ) {
    updateAccountCard(
      cardId: $cardId
      billingCycleDay: $billingCycleDay
      billingPaymentDay: $billingPaymentDay
      defaultLimit: $defaultLimit
    ) {
      id
      lastFourDigits
      billingCycleDay
      billingPaymentDay
      type
      defaultLimit
      institutionLinkId
      createdAt
      updatedAt
    }
  }
`);
