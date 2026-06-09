'use client';

import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { obterLabelStatus, obterCorStatus, formatarData } from '@/lib/utils';
import type { Demanda } from '@/types';

interface CardDemandaProps {
  demanda: Demanda;
  onVerDetalhes: (protocolo: string) => void;
}

export function CardDemanda({ demanda, onVerDetalhes }: CardDemandaProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all">
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

      <div className="min-w-0">
        <h3 className="text-base font-bold text-gray-900 break-words [overflow-wrap:anywhere]">
          {demanda.tipo}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 break-words [overflow-wrap:anywhere]">
          {demanda.descricao}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatarData(demanda.dataCriacao)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {formatarData(demanda.dataAtualizacao)}
        </span>
      </div>

      {demanda.feedback && (
        <div className="text-xs bg-gray-50 border border-gray-100 rounded-md p-2 text-gray-700">
          <strong className="text-gray-900">Observação:</strong> {demanda.feedback}
        </div>
      )}

      <button
        type="button"
        onClick={() => onVerDetalhes(demanda.protocolo)}
        className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-primary uppercase tracking-widest hover:underline self-start cursor-pointer bg-transparent border-none"
      >
        Ver Detalhes
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </article>
  );
}
