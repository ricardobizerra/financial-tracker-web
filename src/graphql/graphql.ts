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
  accountCard: Maybe<AccountCard>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  destinyRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investmentTransactions: Maybe<Array<InvestmentTransaction>>;
  investments: Maybe<Array<Investment>>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceRecurringTransactions: Maybe<Array<RecurringTransaction>>;
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

export type AccountCard = {
  __typename?: 'AccountCard';
  _count: AccountCardCount;
  account: Account;
  accountId: Scalars['String']['output'];
  billingCycleDay: Scalars['Int']['output'];
  billingPaymentDay: Scalars['Int']['output'];
  billings: Maybe<Array<CardBilling>>;
  createdAt: Scalars['DateTime']['output'];
  defaultLimit: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  lastFourDigits: Maybe<Scalars['String']['output']>;
  type: CardType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AccountCardAvgAggregate = {
  __typename?: 'AccountCardAvgAggregate';
  billingCycleDay: Maybe<Scalars['Float']['output']>;
  billingPaymentDay: Maybe<Scalars['Float']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
};

export type AccountCardCount = {
  __typename?: 'AccountCardCount';
  billings: Scalars['Int']['output'];
};

export type AccountCardCountAggregate = {
  __typename?: 'AccountCardCountAggregate';
  _all: Scalars['Int']['output'];
  accountId: Scalars['Int']['output'];
  billingCycleDay: Scalars['Int']['output'];
  billingPaymentDay: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  defaultLimit: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastFourDigits: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type AccountCardCreateNestedOneWithoutAccountInput = {
  connect?: InputMaybe<AccountCardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCardCreateOrConnectWithoutAccountInput>;
  create?: InputMaybe<AccountCardCreateWithoutAccountInput>;
};

export type AccountCardCreateNestedOneWithoutBillingsInput = {
  connect?: InputMaybe<AccountCardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCardCreateOrConnectWithoutBillingsInput>;
  create?: InputMaybe<AccountCardCreateWithoutBillingsInput>;
};

export type AccountCardCreateOrConnectWithoutAccountInput = {
  create: AccountCardCreateWithoutAccountInput;
  where: AccountCardWhereUniqueInput;
};

export type AccountCardCreateOrConnectWithoutBillingsInput = {
  create: AccountCardCreateWithoutBillingsInput;
  where: AccountCardWhereUniqueInput;
};

export type AccountCardCreateWithoutAccountInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  billings?: InputMaybe<CardBillingCreateNestedManyWithoutAccountCardInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCardCreateWithoutBillingsInput = {
  account: AccountCreateNestedOneWithoutAccountCardInput;
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCardMaxAggregate = {
  __typename?: 'AccountCardMaxAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
  id: Maybe<Scalars['String']['output']>;
  lastFourDigits: Maybe<Scalars['String']['output']>;
  type: Maybe<CardType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type AccountCardMinAggregate = {
  __typename?: 'AccountCardMinAggregate';
  accountId: Maybe<Scalars['String']['output']>;
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
  id: Maybe<Scalars['String']['output']>;
  lastFourDigits: Maybe<Scalars['String']['output']>;
  type: Maybe<CardType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type AccountCardNullableRelationFilter = {
  is?: InputMaybe<AccountCardWhereInput>;
  isNot?: InputMaybe<AccountCardWhereInput>;
};

export type AccountCardRelationFilter = {
  is?: InputMaybe<AccountCardWhereInput>;
  isNot?: InputMaybe<AccountCardWhereInput>;
};

export type AccountCardSumAggregate = {
  __typename?: 'AccountCardSumAggregate';
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
};

export type AccountCardWhereInput = {
  AND?: InputMaybe<Array<AccountCardWhereInput>>;
  NOT?: InputMaybe<Array<AccountCardWhereInput>>;
  OR?: InputMaybe<Array<AccountCardWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  billingCycleDay?: InputMaybe<IntFilter>;
  billingPaymentDay?: InputMaybe<IntFilter>;
  billings?: InputMaybe<CardBillingListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultLimit?: InputMaybe<DecimalFilter>;
  id?: InputMaybe<StringFilter>;
  lastFourDigits?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumCardTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AccountCardWhereUniqueInput = {
  AND?: InputMaybe<Array<AccountCardWhereInput>>;
  NOT?: InputMaybe<Array<AccountCardWhereInput>>;
  OR?: InputMaybe<Array<AccountCardWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<Scalars['String']['input']>;
  billingCycleDay?: InputMaybe<IntFilter>;
  billingPaymentDay?: InputMaybe<IntFilter>;
  billings?: InputMaybe<CardBillingListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultLimit?: InputMaybe<DecimalFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastFourDigits?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumCardTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AccountConnection = {
  __typename?: 'AccountConnection';
  edges: Maybe<Array<AccountModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  destinyRecurringTransactions: Scalars['Int']['output'];
  destinyTransactions: Scalars['Int']['output'];
  investmentTransactions: Scalars['Int']['output'];
  investments: Scalars['Int']['output'];
  sourceRecurringTransactions: Scalars['Int']['output'];
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

export type AccountCreateNestedOneWithoutAccountCardInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutAccountCardInput>;
  create?: InputMaybe<AccountCreateWithoutAccountCardInput>;
};

export type AccountCreateNestedOneWithoutDestinyRecurringTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutDestinyRecurringTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutDestinyRecurringTransactionsInput>;
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

export type AccountCreateNestedOneWithoutSourceRecurringTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutSourceRecurringTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutSourceRecurringTransactionsInput>;
};

export type AccountCreateNestedOneWithoutSourceTransactionsInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutSourceTransactionsInput>;
  create?: InputMaybe<AccountCreateWithoutSourceTransactionsInput>;
};

export type AccountCreateOrConnectWithoutAccountCardInput = {
  create: AccountCreateWithoutAccountCardInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutDestinyRecurringTransactionsInput = {
  create: AccountCreateWithoutDestinyRecurringTransactionsInput;
  where: AccountWhereUniqueInput;
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

export type AccountCreateOrConnectWithoutSourceRecurringTransactionsInput = {
  create: AccountCreateWithoutSourceRecurringTransactionsInput;
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

export type AccountCreateWithoutAccountCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutDestinyRecurringTransactionsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
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
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutDestinyTransactionsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutInvestmentTransactionsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutInvestmentsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutSourceRecurringTransactionsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
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
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutSourceTransactionsInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  type: AccountType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutAccountsInput;
};

export type AccountCreateWithoutUserInput = {
  accountCard?: InputMaybe<AccountCardCreateNestedOneWithoutAccountInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institution: InstitutionCreateNestedOneWithoutAccountsInput;
  investmentTransactions?: InputMaybe<InvestmentTransactionCreateNestedManyWithoutAccountInput>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutAccountInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
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
  accountCard: Maybe<AccountCard>;
  balance: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentBillingAmount: Maybe<Scalars['Decimal']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investmentTransactions: Maybe<Array<InvestmentTransaction>>;
  investments: Maybe<Array<Investment>>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  sourceTransactions: Maybe<Array<Transaction>>;
  totalInvested: Maybe<Scalars['Decimal']['output']>;
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
  accountCard?: InputMaybe<AccountCardNullableRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  investmentTransactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
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
  accountCard?: InputMaybe<AccountCardNullableRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  investmentTransactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumAccountTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AccountWithInvestmentCount = {
  __typename?: 'AccountWithInvestmentCount';
  id: Scalars['String']['output'];
  institutionLogoUrl: Maybe<Scalars['String']['output']>;
  institutionName: Maybe<Scalars['String']['output']>;
  investmentCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type AgendaGroupModel = {
  __typename?: 'AgendaGroupModel';
  label: Scalars['String']['output'];
  transactions: Array<AgendaTransactionModel>;
};

export type AgendaTransactionModel = {
  __typename?: 'AgendaTransactionModel';
  amount: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  daysUntilDue: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isOverdue: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type AuthSignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type BalanceForecastModel = {
  __typename?: 'BalanceForecastModel';
  balanceTrend: Scalars['Float']['output'];
  currentBalance: Scalars['Float']['output'];
  dataPoints: Array<BalanceForecastPointModel>;
  endDate: Scalars['DateTime']['output'];
  projectedBalance: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
};

/** Period presets for balance forecast */
export enum BalanceForecastPeriod {
  Custom = 'CUSTOM',
  Month = 'MONTH',
  SixMonths = 'SIX_MONTHS',
  ThreeMonths = 'THREE_MONTHS',
  Week = 'WEEK',
  Year = 'YEAR',
}

export type BalanceForecastPointModel = {
  __typename?: 'BalanceForecastPointModel';
  balance: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  expenseAmount: Scalars['Float']['output'];
  incomeAmount: Scalars['Float']['output'];
  isProjected: Scalars['Boolean']['output'];
  transactionCount: Scalars['Float']['output'];
  transactions: Array<BalanceForecastTransactionModel>;
};

export type BalanceForecastTransactionModel = {
  __typename?: 'BalanceForecastTransactionModel';
  amount: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isIncome: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CalendarDayModel = {
  __typename?: 'CalendarDayModel';
  date: Scalars['DateTime']['output'];
  totalExpense: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  transactionCount: Scalars['Int']['output'];
  transactions: Array<CalendarDayTransactionModel>;
};

export type CalendarDayTransactionModel = {
  __typename?: 'CalendarDayTransactionModel';
  amount: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CardBilling = {
  __typename?: 'CardBilling';
  _count: CardBillingCount;
  accountCard: AccountCard;
  accountCardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  limit: Scalars['Decimal']['output'];
  paymentDate: Maybe<Scalars['DateTime']['output']>;
  paymentTransaction: Maybe<Transaction>;
  paymentTransactionId: Maybe<Scalars['String']['output']>;
  periodEnd: Maybe<Scalars['DateTime']['output']>;
  periodStart: Scalars['DateTime']['output'];
  status: CardBillingStatus;
  statusHistory: Maybe<Array<CardBillingHistory>>;
  transactions: Maybe<Array<Transaction>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CardBillingAccountCardIdPeriodStartCompoundUniqueInput = {
  accountCardId: Scalars['String']['input'];
  periodStart: Scalars['DateTime']['input'];
};

export type CardBillingAvgAggregate = {
  __typename?: 'CardBillingAvgAggregate';
  limit: Maybe<Scalars['Decimal']['output']>;
};

export type CardBillingCount = {
  __typename?: 'CardBillingCount';
  statusHistory: Scalars['Int']['output'];
  transactions: Scalars['Int']['output'];
};

export type CardBillingCountAggregate = {
  __typename?: 'CardBillingCountAggregate';
  _all: Scalars['Int']['output'];
  accountCardId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  paymentDate: Scalars['Int']['output'];
  paymentTransactionId: Scalars['Int']['output'];
  periodEnd: Scalars['Int']['output'];
  periodStart: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type CardBillingCreateManyAccountCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTransactionId?: InputMaybe<Scalars['String']['input']>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingCreateManyAccountCardInputEnvelope = {
  data: Array<CardBillingCreateManyAccountCardInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CardBillingCreateNestedManyWithoutAccountCardInput = {
  connect?: InputMaybe<Array<CardBillingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CardBillingCreateOrConnectWithoutAccountCardInput>
  >;
  create?: InputMaybe<Array<CardBillingCreateWithoutAccountCardInput>>;
  createMany?: InputMaybe<CardBillingCreateManyAccountCardInputEnvelope>;
};

export type CardBillingCreateNestedOneWithoutPaymentTransactionInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutPaymentTransactionInput>;
  create?: InputMaybe<CardBillingCreateWithoutPaymentTransactionInput>;
};

export type CardBillingCreateNestedOneWithoutStatusHistoryInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutStatusHistoryInput>;
  create?: InputMaybe<CardBillingCreateWithoutStatusHistoryInput>;
};

export type CardBillingCreateNestedOneWithoutTransactionsInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutTransactionsInput>;
  create?: InputMaybe<CardBillingCreateWithoutTransactionsInput>;
};

export type CardBillingCreateOrConnectWithoutAccountCardInput = {
  create: CardBillingCreateWithoutAccountCardInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutPaymentTransactionInput = {
  create: CardBillingCreateWithoutPaymentTransactionInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutStatusHistoryInput = {
  create: CardBillingCreateWithoutStatusHistoryInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutTransactionsInput = {
  create: CardBillingCreateWithoutTransactionsInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateWithoutAccountCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTransaction?: InputMaybe<TransactionCreateNestedOneWithoutBillingPaymentInput>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  statusHistory?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutCardBillingInput>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutCardBillingInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingCreateWithoutPaymentTransactionInput = {
  accountCard: AccountCardCreateNestedOneWithoutBillingsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  statusHistory?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutCardBillingInput>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutCardBillingInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingCreateWithoutStatusHistoryInput = {
  accountCard: AccountCardCreateNestedOneWithoutBillingsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTransaction?: InputMaybe<TransactionCreateNestedOneWithoutBillingPaymentInput>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutCardBillingInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingCreateWithoutTransactionsInput = {
  accountCard: AccountCardCreateNestedOneWithoutBillingsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  paymentTransaction?: InputMaybe<TransactionCreateNestedOneWithoutBillingPaymentInput>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  statusHistory?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutCardBillingInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingHistory = {
  __typename?: 'CardBillingHistory';
  cardBilling: CardBilling;
  cardBillingId: Scalars['String']['output'];
  changedAt: Scalars['DateTime']['output'];
  changedBy: Maybe<User>;
  changedById: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status: CardBillingStatus;
};

export type CardBillingHistoryCountAggregate = {
  __typename?: 'CardBillingHistoryCountAggregate';
  _all: Scalars['Int']['output'];
  cardBillingId: Scalars['Int']['output'];
  changedAt: Scalars['Int']['output'];
  changedById: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
};

export type CardBillingHistoryCreateManyCardBillingInput = {
  changedAt?: InputMaybe<Scalars['DateTime']['input']>;
  changedById?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: CardBillingStatus;
};

export type CardBillingHistoryCreateManyCardBillingInputEnvelope = {
  data: Array<CardBillingHistoryCreateManyCardBillingInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CardBillingHistoryCreateManyChangedByInput = {
  cardBillingId: Scalars['String']['input'];
  changedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: CardBillingStatus;
};

export type CardBillingHistoryCreateManyChangedByInputEnvelope = {
  data: Array<CardBillingHistoryCreateManyChangedByInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CardBillingHistoryCreateNestedManyWithoutCardBillingInput = {
  connect?: InputMaybe<Array<CardBillingHistoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CardBillingHistoryCreateOrConnectWithoutCardBillingInput>
  >;
  create?: InputMaybe<Array<CardBillingHistoryCreateWithoutCardBillingInput>>;
  createMany?: InputMaybe<CardBillingHistoryCreateManyCardBillingInputEnvelope>;
};

export type CardBillingHistoryCreateNestedManyWithoutChangedByInput = {
  connect?: InputMaybe<Array<CardBillingHistoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CardBillingHistoryCreateOrConnectWithoutChangedByInput>
  >;
  create?: InputMaybe<Array<CardBillingHistoryCreateWithoutChangedByInput>>;
  createMany?: InputMaybe<CardBillingHistoryCreateManyChangedByInputEnvelope>;
};

export type CardBillingHistoryCreateOrConnectWithoutCardBillingInput = {
  create: CardBillingHistoryCreateWithoutCardBillingInput;
  where: CardBillingHistoryWhereUniqueInput;
};

export type CardBillingHistoryCreateOrConnectWithoutChangedByInput = {
  create: CardBillingHistoryCreateWithoutChangedByInput;
  where: CardBillingHistoryWhereUniqueInput;
};

export type CardBillingHistoryCreateWithoutCardBillingInput = {
  changedAt?: InputMaybe<Scalars['DateTime']['input']>;
  changedBy?: InputMaybe<UserCreateNestedOneWithoutCardBillingStatusHistoriesInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: CardBillingStatus;
};

export type CardBillingHistoryCreateWithoutChangedByInput = {
  cardBilling: CardBillingCreateNestedOneWithoutStatusHistoryInput;
  changedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: CardBillingStatus;
};

export type CardBillingHistoryListRelationFilter = {
  every?: InputMaybe<CardBillingHistoryWhereInput>;
  none?: InputMaybe<CardBillingHistoryWhereInput>;
  some?: InputMaybe<CardBillingHistoryWhereInput>;
};

export type CardBillingHistoryMaxAggregate = {
  __typename?: 'CardBillingHistoryMaxAggregate';
  cardBillingId: Maybe<Scalars['String']['output']>;
  changedAt: Maybe<Scalars['DateTime']['output']>;
  changedById: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  status: Maybe<CardBillingStatus>;
};

export type CardBillingHistoryMinAggregate = {
  __typename?: 'CardBillingHistoryMinAggregate';
  cardBillingId: Maybe<Scalars['String']['output']>;
  changedAt: Maybe<Scalars['DateTime']['output']>;
  changedById: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  status: Maybe<CardBillingStatus>;
};

export type CardBillingHistoryWhereInput = {
  AND?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  NOT?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  OR?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  cardBilling?: InputMaybe<CardBillingRelationFilter>;
  cardBillingId?: InputMaybe<StringFilter>;
  changedAt?: InputMaybe<DateTimeFilter>;
  changedBy?: InputMaybe<UserNullableRelationFilter>;
  changedById?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumCardBillingStatusFilter>;
};

export type CardBillingHistoryWhereUniqueInput = {
  AND?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  NOT?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  OR?: InputMaybe<Array<CardBillingHistoryWhereInput>>;
  cardBilling?: InputMaybe<CardBillingRelationFilter>;
  cardBillingId?: InputMaybe<StringFilter>;
  changedAt?: InputMaybe<DateTimeFilter>;
  changedBy?: InputMaybe<UserNullableRelationFilter>;
  changedById?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EnumCardBillingStatusFilter>;
};

export type CardBillingListRelationFilter = {
  every?: InputMaybe<CardBillingWhereInput>;
  none?: InputMaybe<CardBillingWhereInput>;
  some?: InputMaybe<CardBillingWhereInput>;
};

export type CardBillingMaxAggregate = {
  __typename?: 'CardBillingMaxAggregate';
  accountCardId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  limit: Maybe<Scalars['Decimal']['output']>;
  paymentDate: Maybe<Scalars['DateTime']['output']>;
  paymentTransactionId: Maybe<Scalars['String']['output']>;
  periodEnd: Maybe<Scalars['DateTime']['output']>;
  periodStart: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<CardBillingStatus>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type CardBillingMinAggregate = {
  __typename?: 'CardBillingMinAggregate';
  accountCardId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  limit: Maybe<Scalars['Decimal']['output']>;
  paymentDate: Maybe<Scalars['DateTime']['output']>;
  paymentTransactionId: Maybe<Scalars['String']['output']>;
  periodEnd: Maybe<Scalars['DateTime']['output']>;
  periodStart: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<CardBillingStatus>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type CardBillingModel = {
  __typename?: 'CardBillingModel';
  accountCard: AccountCard;
  accountCardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  limit: Scalars['Decimal']['output'];
  paymentDate: Maybe<Scalars['DateTime']['output']>;
  paymentTransaction: Maybe<Transaction>;
  paymentTransactionId: Maybe<Scalars['String']['output']>;
  periodEnd: Maybe<Scalars['DateTime']['output']>;
  periodStart: Scalars['DateTime']['output'];
  status: CardBillingStatus;
  statusHistory: Maybe<Array<CardBillingHistory>>;
  totalAmount: Scalars['Decimal']['output'];
  transactions: Maybe<Array<Transaction>>;
  updatedAt: Scalars['DateTime']['output'];
  usagePercentage: Scalars['Float']['output'];
};

export type CardBillingNullableRelationFilter = {
  is?: InputMaybe<CardBillingWhereInput>;
  isNot?: InputMaybe<CardBillingWhereInput>;
};

export type CardBillingOnDate = {
  __typename?: 'CardBillingOnDate';
  billing: Maybe<CardBillingModel>;
  nextBillingId: Maybe<Scalars['String']['output']>;
  previousBillingId: Maybe<Scalars['String']['output']>;
};

export type CardBillingRelationFilter = {
  is?: InputMaybe<CardBillingWhereInput>;
  isNot?: InputMaybe<CardBillingWhereInput>;
};

export enum CardBillingStatus {
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING',
}

export type CardBillingSumAggregate = {
  __typename?: 'CardBillingSumAggregate';
  limit: Maybe<Scalars['Decimal']['output']>;
};

export type CardBillingWhereInput = {
  AND?: InputMaybe<Array<CardBillingWhereInput>>;
  NOT?: InputMaybe<Array<CardBillingWhereInput>>;
  OR?: InputMaybe<Array<CardBillingWhereInput>>;
  accountCard?: InputMaybe<AccountCardRelationFilter>;
  accountCardId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  limit?: InputMaybe<DecimalFilter>;
  paymentDate?: InputMaybe<DateTimeNullableFilter>;
  paymentTransaction?: InputMaybe<TransactionNullableRelationFilter>;
  paymentTransactionId?: InputMaybe<StringNullableFilter>;
  periodEnd?: InputMaybe<DateTimeNullableFilter>;
  periodStart?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumCardBillingStatusFilter>;
  statusHistory?: InputMaybe<CardBillingHistoryListRelationFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CardBillingWhereUniqueInput = {
  AND?: InputMaybe<Array<CardBillingWhereInput>>;
  NOT?: InputMaybe<Array<CardBillingWhereInput>>;
  OR?: InputMaybe<Array<CardBillingWhereInput>>;
  accountCard?: InputMaybe<AccountCardRelationFilter>;
  accountCardId?: InputMaybe<StringFilter>;
  accountCardId_periodStart?: InputMaybe<CardBillingAccountCardIdPeriodStartCompoundUniqueInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<DecimalFilter>;
  paymentDate?: InputMaybe<DateTimeNullableFilter>;
  paymentTransaction?: InputMaybe<TransactionNullableRelationFilter>;
  paymentTransactionId?: InputMaybe<Scalars['String']['input']>;
  periodEnd?: InputMaybe<DateTimeNullableFilter>;
  periodStart?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumCardBillingStatusFilter>;
  statusHistory?: InputMaybe<CardBillingHistoryListRelationFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum CardType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

export type ConfirmTransactionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
};

export type CreateAccountCardInfos = {
  billingCycleDay: Scalars['Float']['input'];
  billingPaymentDay: Scalars['Float']['input'];
  defaultLimit: Scalars['Decimal']['input'];
  type: CardType;
};

export type CreateAccountInput = {
  cardInfos?: InputMaybe<CreateAccountCardInfos>;
  description?: InputMaybe<Scalars['String']['input']>;
  initialBalance: Scalars['Decimal']['input'];
  institutionId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  type: AccountType;
};

export type CreateInvestmentInput = {
  accountId: Scalars['ID']['input'];
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

export type CreateRecurringTransactionInput = {
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Float']['input'];
  frequency: RecurrenceFrequency;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
};

export type CreateTransactionInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['ID']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Se true e a data for hoje, marca como COMPLETED. Se false ou não informado, usa PLANNED para hoje. */
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TransactionStatus>;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
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

export type EnumAccountTypeNullableListFilter = {
  equals?: InputMaybe<Array<AccountType>>;
  has?: InputMaybe<AccountType>;
  hasEvery?: InputMaybe<Array<AccountType>>;
  hasSome?: InputMaybe<Array<AccountType>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnumCardBillingStatusFilter = {
  equals?: InputMaybe<CardBillingStatus>;
  in?: InputMaybe<Array<CardBillingStatus>>;
  not?: InputMaybe<NestedEnumCardBillingStatusFilter>;
  notIn?: InputMaybe<Array<CardBillingStatus>>;
};

export type EnumCardTypeFilter = {
  equals?: InputMaybe<CardType>;
  in?: InputMaybe<Array<CardType>>;
  not?: InputMaybe<NestedEnumCardTypeFilter>;
  notIn?: InputMaybe<Array<CardType>>;
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

export type EnumPaymentMethodNullableFilter = {
  equals?: InputMaybe<PaymentMethod>;
  in?: InputMaybe<Array<PaymentMethod>>;
  not?: InputMaybe<NestedEnumPaymentMethodNullableFilter>;
  notIn?: InputMaybe<Array<PaymentMethod>>;
};

export type EnumRecurrenceFrequencyFilter = {
  equals?: InputMaybe<RecurrenceFrequency>;
  in?: InputMaybe<Array<RecurrenceFrequency>>;
  not?: InputMaybe<NestedEnumRecurrenceFrequencyFilter>;
  notIn?: InputMaybe<Array<RecurrenceFrequency>>;
};

export type EnumRecurrenceTypeFilter = {
  equals?: InputMaybe<RecurrenceType>;
  in?: InputMaybe<Array<RecurrenceType>>;
  not?: InputMaybe<NestedEnumRecurrenceTypeFilter>;
  notIn?: InputMaybe<Array<RecurrenceType>>;
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

export type FinancialAgendaModel = {
  __typename?: 'FinancialAgendaModel';
  balance: Scalars['Float']['output'];
  groups: Array<AgendaGroupModel>;
  pendingCount: Scalars['Int']['output'];
  totalExpense: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
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
  types: Maybe<Array<AccountType>>;
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
  types: Scalars['Int']['output'];
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
  types?: InputMaybe<InstitutionCreatetypesInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InstitutionCreatetypesInput = {
  set: Array<AccountType>;
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
  types: Maybe<Array<AccountType>>;
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
  types?: InputMaybe<EnumAccountTypeNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InstitutionWhereUniqueInput = {
  AND?: InputMaybe<Array<InstitutionWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionWhereInput>>;
  OR?: InputMaybe<Array<InstitutionWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  code?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  types?: InputMaybe<EnumAccountTypeNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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

export type InvestmentEvolutionModel = {
  __typename?: 'InvestmentEvolutionModel';
  dataPoints: Array<InvestmentEvolutionPointModel>;
  totalCurrentAmount: Scalars['Float']['output'];
  totalInvested: Scalars['Float']['output'];
  totalProfit: Scalars['String']['output'];
  totalProfitPercentage: Scalars['String']['output'];
  totalTaxedAmount: Scalars['Float']['output'];
};

export enum InvestmentEvolutionPeriod {
  All = 'ALL',
  Month = 'MONTH',
  SixMonths = 'SIX_MONTHS',
  ThreeMonths = 'THREE_MONTHS',
  Year = 'YEAR',
}

export type InvestmentEvolutionPointModel = {
  __typename?: 'InvestmentEvolutionPointModel';
  currentAmount: Scalars['Float']['output'];
  date: Scalars['DateTime']['output'];
  invested: Scalars['Float']['output'];
  profit: Scalars['Float']['output'];
  taxedAmount: Scalars['Float']['output'];
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
  cancelTransaction: TransactionModel;
  closeBilling: CardBilling;
  confirmTransaction: TransactionModel;
  createAccount: AccountModel;
  createInvestment: Investment;
  createRecurringTransaction: RecurringTransactionModel;
  createTransaction: TransactionModel;
  createUser: SignIn;
  deleteInvestment: Scalars['ID']['output'];
  deleteRecurringTransaction: RecurringTransactionModel;
  endRecurringTransaction: RecurringTransactionModel;
  pauseRecurringTransaction: RecurringTransactionModel;
  payBilling: Transaction;
  rescheduleTransaction: TransactionModel;
  resumeRecurringTransaction: RecurringTransactionModel;
  updateAccountCard: AccountCard;
  updateRecurringTransactionFromDate: RecurringTransactionModel;
  updateRecurringTransactions: TransactionModel;
  updateTransaction: TransactionModel;
};

export type MutationAuthSignInArgs = {
  data: AuthSignInInput;
};

export type MutationCancelTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationCloseBillingArgs = {
  billingId: Scalars['String']['input'];
  closingDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MutationConfirmTransactionArgs = {
  data: ConfirmTransactionInput;
};

export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};

export type MutationCreateInvestmentArgs = {
  data: CreateInvestmentInput;
};

export type MutationCreateRecurringTransactionArgs = {
  data: CreateRecurringTransactionInput;
};

export type MutationCreateTransactionArgs = {
  data: CreateTransactionInput;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteInvestmentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteRecurringTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationEndRecurringTransactionArgs = {
  endDate: Scalars['DateTime']['input'];
  id: Scalars['String']['input'];
};

export type MutationPauseRecurringTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationPayBillingArgs = {
  billingId: Scalars['String']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId: Scalars['ID']['input'];
};

export type MutationRescheduleTransactionArgs = {
  data: RescheduleTransactionInput;
};

export type MutationResumeRecurringTransactionArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateAccountCardArgs = {
  billingCycleDay?: InputMaybe<Scalars['Float']['input']>;
  billingPaymentDay?: InputMaybe<Scalars['Float']['input']>;
  cardId: Scalars['ID']['input'];
  defaultLimit?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationUpdateRecurringTransactionFromDateArgs = {
  data: UpdateRecurringTransactionInput;
  fromDate: Scalars['DateTime']['input'];
  id: Scalars['String']['input'];
};

export type MutationUpdateRecurringTransactionsArgs = {
  data: UpdateRecurringTransactionsInput;
};

export type MutationUpdateTransactionArgs = {
  data: UpdateTransactionInput;
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

export type NestedEnumCardBillingStatusFilter = {
  equals?: InputMaybe<CardBillingStatus>;
  in?: InputMaybe<Array<CardBillingStatus>>;
  not?: InputMaybe<NestedEnumCardBillingStatusFilter>;
  notIn?: InputMaybe<Array<CardBillingStatus>>;
};

export type NestedEnumCardTypeFilter = {
  equals?: InputMaybe<CardType>;
  in?: InputMaybe<Array<CardType>>;
  not?: InputMaybe<NestedEnumCardTypeFilter>;
  notIn?: InputMaybe<Array<CardType>>;
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

export type NestedEnumPaymentMethodNullableFilter = {
  equals?: InputMaybe<PaymentMethod>;
  in?: InputMaybe<Array<PaymentMethod>>;
  not?: InputMaybe<NestedEnumPaymentMethodNullableFilter>;
  notIn?: InputMaybe<Array<PaymentMethod>>;
};

export type NestedEnumRecurrenceFrequencyFilter = {
  equals?: InputMaybe<RecurrenceFrequency>;
  in?: InputMaybe<Array<RecurrenceFrequency>>;
  not?: InputMaybe<NestedEnumRecurrenceFrequencyFilter>;
  notIn?: InputMaybe<Array<RecurrenceFrequency>>;
};

export type NestedEnumRecurrenceTypeFilter = {
  equals?: InputMaybe<RecurrenceType>;
  in?: InputMaybe<Array<RecurrenceType>>;
  not?: InputMaybe<NestedEnumRecurrenceTypeFilter>;
  notIn?: InputMaybe<Array<RecurrenceType>>;
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
  AccountCard = 'accountCard',
  Balance = 'balance',
  CreatedAt = 'createdAt',
  CurrentBillingAmount = 'currentBillingAmount',
  DestinyRecurringTransactions = 'destinyRecurringTransactions',
  DestinyTransactions = 'destinyTransactions',
  InitialBalance = 'initialBalance',
  Institution = 'institution',
  InstitutionId = 'institutionId',
  InvestmentTransactions = 'investmentTransactions',
  Investments = 'investments',
  IsActive = 'isActive',
  Name = 'name',
  SourceRecurringTransactions = 'sourceRecurringTransactions',
  SourceTransactions = 'sourceTransactions',
  TotalInvested = 'totalInvested',
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
  Types = 'types',
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

export enum OrdenationRecurringTransactionModel {
  Count = '_count',
  CreatedAt = 'createdAt',
  DayOfMonth = 'dayOfMonth',
  Description = 'description',
  DestinyAccount = 'destinyAccount',
  DestinyAccountId = 'destinyAccountId',
  EndDate = 'endDate',
  EstimatedAmount = 'estimatedAmount',
  Frequency = 'frequency',
  IsActive = 'isActive',
  MonthOfYear = 'monthOfYear',
  PaymentMethod = 'paymentMethod',
  RecurrenceType = 'recurrenceType',
  SourceAccount = 'sourceAccount',
  SourceAccountId = 'sourceAccountId',
  StartDate = 'startDate',
  TotalInstallments = 'totalInstallments',
  Transactions = 'transactions',
  Type = 'type',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationTransactionModel {
  Amount = 'amount',
  BillingPayment = 'billingPayment',
  CardBilling = 'cardBilling',
  CardBillingId = 'cardBillingId',
  CreatedAt = 'createdAt',
  Date = 'date',
  Description = 'description',
  DestinyAccount = 'destinyAccount',
  DestinyAccountId = 'destinyAccountId',
  InstallmentNumber = 'installmentNumber',
  PaymentEnabled = 'paymentEnabled',
  PaymentLimit = 'paymentLimit',
  PaymentMethod = 'paymentMethod',
  RecurringTransaction = 'recurringTransaction',
  RecurringTransactionId = 'recurringTransactionId',
  SourceAccount = 'sourceAccount',
  SourceAccountId = 'sourceAccountId',
  Status = 'status',
  TotalInstallments = 'totalInstallments',
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

export enum PaymentMethod {
  Boleto = 'BOLETO',
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  Pix = 'PIX',
}

export type Query = {
  __typename?: 'Query';
  account: AccountModel;
  accountCard: Maybe<AccountCard>;
  accounts: AccountConnection;
  balanceForecast: BalanceForecastModel;
  billing: CardBillingOnDate;
  financialAgenda: FinancialAgendaModel;
  health: Scalars['String']['output'];
  institution: InstitutionModel;
  institutions: InstitutionConnection;
  investmentAccounts: Array<AccountWithInvestmentCount>;
  investmentEvolution: InvestmentEvolutionModel;
  investmentRegimes: InvestmentRegimeSummaryConnection;
  investments: InvestmentConnection;
  recurringTransaction: Maybe<RecurringTransactionModel>;
  recurringTransactions: RecurringTransactionConnection;
  totalInvestments: TotalInvestmentsModel;
  transactions: TransactionConnection;
  transactionsCalendar: TransactionsCalendarModel;
  transactionsGroupedByPeriod: Array<TransactionGroupModel>;
  transactionsSummary: TransactionsSummaryModel;
  user: UserModel;
  users: UserConnection;
};

export type QueryAccountArgs = {
  id: Scalars['ID']['input'];
};

export type QueryAccountCardArgs = {
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
  types?: InputMaybe<Array<AccountType>>;
};

export type QueryBalanceForecastArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  period?: BalanceForecastPeriod;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QueryBillingArgs = {
  accountId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryFinancialAgendaArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  daysAhead?: Scalars['Int']['input'];
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
  types?: InputMaybe<Array<AccountType>>;
};

export type QueryInvestmentAccountsArgs = {
  regime: Regime;
};

export type QueryInvestmentEvolutionArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  period?: InvestmentEvolutionPeriod;
};

export type QueryInvestmentRegimesArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInvestmentsArgs = {
  accountIds?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  regime?: InputMaybe<Regime>;
};

export type QueryRecurringTransactionArgs = {
  id: Scalars['String']['input'];
};

export type QueryRecurringTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationRecurringTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  statuses?: InputMaybe<Array<TransactionStatus>>;
  types?: InputMaybe<Array<TransactionType>>;
};

export type QueryTransactionsCalendarArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type QueryTransactionsGroupedByPeriodArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limitPerGroup?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  statuses?: InputMaybe<Array<TransactionStatus>>;
  types?: InputMaybe<Array<TransactionType>>;
};

export type QueryTransactionsSummaryArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  statuses?: InputMaybe<Array<TransactionStatus>>;
  types?: InputMaybe<Array<TransactionType>>;
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

export enum RecurrenceFrequency {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY',
}

export enum RecurrenceType {
  Installment = 'INSTALLMENT',
  Periodic = 'PERIODIC',
}

export type RecurringTransaction = {
  __typename?: 'RecurringTransaction';
  _count: RecurringTransactionCount;
  createdAt: Scalars['DateTime']['output'];
  dayOfMonth: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  estimatedAmount: Scalars['Decimal']['output'];
  frequency: RecurrenceFrequency;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  monthOfYear: Maybe<Scalars['Int']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurrenceType: RecurrenceType;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  totalInstallments: Maybe<Scalars['Int']['output']>;
  transactions: Maybe<Array<Transaction>>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RecurringTransactionAvgAggregate = {
  __typename?: 'RecurringTransactionAvgAggregate';
  dayOfMonth: Maybe<Scalars['Float']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  monthOfYear: Maybe<Scalars['Float']['output']>;
  totalInstallments: Maybe<Scalars['Float']['output']>;
};

export type RecurringTransactionConnection = {
  __typename?: 'RecurringTransactionConnection';
  edges: Maybe<Array<RecurringTransactionModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type RecurringTransactionCount = {
  __typename?: 'RecurringTransactionCount';
  transactions: Scalars['Int']['output'];
};

export type RecurringTransactionCountAggregate = {
  __typename?: 'RecurringTransactionCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  dayOfMonth: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  destinyAccountId: Scalars['Int']['output'];
  endDate: Scalars['Int']['output'];
  estimatedAmount: Scalars['Int']['output'];
  frequency: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  monthOfYear: Scalars['Int']['output'];
  paymentMethod: Scalars['Int']['output'];
  recurrenceType: Scalars['Int']['output'];
  sourceAccountId: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  totalInstallments: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RecurringTransactionCreateManyDestinyAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type RecurringTransactionCreateManyDestinyAccountInputEnvelope = {
  data: Array<RecurringTransactionCreateManyDestinyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateManySourceAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type RecurringTransactionCreateManySourceAccountInputEnvelope = {
  data: Array<RecurringTransactionCreateManySourceAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecurringTransactionCreateManyUserInputEnvelope = {
  data: Array<RecurringTransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateNestedManyWithoutDestinyAccountInput = {
  connect?: InputMaybe<Array<RecurringTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<RecurringTransactionCreateOrConnectWithoutDestinyAccountInput>
  >;
  create?: InputMaybe<
    Array<RecurringTransactionCreateWithoutDestinyAccountInput>
  >;
  createMany?: InputMaybe<RecurringTransactionCreateManyDestinyAccountInputEnvelope>;
};

export type RecurringTransactionCreateNestedManyWithoutSourceAccountInput = {
  connect?: InputMaybe<Array<RecurringTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<RecurringTransactionCreateOrConnectWithoutSourceAccountInput>
  >;
  create?: InputMaybe<
    Array<RecurringTransactionCreateWithoutSourceAccountInput>
  >;
  createMany?: InputMaybe<RecurringTransactionCreateManySourceAccountInputEnvelope>;
};

export type RecurringTransactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RecurringTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<RecurringTransactionCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<RecurringTransactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<RecurringTransactionCreateManyUserInputEnvelope>;
};

export type RecurringTransactionCreateNestedOneWithoutTransactionsInput = {
  connect?: InputMaybe<RecurringTransactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RecurringTransactionCreateOrConnectWithoutTransactionsInput>;
  create?: InputMaybe<RecurringTransactionCreateWithoutTransactionsInput>;
};

export type RecurringTransactionCreateOrConnectWithoutDestinyAccountInput = {
  create: RecurringTransactionCreateWithoutDestinyAccountInput;
  where: RecurringTransactionWhereUniqueInput;
};

export type RecurringTransactionCreateOrConnectWithoutSourceAccountInput = {
  create: RecurringTransactionCreateWithoutSourceAccountInput;
  where: RecurringTransactionWhereUniqueInput;
};

export type RecurringTransactionCreateOrConnectWithoutTransactionsInput = {
  create: RecurringTransactionCreateWithoutTransactionsInput;
  where: RecurringTransactionWhereUniqueInput;
};

export type RecurringTransactionCreateOrConnectWithoutUserInput = {
  create: RecurringTransactionCreateWithoutUserInput;
  where: RecurringTransactionWhereUniqueInput;
};

export type RecurringTransactionCreateWithoutDestinyAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
};

export type RecurringTransactionCreateWithoutSourceAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyRecurringTransactionsInput>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
};

export type RecurringTransactionCreateWithoutTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyRecurringTransactionsInput>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
};

export type RecurringTransactionCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayOfMonth: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyRecurringTransactionsInput>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Decimal']['input'];
  frequency: RecurrenceFrequency;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecurringTransactionListRelationFilter = {
  every?: InputMaybe<RecurringTransactionWhereInput>;
  none?: InputMaybe<RecurringTransactionWhereInput>;
  some?: InputMaybe<RecurringTransactionWhereInput>;
};

export type RecurringTransactionMaxAggregate = {
  __typename?: 'RecurringTransactionMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  frequency: Maybe<RecurrenceFrequency>;
  id: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  monthOfYear: Maybe<Scalars['Int']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurrenceType: Maybe<RecurrenceType>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type RecurringTransactionMinAggregate = {
  __typename?: 'RecurringTransactionMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  frequency: Maybe<RecurrenceFrequency>;
  id: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  monthOfYear: Maybe<Scalars['Int']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurrenceType: Maybe<RecurrenceType>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type RecurringTransactionModel = {
  __typename?: 'RecurringTransactionModel';
  _count: RecurringTransactionCount;
  createdAt: Scalars['DateTime']['output'];
  dayOfMonth: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  estimatedAmount: Scalars['Decimal']['output'];
  frequency: RecurrenceFrequency;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  monthOfYear: Maybe<Scalars['Int']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurrenceType: RecurrenceType;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  totalInstallments: Maybe<Scalars['Int']['output']>;
  transactions: Maybe<Array<Transaction>>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export type RecurringTransactionModelEdge = {
  __typename?: 'RecurringTransactionModelEdge';
  cursor: Scalars['String']['output'];
  node: RecurringTransactionModel;
};

export type RecurringTransactionNullableRelationFilter = {
  is?: InputMaybe<RecurringTransactionWhereInput>;
  isNot?: InputMaybe<RecurringTransactionWhereInput>;
};

export type RecurringTransactionSumAggregate = {
  __typename?: 'RecurringTransactionSumAggregate';
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  monthOfYear: Maybe<Scalars['Int']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
};

export type RecurringTransactionWhereInput = {
  AND?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  NOT?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  OR?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayOfMonth?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  estimatedAmount?: InputMaybe<DecimalFilter>;
  frequency?: InputMaybe<EnumRecurrenceFrequencyFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  monthOfYear?: InputMaybe<IntNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurrenceType?: InputMaybe<EnumRecurrenceTypeFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RecurringTransactionWhereUniqueInput = {
  AND?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  NOT?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  OR?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayOfMonth?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  estimatedAmount?: InputMaybe<DecimalFilter>;
  frequency?: InputMaybe<EnumRecurrenceFrequencyFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<BoolFilter>;
  monthOfYear?: InputMaybe<IntNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurrenceType?: InputMaybe<EnumRecurrenceTypeFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export enum Regime {
  Cdi = 'CDI',
  Poupanca = 'POUPANCA',
}

export type RescheduleTransactionInput = {
  id: Scalars['ID']['input'];
  newDate: Scalars['DateTime']['input'];
};

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
  billingPayment: Maybe<CardBilling>;
  cardBilling: Maybe<CardBilling>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installmentNumber: Maybe<Scalars['Int']['output']>;
  paymentEnabled: Scalars['Boolean']['output'];
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransaction: Maybe<RecurringTransaction>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TransactionAvgAggregate = {
  __typename?: 'TransactionAvgAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  installmentNumber: Maybe<Scalars['Float']['output']>;
  totalInstallments: Maybe<Scalars['Float']['output']>;
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
  cardBillingId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  destinyAccountId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  installmentNumber: Scalars['Int']['output'];
  paymentEnabled: Scalars['Int']['output'];
  paymentLimit: Scalars['Int']['output'];
  paymentMethod: Scalars['Int']['output'];
  recurringTransactionId: Scalars['Int']['output'];
  sourceAccountId: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  totalInstallments: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type TransactionCreateManyCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManyCardBillingInputEnvelope = {
  data: Array<TransactionCreateManyCardBillingInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManyDestinyAccountInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManyDestinyAccountInputEnvelope = {
  data: Array<TransactionCreateManyDestinyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManyRecurringTransactionInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManyRecurringTransactionInputEnvelope = {
  data: Array<TransactionCreateManyRecurringTransactionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManySourceAccountInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
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
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionCreateManyUserInputEnvelope = {
  data: Array<TransactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateNestedManyWithoutCardBillingInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutCardBillingInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutCardBillingInput>>;
  createMany?: InputMaybe<TransactionCreateManyCardBillingInputEnvelope>;
};

export type TransactionCreateNestedManyWithoutDestinyAccountInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutDestinyAccountInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutDestinyAccountInput>>;
  createMany?: InputMaybe<TransactionCreateManyDestinyAccountInputEnvelope>;
};

export type TransactionCreateNestedManyWithoutRecurringTransactionInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutRecurringTransactionInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutRecurringTransactionInput>>;
  createMany?: InputMaybe<TransactionCreateManyRecurringTransactionInputEnvelope>;
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

export type TransactionCreateNestedOneWithoutBillingPaymentInput = {
  connect?: InputMaybe<TransactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TransactionCreateOrConnectWithoutBillingPaymentInput>;
  create?: InputMaybe<TransactionCreateWithoutBillingPaymentInput>;
};

export type TransactionCreateOrConnectWithoutBillingPaymentInput = {
  create: TransactionCreateWithoutBillingPaymentInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutCardBillingInput = {
  create: TransactionCreateWithoutCardBillingInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutDestinyAccountInput = {
  create: TransactionCreateWithoutDestinyAccountInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutRecurringTransactionInput = {
  create: TransactionCreateWithoutRecurringTransactionInput;
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

export type TransactionCreateWithoutBillingPaymentInput = {
  amount: Scalars['Decimal']['input'];
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutDestinyAccountInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutRecurringTransactionInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutSourceAccountInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<Scalars['Int']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionGroupModel = {
  __typename?: 'TransactionGroupModel';
  count: Scalars['Int']['output'];
  hasMore: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  period: TransactionPeriod;
  transactions: Array<TransactionModel>;
};

export type TransactionListRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>;
  none?: InputMaybe<TransactionWhereInput>;
  some?: InputMaybe<TransactionWhereInput>;
};

export type TransactionMaxAggregate = {
  __typename?: 'TransactionMaxAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  paymentEnabled: Maybe<Scalars['Boolean']['output']>;
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionMinAggregate = {
  __typename?: 'TransactionMinAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  paymentEnabled: Maybe<Scalars['Boolean']['output']>;
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionModel = {
  __typename?: 'TransactionModel';
  amount: Scalars['Decimal']['output'];
  billingPayment: Maybe<CardBilling>;
  cardBilling: Maybe<CardBilling>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installmentNumber: Maybe<Scalars['Int']['output']>;
  paymentEnabled: Scalars['Boolean']['output'];
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransaction: Maybe<RecurringTransaction>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export type TransactionModelEdge = {
  __typename?: 'TransactionModelEdge';
  cursor: Scalars['String']['output'];
  node: TransactionModel;
};

export type TransactionNullableRelationFilter = {
  is?: InputMaybe<TransactionWhereInput>;
  isNot?: InputMaybe<TransactionWhereInput>;
};

/** Período temporal para agrupamento de transações */
export enum TransactionPeriod {
  Future = 'FUTURE',
  NextMonth = 'NEXT_MONTH',
  Overdue = 'OVERDUE',
  Past = 'PAST',
  ThisMonth = 'THIS_MONTH',
  ThisWeek = 'THIS_WEEK',
  Today = 'TODAY',
}

export enum TransactionStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Overdue = 'OVERDUE',
  Planned = 'PLANNED',
}

export type TransactionSumAggregate = {
  __typename?: 'TransactionSumAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
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
  billingPayment?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBilling?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBillingId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  installmentNumber?: InputMaybe<IntNullableFilter>;
  paymentEnabled?: InputMaybe<BoolFilter>;
  paymentLimit?: InputMaybe<DateTimeNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurringTransaction?: InputMaybe<RecurringTransactionNullableRelationFilter>;
  recurringTransactionId?: InputMaybe<StringNullableFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumTransactionStatusFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
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
  billingPayment?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBilling?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBillingId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<IntNullableFilter>;
  paymentEnabled?: InputMaybe<BoolFilter>;
  paymentLimit?: InputMaybe<DateTimeNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurringTransaction?: InputMaybe<RecurringTransactionNullableRelationFilter>;
  recurringTransactionId?: InputMaybe<StringNullableFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumTransactionStatusFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type TransactionsCalendarModel = {
  __typename?: 'TransactionsCalendarModel';
  days: Array<CalendarDayModel>;
  monthBalance: Scalars['Float']['output'];
  monthTotalExpense: Scalars['Float']['output'];
  monthTotalIncome: Scalars['Float']['output'];
};

export type TransactionsSummaryModel = {
  __typename?: 'TransactionsSummaryModel';
  balance: Scalars['Decimal']['output'];
  forecastBalance: Scalars['Decimal']['output'];
  forecastExpense: Scalars['Decimal']['output'];
  forecastIncome: Scalars['Decimal']['output'];
  realizedBalance: Scalars['Decimal']['output'];
  realizedExpense: Scalars['Decimal']['output'];
  realizedIncome: Scalars['Decimal']['output'];
  totalExpense: Scalars['Decimal']['output'];
  totalIncome: Scalars['Decimal']['output'];
  transactionCount: Scalars['Int']['output'];
};

/** Scope for updating recurring transactions */
export enum UpdateRecurringScope {
  AllPlanned = 'ALL_PLANNED',
  ThisAndFuture = 'THIS_AND_FUTURE',
  ThisOnly = 'THIS_ONLY',
}

export type UpdateRecurringTransactionInput = {
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyAccountId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount?: InputMaybe<Scalars['Float']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateRecurringTransactionsInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  scope: UpdateRecurringScope;
  transactionId: Scalars['ID']['input'];
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  /** Se true e a data for hoje, marca como COMPLETED. Se false ou não informado, usa PLANNED para hoje. */
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  status?: InputMaybe<TransactionStatus>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  accounts: Maybe<Array<Account>>;
  cardBillingStatusHistories: Maybe<Array<CardBillingHistory>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  investments: Maybe<Array<Investment>>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  recurringTransactions: Maybe<Array<RecurringTransaction>>;
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
  cardBillingStatusHistories: Scalars['Int']['output'];
  investments: Scalars['Int']['output'];
  recurringTransactions: Scalars['Int']['output'];
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
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutChangedByInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateNestedOneWithoutAccountsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAccountsInput>;
  create?: InputMaybe<UserCreateWithoutAccountsInput>;
};

export type UserCreateNestedOneWithoutCardBillingStatusHistoriesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCardBillingStatusHistoriesInput>;
  create?: InputMaybe<UserCreateWithoutCardBillingStatusHistoriesInput>;
};

export type UserCreateNestedOneWithoutInvestmentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutInvestmentsInput>;
  create?: InputMaybe<UserCreateWithoutInvestmentsInput>;
};

export type UserCreateNestedOneWithoutRecurringTransactionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecurringTransactionsInput>;
  create?: InputMaybe<UserCreateWithoutRecurringTransactionsInput>;
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

export type UserCreateOrConnectWithoutCardBillingStatusHistoriesInput = {
  create: UserCreateWithoutCardBillingStatusHistoriesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutInvestmentsInput = {
  create: UserCreateWithoutInvestmentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRecurringTransactionsInput = {
  create: UserCreateWithoutRecurringTransactionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTransactionsInput = {
  create: UserCreateWithoutTransactionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAccountsInput = {
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutChangedByInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutCardBillingStatusHistoriesInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutInvestmentsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutChangedByInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutRecurringTransactionsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutChangedByInput>;
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

export type UserCreateWithoutTransactionsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutChangedByInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
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

export type UserNullableRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
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
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  recurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  cardBillingStatusHistories?: InputMaybe<CardBillingHistoryListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  recurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CreateAccountMutationVariables = Exact<{
  data: CreateAccountInput;
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount: { __typename?: 'AccountModel'; id: string };
};

export type CloseBillingMutationVariables = Exact<{
  billingId: Scalars['String']['input'];
  closingDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;

export type CloseBillingMutation = {
  __typename?: 'Mutation';
  closeBilling: {
    __typename?: 'CardBilling';
    id: string;
    periodStart: any;
    periodEnd: any | null;
    paymentDate: any | null;
    limit: any;
    status: CardBillingStatus;
    accountCardId: string;
    paymentTransactionId: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export type PayBillingMutationVariables = Exact<{
  billingId: Scalars['String']['input'];
  sourceAccountId: Scalars['ID']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type PayBillingMutation = {
  __typename?: 'Mutation';
  payBilling: {
    __typename?: 'Transaction';
    id: string;
    description: string;
    amount: any;
    date: any;
    status: TransactionStatus;
    type: TransactionType;
    paymentMethod: PaymentMethod | null;
    paymentEnabled: boolean;
    paymentLimit: any | null;
    sourceAccountId: string | null;
    destinyAccountId: string | null;
    cardBillingId: string | null;
    userId: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type UpdateAccountCardMutationVariables = Exact<{
  cardId: Scalars['ID']['input'];
  billingCycleDay?: InputMaybe<Scalars['Float']['input']>;
  billingPaymentDay?: InputMaybe<Scalars['Float']['input']>;
  defaultLimit?: InputMaybe<Scalars['Float']['input']>;
}>;

export type UpdateAccountCardMutation = {
  __typename?: 'Mutation';
  updateAccountCard: {
    __typename?: 'AccountCard';
    id: string;
    lastFourDigits: string | null;
    billingCycleDay: number;
    billingPaymentDay: number;
    type: CardType;
    defaultLimit: any;
    accountId: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type AccountFragmentFragment = {
  __typename?: 'AccountModel';
  id: string;
  name: string;
  type: AccountType;
  balance: any | null;
  currentBillingAmount: any | null;
  totalInvested: any | null;
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
  types?: InputMaybe<Array<AccountType> | AccountType>;
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
        currentBillingAmount: any | null;
        totalInvested: any | null;
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

export type AccountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type AccountQuery = {
  __typename?: 'Query';
  account: {
    __typename?: 'AccountModel';
    id: string;
    name: string;
    type: AccountType;
    balance: any | null;
    currentBillingAmount: any | null;
    totalInvested: any | null;
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
  types?: InputMaybe<Array<AccountType> | AccountType>;
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

export type BillingQueryVariables = Exact<{
  accountId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type BillingQuery = {
  __typename?: 'Query';
  billing: {
    __typename?: 'CardBillingOnDate';
    nextBillingId: string | null;
    previousBillingId: string | null;
    billing: {
      __typename?: 'CardBillingModel';
      id: string;
      periodStart: any;
      periodEnd: any | null;
      paymentDate: any | null;
      totalAmount: any;
      limit: any;
      usagePercentage: number;
      status: CardBillingStatus;
      accountCardId: string;
      createdAt: any;
      updatedAt: any;
      accountCard: {
        __typename?: 'AccountCard';
        id: string;
        lastFourDigits: string | null;
        billingCycleDay: number;
        billingPaymentDay: number;
        defaultLimit: any;
        type: CardType;
        accountId: string;
        createdAt: any;
        updatedAt: any;
      };
      paymentTransaction: {
        __typename?: 'Transaction';
        id: string;
        description: string;
        amount: any;
        date: any;
        status: TransactionStatus;
        type: TransactionType;
        paymentMethod: PaymentMethod | null;
        sourceAccountId: string | null;
        destinyAccountId: string | null;
        cardBillingId: string | null;
        userId: string;
        createdAt: any;
        updatedAt: any;
      } | null;
      transactions: Array<{ __typename?: 'Transaction'; id: string }> | null;
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
  status: InvestmentStatus;
};

export type InvestmentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  orderBy?: InputMaybe<OrdenationInvestmentModel>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  regime?: InputMaybe<Regime>;
  accountIds?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
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
        status: InvestmentStatus;
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

export type InvestmentRegimesQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['String']['input']>;
}>;

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

export type InvestmentEvolutionQueryVariables = Exact<{
  period?: InputMaybe<InvestmentEvolutionPeriod>;
  accountId?: InputMaybe<Scalars['String']['input']>;
}>;

export type InvestmentEvolutionQuery = {
  __typename?: 'Query';
  investmentEvolution: {
    __typename?: 'InvestmentEvolutionModel';
    totalInvested: number;
    totalCurrentAmount: number;
    totalTaxedAmount: number;
    totalProfit: string;
    totalProfitPercentage: string;
    dataPoints: Array<{
      __typename?: 'InvestmentEvolutionPointModel';
      date: any;
      invested: number;
      currentAmount: number;
      taxedAmount: number;
      profit: number;
    }>;
  };
};

export type InvestmentAccountsQueryVariables = Exact<{
  regime: Regime;
}>;

export type InvestmentAccountsQuery = {
  __typename?: 'Query';
  investmentAccounts: Array<{
    __typename?: 'AccountWithInvestmentCount';
    id: string;
    name: string;
    institutionName: string | null;
    institutionLogoUrl: string | null;
    investmentCount: number;
  }>;
};

export type CreateRecurringTransactionMutationVariables = Exact<{
  data: CreateRecurringTransactionInput;
}>;

export type CreateRecurringTransactionMutation = {
  __typename?: 'Mutation';
  createRecurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
  };
};

export type UpdateRecurringTransactionFromDateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  fromDate: Scalars['DateTime']['input'];
  data: UpdateRecurringTransactionInput;
}>;

export type UpdateRecurringTransactionFromDateMutation = {
  __typename?: 'Mutation';
  updateRecurringTransactionFromDate: {
    __typename?: 'RecurringTransactionModel';
    id: string;
  };
};

export type PauseRecurringTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type PauseRecurringTransactionMutation = {
  __typename?: 'Mutation';
  pauseRecurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
    isActive: boolean;
  };
};

export type ResumeRecurringTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type ResumeRecurringTransactionMutation = {
  __typename?: 'Mutation';
  resumeRecurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
    isActive: boolean;
  };
};

export type EndRecurringTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
}>;

export type EndRecurringTransactionMutation = {
  __typename?: 'Mutation';
  endRecurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
    endDate: any | null;
    isActive: boolean;
  };
};

export type DeleteRecurringTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type DeleteRecurringTransactionMutation = {
  __typename?: 'Mutation';
  deleteRecurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
  };
};

export type RecurringTransactionFragmentFragment = {
  __typename?: 'RecurringTransactionModel';
  id: string;
  description: string;
  estimatedAmount: any;
  type: TransactionType;
  paymentMethod: PaymentMethod | null;
  frequency: RecurrenceFrequency;
  dayOfMonth: number;
  monthOfYear: number | null;
  startDate: any;
  endDate: any | null;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
  sourceAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    institution: {
      __typename?: 'Institution';
      name: string;
      logoUrl: string | null;
    };
  } | null;
  destinyAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    institution: {
      __typename?: 'Institution';
      name: string;
      logoUrl: string | null;
    };
  } | null;
};

export type RecurringTransactionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<OrdenationRecurringTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type RecurringTransactionsQuery = {
  __typename?: 'Query';
  recurringTransactions: {
    __typename?: 'RecurringTransactionConnection';
    edges: Array<{
      __typename?: 'RecurringTransactionModelEdge';
      cursor: string;
      node: {
        __typename?: 'RecurringTransactionModel';
        id: string;
        description: string;
        estimatedAmount: any;
        type: TransactionType;
        paymentMethod: PaymentMethod | null;
        frequency: RecurrenceFrequency;
        dayOfMonth: number;
        monthOfYear: number | null;
        startDate: any;
        endDate: any | null;
        isActive: boolean;
        createdAt: any;
        updatedAt: any;
        sourceAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          institution: {
            __typename?: 'Institution';
            name: string;
            logoUrl: string | null;
          };
        } | null;
        destinyAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          institution: {
            __typename?: 'Institution';
            name: string;
            logoUrl: string | null;
          };
        } | null;
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

export type RecurringTransactionQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type RecurringTransactionQuery = {
  __typename?: 'Query';
  recurringTransaction: {
    __typename?: 'RecurringTransactionModel';
    id: string;
    description: string;
    estimatedAmount: any;
    type: TransactionType;
    paymentMethod: PaymentMethod | null;
    frequency: RecurrenceFrequency;
    dayOfMonth: number;
    monthOfYear: number | null;
    startDate: any;
    endDate: any | null;
    isActive: boolean;
    createdAt: any;
    updatedAt: any;
    sourceAccount: {
      __typename?: 'Account';
      id: string;
      name: string;
      institution: {
        __typename?: 'Institution';
        name: string;
        logoUrl: string | null;
      };
    } | null;
    destinyAccount: {
      __typename?: 'Account';
      id: string;
      name: string;
      institution: {
        __typename?: 'Institution';
        name: string;
        logoUrl: string | null;
      };
    } | null;
  } | null;
};

export type BalanceForecastQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['String']['input']>;
  period: BalanceForecastPeriod;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;

export type BalanceForecastQuery = {
  __typename?: 'Query';
  balanceForecast: {
    __typename?: 'BalanceForecastModel';
    currentBalance: number;
    projectedBalance: number;
    balanceTrend: number;
    startDate: any;
    endDate: any;
    dataPoints: Array<{
      __typename?: 'BalanceForecastPointModel';
      date: any;
      balance: number;
      isProjected: boolean;
      incomeAmount: number;
      expenseAmount: number;
      transactionCount: number;
      transactions: Array<{
        __typename?: 'BalanceForecastTransactionModel';
        id: string;
        description: string;
        amount: number;
        isIncome: boolean;
      }>;
    }>;
  };
};

export type TransactionsCalendarQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
  month: Scalars['Int']['input'];
}>;

export type TransactionsCalendarQuery = {
  __typename?: 'Query';
  transactionsCalendar: {
    __typename?: 'TransactionsCalendarModel';
    monthTotalIncome: number;
    monthTotalExpense: number;
    monthBalance: number;
    days: Array<{
      __typename?: 'CalendarDayModel';
      date: any;
      totalIncome: number;
      totalExpense: number;
      transactionCount: number;
      transactions: Array<{
        __typename?: 'CalendarDayTransactionModel';
        id: string;
        description: string;
        amount: number;
        type: string;
        status: string;
      }>;
    }>;
  };
};

export type FinancialAgendaQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['String']['input']>;
  daysAhead: Scalars['Int']['input'];
}>;

export type FinancialAgendaQuery = {
  __typename?: 'Query';
  financialAgenda: {
    __typename?: 'FinancialAgendaModel';
    totalIncome: number;
    totalExpense: number;
    balance: number;
    pendingCount: number;
    groups: Array<{
      __typename?: 'AgendaGroupModel';
      label: string;
      transactions: Array<{
        __typename?: 'AgendaTransactionModel';
        id: string;
        description: string;
        amount: number;
        type: string;
        status: string;
        date: any;
        daysUntilDue: number;
        isOverdue: boolean;
      }>;
    }>;
  };
};

export type CreateTransactionMutationVariables = Exact<{
  data: CreateTransactionInput;
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction: { __typename?: 'TransactionModel'; id: string };
};

export type UpdateTransactionMutationVariables = Exact<{
  data: UpdateTransactionInput;
}>;

export type UpdateTransactionMutation = {
  __typename?: 'Mutation';
  updateTransaction: {
    __typename?: 'TransactionModel';
    id: string;
    description: string;
    amount: any;
    date: any;
    status: TransactionStatus;
    paymentMethod: PaymentMethod | null;
  };
};

export type ConfirmTransactionMutationVariables = Exact<{
  data: ConfirmTransactionInput;
}>;

export type ConfirmTransactionMutation = {
  __typename?: 'Mutation';
  confirmTransaction: {
    __typename?: 'TransactionModel';
    id: string;
    status: TransactionStatus;
    amount: any;
    date: any;
  };
};

export type CancelTransactionMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type CancelTransactionMutation = {
  __typename?: 'Mutation';
  cancelTransaction: {
    __typename?: 'TransactionModel';
    id: string;
    status: TransactionStatus;
  };
};

export type RescheduleTransactionMutationVariables = Exact<{
  data: RescheduleTransactionInput;
}>;

export type RescheduleTransactionMutation = {
  __typename?: 'Mutation';
  rescheduleTransaction: {
    __typename?: 'TransactionModel';
    id: string;
    date: any;
  };
};

export type UpdateRecurringTransactionsMutationVariables = Exact<{
  data: UpdateRecurringTransactionsInput;
}>;

export type UpdateRecurringTransactionsMutation = {
  __typename?: 'Mutation';
  updateRecurringTransactions: {
    __typename?: 'TransactionModel';
    id: string;
    description: string;
    amount: any;
    paymentMethod: PaymentMethod | null;
  };
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
  paymentMethod: PaymentMethod | null;
  recurringTransactionId: string | null;
  installmentNumber: number | null;
  totalInstallments: number | null;
  sourceAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    type: AccountType;
    institution: {
      __typename?: 'Institution';
      id: string;
      name: string;
      logoUrl: string | null;
    };
  } | null;
  destinyAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    type: AccountType;
    institution: {
      __typename?: 'Institution';
      id: string;
      name: string;
      logoUrl: string | null;
    };
  } | null;
  billingPayment: {
    __typename?: 'CardBilling';
    id: string;
    status: CardBillingStatus;
    accountCard: {
      __typename?: 'AccountCard';
      account: {
        __typename?: 'Account';
        id: string;
        name: string;
        institution: {
          __typename?: 'Institution';
          id: string;
          name: string;
          logoUrl: string | null;
        };
      };
    };
  } | null;
  cardBilling: {
    __typename?: 'CardBilling';
    id: string;
    status: CardBillingStatus;
  } | null;
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
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  types?: InputMaybe<Array<TransactionType> | TransactionType>;
  statuses?: InputMaybe<Array<TransactionStatus> | TransactionStatus>;
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
        paymentMethod: PaymentMethod | null;
        recurringTransactionId: string | null;
        installmentNumber: number | null;
        totalInstallments: number | null;
        sourceAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          type: AccountType;
          institution: {
            __typename?: 'Institution';
            id: string;
            name: string;
            logoUrl: string | null;
          };
        } | null;
        destinyAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          type: AccountType;
          institution: {
            __typename?: 'Institution';
            id: string;
            name: string;
            logoUrl: string | null;
          };
        } | null;
        billingPayment: {
          __typename?: 'CardBilling';
          id: string;
          status: CardBillingStatus;
          accountCard: {
            __typename?: 'AccountCard';
            account: {
              __typename?: 'Account';
              id: string;
              name: string;
              institution: {
                __typename?: 'Institution';
                id: string;
                name: string;
                logoUrl: string | null;
              };
            };
          };
        } | null;
        cardBilling: {
          __typename?: 'CardBilling';
          id: string;
          status: CardBillingStatus;
        } | null;
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

export type TransactionsSummaryQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  accountId?: InputMaybe<Scalars['ID']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  types?: InputMaybe<Array<TransactionType> | TransactionType>;
  statuses?: InputMaybe<Array<TransactionStatus> | TransactionStatus>;
}>;

export type TransactionsSummaryQuery = {
  __typename?: 'Query';
  transactionsSummary: {
    __typename?: 'TransactionsSummaryModel';
    totalIncome: any;
    totalExpense: any;
    balance: any;
    transactionCount: number;
    realizedIncome: any;
    realizedExpense: any;
    realizedBalance: any;
    forecastIncome: any;
    forecastExpense: any;
    forecastBalance: any;
  };
};

export type TransactionsGroupedByPeriodQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['ID']['input']>;
  limitPerGroup?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  types?: InputMaybe<Array<TransactionType> | TransactionType>;
  statuses?: InputMaybe<Array<TransactionStatus> | TransactionStatus>;
}>;

export type TransactionsGroupedByPeriodQuery = {
  __typename?: 'Query';
  transactionsGroupedByPeriod: Array<{
    __typename?: 'TransactionGroupModel';
    period: TransactionPeriod;
    label: string;
    count: number;
    hasMore: boolean;
    transactions: Array<{
      __typename?: 'TransactionModel';
      id: string;
      description: string;
      amount: any;
      date: any;
      type: TransactionType;
      createdAt: any;
      updatedAt: any;
      status: TransactionStatus;
      paymentMethod: PaymentMethod | null;
      recurringTransactionId: string | null;
      installmentNumber: number | null;
      totalInstallments: number | null;
      sourceAccount: {
        __typename?: 'Account';
        id: string;
        name: string;
        type: AccountType;
        institution: {
          __typename?: 'Institution';
          id: string;
          name: string;
          logoUrl: string | null;
        };
      } | null;
      destinyAccount: {
        __typename?: 'Account';
        id: string;
        name: string;
        type: AccountType;
        institution: {
          __typename?: 'Institution';
          id: string;
          name: string;
          logoUrl: string | null;
        };
      } | null;
      billingPayment: {
        __typename?: 'CardBilling';
        id: string;
        status: CardBillingStatus;
        accountCard: {
          __typename?: 'AccountCard';
          account: {
            __typename?: 'Account';
            id: string;
            name: string;
            institution: {
              __typename?: 'Institution';
              id: string;
              name: string;
              logoUrl: string | null;
            };
          };
        };
      } | null;
      cardBilling: {
        __typename?: 'CardBilling';
        id: string;
        status: CardBillingStatus;
      } | null;
    }>;
  }>;
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentBillingAmount' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInvested' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
export const RecurringTransactionFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecurringTransactionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'RecurringTransactionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'estimatedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'monthOfYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sourceAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RecurringTransactionFragmentFragment, unknown>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accountCard' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'institution' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logoUrl' },
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
            kind: 'Field',
            name: { kind: 'Name', value: 'cardBilling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
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
              name: { kind: 'Name', value: 'CreateAccountInput' },
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
export const CloseBillingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CloseBilling' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'billingId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'closingDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'closeBilling' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'billingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'billingId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'closingDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'closingDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accountCardId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentTransactionId' },
                },
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
  CloseBillingMutation,
  CloseBillingMutationVariables
>;
export const PayBillingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PayBilling' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'billingId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'sourceAccountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'description' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payBilling' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'billingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'billingId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sourceAccountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sourceAccountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'date' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'description' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'description' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentEnabled' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentLimit' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sourceAccountId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'destinyAccountId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cardBillingId' },
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
} as unknown as DocumentNode<PayBillingMutation, PayBillingMutationVariables>;
export const UpdateAccountCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAccountCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cardId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'billingCycleDay' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'billingPaymentDay' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'defaultLimit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAccountCard' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cardId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'billingCycleDay' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'billingCycleDay' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'billingPaymentDay' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'billingPaymentDay' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'defaultLimit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'defaultLimit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastFourDigits' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingCycleDay' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billingPaymentDay' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'defaultLimit' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
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
  UpdateAccountCardMutation,
  UpdateAccountCardMutationVariables
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'types' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AccountType' },
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
                name: { kind: 'Name', value: 'types' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'types' },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentBillingAmount' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInvested' } },
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
export const AccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Account' },
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
            name: { kind: 'Name', value: 'account' },
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentBillingAmount' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInvested' } },
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
} as unknown as DocumentNode<AccountQuery, AccountQueryVariables>;
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'types' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AccountType' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'types' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'types' },
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
export const BillingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Billing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billing' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'periodStart' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'periodEnd' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paymentDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalAmount' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'usagePercentage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountCardId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountCard' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastFourDigits' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'billingCycleDay' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'billingPaymentDay',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'defaultLimit' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'accountId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paymentTransaction' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'date' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'paymentMethod' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'sourceAccountId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'destinyAccountId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cardBillingId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'userId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updatedAt' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nextBillingId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'previousBillingId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BillingQuery, BillingQueryVariables>;
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountIds' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountIds' },
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
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'investmentRegimes' },
            arguments: [
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
export const InvestmentEvolutionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InvestmentEvolution' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'period' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InvestmentEvolutionPeriod' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'investmentEvolution' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'period' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'period' },
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
                  name: { kind: 'Name', value: 'dataPoints' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'invested' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentAmount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxedAmount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'profit' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalInvested' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalCurrentAmount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalTaxedAmount' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalProfit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalProfitPercentage' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvestmentEvolutionQuery,
  InvestmentEvolutionQueryVariables
>;
export const InvestmentAccountsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InvestmentAccounts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'regime' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Regime' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'investmentAccounts' },
            arguments: [
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLogoUrl' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'investmentCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InvestmentAccountsQuery,
  InvestmentAccountsQueryVariables
>;
export const CreateRecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateRecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateRecurringTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createRecurringTransaction' },
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
  CreateRecurringTransactionMutation,
  CreateRecurringTransactionMutationVariables
>;
export const UpdateRecurringTransactionFromDateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateRecurringTransactionFromDate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'fromDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateRecurringTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRecurringTransactionFromDate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'fromDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'fromDate' },
                },
              },
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
  UpdateRecurringTransactionFromDateMutation,
  UpdateRecurringTransactionFromDateMutationVariables
>;
export const PauseRecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'PauseRecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pauseRecurringTransaction' },
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
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PauseRecurringTransactionMutation,
  PauseRecurringTransactionMutationVariables
>;
export const ResumeRecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResumeRecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resumeRecurringTransaction' },
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
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResumeRecurringTransactionMutation,
  ResumeRecurringTransactionMutationVariables
>;
export const EndRecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EndRecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateTime' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'endRecurringTransaction' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'endDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EndRecurringTransactionMutation,
  EndRecurringTransactionMutationVariables
>;
export const DeleteRecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteRecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteRecurringTransaction' },
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
  DeleteRecurringTransactionMutation,
  DeleteRecurringTransactionMutationVariables
>;
export const RecurringTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecurringTransactions' },
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
            name: {
              kind: 'Name',
              value: 'OrdenationRecurringTransactionModel',
            },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isActive' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactions' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isActive' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isActive' },
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
                                value: 'RecurringTransactionFragment',
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
      name: { kind: 'Name', value: 'RecurringTransactionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'RecurringTransactionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'estimatedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'monthOfYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sourceAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
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
} as unknown as DocumentNode<
  RecurringTransactionsQuery,
  RecurringTransactionsQueryVariables
>;
export const RecurringTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'RecurringTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransaction' },
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
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'RecurringTransactionFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RecurringTransactionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'RecurringTransactionModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'estimatedAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'monthOfYear' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sourceAccount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RecurringTransactionQuery,
  RecurringTransactionQueryVariables
>;
export const BalanceForecastDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BalanceForecast' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'period' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'BalanceForecastPeriod' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'balanceForecast' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'period' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'period' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'startDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'startDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'endDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dataPoints' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'balance' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isProjected' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'incomeAmount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expenseAmount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionCount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isIncome' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currentBalance' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projectedBalance' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceTrend' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BalanceForecastQuery,
  BalanceForecastQueryVariables
>;
export const TransactionsCalendarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TransactionsCalendar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'month' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactionsCalendar' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'year' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'year' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'month' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'month' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'days' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalIncome' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalExpense' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionCount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'monthTotalIncome' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'monthTotalExpense' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'monthBalance' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TransactionsCalendarQuery,
  TransactionsCalendarQueryVariables
>;
export const FinancialAgendaDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FinancialAgenda' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'daysAhead' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'financialAgenda' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'daysAhead' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'daysAhead' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'groups' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'status' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'date' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'daysUntilDue' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isOverdue' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalIncome' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalExpense' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pendingCount' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinancialAgendaQuery,
  FinancialAgendaQueryVariables
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
              name: { kind: 'Name', value: 'CreateTransactionInput' },
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
export const UpdateTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTransaction' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateTransactionMutation,
  UpdateTransactionMutationVariables
>;
export const ConfirmTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ConfirmTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ConfirmTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmTransaction' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmTransactionMutation,
  ConfirmTransactionMutationVariables
>;
export const CancelTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CancelTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelTransaction' },
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
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CancelTransactionMutation,
  CancelTransactionMutationVariables
>;
export const RescheduleTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RescheduleTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RescheduleTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rescheduleTransaction' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RescheduleTransactionMutation,
  RescheduleTransactionMutationVariables
>;
export const UpdateRecurringTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateRecurringTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateRecurringTransactionsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRecurringTransactions' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateRecurringTransactionsMutation,
  UpdateRecurringTransactionsMutationVariables
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cardBillingId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'types' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionType' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'statuses' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionStatus' },
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
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardBillingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cardBillingId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'startDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'startDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'endDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'types' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'types' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'statuses' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'statuses' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accountCard' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'institution' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logoUrl' },
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
            kind: 'Field',
            name: { kind: 'Name', value: 'cardBilling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
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
export const TransactionsSummaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TransactionsSummary' },
      variableDefinitions: [
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
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cardBillingId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'types' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionType' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'statuses' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionStatus' },
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
            name: { kind: 'Name', value: 'transactionsSummary' },
            arguments: [
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
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cardBillingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cardBillingId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'startDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'startDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'endDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'types' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'types' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'statuses' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'statuses' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalIncome' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalExpense' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactionCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'realizedIncome' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'realizedExpense' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'realizedBalance' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'forecastIncome' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'forecastExpense' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'forecastBalance' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TransactionsSummaryQuery,
  TransactionsSummaryQueryVariables
>;
export const TransactionsGroupedByPeriodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TransactionsGroupedByPeriod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limitPerGroup' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'startDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'endDate' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'DateTime' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'types' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionType' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'statuses' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'TransactionStatus' },
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
            name: { kind: 'Name', value: 'transactionsGroupedByPeriod' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limitPerGroup' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limitPerGroup' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'startDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'startDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'endDate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'endDate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'types' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'types' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'statuses' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'statuses' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'period' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hasMore' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TransactionFragment' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accountCard' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'account' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'institution' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logoUrl' },
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
            kind: 'Field',
            name: { kind: 'Name', value: 'cardBilling' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TransactionsGroupedByPeriodQuery,
  TransactionsGroupedByPeriodQueryVariables
>;
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
