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
export type TipoDemanda =
  | 'Quebra de Pré-requisito'
  | 'Revisão de Prova'
  | 'Aproveitamento de Horas AC'
  | 'Trancamento de Disciplina'
  | 'Troca de Turma'
  | 'Solicitação de Histórico'
  | 'Justificativa de Falta';

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

