import type { Turma } from '@/types';

interface CardTurmaProps {
  turma: Turma;
}

export function CardTurma({ turma }: CardTurmaProps) {
  const qtd = turma.alunos.length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{turma.nome}</h3>
          <p className="text-sm text-gray-500">{turma.disciplina}</p>
        </div>
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700 whitespace-nowrap">
          {qtd} aluno{qtd !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">ID:</span> {turma.id}
      </div>
    </div>
  );
}
