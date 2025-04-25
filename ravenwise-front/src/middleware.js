import { NextResponse } from 'next/server';

// Routes publiques qui sont accessibles sans authentification
const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'];

export function middleware(request) {
  // Récupérer le token d'authentification depuis le cookie
  const token = request.cookies.get('authToken')?.value;
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Redirection si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!isAuthenticated && !publicRoutes.includes(path) && !path.startsWith('/_next')) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est authentifié et va sur une page d'authentification, redirectionnez-le vers le dashboard
  if (isAuthenticated && (path === '/auth/login' || path === '/auth/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Routes à protéger
    '/dashboard/:path*',
    '/courses/:path*',
    '/quiz/:path*',
    '/community/:path*',
    '/settings/:path*',
    // Routes d'authentification pour la redirection si déjà connecté
    '/auth/login',
    '/auth/register',
  ],
};