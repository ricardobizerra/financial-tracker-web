import { graphql } from '@/graphql';

export const CreateAccountMutation = graphql(`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data) {
      id
      startDate
    }
  }
`);

export const CreateCardMutation = graphql(`
  mutation CreateCard($data: CreateCardInput!) {
    createCard(data: $data) {
      id
    }
  }
`);

export const ChangeBillingDatesMutation = graphql(`
  mutation ChangeBillingDates($billingId: String!, $closingDate: DateTime, $paymentDate: DateTime) {
    changeBillingDates(billingId: $billingId, closingDate: $closingDate, paymentDate: $paymentDate) {
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
