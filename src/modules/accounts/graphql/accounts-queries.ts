import { graphql } from '@/graphql';

export const AccountFragment = graphql(`
  fragment AccountFragment on AccountModel {
    id
    name
    type
    balance
    description
    isActive
    institutionId
    createdAt
    updatedAt
    institution {
      id
      code
      name
      logoUrl
      color
      createdAt
      updatedAt
    }
  }
`);

export const AccountsQuery = graphql(`
  query Accounts(
    $orderBy: OrdenationAccountModel
    $orderDirection: OrderDirection
    $first: Int
    $after: String
    $search: String
    $last: Int
    $before: String
    $type: AccountType
  ) {
    accounts(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      after: $after
      search: $search
      last: $last
      before: $before
      type: $type
    ) {
      edges {
        cursor
        node {
          ...AccountFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);

export const InstitutionFragment = graphql(`
  fragment InstitutionFragment on InstitutionModel {
    id
    code
    name
    logoUrl
    color
    createdAt
    updatedAt
  }
`);

export const InstitutionsQuery = graphql(`
  query Institutions(
    $first: Int
    $after: String
    $search: String
    $orderBy: OrdenationInstitutionModel
    $orderDirection: OrderDirection
  ) {
    institutions(
      first: $first
      after: $after
      search: $search
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        cursor
        node {
          ...InstitutionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`);
