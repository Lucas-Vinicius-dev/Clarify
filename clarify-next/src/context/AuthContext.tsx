'use client';

// ═════════════════════════════════════════════════════════════════
// CONTEXT: AUTENTICAÇÃO
// Provider global de autenticação do sistema
// ═════════════════════════════════════════════════════════════════

import {
  createContext,
  useContext,
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

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticação para o app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const usuario = useSyncExternalStore(subscreverAuth, obterSnapshotAuth, obterSnapshotAuthServidor);

  const login = (matricula: string, senha: string): AuthResponse => {
    const resultado = autenticarLogin(matricula, senha);
    if (resultado.ok) notificarMudancaAuth();
    return resultado;
  };

  const logout = () => {
    authLogout();
    notificarMudancaAuth();
  };

  const registro = (dados: RegistroDados): AuthResponse => {
    const resultado = registrarCoordenador(dados);
    if (resultado.ok) notificarMudancaAuth();
    return resultado;
  };

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
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return ctx;
}
