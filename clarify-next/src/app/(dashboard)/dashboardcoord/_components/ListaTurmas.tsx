'use client';

import { CardTurma } from '@/components/coordenador/CardTurma';
import type { Turma } from '@/types';

interface ListaTurmasProps {
  turmas: Turma[];
  onCriarTurma: () => void;
  onEditarTurma?: (turma: Turma) => void;
  onExcluirTurma?: (id: string) => void;
}

export function ListaTurmas({ turmas, onCriarTurma, onEditarTurma, onExcluirTurma }: ListaTurmasProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Turmas</h2>
        <button
          type="button"
          onClick={onCriarTurma}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors cursor-pointer border-none"
        >
          + Criar turma
        </button>
      </div>
      {turmas.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhuma turma criada ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {turmas.map((turma) => (
            <CardTurma
              key={turma.id}
              turma={turma}
              onEditar={onEditarTurma}
              onExcluir={onExcluirTurma}
            />
          ))}
        </div>
      )}
    </section>
  );
}
