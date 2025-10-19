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
          Insira seus dados para criar uma nova conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TsForm
          formProps={{ id: 'auth-register-form' }}
          schema={schema}
          onSubmit={handleSubmit}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" form="auth-register-form" loading={loading}>
          Criar conta
        </Button>
      </CardFooter>
    </Card>
  );
}
