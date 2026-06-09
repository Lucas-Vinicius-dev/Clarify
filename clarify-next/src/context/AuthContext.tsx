'use client';

// ═════════════════════════════════════════════════════════════════
// CONTEXT: AUTENTICAÇÃO
// Provider global de autenticação do sistema
// ═════════════════════════════════════════════════════════════════

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type {
  UsuarioLogado,
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

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticação para o app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [isHidrated, setIsHidrated] = useState(false);

  // Hidratação inicial a partir do localStorage
  useEffect(() => {
    const usuarioSalvo = obterUsuarioLogado();
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    setIsHidrated(true);
  }, []);

  const login = (matricula: string, senha: string): AuthResponse => {
    const resultado = autenticarLogin(matricula, senha);
    if (resultado.ok && resultado.usuarioLogado) {
      setUsuario(resultado.usuarioLogado);
    }
    return resultado;
  };

  const logout = () => {
    authLogout();
    setUsuario(null);
  };

  const registro = (dados: RegistroDados): AuthResponse => {
    const resultado = registrarCoordenador(dados);
    if (resultado.ok && resultado.usuarioLogado) {
      setUsuario(resultado.usuarioLogado);
    }
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
