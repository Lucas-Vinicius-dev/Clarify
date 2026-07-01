// ═════════════════════════════════════════════════════════════════
// LIB: UTILS
// Funções utilitárias genéricas
// ═════════════════════════════════════════════════════════════════

import type { Demanda, StatusDemanda } from '@/types';

// Formata uma data ISO ("2025-11-12") para "12 Nov 2025"
export function formatarData(dataISO: string): string {
  if (!dataISO) return '';

  const meses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const [ano, mes, dia] = dataISO.split('-');
  return `${dia} ${meses[Number(mes) - 1]} ${ano}`;
}

// Valida formato de email
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Valida matrícula (geralmente números)
export function validarMatricula(matricula: string): boolean {
  return /^\d+$/.test(String(matricula).trim());
}

// Obtém o label traduzido de um status
export function obterLabelStatus(status: StatusDemanda): string {
  const labels: Record<StatusDemanda, string> = {
    pendente: 'Pendente',
    em_analise: 'Em análise',
    requer_ajuste: 'Requer ajuste',
    concluido: 'Concluído',
  };
  return labels[status];
}

// Obtém a cor (Tailwind) de um status
export function obterCorStatus(status: StatusDemanda): string {
  const cores: Record<StatusDemanda, string> = {
    pendente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
    em_analise: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    requer_ajuste: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
    concluido: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  };
  return cores[status];
}

// SLA de atendimento de uma demanda, em dias a partir da criação. Calibrar conforme a realidade.
export const PRAZO_DIAS = 30;
// Janela final em que a demanda passa a ser sinalizada como perto do prazo.
export const LIMITE_ALERTA_DIAS = 7;

// Data de expiração derivada: criação + PRAZO_DIAS.
export function dataExpiracao(demanda: Demanda): Date {
  const data = new Date(demanda.dataCriacao);
  data.setDate(data.getDate() + PRAZO_DIAS);
  return data;
}

// Dias restantes até expirar (negativo quando já venceu).
export function diasParaExpirar(demanda: Demanda): number {
  return Math.ceil((dataExpiracao(demanda).getTime() - Date.now()) / 86400000);
}

// Demanda em aberto e dentro da janela de alerta.
export function pertoDaExpiracao(demanda: Demanda): boolean {
  return demanda.status !== 'concluido' && diasParaExpirar(demanda) <= LIMITE_ALERTA_DIAS;
}

// Concatena classes CSS (similar a clsx/classnames)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
