'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Turma } from '@/types'

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

export function useTurmas() {
  const queryClient = useQueryClient()

  const { data: turmas = [], isLoading: loading } = useQuery({
    queryKey: ['turmas'],
    queryFn: async () => {
      const res = await fetch('/api/turmas')
      const data = await res.json()
      return (data ?? []).map(mapRow) as Turma[]
    },
  })

  const criarMutation = useMutation({
    mutationFn: async (dados: {
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
      return mapRow(json.data) as Turma
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] })
    },
  })

  const deletarMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/turmas/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] })
    },
  })

  const adicionarAlunoMutation = useMutation({
    mutationFn: async ({ turmaId, alunoId }: { turmaId: string; alunoId: string }) => {
      await fetch(`/api/turmas/${turmaId}/alunos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alunoId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] })
    },
  })

  const removerAlunoMutation = useMutation({
    mutationFn: async ({ turmaId, alunoId }: { turmaId: string; alunoId: string }) => {
      await fetch(`/api/turmas/${turmaId}/alunos/${alunoId}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['turmas'] })
    },
  })

  const buscar = (id: string): Turma | undefined => {
    return turmas.find((t) => t.id === id)
  }

  const contarAlunos = (idTurma: string): number => {
    const turma = turmas.find((t) => t.id === idTurma)
    return turma?.alunos.length ?? 0
  }

  const filtrar = (coordenadorId: string): Turma[] => {
    return turmas.filter((t) => t.coordenador_id === coordenadorId)
  }

  return {
    turmas,
    loading,
    criar: criarMutation.mutateAsync,
    deletar: deletarMutation.mutateAsync,
    buscar,
    adicionarAluno: (turmaId: string, alunoId: string) =>
      adicionarAlunoMutation.mutateAsync({ turmaId, alunoId }),
    removerAluno: (turmaId: string, alunoId: string) =>
      removerAlunoMutation.mutateAsync({ turmaId, alunoId }),
    contarAlunos,
    filtrar,
    recarregar: () => queryClient.invalidateQueries({ queryKey: ['turmas'] }),
  }
}