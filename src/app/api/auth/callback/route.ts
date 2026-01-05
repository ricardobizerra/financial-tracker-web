import { setAccessToken } from '@/lib/auth';
import { APP_CONFIG } from '@/lib/config';
import { verifyToken } from '@/lib/jose';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  // Validate token presence
  if (!token) {
    return NextResponse.json(
      { error: 'Token não fornecido' },
      { status: 400 },
    );
  }

  // Verify JWT signature and expiration before setting cookie
  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 401 },
    );
  }

  // Token is valid, set the cookie
  await setAccessToken(token);

  redirect(APP_CONFIG.redirects.signIn);
}
