'use client';

import { obterLabelStatus, obterCorStatus, formatarData } from '@/lib/utils';
import type { Demanda } from '@/types';

interface LinhaHistoricoProps {
  demanda: Demanda;
  onVerDetalhes?: (protocolo: string) => void;
}

export function LinhaHistorico({ demanda, onVerDetalhes }: LinhaHistoricoProps) {
  return (
    <tr
      className="border-t border-gray-100 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors"
      onClick={() => onVerDetalhes?.(demanda.protocolo)}
    >
      <td className="py-3 text-xs font-semibold text-gray-500 dark:text-slate-400">
        #{demanda.protocolo}
      </td>
      <td className="py-3 text-sm text-gray-900 dark:text-slate-100 break-words [overflow-wrap:anywhere]">
        {demanda.tipo}
      </td>
      <td className="py-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${obterCorStatus(demanda.status)}`}
        >
          {obterLabelStatus(demanda.status)}
        </span>
      </td>
      <td className="py-3 text-xs text-gray-500 dark:text-slate-400">
        {formatarData(demanda.dataAtualizacao)}
      </td>
    </tr>
  );
}
