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
import { Role } from '@/graphql/graphql';
import { getAccessToken } from '@/lib/auth';
import { APP_CONFIG } from '@/lib/config';
import { CreateUserMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import { DollarSignIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import GoogleIcon from '@/static/google-icon.svg';
import Link from 'next/link';

const schema = z.object({
  name: formFields.text.describe('Nome // Insira aqui seu nome'),
  email: formFields.email.describe('E-mail // Insira aqui seu e-mail'),
  password: formFields.createPassword.describe(
    'Senha // Insira aqui sua senha',
  ),
});

export function AuthRegisterForm() {
  const [authRegister, { loading }] = useMutation(CreateUserMutation);
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof schema>) {
    await authRegister({
      variables: {
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
          role: Role.User,
        },
      },
      onCompleted: async (data) => {
        const { token } = await getAccessToken();

        if (!!data.createUser && !!token) {
          router.push(APP_CONFIG.redirects.signIn);

          toast.success('Conta criada com sucesso!', {
            description: 'Você será redirecionado em instantes.',
          });
        }
      },
      onError: (error) => {
        toast.error('Erro ao criar conta!', {
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
        <CardTitle className="text-lg">Novo usuário</CardTitle>
        <CardDescription>
          Insira seus dados para criar uma nova conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TsForm
          formProps={{ id: 'auth-register-form' }}
          schema={schema}
          onSubmit={handleSubmit}
        >
          {(fields) => (
            <>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  asChild
                >
                  <a href="http://localhost:3333/auth/google">
                    <GoogleIcon />
                    Cadastro com Google
                  </a>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>

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
          form="auth-register-form"
          loading={loading}
          className="w-full"
        >
          Criar conta
        </Button>
        <p className="text-sm">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="text-primary underline underline-offset-2"
          >
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
