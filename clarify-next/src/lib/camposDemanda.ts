import type { TipoDemanda } from '@/types'

export type CampoExtra = {
  name: string
  label: string
  type: 'text' | 'date' | 'number' | 'textarea'
  placeholder?: string
}

export function montarCamposExtras(
  tipo: TipoDemanda,
  valores: Record<string, string> | undefined,
): Record<string, string> {
  return Object.fromEntries(
    (CAMPOS_POR_TIPO[tipo] ?? []).map((campo) => [campo.name, (valores?.[campo.name] ?? '').trim()]),
  )
}

export const CAMPOS_POR_TIPO: Partial<Record<TipoDemanda, CampoExtra[]>> = {
  'Quebra de Pré-requisito': [
    { name: 'disciplinaAlvo', label: 'Disciplina alvo', type: 'text', placeholder: 'Disciplina cujo pré-requisito será quebrado' },
  ],
  'Revisão de Prova': [
    { name: 'disciplina', label: 'Disciplina', type: 'text' },
    { name: 'dataProva', label: 'Data da prova', type: 'date' },
  ],
  'Aproveitamento de Horas AC': [
    { name: 'cargaHoraria', label: 'Carga horária (horas)', type: 'number', placeholder: 'Ex.: 20' },
    { name: 'atividade', label: 'Atividade realizada', type: 'textarea', placeholder: 'Descreva a atividade complementar' },
  ],
  'Trancamento de Disciplina': [
    { name: 'disciplina', label: 'Disciplina', type: 'text' },
  ],
  'Troca de Turma': [
    { name: 'turmaOrigem', label: 'Turma de origem', type: 'text' },
    { name: 'turmaDestino', label: 'Turma de destino', type: 'text' },
  ],
  'Solicitação de Histórico': [
    { name: 'periodo', label: 'Período desejado', type: 'text', placeholder: 'Ex.: 2025.1' },
  ],
  'Justificativa de Falta': [
    { name: 'disciplina', label: 'Disciplina', type: 'text' },
    { name: 'datas', label: 'Data(s) da falta', type: 'text', placeholder: 'Separe múltiplas datas por vírgula' },
    { name: 'motivo', label: 'Motivo', type: 'textarea' },
  ],
  'Transferência': [
    { name: 'instituicaoDestino', label: 'Instituição de destino', type: 'text', placeholder: 'Ex.: UFRJ' },
    { name: 'motivo', label: 'Motivo', type: 'textarea' },
  ],
  'Segunda Chamada': [
    { name: 'disciplina', label: 'Disciplina', type: 'text' },
    { name: 'dataProva', label: 'Data da prova', type: 'date' },
    { name: 'motivo', label: 'Motivo', type: 'textarea' },
  ],
}
