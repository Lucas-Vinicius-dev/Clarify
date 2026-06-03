import Image from 'next/image'
import logo from '../public/GATOGORDO.png'
import {
    ArrowRight,
    Bell,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Eye,
    GraduationCap,
    Plus,
    Send,
    UserCog,
    Users} from 'lucide-react'

export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden">

        <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-dot-grid opacity-25"></div>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-radial-warm opacity-70"></div>
        </div>

        <nav id="landingNav" className="sticky top-0 z-30 border-b border-transparent">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#topo" className="flex items-center gap-2.5">
                    <Image src={logo} alt="Clarify" className="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" width={36} height={36} />
                    <div className="leading-none">
                        <p className="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                    </div>
                </a>

                <div className="hidden md:flex items-center gap-1">
                    <a href="#como-funciona" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Como funciona</a>
                    <a href="#quem-usa" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Perfis</a>
                </div>

                <div className="flex items-center gap-2">
                    <a href="/registro" className="btnCriarConta hidden sm:inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors">
                        Criar conta
                    </a>
                    <a href="/login" className="btnEntrar btn-primary-cta inline-flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2">
                        Entrar
                        <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
        </nav>

        <section id="topo" className="relative pt-14 md:pt-24 pb-16 md:pb-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto" data-reveal>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-headline leading-[1.05] text-slate-900">
                        Aberto, em análise,<br/>
                        <span className="text-gradient-warm">resolvido.</span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
                        O caminho de cada solicitação acadêmica, do clique do aluno à resposta da coordenação. Em um lugar só, com protocolo único e histórico do semestre.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href="/login" className="btnEntrar btn-primary-cta inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Entrar
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a href="/registro" className="btnCriarConta btn-ghost-cta inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Criar conta
                        </a>
                    </div>

                    <p className="mt-5 text-xs text-slate-400">
                        Acesso por matrícula institucional · Cadastro de coordenadores por chave de ativação
                    </p>
                </div>

                <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto" data-reveal>
                    <div className="pointer-events-none absolute -inset-x-12 -inset-y-10">
                        <div className="absolute inset-x-10 top-6 h-72 rounded-[3rem] bg-gradient-to-br from-brand-primary/25 via-orange-300/25 to-amber-200/20 blur-3xl"></div>
                    </div>

                    <div className="relative preview-tilt">
                        <div className="relative bg-white border border-slate-200/80 rounded-3xl shadow-soft-xl overflow-hidden">
                            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-300"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                                <span className="ml-3 text-[11px] text-slate-400 font-mono tracking-tight">clarify.app/centraldemandas</span>
                                <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    ao vivo
                                </span>
                            </div>

                            <div className="p-5 md:p-8">
                                <div className="flex items-end justify-between mb-5">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Portal · Central de Demandas</p>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">Em Aberto <span className="text-slate-300 ml-1 text-base">3</span></h3>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1.5">
                                        <Plus className="w-3.5 h-3.5" /> Nova demanda
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-3 gap-3.5">
                                   
                                    <article className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-402</span>
                                            <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-800 border-blue-200">Em Análise</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-snug">Quebra de Pré-requisito</h4>
                                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Solicitação de matrícula em Compiladores antes de Linguagens Formais.</p>
                                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> 02 Out</span>
                                            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> hoje</span>
                                        </div>
                                    </article>

                                    <article className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-419</span>
                                            <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">Pendente</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-snug">Revisão de Prova</h4>
                                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Pedido de revisão da prova final de Estrutura de Dados.</p>
                                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> 02 Out</span>
                                            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> hoje</span>
                                        </div>
                                    </article>

                                 
                                    <article className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-388</span>
                                            <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-rose-50 text-rose-800 border-rose-200">Requer Ajuste</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-snug">Aproveitamento AC</h4>
                                        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">40h validadas — pendência: anexar declaração legível.</p>
                                        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> 02 Out</span>
                                            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> hoje</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>

                      
                        <div className="hidden md:flex absolute -left-10 bottom-10 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow">
                            <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">REQ-320</p>
                                <p className="text-sm font-semibold text-slate-900">Concluído em 15 Out</p>
                            </div>
                        </div>

 
                        <div className="hidden md:flex absolute -right-8 top-16 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow" style={{ animationDelay: '2s' }}>
                            <span className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                                <Bell className="w-4 h-4 text-brand-primary" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">novidade</p>
                                <p className="text-sm font-semibold text-slate-900">Sua demanda foi deferida</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="relative border-y border-slate-200/60 bg-white/70 backdrop-blur py-10 md:py-12">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400 mb-6">Tipos de demanda suportados</p>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Quebra de Pré-requisito</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Revisão de Prova</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Aproveitamento de Horas AC</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Trancamento de Disciplina</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Troca de Turma</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Justificativa de Falta</span>
                    <span className="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Histórico Escolar</span>
                </div>
            </div>
        </section>

        <section id="como-funciona" className="relative py-24 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Fluxo</span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Como uma demanda caminha.
                    </h2>
                    <p className="mt-4 text-slate-500 leading-relaxed">
                        O mesmo trajeto, do começo ao fim, para qualquer tipo de solicitação.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-3 gap-4 md:gap-5" data-reveal>
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                    <div className="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-slate-300 tracking-tight font-mono">01</span>
                            <span className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <Send className="w-4 h-4 text-brand-primary" />
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">O aluno abre a demanda.</h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Escolhe o tipo, descreve o pedido e recebe um protocolo. A demanda entra na fila como Pendente.</p>
                    </div>

                    <div className="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-slate-300 tracking-tight font-mono">02</span>
                            <span className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-brand-primary" />
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">A coordenação analisa.</h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Defere, devolve para ajuste ou envia para análise pedagógica — sempre com a observação registrada.</p>
                    </div>

 
                    <div className="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-slate-300 tracking-tight font-mono">03</span>
                            <span className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight">O aluno acompanha.</h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">O status muda na própria tela. Quando conclui, a demanda vai para o histórico do semestre.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="quem-usa" className="relative py-24 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Perfis</span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Três perfis. Cada um com seu acesso.
                    </h2>
                    <p className="mt-4 text-slate-500 leading-relaxed">
                        Cada perfil enxerga só o que precisa.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4" data-reveal>

                    <article className="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <GraduationCap className="w-4.5 h-4.5 text-brand-primary" />
                        </span>
                        <p className="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Aluno</p>
                        <h3 className="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Solicita e acompanha.</h3>
                        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">Abre demandas como Quebra de Pré-requisito ou Aproveitamento de Horas AC. Vê o status mudar e lê a observação da coordenação no próprio card.</p>
                    </article>

                    <article className="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <UserCog className="w-4.5 h-4.5 text-brand-primary" />
                        </span>
                        <p className="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Coordenador</p>
                        <h3 className="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Recebe, prioriza, decide.</h3>
                        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">Painel com a fila de demandas e prazos críticos. Cada solicitação chega com o histórico do aluno e o contexto necessário para responder.</p>
                    </article>

                    <article className="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <Users className="w-4.5 h-4.5 text-brand-primary" />
                        </span>
                        <p className="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Professor</p>
                        <h3 className="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Análise pedagógica.</h3>
                        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">Acesso por chave de ativação institucional, com perfil dedicado para revisões de prova, justificativas de falta e validação de aproveitamento.</p>
                    </article>
                </div>
            </div>
        </section>


        <section className="relative py-20 md:py-24">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white border border-slate-200/70 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10" data-reveal>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Acesso</p>
                        <h2 className="mt-1.5 text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Acessar a Central de Demandas</h2>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                            Use sua matrícula institucional. O cadastro inicial requer chave de ativação fornecida pela coordenação.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                        <a href="/login" className="btnEntrar btn-primary-cta px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2">
                            Entrar
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a href="/registro" className="btnCriarConta btn-ghost-cta px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center">
                            Criar conta
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <footer className="relative border-t border-slate-200/60 bg-white/60 backdrop-blur">
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-14 grid md:grid-cols-4 gap-8 md:gap-10">
                <div className="md:col-span-2">
                    <a href="#topo" className="flex items-center gap-2.5">
                        <Image src={logo} alt="Clarify" className="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" width={36} height={36} />
                        <div className="leading-none">
                            <p className="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                        </div>
                    </a>
                    <p className="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
                        Sistema interno da instituição para abertura, análise e acompanhamento de demandas acadêmicas.
                    </p>
                </div>

                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Seções</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#como-funciona" className="hover:text-brand-primary transition-colors">Como funciona</a></li>
                        <li><a href="#quem-usa" className="hover:text-brand-primary transition-colors">Perfis</a></li>
                    </ul>
                </div>

                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Acesso</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="/login" className="btnEntrar hover:text-brand-primary transition-colors">Entrar</a></li>
                        <li><a href="/registro" className="btnCriarConta hover:text-brand-primary transition-colors">Criar conta</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-200/60">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <p>© {new Date().getFullYear()} Clarify · Federal Institution</p>
                    <p>Uso institucional</p>
                </div>
            </div>
        </footer>

    </div>
  );
}
