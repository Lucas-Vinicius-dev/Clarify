'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { StatusDemanda } from '@/types';

interface BarraFiltrosProps {
  busca: string;
  status: StatusDemanda | 'todos';
  onBuscaChange: (valor: string) => void;
  onStatusChange: (status: StatusDemanda | 'todos') => void;
}

const OPCOES_STATUS: { label: string; valor: StatusDemanda | 'todos' }[] = [
  { label: 'Status: Todos', valor: 'todos' },
  { label: 'Pendente', valor: 'pendente' },
  { label: 'Em Análise', valor: 'em_analise' },
  { label: 'Requer Ajuste', valor: 'requer_ajuste' },
  { label: 'Concluído', valor: 'concluido' },
];

export function BarraFiltros({
  busca,
  status,
  onBuscaChange,
  onStatusChange,
}: BarraFiltrosProps) {
  const temFiltro = busca.trim() !== '' || status !== 'todos';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3.5 flex flex-wrap gap-2 items-center">
      <div className="flex-1 min-w-[180px] relative">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Pesquisar protocolo ou tipo..."
          className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors"
        />
      </div>

      <div className="relative">
        <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusDemanda | 'todos')}
          className="pl-8 pr-7 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm appearance-none cursor-pointer outline-none focus:border-brand-primary focus:bg-white transition-colors"
        >
          {OPCOES_STATUS.map((op) => (
            <option key={op.valor} value={op.valor}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {temFiltro && (
        <button
          type="button"
          onClick={() => { onBuscaChange(''); onStatusChange('todos'); }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary bg-transparent border-none cursor-pointer px-2 hover:underline"
        >
          <X className="w-3.5 h-3.5" />
          Limpar Filtros
        </button>
      )}
    </div>
  );
}
