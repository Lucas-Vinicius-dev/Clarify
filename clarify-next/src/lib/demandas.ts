import type { Demanda, StatusDemanda, TipoDemanda } from '@/types'

function mapDemandaRow(row: Record<string, unknown>): Demanda {
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

export async function atualizarStatusDemanda(
  protocolo: string,
  novoStatus: StatusDemanda,
  feedback?: string
): Promise<Demanda | null> {
  const res = await fetch(`/api/demandas/${protocolo}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: novoStatus, feedback }),
  })
  const json = await res.json()
  if (!json.ok || !json.data) return null
  return mapDemandaRow(json.data)
}
