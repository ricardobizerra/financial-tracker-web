'use client';

import { createContext, useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-base-provider';
import { UserCircle2Icon, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimpleTooltip } from './simple-tooltip';
import { Skeleton } from './ui/skeleton';
import { removeAccessToken } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { AuthSignOutMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';

interface UserAvatarProps {
  icon?: boolean;
  loginClassName?: string;
}

const UserAvatarContext = createContext<
  Omit<UserAvatarProps, 'icon'> | undefined
>(undefined);

export function UserAvatar({ icon = false, ...props }: UserAvatarProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [authSignOut] = useMutation(AuthSignOutMutation);

  return (
    <UserAvatarContext.Provider value={props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'p-0 hover:bg-accent',
              icon ? 'h-8 w-8 rounded-full' : 'w-full',
            )}
          >
            {icon ? <UserAvatarCollapsed /> : <UserAvatarExpanded />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {user && (
            <div className="flex items-center gap-2 p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          )}
          <DropdownMenuItem
            className="cursor-pointer bg-destructive text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground"
            onClick={async () => {
              await authSignOut({
                onCompleted: async (data) => {
                  router.push('/login');

                  toast.success('Logout realizado', {
                    description: 'Faça login novamente',
                  });
                },
                onError: (error) => {
                  toast.error('Erro ao realizar logout', {
                    description: error.message,
                  });
                },
              });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </UserAvatarContext.Provider>
  );
}

function UserAvatarCollapsed() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
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
    <div className="text-left">
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
