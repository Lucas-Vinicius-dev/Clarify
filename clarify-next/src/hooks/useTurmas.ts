'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Turma } from '@/types'

export interface UseTurmasReturn {
  turmas: Turma[]
  loading: boolean
  criar: (dados: {
    nome: string
    disciplina: string
    alunos: string[]
    coordenadorId: string
  }) => Promise<Turma | null>
  deletar: (id: string) => Promise<void>
  buscar: (id: string) => Turma | undefined
  adicionarAluno: (turmaId: string, alunoId: string) => Promise<void>
  removerAluno: (turmaId: string, alunoId: string) => Promise<void>
  contarAlunos: (idTurma: string) => number
  filtrar: (coordenadorId: string) => Turma[]
  recarregar: () => void
}

function mapRow(row: Record<string, unknown>): Turma {
  return {
    id: row.id as string,
    nome: row.nome as string,
    disciplina: row.disciplina as string,
    alunos: (row.alunos as string[]) ?? [],
    coordenador_id: row.coordenador_id as string,
    criadaEm: row.created_at as string,
  }
}

export function useTurmas(): UseTurmasReturn {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const res = await fetch('/api/turmas')
      const data = await res.json()
      if (!cancelled) {
        setTurmas((data ?? []).map(mapRow))
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

  const criar = useCallback(
    async (dados: {
      nome: string
      disciplina: string
      alunos: string[]
      coordenadorId: string
    }) => {
      const res = await fetch('/api/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      const json = await res.json()
      if (!json.ok || !json.data) return null

      await recarregar()
      return mapRow(json.data)
    },
    [recarregar]
  )

  const deletar = useCallback(
    async (id: string) => {
      await fetch(`/api/turmas/${id}`, { method: 'DELETE' })
      await recarregar()
    },
    [recarregar]
  )

  const buscar = useCallback(
    (id: string) => {
      return turmas.find((t) => t.id === id)
    },
    [turmas]
  )

  const adicionarAluno = useCallback(
    async (turmaId: string, alunoId: string) => {
      await fetch(`/api/turmas/${turmaId}/alunos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alunoId }),
      })
      await recarregar()
    },
    [recarregar]
  )

  const removerAluno = useCallback(
    async (turmaId: string, alunoId: string) => {
      await fetch(`/api/turmas/${turmaId}/alunos/${alunoId}`, { method: 'DELETE' })
      await recarregar()
    },
    [recarregar]
  )

  const contarAlunos = useCallback(
    (idTurma: string) => {
      const turma = turmas.find((t) => t.id === idTurma)
      return turma?.alunos.length ?? 0
    },
    [turmas]
  )

  const filtrar = useCallback(
    (coordenadorId: string) => {
      return turmas.filter((t) => t.coordenador_id === coordenadorId)
    },
    [turmas]
  )

  return {
    turmas,
    loading,
    criar,
    deletar,
    buscar,
    adicionarAluno,
    removerAluno,
    contarAlunos,
    filtrar,
    recarregar,
  }
}
