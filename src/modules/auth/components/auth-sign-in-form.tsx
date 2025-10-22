'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import { AuthOAuthOptions } from './auth-oauth-options';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAccessToken } from '@/lib/auth';
import { APP_CONFIG } from '@/lib/config';
import { AuthSignInMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import { DollarSignIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import GoogleIcon from '@/static/google-icon.svg';

const schema = z.object({
  email: formFields.email.describe('E-mail // Insira aqui seu e-mail'),
  password: formFields.password.describe('Senha // Insira aqui sua senha'),
});

export function AuthSignInForm() {
  const [authSignIn, { loading }] = useMutation(AuthSignInMutation);
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof schema>) {
    await authSignIn({
      variables: {
        data: {
          username: data.email,
          password: data.password,
        },
      },
      onCompleted: async (data) => {
        const { token } = await getAccessToken();

        if (!!data.authSignIn && !!token) {
          router.push(APP_CONFIG.redirects.signIn);

          toast.success('Login realizado com sucesso!', {
            description: 'Você será redirecionado em instantes.',
          });
        }
      },
      onError: (error) => {
        toast.error('Erro ao realizar login!', {
          description: error.message,
        });
      },
    });
  }

  return (
    <Card className="m-auto w-full max-w-sm p-0">
      <div className="flex items-center justify-center gap-2 rounded-t-[inherit] border-b border-[inherit] bg-primary p-4 text-center text-primary-foreground">
        <DollarSignIcon className="h-6 w-6" />
        <p className="text-lg">
          <span className="font-semibold">Financial</span>Tracker
        </p>
      </div>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-lg">Bem-vindo de volta</CardTitle>
        <CardDescription>Faça seu login para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <TsForm
          formProps={{ id: 'auth-sign-in-form' }}
          schema={schema}
          onSubmit={handleSubmit}
        >
          {(fields) => (
            <>
              <AuthOAuthOptions action="login" />

              <div className="flex flex-col gap-4">
                {Object.entries(fields).map(([key, field]) => (
                  <div key={key}>{field}</div>
                ))}
              </div>
            </>
          )}
        </TsForm>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button
          type="submit"
          form="auth-sign-in-form"
          loading={loading}
          className="w-full"
        >
          Fazer login
        </Button>
        <p className="text-sm">
          Não tem uma conta?{' '}
          <Link
            href="/register"
            className="text-primary underline underline-offset-2"
          >
            Registre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
