'use client';

import { useState, useMemo, useCallback } from 'react';
import { BarraFiltros } from '@/components/demandas/BarraFiltros';
import { CardDemanda } from '@/components/demandas/CardDemanda';
import { CardNovaDemanda } from '@/components/demandas/CardNovaDemanda';
import { CardHistorico } from '@/components/demandas/CardHistorico';
import { LinhaHistorico } from '@/components/demandas/LinhaHistorico';
import { CardMetrica } from '@/components/coord/CardMetrica';
import { EstadoVazio } from '@/components/demandas/EstadoVazio';
import { FabMobile } from '@/components/demandas/FabMobile';
import { ModalNovaDemanda } from '@/components/demandas/ModalNovaDemanda';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { useDemandas } from '@/hooks/useDemandas';
import { useAuth } from '@/context/AuthContext';
import { acharUsuario } from '@/lib/auth';
import type { StatusDemanda } from '@/types';

export default function CentralDemandasPage() {
  const { usuario } = useAuth();
  const { demandas, criar, buscarPorProtocolo } = useDemandas(
    usuario ? { matriculaAluno: usuario.matricula } : undefined
  );

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusDemanda | 'todos'>('todos');
  const [modalNovaAberta, setModalNovaAberta] = useState(false);
  const [modalDetalhesAberta, setModalDetalhesAberta] = useState(false);
  const [protocoloSelecionado, setProtocoloSelecionado] = useState<string | null>(null);

  const demandaDetalhes = useMemo(
    () => protocoloSelecionado ? buscarPorProtocolo(protocoloSelecionado) ?? null : null,
    [protocoloSelecionado, buscarPorProtocolo]
  );

  const remetente = useMemo(
    () => demandaDetalhes ? acharUsuario(demandaDetalhes.matriculaAluno) ?? null : null,
    [demandaDetalhes]
  );

  const filtradas = useMemo(() => {
    return demandas.filter((d) => {
      const casaStatus = filtroStatus === 'todos' || d.status === filtroStatus;
      const termo = busca.trim().toLowerCase();
      const casaBusca = termo === ''
        || d.protocolo.toLowerCase().includes(termo)
        || d.tipo.toLowerCase().includes(termo);
      return casaStatus && casaBusca;
    });
  }, [demandas, busca, filtroStatus]);

  const emAberto = useMemo(() => filtradas.filter((d) => d.status !== 'concluido'), [filtradas]);
  const concluidas = useMemo(() => filtradas.filter((d) => d.status === 'concluido'), [filtradas]);

  const total = demandas.length;
  const emAnalise = demandas.filter((d) => d.status === 'em_analise').length;
  const eficiencia = total > 0 ? Math.round((demandas.filter((d) => d.status === 'concluido').length / total) * 100) : 0;

  const handleCriarDemanda = useCallback((dados: { tipo: string; descricao: string }) => {
    criar({
      matriculaAluno: usuario?.matricula ?? '',
      tipo: dados.tipo as any,
      descricao: dados.descricao,
    });
  }, [criar, usuario]);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    setProtocoloSelecionado(protocolo);
    setModalDetalhesAberta(true);
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4">
        <CardMetrica titulo="Total de Solicitações" valor={total} label="no semestre" />
        <CardMetrica titulo="Em Análise" valor={String(emAnalise).padStart(2, '0')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="mb-1.5">
            <path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
          </svg>
        </CardMetrica>
        <CardMetrica titulo="Eficiência" valor={`${eficiencia}%`} label="Demandas concluídas sobre o total">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-primary rounded-full" style={{ width: `${eficiencia}%` }} />
          </div>
        </CardMetrica>
      </div>

      {/* Barra de filtros */}
      <BarraFiltros
        busca={busca}
        status={filtroStatus}
        onBuscaChange={setBusca}
        onStatusChange={setFiltroStatus}
      />

      {/* Cards de demanda em aberto */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emAberto.length > 0 ? (
            <>
              {emAberto.map((demanda) => (
                <CardDemanda
                  key={demanda.protocolo}
                  demanda={demanda}
                  onVerDetalhes={handleVerDetalhes}
                />
              ))}
              <CardNovaDemanda onClick={() => setModalNovaAberta(true)} />
            </>
          ) : (
            <>
              <EstadoVazio />
              <div className="sm:col-span-2 lg:col-span-3">
                <CardNovaDemanda onClick={() => setModalNovaAberta(true)} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Histórico de concluídas */}
      {concluidas.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Histórico</h2>

          {/* Tabela desktop */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <th className="pb-2 pt-3 px-4">Protocolo</th>
                  <th className="pb-2 pt-3 px-4">Assunto</th>
                  <th className="pb-2 pt-3 px-4">Status</th>
                  <th className="pb-2 pt-3 px-4">Última Modificação</th>
                </tr>
              </thead>
              <tbody>
                {concluidas.map((demanda) => (
                  <LinhaHistorico key={demanda.protocolo} demanda={demanda} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards mobile */}
          <div className="md:hidden space-y-2">
            {concluidas.map((demanda) => (
              <CardHistorico key={demanda.protocolo} demanda={demanda} />
            ))}
          </div>
        </section>
      )}

      {/* FAB mobile */}
      <FabMobile onClick={() => setModalNovaAberta(true)} />

      {/* Modal nova demanda */}
      <ModalNovaDemanda
        open={modalNovaAberta}
        onClose={() => setModalNovaAberta(false)}
        usuario={usuario}
        onSubmit={handleCriarDemanda}
      />

      {/* Modal detalhes */}
      <ModalDetalhesDemanda
        open={modalDetalhesAberta}
        onClose={() => { setModalDetalhesAberta(false); setProtocoloSelecionado(null); }}
        demanda={demandaDetalhes}
        remetente={remetente}
      />
    </div>
  );
}
