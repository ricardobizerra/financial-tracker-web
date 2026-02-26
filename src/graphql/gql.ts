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
  '\n  mutation CreateCard($data: CreateCardInput!) {\n    createCard(data: $data) {\n      id\n    }\n  }\n': typeof types.CreateCardDocument;
  '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      cardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CloseBillingDocument;
  '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.UpdateAccountCardDocument;
  '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    balance\n    description\n    isActive\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n    }\n  }\n': typeof types.AccountFragmentFragmentDoc;
  '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.AccountsDocument;
  '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n      institutionLink {\n        cards {\n          id\n          type\n        }\n      }\n    }\n  }\n': typeof types.AccountDocument;
  '\n  fragment CardFragment on Card {\n    id\n    name\n    lastFourDigits\n    billingCycleDay\n    billingPaymentDay\n    defaultLimit\n    type\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n      cards {\n        id\n        type\n      }\n    }\n  }\n': typeof types.CardFragmentFragmentDoc;
  '\n  query Card($id: ID!) {\n    card(id: $id) {\n      ...CardFragment\n    }\n  }\n': typeof types.CardDocument;
  '\n  query Cards(\n    $orderBy: OrdenationCard\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    cards(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...CardFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.CardsDocument;
  '\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n': typeof types.InstitutionFragmentFragmentDoc;
  '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [InstitutionType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InstitutionsDocument;
  '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        cardId\n        createdAt\n        updatedAt\n        card {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          institutionLinkId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n        transactionsCount\n        transactions {\n          id\n          status\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n': typeof types.BillingDocument;
  '\n  query SuggestCategory($description: String!) {\n    suggestCategory(description: $description) {\n      category\n      confidence\n      reasoning\n    }\n  }\n': typeof types.SuggestCategoryDocument;
  '\n  mutation Chat($message: String!) {\n    chat(message: $message) {\n      message\n    }\n  }\n': typeof types.ChatDocument;
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n': typeof types.AuthSignInDocument;
  '\n  mutation AuthSignOut {\n    authSignOut\n  }\n': typeof types.AuthSignOutDocument;
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n': typeof types.CreateUserDocument;
  '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n': typeof types.RequestPasswordResetDocument;
  '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n': typeof types.ResetPasswordDocument;
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n': typeof types.UserDocument;
  '\n  query BalanceForecast(\n    $accountId: String\n    $period: BalanceForecastPeriod!\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    balanceForecast(\n      accountId: $accountId\n      period: $period\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      dataPoints {\n        date\n        balance\n        isProjected\n        incomeAmount\n        expenseAmount\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          isIncome\n        }\n      }\n      currentBalance\n      projectedBalance\n      balanceTrend\n      startDate\n      endDate\n    }\n  }\n': typeof types.BalanceForecastDocument;
  '\n  query TransactionsSummaryForCashFlow(\n    $accountId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      accountId: $accountId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n': typeof types.TransactionsSummaryForCashFlowDocument;
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n': typeof types.PageInfoFragmentFragmentDoc;
  '\n  mutation CreateInstitutionLink($data: CreateInstitutionLinkInput!) {\n    createInstitutionLink(data: $data) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CreateInstitutionLinkDocument;
  '\n  fragment InstitutionLinkFragment on InstitutionLinkModel {\n    id\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n    }\n    account {\n      id\n      name\n      initialBalance\n      balance\n      description\n      isActive\n    }\n    cards {\n      id\n      name\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      billings {\n        id\n        status\n        limit\n        periodStart\n        periodEnd\n        paymentDate\n        transactions {\n          amount\n          type\n        }\n      }\n    }\n    investments {\n      id\n      amount\n      startDate\n      duration\n      status\n      regimeName\n      regimePercentage\n    }\n  }\n': typeof types.InstitutionLinkFragmentFragmentDoc;
  '\n  query InstitutionLinks(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionLinkModel\n    $orderDirection: OrderDirection\n    $institutionTypes: [InstitutionType!]\n  ) {\n    institutionLinks(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      institutionTypes: $institutionTypes\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionLinkFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InstitutionLinksDocument;
  '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CreateInvestmentDocument;
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n': typeof types.DeleteInvestmentDocument;
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n': typeof types.InvestmentFragmentFragmentDoc;
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n    $institutionLinkIds: [ID!]\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n      institutionLinkIds: $institutionLinkIds\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InvestmentsDocument;
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n': typeof types.TotalInvestmentsDocument;
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n': typeof types.InvestmentRegimeSummaryFragmentFragmentDoc;
  '\n  query InvestmentRegimes($institutionLinkId: String) {\n    investmentRegimes(institutionLinkId: $institutionLinkId) {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n': typeof types.InvestmentRegimesDocument;
  '\n  query InvestmentEvolution(\n    $period: InvestmentEvolutionPeriod\n    $accountId: String\n  ) {\n    investmentEvolution(period: $period, accountId: $accountId) {\n      dataPoints {\n        date\n        invested\n        currentAmount\n        taxedAmount\n        profit\n      }\n      totalInvested\n      totalCurrentAmount\n      totalTaxedAmount\n      totalProfit\n      totalProfitPercentage\n    }\n  }\n': typeof types.InvestmentEvolutionDocument;
  '\n  query InvestmentAccounts($regime: Regime!) {\n    investmentAccounts(regime: $regime) {\n      id\n      name\n      institutionLogoUrl\n      investmentCount\n    }\n  }\n': typeof types.InvestmentAccountsDocument;
  '\n  mutation CreateRecurringTransaction($data: CreateRecurringTransactionInput!) {\n    createRecurringTransaction(data: $data) {\n      id\n    }\n  }\n': typeof types.CreateRecurringTransactionDocument;
  '\n  mutation UpdateRecurringTransactionFromDate(\n    $id: String!\n    $fromDate: DateTime!\n    $data: UpdateRecurringTransactionInput!\n  ) {\n    updateRecurringTransactionFromDate(\n      id: $id\n      fromDate: $fromDate\n      data: $data\n    ) {\n      id\n    }\n  }\n': typeof types.UpdateRecurringTransactionFromDateDocument;
  '\n  mutation PauseRecurringTransaction($id: String!) {\n    pauseRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n': typeof types.PauseRecurringTransactionDocument;
  '\n  mutation ResumeRecurringTransaction($id: String!) {\n    resumeRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n': typeof types.ResumeRecurringTransactionDocument;
  '\n  mutation EndRecurringTransaction($id: String!, $endDate: DateTime!) {\n    endRecurringTransaction(id: $id, endDate: $endDate) {\n      id\n      endDate\n      isActive\n    }\n  }\n': typeof types.EndRecurringTransactionDocument;
  '\n  mutation DeleteRecurringTransaction($id: String!) {\n    deleteRecurringTransaction(id: $id) {\n      id\n    }\n  }\n': typeof types.DeleteRecurringTransactionDocument;
  '\n  fragment RecurringTransactionFragment on RecurringTransactionModel {\n    id\n    description\n    estimatedAmount\n    type\n    paymentMethod\n    frequency\n    dayMode\n    dayOfMonth\n    dayOfWeek\n    weekOfMonth\n    monthOfYear\n    startDate\n    endDate\n    isActive\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n': typeof types.RecurringTransactionFragmentFragmentDoc;
  '\n  query RecurringTransactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationRecurringTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $isActive: Boolean\n  ) {\n    recurringTransactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      isActive: $isActive\n    ) {\n      edges {\n        cursor\n        node {\n          ...RecurringTransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.RecurringTransactionsDocument;
  '\n  query RecurringTransaction($id: String!) {\n    recurringTransaction(id: $id) {\n      ...RecurringTransactionFragment\n    }\n  }\n': typeof types.RecurringTransactionDocument;
  '\n  query TransactionsCalendar($accountId: String, $year: Int!, $month: Int!) {\n    transactionsCalendar(accountId: $accountId, year: $year, month: $month) {\n      days {\n        date\n        totalIncome\n        totalExpense\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n        }\n      }\n      monthTotalIncome\n      monthTotalExpense\n      monthBalance\n    }\n  }\n': typeof types.TransactionsCalendarDocument;
  '\n  query FinancialAgenda($accountId: String, $daysAhead: Int!) {\n    financialAgenda(accountId: $accountId, daysAhead: $daysAhead) {\n      groups {\n        label\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n          date\n          daysUntilDue\n          isOverdue\n        }\n      }\n      totalIncome\n      totalExpense\n      balance\n      pendingCount\n    }\n  }\n': typeof types.FinancialAgendaDocument;
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n': typeof types.CreateTransactionDocument;
  '\n  mutation UpdateTransaction($data: UpdateTransactionInput!) {\n    updateTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n      paymentMethod\n    }\n  }\n': typeof types.UpdateTransactionDocument;
  '\n  mutation CancelTransaction($id: String!) {\n    cancelTransaction(id: $id) {\n      id\n      status\n    }\n  }\n': typeof types.CancelTransactionDocument;
  '\n  mutation RescheduleTransaction($data: RescheduleTransactionInput!) {\n    rescheduleTransaction(data: $data) {\n      id\n      date\n    }\n  }\n': typeof types.RescheduleTransactionDocument;
  '\n  mutation UpdateRecurringTransactions(\n    $data: UpdateRecurringTransactionsInput!\n  ) {\n    updateRecurringTransactions(data: $data) {\n      id\n      description\n      amount\n      paymentMethod\n    }\n  }\n': typeof types.UpdateRecurringTransactionsDocument;
  '\n  mutation CreateInstallmentTransaction(\n    $data: CreateInstallmentTransactionInput!\n  ) {\n    createInstallmentTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n    }\n  }\n': typeof types.CreateInstallmentTransactionDocument;
  '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    category\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    sourceCard {\n      id\n      name\n      type\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    billingPayment {\n      id\n      status\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      card {\n        lastFourDigits\n        institutionLink {\n          id\n          account {\n            id\n            name\n          }\n          institution {\n            id\n            name\n            logoUrl\n          }\n        }\n      }\n    }\n    cardBilling {\n      id\n      status\n      periodEnd\n      paymentTransaction {\n        description\n        sourceAccount {\n          id\n          name\n          institutionLink {\n            institution {\n              id\n              name\n              logoUrl\n            }\n          }\n        }\n      }\n    }\n    status\n    paymentMethod\n    recurringTransactionId\n    installments {\n      id\n      installmentNumber\n      amount\n    }\n    canCancel\n    cancelReason\n    cancelWarningMessage\n    installmentStartDate\n    installmentNumber\n    totalInstallments\n    installmentId\n  }\n': typeof types.TransactionFragmentFragmentDoc;
  '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.TransactionsDocument;
  '\n  query TransactionsSummary(\n    $search: String\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      search: $search\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n': typeof types.TransactionsSummaryDocument;
  '\n  query TransactionsGroupedByPeriod(\n    $accountId: ID\n    $limitPerGroup: Int\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsGroupedByPeriod(\n      accountId: $accountId\n      limitPerGroup: $limitPerGroup\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      period\n      label\n      count\n      hasMore\n      transactions {\n        ...TransactionFragment\n      }\n    }\n  }\n': typeof types.TransactionsGroupedByPeriodDocument;
  '\n  query BillingTransactions($billingId: ID!) {\n    billingTransactions(billingId: $billingId) {\n      ...TransactionFragment\n    }\n  }\n': typeof types.BillingTransactionsDocument;
  '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.UsersDocument;
};
const documents: Documents = {
  '\n  mutation CreateAccount($data: CreateAccountInput!) {\n    createAccount(data: $data) {\n      id\n    }\n  }\n':
    types.CreateAccountDocument,
  '\n  mutation CreateCard($data: CreateCardInput!) {\n    createCard(data: $data) {\n      id\n    }\n  }\n':
    types.CreateCardDocument,
  '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      cardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CloseBillingDocument,
  '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.UpdateAccountCardDocument,
  '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    balance\n    description\n    isActive\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n    }\n  }\n':
    types.AccountFragmentFragmentDoc,
  '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.AccountsDocument,
  '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n      institutionLink {\n        cards {\n          id\n          type\n        }\n      }\n    }\n  }\n':
    types.AccountDocument,
  '\n  fragment CardFragment on Card {\n    id\n    name\n    lastFourDigits\n    billingCycleDay\n    billingPaymentDay\n    defaultLimit\n    type\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n      cards {\n        id\n        type\n      }\n    }\n  }\n':
    types.CardFragmentFragmentDoc,
  '\n  query Card($id: ID!) {\n    card(id: $id) {\n      ...CardFragment\n    }\n  }\n':
    types.CardDocument,
  '\n  query Cards(\n    $orderBy: OrdenationCard\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    cards(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...CardFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.CardsDocument,
  '\n  fragment InstitutionFragment on InstitutionModel {\n    id\n    code\n    name\n    logoUrl\n    color\n    createdAt\n    updatedAt\n  }\n':
    types.InstitutionFragmentFragmentDoc,
  '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [InstitutionType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InstitutionsDocument,
  '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        cardId\n        createdAt\n        updatedAt\n        card {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          institutionLinkId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n        transactionsCount\n        transactions {\n          id\n          status\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n':
    types.BillingDocument,
  '\n  query SuggestCategory($description: String!) {\n    suggestCategory(description: $description) {\n      category\n      confidence\n      reasoning\n    }\n  }\n':
    types.SuggestCategoryDocument,
  '\n  mutation Chat($message: String!) {\n    chat(message: $message) {\n      message\n    }\n  }\n':
    types.ChatDocument,
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n':
    types.AuthSignInDocument,
  '\n  mutation AuthSignOut {\n    authSignOut\n  }\n':
    types.AuthSignOutDocument,
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n':
    types.RequestPasswordResetDocument,
  '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n':
    types.ResetPasswordDocument,
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n':
    types.UserDocument,
  '\n  query BalanceForecast(\n    $accountId: String\n    $period: BalanceForecastPeriod!\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    balanceForecast(\n      accountId: $accountId\n      period: $period\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      dataPoints {\n        date\n        balance\n        isProjected\n        incomeAmount\n        expenseAmount\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          isIncome\n        }\n      }\n      currentBalance\n      projectedBalance\n      balanceTrend\n      startDate\n      endDate\n    }\n  }\n':
    types.BalanceForecastDocument,
  '\n  query TransactionsSummaryForCashFlow(\n    $accountId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      accountId: $accountId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n':
    types.TransactionsSummaryForCashFlowDocument,
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n':
    types.PageInfoFragmentFragmentDoc,
  '\n  mutation CreateInstitutionLink($data: CreateInstitutionLinkInput!) {\n    createInstitutionLink(data: $data) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CreateInstitutionLinkDocument,
  '\n  fragment InstitutionLinkFragment on InstitutionLinkModel {\n    id\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n    }\n    account {\n      id\n      name\n      initialBalance\n      balance\n      description\n      isActive\n    }\n    cards {\n      id\n      name\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      billings {\n        id\n        status\n        limit\n        periodStart\n        periodEnd\n        paymentDate\n        transactions {\n          amount\n          type\n        }\n      }\n    }\n    investments {\n      id\n      amount\n      startDate\n      duration\n      status\n      regimeName\n      regimePercentage\n    }\n  }\n':
    types.InstitutionLinkFragmentFragmentDoc,
  '\n  query InstitutionLinks(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionLinkModel\n    $orderDirection: OrderDirection\n    $institutionTypes: [InstitutionType!]\n  ) {\n    institutionLinks(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      institutionTypes: $institutionTypes\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionLinkFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InstitutionLinksDocument,
  '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CreateInvestmentDocument,
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n':
    types.DeleteInvestmentDocument,
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n    status\n  }\n':
    types.InvestmentFragmentFragmentDoc,
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n    $institutionLinkIds: [ID!]\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n      institutionLinkIds: $institutionLinkIds\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InvestmentsDocument,
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n':
    types.TotalInvestmentsDocument,
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n':
    types.InvestmentRegimeSummaryFragmentFragmentDoc,
  '\n  query InvestmentRegimes($institutionLinkId: String) {\n    investmentRegimes(institutionLinkId: $institutionLinkId) {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n':
    types.InvestmentRegimesDocument,
  '\n  query InvestmentEvolution(\n    $period: InvestmentEvolutionPeriod\n    $accountId: String\n  ) {\n    investmentEvolution(period: $period, accountId: $accountId) {\n      dataPoints {\n        date\n        invested\n        currentAmount\n        taxedAmount\n        profit\n      }\n      totalInvested\n      totalCurrentAmount\n      totalTaxedAmount\n      totalProfit\n      totalProfitPercentage\n    }\n  }\n':
    types.InvestmentEvolutionDocument,
  '\n  query InvestmentAccounts($regime: Regime!) {\n    investmentAccounts(regime: $regime) {\n      id\n      name\n      institutionLogoUrl\n      investmentCount\n    }\n  }\n':
    types.InvestmentAccountsDocument,
  '\n  mutation CreateRecurringTransaction($data: CreateRecurringTransactionInput!) {\n    createRecurringTransaction(data: $data) {\n      id\n    }\n  }\n':
    types.CreateRecurringTransactionDocument,
  '\n  mutation UpdateRecurringTransactionFromDate(\n    $id: String!\n    $fromDate: DateTime!\n    $data: UpdateRecurringTransactionInput!\n  ) {\n    updateRecurringTransactionFromDate(\n      id: $id\n      fromDate: $fromDate\n      data: $data\n    ) {\n      id\n    }\n  }\n':
    types.UpdateRecurringTransactionFromDateDocument,
  '\n  mutation PauseRecurringTransaction($id: String!) {\n    pauseRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n':
    types.PauseRecurringTransactionDocument,
  '\n  mutation ResumeRecurringTransaction($id: String!) {\n    resumeRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n':
    types.ResumeRecurringTransactionDocument,
  '\n  mutation EndRecurringTransaction($id: String!, $endDate: DateTime!) {\n    endRecurringTransaction(id: $id, endDate: $endDate) {\n      id\n      endDate\n      isActive\n    }\n  }\n':
    types.EndRecurringTransactionDocument,
  '\n  mutation DeleteRecurringTransaction($id: String!) {\n    deleteRecurringTransaction(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteRecurringTransactionDocument,
  '\n  fragment RecurringTransactionFragment on RecurringTransactionModel {\n    id\n    description\n    estimatedAmount\n    type\n    paymentMethod\n    frequency\n    dayMode\n    dayOfMonth\n    dayOfWeek\n    weekOfMonth\n    monthOfYear\n    startDate\n    endDate\n    isActive\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n':
    types.RecurringTransactionFragmentFragmentDoc,
  '\n  query RecurringTransactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationRecurringTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $isActive: Boolean\n  ) {\n    recurringTransactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      isActive: $isActive\n    ) {\n      edges {\n        cursor\n        node {\n          ...RecurringTransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.RecurringTransactionsDocument,
  '\n  query RecurringTransaction($id: String!) {\n    recurringTransaction(id: $id) {\n      ...RecurringTransactionFragment\n    }\n  }\n':
    types.RecurringTransactionDocument,
  '\n  query TransactionsCalendar($accountId: String, $year: Int!, $month: Int!) {\n    transactionsCalendar(accountId: $accountId, year: $year, month: $month) {\n      days {\n        date\n        totalIncome\n        totalExpense\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n        }\n      }\n      monthTotalIncome\n      monthTotalExpense\n      monthBalance\n    }\n  }\n':
    types.TransactionsCalendarDocument,
  '\n  query FinancialAgenda($accountId: String, $daysAhead: Int!) {\n    financialAgenda(accountId: $accountId, daysAhead: $daysAhead) {\n      groups {\n        label\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n          date\n          daysUntilDue\n          isOverdue\n        }\n      }\n      totalIncome\n      totalExpense\n      balance\n      pendingCount\n    }\n  }\n':
    types.FinancialAgendaDocument,
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n    }\n  }\n':
    types.CreateTransactionDocument,
  '\n  mutation UpdateTransaction($data: UpdateTransactionInput!) {\n    updateTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n      paymentMethod\n    }\n  }\n':
    types.UpdateTransactionDocument,
  '\n  mutation CancelTransaction($id: String!) {\n    cancelTransaction(id: $id) {\n      id\n      status\n    }\n  }\n':
    types.CancelTransactionDocument,
  '\n  mutation RescheduleTransaction($data: RescheduleTransactionInput!) {\n    rescheduleTransaction(data: $data) {\n      id\n      date\n    }\n  }\n':
    types.RescheduleTransactionDocument,
  '\n  mutation UpdateRecurringTransactions(\n    $data: UpdateRecurringTransactionsInput!\n  ) {\n    updateRecurringTransactions(data: $data) {\n      id\n      description\n      amount\n      paymentMethod\n    }\n  }\n':
    types.UpdateRecurringTransactionsDocument,
  '\n  mutation CreateInstallmentTransaction(\n    $data: CreateInstallmentTransactionInput!\n  ) {\n    createInstallmentTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n    }\n  }\n':
    types.CreateInstallmentTransactionDocument,
  '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    category\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    sourceCard {\n      id\n      name\n      type\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    billingPayment {\n      id\n      status\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      card {\n        lastFourDigits\n        institutionLink {\n          id\n          account {\n            id\n            name\n          }\n          institution {\n            id\n            name\n            logoUrl\n          }\n        }\n      }\n    }\n    cardBilling {\n      id\n      status\n      periodEnd\n      paymentTransaction {\n        description\n        sourceAccount {\n          id\n          name\n          institutionLink {\n            institution {\n              id\n              name\n              logoUrl\n            }\n          }\n        }\n      }\n    }\n    status\n    paymentMethod\n    recurringTransactionId\n    installments {\n      id\n      installmentNumber\n      amount\n    }\n    canCancel\n    cancelReason\n    cancelWarningMessage\n    installmentStartDate\n    installmentNumber\n    totalInstallments\n    installmentId\n  }\n':
    types.TransactionFragmentFragmentDoc,
  '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.TransactionsDocument,
  '\n  query TransactionsSummary(\n    $search: String\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      search: $search\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n':
    types.TransactionsSummaryDocument,
  '\n  query TransactionsGroupedByPeriod(\n    $accountId: ID\n    $limitPerGroup: Int\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsGroupedByPeriod(\n      accountId: $accountId\n      limitPerGroup: $limitPerGroup\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      period\n      label\n      count\n      hasMore\n      transactions {\n        ...TransactionFragment\n      }\n    }\n  }\n':
    types.TransactionsGroupedByPeriodDocument,
  '\n  query BillingTransactions($billingId: ID!) {\n    billingTransactions(billingId: $billingId) {\n      ...TransactionFragment\n    }\n  }\n':
    types.BillingTransactionsDocument,
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
  source: '\n  mutation CreateCard($data: CreateCardInput!) {\n    createCard(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateCard($data: CreateCardInput!) {\n    createCard(data: $data) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      cardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CloseBilling($billingId: String!, $closingDate: DateTime) {\n    closeBilling(billingId: $billingId, closingDate: $closingDate) {\n      id\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      status\n      cardId\n      paymentTransactionId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateAccountCard(\n    $cardId: ID!\n    $billingCycleDay: Float\n    $billingPaymentDay: Float\n    $defaultLimit: Float\n  ) {\n    updateAccountCard(\n      cardId: $cardId\n      billingCycleDay: $billingCycleDay\n      billingPaymentDay: $billingPaymentDay\n      defaultLimit: $defaultLimit\n    ) {\n      id\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    balance\n    description\n    isActive\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n    }\n  }\n',
): (typeof documents)['\n  fragment AccountFragment on AccountModel {\n    id\n    name\n    balance\n    description\n    isActive\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Accounts(\n    $orderBy: OrdenationAccountModel\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    accounts(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...AccountFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n      institutionLink {\n        cards {\n          id\n          type\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Account($id: ID!) {\n    account(id: $id) {\n      ...AccountFragment\n      institutionLink {\n        cards {\n          id\n          type\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CardFragment on Card {\n    id\n    name\n    lastFourDigits\n    billingCycleDay\n    billingPaymentDay\n    defaultLimit\n    type\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n      cards {\n        id\n        type\n      }\n    }\n  }\n',
): (typeof documents)['\n  fragment CardFragment on Card {\n    id\n    name\n    lastFourDigits\n    billingCycleDay\n    billingPaymentDay\n    defaultLimit\n    type\n    institutionLinkId\n    createdAt\n    updatedAt\n    institutionLink {\n      institution {\n        id\n        code\n        name\n        logoUrl\n        color\n        createdAt\n        updatedAt\n      }\n      cards {\n        id\n        type\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Card($id: ID!) {\n    card(id: $id) {\n      ...CardFragment\n    }\n  }\n',
): (typeof documents)['\n  query Card($id: ID!) {\n    card(id: $id) {\n      ...CardFragment\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Cards(\n    $orderBy: OrdenationCard\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    cards(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...CardFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Cards(\n    $orderBy: OrdenationCard\n    $orderDirection: OrderDirection\n    $first: Int\n    $after: String\n    $search: String\n    $last: Int\n    $before: String\n  ) {\n    cards(\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      first: $first\n      after: $after\n      search: $search\n      last: $last\n      before: $before\n    ) {\n      edges {\n        cursor\n        node {\n          ...CardFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
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
  source: '\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [InstitutionType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Institutions(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionModel\n    $orderDirection: OrderDirection\n    $types: [InstitutionType!]\n  ) {\n    institutions(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      types: $types\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        cardId\n        createdAt\n        updatedAt\n        card {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          institutionLinkId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n        transactionsCount\n        transactions {\n          id\n          status\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n',
): (typeof documents)['\n  query Billing($accountId: ID!, $id: ID) {\n    billing(accountId: $accountId, id: $id) {\n      billing {\n        id\n        periodStart\n        periodEnd\n        paymentDate\n        totalAmount\n        limit\n        usagePercentage\n        status\n        cardId\n        createdAt\n        updatedAt\n        card {\n          id\n          lastFourDigits\n          billingCycleDay\n          billingPaymentDay\n          defaultLimit\n          type\n          institutionLinkId\n          createdAt\n          updatedAt\n        }\n        paymentTransaction {\n          id\n          description\n          amount\n          date\n          status\n          type\n          paymentMethod\n          sourceAccountId\n          destinyAccountId\n          cardBillingId\n          userId\n          createdAt\n          updatedAt\n        }\n        transactionsCount\n        transactions {\n          id\n          status\n        }\n      }\n      nextBillingId\n      previousBillingId\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query SuggestCategory($description: String!) {\n    suggestCategory(description: $description) {\n      category\n      confidence\n      reasoning\n    }\n  }\n',
): (typeof documents)['\n  query SuggestCategory($description: String!) {\n    suggestCategory(description: $description) {\n      category\n      confidence\n      reasoning\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Chat($message: String!) {\n    chat(message: $message) {\n      message\n    }\n  }\n',
): (typeof documents)['\n  mutation Chat($message: String!) {\n    chat(message: $message) {\n      message\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AuthSignOut {\n    authSignOut\n  }\n',
): (typeof documents)['\n  mutation AuthSignOut {\n    authSignOut\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n',
): (typeof documents)['\n  mutation RequestPasswordReset($email: String!) {\n    requestPasswordReset(email: $email)\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n',
): (typeof documents)['\n  mutation ResetPassword($token: String!, $newPassword: String!) {\n    resetPassword(token: $token, newPassword: $newPassword)\n  }\n'];
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
  source: '\n  query BalanceForecast(\n    $accountId: String\n    $period: BalanceForecastPeriod!\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    balanceForecast(\n      accountId: $accountId\n      period: $period\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      dataPoints {\n        date\n        balance\n        isProjected\n        incomeAmount\n        expenseAmount\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          isIncome\n        }\n      }\n      currentBalance\n      projectedBalance\n      balanceTrend\n      startDate\n      endDate\n    }\n  }\n',
): (typeof documents)['\n  query BalanceForecast(\n    $accountId: String\n    $period: BalanceForecastPeriod!\n    $startDate: DateTime\n    $endDate: DateTime\n  ) {\n    balanceForecast(\n      accountId: $accountId\n      period: $period\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      dataPoints {\n        date\n        balance\n        isProjected\n        incomeAmount\n        expenseAmount\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          isIncome\n        }\n      }\n      currentBalance\n      projectedBalance\n      balanceTrend\n      startDate\n      endDate\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TransactionsSummaryForCashFlow(\n    $accountId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      accountId: $accountId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n',
): (typeof documents)['\n  query TransactionsSummaryForCashFlow(\n    $accountId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      accountId: $accountId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n'];
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
  source: '\n  mutation CreateInstitutionLink($data: CreateInstitutionLinkInput!) {\n    createInstitutionLink(data: $data) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInstitutionLink($data: CreateInstitutionLinkInput!) {\n    createInstitutionLink(data: $data) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InstitutionLinkFragment on InstitutionLinkModel {\n    id\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n    }\n    account {\n      id\n      name\n      initialBalance\n      balance\n      description\n      isActive\n    }\n    cards {\n      id\n      name\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      billings {\n        id\n        status\n        limit\n        periodStart\n        periodEnd\n        paymentDate\n        transactions {\n          amount\n          type\n        }\n      }\n    }\n    investments {\n      id\n      amount\n      startDate\n      duration\n      status\n      regimeName\n      regimePercentage\n    }\n  }\n',
): (typeof documents)['\n  fragment InstitutionLinkFragment on InstitutionLinkModel {\n    id\n    institutionId\n    createdAt\n    updatedAt\n    institution {\n      id\n      code\n      name\n      logoUrl\n      color\n    }\n    account {\n      id\n      name\n      initialBalance\n      balance\n      description\n      isActive\n    }\n    cards {\n      id\n      name\n      lastFourDigits\n      billingCycleDay\n      billingPaymentDay\n      type\n      defaultLimit\n      billings {\n        id\n        status\n        limit\n        periodStart\n        periodEnd\n        paymentDate\n        transactions {\n          amount\n          type\n        }\n      }\n    }\n    investments {\n      id\n      amount\n      startDate\n      duration\n      status\n      regimeName\n      regimePercentage\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InstitutionLinks(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionLinkModel\n    $orderDirection: OrderDirection\n    $institutionTypes: [InstitutionType!]\n  ) {\n    institutionLinks(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      institutionTypes: $institutionTypes\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionLinkFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query InstitutionLinks(\n    $first: Int\n    $after: String\n    $search: String\n    $orderBy: OrdenationInstitutionLinkModel\n    $orderDirection: OrderDirection\n    $institutionTypes: [InstitutionType!]\n  ) {\n    institutionLinks(\n      first: $first\n      after: $after\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      institutionTypes: $institutionTypes\n    ) {\n      edges {\n        cursor\n        node {\n          ...InstitutionLinkFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvestment($data: CreateInvestmentInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      institutionLinkId\n      createdAt\n      updatedAt\n    }\n  }\n'];
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
  source: '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n    $institutionLinkIds: [ID!]\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n      institutionLinkIds: $institutionLinkIds\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n    $institutionLinkIds: [ID!]\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n      institutionLinkIds: $institutionLinkIds\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
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
  source: '\n  query InvestmentRegimes($institutionLinkId: String) {\n    investmentRegimes(institutionLinkId: $institutionLinkId) {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query InvestmentRegimes($institutionLinkId: String) {\n    investmentRegimes(institutionLinkId: $institutionLinkId) {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InvestmentEvolution(\n    $period: InvestmentEvolutionPeriod\n    $accountId: String\n  ) {\n    investmentEvolution(period: $period, accountId: $accountId) {\n      dataPoints {\n        date\n        invested\n        currentAmount\n        taxedAmount\n        profit\n      }\n      totalInvested\n      totalCurrentAmount\n      totalTaxedAmount\n      totalProfit\n      totalProfitPercentage\n    }\n  }\n',
): (typeof documents)['\n  query InvestmentEvolution(\n    $period: InvestmentEvolutionPeriod\n    $accountId: String\n  ) {\n    investmentEvolution(period: $period, accountId: $accountId) {\n      dataPoints {\n        date\n        invested\n        currentAmount\n        taxedAmount\n        profit\n      }\n      totalInvested\n      totalCurrentAmount\n      totalTaxedAmount\n      totalProfit\n      totalProfitPercentage\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query InvestmentAccounts($regime: Regime!) {\n    investmentAccounts(regime: $regime) {\n      id\n      name\n      institutionLogoUrl\n      investmentCount\n    }\n  }\n',
): (typeof documents)['\n  query InvestmentAccounts($regime: Regime!) {\n    investmentAccounts(regime: $regime) {\n      id\n      name\n      institutionLogoUrl\n      investmentCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateRecurringTransaction($data: CreateRecurringTransactionInput!) {\n    createRecurringTransaction(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateRecurringTransaction($data: CreateRecurringTransactionInput!) {\n    createRecurringTransaction(data: $data) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateRecurringTransactionFromDate(\n    $id: String!\n    $fromDate: DateTime!\n    $data: UpdateRecurringTransactionInput!\n  ) {\n    updateRecurringTransactionFromDate(\n      id: $id\n      fromDate: $fromDate\n      data: $data\n    ) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateRecurringTransactionFromDate(\n    $id: String!\n    $fromDate: DateTime!\n    $data: UpdateRecurringTransactionInput!\n  ) {\n    updateRecurringTransactionFromDate(\n      id: $id\n      fromDate: $fromDate\n      data: $data\n    ) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation PauseRecurringTransaction($id: String!) {\n    pauseRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n',
): (typeof documents)['\n  mutation PauseRecurringTransaction($id: String!) {\n    pauseRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResumeRecurringTransaction($id: String!) {\n    resumeRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n',
): (typeof documents)['\n  mutation ResumeRecurringTransaction($id: String!) {\n    resumeRecurringTransaction(id: $id) {\n      id\n      isActive\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation EndRecurringTransaction($id: String!, $endDate: DateTime!) {\n    endRecurringTransaction(id: $id, endDate: $endDate) {\n      id\n      endDate\n      isActive\n    }\n  }\n',
): (typeof documents)['\n  mutation EndRecurringTransaction($id: String!, $endDate: DateTime!) {\n    endRecurringTransaction(id: $id, endDate: $endDate) {\n      id\n      endDate\n      isActive\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteRecurringTransaction($id: String!) {\n    deleteRecurringTransaction(id: $id) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation DeleteRecurringTransaction($id: String!) {\n    deleteRecurringTransaction(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RecurringTransactionFragment on RecurringTransactionModel {\n    id\n    description\n    estimatedAmount\n    type\n    paymentMethod\n    frequency\n    dayMode\n    dayOfMonth\n    dayOfWeek\n    weekOfMonth\n    monthOfYear\n    startDate\n    endDate\n    isActive\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n',
): (typeof documents)['\n  fragment RecurringTransactionFragment on RecurringTransactionModel {\n    id\n    description\n    estimatedAmount\n    type\n    paymentMethod\n    frequency\n    dayMode\n    dayOfMonth\n    dayOfWeek\n    weekOfMonth\n    monthOfYear\n    startDate\n    endDate\n    isActive\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          name\n          logoUrl\n        }\n      }\n    }\n    createdAt\n    updatedAt\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RecurringTransactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationRecurringTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $isActive: Boolean\n  ) {\n    recurringTransactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      isActive: $isActive\n    ) {\n      edges {\n        cursor\n        node {\n          ...RecurringTransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query RecurringTransactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationRecurringTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $isActive: Boolean\n  ) {\n    recurringTransactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      isActive: $isActive\n    ) {\n      edges {\n        cursor\n        node {\n          ...RecurringTransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query RecurringTransaction($id: String!) {\n    recurringTransaction(id: $id) {\n      ...RecurringTransactionFragment\n    }\n  }\n',
): (typeof documents)['\n  query RecurringTransaction($id: String!) {\n    recurringTransaction(id: $id) {\n      ...RecurringTransactionFragment\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TransactionsCalendar($accountId: String, $year: Int!, $month: Int!) {\n    transactionsCalendar(accountId: $accountId, year: $year, month: $month) {\n      days {\n        date\n        totalIncome\n        totalExpense\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n        }\n      }\n      monthTotalIncome\n      monthTotalExpense\n      monthBalance\n    }\n  }\n',
): (typeof documents)['\n  query TransactionsCalendar($accountId: String, $year: Int!, $month: Int!) {\n    transactionsCalendar(accountId: $accountId, year: $year, month: $month) {\n      days {\n        date\n        totalIncome\n        totalExpense\n        transactionCount\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n        }\n      }\n      monthTotalIncome\n      monthTotalExpense\n      monthBalance\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FinancialAgenda($accountId: String, $daysAhead: Int!) {\n    financialAgenda(accountId: $accountId, daysAhead: $daysAhead) {\n      groups {\n        label\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n          date\n          daysUntilDue\n          isOverdue\n        }\n      }\n      totalIncome\n      totalExpense\n      balance\n      pendingCount\n    }\n  }\n',
): (typeof documents)['\n  query FinancialAgenda($accountId: String, $daysAhead: Int!) {\n    financialAgenda(accountId: $accountId, daysAhead: $daysAhead) {\n      groups {\n        label\n        transactions {\n          id\n          description\n          amount\n          type\n          status\n          date\n          daysUntilDue\n          isOverdue\n        }\n      }\n      totalIncome\n      totalExpense\n      balance\n      pendingCount\n    }\n  }\n'];
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
  source: '\n  mutation UpdateTransaction($data: UpdateTransactionInput!) {\n    updateTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n      paymentMethod\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateTransaction($data: UpdateTransactionInput!) {\n    updateTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n      paymentMethod\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CancelTransaction($id: String!) {\n    cancelTransaction(id: $id) {\n      id\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation CancelTransaction($id: String!) {\n    cancelTransaction(id: $id) {\n      id\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RescheduleTransaction($data: RescheduleTransactionInput!) {\n    rescheduleTransaction(data: $data) {\n      id\n      date\n    }\n  }\n',
): (typeof documents)['\n  mutation RescheduleTransaction($data: RescheduleTransactionInput!) {\n    rescheduleTransaction(data: $data) {\n      id\n      date\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateRecurringTransactions(\n    $data: UpdateRecurringTransactionsInput!\n  ) {\n    updateRecurringTransactions(data: $data) {\n      id\n      description\n      amount\n      paymentMethod\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateRecurringTransactions(\n    $data: UpdateRecurringTransactionsInput!\n  ) {\n    updateRecurringTransactions(data: $data) {\n      id\n      description\n      amount\n      paymentMethod\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateInstallmentTransaction(\n    $data: CreateInstallmentTransactionInput!\n  ) {\n    createInstallmentTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInstallmentTransaction(\n    $data: CreateInstallmentTransactionInput!\n  ) {\n    createInstallmentTransaction(data: $data) {\n      id\n      description\n      amount\n      date\n      status\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    category\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    sourceCard {\n      id\n      name\n      type\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    billingPayment {\n      id\n      status\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      card {\n        lastFourDigits\n        institutionLink {\n          id\n          account {\n            id\n            name\n          }\n          institution {\n            id\n            name\n            logoUrl\n          }\n        }\n      }\n    }\n    cardBilling {\n      id\n      status\n      periodEnd\n      paymentTransaction {\n        description\n        sourceAccount {\n          id\n          name\n          institutionLink {\n            institution {\n              id\n              name\n              logoUrl\n            }\n          }\n        }\n      }\n    }\n    status\n    paymentMethod\n    recurringTransactionId\n    installments {\n      id\n      installmentNumber\n      amount\n    }\n    canCancel\n    cancelReason\n    cancelWarningMessage\n    installmentStartDate\n    installmentNumber\n    totalInstallments\n    installmentId\n  }\n',
): (typeof documents)['\n  fragment TransactionFragment on TransactionModel {\n    id\n    description\n    amount\n    date\n    type\n    category\n    createdAt\n    updatedAt\n    sourceAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    sourceCard {\n      id\n      name\n      type\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    destinyAccount {\n      id\n      name\n      institutionLink {\n        institution {\n          id\n          name\n          logoUrl\n        }\n      }\n    }\n    billingPayment {\n      id\n      status\n      periodStart\n      periodEnd\n      paymentDate\n      limit\n      card {\n        lastFourDigits\n        institutionLink {\n          id\n          account {\n            id\n            name\n          }\n          institution {\n            id\n            name\n            logoUrl\n          }\n        }\n      }\n    }\n    cardBilling {\n      id\n      status\n      periodEnd\n      paymentTransaction {\n        description\n        sourceAccount {\n          id\n          name\n          institutionLink {\n            institution {\n              id\n              name\n              logoUrl\n            }\n          }\n        }\n      }\n    }\n    status\n    paymentMethod\n    recurringTransactionId\n    installments {\n      id\n      installmentNumber\n      amount\n    }\n    canCancel\n    cancelReason\n    cancelWarningMessage\n    installmentStartDate\n    installmentNumber\n    totalInstallments\n    installmentId\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Transactions(\n    $first: Int\n    $after: String\n    $last: Int\n    $before: String\n    $search: String\n    $orderBy: OrdenationTransactionModel\n    $orderDirection: OrderDirection\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactions(\n      first: $first\n      after: $after\n      last: $last\n      before: $before\n      search: $search\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      edges {\n        cursor\n        node {\n          ...TransactionFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TransactionsSummary(\n    $search: String\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      search: $search\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n',
): (typeof documents)['\n  query TransactionsSummary(\n    $search: String\n    $accountId: ID\n    $cardBillingId: ID\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsSummary(\n      search: $search\n      accountId: $accountId\n      cardBillingId: $cardBillingId\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      totalIncome\n      totalExpense\n      balance\n      transactionCount\n      realizedIncome\n      realizedExpense\n      realizedBalance\n      forecastIncome\n      forecastExpense\n      forecastBalance\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query TransactionsGroupedByPeriod(\n    $accountId: ID\n    $limitPerGroup: Int\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsGroupedByPeriod(\n      accountId: $accountId\n      limitPerGroup: $limitPerGroup\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      period\n      label\n      count\n      hasMore\n      transactions {\n        ...TransactionFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query TransactionsGroupedByPeriod(\n    $accountId: ID\n    $limitPerGroup: Int\n    $startDate: DateTime\n    $endDate: DateTime\n    $types: [TransactionType!]\n    $statuses: [TransactionStatus!]\n  ) {\n    transactionsGroupedByPeriod(\n      accountId: $accountId\n      limitPerGroup: $limitPerGroup\n      startDate: $startDate\n      endDate: $endDate\n      types: $types\n      statuses: $statuses\n    ) {\n      period\n      label\n      count\n      hasMore\n      transactions {\n        ...TransactionFragment\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query BillingTransactions($billingId: ID!) {\n    billingTransactions(billingId: $billingId) {\n      ...TransactionFragment\n    }\n  }\n',
): (typeof documents)['\n  query BillingTransactions($billingId: ID!) {\n    billingTransactions(billingId: $billingId) {\n      ...TransactionFragment\n    }\n  }\n'];
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
