import { PropsWithChildren } from 'react';
import { BaseAuthProvider } from './auth-base-provider';
import { getAccessToken } from '@/lib/auth';

export async function AuthProvider({ children }: PropsWithChildren) {
  const { user } = await getAccessToken();

  return <BaseAuthProvider user={user}>{children}</BaseAuthProvider>;
}
