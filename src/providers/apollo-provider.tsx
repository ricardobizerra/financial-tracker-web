import { PropsWithChildren } from 'react';
import { ApolloBaseProvider } from './apollo-base-provider';
import { getAccessToken } from '@/lib/auth';

export async function GraphqlApolloProvider({ children }: PropsWithChildren) {
  const { token } = await getAccessToken();

  return <ApolloBaseProvider token={token}>{children}</ApolloBaseProvider>;
}
