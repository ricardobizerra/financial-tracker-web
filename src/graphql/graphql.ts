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
  /** An arbitrary-precision Decimal type */
  Decimal: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  _count: AccountCount;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investmentTransactions: Maybe<Array<InvestmentTransaction>>;
  investments: Maybe<Array<Investment>>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceTransactions: Maybe<Array<Transaction>>;
  type: AccountType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type AccountAvgAggregate = {
  __typename?: 'AccountAvgAggregate';
  initialBalance: Maybe<Scalars['Decimal']['output']>;
};

export type AccountConnection = {
  __typename?: 'AccountConnection';
  edges: Maybe<Array<AccountModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  destinyTransactions: Scalars['Int']['output'];
  investmentTransactions: Scalars['Int']['output'];
  investments: Scalars['Int']['output'];
  sourceTransactions: Scalars['Int']['output'];
};

export type AccountCountAggregate = {
  __typename?: 'AccountCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  initialBalance: Scalars['Int']['output'];
  institutionId: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type AccountCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institutionId: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCreateManyUserInputEnvelope = {
  data: Array<AccountCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AccountCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
  createMany?: InputMaybe<AccountCreateManyUserInputEnvelope>;
};

export type AccountCreateNestedOneWithoutDestinyTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutDestinyTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutDestinyTransactionsInput>;
};

export type AccountCreateNestedOneWithoutInvestmentTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutInvestmentTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutInvestmentTransactionsInput>;
};

export type AccountCreateNestedOneWithoutInvestmentsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutInvestmentsInput>;
  create?: InputMaybe<AccountCreateWithoutInvestmentsInput>;
};

export type AccountCreateNestedOneWithoutSourceTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutSourceTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutSourceTransactionsInput>;
};

export type AccountCreateOrConnectWithoutDestinyTransactionsInput = {
  create: AccountCreateWithoutDestinyTransactionsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutInvestmentTransactionsInput = {
  create: AccountCreateWithoutInvestmentTransactionsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutInvestmentsInput = {
  create: AccountCreateWithoutInvestmentsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutSourceTransactionsInput = {
  create: AccountCreateWithoutSourceTransactionsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateWithoutDestinyTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutInvestmentTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutInvestmentsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutSourceTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountListRelationFilter = {
  every?: InputMaybe<AccountWhereInput>;
  none?: InputMaybe<AccountWhereInput>;
  some?: InputMaybe<AccountWhereInput>;
};

export type AccountMaxAggregate = {
  __typename?: 'AccountMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  initialBalance: Maybe<Scalars['Decimal']['output']>;
  institutionId: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<AccountType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type AccountMinAggregate = {
  __typename?: 'AccountMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  initialBalance: Maybe<Scalars['Decimal']['output']>;
  institutionId: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<AccountType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type AccountModel = {
  __typename?: 'AccountModel';
  _count: AccountCount;
  balance: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investmentTransactions: Maybe<Array<InvestmentTransaction>>;
  investments: Maybe<Array<Investment>>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceTransactions: Maybe<Array<Transaction>>;
  type: AccountType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AccountModelEdge = {
  __typename?: 'AccountModelEdge';
  cursor: Scalars['String']['output'];
  node: AccountModel;
};

export type AccountNullableRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export type AccountRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export type AccountSumAggregate = {
  __typename?: 'AccountSumAggregate';
  initialBalance: Maybe<Scalars['Decimal']['output']>;
};

export enum AccountType {
  Checking = 'CHECKING',
  CreditCard = 'CREDIT_CARD',
  Investment = 'INVESTMENT',
  Other = 'OTHER',
  Savings = 'SAVINGS',
  Wallet = 'WALLET',
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  investmentTransactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumAccountTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AccountWhereUniqueInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  investmentTransactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumAccountTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AuthSignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CreateInvestmentInput = {
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  destinyAccountId: Scalars['ID']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
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

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type EnumAccountTypeFilter = {
  equals?: InputMaybe<AccountType>;
  in?: InputMaybe<Array<AccountType>>;
  not?: InputMaybe<NestedEnumAccountTypeFilter>;
  notIn?: InputMaybe<Array<AccountType>>;
};

export type EnumInvestmentStatusFilter = {
  equals?: InputMaybe<InvestmentStatus>;
  in?: InputMaybe<Array<InvestmentStatus>>;
  not?: InputMaybe<NestedEnumInvestmentStatusFilter>;
  notIn?: InputMaybe<Array<InvestmentStatus>>;
};

export type EnumInvestmentTransactionRoleFilter = {
  equals?: InputMaybe<InvestmentTransactionRole>;
  in?: InputMaybe<Array<InvestmentTransactionRole>>;
  not?: InputMaybe<NestedEnumInvestmentTransactionRoleFilter>;
  notIn?: InputMaybe<Array<InvestmentTransactionRole>>;
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

export type EnumTransactionStatusFilter = {
  equals?: InputMaybe<TransactionStatus>;
  in?: InputMaybe<Array<TransactionStatus>>;
  not?: InputMaybe<NestedEnumTransactionStatusFilter>;
  notIn?: InputMaybe<Array<TransactionStatus>>;
};

export type EnumTransactionTypeFilter = {
  equals?: InputMaybe<TransactionType>;
  in?: InputMaybe<Array<TransactionType>>;
  not?: InputMaybe<NestedEnumTransactionTypeFilter>;
  notIn?: InputMaybe<Array<TransactionType>>;
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

export type Institution = {
  __typename?: 'Institution';
  _count: InstitutionCount;
  accounts: Maybe<Array<Account>>;
  code: Scalars['String']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InstitutionConnection = {
  __typename?: 'InstitutionConnection';
  edges: Maybe<Array<InstitutionModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InstitutionCount = {
  __typename?: 'InstitutionCount';
  accounts: Scalars['Int']['output'];
};

export type InstitutionCountAggregate = {
  __typename?: 'InstitutionCountAggregate';
  _all: Scalars['Int']['output'];
  code: Scalars['Int']['output'];
  color: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  logoUrl: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type InstitutionCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<InstitutionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<InstitutionCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<InstitutionCreateWithoutAccountsInput>;
};

export type InstitutionCreateOrConnectWithoutAccountsInput = {
  create: InstitutionCreateWithoutAccountsInput;
  where: InstitutionWhereUniqueInput;
};

export type InstitutionCreateWithoutAccountsInput = {
  code: Scalars['String']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InstitutionMaxAggregate = {
  __typename?: 'InstitutionMaxAggregate';
  code: Maybe<Scalars['String']['output']>;
  color: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InstitutionMinAggregate = {
  __typename?: 'InstitutionMinAggregate';
  code: Maybe<Scalars['String']['output']>;
  color: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InstitutionModel = {
  __typename?: 'InstitutionModel';
  accounts: Maybe<Array<Account>>;
  code: Scalars['String']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InstitutionModelEdge = {
  __typename?: 'InstitutionModelEdge';
  cursor: Scalars['String']['output'];
  node: InstitutionModel;
};

export type InstitutionRelationFilter = {
  is?: InputMaybe<InstitutionWhereInput>;
  isNot?: InputMaybe<InstitutionWhereInput>;
};

export type InstitutionWhereInput = {
  AND?: InputMaybe<Array<InstitutionWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionWhereInput>>;
  OR?: InputMaybe<Array<InstitutionWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  code?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  logoUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InstitutionWhereUniqueInput = {
  AND?: InputMaybe<Array<InstitutionWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionWhereInput>>;
  OR?: InputMaybe<Array<InstitutionWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  code?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Investment = {
  __typename?: 'Investment';
  _count: InvestmentCount;
  account: Account;
  accountId: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Regime;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: InvestmentStatus;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  transactions: Maybe<Array<InvestmentTransaction>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type InvestmentAvgAggregate = {
  __typename?: 'InvestmentAvgAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  duration: Maybe<Scalars['Float']['output']>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
};

export type InvestmentConnection = {
  __typename?: 'InvestmentConnection';
  edges: Maybe<Array<InvestmentModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InvestmentCount = {
  __typename?: 'InvestmentCount';
  transactions: Scalars['Int']['output'];
};

export type InvestmentCountAggregate = {
  __typename?: 'InvestmentCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  correctedAmount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  finishedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastCorrectedAt: Scalars['Int']['output'];
  regimeName: Scalars['Int']['output'];
  regimePercentage: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  taxedAmount: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type InvestmentCreateManyAccountInput = {
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type InvestmentCreateManyAccountInputEnvelope = {
  data: Array<InvestmentCreateManyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentCreateManyUserInput = {
  accountId: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentCreateManyUserInputEnvelope = {
  data: Array<InvestmentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<InvestmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentCreateOrConnectWithoutAccountInput>
  >;
  create?: InputMaybe<Array<InvestmentCreateWithoutAccountInput>>;
  createMany?: InputMaybe<InvestmentCreateManyAccountInputEnvelope>;
};

export type InvestmentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<InvestmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<InvestmentCreateWithoutUserInput>>;
  createMany?: InputMaybe<InvestmentCreateManyUserInputEnvelope>;
};

export type InvestmentCreateNestedOneWithoutTransactionsInput = {
  connect?: InputMaybe<InvestmentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<InvestmentCreateOrConnectWithoutTransactionsInput>;
  create?: InputMaybe<InvestmentCreateWithoutTransactionsInput>;
};

export type InvestmentCreateOrConnectWithoutAccountInput = {
  create: InvestmentCreateWithoutAccountInput;
  where: InvestmentWhereUniqueInput;
};

export type InvestmentCreateOrConnectWithoutTransactionsInput = {
  create: InvestmentCreateWithoutTransactionsInput;
  where: InvestmentWhereUniqueInput;
};

export type InvestmentCreateOrConnectWithoutUserInput = {
  create: InvestmentCreateWithoutUserInput;
  where: InvestmentWhereUniqueInput;
};

export type InvestmentCreateWithoutAccountInput = {
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  transactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutInvestmentInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutInvestmentsInput;
};

export type InvestmentCreateWithoutTransactionsInput = {
  account: AccountCreateNestedOneWithoutInvestmentsInput;
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutInvestmentsInput;
};

export type InvestmentCreateWithoutUserInput = {
  account: AccountCreateNestedOneWithoutInvestmentsInput;
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  transactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutInvestmentInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentListRelationFilter = {
  every?: InputMaybe<InvestmentWhereInput>;
  none?: InputMaybe<InvestmentWhereInput>;
  some?: InputMaybe<InvestmentWhereInput>;
};

export type InvestmentMaxAggregate = {
  __typename?: 'InvestmentMaxAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<InvestmentStatus>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InvestmentMinAggregate = {
  __typename?: 'InvestmentMinAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<InvestmentStatus>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InvestmentModel = {
  __typename?: 'InvestmentModel';
  account: Account;
  accountId: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentVariation: Scalars['String']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Regime;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: InvestmentStatus;
  taxPercentage: Scalars['String']['output'];
  taxedAmount: Maybe<Scalars['Float']['output']>;
  taxedVariation: Scalars['String']['output'];
  transactions: Maybe<Array<InvestmentTransaction>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type InvestmentModelEdge = {
  __typename?: 'InvestmentModelEdge';
  cursor: Scalars['String']['output'];
  node: InvestmentModel;
};

export type InvestmentRegimeSummary = {
  __typename?: 'InvestmentRegimeSummary';
  currentInvested: Scalars['Float']['output'];
  currentInvestedPercentage: Scalars['String']['output'];
  name: Regime;
  quantity: Scalars['Int']['output'];
  taxedInvested: Scalars['Float']['output'];
  taxedInvestedPercentage: Scalars['String']['output'];
  totalInvested: Scalars['Float']['output'];
};

export type InvestmentRegimeSummaryConnection = {
  __typename?: 'InvestmentRegimeSummaryConnection';
  edges: Maybe<Array<InvestmentRegimeSummaryEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InvestmentRegimeSummaryEdge = {
  __typename?: 'InvestmentRegimeSummaryEdge';
  cursor: Scalars['String']['output'];
  node: InvestmentRegimeSummary;
};

export type InvestmentRelationFilter = {
  is?: InputMaybe<InvestmentWhereInput>;
  isNot?: InputMaybe<InvestmentWhereInput>;
};

export enum InvestmentStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export type InvestmentSumAggregate = {
  __typename?: 'InvestmentSumAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
};

export type InvestmentTransaction = {
  __typename?: 'InvestmentTransaction';
  account: Account;
  accountId: Scalars['String']['output'];
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  investment: Investment;
  investmentId: Scalars['String']['output'];
  role: InvestmentTransactionRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type InvestmentTransactionAvgAggregate = {
  __typename?: 'InvestmentTransactionAvgAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
};

export type InvestmentTransactionCountAggregate = {
  __typename?: 'InvestmentTransactionCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  investmentId: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type InvestmentTransactionCreateManyAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  investmentId: Scalars['String']['input'];
  role: InvestmentTransactionRole;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentTransactionCreateManyAccountInputEnvelope = {
  data: Array<InvestmentTransactionCreateManyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentTransactionCreateManyInvestmentInput = {
  accountId: Scalars['String']['input'];
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  role: InvestmentTransactionRole;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentTransactionCreateManyInvestmentInputEnvelope = {
  data: Array<InvestmentTransactionCreateManyInvestmentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentTransactionCreateNestedManyWithoutAccountInput = {
  connect?: InputMaybe<Array<InvestmentTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentTransactionCreateOrConnectWithoutAccountInput>
  >;
  create?: InputMaybe<Array<InvestmentTransactionCreateWithoutAccountInput>>;
  createMany?: InputMaybe<InvestmentTransactionCreateManyAccountInputEnvelope>;
};

export type InvestmentTransactionCreateNestedManyWithoutInvestmentInput = {
  connect?: InputMaybe<Array<InvestmentTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentTransactionCreateOrConnectWithoutInvestmentInput>
  >;
  create?: InputMaybe<Array<InvestmentTransactionCreateWithoutInvestmentInput>>;
  createMany?: InputMaybe<InvestmentTransactionCreateManyInvestmentInputEnvelope>;
};

export type InvestmentTransactionCreateOrConnectWithoutAccountInput = {
  create: InvestmentTransactionCreateWithoutAccountInput;
  where: InvestmentTransactionWhereUniqueInput;
};

export type InvestmentTransactionCreateOrConnectWithoutInvestmentInput = {
  create: InvestmentTransactionCreateWithoutInvestmentInput;
  where: InvestmentTransactionWhereUniqueInput;
};

export type InvestmentTransactionCreateWithoutAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  investment: InvestmentCreateNestedOneWithoutTransactionsInput;
  role: InvestmentTransactionRole;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentTransactionCreateWithoutInvestmentInput = {
  account: AccountCreateNestedOneWithoutInvestmentTransactionsInput;
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  role: InvestmentTransactionRole;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InvestmentTransactionListRelationFilter = {
  every?: InputMaybe<InvestmentTransactionWhereInput>;
  none?: InputMaybe<InvestmentTransactionWhereInput>;
  some?: InputMaybe<InvestmentTransactionWhereInput>;
};

export type InvestmentTransactionMaxAggregate = {
  __typename?: 'InvestmentTransactionMaxAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  amount: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  investmentId: Maybe<Scalars['String']['output']>;
  role: Maybe<InvestmentTransactionRole>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InvestmentTransactionMinAggregate = {
  __typename?: 'InvestmentTransactionMinAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  amount: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  investmentId: Maybe<Scalars['String']['output']>;
  role: Maybe<InvestmentTransactionRole>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export enum InvestmentTransactionRole {
  Fee = 'FEE',
  Funding = 'FUNDING',
  Income = 'INCOME',
  Redemption = 'REDEMPTION',
}

export type InvestmentTransactionSumAggregate = {
  __typename?: 'InvestmentTransactionSumAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
};

export type InvestmentTransactionWhereInput = {
  AND?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  OR?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  amount?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  investment?: InputMaybe<InvestmentRelationFilter>;
  investmentId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumInvestmentTransactionRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InvestmentTransactionWhereUniqueInput = {
  AND?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  OR?: InputMaybe<Array<InvestmentTransactionWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  amount?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  investment?: InputMaybe<InvestmentRelationFilter>;
  investmentId?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumInvestmentTransactionRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InvestmentWhereInput = {
  AND?: InputMaybe<Array<InvestmentWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentWhereInput>>;
  OR?: InputMaybe<Array<InvestmentWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  amount?: InputMaybe<FloatFilter>;
  correctedAmount?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastCorrectedAt?: InputMaybe<DateTimeNullableFilter>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumInvestmentStatusFilter>;
  taxedAmount?: InputMaybe<FloatNullableFilter>;
  transactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type InvestmentWhereUniqueInput = {
  AND?: InputMaybe<Array<InvestmentWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentWhereInput>>;
  OR?: InputMaybe<Array<InvestmentWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  amount?: InputMaybe<FloatFilter>;
  correctedAmount?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastCorrectedAt?: InputMaybe<DateTimeNullableFilter>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumInvestmentStatusFilter>;
  taxedAmount?: InputMaybe<FloatNullableFilter>;
  transactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authSignIn: SignIn;
  createAccount: AccountModel;
  createInvestment: Investment;
  createTransaction: TransactionModel;
  createUser: SignIn;
  deleteInvestment: Scalars['ID']['output'];
};

export type MutationAuthSignInArgs = {
  data: AuthSignInInput;
};

export type MutationCreateAccountArgs = {
  data: AccountCreateWithoutUserInput;
};

export type MutationCreateInvestmentArgs = {
  data: CreateInvestmentInput;
};

export type MutationCreateTransactionArgs = {
  data: TransactionCreateWithoutUserInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteInvestmentArgs = {
  id: Scalars['ID']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
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

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedEnumAccountTypeFilter = {
  equals?: InputMaybe<AccountType>;
  in?: InputMaybe<Array<AccountType>>;
  not?: InputMaybe<NestedEnumAccountTypeFilter>;
  notIn?: InputMaybe<Array<AccountType>>;
};

export type NestedEnumInvestmentStatusFilter = {
  equals?: InputMaybe<InvestmentStatus>;
  in?: InputMaybe<Array<InvestmentStatus>>;
  not?: InputMaybe<NestedEnumInvestmentStatusFilter>;
  notIn?: InputMaybe<Array<InvestmentStatus>>;
};

export type NestedEnumInvestmentTransactionRoleFilter = {
  equals?: InputMaybe<InvestmentTransactionRole>;
  in?: InputMaybe<Array<InvestmentTransactionRole>>;
  not?: InputMaybe<NestedEnumInvestmentTransactionRoleFilter>;
  notIn?: InputMaybe<Array<InvestmentTransactionRole>>;
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

export type NestedEnumTransactionStatusFilter = {
  equals?: InputMaybe<TransactionStatus>;
  in?: InputMaybe<Array<TransactionStatus>>;
  not?: InputMaybe<NestedEnumTransactionStatusFilter>;
  notIn?: InputMaybe<Array<TransactionStatus>>;
};

export type NestedEnumTransactionTypeFilter = {
  equals?: InputMaybe<TransactionType>;
  in?: InputMaybe<Array<TransactionType>>;
  not?: InputMaybe<NestedEnumTransactionTypeFilter>;
  notIn?: InputMaybe<Array<TransactionType>>;
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

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
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

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrdenationAccountModel {
  Count = '_count',
  Balance = 'balance',
  CreatedAt = 'createdAt',
  DestinyTransactions = 'destinyTransactions',
  InitialBalance = 'initialBalance',
  Institution = 'institution',
  InstitutionId = 'institutionId',
  InvestmentTransactions = 'investmentTransactions',
  Investments = 'investments',
  IsActive = 'isActive',
  Name = 'name',
  SourceTransactions = 'sourceTransactions',
  Type = 'type',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationInstitutionModel {
  Accounts = 'accounts',
  Code = 'code',
  Color = 'color',
  CreatedAt = 'createdAt',
  Id = 'id',
  LogoUrl = 'logoUrl',
  Name = 'name',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationInvestmentModel {
  Account = 'account',
  AccountId = 'accountId',
  Amount = 'amount',
  CorrectedAmount = 'correctedAmount',
  CreatedAt = 'createdAt',
  Duration = 'duration',
  FinishedAt = 'finishedAt',
  Id = 'id',
  LastCorrectedAt = 'lastCorrectedAt',
  RegimeName = 'regimeName',
  RegimePercentage = 'regimePercentage',
  StartDate = 'startDate',
  Status = 'status',
  TaxedAmount = 'taxedAmount',
  Transactions = 'transactions',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationTransactionModel {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Date = 'date',
  Description = 'description',
  DestinyAccount = 'destinyAccount',
  DestinyAccountId = 'destinyAccountId',
  SourceAccount = 'sourceAccount',
  SourceAccountId = 'sourceAccountId',
  Status = 'status',
  Type = 'type',
  UpdatedAt = 'updatedAt',
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
  account: AccountModel;
  accounts: AccountConnection;
  health: Scalars['String']['output'];
  institution: InstitutionModel;
  institutions: InstitutionConnection;
  investmentRegimes: InvestmentRegimeSummaryConnection;
  investments: InvestmentConnection;
  totalInvestments: TotalInvestmentsModel;
  transactions: TransactionConnection;
  user: UserModel;
  users: UserConnection;
};

export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationAccountModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AccountType>;
};

export type QueryInstitutionArgs = {
  id: Scalars['String']['input'];
};

export type QueryInstitutionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInstitutionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInvestmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  regime?: InputMaybe<Regime>;
};

export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
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
  Poupanca = 'POUPANCA',
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

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userAdded: UserModel;
};

export type TotalInvestmentsModel = {
  __typename?: 'TotalInvestmentsModel';
  currentAmount: Scalars['Float']['output'];
  currentVariation: Scalars['String']['output'];
  initialAmount: Scalars['Float']['output'];
  taxedAmount: Scalars['Float']['output'];
  taxedVariation: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TransactionAvgAggregate = {
  __typename?: 'TransactionAvgAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Maybe<Array<TransactionModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type TransactionCountAggregate = {
  __typename?: 'TransactionCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  destinyAccountId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  sourceAccountId: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type TransactionCreateManyDestinyAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManyDestinyAccountInputEnvelope = {
  data: Array<TransactionCreateManyDestinyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManySourceAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManySourceAccountInputEnvelope = {
  data: Array<TransactionCreateManySourceAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManyUserInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionCreateManyUserInputEnvelope = {
  data: Array<TransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateNestedManyWithoutDestinyAccountInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutDestinyAccountInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutDestinyAccountInput>>;
  createMany?: InputMaybe<TransactionCreateManyDestinyAccountInputEnvelope>;
};

export type TransactionCreateNestedManyWithoutSourceAccountInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutSourceAccountInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutSourceAccountInput>>;
  createMany?: InputMaybe<TransactionCreateManySourceAccountInputEnvelope>;
};

export type TransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<TransactionCreateManyUserInputEnvelope>;
};

export type TransactionCreateOrConnectWithoutDestinyAccountInput = {
  create: TransactionCreateWithoutDestinyAccountInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutSourceAccountInput = {
  create: TransactionCreateWithoutSourceAccountInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutUserInput = {
  create: TransactionCreateWithoutUserInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateWithoutDestinyAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutSourceAccountInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionListRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>;
  none?: InputMaybe<TransactionWhereInput>;
  some?: InputMaybe<TransactionWhereInput>;
};

export type TransactionMaxAggregate = {
  __typename?: 'TransactionMaxAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionMinAggregate = {
  __typename?: 'TransactionMinAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionModel = {
  __typename?: 'TransactionModel';
  amount: Scalars['Decimal']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export type TransactionModelEdge = {
  __typename?: 'TransactionModelEdge';
  cursor: Scalars['String']['output'];
  node: TransactionModel;
};

export enum TransactionStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Planned = 'PLANNED',
}

export type TransactionSumAggregate = {
  __typename?: 'TransactionSumAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
};

export enum TransactionType {
  BetweenAccounts = 'BETWEEN_ACCOUNTS',
  Expense = 'EXPENSE',
  Income = 'INCOME',
}

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  NOT?: InputMaybe<Array<TransactionWhereInput>>;
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumTransactionStatusFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type TransactionWhereUniqueInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  NOT?: InputMaybe<Array<TransactionWhereInput>>;
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumTransactionStatusFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  accounts: Maybe<Array<Account>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  investments: Maybe<Array<Investment>>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
  transactions: Maybe<Array<Transaction>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Maybe<Array<UserModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type UserCount = {
  __typename?: 'UserCount';
  accounts: Scalars['Int']['output'];
  investments: Scalars['Int']['output'];
  transactions: Scalars['Int']['output'];
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
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
};

export type UserCreateNestedOneWithoutInvestmentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutInvestmentsInput>;
  create?: InputMaybe<UserCreateWithoutInvestmentsInput>;
};

export type UserCreateNestedOneWithoutTransactionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutTransactionsInput>;
  create?: InputMaybe<UserCreateWithoutTransactionsInput>;
};

export type UserCreateOrConnectWithoutAccountsInput = {
  create: UserCreateWithoutAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutInvestmentsInput = {
  create: UserCreateWithoutInvestmentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTransactionsInput = {
  create: UserCreateWithoutTransactionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAccountsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutInvestmentsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutTransactionsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
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
  accounts?: InputMaybe<AccountListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CreateAccountMutationVariables = Exact<{
  data: AccountCreateWithoutUserInput;
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount: { __typename?: 'AccountModel'; id: string };
};

export type AccountFragmentFragment = {
  __typename?: 'AccountModel';
  id: string;
  name: string;
  type: AccountType;
  balance: any | null;
  description: string | null;
  isActive: boolean;
  institutionId: string;
  createdAt: any;
  updatedAt: any;
  institution: {
    __typename?: 'Institution';
    id: string;
    code: string;
    name: string;
    logoUrl: string | null;
    color: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type AccountsQueryVariables = Exact<{
  orderBy?: InputMaybe<OrdenationAccountModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AccountType>;
}>;

export type AccountsQuery = {
  __typename?: 'Query';
  accounts: {
    __typename?: 'AccountConnection';
    edges: Array<{
      __typename?: 'AccountModelEdge';
      cursor: string;
      node: {
        __typename?: 'AccountModel';
        id: string;
        name: string;
        type: AccountType;
        balance: any | null;
        description: string | null;
        isActive: boolean;
        institutionId: string;
        createdAt: any;
        updatedAt: any;
        institution: {
          __typename?: 'Institution';
          id: string;
          code: string;
          name: string;
          logoUrl: string | null;
          color: string | null;
          createdAt: any;
          updatedAt: any;
        };
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

export type InstitutionFragmentFragment = {
  __typename?: 'InstitutionModel';
  id: string;
  code: string;
  name: string;
  logoUrl: string | null;
  color: string | null;
  createdAt: any;
  updatedAt: any;
};

export type InstitutionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<OrdenationInstitutionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;

export type InstitutionsQuery = {
  __typename?: 'Query';
  institutions: {
    __typename?: 'InstitutionConnection';
    edges: Array<{
      __typename?: 'InstitutionModelEdge';
      cursor: string;
      node: {
        __typename?: 'InstitutionModel';
        id: string;
        code: string;
        name: string;
        logoUrl: string | null;
        color: string | null;
        createdAt: any;
        updatedAt: any;
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

export type PageInfoFragmentFragment = {
  __typename?: 'PageInfo';
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type CreateInvestmentMutationVariables = Exact<{
  data: CreateInvestmentInput;
}>;

export type CreateInvestmentMutation = {
  __typename?: 'Mutation';
  createInvestment: {
    __typename?: 'Investment';
    id: string;
    amount: number;
    startDate: any;
    duration: number | null;
    regimeName: Regime;
    regimePercentage: number | null;
    userId: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type DeleteInvestmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type DeleteInvestmentMutation = {
  __typename?: 'Mutation';
  deleteInvestment: string;
};

export type InvestmentFragmentFragment = {
  __typename?: 'InvestmentModel';
  id: string;
  amount: number;
  correctedAmount: number | null;
  currentVariation: string;
  taxPercentage: string;
  taxedAmount: number | null;
  taxedVariation: string;
  startDate: any;
  duration: number | null;
};

export type InvestmentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  regime?: InputMaybe<Regime>;
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
        amount: number;
        correctedAmount: number | null;
        currentVariation: string;
        taxPercentage: string;
        taxedAmount: number | null;
        taxedVariation: string;
        startDate: any;
        duration: number | null;
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

export type TotalInvestmentsQueryVariables = Exact<{ [key: string]: never }>;

export type TotalInvestmentsQuery = {
  __typename?: 'Query';
  totalInvestments: {
    __typename?: 'TotalInvestmentsModel';
    initialAmount: number;
    currentAmount: number;
    currentVariation: string;
    taxedAmount: number;
    taxedVariation: string;
  };
};

export type InvestmentRegimeSummaryFragmentFragment = {
  __typename?: 'InvestmentRegimeSummary';
  name: Regime;
  quantity: number;
  totalInvested: number;
  currentInvested: number;
  currentInvestedPercentage: string;
  taxedInvested: number;
  taxedInvestedPercentage: string;
};

export type InvestmentRegimesQueryVariables = Exact<{ [key: string]: never }>;

export type InvestmentRegimesQuery = {
  __typename?: 'Query';
  investmentRegimes: {
    __typename?: 'InvestmentRegimeSummaryConnection';
    edges: Array<{
      __typename?: 'InvestmentRegimeSummaryEdge';
      cursor: string;
      node: {
        __typename?: 'InvestmentRegimeSummary';
        name: Regime;
        quantity: number;
        totalInvested: number;
        currentInvested: number;
        currentInvestedPercentage: string;
        taxedInvested: number;
        taxedInvestedPercentage: string;
      };
    }> | null;
  };
};

export type CreateTransactionMutationVariables = Exact<{
  data: TransactionCreateWithoutUserInput;
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction: { __typename?: 'TransactionModel'; id: string };
};

export type TransactionFragmentFragment = {
  __typename?: 'TransactionModel';
  id: string;
  description: string;
  amount: any;
  date: any;
  type: TransactionType;
  createdAt: any;
  updatedAt: any;
  status: TransactionStatus;
  sourceAccount: { __typename?: 'Account'; id: string } | null;
  destinyAccount: { __typename?: 'Account'; id: string } | null;
};

export type TransactionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<OrdenationTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type TransactionsQuery = {
  __typename?: 'Query';
  transactions: {
    __typename?: 'TransactionConnection';
    edges: Array<{
      __typename?: 'TransactionModelEdge';
      cursor: string;
      node: {
        __typename?: 'TransactionModel';
        id: string;
        description: string;
        amount: any;
        date: any;
        type: TransactionType;
        createdAt: any;
        updatedAt: any;
        status: TransactionStatus;
        sourceAccount: { __typename?: 'Account'; id: string } | null;
        destinyAccount: { __typename?: 'Account'; id: string } | null;
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

export const AccountFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'AccountModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          { kind: 'Field', name: { kind: 'Name', value: 'institutionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'institution' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountFragmentFragment, unknown>;
export const InstitutionFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InstitutionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InstitutionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstitutionFragmentFragment, unknown>;
export const PageInfoFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PageInfoFragmentFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'correctedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxPercentage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvestmentFragmentFragment, unknown>;
export const InvestmentRegimeSummaryFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvestmentRegimeSummaryFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InvestmentRegimeSummary' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInvested' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentInvested' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentInvestedPercentage' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedInvested' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxedInvestedPercentage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvestmentRegimeSummaryFragmentFragment, unknown>;
export const TransactionFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TransactionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TransactionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sourceAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'destinyAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TransactionFragmentFragment, unknown>;
export const CreateAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AccountCreateWithoutUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAccount' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const AccountsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Accounts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrdenationAccountModel' },
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
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AccountType' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
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
                              name: { kind: 'Name', value: 'AccountFragment' },
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
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PageInfoFragment' },
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
      name: { kind: 'Name', value: 'AccountFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'AccountModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          { kind: 'Field', name: { kind: 'Name', value: 'institutionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'institution' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountsQuery, AccountsQueryVariables>;
export const InstitutionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Institutions' },
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
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrdenationInstitutionModel' },
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
            name: { kind: 'Name', value: 'institutions' },
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
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'InstitutionFragment',
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
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PageInfoFragment' },
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
      name: { kind: 'Name', value: 'InstitutionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InstitutionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'code' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'color' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstitutionsQuery, InstitutionsQueryVariables>;
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
export const CreateInvestmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateInvestment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateInvestmentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInvestment' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'regimeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'regimePercentage' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInvestmentMutation,
  CreateInvestmentMutationVariables
>;
export const DeleteInvestmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteInvestment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteInvestment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteInvestmentMutation,
  DeleteInvestmentMutationVariables
>;
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'regime' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Regime' } },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'regime' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'regime' },
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
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PageInfoFragment' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'correctedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxPercentage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedVariation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvestmentsQuery, InvestmentsQueryVariables>;
export const TotalInvestmentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TotalInvestments' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalInvestments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'initialAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentVariation' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'taxedAmount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxedVariation' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TotalInvestmentsQuery,
  TotalInvestmentsQueryVariables
>;
export const InvestmentRegimesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InvestmentRegimes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'investmentRegimes' },
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
                                value: 'InvestmentRegimeSummaryFragment',
                              },
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
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InvestmentRegimeSummaryFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InvestmentRegimeSummary' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInvested' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currentInvested' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentInvestedPercentage' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'taxedInvested' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxedInvestedPercentage' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvestmentRegimesQuery,
  InvestmentRegimesQueryVariables
>;
export const CreateTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'TransactionCreateWithoutUserInput',
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTransaction' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
>;
export const TransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Transactions' },
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
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'OrdenationTransactionModel' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
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
                                value: 'TransactionFragment',
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
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PageInfoFragment' },
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
      name: { kind: 'Name', value: 'TransactionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TransactionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'date' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sourceAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'destinyAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TransactionsQuery, TransactionsQueryVariables>;
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
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PageInfoFragment' },
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
      name: { kind: 'Name', value: 'PageInfoFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'PageInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
