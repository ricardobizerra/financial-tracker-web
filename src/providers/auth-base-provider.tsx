'use client';

import { UserModel } from '@/graphql/graphql';
import { JWTPayload } from 'jose';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface BaseAuthProviderProps {
  user: JWTPayload | null;
}

function useAuthController({ user }: BaseAuthProviderProps) {
  const loggedUser = useMemo<UserModel | null>(
    () => (user as UserModel) ?? null,
    [user],
  );

  return {
    loading: false,
    user: loggedUser,
  };
}

const AuthContext = createContext<ReturnType<typeof useAuthController>>({
  loading: true,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function BaseAuthProvider({
  children,
  ...authControllerProps
}: PropsWithChildren<BaseAuthProviderProps>) {
  return (
    <AuthContext.Provider value={useAuthController(authControllerProps)}>
      {children}
    </AuthContext.Provider>
  );
}
