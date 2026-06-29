import { Pencil, Trash2 } from 'lucide-react';
import type { Turma } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface CardTurmaProps {
  turma: Turma;
  onEditar?: (turma: Turma) => void;
  onExcluir?: (id: string) => void;
}

export function CardTurma({ turma, onEditar, onExcluir }: CardTurmaProps) {
  const qtd = turma.alunos.length;

  return (
    <Card className="p-5 hover:-translate-y-1 transition-transform duration-200 ease-out">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{turma.nome}</h3>
          <p className="text-sm text-gray-500">{turma.disciplina}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="orange">
            {qtd} aluno{qtd !== 1 ? 's' : ''}
          </Badge>
          {onEditar && (
            <button
              type="button"
              onClick={() => onEditar(turma)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-colors cursor-pointer"
              title="Editar turma"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onExcluir && (
            <button
              type="button"
              onClick={() => onExcluir(turma.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Excluir turma"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">ID:</span> {turma.id}
      </div>
    </Card>
  );
}
