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
 * Usuário logado (sem senha)
 */
export type UsuarioLogado = {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  cargo: Cargo;
  telefone?: string;
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
  camposExtras?: Record<string, string>;
  status: StatusDemanda;
  dataCriacao: string;
  dataAtualizacao: string;
  feedback: string;
  dataExpiracao?: string;
  aluno?: { nome: string; matricula: string };
}

/**
 * Anexo de uma demanda
 */
export interface Anexo {
  id: string;
  demandaId: string;
  nomeArquivo: string;
  caminho: string;
  contentType: string;
  tamanhoBytes: number;
  urlAssinada?: string;
  createdAt: string;
}

/**
 * Limites e tipos permitidos para anexos
 */
export const ANEXO_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const ANEXO_MAX_QTD = 5;
export const ANEXO_TIPOS_PERMITIDOS = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
] as const;

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
