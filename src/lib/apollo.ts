'use client';

import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  Operation,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

export const makeAuthMiddleware = (token: string | null) => {
  const authMiddleware = setContext(async (operation, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  return authMiddleware;
};

const hasSubscriptionOperation = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

export const createApolloClient = (token: string | null) => {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  });

  const authLink = makeAuthMiddleware(token);

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${process.env.API_SUBSCRIPTION_URL}/subscriptions`,
    }),
  );

  const mainLink = split(hasSubscriptionOperation, wsLink, httpLink);

  const client = new ApolloClient({
    link: authLink.concat(mainLink),
    connectToDevTools: process.env.ENV === 'development',
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
    },
  });

  return client;
};
