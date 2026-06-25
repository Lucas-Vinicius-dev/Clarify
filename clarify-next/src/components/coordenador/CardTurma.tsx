import type { Turma } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface CardTurmaProps {
  turma: Turma;
}

export function CardTurma({ turma }: CardTurmaProps) {
  const qtd = turma.alunos.length;

  return (
    <Card className="p-5 hover:-translate-y-1 transition-transform duration-200 ease-out">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{turma.nome}</h3>
          <p className="text-sm text-gray-500">{turma.disciplina}</p>
        </div>
        <Badge variant="orange">
          {qtd} aluno{qtd !== 1 ? 's' : ''}
        </Badge>
      </div>
      <div className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">ID:</span> {turma.id}
      </div>
    </Card>
  );
}