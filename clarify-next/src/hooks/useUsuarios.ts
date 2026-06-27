'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Cargo, UsuarioLogado } from '@/types'

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

async function buscar(matricula: string): Promise<UsuarioLogado | null> {
  const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}`)
  const data = await res.json()
  const user = (data ?? [])[0]
  if (!user) return null
  return mapProfileToUser(user)
}

async function obterAlunosDoCoordenador(coordenadorId: string): Promise<UsuarioLogado[]> {
  const res = await fetch(`/api/perfis?coordenadorId=${encodeURIComponent(coordenadorId)}&cargo=aluno`)
  const data = await res.json()
  return (data ?? []).map(mapProfileToUser) as UsuarioLogado[]
}

async function existe(matricula: string, email: string): Promise<boolean> {
  const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}&email=${encodeURIComponent(email)}`)
  const data = await res.json()
  return (data ?? []).length > 0
}

export function useAlunosDoCoordenador(coordenadorId: string | null | undefined) {
  return useQuery({
    queryKey: ['students', coordenadorId],
    queryFn: async () => {
      if (!coordenadorId) return []
      const res = await fetch(`/api/perfis?coordenadorId=${encodeURIComponent(coordenadorId)}&cargo=aluno`)
      const data = await res.json()
      return (data ?? []).map(mapProfileToUser) as UsuarioLogado[]
    },
    enabled: !!coordenadorId,
  })
}

export function useUsuarios() {
  const queryClient = useQueryClient()

  const { data: usuarios = [], isLoading: loading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const res = await fetch('/api/perfis')
      const data = await res.json()
      return (data ?? []).map(mapProfileToUser) as UsuarioLogado[]
    },
  })

  const adicionarMutation = useMutation({
    mutationFn: async (dados: {
      nome: string
      matricula: string
      email: string
      senha: string
      cargo: Cargo
    }) => {
      const res = await fetch('/api/perfis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const atribuirMutation = useMutation({
    mutationFn: async ({ coordenadorId, alunoId }: { coordenadorId: string; alunoId: string }) => {
      await fetch(`/api/perfis/${alunoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordenador_id: coordenadorId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  const deletarMutation = useMutation({
    mutationFn: async (alunoId: string) => {
      await fetch(`/api/perfis?alunoId=${alunoId}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })

  return {
    usuarios,
    loading,
    adicionar: (
      nome: string,
      matricula: string,
      email: string,
      senha: string,
      cargo: Cargo
    ) => adicionarMutation.mutateAsync({ nome, matricula, email, senha, cargo }),
    buscar,
    obterAlunosDoCoordenador,
    atribuir: (coordenadorId: string, alunoId: string) =>
      atribuirMutation.mutateAsync({ coordenadorId, alunoId }),
    deletar: deletarMutation.mutateAsync,
    existe,
    recarregar: () => queryClient.invalidateQueries({ queryKey: ['usuarios'] }),
  }
}