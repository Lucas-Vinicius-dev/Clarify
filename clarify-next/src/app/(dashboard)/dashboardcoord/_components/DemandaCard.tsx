'use client';

import type { Demanda } from '@/types';

interface DemandaCardProps {
  demanda: Demanda;
  onVerDetalhes: (protocolo: string) => void;
  onAprovar: (protocolo: string) => void;
  onReprovar: (protocolo: string) => void;
}

export function DemandaCard({ demanda: d, onVerDetalhes, onAprovar, onReprovar }: DemandaCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full">
      <button
        type="button"
        onClick={() => onVerDetalhes(d.protocolo)}
        className="text-left w-full cursor-pointer bg-transparent border-none p-0"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{d.tipo}</h3>
            {d.aluno?.nome && (
              <p className="text-sm text-gray-600 font-medium">{d.aluno.nome}</p>
            )}
            <p className="text-sm text-gray-500 line-clamp-2">{d.descricao}</p>
          </div>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${
            d.status === 'pendente' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' :
            d.status === 'em_analise' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' :
            'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200'
          }`}>
            {d.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="grid gap-1 text-sm text-gray-500 dark:text-slate-400">
          <p><span className="font-semibold text-gray-800 dark:text-slate-200">Protocolo:</span> {d.protocolo}</p>
        </div>
      </button>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onAprovar(d.protocolo)}
          className="flex-1 bg-brand-primary text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors cursor-pointer border-none"
        >
          Aprovar
        </button>
        <button
          type="button"
          onClick={() => onReprovar(d.protocolo)}
          className="flex-1 bg-gray-900 dark:bg-slate-700 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors cursor-pointer border-none"
        >
          Reprovar
        </button>
      </div>
    </div>
  );
}
