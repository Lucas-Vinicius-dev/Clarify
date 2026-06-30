// ═════════════════════════════════════════════════════════════════
// LIB: UTILS
// Funções utilitárias genéricas
// ═════════════════════════════════════════════════════════════════

import type { StatusDemanda } from '@/types';

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
    pendente: 'bg-yellow-100 text-yellow-800',
    em_analise: 'bg-blue-100 text-blue-800',
    requer_ajuste: 'bg-orange-100 text-orange-800',
    concluido: 'bg-green-100 text-green-800',
  };
  return cores[status];
}

// Concatena classes CSS (similar a clsx/classnames)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validarSenhaForca(senha: string): {
  valido: boolean; erros: string[]; forca: 'fraca' | 'media' | 'forte'
} {
  const erros: string[] = []
  if (senha.length < 6) erros.push('Mínimo de 6 caracteres')

  const criterios = [
    senha.length >= 8,
    /[0-9]/.test(senha),
    /[^a-zA-Z0-9]/.test(senha),
    /[A-Z]/.test(senha),
    /[a-z]/.test(senha),
  ]
  const pontos = criterios.filter(Boolean).length

  const forca = pontos <= 2 ? 'fraca' : pontos <= 4 ? 'media' : 'forte'

  return { valido: erros.length === 0, erros, forca }
}
