// ═════════════════════════════════════════════════════════════════
// LIB: LOCALSTORAGE
// Inicialização e seed de dados do sistema
// ═════════════════════════════════════════════════════════════════

import { criarChaves } from './auth';
import { normalizarDemandasStorage, normalizarUsuariosStorage } from './storageMigrations';
import { STORAGE_KEYS } from './storageKeys';
import type { Usuario, Demanda } from '@/types';

/**
 * Dados de teste: usuários
 */
const USUARIOS_TESTE: Usuario[] = [
  {
    nome: 'João da Silva',
    matricula: '123',
    email: 'joao@academico.edu.br',
    senha: '123456',
    cargo: 'coordenador',
    alunosCadastrados: ['003', '456'],
    usuariosCadastrados: ['003', '456'],
  },
  {
    nome: 'Maria Aparecida',
    matricula: '003',
    email: 'maria@academico.edu.br',
    senha: '123456',
    cargo: 'aluno',
    coordenador: '123',
  },
  {
    nome: 'Carlos Eduardo',
    matricula: '456',
    email: 'carlos@academico.edu.br',
    senha: '123456',
    cargo: 'aluno',
    coordenador: '123',
  },
];

/**
 * Dados de teste: demandas
 */
const DEMANDAS_TESTE: Demanda[] = [
  {
    protocolo: 'REQ-402',
    matriculaAluno: '003',
    tipo: 'Quebra de Pré-requisito',
    descricao: 'Solicitação para cursar Cálculo III sem a aprovação em Cálculo II.',
    status: 'pendente',
    dataCriacao: '2025-11-12',
    dataAtualizacao: '2025-11-12',
    feedback: '',
  },
  {
    protocolo: 'REQ-398',
    matriculaAluno: '003',
    tipo: 'Revisão de Prova',
    descricao:
      'Discordância em relação à correção da questão 4 da prova de Banco de Dados.',
    status: 'em_analise',
    dataCriacao: '2025-11-08',
    dataAtualizacao: '2026-05-04',
    feedback: '',
  },
  {
    protocolo: 'REQ-385',
    matriculaAluno: '003',
    tipo: 'Aproveitamento de Horas AC',
    descricao:
      'Envio de certificados de cursos extracurriculares para integralização.',
    status: 'pendente',
    dataCriacao: '2025-11-02',
    dataAtualizacao: '2025-11-02',
    feedback: '',
  },
  {
    protocolo: 'REQ-350',
    matriculaAluno: '003',
    tipo: 'Trancamento de Disciplina',
    descricao: 'Pedido de trancamento da disciplina de Sistemas Operacionais.',
    status: 'concluido',
    dataCriacao: '2025-10-15',
    dataAtualizacao: '2025-10-25',
    feedback:
      'Trancamento aprovado. Disciplina removida do histórico do semestre.',
  },
  {
    protocolo: 'REQ-342',
    matriculaAluno: '003',
    tipo: 'Troca de Turma',
    descricao:
      'Mudança da turma da manhã para a turma da noite por motivo de trabalho.',
    status: 'em_analise',
    dataCriacao: '2025-10-12',
    dataAtualizacao: '2025-10-22',
    feedback: '',
  },
  {
    protocolo: 'REQ-320',
    matriculaAluno: '003',
    tipo: 'Solicitação de Histórico',
    descricao: 'Emissão do histórico escolar atualizado para fins de estágio.',
    status: 'concluido',
    dataCriacao: '2025-10-05',
    dataAtualizacao: '2025-10-15',
    feedback: 'Documento disponível para retirada na secretaria.',
  },
  {
    protocolo: 'REQ-310',
    matriculaAluno: '003',
    tipo: 'Justificativa de Falta',
    descricao:
      'Atestado médico referente às faltas dos dias 22 e 23 de setembro.',
    status: 'requer_ajuste',
    dataCriacao: '2025-09-25',
    dataAtualizacao: '2025-09-30',
    feedback: 'Atestado precisa estar legível e conter o CID. Reenviar.',
  },
];

/**
 * Popula o localStorage com dados de teste
 * Deve ser chamada uma única vez, idealmente no Initializer
 */
export function popularLocalStorage(): void {
  if (typeof window === 'undefined') return;

  migrarLocalStorageLegado();

  // Só popular se ainda não foi
  if (localStorage.getItem(STORAGE_KEYS.usuarios)) return;

  localStorage.setItem(STORAGE_KEYS.usuarios, JSON.stringify(USUARIOS_TESTE));
  popularDemandas();
  inicializarTurmas();
  // criarChaves() retorna o array criado, mas aqui só precisamos popular o storage
  criarChaves();
}

/**
 * Popula o localStorage com demandas de teste
 */
function popularDemandas(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.demandas, JSON.stringify(DEMANDAS_TESTE));
}

/**
 * Migra dados antigos para o schema atual sem apagar a sessão do usuário
 */
function migrarLocalStorageLegado(): void {
  if (typeof window === 'undefined') return;

  const usuariosRaw = localStorage.getItem(STORAGE_KEYS.usuarios);
  if (usuariosRaw) {
    const usuariosNormalizados = normalizarUsuariosStorage(JSON.parse(usuariosRaw));
    localStorage.setItem(STORAGE_KEYS.usuarios, JSON.stringify(usuariosNormalizados));
  }

  const demandasRaw = localStorage.getItem(STORAGE_KEYS.demandas);
  if (demandasRaw) {
    const demandasNormalizadas = normalizarDemandasStorage(JSON.parse(demandasRaw));
    localStorage.setItem(STORAGE_KEYS.demandas, JSON.stringify(demandasNormalizadas));
  }
}

/**
 * Inicializa o array de turmas vazio
 */
function inicializarTurmas(): void {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.turmas)) {
    localStorage.setItem(STORAGE_KEYS.turmas, JSON.stringify([]));
  }
}
