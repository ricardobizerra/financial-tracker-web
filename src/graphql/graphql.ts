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
  destinyRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institutionLink: InstitutionLink;
  institutionLinkId: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  sourceTransactions: Maybe<Array<Transaction>>;
  updatedAt: Scalars['DateTime']['output'];
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
  destinyRecurringTransactions: Scalars['Int']['output'];
  destinyTransactions: Scalars['Int']['output'];
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
  institutionLinkId: Scalars['Int']['output'];
  isActive: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
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

export type AccountCreateNestedOneWithoutInstitutionLinkInput = {
  connect?: InputMaybe<AccountWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AccountCreateOrConnectWithoutInstitutionLinkInput>;
  create?: InputMaybe<AccountCreateWithoutInstitutionLinkInput>;
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

export type AccountCreateOrConnectWithoutDestinyRecurringTransactionsInput = {
  create: AccountCreateWithoutDestinyRecurringTransactionsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutDestinyTransactionsInput = {
  create: AccountCreateWithoutDestinyTransactionsInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateOrConnectWithoutInstitutionLinkInput = {
  create: AccountCreateWithoutInstitutionLinkInput;
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

export type AccountCreateWithoutDestinyRecurringTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutAccountInput;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCreateWithoutDestinyTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutAccountInput;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCreateWithoutInstitutionLinkInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCreateWithoutSourceRecurringTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutAccountInput;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceAccountInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountCreateWithoutSourceTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutDestinyAccountInput>;
  destinyTransactions?: InputMaybe<TransactionCreateNestedManyWithoutDestinyAccountInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<Scalars['Decimal']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutAccountInput;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceAccountInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountMaxAggregate = {
  __typename?: 'AccountMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  initialBalance: Maybe<Scalars['Decimal']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type AccountMinAggregate = {
  __typename?: 'AccountMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  initialBalance: Maybe<Scalars['Decimal']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  isActive: Maybe<Scalars['Boolean']['output']>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type AccountModel = {
  __typename?: 'AccountModel';
  _count: AccountCount;
  balance: Maybe<Scalars['Decimal']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentBillingAmount: Maybe<Scalars['Decimal']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  destinyTransactions: Maybe<Array<Transaction>>;
  id: Scalars['ID']['output'];
  initialBalance: Scalars['Decimal']['output'];
  institutionLink: InstitutionLink;
  institutionLinkId: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sourceRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  sourceTransactions: Maybe<Array<Transaction>>;
  totalInvested: Maybe<Scalars['Decimal']['output']>;
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

export type AccountSumAggregate = {
  __typename?: 'AccountSumAggregate';
  initialBalance: Maybe<Scalars['Decimal']['output']>;
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institutionLink?: InputMaybe<InstitutionLinkRelationFilter>;
  institutionLinkId?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AccountWhereUniqueInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  destinyRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  destinyTransactions?: InputMaybe<TransactionListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  initialBalance?: InputMaybe<DecimalFilter>;
  institutionLink?: InputMaybe<InstitutionLinkRelationFilter>;
  institutionLinkId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AccountWithInvestmentCount = {
  __typename?: 'AccountWithInvestmentCount';
  id: Scalars['String']['output'];
  institutionLogoUrl: Maybe<Scalars['String']['output']>;
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

export enum AuthProviderName {
  Google = 'GOOGLE',
}

export type AuthSignInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthUserProvider = {
  __typename?: 'AuthUserProvider';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  providerId: Scalars['String']['output'];
  providerName: AuthProviderName;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type AuthUserProviderCountAggregate = {
  __typename?: 'AuthUserProviderCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  providerId: Scalars['Int']['output'];
  providerName: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type AuthUserProviderCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
  providerName: AuthProviderName;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AuthUserProviderCreateManyUserInputEnvelope = {
  data: Array<AuthUserProviderCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AuthUserProviderCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AuthUserProviderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<AuthUserProviderCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<AuthUserProviderCreateWithoutUserInput>>;
  createMany?: InputMaybe<AuthUserProviderCreateManyUserInputEnvelope>;
};

export type AuthUserProviderCreateOrConnectWithoutUserInput = {
  create: AuthUserProviderCreateWithoutUserInput;
  where: AuthUserProviderWhereUniqueInput;
};

export type AuthUserProviderCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
  providerName: AuthProviderName;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AuthUserProviderListRelationFilter = {
  every?: InputMaybe<AuthUserProviderWhereInput>;
  none?: InputMaybe<AuthUserProviderWhereInput>;
  some?: InputMaybe<AuthUserProviderWhereInput>;
};

export type AuthUserProviderMaxAggregate = {
  __typename?: 'AuthUserProviderMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  providerId: Maybe<Scalars['String']['output']>;
  providerName: Maybe<AuthProviderName>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type AuthUserProviderMinAggregate = {
  __typename?: 'AuthUserProviderMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  providerId: Maybe<Scalars['String']['output']>;
  providerName: Maybe<AuthProviderName>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type AuthUserProviderProviderNameProviderIdUserIdCompoundUniqueInput = {
  providerId: Scalars['String']['input'];
  providerName: AuthProviderName;
  userId: Scalars['String']['input'];
};

export type AuthUserProviderWhereInput = {
  AND?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  NOT?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  OR?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  providerId?: InputMaybe<StringFilter>;
  providerName?: InputMaybe<EnumAuthProviderNameFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AuthUserProviderWhereUniqueInput = {
  AND?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  NOT?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  OR?: InputMaybe<Array<AuthUserProviderWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<StringFilter>;
  providerName?: InputMaybe<EnumAuthProviderNameFilter>;
  providerName_providerId_userId?: InputMaybe<AuthUserProviderProviderNameProviderIdUserIdCompoundUniqueInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
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

export type Card = {
  __typename?: 'Card';
  _count: CardCount;
  billingCycleDay: Scalars['Int']['output'];
  billingPaymentDay: Scalars['Int']['output'];
  billings: Maybe<Array<CardBilling>>;
  createdAt: Scalars['DateTime']['output'];
  defaultLimit: Scalars['Decimal']['output'];
  id: Scalars['ID']['output'];
  institutionLink: InstitutionLink;
  institutionLinkId: Scalars['String']['output'];
  lastFourDigits: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sourceRecurringTransactions: Maybe<Array<RecurringTransaction>>;
  sourceTransactions: Maybe<Array<Transaction>>;
  type: CardType;
  updatedAt: Scalars['DateTime']['output'];
};

export type CardAvgAggregate = {
  __typename?: 'CardAvgAggregate';
  billingCycleDay: Maybe<Scalars['Float']['output']>;
  billingPaymentDay: Maybe<Scalars['Float']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
};

export type CardBilling = {
  __typename?: 'CardBilling';
  _count: CardBillingCount;
  card: Card;
  cardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  installments: Maybe<Array<TransactionInstallment>>;
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

export type CardBillingAvgAggregate = {
  __typename?: 'CardBillingAvgAggregate';
  limit: Maybe<Scalars['Decimal']['output']>;
};

export type CardBillingCardIdPeriodStartCompoundUniqueInput = {
  cardId: Scalars['String']['input'];
  periodStart: Scalars['DateTime']['input'];
};

export type CardBillingCount = {
  __typename?: 'CardBillingCount';
  installments: Scalars['Int']['output'];
  statusHistory: Scalars['Int']['output'];
  transactions: Scalars['Int']['output'];
};

export type CardBillingCountAggregate = {
  __typename?: 'CardBillingCountAggregate';
  _all: Scalars['Int']['output'];
  cardId: Scalars['Int']['output'];
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

export type CardBillingCreateManyCardInput = {
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

export type CardBillingCreateManyCardInputEnvelope = {
  data: Array<CardBillingCreateManyCardInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CardBillingCreateNestedManyWithoutCardInput = {
  connect?: InputMaybe<Array<CardBillingWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CardBillingCreateOrConnectWithoutCardInput>
  >;
  create?: InputMaybe<Array<CardBillingCreateWithoutCardInput>>;
  createMany?: InputMaybe<CardBillingCreateManyCardInputEnvelope>;
};

export type CardBillingCreateNestedOneWithoutInstallmentsInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutInstallmentsInput>;
  create?: InputMaybe<CardBillingCreateWithoutInstallmentsInput>;
};

export type CardBillingCreateNestedOneWithoutPaymentTransactionInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutPaymentTransactionInput>;
  create?: InputMaybe<CardBillingCreateWithoutPaymentTransactionInput>;
};

export type CardBillingCreateNestedOneWithoutTransactionsInput = {
  connect?: InputMaybe<CardBillingWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardBillingCreateOrConnectWithoutTransactionsInput>;
  create?: InputMaybe<CardBillingCreateWithoutTransactionsInput>;
};

export type CardBillingCreateOrConnectWithoutCardInput = {
  create: CardBillingCreateWithoutCardInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutInstallmentsInput = {
  create: CardBillingCreateWithoutInstallmentsInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutPaymentTransactionInput = {
  create: CardBillingCreateWithoutPaymentTransactionInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateOrConnectWithoutTransactionsInput = {
  create: CardBillingCreateWithoutTransactionsInput;
  where: CardBillingWhereUniqueInput;
};

export type CardBillingCreateWithoutCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutCardBillingInput>;
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

export type CardBillingCreateWithoutInstallmentsInput = {
  card: CardCreateNestedOneWithoutBillingsInput;
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
  card: CardCreateNestedOneWithoutBillingsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutCardBillingInput>;
  limit: Scalars['Decimal']['input'];
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart: Scalars['DateTime']['input'];
  status: CardBillingStatus;
  statusHistory?: InputMaybe<CardBillingHistoryCreateNestedManyWithoutCardBillingInput>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutCardBillingInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardBillingCreateWithoutTransactionsInput = {
  card: CardCreateNestedOneWithoutBillingsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutCardBillingInput>;
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
  id: Scalars['ID']['output'];
  status: CardBillingStatus;
};

export type CardBillingHistoryCountAggregate = {
  __typename?: 'CardBillingHistoryCountAggregate';
  _all: Scalars['Int']['output'];
  cardBillingId: Scalars['Int']['output'];
  changedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
};

export type CardBillingHistoryCreateManyCardBillingInput = {
  changedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  status: CardBillingStatus;
};

export type CardBillingHistoryCreateManyCardBillingInputEnvelope = {
  data: Array<CardBillingHistoryCreateManyCardBillingInput>;
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

export type CardBillingHistoryCreateOrConnectWithoutCardBillingInput = {
  create: CardBillingHistoryCreateWithoutCardBillingInput;
  where: CardBillingHistoryWhereUniqueInput;
};

export type CardBillingHistoryCreateWithoutCardBillingInput = {
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
  id: Maybe<Scalars['String']['output']>;
  status: Maybe<CardBillingStatus>;
};

export type CardBillingHistoryMinAggregate = {
  __typename?: 'CardBillingHistoryMinAggregate';
  cardBillingId: Maybe<Scalars['String']['output']>;
  changedAt: Maybe<Scalars['DateTime']['output']>;
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
  cardId: Maybe<Scalars['String']['output']>;
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
  cardId: Maybe<Scalars['String']['output']>;
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
  card: Card;
  cardId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  installments: Maybe<Array<TransactionInstallment>>;
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
  transactionsCount: Scalars['Float']['output'];
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
  card?: InputMaybe<CardRelationFilter>;
  cardId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  installments?: InputMaybe<TransactionInstallmentListRelationFilter>;
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
  card?: InputMaybe<CardRelationFilter>;
  cardId?: InputMaybe<StringFilter>;
  cardId_periodStart?: InputMaybe<CardBillingCardIdPeriodStartCompoundUniqueInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentListRelationFilter>;
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

export type CardCount = {
  __typename?: 'CardCount';
  billings: Scalars['Int']['output'];
  sourceRecurringTransactions: Scalars['Int']['output'];
  sourceTransactions: Scalars['Int']['output'];
};

export type CardCountAggregate = {
  __typename?: 'CardCountAggregate';
  _all: Scalars['Int']['output'];
  billingCycleDay: Scalars['Int']['output'];
  billingPaymentDay: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  defaultLimit: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  institutionLinkId: Scalars['Int']['output'];
  lastFourDigits: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type CardCreateManyInstitutionLinkInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardCreateManyInstitutionLinkInputEnvelope = {
  data: Array<CardCreateManyInstitutionLinkInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CardCreateNestedManyWithoutInstitutionLinkInput = {
  connect?: InputMaybe<Array<CardWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CardCreateOrConnectWithoutInstitutionLinkInput>
  >;
  create?: InputMaybe<Array<CardCreateWithoutInstitutionLinkInput>>;
  createMany?: InputMaybe<CardCreateManyInstitutionLinkInputEnvelope>;
};

export type CardCreateNestedOneWithoutBillingsInput = {
  connect?: InputMaybe<CardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardCreateOrConnectWithoutBillingsInput>;
  create?: InputMaybe<CardCreateWithoutBillingsInput>;
};

export type CardCreateNestedOneWithoutSourceRecurringTransactionsInput = {
  connect?: InputMaybe<CardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardCreateOrConnectWithoutSourceRecurringTransactionsInput>;
  create?: InputMaybe<CardCreateWithoutSourceRecurringTransactionsInput>;
};

export type CardCreateNestedOneWithoutSourceTransactionsInput = {
  connect?: InputMaybe<CardWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CardCreateOrConnectWithoutSourceTransactionsInput>;
  create?: InputMaybe<CardCreateWithoutSourceTransactionsInput>;
};

export type CardCreateOrConnectWithoutBillingsInput = {
  create: CardCreateWithoutBillingsInput;
  where: CardWhereUniqueInput;
};

export type CardCreateOrConnectWithoutInstitutionLinkInput = {
  create: CardCreateWithoutInstitutionLinkInput;
  where: CardWhereUniqueInput;
};

export type CardCreateOrConnectWithoutSourceRecurringTransactionsInput = {
  create: CardCreateWithoutSourceRecurringTransactionsInput;
  where: CardWhereUniqueInput;
};

export type CardCreateOrConnectWithoutSourceTransactionsInput = {
  create: CardCreateWithoutSourceTransactionsInput;
  where: CardWhereUniqueInput;
};

export type CardCreateWithoutBillingsInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutCardsInput;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceCardInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceCardInput>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardCreateWithoutInstitutionLinkInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  billings?: InputMaybe<CardBillingCreateNestedManyWithoutCardInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceCardInput>;
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceCardInput>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardCreateWithoutSourceRecurringTransactionsInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  billings?: InputMaybe<CardBillingCreateNestedManyWithoutCardInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutCardsInput;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  sourceTransactions?: InputMaybe<TransactionCreateNestedManyWithoutSourceCardInput>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardCreateWithoutSourceTransactionsInput = {
  billingCycleDay: Scalars['Int']['input'];
  billingPaymentDay: Scalars['Int']['input'];
  billings?: InputMaybe<CardBillingCreateNestedManyWithoutCardInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  defaultLimit: Scalars['Decimal']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLink: InstitutionLinkCreateNestedOneWithoutCardsInput;
  lastFourDigits?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutSourceCardInput>;
  type: CardType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CardListRelationFilter = {
  every?: InputMaybe<CardWhereInput>;
  none?: InputMaybe<CardWhereInput>;
  some?: InputMaybe<CardWhereInput>;
};

export type CardMaxAggregate = {
  __typename?: 'CardMaxAggregate';
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  lastFourDigits: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<CardType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type CardMinAggregate = {
  __typename?: 'CardMinAggregate';
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  lastFourDigits: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  type: Maybe<CardType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type CardNullableRelationFilter = {
  is?: InputMaybe<CardWhereInput>;
  isNot?: InputMaybe<CardWhereInput>;
};

export type CardRelationFilter = {
  is?: InputMaybe<CardWhereInput>;
  isNot?: InputMaybe<CardWhereInput>;
};

export type CardSumAggregate = {
  __typename?: 'CardSumAggregate';
  billingCycleDay: Maybe<Scalars['Int']['output']>;
  billingPaymentDay: Maybe<Scalars['Int']['output']>;
  defaultLimit: Maybe<Scalars['Decimal']['output']>;
};

export enum CardType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

export type CardWhereInput = {
  AND?: InputMaybe<Array<CardWhereInput>>;
  NOT?: InputMaybe<Array<CardWhereInput>>;
  OR?: InputMaybe<Array<CardWhereInput>>;
  billingCycleDay?: InputMaybe<IntFilter>;
  billingPaymentDay?: InputMaybe<IntFilter>;
  billings?: InputMaybe<CardBillingListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultLimit?: InputMaybe<DecimalFilter>;
  id?: InputMaybe<StringFilter>;
  institutionLink?: InputMaybe<InstitutionLinkRelationFilter>;
  institutionLinkId?: InputMaybe<StringFilter>;
  lastFourDigits?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumCardTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CardWhereUniqueInput = {
  AND?: InputMaybe<Array<CardWhereInput>>;
  NOT?: InputMaybe<Array<CardWhereInput>>;
  OR?: InputMaybe<Array<CardWhereInput>>;
  billingCycleDay?: InputMaybe<IntFilter>;
  billingPaymentDay?: InputMaybe<IntFilter>;
  billings?: InputMaybe<CardBillingListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultLimit?: InputMaybe<DecimalFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLink?: InputMaybe<InstitutionLinkRelationFilter>;
  institutionLinkId?: InputMaybe<StringFilter>;
  lastFourDigits?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  sourceRecurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  sourceTransactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumCardTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategorySuggestion = {
  __typename?: 'CategorySuggestion';
  category: TransactionCategory;
  confidence: Scalars['Float']['output'];
  reasoning: Maybe<Scalars['String']['output']>;
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  message: Scalars['String']['output'];
};

export type CreateAccountInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  initialBalance: Scalars['Decimal']['input'];
  institutionLinkId: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateCardInput = {
  billingCycleDay?: InputMaybe<Scalars['Float']['input']>;
  billingPaymentDay?: InputMaybe<Scalars['Float']['input']>;
  defaultLimit?: InputMaybe<Scalars['Decimal']['input']>;
  institutionLinkId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: CardType;
};

export type CreateInstallmentTransactionInput = {
  /** Descrição da transação */
  description: Scalars['String']['input'];
  /** ID da conta cartão de crédito */
  sourceCardId: Scalars['ID']['input'];
  /** Data da primeira parcela */
  startDate: Scalars['DateTime']['input'];
  /** Valor total da compra */
  totalAmount: Scalars['Decimal']['input'];
  /** Número de parcelas */
  totalInstallments: Scalars['Int']['input'];
};

export type CreateInvestmentInput = {
  amount: Scalars['Float']['input'];
  correctedAmount?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinkId: Scalars['ID']['input'];
  lastCorrectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  regimeName: Regime;
  regimePercentage?: InputMaybe<Scalars['Float']['input']>;
  startDate: Scalars['DateTime']['input'];
  status?: InputMaybe<InvestmentStatus>;
  taxedAmount?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateRecurringTransactionInput = {
  category?: InputMaybe<TransactionCategory>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  estimatedAmount: Scalars['Float']['input'];
  frequency: RecurrenceFrequency;
  monthOfYear?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurrenceType?: InputMaybe<RecurrenceType>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
  sourceCardId?: InputMaybe<Scalars['ID']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateTransactionInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['ID']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  /** Se true e a data for hoje, marca como COMPLETED. Se false ou não informado, usa PLANNED para hoje. */
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccountId?: InputMaybe<Scalars['ID']['input']>;
  sourceCardId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TransactionStatus>;
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

export enum DayMode {
  FirstBusinessDay = 'FIRST_BUSINESS_DAY',
  LastBusinessDay = 'LAST_BUSINESS_DAY',
  LastDay = 'LAST_DAY',
  NthWeekday = 'NTH_WEEKDAY',
  SpecificDay = 'SPECIFIC_DAY',
}

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

export type EnumAuthProviderNameFilter = {
  equals?: InputMaybe<AuthProviderName>;
  in?: InputMaybe<Array<AuthProviderName>>;
  not?: InputMaybe<NestedEnumAuthProviderNameFilter>;
  notIn?: InputMaybe<Array<AuthProviderName>>;
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

export type EnumDayModeFilter = {
  equals?: InputMaybe<DayMode>;
  in?: InputMaybe<Array<DayMode>>;
  not?: InputMaybe<NestedEnumDayModeFilter>;
  notIn?: InputMaybe<Array<DayMode>>;
};

export type EnumInstitutionTypeNullableListFilter = {
  equals?: InputMaybe<Array<InstitutionType>>;
  has?: InputMaybe<InstitutionType>;
  hasEvery?: InputMaybe<Array<InstitutionType>>;
  hasSome?: InputMaybe<Array<InstitutionType>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
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

export type EnumTransactionCategoryNullableFilter = {
  equals?: InputMaybe<TransactionCategory>;
  in?: InputMaybe<Array<TransactionCategory>>;
  not?: InputMaybe<NestedEnumTransactionCategoryNullableFilter>;
  notIn?: InputMaybe<Array<TransactionCategory>>;
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
  code: Scalars['String']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institutionLinks: Maybe<Array<InstitutionLink>>;
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  types: Maybe<Array<InstitutionType>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type InstitutionConnection = {
  __typename?: 'InstitutionConnection';
  edges: Maybe<Array<InstitutionModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InstitutionCount = {
  __typename?: 'InstitutionCount';
  institutionLinks: Scalars['Int']['output'];
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

export type InstitutionCreateNestedOneWithoutInstitutionLinksInput = {
  connect?: InputMaybe<InstitutionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<InstitutionCreateOrConnectWithoutInstitutionLinksInput>;
  create?: InputMaybe<InstitutionCreateWithoutInstitutionLinksInput>;
};

export type InstitutionCreateOrConnectWithoutInstitutionLinksInput = {
  create: InstitutionCreateWithoutInstitutionLinksInput;
  where: InstitutionWhereUniqueInput;
};

export type InstitutionCreateWithoutInstitutionLinksInput = {
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
  set: Array<InstitutionType>;
};

export type InstitutionLink = {
  __typename?: 'InstitutionLink';
  _count: InstitutionLinkCount;
  account: Maybe<Account>;
  cards: Maybe<Array<Card>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investments: Maybe<Array<Investment>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type InstitutionLinkConnection = {
  __typename?: 'InstitutionLinkConnection';
  edges: Maybe<Array<InstitutionLinkModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type InstitutionLinkCount = {
  __typename?: 'InstitutionLinkCount';
  cards: Scalars['Int']['output'];
  investments: Scalars['Int']['output'];
};

export type InstitutionLinkCountAggregate = {
  __typename?: 'InstitutionLinkCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  institutionId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type InstitutionLinkCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionId: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InstitutionLinkCreateManyUserInputEnvelope = {
  data: Array<InstitutionLinkCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InstitutionLinkCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<InstitutionLinkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InstitutionLinkCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<InstitutionLinkCreateWithoutUserInput>>;
  createMany?: InputMaybe<InstitutionLinkCreateManyUserInputEnvelope>;
};

export type InstitutionLinkCreateNestedOneWithoutAccountInput = {
  connect?: InputMaybe<InstitutionLinkWhereUniqueInput>;
  connectOrCreate?: InputMaybe<InstitutionLinkCreateOrConnectWithoutAccountInput>;
  create?: InputMaybe<InstitutionLinkCreateWithoutAccountInput>;
};

export type InstitutionLinkCreateNestedOneWithoutCardsInput = {
  connect?: InputMaybe<InstitutionLinkWhereUniqueInput>;
  connectOrCreate?: InputMaybe<InstitutionLinkCreateOrConnectWithoutCardsInput>;
  create?: InputMaybe<InstitutionLinkCreateWithoutCardsInput>;
};

export type InstitutionLinkCreateOrConnectWithoutAccountInput = {
  create: InstitutionLinkCreateWithoutAccountInput;
  where: InstitutionLinkWhereUniqueInput;
};

export type InstitutionLinkCreateOrConnectWithoutCardsInput = {
  create: InstitutionLinkCreateWithoutCardsInput;
  where: InstitutionLinkWhereUniqueInput;
};

export type InstitutionLinkCreateOrConnectWithoutUserInput = {
  create: InstitutionLinkCreateWithoutUserInput;
  where: InstitutionLinkWhereUniqueInput;
};

export type InstitutionLinkCreateWithoutAccountInput = {
  cards?: InputMaybe<CardCreateNestedManyWithoutInstitutionLinkInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institution: InstitutionCreateNestedOneWithoutInstitutionLinksInput;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutInstitutionLinkInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutInstitutionLinksInput;
};

export type InstitutionLinkCreateWithoutCardsInput = {
  account?: InputMaybe<AccountCreateNestedOneWithoutInstitutionLinkInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institution: InstitutionCreateNestedOneWithoutInstitutionLinksInput;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutInstitutionLinkInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutInstitutionLinksInput;
};

export type InstitutionLinkCreateWithoutUserInput = {
  account?: InputMaybe<AccountCreateNestedOneWithoutInstitutionLinkInput>;
  cards?: InputMaybe<CardCreateNestedManyWithoutInstitutionLinkInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institution: InstitutionCreateNestedOneWithoutInstitutionLinksInput;
  investments?: InputMaybe<InvestmentCreateNestedManyWithoutInstitutionLinkInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type InstitutionLinkInstitutionIdUserIdCompoundUniqueInput = {
  institutionId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type InstitutionLinkListRelationFilter = {
  every?: InputMaybe<InstitutionLinkWhereInput>;
  none?: InputMaybe<InstitutionLinkWhereInput>;
  some?: InputMaybe<InstitutionLinkWhereInput>;
};

export type InstitutionLinkMaxAggregate = {
  __typename?: 'InstitutionLinkMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InstitutionLinkMinAggregate = {
  __typename?: 'InstitutionLinkMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type InstitutionLinkModel = {
  __typename?: 'InstitutionLinkModel';
  _count: InstitutionLinkCount;
  account: Maybe<Account>;
  cards: Maybe<Array<Card>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  institutionId: Scalars['String']['output'];
  investments: Maybe<Array<Investment>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type InstitutionLinkModelEdge = {
  __typename?: 'InstitutionLinkModelEdge';
  cursor: Scalars['String']['output'];
  node: InstitutionLinkModel;
};

export type InstitutionLinkNullableRelationFilter = {
  is?: InputMaybe<InstitutionLinkWhereInput>;
  isNot?: InputMaybe<InstitutionLinkWhereInput>;
};

export type InstitutionLinkRelationFilter = {
  is?: InputMaybe<InstitutionLinkWhereInput>;
  isNot?: InputMaybe<InstitutionLinkWhereInput>;
};

export type InstitutionLinkWhereInput = {
  AND?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  OR?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  account?: InputMaybe<AccountNullableRelationFilter>;
  cards?: InputMaybe<CardListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type InstitutionLinkWhereUniqueInput = {
  AND?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  OR?: InputMaybe<Array<InstitutionLinkWhereInput>>;
  account?: InputMaybe<AccountNullableRelationFilter>;
  cards?: InputMaybe<CardListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  institution?: InputMaybe<InstitutionRelationFilter>;
  institutionId?: InputMaybe<StringFilter>;
  institutionId_userId?: InputMaybe<InstitutionLinkInstitutionIdUserIdCompoundUniqueInput>;
  investments?: InputMaybe<InvestmentListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
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
  code: Scalars['String']['output'];
  color: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  institutionLinks: Maybe<Array<InstitutionLink>>;
  logoUrl: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  types: Maybe<Array<InstitutionType>>;
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

export enum InstitutionType {
  Card = 'CARD',
  Checking = 'CHECKING',
  Investment = 'INVESTMENT',
}

export type InstitutionWhereInput = {
  AND?: InputMaybe<Array<InstitutionWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionWhereInput>>;
  OR?: InputMaybe<Array<InstitutionWhereInput>>;
  code?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  institutionLinks?: InputMaybe<InstitutionLinkListRelationFilter>;
  logoUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  types?: InputMaybe<EnumInstitutionTypeNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InstitutionWhereUniqueInput = {
  AND?: InputMaybe<Array<InstitutionWhereInput>>;
  NOT?: InputMaybe<Array<InstitutionWhereInput>>;
  OR?: InputMaybe<Array<InstitutionWhereInput>>;
  code?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinks?: InputMaybe<InstitutionLinkListRelationFilter>;
  logoUrl?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  types?: InputMaybe<EnumInstitutionTypeNullableListFilter>;
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
  amount: Scalars['Float']['output'];
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  institutionLink: Maybe<InstitutionLink>;
  institutionLinkId: Scalars['String']['output'];
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Regime;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: InvestmentStatus;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  transactions: Maybe<Array<InvestmentTransaction>>;
  updatedAt: Scalars['DateTime']['output'];
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
  amount: Scalars['Int']['output'];
  correctedAmount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  finishedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  institutionLinkId: Scalars['Int']['output'];
  lastCorrectedAt: Scalars['Int']['output'];
  regimeName: Scalars['Int']['output'];
  regimePercentage: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  taxedAmount: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type InvestmentCreateManyInstitutionLinkInput = {
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

export type InvestmentCreateManyInstitutionLinkInputEnvelope = {
  data: Array<InvestmentCreateManyInstitutionLinkInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InvestmentCreateNestedManyWithoutInstitutionLinkInput = {
  connect?: InputMaybe<Array<InvestmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentCreateOrConnectWithoutInstitutionLinkInput>
  >;
  create?: InputMaybe<Array<InvestmentCreateWithoutInstitutionLinkInput>>;
  createMany?: InputMaybe<InvestmentCreateManyInstitutionLinkInputEnvelope>;
};

export type InvestmentCreateOrConnectWithoutInstitutionLinkInput = {
  create: InvestmentCreateWithoutInstitutionLinkInput;
  where: InvestmentWhereUniqueInput;
};

export type InvestmentCreateWithoutInstitutionLinkInput = {
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
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<InvestmentStatus>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InvestmentMinAggregate = {
  __typename?: 'InvestmentMinAggregate';
  amount: Maybe<Scalars['Float']['output']>;
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  institutionLinkId: Maybe<Scalars['String']['output']>;
  lastCorrectedAt: Maybe<Scalars['DateTime']['output']>;
  regimeName: Maybe<Regime>;
  regimePercentage: Maybe<Scalars['Float']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: Maybe<InvestmentStatus>;
  taxedAmount: Maybe<Scalars['Float']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InvestmentModel = {
  __typename?: 'InvestmentModel';
  amount: Scalars['Float']['output'];
  correctedAmount: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentVariation: Scalars['String']['output'];
  duration: Maybe<Scalars['Int']['output']>;
  finishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  institutionLink: Maybe<InstitutionLink>;
  institutionLinkId: Scalars['String']['output'];
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
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  investmentId: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type InvestmentTransactionCreateManyInvestmentInput = {
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

export type InvestmentTransactionCreateNestedManyWithoutInvestmentInput = {
  connect?: InputMaybe<Array<InvestmentTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<InvestmentTransactionCreateOrConnectWithoutInvestmentInput>
  >;
  create?: InputMaybe<Array<InvestmentTransactionCreateWithoutInvestmentInput>>;
  createMany?: InputMaybe<InvestmentTransactionCreateManyInvestmentInputEnvelope>;
};

export type InvestmentTransactionCreateOrConnectWithoutInvestmentInput = {
  create: InvestmentTransactionCreateWithoutInvestmentInput;
  where: InvestmentTransactionWhereUniqueInput;
};

export type InvestmentTransactionCreateWithoutInvestmentInput = {
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
  amount: Maybe<Scalars['Decimal']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  investmentId: Maybe<Scalars['String']['output']>;
  role: Maybe<InvestmentTransactionRole>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type InvestmentTransactionMinAggregate = {
  __typename?: 'InvestmentTransactionMinAggregate';
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
  amount?: InputMaybe<FloatFilter>;
  correctedAmount?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  institutionLink?: InputMaybe<InstitutionLinkNullableRelationFilter>;
  institutionLinkId?: InputMaybe<StringFilter>;
  lastCorrectedAt?: InputMaybe<DateTimeNullableFilter>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumInvestmentStatusFilter>;
  taxedAmount?: InputMaybe<FloatNullableFilter>;
  transactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InvestmentWhereUniqueInput = {
  AND?: InputMaybe<Array<InvestmentWhereInput>>;
  NOT?: InputMaybe<Array<InvestmentWhereInput>>;
  OR?: InputMaybe<Array<InvestmentWhereInput>>;
  amount?: InputMaybe<FloatFilter>;
  correctedAmount?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLink?: InputMaybe<InstitutionLinkNullableRelationFilter>;
  institutionLinkId?: InputMaybe<StringFilter>;
  lastCorrectedAt?: InputMaybe<DateTimeNullableFilter>;
  regimeName?: InputMaybe<EnumRegimeFilter>;
  regimePercentage?: InputMaybe<FloatNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumInvestmentStatusFilter>;
  taxedAmount?: InputMaybe<FloatNullableFilter>;
  transactions?: InputMaybe<InvestmentTransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authSignIn: SignIn;
  authSignOut: Scalars['Boolean']['output'];
  cancelTransaction: TransactionModel;
  chat: ChatResponse;
  closeBilling: CardBilling;
  createAccount: AccountModel;
  createCard: Card;
  createInstallmentTransaction: TransactionModel;
  createInvestment: Investment;
  createRecurringTransaction: RecurringTransactionModel;
  createTransaction: TransactionModel;
  createUser: SignIn;
  deleteInvestment: Scalars['ID']['output'];
  deleteRecurringTransaction: RecurringTransactionModel;
  endRecurringTransaction: RecurringTransactionModel;
  pauseRecurringTransaction: RecurringTransactionModel;
  requestPasswordReset: Scalars['Boolean']['output'];
  rescheduleTransaction: TransactionModel;
  resetPassword: Scalars['Boolean']['output'];
  resumeRecurringTransaction: RecurringTransactionModel;
  updateAccountCard: Card;
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

export type MutationChatArgs = {
  message: Scalars['String']['input'];
};

export type MutationCloseBillingArgs = {
  billingId: Scalars['String']['input'];
  closingDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MutationCreateAccountArgs = {
  data: CreateAccountInput;
};

export type MutationCreateCardArgs = {
  data: CreateCardInput;
};

export type MutationCreateInstallmentTransactionArgs = {
  data: CreateInstallmentTransactionInput;
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

export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};

export type MutationRescheduleTransactionArgs = {
  data: RescheduleTransactionInput;
};

export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
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

export type NestedEnumAuthProviderNameFilter = {
  equals?: InputMaybe<AuthProviderName>;
  in?: InputMaybe<Array<AuthProviderName>>;
  not?: InputMaybe<NestedEnumAuthProviderNameFilter>;
  notIn?: InputMaybe<Array<AuthProviderName>>;
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

export type NestedEnumDayModeFilter = {
  equals?: InputMaybe<DayMode>;
  in?: InputMaybe<Array<DayMode>>;
  not?: InputMaybe<NestedEnumDayModeFilter>;
  notIn?: InputMaybe<Array<DayMode>>;
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

export type NestedEnumTransactionCategoryNullableFilter = {
  equals?: InputMaybe<TransactionCategory>;
  in?: InputMaybe<Array<TransactionCategory>>;
  not?: InputMaybe<NestedEnumTransactionCategoryNullableFilter>;
  notIn?: InputMaybe<Array<TransactionCategory>>;
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
  Balance = 'balance',
  CreatedAt = 'createdAt',
  CurrentBillingAmount = 'currentBillingAmount',
  DestinyRecurringTransactions = 'destinyRecurringTransactions',
  DestinyTransactions = 'destinyTransactions',
  InitialBalance = 'initialBalance',
  InstitutionLink = 'institutionLink',
  InstitutionLinkId = 'institutionLinkId',
  IsActive = 'isActive',
  Name = 'name',
  SourceRecurringTransactions = 'sourceRecurringTransactions',
  SourceTransactions = 'sourceTransactions',
  TotalInvested = 'totalInvested',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationInstitutionLinkModel {
  Count = '_count',
  Account = 'account',
  Cards = 'cards',
  Institution = 'institution',
  InstitutionId = 'institutionId',
  Investments = 'investments',
}

export enum OrdenationInstitutionModel {
  Code = 'code',
  Color = 'color',
  CreatedAt = 'createdAt',
  Id = 'id',
  InstitutionLinks = 'institutionLinks',
  LogoUrl = 'logoUrl',
  Name = 'name',
  Types = 'types',
  UpdatedAt = 'updatedAt',
}

export enum OrdenationInvestmentModel {
  Amount = 'amount',
  CorrectedAmount = 'correctedAmount',
  CreatedAt = 'createdAt',
  Duration = 'duration',
  FinishedAt = 'finishedAt',
  Id = 'id',
  InstitutionLink = 'institutionLink',
  InstitutionLinkId = 'institutionLinkId',
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
  DayMode = 'dayMode',
  DayOfMonth = 'dayOfMonth',
  DayOfWeek = 'dayOfWeek',
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
  SourceCard = 'sourceCard',
  SourceCardId = 'sourceCardId',
  StartDate = 'startDate',
  TotalInstallments = 'totalInstallments',
  Transactions = 'transactions',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  WeekOfMonth = 'weekOfMonth',
}

export enum OrdenationTransactionModel {
  Count = '_count',
  Amount = 'amount',
  BillingPayment = 'billingPayment',
  CanCancel = 'canCancel',
  CancelReason = 'cancelReason',
  CancelWarningMessage = 'cancelWarningMessage',
  CardBilling = 'cardBilling',
  CardBillingId = 'cardBillingId',
  Category = 'category',
  CategoryConfidence = 'categoryConfidence',
  CreatedAt = 'createdAt',
  Date = 'date',
  Description = 'description',
  DestinyAccount = 'destinyAccount',
  DestinyAccountId = 'destinyAccountId',
  InstallmentId = 'installmentId',
  InstallmentNumber = 'installmentNumber',
  InstallmentStartDate = 'installmentStartDate',
  Installments = 'installments',
  PaymentEnabled = 'paymentEnabled',
  PaymentLimit = 'paymentLimit',
  PaymentMethod = 'paymentMethod',
  RecurringTransaction = 'recurringTransaction',
  RecurringTransactionId = 'recurringTransactionId',
  SourceAccount = 'sourceAccount',
  SourceAccountId = 'sourceAccountId',
  SourceCard = 'sourceCard',
  SourceCardId = 'sourceCardId',
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
  accountCard: Maybe<Card>;
  accounts: AccountConnection;
  balanceForecast: BalanceForecastModel;
  billing: CardBillingOnDate;
  billingTransactions: Array<TransactionModel>;
  financialAgenda: FinancialAgendaModel;
  health: Scalars['String']['output'];
  institution: InstitutionModel;
  institutionLinks: InstitutionLinkConnection;
  institutions: InstitutionConnection;
  investmentAccounts: Array<AccountWithInvestmentCount>;
  investmentEvolution: InvestmentEvolutionModel;
  investmentRegimes: InvestmentRegimeSummaryConnection;
  investments: InvestmentConnection;
  recurringTransaction: Maybe<RecurringTransactionModel>;
  recurringTransactions: RecurringTransactionConnection;
  suggestCategory: CategorySuggestion;
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

export type QueryBillingTransactionsArgs = {
  billingId: Scalars['ID']['input'];
};

export type QueryFinancialAgendaArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  daysAhead?: Scalars['Int']['input'];
};

export type QueryInstitutionArgs = {
  id: Scalars['String']['input'];
};

export type QueryInstitutionLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  institutionTypes?: InputMaybe<Array<InstitutionType>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInstitutionLinkModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInstitutionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationInstitutionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<InstitutionType>>;
};

export type QueryInvestmentAccountsArgs = {
  regime: Regime;
};

export type QueryInvestmentEvolutionArgs = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  period?: InvestmentEvolutionPeriod;
};

export type QueryInvestmentRegimesArgs = {
  institutionLinkId?: InputMaybe<Scalars['String']['input']>;
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
  cardId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OrdenationRecurringTransactionModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySuggestCategoryArgs = {
  description: Scalars['String']['input'];
};

export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  cardId?: InputMaybe<Scalars['ID']['input']>;
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
  cardId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  limitPerGroup?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  statuses?: InputMaybe<Array<TransactionStatus>>;
  types?: InputMaybe<Array<TransactionType>>;
};

export type QueryTransactionsSummaryArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  cardBillingId?: InputMaybe<Scalars['ID']['input']>;
  cardId?: InputMaybe<Scalars['ID']['input']>;
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
  BiWeekly = 'BI_WEEKLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
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
  dayMode: DayMode;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  dayOfWeek: Maybe<Scalars['Int']['output']>;
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
  sourceCard: Maybe<Card>;
  sourceCardId: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  totalInstallments: Maybe<Scalars['Int']['output']>;
  transactions: Maybe<Array<Transaction>>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  weekOfMonth: Maybe<Scalars['Int']['output']>;
};

export type RecurringTransactionAvgAggregate = {
  __typename?: 'RecurringTransactionAvgAggregate';
  dayOfMonth: Maybe<Scalars['Float']['output']>;
  dayOfWeek: Maybe<Scalars['Float']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  monthOfYear: Maybe<Scalars['Float']['output']>;
  totalInstallments: Maybe<Scalars['Float']['output']>;
  weekOfMonth: Maybe<Scalars['Float']['output']>;
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
  dayMode: Scalars['Int']['output'];
  dayOfMonth: Scalars['Int']['output'];
  dayOfWeek: Scalars['Int']['output'];
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
  sourceCardId: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  totalInstallments: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  weekOfMonth: Scalars['Int']['output'];
};

export type RecurringTransactionCreateManyDestinyAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateManyDestinyAccountInputEnvelope = {
  data: Array<RecurringTransactionCreateManyDestinyAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateManySourceAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateManySourceAccountInputEnvelope = {
  data: Array<RecurringTransactionCreateManySourceAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateManySourceCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  userId: Scalars['String']['input'];
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateManySourceCardInputEnvelope = {
  data: Array<RecurringTransactionCreateManySourceCardInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecurringTransactionCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
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

export type RecurringTransactionCreateNestedManyWithoutSourceCardInput = {
  connect?: InputMaybe<Array<RecurringTransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<RecurringTransactionCreateOrConnectWithoutSourceCardInput>
  >;
  create?: InputMaybe<Array<RecurringTransactionCreateWithoutSourceCardInput>>;
  createMany?: InputMaybe<RecurringTransactionCreateManySourceCardInputEnvelope>;
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

export type RecurringTransactionCreateOrConnectWithoutSourceCardInput = {
  create: RecurringTransactionCreateWithoutSourceCardInput;
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
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateWithoutSourceAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateWithoutSourceCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateWithoutTransactionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecurringTransactionsInput;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  dayMode?: InputMaybe<DayMode>;
  dayOfMonth?: InputMaybe<Scalars['Int']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
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
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceRecurringTransactionsInput>;
  startDate: Scalars['DateTime']['input'];
  totalInstallments?: InputMaybe<Scalars['Int']['input']>;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutRecurringTransactionInput>;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  weekOfMonth?: InputMaybe<Scalars['Int']['input']>;
};

export type RecurringTransactionListRelationFilter = {
  every?: InputMaybe<RecurringTransactionWhereInput>;
  none?: InputMaybe<RecurringTransactionWhereInput>;
  some?: InputMaybe<RecurringTransactionWhereInput>;
};

export type RecurringTransactionMaxAggregate = {
  __typename?: 'RecurringTransactionMaxAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  dayMode: Maybe<DayMode>;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  dayOfWeek: Maybe<Scalars['Int']['output']>;
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
  sourceCardId: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
  weekOfMonth: Maybe<Scalars['Int']['output']>;
};

export type RecurringTransactionMinAggregate = {
  __typename?: 'RecurringTransactionMinAggregate';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  dayMode: Maybe<DayMode>;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  dayOfWeek: Maybe<Scalars['Int']['output']>;
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
  sourceCardId: Maybe<Scalars['String']['output']>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
  weekOfMonth: Maybe<Scalars['Int']['output']>;
};

export type RecurringTransactionModel = {
  __typename?: 'RecurringTransactionModel';
  _count: RecurringTransactionCount;
  createdAt: Scalars['DateTime']['output'];
  dayMode: DayMode;
  dayOfMonth: Maybe<Scalars['Int']['output']>;
  dayOfWeek: Maybe<Scalars['Int']['output']>;
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
  sourceCard: Maybe<Card>;
  sourceCardId: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  totalInstallments: Maybe<Scalars['Int']['output']>;
  transactions: Maybe<Array<Transaction>>;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  weekOfMonth: Maybe<Scalars['Int']['output']>;
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
  dayOfWeek: Maybe<Scalars['Int']['output']>;
  estimatedAmount: Maybe<Scalars['Decimal']['output']>;
  monthOfYear: Maybe<Scalars['Int']['output']>;
  totalInstallments: Maybe<Scalars['Int']['output']>;
  weekOfMonth: Maybe<Scalars['Int']['output']>;
};

export type RecurringTransactionWhereInput = {
  AND?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  NOT?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  OR?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayMode?: InputMaybe<EnumDayModeFilter>;
  dayOfMonth?: InputMaybe<IntNullableFilter>;
  dayOfWeek?: InputMaybe<IntNullableFilter>;
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
  sourceCard?: InputMaybe<CardNullableRelationFilter>;
  sourceCardId?: InputMaybe<StringNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  weekOfMonth?: InputMaybe<IntNullableFilter>;
};

export type RecurringTransactionWhereUniqueInput = {
  AND?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  NOT?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  OR?: InputMaybe<Array<RecurringTransactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dayMode?: InputMaybe<EnumDayModeFilter>;
  dayOfMonth?: InputMaybe<IntNullableFilter>;
  dayOfWeek?: InputMaybe<IntNullableFilter>;
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
  sourceCard?: InputMaybe<CardNullableRelationFilter>;
  sourceCardId?: InputMaybe<StringNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  totalInstallments?: InputMaybe<IntNullableFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  type?: InputMaybe<EnumTransactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  weekOfMonth?: InputMaybe<IntNullableFilter>;
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
  _count: TransactionCount;
  amount: Scalars['Decimal']['output'];
  billingPayment: Maybe<CardBilling>;
  cardBilling: Maybe<CardBilling>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  category: Maybe<TransactionCategory>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installments: Maybe<Array<TransactionInstallment>>;
  paymentEnabled: Scalars['Boolean']['output'];
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransaction: Maybe<RecurringTransaction>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  sourceCard: Maybe<Card>;
  sourceCardId: Maybe<Scalars['String']['output']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type TransactionAvgAggregate = {
  __typename?: 'TransactionAvgAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
};

export enum TransactionCategory {
  Education = 'EDUCATION',
  Entertainment = 'ENTERTAINMENT',
  FoodDining = 'FOOD_DINING',
  Healthcare = 'HEALTHCARE',
  Housing = 'HOUSING',
  InvestmentIncome = 'INVESTMENT_INCOME',
  Other = 'OTHER',
  Salary = 'SALARY',
  Shopping = 'SHOPPING',
  Transfer = 'TRANSFER',
  Transport = 'TRANSPORT',
  Travel = 'TRAVEL',
  Utilities = 'UTILITIES',
}

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Maybe<Array<TransactionModelEdge>>;
  pageInfo: Maybe<PageInfo>;
};

export type TransactionCount = {
  __typename?: 'TransactionCount';
  installments: Scalars['Int']['output'];
};

export type TransactionCountAggregate = {
  __typename?: 'TransactionCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  cardBillingId: Scalars['Int']['output'];
  category: Scalars['Int']['output'];
  categoryConfidence: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  date: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  destinyAccountId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  paymentEnabled: Scalars['Int']['output'];
  paymentLimit: Scalars['Int']['output'];
  paymentMethod: Scalars['Int']['output'];
  recurringTransactionId: Scalars['Int']['output'];
  sourceAccountId: Scalars['Int']['output'];
  sourceCardId: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type TransactionCreateManyCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
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
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
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
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
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
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManySourceAccountInputEnvelope = {
  data: Array<TransactionCreateManySourceAccountInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManySourceCardInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type TransactionCreateManySourceCardInputEnvelope = {
  data: Array<TransactionCreateManySourceCardInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionCreateManyUserInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccountId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransactionId?: InputMaybe<Scalars['String']['input']>;
  sourceAccountId?: InputMaybe<Scalars['String']['input']>;
  sourceCardId?: InputMaybe<Scalars['String']['input']>;
  status: TransactionStatus;
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

export type TransactionCreateNestedManyWithoutSourceCardInput = {
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionCreateOrConnectWithoutSourceCardInput>
  >;
  create?: InputMaybe<Array<TransactionCreateWithoutSourceCardInput>>;
  createMany?: InputMaybe<TransactionCreateManySourceCardInputEnvelope>;
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

export type TransactionCreateNestedOneWithoutInstallmentsInput = {
  connect?: InputMaybe<TransactionWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TransactionCreateOrConnectWithoutInstallmentsInput>;
  create?: InputMaybe<TransactionCreateWithoutInstallmentsInput>;
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

export type TransactionCreateOrConnectWithoutInstallmentsInput = {
  create: TransactionCreateWithoutInstallmentsInput;
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

export type TransactionCreateOrConnectWithoutSourceCardInput = {
  create: TransactionCreateWithoutSourceCardInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateOrConnectWithoutUserInput = {
  create: TransactionCreateWithoutUserInput;
  where: TransactionWhereUniqueInput;
};

export type TransactionCreateWithoutBillingPaymentInput = {
  amount: Scalars['Decimal']['input'];
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutDestinyAccountInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutInstallmentsInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutRecurringTransactionInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutSourceAccountInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutSourceCardInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutTransactionsInput;
};

export type TransactionCreateWithoutUserInput = {
  amount: Scalars['Decimal']['input'];
  billingPayment?: InputMaybe<CardBillingCreateNestedOneWithoutPaymentTransactionInput>;
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutTransactionsInput>;
  category?: InputMaybe<TransactionCategory>;
  categoryConfidence?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  destinyAccount?: InputMaybe<AccountCreateNestedOneWithoutDestinyTransactionsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentCreateNestedManyWithoutTransactionInput>;
  paymentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  paymentLimit?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  recurringTransaction?: InputMaybe<RecurringTransactionCreateNestedOneWithoutTransactionsInput>;
  sourceAccount?: InputMaybe<AccountCreateNestedOneWithoutSourceTransactionsInput>;
  sourceCard?: InputMaybe<CardCreateNestedOneWithoutSourceTransactionsInput>;
  status: TransactionStatus;
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

export type TransactionInstallment = {
  __typename?: 'TransactionInstallment';
  amount: Scalars['Decimal']['output'];
  cardBilling: Maybe<CardBilling>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  installmentNumber: Scalars['Int']['output'];
  transaction: Transaction;
  transactionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TransactionInstallmentAvgAggregate = {
  __typename?: 'TransactionInstallmentAvgAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  installmentNumber: Maybe<Scalars['Float']['output']>;
};

export type TransactionInstallmentCountAggregate = {
  __typename?: 'TransactionInstallmentCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  cardBillingId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  installmentNumber: Scalars['Int']['output'];
  transactionId: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type TransactionInstallmentCreateManyCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber: Scalars['Int']['input'];
  transactionId: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionInstallmentCreateManyCardBillingInputEnvelope = {
  data: Array<TransactionInstallmentCreateManyCardBillingInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionInstallmentCreateManyTransactionInput = {
  amount: Scalars['Decimal']['input'];
  cardBillingId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber: Scalars['Int']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionInstallmentCreateManyTransactionInputEnvelope = {
  data: Array<TransactionInstallmentCreateManyTransactionInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransactionInstallmentCreateNestedManyWithoutCardBillingInput = {
  connect?: InputMaybe<Array<TransactionInstallmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionInstallmentCreateOrConnectWithoutCardBillingInput>
  >;
  create?: InputMaybe<
    Array<TransactionInstallmentCreateWithoutCardBillingInput>
  >;
  createMany?: InputMaybe<TransactionInstallmentCreateManyCardBillingInputEnvelope>;
};

export type TransactionInstallmentCreateNestedManyWithoutTransactionInput = {
  connect?: InputMaybe<Array<TransactionInstallmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<TransactionInstallmentCreateOrConnectWithoutTransactionInput>
  >;
  create?: InputMaybe<
    Array<TransactionInstallmentCreateWithoutTransactionInput>
  >;
  createMany?: InputMaybe<TransactionInstallmentCreateManyTransactionInputEnvelope>;
};

export type TransactionInstallmentCreateOrConnectWithoutCardBillingInput = {
  create: TransactionInstallmentCreateWithoutCardBillingInput;
  where: TransactionInstallmentWhereUniqueInput;
};

export type TransactionInstallmentCreateOrConnectWithoutTransactionInput = {
  create: TransactionInstallmentCreateWithoutTransactionInput;
  where: TransactionInstallmentWhereUniqueInput;
};

export type TransactionInstallmentCreateWithoutCardBillingInput = {
  amount: Scalars['Decimal']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber: Scalars['Int']['input'];
  transaction: TransactionCreateNestedOneWithoutInstallmentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionInstallmentCreateWithoutTransactionInput = {
  amount: Scalars['Decimal']['input'];
  cardBilling?: InputMaybe<CardBillingCreateNestedOneWithoutInstallmentsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber: Scalars['Int']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TransactionInstallmentListRelationFilter = {
  every?: InputMaybe<TransactionInstallmentWhereInput>;
  none?: InputMaybe<TransactionInstallmentWhereInput>;
  some?: InputMaybe<TransactionInstallmentWhereInput>;
};

export type TransactionInstallmentMaxAggregate = {
  __typename?: 'TransactionInstallmentMaxAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  transactionId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type TransactionInstallmentMinAggregate = {
  __typename?: 'TransactionInstallmentMinAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  id: Maybe<Scalars['String']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  transactionId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
};

export type TransactionInstallmentSumAggregate = {
  __typename?: 'TransactionInstallmentSumAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
};

export type TransactionInstallmentWhereInput = {
  AND?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  NOT?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  OR?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  cardBilling?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBillingId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  installmentNumber?: InputMaybe<IntFilter>;
  transaction?: InputMaybe<TransactionRelationFilter>;
  transactionId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TransactionInstallmentWhereUniqueInput = {
  AND?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  NOT?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  OR?: InputMaybe<Array<TransactionInstallmentWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  cardBilling?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBillingId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  installmentNumber?: InputMaybe<IntFilter>;
  transaction?: InputMaybe<TransactionRelationFilter>;
  transactionId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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
  category: Maybe<TransactionCategory>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  paymentEnabled: Maybe<Scalars['Boolean']['output']>;
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  sourceCardId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionMinAggregate = {
  __typename?: 'TransactionMinAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  category: Maybe<TransactionCategory>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
  createdAt: Maybe<Scalars['DateTime']['output']>;
  date: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Maybe<Scalars['String']['output']>;
  paymentEnabled: Maybe<Scalars['Boolean']['output']>;
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  sourceCardId: Maybe<Scalars['String']['output']>;
  status: Maybe<TransactionStatus>;
  type: Maybe<TransactionType>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  userId: Maybe<Scalars['String']['output']>;
};

export type TransactionModel = {
  __typename?: 'TransactionModel';
  _count: TransactionCount;
  amount: Scalars['Decimal']['output'];
  billingPayment: Maybe<CardBilling>;
  canCancel: Maybe<Scalars['Boolean']['output']>;
  cancelReason: Maybe<Scalars['String']['output']>;
  cancelWarningMessage: Maybe<Scalars['String']['output']>;
  cardBilling: Maybe<CardBilling>;
  cardBillingId: Maybe<Scalars['String']['output']>;
  category: Maybe<TransactionCategory>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  destinyAccount: Maybe<Account>;
  destinyAccountId: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installmentId: Maybe<Scalars['String']['output']>;
  installmentNumber: Maybe<Scalars['Int']['output']>;
  installmentStartDate: Maybe<Scalars['DateTime']['output']>;
  installments: Maybe<Array<TransactionInstallment>>;
  paymentEnabled: Scalars['Boolean']['output'];
  paymentLimit: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: Maybe<PaymentMethod>;
  recurringTransaction: Maybe<RecurringTransaction>;
  recurringTransactionId: Maybe<Scalars['String']['output']>;
  sourceAccount: Maybe<Account>;
  sourceAccountId: Maybe<Scalars['String']['output']>;
  sourceCard: Maybe<Card>;
  sourceCardId: Maybe<Scalars['String']['output']>;
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

export type TransactionRelationFilter = {
  is?: InputMaybe<TransactionWhereInput>;
  isNot?: InputMaybe<TransactionWhereInput>;
};

export enum TransactionStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Overdue = 'OVERDUE',
  Planned = 'PLANNED',
}

export type TransactionSumAggregate = {
  __typename?: 'TransactionSumAggregate';
  amount: Maybe<Scalars['Decimal']['output']>;
  categoryConfidence: Maybe<Scalars['Float']['output']>;
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
  category?: InputMaybe<EnumTransactionCategoryNullableFilter>;
  categoryConfidence?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  installments?: InputMaybe<TransactionInstallmentListRelationFilter>;
  paymentEnabled?: InputMaybe<BoolFilter>;
  paymentLimit?: InputMaybe<DateTimeNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurringTransaction?: InputMaybe<RecurringTransactionNullableRelationFilter>;
  recurringTransactionId?: InputMaybe<StringNullableFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  sourceCard?: InputMaybe<CardNullableRelationFilter>;
  sourceCardId?: InputMaybe<StringNullableFilter>;
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
  billingPayment?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBilling?: InputMaybe<CardBillingNullableRelationFilter>;
  cardBillingId?: InputMaybe<StringNullableFilter>;
  category?: InputMaybe<EnumTransactionCategoryNullableFilter>;
  categoryConfidence?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  destinyAccount?: InputMaybe<AccountNullableRelationFilter>;
  destinyAccountId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  installments?: InputMaybe<TransactionInstallmentListRelationFilter>;
  paymentEnabled?: InputMaybe<BoolFilter>;
  paymentLimit?: InputMaybe<DateTimeNullableFilter>;
  paymentMethod?: InputMaybe<EnumPaymentMethodNullableFilter>;
  recurringTransaction?: InputMaybe<RecurringTransactionNullableRelationFilter>;
  recurringTransactionId?: InputMaybe<StringNullableFilter>;
  sourceAccount?: InputMaybe<AccountNullableRelationFilter>;
  sourceAccountId?: InputMaybe<StringNullableFilter>;
  sourceCard?: InputMaybe<CardNullableRelationFilter>;
  sourceCardId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumTransactionStatusFilter>;
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
  sourceCardId?: InputMaybe<Scalars['ID']['input']>;
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
  category?: InputMaybe<TransactionCategory>;
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
  authUserProviders: Maybe<Array<AuthUserProvider>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institutionLinks: Maybe<Array<InstitutionLink>>;
  name: Scalars['String']['output'];
  password: Maybe<Scalars['String']['output']>;
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
  authUserProviders: Scalars['Int']['output'];
  institutionLinks: Scalars['Int']['output'];
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
  authUserProviders?: InputMaybe<AuthUserProviderCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinks?: InputMaybe<InstitutionLinkCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateNestedOneWithoutInstitutionLinksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutInstitutionLinksInput>;
  create?: InputMaybe<UserCreateWithoutInstitutionLinksInput>;
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

export type UserCreateOrConnectWithoutInstitutionLinksInput = {
  create: UserCreateWithoutInstitutionLinksInput;
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

export type UserCreateWithoutInstitutionLinksInput = {
  authUserProviders?: InputMaybe<AuthUserProviderCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  recurringTransactions?: InputMaybe<RecurringTransactionCreateNestedManyWithoutUserInput>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutRecurringTransactionsInput = {
  authUserProviders?: InputMaybe<AuthUserProviderCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinks?: InputMaybe<InstitutionLinkCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  transactions?: InputMaybe<TransactionCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutTransactionsInput = {
  authUserProviders?: InputMaybe<AuthUserProviderCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinks?: InputMaybe<InstitutionLinkCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
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

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  authUserProviders?: InputMaybe<AuthUserProviderListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  institutionLinks?: InputMaybe<InstitutionLinkListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringNullableFilter>;
  recurringTransactions?: InputMaybe<RecurringTransactionListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  authUserProviders?: InputMaybe<AuthUserProviderListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  institutionLinks?: InputMaybe<InstitutionLinkListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringNullableFilter>;
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
    cardId: string;
    paymentTransactionId: string | null;
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
    __typename?: 'Card';
    id: string;
    lastFourDigits: string | null;
    billingCycleDay: number;
    billingPaymentDay: number;
    type: CardType;
    defaultLimit: any;
    institutionLinkId: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type AccountFragmentFragment = {
  __typename?: 'AccountModel';
  id: string;
  name: string;
  balance: any | null;
  description: string | null;
  isActive: boolean;
  institutionLinkId: string;
  createdAt: any;
  updatedAt: any;
  institutionLink: {
    __typename?: 'InstitutionLink';
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

export type AccountsQueryVariables = Exact<{
  orderBy?: InputMaybe<OrdenationAccountModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
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
        balance: any | null;
        description: string | null;
        isActive: boolean;
        institutionLinkId: string;
        createdAt: any;
        updatedAt: any;
        institutionLink: {
          __typename?: 'InstitutionLink';
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
    balance: any | null;
    description: string | null;
    isActive: boolean;
    institutionLinkId: string;
    createdAt: any;
    updatedAt: any;
    institutionLink: {
      __typename?: 'InstitutionLink';
      cards: Array<{ __typename?: 'Card'; id: string; type: CardType }> | null;
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
  types?: InputMaybe<Array<InstitutionType> | InstitutionType>;
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
      cardId: string;
      createdAt: any;
      updatedAt: any;
      transactionsCount: number;
      card: {
        __typename?: 'Card';
        id: string;
        lastFourDigits: string | null;
        billingCycleDay: number;
        billingPaymentDay: number;
        defaultLimit: any;
        type: CardType;
        institutionLinkId: string;
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
      transactions: Array<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
      }> | null;
    } | null;
  };
};

export type SuggestCategoryQueryVariables = Exact<{
  description: Scalars['String']['input'];
}>;

export type SuggestCategoryQuery = {
  __typename?: 'Query';
  suggestCategory: {
    __typename?: 'CategorySuggestion';
    category: TransactionCategory;
    confidence: number;
    reasoning: string | null;
  };
};

export type ChatMutationVariables = Exact<{
  message: Scalars['String']['input'];
}>;

export type ChatMutation = {
  __typename?: 'Mutation';
  chat: { __typename?: 'ChatResponse'; message: string };
};

export type AuthSignInMutationVariables = Exact<{
  data: AuthSignInInput;
}>;

export type AuthSignInMutation = {
  __typename?: 'Mutation';
  authSignIn: {
    __typename?: 'SignIn';
    user: {
      __typename?: 'UserModel';
      id: string;
      email: string;
      name: string;
    } | null;
  };
};

export type AuthSignOutMutationVariables = Exact<{ [key: string]: never }>;

export type AuthSignOutMutation = {
  __typename?: 'Mutation';
  authSignOut: boolean;
};

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'SignIn';
    user: { __typename?: 'UserModel'; id: string } | null;
  };
};

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type RequestPasswordResetMutation = {
  __typename?: 'Mutation';
  requestPasswordReset: boolean;
};

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: boolean;
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

export type TransactionsSummaryForCashFlowQueryVariables = Exact<{
  accountId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  types?: InputMaybe<Array<TransactionType> | TransactionType>;
  statuses?: InputMaybe<Array<TransactionStatus> | TransactionStatus>;
}>;

export type TransactionsSummaryForCashFlowQuery = {
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

export type PageInfoFragmentFragment = {
  __typename?: 'PageInfo';
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type InstitutionLinkFragmentFragment = {
  __typename?: 'InstitutionLinkModel';
  id: string;
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
  };
  account: {
    __typename?: 'Account';
    id: string;
    name: string;
    initialBalance: any;
    description: string | null;
    isActive: boolean;
  } | null;
  cards: Array<{
    __typename?: 'Card';
    id: string;
    name: string;
    lastFourDigits: string | null;
    billingCycleDay: number;
    billingPaymentDay: number;
    type: CardType;
    defaultLimit: any;
    billings: Array<{
      __typename?: 'CardBilling';
      id: string;
      status: CardBillingStatus;
      limit: any;
      periodStart: any;
      periodEnd: any | null;
      paymentDate: any | null;
      transactions: Array<{
        __typename?: 'Transaction';
        amount: any;
        type: TransactionType;
      }> | null;
    }> | null;
  }> | null;
  investments: Array<{
    __typename?: 'Investment';
    id: string;
    amount: number;
    startDate: any;
    duration: number | null;
    status: InvestmentStatus;
    regimeName: Regime;
    regimePercentage: number | null;
  }> | null;
};

export type InstitutionLinksQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<OrdenationInstitutionLinkModel>;
  orderDirection?: InputMaybe<OrderDirection>;
  institutionTypes?: InputMaybe<Array<InstitutionType> | InstitutionType>;
}>;

export type InstitutionLinksQuery = {
  __typename?: 'Query';
  institutionLinks: {
    __typename?: 'InstitutionLinkConnection';
    edges: Array<{
      __typename?: 'InstitutionLinkModelEdge';
      cursor: string;
      node: {
        __typename?: 'InstitutionLinkModel';
        id: string;
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
        };
        account: {
          __typename?: 'Account';
          id: string;
          name: string;
          initialBalance: any;
          description: string | null;
          isActive: boolean;
        } | null;
        cards: Array<{
          __typename?: 'Card';
          id: string;
          name: string;
          lastFourDigits: string | null;
          billingCycleDay: number;
          billingPaymentDay: number;
          type: CardType;
          defaultLimit: any;
          billings: Array<{
            __typename?: 'CardBilling';
            id: string;
            status: CardBillingStatus;
            limit: any;
            periodStart: any;
            periodEnd: any | null;
            paymentDate: any | null;
            transactions: Array<{
              __typename?: 'Transaction';
              amount: any;
              type: TransactionType;
            }> | null;
          }> | null;
        }> | null;
        investments: Array<{
          __typename?: 'Investment';
          id: string;
          amount: number;
          startDate: any;
          duration: number | null;
          status: InvestmentStatus;
          regimeName: Regime;
          regimePercentage: number | null;
        }> | null;
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
    institutionLinkId: string;
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
  institutionLinkId?: InputMaybe<Scalars['String']['input']>;
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
  dayMode: DayMode;
  dayOfMonth: number | null;
  dayOfWeek: number | null;
  weekOfMonth: number | null;
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
    institutionLink: {
      __typename?: 'InstitutionLink';
      institution: {
        __typename?: 'Institution';
        name: string;
        logoUrl: string | null;
      };
    };
  } | null;
  destinyAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    institutionLink: {
      __typename?: 'InstitutionLink';
      institution: {
        __typename?: 'Institution';
        name: string;
        logoUrl: string | null;
      };
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
        dayMode: DayMode;
        dayOfMonth: number | null;
        dayOfWeek: number | null;
        weekOfMonth: number | null;
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
          institutionLink: {
            __typename?: 'InstitutionLink';
            institution: {
              __typename?: 'Institution';
              name: string;
              logoUrl: string | null;
            };
          };
        } | null;
        destinyAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          institutionLink: {
            __typename?: 'InstitutionLink';
            institution: {
              __typename?: 'Institution';
              name: string;
              logoUrl: string | null;
            };
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
    dayMode: DayMode;
    dayOfMonth: number | null;
    dayOfWeek: number | null;
    weekOfMonth: number | null;
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
      institutionLink: {
        __typename?: 'InstitutionLink';
        institution: {
          __typename?: 'Institution';
          name: string;
          logoUrl: string | null;
        };
      };
    } | null;
    destinyAccount: {
      __typename?: 'Account';
      id: string;
      name: string;
      institutionLink: {
        __typename?: 'InstitutionLink';
        institution: {
          __typename?: 'Institution';
          name: string;
          logoUrl: string | null;
        };
      };
    } | null;
  } | null;
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

export type CreateInstallmentTransactionMutationVariables = Exact<{
  data: CreateInstallmentTransactionInput;
}>;

export type CreateInstallmentTransactionMutation = {
  __typename?: 'Mutation';
  createInstallmentTransaction: {
    __typename?: 'TransactionModel';
    id: string;
    description: string;
    amount: any;
    date: any;
    status: TransactionStatus;
  };
};

export type TransactionFragmentFragment = {
  __typename?: 'TransactionModel';
  id: string;
  description: string;
  amount: any;
  date: any;
  type: TransactionType;
  category: TransactionCategory | null;
  createdAt: any;
  updatedAt: any;
  status: TransactionStatus;
  paymentMethod: PaymentMethod | null;
  recurringTransactionId: string | null;
  canCancel: boolean | null;
  cancelReason: string | null;
  cancelWarningMessage: string | null;
  installmentStartDate: any | null;
  installmentNumber: number | null;
  totalInstallments: number | null;
  installmentId: string | null;
  sourceAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    institutionLink: {
      __typename?: 'InstitutionLink';
      institution: {
        __typename?: 'Institution';
        id: string;
        name: string;
        logoUrl: string | null;
      };
    };
  } | null;
  destinyAccount: {
    __typename?: 'Account';
    id: string;
    name: string;
    institutionLink: {
      __typename?: 'InstitutionLink';
      institution: {
        __typename?: 'Institution';
        id: string;
        name: string;
        logoUrl: string | null;
      };
    };
  } | null;
  billingPayment: {
    __typename?: 'CardBilling';
    id: string;
    status: CardBillingStatus;
    periodStart: any;
    periodEnd: any | null;
    paymentDate: any | null;
    limit: any;
    card: {
      __typename?: 'Card';
      lastFourDigits: string | null;
      institutionLink: {
        __typename?: 'InstitutionLink';
        account: { __typename?: 'Account'; id: string; name: string } | null;
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
    periodEnd: any | null;
    paymentTransaction: {
      __typename?: 'Transaction';
      description: string;
    } | null;
  } | null;
  installments: Array<{
    __typename?: 'TransactionInstallment';
    id: string;
    installmentNumber: number;
    amount: any;
  }> | null;
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
        category: TransactionCategory | null;
        createdAt: any;
        updatedAt: any;
        status: TransactionStatus;
        paymentMethod: PaymentMethod | null;
        recurringTransactionId: string | null;
        canCancel: boolean | null;
        cancelReason: string | null;
        cancelWarningMessage: string | null;
        installmentStartDate: any | null;
        installmentNumber: number | null;
        totalInstallments: number | null;
        installmentId: string | null;
        sourceAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          institutionLink: {
            __typename?: 'InstitutionLink';
            institution: {
              __typename?: 'Institution';
              id: string;
              name: string;
              logoUrl: string | null;
            };
          };
        } | null;
        destinyAccount: {
          __typename?: 'Account';
          id: string;
          name: string;
          institutionLink: {
            __typename?: 'InstitutionLink';
            institution: {
              __typename?: 'Institution';
              id: string;
              name: string;
              logoUrl: string | null;
            };
          };
        } | null;
        billingPayment: {
          __typename?: 'CardBilling';
          id: string;
          status: CardBillingStatus;
          periodStart: any;
          periodEnd: any | null;
          paymentDate: any | null;
          limit: any;
          card: {
            __typename?: 'Card';
            lastFourDigits: string | null;
            institutionLink: {
              __typename?: 'InstitutionLink';
              account: {
                __typename?: 'Account';
                id: string;
                name: string;
              } | null;
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
          periodEnd: any | null;
          paymentTransaction: {
            __typename?: 'Transaction';
            description: string;
          } | null;
        } | null;
        installments: Array<{
          __typename?: 'TransactionInstallment';
          id: string;
          installmentNumber: number;
          amount: any;
        }> | null;
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
      category: TransactionCategory | null;
      createdAt: any;
      updatedAt: any;
      status: TransactionStatus;
      paymentMethod: PaymentMethod | null;
      recurringTransactionId: string | null;
      canCancel: boolean | null;
      cancelReason: string | null;
      cancelWarningMessage: string | null;
      installmentStartDate: any | null;
      installmentNumber: number | null;
      totalInstallments: number | null;
      installmentId: string | null;
      sourceAccount: {
        __typename?: 'Account';
        id: string;
        name: string;
        institutionLink: {
          __typename?: 'InstitutionLink';
          institution: {
            __typename?: 'Institution';
            id: string;
            name: string;
            logoUrl: string | null;
          };
        };
      } | null;
      destinyAccount: {
        __typename?: 'Account';
        id: string;
        name: string;
        institutionLink: {
          __typename?: 'InstitutionLink';
          institution: {
            __typename?: 'Institution';
            id: string;
            name: string;
            logoUrl: string | null;
          };
        };
      } | null;
      billingPayment: {
        __typename?: 'CardBilling';
        id: string;
        status: CardBillingStatus;
        periodStart: any;
        periodEnd: any | null;
        paymentDate: any | null;
        limit: any;
        card: {
          __typename?: 'Card';
          lastFourDigits: string | null;
          institutionLink: {
            __typename?: 'InstitutionLink';
            account: {
              __typename?: 'Account';
              id: string;
              name: string;
            } | null;
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
        periodEnd: any | null;
        paymentTransaction: {
          __typename?: 'Transaction';
          description: string;
        } | null;
      } | null;
      installments: Array<{
        __typename?: 'TransactionInstallment';
        id: string;
        installmentNumber: number;
        amount: any;
      }> | null;
    }>;
  }>;
};

export type BillingTransactionsQueryVariables = Exact<{
  billingId: Scalars['ID']['input'];
}>;

export type BillingTransactionsQuery = {
  __typename?: 'Query';
  billingTransactions: Array<{
    __typename?: 'TransactionModel';
    id: string;
    description: string;
    amount: any;
    date: any;
    type: TransactionType;
    category: TransactionCategory | null;
    createdAt: any;
    updatedAt: any;
    status: TransactionStatus;
    paymentMethod: PaymentMethod | null;
    recurringTransactionId: string | null;
    canCancel: boolean | null;
    cancelReason: string | null;
    cancelWarningMessage: string | null;
    installmentStartDate: any | null;
    installmentNumber: number | null;
    totalInstallments: number | null;
    installmentId: string | null;
    sourceAccount: {
      __typename?: 'Account';
      id: string;
      name: string;
      institutionLink: {
        __typename?: 'InstitutionLink';
        institution: {
          __typename?: 'Institution';
          id: string;
          name: string;
          logoUrl: string | null;
        };
      };
    } | null;
    destinyAccount: {
      __typename?: 'Account';
      id: string;
      name: string;
      institutionLink: {
        __typename?: 'InstitutionLink';
        institution: {
          __typename?: 'Institution';
          id: string;
          name: string;
          logoUrl: string | null;
        };
      };
    } | null;
    billingPayment: {
      __typename?: 'CardBilling';
      id: string;
      status: CardBillingStatus;
      periodStart: any;
      periodEnd: any | null;
      paymentDate: any | null;
      limit: any;
      card: {
        __typename?: 'Card';
        lastFourDigits: string | null;
        institutionLink: {
          __typename?: 'InstitutionLink';
          account: { __typename?: 'Account'; id: string; name: string } | null;
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
      periodEnd: any | null;
      paymentTransaction: {
        __typename?: 'Transaction';
        description: string;
      } | null;
    } | null;
    installments: Array<{
      __typename?: 'TransactionInstallment';
      id: string;
      installmentNumber: number;
      amount: any;
    }> | null;
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
          { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          { kind: 'Field', name: { kind: 'Name', value: 'institutionLinkId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'institutionLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
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
export const InstitutionLinkFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InstitutionLinkFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InstitutionLinkModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'initialBalance' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cards' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
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
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
            name: { kind: 'Name', value: 'investments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'regimeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'regimePercentage' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InstitutionLinkFragmentFragment, unknown>;
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
          { kind: 'Field', name: { kind: 'Name', value: 'dayMode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weekOfMonth' } },
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'card' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastFourDigits' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institutionLink' },
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
                                ],
                              },
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
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'installmentNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canCancel' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cancelReason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelWarningMessage' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installmentStartDate' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentId' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'cardId' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLinkId' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          { kind: 'Field', name: { kind: 'Name', value: 'institutionLinkId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'institutionLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cards' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
          { kind: 'Field', name: { kind: 'Name', value: 'institutionLinkId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'institutionLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institution' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logoUrl' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
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
                name: { kind: 'Name', value: 'InstitutionType' },
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
                        name: { kind: 'Name', value: 'cardId' },
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
                        name: { kind: 'Name', value: 'card' },
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
                              name: {
                                kind: 'Name',
                                value: 'institutionLinkId',
                              },
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
                        name: { kind: 'Name', value: 'transactionsCount' },
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
export const SuggestCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SuggestCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'description' },
          },
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
            name: { kind: 'Name', value: 'suggestCategory' },
            arguments: [
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
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'confidence' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reasoning' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SuggestCategoryQuery,
  SuggestCategoryQueryVariables
>;
export const ChatDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Chat' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'message' },
          },
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
            name: { kind: 'Name', value: 'chat' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'message' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'message' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChatMutation, ChatMutationVariables>;
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
export const AuthSignOutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthSignOut' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'authSignOut' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthSignOutMutation, AuthSignOutMutationVariables>;
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
export const RequestPasswordResetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RequestPasswordReset' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
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
            name: { kind: 'Name', value: 'requestPasswordReset' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables
>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'token' },
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
            name: { kind: 'Name', value: 'newPassword' },
          },
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
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'token' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'newPassword' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'newPassword' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
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
export const TransactionsSummaryForCashFlowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TransactionsSummaryForCashFlow' },
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
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
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
  TransactionsSummaryForCashFlowQuery,
  TransactionsSummaryForCashFlowQueryVariables
>;
export const InstitutionLinksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InstitutionLinks' },
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
            name: { kind: 'Name', value: 'OrdenationInstitutionLinkModel' },
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
            name: { kind: 'Name', value: 'institutionTypes' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'InstitutionType' },
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
            name: { kind: 'Name', value: 'institutionLinks' },
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
                name: { kind: 'Name', value: 'institutionTypes' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'institutionTypes' },
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
                                value: 'InstitutionLinkFragment',
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
      name: { kind: 'Name', value: 'InstitutionLinkFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'InstitutionLinkModel' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'initialBalance' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cards' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'billings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
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
                        name: { kind: 'Name', value: 'transactions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
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
            name: { kind: 'Name', value: 'investments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'duration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'regimeName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'regimePercentage' },
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
} as unknown as DocumentNode<
  InstitutionLinksQuery,
  InstitutionLinksQueryVariables
>;
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLinkId' },
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
            name: { kind: 'Name', value: 'institutionLinkId' },
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
                name: { kind: 'Name', value: 'institutionLinkId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'institutionLinkId' },
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
          { kind: 'Field', name: { kind: 'Name', value: 'dayMode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weekOfMonth' } },
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
          { kind: 'Field', name: { kind: 'Name', value: 'dayMode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfMonth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dayOfWeek' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weekOfMonth' } },
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institution' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
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
export const CreateInstallmentTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateInstallmentTransaction' },
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
                value: 'CreateInstallmentTransactionInput',
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
            name: { kind: 'Name', value: 'createInstallmentTransaction' },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInstallmentTransactionMutation,
  CreateInstallmentTransactionMutationVariables
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
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'card' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastFourDigits' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institutionLink' },
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
                                ],
                              },
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
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'installmentNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canCancel' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cancelReason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelWarningMessage' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installmentStartDate' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentId' } },
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
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'card' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastFourDigits' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institutionLink' },
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
                                ],
                              },
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
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'installmentNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canCancel' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cancelReason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelWarningMessage' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installmentStartDate' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TransactionsGroupedByPeriodQuery,
  TransactionsGroupedByPeriodQueryVariables
>;
export const BillingTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BillingTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'billingId' },
          },
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
            name: { kind: 'Name', value: 'billingTransactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'billingId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'billingId' },
                },
              },
            ],
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
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                  name: { kind: 'Name', value: 'institutionLink' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'billingPayment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paymentDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'card' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastFourDigits' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'institutionLink' },
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
                                ],
                              },
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
                { kind: 'Field', name: { kind: 'Name', value: 'periodEnd' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'paymentMethod' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recurringTransactionId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installments' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'installmentNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'canCancel' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cancelReason' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cancelWarningMessage' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'installmentStartDate' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalInstallments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'installmentId' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BillingTransactionsQuery,
  BillingTransactionsQueryVariables
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
