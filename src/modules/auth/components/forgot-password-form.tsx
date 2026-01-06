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
import { RequestPasswordResetMutation } from '@/modules/auth/graphql/auth-mutations';
import { useMutation } from '@apollo/client';
import { DollarSignIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: formFields.email.describe('E-mail // Insira seu e-mail cadastrado'),
});

export function ForgotPasswordForm() {
  const [requestReset, { loading }] = useMutation(RequestPasswordResetMutation);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    await requestReset({
      variables: { email: data.email },
      onCompleted: () => {
        setEmailSent(true);
        toast.success('E-mail enviado!', {
          description: 'Verifique sua caixa de entrada.',
        });
      },
      onError: (error) => {
        toast.error('Erro ao enviar e-mail', {
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
        <CardTitle className="text-lg">Esqueceu sua senha?</CardTitle>
        <CardDescription>
          {emailSent
            ? 'Verifique seu e-mail para o link de recuperação'
            : 'Informe seu e-mail para recuperar o acesso'}
        </CardDescription>
      </CardHeader>
      {!emailSent ? (
        <>
          <CardContent>
            <TsForm
              formProps={{ id: 'forgot-password-form' }}
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
          <CardFooter className="flex-col gap-4">
            <Button
              type="submit"
              form="forgot-password-form"
              loading={loading}
              className="w-full"
            >
              Enviar link de recuperação
            </Button>
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Voltar para o login
            </Link>
          </CardFooter>
        </>
      ) : (
        <CardFooter className="flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Não recebeu o e-mail? Verifique sua pasta de spam ou tente
            novamente.
          </p>
          <Button
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="w-full"
          >
            Enviar novamente
          </Button>
          <Link
            href="/login"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar para o login
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
