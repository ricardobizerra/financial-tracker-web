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
import { ResetPasswordMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import { DollarSignIcon, CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z
  .object({
    password: formFields.password.describe('Nova senha // Digite sua nova senha'),
    confirmPassword: formFields.password.describe(
      'Confirmar senha // Confirme sua nova senha',
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [resetPassword, { loading }] = useMutation(ResetPasswordMutation);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    if (!token) {
      toast.error('Token inválido', {
        description: 'Por favor, solicite um novo link de recuperação.',
      });
      return;
    }

    await resetPassword({
      variables: { token, newPassword: data.password },
      onCompleted: () => {
        setSuccess(true);
        toast.success('Senha alterada com sucesso!', {
          description: 'Você pode fazer login com sua nova senha.',
        });
      },
      onError: (error) => {
        toast.error('Erro ao alterar senha', {
          description: error.message,
        });
      },
    });
  }

  if (!token) {
    return (
      <Card className="m-auto w-full max-w-sm p-0">
        <div className="flex items-center justify-center gap-2 rounded-t-[inherit] border-b border-[inherit] bg-primary p-4 text-center text-primary-foreground">
          <DollarSignIcon className="h-6 w-6" />
          <p className="text-lg">
            <span className="font-semibold">Financial</span>Tracker
          </p>
        </div>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-lg">Link inválido</CardTitle>
          <CardDescription>
            Este link de recuperação é inválido ou expirou.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/forgot-password" className="w-full">
            <Button variant="outline" className="w-full">
              Solicitar novo link
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="m-auto w-full max-w-sm p-0">
        <div className="flex items-center justify-center gap-2 rounded-t-[inherit] border-b border-[inherit] bg-primary p-4 text-center text-primary-foreground">
          <DollarSignIcon className="h-6 w-6" />
          <p className="text-lg">
            <span className="font-semibold">Financial</span>Tracker
          </p>
        </div>
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-lg">Senha alterada!</CardTitle>
          <CardDescription>
            Sua senha foi alterada com sucesso.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push('/login')} className="w-full">
            Fazer login
          </Button>
        </CardFooter>
      </Card>
    );
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
        <CardTitle className="text-lg">Redefinir senha</CardTitle>
        <CardDescription>Digite sua nova senha</CardDescription>
      </CardHeader>
      <CardContent>
        <TsForm
          formProps={{ id: 'reset-password-form' }}
          schema={schema}
          onSubmit={handleSubmit}
        >
          {(fields) => (
            <div className="flex flex-col gap-4">
              {Object.entries(fields).map(([key, field]) => (
                <div key={key}>{field}</div>
              ))}
            </div>
          )}
        </TsForm>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="reset-password-form"
          loading={loading}
          className="w-full"
        >
          Alterar senha
        </Button>
      </CardFooter>
    </Card>
  );
}
