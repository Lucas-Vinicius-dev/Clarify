'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
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
  recarregar: () => Promise<void>
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
  const supabase = createClient()
  const [demandas, setDemandas] = useState<Demanda[]>([])
  const [loading, setLoading] = useState(true)

  const recarregar = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('demandas').select('*')

    if (opcoes?.alunoId) query = query.eq('aluno_id', opcoes.alunoId)
    if (opcoes?.status) query = query.eq('status', opcoes.status)

    const { data } = await query.order('created_at', { ascending: false })
    setDemandas((data ?? []).map(mapRow))
    setLoading(false)
  }, [supabase, opcoes?.alunoId, opcoes?.status])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const criar = useCallback(
    async (dados: { alunoId: string; tipo: TipoDemanda; descricao: string }) => {
      const { data: protocolo } = await supabase.rpc('gerar_proximo_protocolo')
      if (!protocolo) return null

      const { data } = await supabase
        .from('demandas')
        .insert({
          protocolo,
          aluno_id: dados.alunoId,
          tipo: dados.tipo,
          descricao: dados.descricao,
        })
        .select()
        .single()

      if (data) {
        const mapped = mapRow(data)
        setDemandas((prev) => [mapped, ...prev])
        return mapped
      }
      return null
    },
    [supabase]
  )

  const buscarPorProtocolo = useCallback(
    async (protocolo: string) => {
      const { data } = await supabase
        .from('demandas')
        .select('*')
        .eq('protocolo', protocolo)
        .maybeSingle()
      if (!data) return null
      return mapRow(data)
    },
    [supabase]
  )

  const atualizarStatus = useCallback(
    async (protocolo: string, novoStatus: StatusDemanda, feedback?: string) => {
      const updateData: Record<string, string> = {
        status: novoStatus,
        data_atualizacao: new Date().toISOString().split('T')[0],
      }
      if (feedback !== undefined) updateData.feedback = feedback

      const { data } = await supabase
        .from('demandas')
        .update(updateData)
        .eq('protocolo', protocolo)
        .select()
        .single()

      if (data) {
        const mapped = mapRow(data)
        setDemandas((prev) =>
          prev.map((d) => (d.protocolo === protocolo ? mapped : d))
        )
        return mapped
      }
      return null
    },
    [supabase]
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
