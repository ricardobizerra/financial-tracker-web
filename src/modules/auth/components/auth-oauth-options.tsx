import { Button } from '@/components/ui/button';
import GoogleIcon from '@/static/google-icon.svg';

interface AuthOAuthOptionsProps {
  action: 'login' | 'register';
}

export function AuthOAuthOptions({ action }: AuthOAuthOptionsProps) {
  const actionText = action === 'login' ? 'Login' : 'Cadastro';

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button variant="outline" type="button" className="w-full" asChild>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
            <GoogleIcon />
            {actionText} com Google
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
    </>
  );
}
