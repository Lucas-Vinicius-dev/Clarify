import { UserX, UserCheck } from 'lucide-react';
import type { UsuarioLogado } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface CardAlunoProps {
  aluno: UsuarioLogado;
  demandasEmAberto: number;
  onDesativar?: (id: string) => void;
  onReativar?: (id: string) => void;
}

export function CardAluno({ aluno, demandasEmAberto, onDesativar, onReativar }: CardAlunoProps) {
  const ativo = aluno.ativo !== false;
  const iniciais = aluno.nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');

  return (
    <Card className={cn("p-5 transition-transform duration-200 ease-out", ativo ? "hover:-translate-y-1" : "opacity-60")}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-700 dark:text-slate-300 font-bold text-sm shrink-0">
          {iniciais}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 truncate">{aluno.nome}</h3>
            {!ativo && <Badge variant="default">Inativo</Badge>}
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-400 truncate">{aluno.email}</p>
        </div>
      </div>
      <div className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
        <p className="truncate">
          <span className="font-semibold text-gray-800 dark:text-slate-200">Nome:</span> {aluno.nome}
        </p>
        <p>
          <span className="font-semibold text-gray-800 dark:text-slate-200">Matrícula:</span>
          <Badge variant="blue" className="ml-1">{aluno.matricula}</Badge>
        </p>
        <p>
          <span className="font-semibold text-gray-800 dark:text-slate-200">Demandas em aberto:</span>
          <Badge variant="blue" className="ml-1">{demandasEmAberto}</Badge>
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {ativo && onDesativar && (
          <button
            type="button"
            onClick={() => onDesativar(aluno.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors cursor-pointer bg-transparent"
          >
            <UserX className="w-3.5 h-3.5" />
            Desativar
          </button>
        )}
        {!ativo && onReativar && (
          <button
            type="button"
            onClick={() => onReativar(aluno.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 dark:border-green-900/50 px-3 py-2 text-xs font-semibold text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors cursor-pointer bg-transparent"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Reativar
          </button>
        )}
      </div>
    </Card>
  );
}