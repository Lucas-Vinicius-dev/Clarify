// ═════════════════════════════════════════════════════════════════
// LIB: UTILS
// Funções utilitárias genéricas
// ═════════════════════════════════════════════════════════════════

import type { StatusDemanda } from '@/types';

/**
 * Formata uma data ISO ("2025-11-12") para "12 Nov 2025"
 */
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
  const partes = dataISO.split('-');
  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];

  return `${dia} ${meses[Number(mes) - 1]} ${ano}`;
}

/**
 * Formata uma data ISO para formato BR (DD/MM/YYYY)
 */
export function formatarDataBR(dataISO: string): string {
  if (!dataISO) return '';

  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * Valida formato de email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida matrícula (geralmente números)
 */
export function validarMatricula(matricula: string): boolean {
  return /^\d+$/.test(String(matricula).trim());
}

/**
 * Valida data em formato ISO
 */
export function validarData(dataISO: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dataISO);
}

/**
 * Obtém o label traduzido de um status
 */
export function obterLabelStatus(status: StatusDemanda): string {
  const labels: Record<StatusDemanda, string> = {
    pendente: 'Pendente',
    em_analise: 'Em análise',
    requer_ajuste: 'Requer ajuste',
    concluido: 'Concluído',
  };
  return labels[status];
}

/**
 * Obtém a cor (Tailwind) de um status
 */
export function obterCorStatus(status: StatusDemanda): string {
  const cores: Record<StatusDemanda, string> = {
    pendente: 'bg-yellow-100 text-yellow-800',
    em_analise: 'bg-blue-100 text-blue-800',
    requer_ajuste: 'bg-orange-100 text-orange-800',
    concluido: 'bg-green-100 text-green-800',
  };
  return cores[status];
}

/**
 * Obtém a data de hoje em formato ISO (YYYY-MM-DD)
 */
export function obterDataHoje(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/**
 * Remove propriedades vazias de um objeto
 */
export function limparObjeto<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== '')
  ) as Partial<T>;
}

/**
 * Concatena classes CSS (similiar a clsx/classnames)
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Debounce de função
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
