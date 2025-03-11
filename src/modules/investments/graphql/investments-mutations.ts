import { graphql } from '@/graphql';

export const CreateInvestmentMutation = graphql(`
  mutation CreateInvestment($data: InvestmentCreateWithoutUserInput!) {
    createInvestment(data: $data) {
      id
      amount
      startDate
      duration
      regimeName
      regimePercentage
      userId
      createdAt
      updatedAt
    }
  }
`);
