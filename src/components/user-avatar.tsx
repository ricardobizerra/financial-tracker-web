'use client';

import { createContext, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-base-provider';
import { UserCircle2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimpleTooltip } from './simple-tooltip';

interface UserAvatarProps {
  icon?: boolean;
  loginClassName?: string;
}

const UserAvatarContext = createContext<
  Omit<UserAvatarProps, 'icon'> | undefined
>(undefined);

export function UserAvatar({ icon = false, ...props }: UserAvatarProps) {
  return (
    <UserAvatarContext.Provider value={props}>
      {icon ? <UserAvatarCollapsed /> : <UserAvatarExpanded />}
    </UserAvatarContext.Provider>
  );
}

function UserAvatarCollapsed() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-muted">?</AvatarFallback>
      </Avatar>
    );
  }

  if (!user) {
    return (
      <SimpleTooltip
        label={
          <>
            <p className="text-sm">Não autenticado.</p>
            <LoginButton />
          </>
        }
        side="right"
        className="flex flex-col gap-1"
      >
        <UserCircle2Icon className="h-8 w-8" strokeWidth={1} />
      </SimpleTooltip>
    );
  }

  return (
    <SimpleTooltip
      label={<UserInfo />}
      side="right"
      className="flex flex-col gap-1"
    >
      <UserImage />
    </SimpleTooltip>
  );
}

function UserAvatarExpanded() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p className="animate-pulse text-nowrap text-sm text-muted-foreground">
        Carregando usuário...
      </p>
    );
  }

  if (!user) {
    return <LoginButton />;
  }

  return (
    <div className="flex items-center gap-2">
      <UserImage />
      <UserInfo />
    </div>
  );
}

function UserImage() {
  const { user } = useAuth();

  const userCode = user?.email.split('@')[0];
  const initials = userCode?.substring(0, 1).toUpperCase();
  const fallbackUrl = `https://avatar.vercel.sh/${initials}`;

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        className="rounded-full border border-border bg-muted"
        src={fallbackUrl}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

function UserInfo() {
  const { user } = useAuth();

  return (
    <div>
      <p className="text-nowrap text-sm font-medium">{user?.name}</p>
      <p className="text-xs text-muted-foreground">{user?.email}</p>
    </div>
  );
}

function LoginButton() {
  const { loginClassName } = useUserAvatar();

  return (
    <Button
      variant="default"
      size="sm"
      asChild
      className={cn('w-full', loginClassName)}
    >
      <Link href="/login">Fazer login</Link>
    </Button>
  );
}

function useUserAvatar() {
  const context = useContext(UserAvatarContext);
  if (!context) {
    throw new Error(
      'The hook useUserAvatar must be used within a UserAvatarContext.Provider',
    );
  }
  return context;
}
