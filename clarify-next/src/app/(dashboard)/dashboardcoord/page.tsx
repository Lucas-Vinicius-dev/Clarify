'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Plus } from 'lucide-react';
import { CardMetrica } from '@/components/coord/CardMetrica';
import { CardAluno } from '@/components/coord/CardAluno';
import { CardTurma } from '@/components/coord/CardTurma';
import { ModalCriarTurma } from '@/components/coord/ModalCriarTurma';
import { ModalFeedback } from '@/components/coord/ModalFeedback';
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda';
import { useAuth } from '@/context/AuthContext';
import { useDemandas } from '@/hooks/useDemandas';
import { useUsuarios } from '@/hooks/useUsuarios';
import { useTurmas } from '@/hooks/useTurmas';
import { atualizarStatusDemanda } from '@/lib/demandas';

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
  const [modalTurmaAberta, setModalTurmaAberta] = useState(false);
  const [modalFeedbackAberta, setModalFeedbackAberta] = useState(false);
  const [protocoloFeedback, setProtocoloFeedback] = useState<string | null>(null);
  const [modalDetalhesAberta, setModalDetalhesAberta] = useState(false);
  const [demandaDetalhe, setDemandaDetalhe] = useState<ReturnType<typeof demandas.find> | null>(null);
  const [adicionarErro, setAdicionarErro] = useState('');
  const [adicionarSucesso, setAdicionarSucesso] = useState('');

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
    setProtocoloFeedback(protocolo);
    setModalFeedbackAberta(true);
  }, []);

  const handleVerDetalhes = useCallback((protocolo: string) => {
    const demanda = demandas.find((item) => item.protocolo === protocolo) || null;
    setDemandaDetalhe(demanda);
    setModalDetalhesAberta(true);
  }, [demandas]);

  const handleFeedbackSubmit = useCallback((feedback: string) => {
    if (!protocoloFeedback) return;
    atualizarStatusDemanda(protocoloFeedback, 'requer_ajuste', feedback);
    recarregar();
  }, [protocoloFeedback, recarregar]);

  const handleAprovar = useCallback((protocolo: string) => {
    atualizarStatusDemanda(protocolo, 'concluido');
    recarregar();
  }, [recarregar]);

  const handleAdicionarAluno = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdicionarErro('');
    setAdicionarSucesso('');

    const data = new FormData(e.currentTarget);
    const nome = (data.get('nome') as string).trim();
    const matricula = (data.get('matricula') as string).trim();
    const email = (data.get('email') as string).trim();
    const senha = data.get('senha') as string;

    if (!nome || !matricula || !email || !senha) {
      setAdicionarErro('Preencha todos os campos.');
      return;
    }

    if (usuariosHook.existe(matricula, email)) {
      setAdicionarErro('Matrícula ou email já cadastrados.');
      return;
    }

    usuariosHook.adicionar(nome, matricula, email, senha, 'aluno');
    if (usuario) {
      usuariosHook.atribuir(usuario.matricula, matricula);
    }

    setAdicionarSucesso('Aluno cadastrado com sucesso!');
    (e.target as HTMLFormElement).reset();
  }, [usuario, usuariosHook]);

  const handleRemoverAluno = useCallback((matriculaAluno: string) => {
    usuariosHook.deletar(matriculaAluno);
  }, [usuariosHook]);

  const recentesOrdenadas = useMemo(
    () => [...demandas].sort(
      (a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
    ),
    [demandas]
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* ── View: Início ── */}
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

          {/* Demandas pendentes recentes */}
          {demandasPendentes.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Demandas Pendentes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentesOrdenadas.filter((d) => d.status !== 'concluido').slice(0, 6).map((d) => (
                  <div key={d.protocolo} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">{d.tipo}</h3>
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
                      <p><span className="font-semibold text-gray-800">Matrícula:</span> {d.matriculaAluno}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAprovar(d.protocolo)}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors cursor-pointer border-none"
                      >
                        Aprovar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReprovar(d.protocolo)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors cursor-pointer border-none"
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

      {/* ── View: Alunos ── */}
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
                  key={aluno.matricula}
                  aluno={aluno}
                  demandasEmAberto={demandas.filter(
                    (d) => d.matriculaAluno === aluno.matricula && d.status !== 'concluido'
                  ).length}
                  onRemover={handleRemoverAluno}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── View: Demandas ── */}
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
                <div key={d.protocolo} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{d.tipo}</h3>
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
                    <p><span className="font-semibold text-gray-800">Matrícula:</span> {d.matriculaAluno}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAprovar(d.protocolo)}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors cursor-pointer border-none"
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReprovar(d.protocolo)}
                      className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors cursor-pointer border-none"
                    >
                      Reprovar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVerDetalhes(d.protocolo)}
                      className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer border-none"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── View: Adicionar Aluno ── */}
      {view === 'adicionar' && (
        <section className="max-w-xl">
          {adicionarSucesso && (
            <div className="mb-6 inline-flex items-start gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <span>{adicionarSucesso}</span>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-soft-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 sm:px-7 pt-5 sm:pt-6">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="modal-eyebrow-dot"></span>
                <span className="modal-label">Vincular aluno</span>
              </div>
              <header>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight">
                  Cadastre um novo aluno<br/>
                  <span className="text-gradient-warm">para vinculá-lo à sua coordenação.</span>
                </h2>
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  Preencha os dados abaixo. O aluno receberá as credenciais para acessar o sistema.
                </p>
              </header>
            </div>

            {/* Form */}
            <form id="formAdicionarAluno" onSubmit={handleAdicionarAluno} className="px-6 sm:px-7 pt-5 pb-2 space-y-6">
              <section>
                <label htmlFor="nome" className="modal-label">Nome Completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="modal-input font-semibold mt-1"
                  placeholder="Nome completo do aluno"
                  autoFocus
                />
              </section>

              <section>
                <label htmlFor="matricula" className="modal-label">Matrícula</label>
                <input
                  type="text"
                  id="matricula"
                  name="matricula"
                  className="modal-input font-semibold mt-1"
                  placeholder="Número de matrícula"
                />
              </section>

              <section>
                <label htmlFor="email" className="modal-label">Email Institucional</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="modal-input font-semibold mt-1"
                  placeholder="email@instituto.edu"
                />
              </section>

              <section>
                <label htmlFor="senha" className="modal-label">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="modal-input font-semibold mt-1"
                  placeholder="Senha de acesso"
                />
              </section>

              {adicionarErro && (
                <div className="inline-flex items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 mt-px shrink-0" />
                  <span>{adicionarErro}</span>
                </div>
              )}
            </form>

            {/* Footer */}
            <footer className="flex items-center justify-end gap-3 px-6 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
              <button type="submit" form="formAdicionarAluno" className="modal-btn-primary">
                <Plus className="w-4 h-4" />
                Cadastrar Aluno
              </button>
            </footer>
          </div>
        </section>
      )}

      {/* ── View: Turmas ── */}
      {view === 'turmas' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Turmas</h2>
            <button
              type="button"
              onClick={() => setModalTurmaAberta(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors cursor-pointer border-none"
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

              <ModalDetalhesDemanda
                open={modalDetalhesAberta}
                onClose={() => {
                  setModalDetalhesAberta(false);
                  setDemandaDetalhe(null);
                }}
                demanda={demandaDetalhe}
                remetente={demandaDetalhe ? usuariosHook.buscar(demandaDetalhe.matriculaAluno) ?? null : null}
              />
            </div>
          )}
        </section>
      )}

      {/* Modal criar turma */}
      <ModalCriarTurma
        open={modalTurmaAberta}
        onClose={() => setModalTurmaAberta(false)}
        onCreate={handleCriarTurma}
      />

      {/* Modal feedback */}
      <ModalFeedback
        open={modalFeedbackAberta}
        onClose={() => { setModalFeedbackAberta(false); setProtocoloFeedback(null); }}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
