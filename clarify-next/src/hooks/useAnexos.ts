'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Anexo } from '@/types'

function mapRow(row: Record<string, unknown>): Anexo {
  return {
    id: row.id as string,
    demandaId: row.demandaId as string,
    nomeArquivo: row.nomeArquivo as string,
    caminho: row.caminho as string,
    contentType: row.contentType as string,
    tamanhoBytes: row.tamanhoBytes as number,
    urlAssinada: row.urlAssinada as string | undefined,
    createdAt: row.createdAt as string,
  }
}

export function useAnexos(protocolo: string | null) {
  const queryClient = useQueryClient()
  const queryKey = ['anexos', protocolo] as const

  const { data: anexos = [], isLoading: loading } = useQuery({
    queryKey,
    enabled: !!protocolo,
    queryFn: async () => {
      const res = await fetch(`/api/demandas/${protocolo}/anexos`)
      const data = await res.json()
      return (data ?? []).map(mapRow) as Anexo[]
    },
  })

  const uploadMutation = useMutation({
    mutationFn: async ({ arquivos }: { arquivos: File[] }) => {
      const formData = new FormData()
      arquivos.forEach((file) => formData.append('arquivos', file))
      const res = await fetch(`/api/demandas/${protocolo}/anexos`, {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (!json.ok) {
        return { criados: [] as Anexo[], erros: json.erros ?? [json.mensagem] }
      }
      return {
        criados: (json.data as Record<string, unknown>[]).map(mapRow) as Anexo[],
        erros: json.erros ?? [],
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anexos', protocolo] })
    },
  })

  const removerMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/demandas/${protocolo}/anexos/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anexos', protocolo] })
    },
  })

  return {
    anexos,
    loading,
    upload: (arquivos: File[]) => uploadMutation.mutateAsync({ arquivos }),
    remover: (id: string) => removerMutation.mutateAsync(id),
    subindo: uploadMutation.isPending,
  }
}
