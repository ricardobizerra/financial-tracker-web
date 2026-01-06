import { NextResponse, NextRequest } from 'next/server';
import { getAccessToken } from './lib/auth';
import { APP_CONFIG } from './lib/config';

const publicRoutes = [
  { base: '/' },
  { base: '/login' },
  { base: '/register' },
  { base: '/forgot-password' },
  { base: '/reset-password' },
];

const authRoutes = [{ base: '/login' }, { base: '/register' }];

export async function middleware(request: NextRequest) {
  const requestBaseUrl = `/${request.nextUrl.pathname.split('/')[1]}`;

  if (!APP_CONFIG.withAuth) {
    const isAuthRoute = authRoutes.some((route) => {
      return requestBaseUrl === route.base;
    });

    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const { token: accessToken } = await getAccessToken();

  const isPrivateRoute = !publicRoutes.some((route) => {
    return requestBaseUrl === route.base;
  });

  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAuthCallbackRoute = request.nextUrl.pathname === '/api/auth/callback';

  if ((isPrivateRoute || isApiRoute) && !isAuthCallbackRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
