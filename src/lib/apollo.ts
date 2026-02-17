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
  const authMiddleware = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
        'x-requested-with': 'XmlHttpRequest',
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
    uri: '/api/graphql',
    credentials: 'include',
  });

  const authLink = makeAuthMiddleware(token);

  const wsProtocol =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? 'wss:'
      : 'ws:';
  const wsHost = typeof window !== 'undefined' ? window.location.host : '';
  const wsUrl = `${wsProtocol}//${wsHost}/api/subscriptions`;

  const wsLink = new GraphQLWsLink(
    createClient({
      url: wsUrl,
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
    credentials: 'include',
  });

  return client;
};
