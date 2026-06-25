'use client';

import { Clock } from 'lucide-react';
import { obterLabelStatus, obterCorStatus, formatarData } from '@/lib/utils';
import type { Demanda } from '@/types';

interface CardHistoricoProps {
  demanda: Demanda;
}

export function CardHistorico({ demanda }: CardHistoricoProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-500 tracking-wider">
          #{demanda.protocolo}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${obterCorStatus(demanda.status)}`}
        >
          {obterLabelStatus(demanda.status)}
        </span>
      </div>
      <h4 className="text-sm font-bold text-gray-900 break-words [overflow-wrap:anywhere]">
        {demanda.tipo}
      </h4>
      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
        <Clock className="w-3.5 h-3.5" />
        Concluído em {formatarData(demanda.dataAtualizacao)}
      </span>
    </article>
  );
}
