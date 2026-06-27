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

        return (
          <div
            key={passo.chave}
            className={[
              "relative flex flex-col items-center flex-1 min-w-0",
              "[&+&]:before:content-[''] [&+&]:before:absolute [&+&]:before:left-[calc(-50%+14px)] [&+&]:before:right-[calc(50%+14px)] [&+&]:before:top-[13px] [&+&]:before:h-0.5 [&+&]:before:rounded-full [&+&]:before:bg-[rgba(15,23,42,0.10)]",
              isDone && "[&+&]:before:!bg-[#ca5f15]",
              isCurrent && "[&+&]:before:!bg-[linear-gradient(to_right,#ca5f15_0%,#ca5f15_60%,rgba(202,95,21,0.25)_100%)]",
            ].join(" ")}
          >
            <div
              className={[
                "w-7 h-7 rounded-full bg-white border-2 border-[rgba(15,23,42,0.15)] flex items-center justify-center transition-all duration-220 relative z-[1]",
                isDone && "!bg-[#ca5f15] !border-[#ca5f15] shadow-[0_4px_12px_-2px_rgba(202,95,21,0.35)]",
                isCurrent && "!border-[#ca5f15] bg-white shadow-[0_0_0_5px_rgba(202,95,21,0.14),_0_4px_12px_-2px_rgba(202,95,21,0.25)] animate-pulse-glow after:content-[''] after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#ca5f15]",
              ].join(" ")}
            >
              {isDone && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <p
              className={[
                "text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-[rgba(15,23,42,0.35)] mt-3 text-center leading-[1.2] transition-colors duration-220",
                isDone && "!text-[rgba(202,95,21,0.85)]",
                isCurrent && "!text-[#ca5f15]",
              ].join(" ")}
            >
              {passo.rotulo}
            </p>
          </div>
        );
      })}
    </div>
  );
}
