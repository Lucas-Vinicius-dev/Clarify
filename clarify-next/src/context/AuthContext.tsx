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
  RegistroDados,
  UsuarioLogado,
} from '@/types'

const AuthContext = createContext<AuthContextValue | null>(null)

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const supabase = createClient()
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (data) {
      const u: UsuarioLogado = {
        id: data.id,
        nome: data.nome,
        matricula: data.matricula,
        email: data.email,
        cargo: data.cargo,
        coordenador_id: data.coordenador_id,
      }
      setUsuario(u)
    } else {
      setUsuario(null)
    }
    setLoading(false)
  }, [supabase])

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
    if (data.ok) {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
    }
    return data
  }, [supabase, fetchProfile])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUsuario(null)
  }, [supabase])

  const registro = useCallback(async (dados: RegistroDados): Promise<AuthResponse> => {
    if (!dados.chaveAtivacao) {
      return { ok: false, mensagem: 'Chave de ativação é obrigatória.' }
    }

    const { data: chave } = await supabase
      .from('chaves_ativacao')
      .select('*')
      .eq('code', dados.chaveAtivacao)
      .eq('used', false)
      .single()

    if (!chave) {
      return { ok: false, mensagem: 'Chave de ativação inválida ou já utilizada.' }
    }

    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          matricula: dados.matricula,
          nome: dados.nome,
          cargo: dados.cargo ?? 'coordenador',
        },
      },
    })

    if (error) {
      return { ok: false, mensagem: error.message }
    }

    if (!data.user) {
      return { ok: false, mensagem: 'Erro ao criar usuário.' }
    }

    await supabase
      .from('chaves_ativacao')
      .update({ used: true })
      .eq('code', dados.chaveAtivacao)

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    const usuarioLogado = profile
      ? {
          id: profile.id,
          nome: profile.nome,
          matricula: profile.matricula,
          email: profile.email,
          cargo: profile.cargo,
          coordenador_id: profile.coordenador_id,
        }
      : undefined

    if (usuarioLogado) setUsuario(usuarioLogado)
    return { ok: true, usuarioLogado }
  }, [supabase])

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
