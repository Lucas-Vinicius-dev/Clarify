'use client';

// ═════════════════════════════════════════════════════════════════
// CONTEXT: AUTENTICAÇÃO
// Provider global de autenticação do sistema
// ═════════════════════════════════════════════════════════════════

import {
  createContext,
  use,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import type {
  AuthContextValue,
  RegistroDados,
  AuthResponse,
} from '@/types';
import {
  autenticarLogin,
  registrarCoordenador,
  logout as authLogout,
  obterUsuarioLogado,
} from '@/lib/auth';

const authListeners = new Set<() => void>();

function notificarMudancaAuth(): void {
  authListeners.forEach((listener) => listener());
}

function subscreverAuth(listener: () => void): () => void {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

function obterSnapshotAuth() {
  return obterUsuarioLogado();
}

function obterSnapshotAuthServidor() {
  return null;
}

// Nome do cookie de sessão usado pelo proxy (src/proxy.ts) para proteger as rotas.
const NOME_COOKIE_SESSAO = 'clarify_sessao';

/**
 * Define o cookie de sessão com o cargo do usuário.
 * Sem Secure (ambiente de desenvolvimento roda em http).
 */
function definirCookieSessao(cargo: 'aluno' | 'coordenador'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${NOME_COOKIE_SESSAO}=${cargo}; path=/; SameSite=Lax`;
}

/**
 * Limpa o cookie de sessão (expira imediatamente).
 */
function limparCookieSessao(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${NOME_COOKIE_SESSAO}=; path=/; SameSite=Lax; Max-Age=0`;
}

/**
 * Autentica o usuário e, em caso de sucesso, grava o cookie de sessão.
 * Função pura de módulo (não depende de estado/props do componente).
 */
function login(matricula: string, senha: string): AuthResponse {
  const resultado = autenticarLogin(matricula, senha);
  if (resultado.ok && resultado.usuarioLogado) {
    definirCookieSessao(resultado.usuarioLogado.cargo);
    notificarMudancaAuth();
  }
  return resultado;
}

/**
 * Faz logout e limpa o cookie de sessão.
 */
function logout(): void {
  authLogout();
  limparCookieSessao();
  notificarMudancaAuth();
}

/**
 * Registra um coordenador e, em caso de sucesso, grava o cookie de sessão.
 */
function registro(dados: RegistroDados): AuthResponse {
  const resultado = registrarCoordenador(dados);
  if (resultado.ok) {
    definirCookieSessao('coordenador');
    notificarMudancaAuth();
  }
  return resultado;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticação para o app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const usuario = useSyncExternalStore(subscreverAuth, obterSnapshotAuth, obterSnapshotAuthServidor);

  const value: AuthContextValue = {
    usuario,
    isAuthenticated: !!usuario,
    login,
    logout,
    registro,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de autenticação
 */
export function useAuth(): AuthContextValue {
  const ctx = use(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return ctx;
}
