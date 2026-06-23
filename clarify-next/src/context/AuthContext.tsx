'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { createClient } from '@/lib/supabase/client'
import type {
  AuthContextValue,
  AuthResponse,
  Cargo,
  RegistroDados,
  UsuarioLogado,
} from '@/types'

// Cookie de sessão lido pelo proxy (src/proxy.ts) para o gating server-side
// das rotas protegidas. Mantém o cargo como fonte de verdade do proxy.
const NOME_COOKIE_SESSAO = 'clarify_sessao'
const MAX_AGE_COOKIE_SESSAO = 60 * 60 * 24 * 7 // 7 dias

// Grava o cargo num cookie legível pelo proxy. Sem Secure (dev roda em http).
function definirCookieSessao(cargo: Cargo): void {
  if (typeof document === 'undefined') return
  document.cookie = `${NOME_COOKIE_SESSAO}=${cargo}; path=/; SameSite=Lax; Max-Age=${MAX_AGE_COOKIE_SESSAO}`
}

// Expira o cookie de sessão imediatamente.
function limparCookieSessao(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${NOME_COOKIE_SESSAO}=; path=/; SameSite=Lax; Max-Age=0`
}

const AuthContext = createContext<AuthContextValue | null>(null)

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const supabase = createClient()
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    const res = await fetch(`/api/perfis/${userId}`)
    if (res.ok) {
      const data = await res.json()
      setUsuario({
        id: data.id,
        nome: data.nome,
        matricula: data.matricula,
        email: data.email,
        cargo: data.cargo,
        coordenador_id: data.coordenador_id,
      })
      // Sincroniza o cookie do proxy a cada hidratação de sessão (ex.: refresh),
      // garantindo que uma sessão Supabase válida não seja barrada no /login.
      definirCookieSessao(data.cargo)
    } else {
      setUsuario(null)
      limparCookieSessao()
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setUsuario(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, fetchProfile])

  const login = useCallback(async (matricula: string, senha: string): Promise<AuthResponse> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula, senha }),
    })
    const data = await res.json()
    if (data.ok && data.usuarioLogado) {
      setUsuario(data.usuarioLogado)
      definirCookieSessao(data.usuarioLogado.cargo)
      await supabase.auth.getSession()
    }
    return data
  }, [supabase])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUsuario(null)
    limparCookieSessao()
  }, [supabase])

  const registro = useCallback(async (dados: RegistroDados): Promise<AuthResponse> => {
    if (!dados.chaveAtivacao) {
      return { ok: false, mensagem: 'Chave de ativação é obrigatória.' }
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: dados.nome,
        matricula: dados.matricula,
        email: dados.email,
        senha: dados.senha,
        chaveAtivacao: dados.chaveAtivacao,
      }),
    })

    const result = await res.json()

    if (result.ok && result.usuarioLogado) {
      setUsuario(result.usuarioLogado)
      definirCookieSessao(result.usuarioLogado.cargo)
    }

    return result
  }, [])

  const value: AuthContextValue = {
    usuario,
    isAuthenticated: !!usuario,
    loading,
    login,
    logout,
    registro,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return ctx
}
