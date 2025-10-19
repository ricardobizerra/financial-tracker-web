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
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n': typeof types.AuthSignInDocument;
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n': typeof types.CreateUserDocument;
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n': typeof types.UserDocument;
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n': typeof types.PageInfoFragmentFragmentDoc;
  '\n  mutation CreateInvestment($data: InvestmentCreateWithoutUserInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CreateInvestmentDocument;
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n': typeof types.DeleteInvestmentDocument;
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n  }\n': typeof types.InvestmentFragmentFragmentDoc;
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.InvestmentsDocument;
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n': typeof types.TotalInvestmentsDocument;
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n': typeof types.InvestmentRegimeSummaryFragmentFragmentDoc;
  '\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n': typeof types.InvestmentRegimesDocument;
  '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n': typeof types.UsersDocument;
};
const documents: Documents = {
  '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n':
    types.AuthSignInDocument,
  '\n  mutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      user {\n        id\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query User {\n    user {\n      id\n      name\n      email\n      role\n    }\n  }\n':
    types.UserDocument,
  '\n  fragment PageInfoFragment on PageInfo {\n    startCursor\n    endCursor\n    hasPreviousPage\n    hasNextPage\n  }\n':
    types.PageInfoFragmentFragmentDoc,
  '\n  mutation CreateInvestment($data: InvestmentCreateWithoutUserInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CreateInvestmentDocument,
  '\n  mutation DeleteInvestment($id: ID!) {\n    deleteInvestment(id: $id)\n  }\n':
    types.DeleteInvestmentDocument,
  '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n  }\n':
    types.InvestmentFragmentFragmentDoc,
  '\n  query Investments(\n    $first: Int\n    $orderDirection: OrderDirection\n    $orderBy: OrdenationInvestmentModel\n    $after: String\n    $last: Int\n    $before: String\n    $regime: Regime\n  ) {\n    investments(\n      first: $first\n      orderDirection: $orderDirection\n      orderBy: $orderBy\n      after: $after\n      last: $last\n      before: $before\n      regime: $regime\n    ) {\n      edges {\n        cursor\n        node {\n          ...InvestmentFragment\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n':
    types.InvestmentsDocument,
  '\n  query TotalInvestments {\n    totalInvestments {\n      initialAmount\n      currentAmount\n      currentVariation\n      taxedAmount\n      taxedVariation\n    }\n  }\n':
    types.TotalInvestmentsDocument,
  '\n  fragment InvestmentRegimeSummaryFragment on InvestmentRegimeSummary {\n    name\n    quantity\n    totalInvested\n    currentInvested\n    currentInvestedPercentage\n    taxedInvested\n    taxedInvestedPercentage\n  }\n':
    types.InvestmentRegimeSummaryFragmentFragmentDoc,
  '\n  query InvestmentRegimes {\n    investmentRegimes {\n      edges {\n        cursor\n        node {\n          ...InvestmentRegimeSummaryFragment\n        }\n      }\n    }\n  }\n':
    types.InvestmentRegimesDocument,
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
  source: '\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation AuthSignIn($data: AuthSignInInput!) {\n    authSignIn(data: $data) {\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n'];
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
  source: '\n  mutation CreateInvestment($data: InvestmentCreateWithoutUserInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateInvestment($data: InvestmentCreateWithoutUserInput!) {\n    createInvestment(data: $data) {\n      id\n      amount\n      startDate\n      duration\n      regimeName\n      regimePercentage\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n'];
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
  source: '\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n  }\n',
): (typeof documents)['\n  fragment InvestmentFragment on InvestmentModel {\n    id\n    amount\n    correctedAmount\n    currentVariation\n    taxPercentage\n    taxedAmount\n    taxedVariation\n    startDate\n    duration\n  }\n'];
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
  source: '\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Users(\n    $first: Int\n    $after: String\n    $search: String\n    $before: String\n    $last: Int\n    $orderBy: OrdenationUserModel\n    $orderDirection: OrderDirection\n  ) {\n    users(\n      first: $first\n      after: $after\n      search: $search\n      before: $before\n      last: $last\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      edges {\n        cursor\n        node {\n          id\n          email\n          name\n          role\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
