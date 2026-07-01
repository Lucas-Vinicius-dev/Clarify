'use client';

import { Clock } from 'lucide-react';
import { obterLabelStatus, obterCorStatus, formatarData } from '@/lib/utils';
import type { Demanda } from '@/types';

interface CardHistoricoProps {
  demanda: Demanda;
  onVerDetalhes?: (protocolo: string) => void;
}

export function CardHistorico({ demanda, onVerDetalhes }: CardHistoricoProps) {
  return (
    <article
      className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
      onClick={() => onVerDetalhes?.(demanda.protocolo)}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wider">
          #{demanda.protocolo}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${obterCorStatus(demanda.status)}`}
        >
          {obterLabelStatus(demanda.status)}
        </span>
      </div>
      <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">
        {demanda.tipo}
      </h4>
      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        Concluído em {formatarData(demanda.dataAtualizacao)}
      </span>
    </article>
  );
}
