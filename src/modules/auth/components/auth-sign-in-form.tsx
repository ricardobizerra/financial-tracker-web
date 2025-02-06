'use client';

import { formFields, TsForm } from '@/components/ts-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { setAccessToken } from '@/lib/auth';
import { AuthSignInMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

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
        if (data.authSignIn?.accessToken) {
          await setAccessToken(data.authSignIn.accessToken);

          router.push('/');

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
    <Card className="m-auto w-full max-w-[500px] p-4">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          <p>Entre com seu e-mail e senha.</p>
          <p>
            Não tem uma conta?{' '}
            <Link href="/register" className="underline underline-offset-2">
              Registre-se
            </Link>
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TsForm
          formProps={{ id: 'auth-sign-in-form' }}
          schema={schema}
          onSubmit={handleSubmit}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" form="auth-sign-in-form" loading={loading}>
          Fazer login
        </Button>
      </CardFooter>
    </Card>
  );
}
