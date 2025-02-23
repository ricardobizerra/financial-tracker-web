/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type AuthSignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EnumRegimeFilter = {
  equals?: InputMaybe<Regime>;
  in?: InputMaybe<Array<Regime>>;
  not?: InputMaybe<NestedEnumRegimeFilter>;
  notIn?: InputMaybe<Array<Regime>>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Investment = {
  __typename?: 'Investment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  regimeName: Regime;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type InvestmentAvgAggregate = {
  __typename?: 'InvestmentAvgAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  duration: Maybe<Scalars['Float']['output']>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
};

export type InvestmentConnection = {
  __typename?: 'InvestmentConnection';
  edges: Maybe<Array<InvestmentModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InvestmentCountAggregate = {
  __typename?: 'InvestmentCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  regimeName: Scalars['Int']['output'];
  regimePercentage: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type InvestmentCreateManyUserInput = {
  amount: Scalars['Float']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentCreateManyUserInputEnvelope = {
  data: Array<InvestmentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<InvestmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<InvestmentCreateWithoutUserInput>>;
  createMany?: InputMaybe<InvestmentCreateManyUserInputEnvelope>;
};

export type InvestmentCreateOrConnectWithoutUserInput = {
  create: InvestmentCreateWithoutUserInput;
  where: InvestmentWhereUniqueInput;
};

export type InvestmentCreateWithoutUserInput = {
  amount: Scalars['Float']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentListRelationFilter = {
  every?: InputMaybe<InvestmentWhereInput>;
  none?: InputMaybe<InvestmentWhereInput>;
  some?: InputMaybe<InvestmentWhereInput>;
};

export type InvestmentMaxAggregate = {
  __typename?: 'InvestmentMaxAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  id: Maybe<Scalars['String']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InvestmentMinAggregate = {
  __typename?: 'InvestmentMinAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  id: Maybe<Scalars['String']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InvestmentModel = {
  __typename?: 'InvestmentModel';
  currentAmount: Scalars['String']['output'];
  currentVariation: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  initialAmount: Scalars['String']['output'];
  period: Scalars['String']['output'];
  regimeName: Regime;
  regimePercentage: Scalars['Float']['output'];
  taxPercentage: Scalars['String']['output'];
  taxedAmount: Scalars['String']['output'];
  taxedVariation: Scalars['String']['output'];
};

export type InvestmentModelEdge = {
  __typename?: 'InvestmentModelEdge';
  cursor: Scalars['String']['output'];
  node: InvestmentModel;
};

export type InvestmentSumAggregate = {
  __typename?: 'InvestmentSumAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
};

export type InvestmentWhereInput = {
  AND?: InputMaybe<Array<InvestmentWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentWhereInput>>;
  OR?: InputMaybe<Array<InvestmentWhereInput>>;
  amount?: InputMaybe<FloatFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type InvestmentWhereUniqueInput = {
  AND?: InputMaybe<Array<InvestmentWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentWhereInput>>;
  OR?: InputMaybe<Array<InvestmentWhereInput>>;
  amount?: InputMaybe<FloatFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authSignIn: SignIn;
  createInvestment: Investment;
  createUser: SignIn;
};

export type MutationAuthSignInArgs = {
  data: AuthSignInInput;
};

export type MutationCreateInvestmentArgs = {
  data: InvestmentCreateWithoutUserInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumRegimeFilter = {
  equals?: InputMaybe<Regime>;
  in?: InputMaybe<Array<Regime>>;
  not?: InputMaybe<NestedEnumRegimeFilter>;
  notIn?: InputMaybe<Array<Regime>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrdenationInvestmentModel {
  Duration = 'duration',
  Id = 'id',
  InitialAmount = 'initialAmount',
  Period = 'period',
  RegimeName = 'regimeName',
  RegimePercentage = 'regimePercentage',
}

export enum OrdenationUserModel {
  Email = 'email',
  Id = 'id',
  Name = 'name',
  Role = 'role',
}

export enum OrderDirection {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  health: Scalars['String']['output'];
  investments: InvestmentConnection;
  user: UserModel;
  users: UserConnection;
};

export type QueryInvestmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  orderDirection?: InputMaybe<OrderDirection>;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationUserModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum Regime {
  Cdi = 'CDI',
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type SignIn = {
  __typename?: 'SignIn';
  accessToken: Scalars['String']['output'];
  user: Maybe<UserModel>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userAdded: UserModel;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  investments: Maybe<Array<Investment>>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Maybe<Array<UserModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type UserCount = {
  __typename?: 'UserCount';
  investments: Scalars['Int']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  password: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  email: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  password: Maybe<Scalars['String']['output']>;
  role: Maybe<Role>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  email: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  password: Maybe<Scalars['String']['output']>;
  role: Maybe<Role>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type UserModelEdge = {
  __typename?: 'UserModelEdge';
  cursor: Scalars['String']['output'];
  node: UserModel;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AuthSignInMutationVariables = Exact<{
  data: AuthSignInInput;
}>;

export type AuthSignInMutation = {
  __typename?: 'Mutation';
  authSignIn: {
    __typename?: 'SignIn';
    accessToken: string;
    user: {
      __typename?: 'UserModel';
      id: string;
      email: string;
      name: string;
    } | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'SignIn';
    accessToken: string;
    user: { __typename?: 'UserModel'; id: string } | null;
  };
};

export type UserQueryVariables = Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'UserModel';
    id: string;
    name: string;
    email: string;
    role: Role;
  };
};

export type InvestmentFragmentFragment = {
  __typename?: 'InvestmentModel';
  id: string;
  initialAmount: string;
  currentAmount: string;
  currentVariation: string;
  taxPercentage: string;
  taxedAmount: string;
  taxedVariation: string;
  period: string;
  duration: number;
};

export type InvestmentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;

export type InvestmentsQuery = {
  __typename?: 'Query';
  investments: {
    __typename?: 'InvestmentConnection';
    edges: Array<{
      __typename?: 'InvestmentModelEdge';
      cursor: string;
      node: {
        __typename?: 'InvestmentModel';
        id: string;
        initialAmount: string;
        currentAmount: string;
        currentVariation: string;
        taxPercentage: string;
        taxedAmount: string;
        taxedVariation: string;
        period: string;
        duration: number;
      };
    }> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      startCursor: string | null;
      endCursor: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    } | null;
  };
};

export type UsersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationUserModel>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type UsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'UserConnection';
    edges: Array<{
      __typename?: 'UserModelEdge';
      cursor: string;
      node: {
        __typename?: 'UserModel';
        id: string;
        email: string;
        name: string;
        role: Role;
      };
    }> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      startCursor: string | null;
      endCursor: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    } | null;
  };
};

export const InvestmentFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvestmentFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InvestmentModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'initialAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxPercentage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'period' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvestmentFragmentFragment, unknown>;
export const AuthSignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthSignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AuthSignInInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authSignIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthSignInMutation, AuthSignInMutationVariables>;
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UserCreateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'User' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const InvestmentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Investments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderDirection' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrderDirection' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrdenationInvestmentModel' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'before' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'investments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderDirection' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderDirection' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'last' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'before' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'InvestmentFragment',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvestmentFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InvestmentModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'initialAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxPercentage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'period' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvestmentsQuery, InvestmentsQueryVariables>;
export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Users' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'search' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'before' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrdenationUserModel' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderDirection' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrderDirection' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'search' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'search' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'before' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'last' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderDirection' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderDirection' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'role' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
