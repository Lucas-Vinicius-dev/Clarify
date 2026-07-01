'use client';

import { Plus } from 'lucide-react';

interface CardNovaDemandaProps {
  onClick: () => void;
}

export function CardNovaDemanda({ onClick }: CardNovaDemandaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-slate-400 hover:border-brand-primary hover:text-brand-primary hover:bg-white dark:hover:bg-slate-800 transition-colors min-h-[180px] cursor-pointer bg-transparent w-full"
    >
      <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
        <Plus className="w-5 h-5" />
      </span>
      <span className="text-sm font-bold">Nova Solicitação</span>
      <span className="text-xs">Abra uma nova demanda acadêmica</span>
    </button>
  );
}
