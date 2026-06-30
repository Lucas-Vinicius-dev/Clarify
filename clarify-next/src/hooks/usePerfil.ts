'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UsuarioLogado } from '@/types'

function mapProfileToUser(row: Record<string, unknown>): UsuarioLogado {
  return {
    id: row.id as string,
    nome: row.nome as string,
    matricula: row.matricula as string,
    email: row.email as string,
    cargo: row.cargo as string as UsuarioLogado['cargo'],
    telefone: (row.telefone as string) ?? undefined,
    coordenador_id: (row.coordenador_id as string) ?? undefined,
  }
}

export function usePerfil(id: string | null | undefined) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['perfil', id],
    queryFn: async () => {
      const res = await fetch(`/api/perfis/${id}`)
      if (!res.ok) return null
      const data = await res.json()
      return mapProfileToUser(data) as UsuarioLogado
    },
    enabled: !!id,
  })

  const atualizarMutation = useMutation({
    mutationFn: async (dados: { nome?: string; telefone?: string }) => {
      const res = await fetch(`/api/perfis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      const json = await res.json()
      if (!json.ok) {
        throw new Error(json.mensagem || 'Erro ao atualizar perfil.')
      }
      return json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['perfil', id] })
    },
  })

  return { ...query, atualizar: atualizarMutation.mutateAsync }
}
