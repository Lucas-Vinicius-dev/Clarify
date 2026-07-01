'use client';

import { CardAluno } from '@/components/coordenador/CardAluno';
import type { Demanda, UsuarioLogado } from '@/types';

interface ListaAlunosProps {
  alunos: UsuarioLogado[];
  demandas: Demanda[];
  onRemover: (matricula: string) => void;
}

export function ListaAlunos({ alunos, demandas, onRemover }: ListaAlunosProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Alunos</h2>
      {alunos.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-slate-400">
          <p className="text-sm">Nenhum aluno cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alunos.map((aluno) => (
            <CardAluno
              key={aluno.id}
              aluno={aluno}
              demandasEmAberto={demandas.filter(
                (d) => d.alunoId === aluno.id && d.status !== 'concluido'
              ).length}
              onRemover={onRemover}
            />
          ))}
        </div>
      )}
    </section>
  );
}
