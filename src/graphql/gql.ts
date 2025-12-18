/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      id\n    }\n  }\n': typeof types.CreateAccountDocument;
  '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      accountCardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CloseBillingDocument;
  '\n  mutation PayBilling(\n    $billingId: String!\n    $sourceAccountId: ID!\n    $date: DateTime\n    $description: String\n  ) {\n    payBilling(\n      billingId: $billingId\n      sourceAccountId: $sourceAccountId\n      date: $date\n      description: $description\n    ) {\n      id\n      description\n      amount\n      date\n      status\n      type\n      paymentMethod\n      paymentEnabled\n      paymentLimit\n      sourceAccountId\n      destinyAccountId\n      cardBillingId\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.PayBillingDocument;
  '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      accountId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.UpdateAccountCardDocument;
  '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    type\n    balance\n    description\n    isActive\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.AccountFragmentFragmentDoc;
  '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n    $type: AccountType\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n      type: $type\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.AccountsDocument;
  '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n    }\n  }\n': typeof types.AccountDocument;
  '\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n': typeof types.InstitutionFragmentFragmentDoc;
  '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [AccountType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InstitutionsDocument;
  '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        accountCardId\n        createdAt\n        updatedAt\n        accountCard {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          accountId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n': typeof types.BillingDocument;
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      accessToken\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n': typeof types.AuthSignInDocument;
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      accessToken\n      user {\n        id\n      }\n    }\n  }\n': typeof types.CreateUserDocument;
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n': typeof types.UserDocument;
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n': typeof types.PageInfoFragmentFragmentDoc;
  '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CreateInvestmentDocument;
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n': typeof types.DeleteInvestmentDocument;
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n': typeof types.InvestmentFragmentFragmentDoc;
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InvestmentsDocument;
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n': typeof types.TotalInvestmentsDocument;
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n': typeof types.InvestmentRegimeSummaryFragmentFragmentDoc;
  '\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n': typeof types.InvestmentRegimesDocument;
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n': typeof types.CreateTransactionDocument;
  '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n    }\n    destinyAccount {\n      id\n    }\n    status\n  }\n': typeof types.TransactionFragmentFragmentDoc;
  '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.TransactionsDocument;
  '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.UsersDocument;
};
const documents: Documents = {
  '\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      id\n    }\n  }\n':
    types.CreateAccountDocument,
  '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      accountCardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CloseBillingDocument,
  '\n  mutation PayBilling(\n    $billingId: String!\n    $sourceAccountId: ID!\n    $date: DateTime\n    $description: String\n  ) {\n    payBilling(\n      billingId: $billingId\n      sourceAccountId: $sourceAccountId\n      date: $date\n      description: $description\n    ) {\n      id\n      description\n      amount\n      date\n      status\n      type\n      paymentMethod\n      paymentEnabled\n      paymentLimit\n      sourceAccountId\n      destinyAccountId\n      cardBillingId\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.PayBillingDocument,
  '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      accountId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.UpdateAccountCardDocument,
  '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    type\n    balance\n    description\n    isActive\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.AccountFragmentFragmentDoc,
  '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n    $type: AccountType\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n      type: $type\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.AccountsDocument,
  '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n    }\n  }\n':
    types.AccountDocument,
  '\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n':
    types.InstitutionFragmentFragmentDoc,
  '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [AccountType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InstitutionsDocument,
  '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        accountCardId\n        createdAt\n        updatedAt\n        accountCard {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          accountId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n':
    types.BillingDocument,
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      accessToken\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n':
    types.AuthSignInDocument,
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      accessToken\n      user {\n        id\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n':
    types.UserDocument,
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n':
    types.PageInfoFragmentFragmentDoc,
  '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CreateInvestmentDocument,
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n':
    types.DeleteInvestmentDocument,
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n':
    types.InvestmentFragmentFragmentDoc,
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InvestmentsDocument,
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n':
    types.TotalInvestmentsDocument,
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n':
    types.InvestmentRegimeSummaryFragmentFragmentDoc,
  '\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n':
    types.InvestmentRegimesDocument,
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n':
    types.CreateTransactionDocument,
  '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n    }\n    destinyAccount {\n      id\n    }\n    status\n  }\n':
    types.TransactionFragmentFragmentDoc,
  '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.TransactionsDocument,
  '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      accountCardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      accountCardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PayBilling(\n    $billingId: String!\n    $sourceAccountId: ID!\n    $date: DateTime\n    $description: String\n  ) {\n    payBilling(\n      billingId: $billingId\n      sourceAccountId: $sourceAccountId\n      date: $date\n      description: $description\n    ) {\n      id\n      description\n      amount\n      date\n      status\n      type\n      paymentMethod\n      paymentEnabled\n      paymentLimit\n      sourceAccountId\n      destinyAccountId\n      cardBillingId\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation PayBilling(\n    $billingId: String!\n    $sourceAccountId: ID!\n    $date: DateTime\n    $description: String\n  ) {\n    payBilling(\n      billingId: $billingId\n      sourceAccountId: $sourceAccountId\n      date: $date\n      description: $description\n    ) {\n      id\n      description\n      amount\n      date\n      status\n      type\n      paymentMethod\n      paymentEnabled\n      paymentLimit\n      sourceAccountId\n      destinyAccountId\n      cardBillingId\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      accountId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      accountId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    type\n    balance\n    description\n    isActive\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    type\n    balance\n    description\n    isActive\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n    $type: AccountType\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n      type: $type\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n    $type: AccountType\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n      type: $type\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n    }\n  }\n',
): (typeof documents)['\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n',
): (typeof documents)['\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [AccountType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [AccountType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        accountCardId\n        createdAt\n        updatedAt\n        accountCard {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          accountId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n',
): (typeof documents)['\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        accountCardId\n        createdAt\n        updatedAt\n        accountCard {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          accountId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      accessToken\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      accessToken\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      accessToken\n      user {\n        id\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      accessToken\n      user {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n',
): (typeof documents)['\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n',
): (typeof documents)['\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n',
): (typeof documents)['\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n',
): (typeof documents)['\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n',
): (typeof documents)['\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n',
): (typeof documents)['\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n    }\n    destinyAccount {\n      id\n    }\n    status\n  }\n',
): (typeof documents)['\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n    }\n    destinyAccount {\n      id\n    }\n    status\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
