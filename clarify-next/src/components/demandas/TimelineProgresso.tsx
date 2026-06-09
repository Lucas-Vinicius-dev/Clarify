'use client';

import { Check } from 'lucide-react';
import type { StatusDemanda } from '@/types';

interface TimelineProgressoProps {
  status: StatusDemanda;
}

const PASSOS = [
  { chave: 'pendente' as const, rotulo: 'Recebida' },
  { chave: 'em_analise' as const, rotulo: 'Em análise' },
  { chave: 'requer_ajuste' as const, rotulo: 'Resolução' },
  { chave: 'concluido' as const, rotulo: 'Concluída' },
];

function indiceDoStatus(status: StatusDemanda): number {
  switch (status) {
    case 'pendente': return 0;
    case 'em_analise': return 1;
    case 'requer_ajuste': return 2;
    case 'concluido': return 3;
  }
}

export function TimelineProgresso({ status }: TimelineProgressoProps) {
  const atual = indiceDoStatus(status);

  return (
    <div className="flex items-start gap-0">
      {PASSOS.map((passo, i) => {
        const isDone = i < atual;
        const isCurrent = i === atual;

        let classe = '';
        if (isDone) classe = 'is-done';
        else if (isCurrent) classe = 'is-current';

        return (
          <div key={passo.chave} className={`modal-timeline-step ${classe}`}>
            <div className="modal-timeline-dot">
              {isDone && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <p className="modal-timeline-label">{passo.rotulo}</p>
          </div>
        );
      })}
    </div>
  );
}
