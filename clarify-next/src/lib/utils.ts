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
