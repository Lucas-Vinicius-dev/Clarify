'use client';

import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { ModalCriarTurma } from '@/components/coordenador/ModalCriarTurma';
import { ModalFeedback } from '@/components/coordenador/ModalFeedback';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { FormAdicionarAluno } from '@/components/coordenador/FormAdicionarAluno';
import { useAuth } from '@/context/AuthContext';
import { useDemandas } from '@/hooks/useDemandas';
import { useUsuarios, useAlunosDoCoordenador } from '@/hooks/useUsuarios';
import { useTurmas } from '@/hooks/useTurmas';
import { atualizarStatusDemanda } from '@/lib/demandas';
import { useUIStore } from '@/store/uiStore';
import { VisaoGeral } from './_components/VisaoGeral';
import { ListaAlunos } from './_components/ListaAlunos';
import { ListaDemandas } from './_components/ListaDemandas';
import { ListaTurmas } from './_components/ListaTurmas';

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

  const {
    modalTurmaAberta, setModalTurmaAberta,
    modalFeedbackAberta, setModalFeedbackAberta,
    protocoloFeedback, setProtocoloFeedback,
    modalDetalhesAberta, setModalDetalhesAberta,
    demandaDetalhe, setDemandaDetalhe,
    remetenteDetalhe, setRemetenteDetalhe,
  } = useUIStore();

  const { data: alunosDoCoord = [] } = useAlunosDoCoordenador(usuario?.id);

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
  }, [setProtocoloFeedback, setModalFeedbackAberta]);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    const demanda = demandas.find((item) => item.protocolo === protocolo) || null;
    const remetente = demanda
      ? (alunosDoCoord.find((a) => a.id === demanda.alunoId) ?? null)
      : null;
    setDemandaDetalhe(demanda);
    setRemetenteDetalhe(remetente);
    setModalDetalhesAberta(true);
  }, [demandas, alunosDoCoord, setDemandaDetalhe, setRemetenteDetalhe, setModalDetalhesAberta]);

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
      queryClient.invalidateQueries({ queryKey: ['students', usuario?.id] });
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
          onCriarTurma={() => setModalTurmaAberta(true)}
        />
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
        onClose={() => { setModalDetalhesAberta(false); setDemandaDetalhe(null); setRemetenteDetalhe(null); }}
        demanda={demandaDetalhe}
        remetente={remetenteDetalhe}
      />
    </div>
  );
}
