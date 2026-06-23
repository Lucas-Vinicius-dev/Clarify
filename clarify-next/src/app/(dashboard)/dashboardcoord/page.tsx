'use client';

import { useReducer, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ModalCriarTurma } from '@/components/coordenador/ModalCriarTurma';
import { ModalFeedback } from '@/components/coordenador/ModalFeedback';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { FormAdicionarAluno } from '@/components/coordenador/FormAdicionarAluno';
import { useAuth } from '@/context/AuthContext';
import { useDemandas } from '@/hooks/useDemandas';
import { useUsuarios } from '@/hooks/useUsuarios';
import type { Cargo, UsuarioLogado } from '@/types';
import { useTurmas } from '@/hooks/useTurmas';
import { atualizarStatusDemanda } from '@/lib/demandas';
import { VisaoGeral } from './_components/VisaoGeral';
import { ListaAlunos } from './_components/ListaAlunos';
import { ListaDemandas } from './_components/ListaDemandas';
import { ListaTurmas } from './_components/ListaTurmas';
import { dashboardUiReducer, initialDashboardUiState } from './_components/dashboardState';

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

  const [ui, dispatch] = useReducer(dashboardUiReducer, initialDashboardUiState);

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
    dispatch({ type: 'abrirFeedback', protocolo });
  }, []);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    const demanda = demandas.find((item) => item.protocolo === protocolo) || null;
    const remetente = demanda
      ? (alunosDoCoord.find((a) => a.id === demanda.alunoId) ?? null)
      : ui.remetenteDetalhe;
    dispatch({ type: 'abrirDetalhes', demanda, remetente });
  }, [demandas, alunosDoCoord, ui.remetenteDetalhe]);

  const handleFeedbackSubmit = useCallback(async (feedback: string) => {
    if (!ui.protocoloFeedback) return;
    await atualizarStatusDemanda(ui.protocoloFeedback, 'requer_ajuste', feedback);
    await recarregarDemandas();
  }, [ui.protocoloFeedback, recarregarDemandas]);

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
    () => demandasPendentes.toSorted(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    ),
    [demandasPendentes]
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {view === 'nome' && (
        <VisaoGeral
          nomeCoordenador={usuario?.nome}
          totalAlunos={totalAlunos}
          demandasAbertas={demandasAbertas}
          resolvidas={resolvidas}
          demandasPendentes={demandasPendentesOrdenadas}
          onVerDetalhes={handleVerDetalhes}
          onAprovar={handleAprovar}
          onReprovar={handleReprovar}
        />
      )}

      {view === 'alunos' && (
        <ListaAlunos
          alunos={alunosDoCoord}
          demandas={demandas}
          onRemover={handleRemoverAluno}
        />
      )}

      {view === 'demandas' && (
        <ListaDemandas
          demandas={demandasPendentes}
          onVerDetalhes={handleVerDetalhes}
          onAprovar={handleAprovar}
          onReprovar={handleReprovar}
        />
      )}

      {view === 'adicionar' && (
        <FormAdicionarAluno
          coordenadorId={usuario?.id}
          onCadastrado={async () => { await usuariosHook.recarregar(); }}
          existe={usuariosHook.existe}
        />
      )}

      {view === 'turmas' && (
        <ListaTurmas
          turmas={turmasDoCoord}
          onCriarTurma={() => dispatch({ type: 'abrirModalTurma' })}
        />
      )}

      <ModalCriarTurma
        open={ui.modalTurmaAberta}
        onClose={() => dispatch({ type: 'fecharModalTurma' })}
        onCreate={handleCriarTurma}
      />

      <ModalFeedback
        open={ui.modalFeedbackAberta}
        onClose={() => dispatch({ type: 'fecharFeedback' })}
        onSubmit={handleFeedbackSubmit}
      />

      <ModalDetalhesDemanda
        open={ui.modalDetalhesAberta}
        onClose={() => dispatch({ type: 'fecharDetalhes' })}
        demanda={ui.demandaDetalhe}
        remetente={ui.remetenteDetalhe}
      />
    </div>
  );
}
