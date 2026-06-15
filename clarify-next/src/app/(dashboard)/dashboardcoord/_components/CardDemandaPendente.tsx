import type { Demanda } from '@/types';

interface CardDemandaPendenteProps {
  demanda: Demanda;
  onVerDetalhes: (protocolo: string) => void;
  onAprovar: (protocolo: string) => void;
  onReprovar: (protocolo: string) => void;
}

/**
 * Card de demanda pendente usado nas views "Início" e "Demandas"
 * do dashboard do coordenador.
 *
 * O card inteiro abre os detalhes via um <button> nativo em overlay
 * (acessível por teclado, sem `role`), enquanto "Aprovar"/"Reprovar"
 * ficam acima do overlay como botões irmãos — nada de botão aninhado.
 * Os blocos de informação ficam como filhos flex separados (com
 * pointer-events-none) para preservar o espaçamento `justify-between`.
 */
export function CardDemandaPendente({
  demanda: d,
  onVerDetalhes,
  onAprovar,
  onReprovar,
}: CardDemandaPendenteProps) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full">
      {/* Overlay clicável: cobre o card e abre os detalhes */}
      <button
        type="button"
        aria-label={`Ver detalhes da demanda ${d.protocolo}`}
        onClick={() => onVerDetalhes(d.protocolo)}
        className="absolute inset-0 z-0 rounded-2xl cursor-pointer"
      />

      {/* Cabeçalho (apenas visual; o clique atravessa para o overlay) */}
      <div className="pointer-events-none flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{d.tipo}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{d.descricao}</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shrink-0 ${
          d.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
          d.status === 'em_analise' ? 'bg-blue-100 text-blue-800' :
          'bg-orange-100 text-orange-800'
        }`}>
          {d.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Metadados (apenas visual) */}
      <div className="pointer-events-none grid gap-1 text-sm text-gray-500">
        <p><span className="font-semibold text-gray-800">Protocolo:</span> {d.protocolo}</p>
        <p><span className="font-semibold text-gray-800">Matrícula:</span> {d.matriculaAluno}</p>
      </div>

      {/* Ações acima do overlay */}
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onAprovar(d.protocolo)}
          className="flex-1 bg-brand-primary text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors cursor-pointer border-none"
        >
          Aprovar
        </button>
        <button
          type="button"
          onClick={() => onReprovar(d.protocolo)}
          className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer border-none"
        >
          Reprovar
        </button>
      </div>
    </div>
  );
}
