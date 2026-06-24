'use client';

import type { Demanda } from '@/types';
import { DemandaCard } from './DemandaCard';

interface ListaDemandasProps {
  demandas: Demanda[];
  onVerDetalhes: (protocolo: string) => void;
  onAprovar: (protocolo: string) => void;
  onReprovar: (protocolo: string) => void;
}

export function ListaDemandas({ demandas, onVerDetalhes, onAprovar, onReprovar }: ListaDemandasProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Demandas</h2>
      {demandas.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhuma demanda pendente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demandas.map((d) => (
            <DemandaCard
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
