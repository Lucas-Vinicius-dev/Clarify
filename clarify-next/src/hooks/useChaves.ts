'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Chave {
  id: string
  code: string
  used: boolean
  created_at: string
}

export function useChaves() {
  const queryClient = useQueryClient()

  const { data: chaves = [], isLoading: loading } = useQuery<Chave[]>({
    queryKey: ['chaves'],
    queryFn: async () => {
      const res = await fetch('/api/chaves')
      const data = await res.json()
      return Array.isArray(data) ? data : []
    },
  })

  const gerarMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/chaves', { method: 'POST' })
      if (!res.ok) throw new Error('Erro ao gerar chave')
      return res.json() as Promise<Chave>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chaves'] })
    },
  })

  return {
    chaves,
    loading,
    gerar: gerarMutation.mutate,
    gerando: gerarMutation.isPending,
    ultimaGerada: gerarMutation.data ?? null,
  }
}
