import { gql } from '@apollo/client';

export const CreateInstitutionLinkMutation = gql`
  mutation CreateInstitutionLink($data: CreateInstitutionLinkInput!) {
    createInstitutionLink(data: $data) {
      id
      createdAt
      updatedAt
    }
  }
`;
