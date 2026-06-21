'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Cargo, UsuarioLogado } from '@/types'

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
  recarregar: () => void
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
  const [usuarios, setUsuarios] = useState<UsuarioLogado[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const res = await fetch('/api/perfis')
      const data = await res.json()
      if (!cancelled) {
        setUsuarios((data ?? []).map(mapProfileToUser))
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [refreshKey])

  const recarregar = useCallback(() => {
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }, [])

  const adicionar = useCallback(
    async (nome: string, matricula: string, email: string, senha: string, cargo: Cargo) => {
      const res = await fetch('/api/perfis', {
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
    const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}`)
    const data = await res.json()
    const user = (data ?? [])[0]
    if (!user) return null
    return mapProfileToUser(user)
  }, [])

  const obterAlunosDoCoordenador = useCallback(
    async (coordenadorId: string) => {
      const res = await fetch(`/api/perfis?coordenadorId=${encodeURIComponent(coordenadorId)}&cargo=aluno`)
      const data = await res.json()
      return (data ?? []).map(mapProfileToUser)
    },
    []
  )

  const atribuir = useCallback(
    async (coordenadorId: string, alunoId: string) => {
      await fetch(`/api/perfis/${alunoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordenador_id: coordenadorId }),
      })
      await recarregar()
    },
    [recarregar]
  )

  const deletar = useCallback(
    async (alunoId: string) => {
      await fetch(`/api/perfis?alunoId=${alunoId}`, { method: 'DELETE' })
      await recarregar()
    },
    [recarregar]
  )

  const existe = useCallback(
    async (matricula: string, email: string) => {
      const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}&email=${encodeURIComponent(email)}`)
      const data = await res.json()
      return (data ?? []).length > 0
    },
    []
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
