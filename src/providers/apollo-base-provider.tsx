'use client';

import { PropsWithChildren, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/lib/apollo';

export function ApolloBaseProvider({
  children,
  token,
}: PropsWithChildren<{ token: string | null }>) {
  const client = useMemo(() => createApolloClient(token), [token]);

  if (!client) return <></>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
