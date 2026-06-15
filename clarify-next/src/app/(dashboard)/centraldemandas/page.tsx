'use client';

import { useState, useMemo, useCallback, useReducer } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowRight, FileText, Clock, CheckCircle } from 'lucide-react';
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
import { modaisReducer, modaisInicial } from './_components/modaisReducer';
import type { StatusDemanda, TipoDemanda } from '@/types';

type StudentView = 'nome' | 'demandas';
const VIEWS: StudentView[] = ['nome', 'demandas'];

export default function CentralDemandasPage() {
  const { usuario } = useAuth();
  const { demandas, criar, buscarPorProtocolo } = useDemandas(
    usuario ? { matriculaAluno: usuario.matricula } : undefined
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawView = searchParams.get('view') as StudentView | null;
  const view: StudentView = rawView && VIEWS.includes(rawView) ? rawView : 'nome';

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<StatusDemanda | 'todos'>('todos');
  const [modais, dispatchModais] = useReducer(modaisReducer, modaisInicial);

  const demandaDetalhes = useMemo(
    () => modais.protocoloSelecionado ? buscarPorProtocolo(modais.protocoloSelecionado) ?? null : null,
    [modais.protocoloSelecionado, buscarPorProtocolo]
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
  const pendentes = demandas.filter((d) => d.status === 'pendente').length;
  const resolvidas = demandas.filter((d) => d.status === 'concluido').length;
  const eficiencia = total > 0 ? Math.round((resolvidas / total) * 100) : 0;

  const handleCriarDemanda = useCallback((dados: { tipo: string; descricao: string }) => {
    criar({
      matriculaAluno: usuario?.matricula ?? '',
      tipo: dados.tipo as TipoDemanda,
      descricao: dados.descricao,
    });
  }, [criar, usuario]);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    dispatchModais({ type: 'abrirDetalhes', protocolo });
  }, []);

  const recentes = useMemo(
    () => demandas.toSorted(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    ).slice(0, 6),
    [demandas]
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* ── View: Início ── */}
      {view === 'nome' && (
        <div className="space-y-6">
          {/* Hero */}
          <section className="relative overflow-hidden bg-gray-900 p-5 sm:p-8 text-white rounded-2xl">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase block opacity-70">
                CENTRAL DE DEMANDAS
              </span>
              <h1 className="text-3xl lg:text-4xl font-semibold">
                Olá, {usuario?.nome?.split(' ')[0] || 'Aluno'}
              </h1>
              <p className="text-gray-400 text-sm lg:text-base max-w-2xl">
                Acompanhe suas solicitações acadêmicas, abra novas demandas e veja o andamento de cada processo.
              </p>
            </div>
          </section>

          {/* Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardMetrica titulo="Total" valor={total} label="solicitações">
              <FileText className="w-4 h-4 text-gray-400 mb-1.5" />
            </CardMetrica>
            <CardMetrica titulo="Pendentes" valor={pendentes} label="aguardando análise">
              <Clock className="w-4 h-4 text-yellow-500 mb-1.5" />
            </CardMetrica>
            <CardMetrica titulo="Em Análise" valor={String(emAnalise).padStart(2, '0')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="mb-1.5">
                <path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
              </svg>
            </CardMetrica>
            <CardMetrica titulo="Resolvidas" valor={resolvidas} label={`${eficiencia}% de eficiência`}>
              <CheckCircle className="w-4 h-4 text-green-500 mb-1.5" />
            </CardMetrica>
          </div>

          {/* Demandas recentes */}
          {recentes.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Demandas Recentes</h2>
                <button
                  type="button"
                  onClick={() => router.push('/centraldemandas?view=demandas')}
                  className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Ver todas
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentes.map((d) => (
                  <CardDemanda
                    key={d.protocolo}
                    demanda={d}
                    onVerDetalhes={handleVerDetalhes}
                  />
                ))}
                <CardNovaDemanda onClick={() => dispatchModais({ type: 'abrirNova' })} />
              </div>
            </section>
          )}

          {recentes.length === 0 && (
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <EstadoVazio />
                <div className="sm:col-span-2 lg:col-span-3">
                  <CardNovaDemanda onClick={() => dispatchModais({ type: 'abrirNova' })} />
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── View: Minhas Demandas ── */}
      {view === 'demandas' && (
        <>
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
                  <CardNovaDemanda onClick={() => dispatchModais({ type: 'abrirNova' })} />
                </>
              ) : (
                <>
                  <EstadoVazio />
                  <div className="sm:col-span-2 lg:col-span-3">
                    <CardNovaDemanda onClick={() => dispatchModais({ type: 'abrirNova' })} />
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
          <FabMobile onClick={() => dispatchModais({ type: 'abrirNova' })} />
        </>
      )}

      {/* Modal nova demanda */}
      <ModalNovaDemanda
        open={modais.nova}
        onClose={() => dispatchModais({ type: 'fecharNova' })}
        usuario={usuario}
        onSubmit={handleCriarDemanda}
      />

      {/* Modal detalhes */}
      <ModalDetalhesDemanda
        open={modais.detalhes}
        onClose={() => dispatchModais({ type: 'fecharDetalhes' })}
        demanda={demandaDetalhes}
        remetente={remetente}
      />
    </div>
  );
}
