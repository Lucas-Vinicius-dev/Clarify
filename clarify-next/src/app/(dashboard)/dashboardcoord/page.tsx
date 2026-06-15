'use client';

import { useMemo, useCallback, useReducer, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModalCriarTurma } from '@/components/coord/ModalCriarTurma';
import { ModalFeedback } from '@/components/coord/ModalFeedback';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { useAuth } from '@/context/AuthContext';
import { useDemandas } from '@/hooks/useDemandas';
import { useUsuarios } from '@/hooks/useUsuarios';
import { useTurmas } from '@/hooks/useTurmas';
import { atualizarStatusDemanda } from '@/lib/demandas';
import { ViewInicio } from './_components/ViewInicio';
import { ViewAlunos } from './_components/ViewAlunos';
import { ViewDemandas } from './_components/ViewDemandas';
import { ViewAdicionarAluno } from './_components/ViewAdicionarAluno';
import { ViewTurmas } from './_components/ViewTurmas';
import { modaisReducer, modaisInicial } from './_components/modaisReducer';
import { feedbackFormReducer, feedbackFormInicial } from './_components/feedbackFormReducer';

type DashView = 'nome' | 'alunos' | 'demandas' | 'turmas' | 'adicionar';

const VIEWS: DashView[] = ['nome', 'alunos', 'demandas', 'turmas', 'adicionar'];

export default function DashboardCoordPage() {
  const { usuario } = useAuth();
  const { demandas, recarregar } = useDemandas();
  const usuariosHook = useUsuarios();
  const turmasHook = useTurmas();
  const searchParams = useSearchParams();

  const rawView = searchParams.get('view') as DashView | null;
  const view: DashView = rawView && VIEWS.includes(rawView) ? rawView : 'nome';

  const [modais, dispatchModais] = useReducer(modaisReducer, modaisInicial);
  const [feedbackForm, dispatchFeedbackForm] = useReducer(feedbackFormReducer, feedbackFormInicial);
  // Protocolo em feedback nunca é renderizado — só usado dentro de handlers.
  const protocoloFeedbackRef = useRef<string | null>(null);

  const alunosDoCoord = useMemo(() => {
    if (!usuario) return [];
    const matriculas = usuariosHook.obterAlunosDoCoordenador(usuario.matricula);
    return usuariosHook.usuarios.filter((u) => matriculas.includes(u.matricula));
  }, [usuario, usuariosHook]);

  const demandasDoCoord = useMemo(() => {
    const matriculas = new Set(alunosDoCoord.map((aluno) => aluno.matricula));
    return demandas.filter((d) => matriculas.has(d.matriculaAluno));
  }, [alunosDoCoord, demandas]);

  const demandasPendentes = useMemo(
    () => demandasDoCoord.filter((d) => d.status !== 'concluido'),
    [demandasDoCoord]
  );

  const turmasDoCoord = useMemo(() => {
    if (!usuario) return [];
    return turmasHook.filtrar(usuario.matricula);
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
      coordenador: usuario.matricula,
    });
  }, [usuario, turmasHook]);

  const handleReprovar = useCallback((protocolo: string) => {
    protocoloFeedbackRef.current = protocolo;
    dispatchModais({ type: 'abrirFeedback' });
  }, []);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    const demanda = demandas.find((item) => item.protocolo === protocolo) || null;
    dispatchModais({ type: 'abrirDetalhes', demanda });
  }, [demandas]);

  const handleFeedbackSubmit = useCallback((feedback: string) => {
    if (!protocoloFeedbackRef.current) return;
    atualizarStatusDemanda(protocoloFeedbackRef.current, 'requer_ajuste', feedback);
    recarregar();
  }, [recarregar]);

  const handleAprovar = useCallback((protocolo: string) => {
    atualizarStatusDemanda(protocolo, 'concluido');
    recarregar();
  }, [recarregar]);

  const handleAdicionarAluno = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchFeedbackForm({ type: 'limpar' });

    const data = new FormData(e.currentTarget);
    const nome = (data.get('nome') as string).trim();
    const matricula = (data.get('matricula') as string).trim();
    const email = (data.get('email') as string).trim();
    const senha = data.get('senha') as string;

    if (!nome || !matricula || !email || !senha) {
      dispatchFeedbackForm({ type: 'erro', mensagem: 'Preencha todos os campos.' });
      return;
    }

    if (usuariosHook.existe(matricula, email)) {
      dispatchFeedbackForm({ type: 'erro', mensagem: 'Matrícula ou email já cadastrados.' });
      return;
    }

    usuariosHook.adicionar(nome, matricula, email, senha, 'aluno');
    if (usuario) {
      usuariosHook.atribuir(usuario.matricula, matricula);
    }

    dispatchFeedbackForm({ type: 'sucesso', mensagem: 'Aluno cadastrado com sucesso!' });
    (e.target as HTMLFormElement).reset();
  }, [usuario, usuariosHook]);

  const handleRemoverAluno = useCallback((matriculaAluno: string) => {
    usuariosHook.deletar(matriculaAluno);
  }, [usuariosHook]);

  const demandasPendentesOrdenadas = useMemo(
    () => demandasPendentes.toSorted(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    ),
    [demandasPendentes]
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* ── View: Início ── */}
      {view === 'nome' && (
        <ViewInicio
          nomeCoordenador={usuario?.nome}
          totalAlunos={totalAlunos}
          demandasAbertas={demandasAbertas}
          resolvidas={resolvidas}
          demandasPendentes={demandasPendentes}
          demandasPendentesOrdenadas={demandasPendentesOrdenadas}
          onVerDetalhes={handleVerDetalhes}
          onAprovar={handleAprovar}
          onReprovar={handleReprovar}
        />
      )}

      {/* ── View: Alunos ── */}
      {view === 'alunos' && (
        <ViewAlunos
          alunosDoCoord={alunosDoCoord}
          demandas={demandas}
          onRemover={handleRemoverAluno}
        />
      )}

      {/* ── View: Demandas ── */}
      {view === 'demandas' && (
        <ViewDemandas
          demandasPendentes={demandasPendentes}
          onVerDetalhes={handleVerDetalhes}
          onAprovar={handleAprovar}
          onReprovar={handleReprovar}
        />
      )}

      {/* ── View: Adicionar Aluno ── */}
      {view === 'adicionar' && (
        <ViewAdicionarAluno
          erro={feedbackForm.erro}
          sucesso={feedbackForm.sucesso}
          onSubmit={handleAdicionarAluno}
        />
      )}

      {/* ── View: Turmas ── */}
      {view === 'turmas' && (
        <ViewTurmas
          turmasDoCoord={turmasDoCoord}
          onCriarTurma={() => dispatchModais({ type: 'abrirTurma' })}
        />
      )}

      {/* Modal criar turma */}
      <ModalCriarTurma
        open={modais.turma}
        onClose={() => dispatchModais({ type: 'fecharTurma' })}
        onCreate={handleCriarTurma}
      />

      {/* Modal feedback */}
      <ModalFeedback
        open={modais.feedback}
        onClose={() => { dispatchModais({ type: 'fecharFeedback' }); protocoloFeedbackRef.current = null; }}
        onSubmit={handleFeedbackSubmit}
      />

      {/* Modal detalhes demanda */}
      <ModalDetalhesDemanda
        open={modais.detalhes}
        onClose={() => dispatchModais({ type: 'fecharDetalhes' })}
        demanda={modais.demandaDetalhe}
        remetente={modais.demandaDetalhe ? usuariosHook.buscar(modais.demandaDetalhe.matriculaAluno) ?? null : null}
      />
    </div>
  );
}
