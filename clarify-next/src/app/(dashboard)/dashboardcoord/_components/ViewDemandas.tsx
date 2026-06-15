import { CardDemandaPendente } from './CardDemandaPendente';
import type { Demanda } from '@/types';

interface ViewDemandasProps {
  demandasPendentes: Demanda[];
  onVerDetalhes: (protocolo: string) => void;
  onAprovar: (protocolo: string) => void;
  onReprovar: (protocolo: string) => void;
}

/** View "Demandas" do dashboard do coordenador. */
export function ViewDemandas({
  demandasPendentes,
  onVerDetalhes,
  onAprovar,
  onReprovar,
}: ViewDemandasProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Demandas</h2>
      {demandasPendentes.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhuma demanda pendente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demandasPendentes.map((d) => (
            <CardDemandaPendente
              key={d.protocolo}
              demanda={d}
              onVerDetalhes={onVerDetalhes}
              onAprovar={onAprovar}
              onReprovar={onReprovar}
            />
          ))}
        </div>
      )}
    </section>
  );
}
