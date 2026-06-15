// ═════════════════════════════════════════════════════════════════
// LIB: DEMANDAS
// CRUD e funções de demandas do sistema
// ═════════════════════════════════════════════════════════════════

import type { Demanda, StatusDemanda, TipoDemanda } from '@/types';
import { normalizarDemandasStorage } from './storageMigrations';
import { STORAGE_KEYS } from './storageKeys';

function lerDemandas(): Demanda[] {
  if (typeof window === 'undefined') return [];

  return normalizarDemandasStorage(JSON.parse(localStorage.getItem(STORAGE_KEYS.demandas) || '[]'));
}

function salvarDemandas(demandas: Demanda[]): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.demandas, JSON.stringify(demandas));
}

/**
 * Gera o próximo protocolo (REQ-XXX)
 */
function gerarProximoProtocolo(): string {
  if (typeof window === 'undefined') return 'REQ-0';
  
  const demandas = lerDemandas();

  let maior = 0;
  for (const demanda of demandas) {
    const numero = Number(demanda.protocolo.split('-')[1]);
    if (numero > maior) maior = numero;
  }

  return `REQ-${maior + 1}`;
}

/**
 * Cria uma nova demanda
 */
export function criarDemanda(dados: {
  matriculaAluno: string;
  tipo: TipoDemanda;
  descricao: string;
}): Demanda {
  if (typeof window === 'undefined') {
    return {} as Demanda;
  }

  const demandas = lerDemandas();

  const dataHoje = obterDataHoje();

  const novaDemanda: Demanda = {
    protocolo: gerarProximoProtocolo(),
    matriculaAluno: dados.matriculaAluno,
    tipo: dados.tipo,
    descricao: dados.descricao.trim(),
    status: 'pendente',
    dataCriacao: dataHoje,
    dataAtualizacao: dataHoje,
    feedback: '',
  };

  demandas.unshift(novaDemanda);
  salvarDemandas(demandas);

  return novaDemanda;
}

/**
 * Busca todas as demandas de um aluno
 */
export function buscarDemandasPorAluno(matricula: string): Demanda[] {
  if (typeof window === 'undefined') return [];
  
  const demandas = lerDemandas();

  return demandas.filter(
    (d) => String(d.matriculaAluno) === String(matricula)
  );
}

/**
 * Busca uma demanda específica pelo protocolo
 */
export function buscarDemandaPorProtocolo(protocolo: string): Demanda | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const demandas = lerDemandas();
  return demandas.find((d) => d.protocolo === protocolo);
}

/**
 * Atualiza o status e/ou feedback de uma demanda
 */
export function atualizarStatusDemanda(
  protocolo: string,
  novoStatus: StatusDemanda,
  feedback?: string
): Demanda | undefined {
  if (typeof window === 'undefined') return undefined;

  const demandas = lerDemandas();
  const demanda = demandas.find((d) => d.protocolo === protocolo);

  if (!demanda) return undefined;

  demanda.status = novoStatus;
  demanda.dataAtualizacao = obterDataHoje();
  if (feedback !== undefined) demanda.feedback = feedback;

  salvarDemandas(demandas);
  return demanda;
}

/**
 * Busca todas as demandas
 */
export function buscarTodasDemandas(): Demanda[] {
  if (typeof window === 'undefined') return [];
  
  return lerDemandas();
}

/**
 * Busca demandas por status
 */
export function buscarDemandasPorStatus(status: StatusDemanda): Demanda[] {
  if (typeof window === 'undefined') return [];
  
  const demandas = lerDemandas();
  return demandas.filter((d) => d.status === status);
}

/**
 * Busca demandas de um aluno com filtro de status
 */
export function buscarDemandasAlunoComStatus(
  matriculaAluno: string,
  status: StatusDemanda
): Demanda[] {
  if (typeof window === 'undefined') return [];
  
  const demandas = lerDemandas();

  return demandas.filter(
    (d) =>
      String(d.matriculaAluno) === String(matriculaAluno) && d.status === status
  );
}

/**
 * Obtém a data de hoje em formato ISO (YYYY-MM-DD)
 */
function obterDataHoje(): string {
  if (typeof window === 'undefined') {
    return new Date().toISOString().split('T')[0];
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export { obterDataHoje };
