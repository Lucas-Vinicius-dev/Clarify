// ═════════════════════════════════════════════════════════════════
// PROXY: PROTEÇÃO DE ROTAS
// Gating server-side das rotas protegidas (sem flash de conteúdo).
// Lê o cookie de sessão `clarify_sessao` (cargo) gravado no login/registro
// (ver definirCookieSessao em src/context/AuthContext.tsx).
// (No Next.js 16 o antigo "middleware" passou a se chamar "proxy".)
// ═════════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const cargo = request.cookies.get('clarify_sessao')?.value;
  const { pathname } = request.nextUrl;

  // Sem sessão (ou cookie inválido): redireciona para o login.
  // Tratar valores fora de 'aluno' | 'coordenador' como não autenticado
  // evita qualquer ping-pong de redirecionamento com cookie adulterado.
  if (cargo !== 'aluno' && cargo !== 'coordenador') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rotas de coordenador exigem cargo 'coordenador'.
  if (pathname.startsWith('/dashboardcoord') && cargo !== 'coordenador') {
    return NextResponse.redirect(new URL('/centraldemandas', request.url));
  }

  // Rotas de aluno exigem cargo 'aluno'.
  if (pathname.startsWith('/centraldemandas') && cargo !== 'aluno') {
    return NextResponse.redirect(new URL('/dashboardcoord', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboardcoord/:path*', '/centraldemandas/:path*', '/perfil/:path*'],
};
