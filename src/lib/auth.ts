'use server';

import { cookies } from 'next/headers';
import { verifyToken } from './jose';

export async function getAccessToken() {
  const token = (await cookies()).get('accessToken')?.value;

  if (!token) {
    return { token: null, user: null };
  }

  const verifiedAccessToken = await verifyToken(token);

  if (!verifiedAccessToken || !verifiedAccessToken?.payload) {
    return { token: null, user: null };
  }

  const { sub, iat, exp, ...user } = verifiedAccessToken.payload;

  if (!!exp && new Date().getTime() / 1000 > (exp || 0)) {
    return { token: null, user: null };
  }

  return { token, user };
}

export async function setAccessToken(accessToken: string) {
  (await cookies()).set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.ENV === 'production',
    maxAge: Number(process.env.JWT_EXPIRES_IN_SECONDS),
  });
}

export async function removeAccessToken() {
  (await cookies()).set('accessToken', '', {
    httpOnly: true,
    secure: process.env.ENV === 'production',
    maxAge: 0,
  });
}
