import { CardMetrica } from '@/components/coord/CardMetrica';
import { CardDemandaPendente } from './CardDemandaPendente';
import type { Demanda } from '@/types';

interface ViewInicioProps {
  nomeCoordenador?: string;
  totalAlunos: number;
  demandasAbertas: number;
  resolvidas: number;
  demandasPendentes: Demanda[];
  demandasPendentesOrdenadas: Demanda[];
  onVerDetalhes: (protocolo: string) => void;
  onAprovar: (protocolo: string) => void;
  onReprovar: (protocolo: string) => void;
}

/** View "Início" do dashboard do coordenador: hero, métricas e pendentes recentes. */
export function ViewInicio({
  nomeCoordenador,
  totalAlunos,
  demandasAbertas,
  resolvidas,
  demandasPendentes,
  demandasPendentesOrdenadas,
  onVerDetalhes,
  onAprovar,
  onReprovar,
}: ViewInicioProps) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden bg-gray-900 p-5 sm:p-8 text-white rounded-2xl">
        <div className="relative z-10 space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase block opacity-70">
            PORTAL DO COORDENADOR
          </span>
          <h1 className="text-3xl lg:text-4xl font-semibold">
            Bem-vindo, {nomeCoordenador?.split(' ')[0] || 'Coordenador'}
          </h1>
          <p className="text-gray-400 text-sm lg:text-base max-w-2xl">
            Acompanhe as demandas e gerencie o fluxo de solicitações acadêmicas com precisão e clareza.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardMetrica titulo="Alunos Vinculados" valor={totalAlunos} label="total de alunos" />
        <CardMetrica titulo="Demandas Abertas" valor={demandasAbertas} label="aguardando ação" />
        <CardMetrica titulo="Resolução" valor={`${resolvidas}%`} label="demandas concluídas">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-primary rounded-full" style={{ width: `${resolvidas}%` }} />
          </div>
        </CardMetrica>
      </div>

      {/* Demandas pendentes recentes */}
      {demandasPendentes.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Demandas Pendentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demandasPendentesOrdenadas.slice(0, 6).map((d) => (
              <CardDemandaPendente
                key={d.protocolo}
                demanda={d}
                onVerDetalhes={onVerDetalhes}
                onAprovar={onAprovar}
                onReprovar={onReprovar}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
