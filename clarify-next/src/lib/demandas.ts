import { createClient } from '@/lib/supabase/client'
import type { Demanda, StatusDemanda, TipoDemanda } from '@/types'

export async function gerarProximoProtocolo(): Promise<string> {
  const supabase = createClient()
  const { data } = await supabase.rpc('gerar_proximo_protocolo')
  return data ?? 'REQ-0'
}

export async function criarDemanda(dados: {
  alunoId: string
  tipo: TipoDemanda
  descricao: string
}): Promise<Demanda | null> {
  const supabase = createClient()
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

  if (!data) return null

  return mapDemandaRow(data)
}

export async function buscarDemandasPorAluno(alunoId: string): Promise<Demanda[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('demandas')
    .select('*')
    .eq('aluno_id', alunoId)
    .order('created_at', { ascending: false })
  return (data ?? []).map(mapDemandaRow)
}

export async function buscarDemandaPorProtocolo(protocolo: string): Promise<Demanda | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('demandas')
    .select('*')
    .eq('protocolo', protocolo)
    .maybeSingle()
  if (!data) return null
  return mapDemandaRow(data)
}

export async function atualizarStatusDemanda(
  protocolo: string,
  novoStatus: StatusDemanda,
  feedback?: string
): Promise<Demanda | null> {
  const supabase = createClient()
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

  if (!data) return null
  return mapDemandaRow(data)
}

export async function buscarTodasDemandas(): Promise<Demanda[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('demandas')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []).map(mapDemandaRow)
}

export async function listarDemandasDoCoordenador(coordenadorId: string): Promise<Demanda[]> {
  const supabase = createClient()
  const { data: alunos } = await supabase
    .from('profiles')
    .select('id')
    .eq('coordenador_id', coordenadorId)

  const alunoIds = alunos?.map((a) => a.id) ?? []
  if (alunoIds.length === 0) return []

  const { data } = await supabase
    .from('demandas')
    .select('*')
    .in('aluno_id', alunoIds)
    .order('created_at', { ascending: false })

  return (data ?? []).map(mapDemandaRow)
}

function mapDemandaRow(row: Record<string, unknown>): Demanda {
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
