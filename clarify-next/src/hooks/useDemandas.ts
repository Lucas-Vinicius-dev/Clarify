'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Demanda, StatusDemanda, TipoDemanda } from '@/types'

export interface UseDemandasOptions {
  alunoId?: string
  status?: StatusDemanda
}

function mapRow(row: Record<string, unknown>): Demanda {
  return {
    id: row.id as string,
    protocolo: row.protocolo as string,
    alunoId: row.aluno_id as string,
    tipo: row.tipo as TipoDemanda,
    descricao: row.descricao as string,
    camposExtras: (row.campos_extras as Record<string, string>) ?? undefined,
    status: row.status as StatusDemanda,
    dataCriacao: row.data_criacao as string,
    dataAtualizacao: row.data_atualizacao as string,
    feedback: (row.feedback as string) ?? '',
  }
}

export function useDemandas(opcoes?: UseDemandasOptions) {
  const queryClient = useQueryClient()
  const queryKey = ['demandas', opcoes?.alunoId, opcoes?.status] as const

  const { data: demandas = [], isLoading: loading } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams()
      if (opcoes?.alunoId) params.set('alunoId', opcoes.alunoId)
      if (opcoes?.status) params.set('status', opcoes.status)

      const res = await fetch(`/api/demandas?${params}`)
      const data = await res.json()
      return (data ?? []).map(mapRow) as Demanda[]
    },
  })

  const criarMutation = useMutation({
    mutationFn: async (dados: { tipo: TipoDemanda; descricao: string; anexos?: File[]; camposExtras?: Record<string, string> }) => {
      const res = await fetch('/api/demandas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: dados.tipo, descricao: dados.descricao, camposExtras: dados.camposExtras }),
      })
      const json = await res.json()
      if (!json.ok || !json.data) {
        throw new Error(json.mensagem || 'Erro ao criar demanda.')
      }
      const demandaCriada = mapRow(json.data) as Demanda

      if (dados.anexos && dados.anexos.length > 0) {
        const formData = new FormData()
        dados.anexos.forEach((file) => formData.append('arquivos', file))
        await fetch(`/api/demandas/${demandaCriada.protocolo}/anexos`, {
          method: 'POST',
          body: formData,
        })
      }

      return demandaCriada
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] })
    },
  })

  const atualizarStatusMutation = useMutation({
    mutationFn: async ({
      protocolo,
      novoStatus,
      feedback,
    }: {
      protocolo: string
      novoStatus: StatusDemanda
      feedback?: string
    }) => {
      const res = await fetch(`/api/demandas/${protocolo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus, feedback }),
      })
      const json = await res.json()
      if (!json.ok || !json.data) return null
      return mapRow(json.data) as Demanda
    },
    onMutate: async ({ protocolo, novoStatus, feedback }) => {
      await queryClient.cancelQueries({ queryKey: ['demandas'] })
      const previousQueries = queryClient.getQueriesData<Demanda[]>({ queryKey: ['demandas'] })

      queryClient.setQueriesData<Demanda[]>({ queryKey: ['demandas'] }, (old) => {
        if (!old) return old
        return old.map((d) =>
          d.protocolo === protocolo
            ? { ...d, status: novoStatus, feedback: feedback ?? d.feedback }
            : d
        )
      })

      return { previousQueries }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] })
    },
  })

  const buscarPorProtocolo = async (protocolo: string): Promise<Demanda | null> => {
    const cached = queryClient.getQueryData<Demanda>(['demandas', protocolo])
    if (cached) return cached

    const res = await fetch(`/api/demandas/${protocolo}`)
    if (!res.ok) return null
    const data = await res.json()
    const mapped = mapRow(data) as Demanda
    queryClient.setQueryData(['demandas', protocolo], mapped)
    return mapped
  }

  const filtrar = (filtros: Partial<UseDemandasOptions>): Demanda[] => {
    let resultado = demandas
    if (filtros.alunoId) {
      resultado = resultado.filter((d) => d.alunoId === filtros.alunoId)
    }
    if (filtros.status) {
      resultado = resultado.filter((d) => d.status === filtros.status)
    }
    return resultado
  }

  return {
    demandas,
    loading,
    criar: criarMutation.mutateAsync,
    buscarPorProtocolo,
    atualizarStatus: (protocolo: string, novoStatus: StatusDemanda, feedback?: string) =>
      atualizarStatusMutation.mutateAsync({ protocolo, novoStatus, feedback }),
    recarregar: () => queryClient.invalidateQueries({ queryKey: ['demandas'] }),
    filtrar,
  }
}