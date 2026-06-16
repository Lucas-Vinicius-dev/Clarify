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
 * Usuário completo (com senha)
 */
export interface Usuario {
  nome: string;
  matricula: string;
  email: string;
  senha: string;
  cargo: Cargo;
  coordenador?: string;
  alunosCadastrados?: string[];
  usuariosCadastrados?: string[]; // matrículas vinculadas ao coordenador
}

/**
 * Usuário logado (sem senha)
 */
export type UsuarioLogado = Omit<Usuario, 'senha'>;

/**
 * Demanda de um aluno
 */
export interface Demanda {
  protocolo: string; // ex: "REQ-402"
  matriculaAluno: string;
  tipo: TipoDemanda;
  descricao: string;
  status: StatusDemanda;
  dataCriacao: string; // ISO: "2025-11-12"
  dataAtualizacao: string;
  feedback: string;
}

/**
 * Turma de disciplina
 */
export interface Turma {
  id: string; // "turma_<timestamp>_<random>"
  nome: string;
  disciplina: string;
  alunos: string[]; // matrículas
  coordenador: string; // matrícula do coord
  criadaEm: string; // ISO datetime
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
  usuario?: UsuarioLogado;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextValue {
  usuario: UsuarioLogado | null;
  isAuthenticated: boolean;
  login: (matricula: string, senha: string) => AuthResponse;
  logout: () => void;
  registro: (dados: RegistroDados) => AuthResponse;
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

/**
 * Constante: tipos de demanda disponíveis
 */
export const TIPOS_DEMANDA: TipoDemanda[] = [
  'Quebra de Pré-requisito',
  'Revisão de Prova',
  'Aproveitamento de Horas AC',
  'Trancamento de Disciplina',
  'Troca de Turma',
  'Solicitação de Histórico',
  'Justificativa de Falta',
];
