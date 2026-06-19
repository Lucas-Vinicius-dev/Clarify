'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Usuario, Cargo, UsuarioLogado } from '@/types'

export interface UseUsuariosReturn {
  usuarios: UsuarioLogado[]
  loading: boolean
  adicionar: (
    nome: string,
    matricula: string,
    email: string,
    senha: string,
    cargo: Cargo
  ) => Promise<void>
  buscar: (matricula: string) => Promise<UsuarioLogado | null>
  obterAlunosDoCoordenador: (coordenadorId: string) => Promise<UsuarioLogado[]>
  atribuir: (coordenadorId: string, alunoId: string) => Promise<void>
  deletar: (alunoId: string) => Promise<void>
  existe: (matricula: string, email: string) => Promise<boolean>
  recarregar: () => Promise<void>
}

function mapProfileToUser(row: Record<string, unknown>): UsuarioLogado {
  return {
    id: row.id as string,
    nome: row.nome as string,
    matricula: row.matricula as string,
    email: row.email as string,
    cargo: row.cargo as Cargo,
    coordenador_id: (row.coordenador_id as string) ?? undefined,
  }
}

export function useUsuarios(): UseUsuariosReturn {
  const supabase = createClient()
  const [usuarios, setUsuarios] = useState<UsuarioLogado[]>([])
  const [loading, setLoading] = useState(true)

  const recarregar = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('profiles').select('*')
    setUsuarios((data ?? []).map(mapProfileToUser))
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const adicionar = useCallback(
    async (nome: string, matricula: string, email: string, senha: string, cargo: Cargo) => {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, matricula, email, senha, cargo }),
      })
      const json = await res.json()
      if (json.ok) await recarregar()
    },
    [recarregar]
  )

  const buscar = useCallback(async (matricula: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('matricula', matricula)
      .maybeSingle()
    if (!data) return null
    return mapProfileToUser(data)
  }, [supabase])

  const obterAlunosDoCoordenador = useCallback(
    async (coordenadorId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('coordenador_id', coordenadorId)
        .eq('cargo', 'aluno')
      return (data ?? []).map(mapProfileToUser)
    },
    [supabase]
  )

  const atribuir = useCallback(
    async (coordenadorId: string, alunoId: string) => {
      await supabase
        .from('profiles')
        .update({ coordenador_id: coordenadorId })
        .eq('id', alunoId)
      await recarregar()
    },
    [supabase, recarregar]
  )

  const deletar = useCallback(
    async (alunoId: string) => {
      await fetch(`/api/profiles?alunoId=${alunoId}`, { method: 'DELETE' })
      await recarregar()
    },
    [recarregar]
  )

  const existe = useCallback(
    async (matricula: string, email: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .or(`matricula.eq.${matricula},email.eq.${email}`)
        .maybeSingle()
      return !!data
    },
    [supabase]
  )

  return {
    usuarios,
    loading,
    adicionar,
    buscar,
    obterAlunosDoCoordenador,
    atribuir,
    deletar,
    existe,
    recarregar,
  }
}
