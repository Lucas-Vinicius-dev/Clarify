'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Demanda, StatusDemanda, TipoDemanda } from '@/types'

export interface UseDemandasOptions {
  alunoId?: string
  status?: StatusDemanda
}

export interface UseDemandasReturn {
  demandas: Demanda[]
  loading: boolean
  criar: (dados: {
    alunoId: string
    tipo: TipoDemanda
    descricao: string
  }) => Promise<Demanda | null>
  buscarPorProtocolo: (protocolo: string) => Promise<Demanda | null>
  atualizarStatus: (
    protocolo: string,
    novoStatus: StatusDemanda,
    feedback?: string
  ) => Promise<Demanda | null>
  recarregar: () => void
  filtrar: (filtros: Partial<UseDemandasOptions>) => Demanda[]
}

function mapRow(row: Record<string, unknown>): Demanda {
  return {
    id: row.id as string,
    protocolo: row.protocolo as string,
    alunoId: row.aluno_id as string,
    tipo: row.tipo as TipoDemanda,
    descricao: row.descricao as string,
    status: row.status as StatusDemanda,
    dataCriacao: row.data_criacao as string,
    dataAtualizacao: row.data_atualizacao as string,
    feedback: (row.feedback as string) ?? '',
  }
}

export function useDemandas(opcoes?: UseDemandasOptions): UseDemandasReturn {
  const [demandas, setDemandas] = useState<Demanda[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const params = new URLSearchParams()
      if (opcoes?.alunoId) params.set('alunoId', opcoes.alunoId)
      if (opcoes?.status) params.set('status', opcoes.status)

      const res = await fetch(`/api/demandas?${params}`)
      const data = await res.json()
      if (!cancelled) {
        setDemandas((data ?? []).map(mapRow))
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [opcoes?.alunoId, opcoes?.status, refreshKey])

  const recarregar = useCallback(() => {
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }, [])

  const criar = useCallback(
    async (dados: { alunoId: string; tipo: TipoDemanda; descricao: string }) => {
      const res = await fetch('/api/demandas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      const json = await res.json()
      if (!json.ok || !json.data) return null

      const mapped = mapRow(json.data)
      setDemandas((prev) => [mapped, ...prev])
      return mapped
    },
    []
  )

  const buscarPorProtocolo = useCallback(async (protocolo: string) => {
    const res = await fetch(`/api/demandas/${protocolo}`)
    if (!res.ok) return null
    const data = await res.json()
    return mapRow(data)
  }, [])

  const atualizarStatus = useCallback(
    async (protocolo: string, novoStatus: StatusDemanda, feedback?: string) => {
      const res = await fetch(`/api/demandas/${protocolo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus, feedback }),
      })
      const json = await res.json()
      if (!json.ok || !json.data) return null

      const mapped = mapRow(json.data)
      setDemandas((prev) =>
        prev.map((d) => (d.protocolo === protocolo ? mapped : d))
      )
      return mapped
    },
    []
  )

  const filtrar = useCallback(
    (filtros: Partial<UseDemandasOptions>) => {
      let resultado = demandas
      if (filtros.alunoId) {
        resultado = resultado.filter((d) => d.alunoId === filtros.alunoId)
      }
      if (filtros.status) {
        resultado = resultado.filter((d) => d.status === filtros.status)
      }
      return resultado
    },
    [demandas]
  )

  return {
    demandas,
    loading,
    criar,
    buscarPorProtocolo,
    atualizarStatus,
    recarregar,
    filtrar,
  }
}
