import type { UsuarioLogado } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface CardAlunoProps {
  aluno: UsuarioLogado;
  demandasEmAberto: number;
  onRemover?: (matricula: string) => void;
}

export function CardAluno({ aluno, demandasEmAberto, onRemover }: CardAlunoProps) {
  const iniciais = aluno.nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  return (
    <Card className="p-5 hover:-translate-y-1 transition-transform duration-200 ease-out">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm shrink-0">
          {iniciais}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{aluno.nome}</h3>
          <p className="text-xs text-gray-400 truncate">{aluno.email}</p>
        </div>
      </div>
      <div className="grid gap-2 text-sm text-gray-600">
        <p className="truncate">
          <span className="font-semibold text-gray-800">Nome:</span> {aluno.nome}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Matrícula:</span>
          <Badge variant="blue" className="ml-1">{aluno.matricula}</Badge>
        </p>
        <p>
          <span className="font-semibold text-gray-800">Demandas em aberto:</span>
          <Badge variant="blue" className="ml-1">{demandasEmAberto}</Badge>
        </p>
      </div>

      {onRemover && (
        <button
          type="button"
          onClick={() => onRemover(aluno.matricula)}
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          Remover aluno
        </button>
      )}
    </Card>
  );
}