'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CardMetrica } from '@/components/coordenador/CardMetrica';
import { CardAluno } from '@/components/coordenador/CardAluno';
import { CardTurma } from '@/components/coordenador/CardTurma';
import { ModalCriarTurma } from '@/components/coordenador/ModalCriarTurma';
import { ModalFeedback } from '@/components/coordenador/ModalFeedback';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { FormAdicionarAluno } from '@/components/coordenador/FormAdicionarAluno';
import { useAuth } from '@/context/AuthContext';
import { useDemandas } from '@/hooks/useDemandas';
import { useUsuarios } from '@/hooks/useUsuarios';
import type { Cargo, Demanda, UsuarioLogado } from '@/types';
import { useTurmas } from '@/hooks/useTurmas';
import { atualizarStatusDemanda } from '@/lib/demandas';

function mapProfileToUser(row: Record<string, unknown>): UsuarioLogado {
  return {
    id: row.id as string,
    nome: row.nome as string,
    matricula: row.matricula as string,
    email: row.email as string,
    cargo: row.cargo as Cargo,
    coordenador_id: (row.coordenador_id as string) ?? undefined,
  };
}

type DashView = 'nome' | 'alunos' | 'demandas' | 'turmas' | 'adicionar';

const VIEWS: DashView[] = ['nome', 'alunos', 'demandas', 'turmas', 'adicionar'];

export default function DashboardCoordPage() {
  const queryClient = useQueryClient();
  const { usuario } = useAuth();
  const { demandas, recarregar: recarregarDemandas } = useDemandas();
  const usuariosHook = useUsuarios();
  const turmasHook = useTurmas();
  const searchParams = useSearchParams();

  const rawView = searchParams.get('view') as DashView | null;
  const view: DashView = rawView && VIEWS.includes(rawView) ? rawView : 'nome';
  const [modalTurmaAberta, setModalTurmaAberta] = useState(false);
  const [modalFeedbackAberta, setModalFeedbackAberta] = useState(false);
  const [protocoloFeedback, setProtocoloFeedback] = useState<string | null>(null);
  const [modalDetalhesAberta, setModalDetalhesAberta] = useState(false);
  const [demandaDetalhe, setDemandaDetalhe] = useState<Demanda | null>(null);
  const [remetenteDetalhe, setRemetenteDetalhe] = useState<UsuarioLogado | null>(null);

  const { data: alunosDoCoord = [] } = useQuery({
    queryKey: ['alunos', usuario?.id],
    queryFn: async () => {
      const res = await fetch(`/api/perfis?coordenadorId=${encodeURIComponent(usuario!.id)}&cargo=aluno`)
      const data = await res.json()
      return (data ?? []).map(mapProfileToUser) as UsuarioLogado[]
    },
    enabled: !!usuario?.id,
  });

  const alunoIds = useMemo(() => new Set(alunosDoCoord.map((a) => a.id)), [alunosDoCoord]);

  const demandasDoCoord = useMemo(
    () => demandas.filter((d) => alunoIds.has(d.alunoId)),
    [alunoIds, demandas]
  );

  const demandasPendentes = useMemo(
    () => demandasDoCoord.filter((d) => d.status !== 'concluido'),
    [demandasDoCoord]
  );

  const turmasDoCoord = useMemo(() => {
    if (!usuario) return [];
    return turmasHook.filtrar(usuario.id);
  }, [usuario, turmasHook]);

  const totalAlunos = alunosDoCoord.length;
  const demandasAbertas = demandasPendentes.length;
  const demandasConcluidas = demandasDoCoord.filter((d) => d.status === 'concluido').length;
  const resolvidas = demandasDoCoord.length > 0 ? Math.round((demandasConcluidas / demandasDoCoord.length) * 100) : 0;

  const handleCriarTurma = useCallback((dados: { nome: string; disciplina: string; alunos: string[] }) => {
    if (!usuario) return;
    turmasHook.criar({
      nome: dados.nome,
      disciplina: dados.disciplina,
      alunos: dados.alunos,
      coordenadorId: usuario.id,
    });
  }, [usuario, turmasHook]);

  const handleReprovar = useCallback((protocolo: string) => {
    setProtocoloFeedback(protocolo);
    setModalFeedbackAberta(true);
  }, []);

  const handleVerDetalhes = useCallback(async (protocolo: string) => {
    const demanda = demandas.find((item) => item.protocolo === protocolo) || null;
    setDemandaDetalhe(demanda);

    if (demanda) {
      const aluno = alunosDoCoord.find((a) => a.id === demanda.alunoId) ?? null;
      setRemetenteDetalhe(aluno);
    }

    setModalDetalhesAberta(true);
  }, [demandas, alunosDoCoord]);

  const handleFeedbackSubmit = useCallback(async (feedback: string) => {
    if (!protocoloFeedback) return;
    await atualizarStatusDemanda(protocoloFeedback, 'requer_ajuste', feedback);
    await recarregarDemandas();
  }, [protocoloFeedback, recarregarDemandas]);

  const handleAprovar = useCallback(async (protocolo: string) => {
    await atualizarStatusDemanda(protocolo, 'concluido');
    await recarregarDemandas();
  }, [recarregarDemandas]);

  const handleRemoverAluno = useCallback(async (matricula: string) => {
    const aluno = alunosDoCoord.find((a) => a.matricula === matricula);
    if (aluno) {
      await usuariosHook.deletar(aluno.id);
      queryClient.invalidateQueries({ queryKey: ['alunos', usuario?.id] });
    }
  }, [alunosDoCoord, usuariosHook, queryClient, usuario?.id]);

  const demandasPendentesOrdenadas = useMemo(
    () => [...demandasPendentes].sort(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    ),
    [demandasPendentes]
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {view === 'nome' && (
        <div className="space-y-6">
          <section className="relative overflow-hidden bg-gray-900 p-5 sm:p-8 text-white rounded-2xl">
            <div className="relative z-10 space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase block opacity-70">
                PORTAL DO COORDENADOR
              </span>
              <h1 className="text-3xl lg:text-4xl font-semibold">
                Bem-vindo, {usuario?.nome?.split(' ')[0] || 'Coordenador'}
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

          {demandasPendentes.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Demandas Pendentes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {demandasPendentesOrdenadas.slice(0, 6).map((d) => (
                  <div
                    key={d.protocolo}
                    onClick={() => handleVerDetalhes(d.protocolo)}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
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
                    <div className="grid gap-1 text-sm text-gray-500">
                      <p><span className="font-semibold text-gray-800">Protocolo:</span> {d.protocolo}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleAprovar(d.protocolo)}
                        className="flex-1 bg-brand-primary text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors cursor-pointer border-none"
                      >
                        Aprovar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReprovar(d.protocolo)}
                        className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer border-none"
                      >
                        Reprovar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {view === 'alunos' && (
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
                  key={aluno.id}
                  aluno={aluno}
                  demandasEmAberto={demandas.filter(
                    (d) => d.alunoId === aluno.id && d.status !== 'concluido'
                  ).length}
                  onRemover={handleRemoverAluno}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {view === 'demandas' && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Demandas</h2>
          {demandasPendentes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Nenhuma demanda pendente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demandasPendentes.map((d) => (
                <div
                  key={d.protocolo}
                  onClick={() => handleVerDetalhes(d.protocolo)}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
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
                  <div className="grid gap-1 text-sm text-gray-500">
                    <p><span className="font-semibold text-gray-800">Protocolo:</span> {d.protocolo}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleAprovar(d.protocolo)}
                      className="flex-1 bg-brand-primary text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors cursor-pointer border-none"
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReprovar(d.protocolo)}
                      className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer border-none"
                    >
                      Reprovar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {view === 'adicionar' && (
        <FormAdicionarAluno
          coordenadorId={usuario?.id}
          onCadastrado={async () => { await usuariosHook.recarregar(); }}
          existe={usuariosHook.existe}
        />
      )}

      {view === 'turmas' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Turmas</h2>
            <button
              type="button"
              onClick={() => setModalTurmaAberta(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors cursor-pointer border-none"
            >
              + Criar turma
            </button>
          </div>
          {turmasDoCoord.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Nenhuma turma criada ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {turmasDoCoord.map((turma) => (
                <CardTurma key={turma.id} turma={turma} />
              ))}
            </div>
          )}
        </section>
      )}

      <ModalCriarTurma
        open={modalTurmaAberta}
        onClose={() => setModalTurmaAberta(false)}
        onCreate={handleCriarTurma}
      />

      <ModalFeedback
        open={modalFeedbackAberta}
        onClose={() => { setModalFeedbackAberta(false); setProtocoloFeedback(null); }}
        onSubmit={handleFeedbackSubmit}
      />

      <ModalDetalhesDemanda
        open={modalDetalhesAberta}
        onClose={() => {
          setModalDetalhesAberta(false);
          setDemandaDetalhe(null);
          setRemetenteDetalhe(null);
        }}
        demanda={demandaDetalhe}
        remetente={remetenteDetalhe}
      />
    </div>
  );
}
