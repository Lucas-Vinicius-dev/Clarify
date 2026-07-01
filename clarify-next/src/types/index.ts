// ═════════════════════════════════════════════════════════════════
// TIPOS TYPESCRIPT — Definições centralizadas de interfaces
// ═════════════════════════════════════════════════════════════════

/**
 * Cargo do usuário no sistema
 */
export type Cargo = 'aluno' | 'coordenador';

/**
 * Status de uma demanda no ciclo de vida
 */
export type StatusDemanda = 'pendente' | 'em_analise' | 'requer_ajuste' | 'concluido';

/**
 * Tipos de demanda suportados
 */
export const TIPOS_DEMANDA = [
  'Quebra de Pré-requisito',
  'Revisão de Prova',
  'Aproveitamento de Horas AC',
  'Trancamento de Disciplina',
  'Troca de Turma',
  'Solicitação de Histórico',
  'Justificativa de Falta',
  'Transferência',
  'Segunda Chamada',
] as const;

export type TipoDemanda = typeof TIPOS_DEMANDA[number];

/**
 * Tipos de campo dinâmico no formulário de demanda
 */
export type TipoCampo = 'text' | 'date' | 'number' | 'textarea';

/**
 * Definição de um campo dinâmico por tipo de solicitação
 */
export interface CampoDinamico {
  name: string;
  label: string;
  type: TipoCampo;
  required: boolean;
  placeholder?: string;
}

/**
 * Campos exibidos dinamicamente conforme o tipo de solicitação.
 * Cada chave mapeia para a lista de campos específicos daquele tipo.
 */
export const CAMPOS_POR_TIPO: Record<TipoDemanda, CampoDinamico[]> = {
  'Quebra de Pré-requisito': [
    { name: 'disciplina_alvo', label: 'Disciplina alvo', type: 'text', required: true, placeholder: 'Ex: Cálculo II' },
  ],
  'Revisão de Prova': [
    { name: 'disciplina', label: 'Disciplina', type: 'text', required: true, placeholder: 'Ex: Álgebra Linear' },
    { name: 'data_prova', label: 'Data da prova', type: 'date', required: true },
  ],
  'Aproveitamento de Horas AC': [
    { name: 'carga_horaria', label: 'Carga horária (h)', type: 'number', required: true, placeholder: 'Ex: 30' },
    { name: 'descricao_atividade', label: 'Descrição da atividade', type: 'textarea', required: true },
  ],
  'Trancamento de Disciplina': [
    { name: 'disciplina', label: 'Disciplina', type: 'text', required: true, placeholder: 'Ex: Física I' },
  ],
  'Troca de Turma': [
    { name: 'turma_origem', label: 'Turma de origem', type: 'text', required: true, placeholder: 'Ex: A1' },
    { name: 'turma_destino', label: 'Turma de destino', type: 'text', required: true, placeholder: 'Ex: A2' },
  ],
  'Solicitação de Histórico': [
    { name: 'periodo_desejado', label: 'Período desejado', type: 'text', required: true, placeholder: 'Ex: 2025.1' },
  ],
  'Justificativa de Falta': [
    { name: 'disciplina', label: 'Disciplina', type: 'text', required: true, placeholder: 'Ex: Programação I' },
    { name: 'datas_falta', label: 'Data(s) da falta', type: 'text', required: true, placeholder: 'Ex: 10/06/2026' },
    { name: 'motivo', label: 'Motivo', type: 'textarea', required: true },
  ],
  'Transferência': [
    { name: 'instituicao_destino', label: 'Instituição de destino', type: 'text', required: true, placeholder: 'Ex: UFRJ' },
    { name: 'motivo', label: 'Motivo', type: 'textarea', required: true },
  ],
  'Segunda Chamada': [
    { name: 'disciplina', label: 'Disciplina', type: 'text', required: true, placeholder: 'Ex: Cálculo I' },
    { name: 'data_prova', label: 'Data da prova', type: 'date', required: true },
    { name: 'motivo', label: 'Motivo', type: 'textarea', required: true },
  ],
};

/**
 * Usuário logado (sem senha)
 */
export type UsuarioLogado = {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  cargo: Cargo;
  coordenador_id?: string;
};

/**
 * Demanda de um aluno
 */
export interface Demanda {
  id: string;
  protocolo: string;
  alunoId: string;
  tipo: TipoDemanda;
  descricao: string;
  dados?: Record<string, string>;
  status: StatusDemanda;
  dataCriacao: string;
  dataAtualizacao: string;
  feedback: string;
}

/**
 * Turma de disciplina
 */
export interface Turma {
  id: string;
  nome: string;
  disciplina: string;
  alunos: string[];
  coordenador_id: string;
  criadaEm: string;
}

/**
 * Chave de ativação para registro de coordenadores
 */
export interface ChaveAtivacao {
  code: string;
  used: boolean;
}

/**
 * Resultado de autenticação
 */
export interface AuthResponse {
  ok: boolean;
  mensagem?: string;
  usuarioLogado?: UsuarioLogado;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextValue {
  usuario: UsuarioLogado | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (matricula: string, senha: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  registro: (dados: RegistroDados) => Promise<AuthResponse>;
}

/**
 * Dados de registro de novo usuário
 */
export interface RegistroDados {
  nome: string;
  matricula: string;
  email: string;
  senha: string;
  cargo?: Cargo;
  chaveAtivacao?: string;
}
