import { CardAluno } from '@/components/coord/CardAluno';
import type { Demanda, Usuario } from '@/types';

interface ViewAlunosProps {
  alunosDoCoord: Usuario[];
  demandas: Demanda[];
  onRemover: (matricula: string) => void;
}

/** View "Alunos" do dashboard do coordenador. */
export function ViewAlunos({ alunosDoCoord, demandas, onRemover }: ViewAlunosProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Alunos</h2>
      {alunosDoCoord.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhum aluno cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alunosDoCoord.map((aluno) => (
            <CardAluno
              key={aluno.matricula}
              aluno={aluno}
              demandasEmAberto={demandas.filter(
                (d) => d.matriculaAluno === aluno.matricula && d.status !== 'concluido'
              ).length}
              onRemover={onRemover}
            />
          ))}
        </div>
      )}
    </section>
  );
}
