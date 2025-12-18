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

export const PayBillingMutation = graphql(`
  mutation PayBilling(
    $billingId: String!
    $sourceAccountId: ID!
    $date: DateTime
    $description: String
  ) {
    payBilling(
      billingId: $billingId
      sourceAccountId: $sourceAccountId
      date: $date
      description: $description
    ) {
      id
      description
      amount
      date
      status
      type
      paymentMethod
      paymentEnabled
      paymentLimit
      sourceAccountId
      destinyAccountId
      cardBillingId
      userId
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
      accountId
      createdAt
      updatedAt
    }
  }
`);
