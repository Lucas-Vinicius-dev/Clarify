'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
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
  recarregar: () => Promise<void>
}

function mapRow(row: Record<string, unknown>): Turma {
  return {
    id: row.id as string,
    nome: row.nome as string,
    disciplina: row.disciplina as string,
    alunos: [],
    coordenador_id: row.coordenador_id as string,
    criadaEm: row.created_at as string,
  }
}

export function useTurmas(): UseTurmasReturn {
  const supabase = createClient()
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)

  const recarregar = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('turmas')
      .select('*')
      .order('created_at', { ascending: false })
    const turmasRows = (data ?? []).map(mapRow)

    const turmasComAlunos = await Promise.all(
      turmasRows.map(async (t) => {
        const { data: alunos } = await supabase
          .from('turma_alunos')
          .select('aluno_id')
          .eq('turma_id', t.id)
        return { ...t, alunos: (alunos ?? []).map((a) => a.aluno_id) }
      })
    )

    setTurmas(turmasComAlunos)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const criar = useCallback(
    async (dados: {
      nome: string
      disciplina: string
      alunos: string[]
      coordenadorId: string
    }) => {
      const { data: turma } = await supabase
        .from('turmas')
        .insert({
          nome: dados.nome,
          disciplina: dados.disciplina,
          coordenador_id: dados.coordenadorId,
        })
        .select()
        .single()

      if (!turma) return null

      if (dados.alunos.length > 0) {
        const inserts = dados.alunos.map((alunoId) => ({
          turma_id: turma.id,
          aluno_id: alunoId,
        }))
        await supabase.from('turma_alunos').insert(inserts)
      }

      await recarregar()
      return { ...mapRow(turma), alunos: dados.alunos }
    },
    [supabase, recarregar]
  )

  const deletar = useCallback(
    async (id: string) => {
      await supabase.from('turmas').delete().eq('id', id)
      await recarregar()
    },
    [supabase, recarregar]
  )

  const buscar = useCallback(
    (id: string) => {
      return turmas.find((t) => t.id === id)
    },
    [turmas]
  )

  const adicionarAluno = useCallback(
    async (turmaId: string, alunoId: string) => {
      await supabase
        .from('turma_alunos')
        .insert({ turma_id: turmaId, aluno_id: alunoId })
      await recarregar()
    },
    [supabase, recarregar]
  )

  const removerAluno = useCallback(
    async (turmaId: string, alunoId: string) => {
      await supabase
        .from('turma_alunos')
        .delete()
        .eq('turma_id', turmaId)
        .eq('aluno_id', alunoId)
      await recarregar()
    },
    [supabase, recarregar]
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
