import * as aux from '../lib/funcoesAuxiliares.js'
import logoClarify from '../components/assets/GATOGORDO.png'
import {
    createIcons,
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
    Users
} from 'lucide'

// Ícones usados pela landing.
const iconesUsados = {
    ArrowRight, Bell, Calendar, Check, CheckCircle2, Clock,
    Eye, GraduationCap, Plus, Send, UserCog, Users
}

export function carregarLanding() {
    aux.adicionarCaminhoURL('')
    document.querySelector('title').innerHTML = 'Clarify'

    document.querySelector('#app').innerHTML = `
    <div class="relative min-h-screen text-slate-900 overflow-x-hidden">

        <!-- Fundo ambiente, bem sutil -->
        <div class="pointer-events-none fixed inset-0 -z-10">
            <div class="absolute inset-0 bg-dot-grid opacity-25"></div>
            <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-radial-warm opacity-70"></div>
        </div>

        <!-- Nav -->
        <nav id="landingNav" class="sticky top-0 z-30 border-b border-transparent">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#topo" class="flex items-center gap-2.5">
                    <img src="${logoClarify}" alt="Clarify" class="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" />
                    <div class="leading-none">
                        <p class="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                        <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                    </div>
                </a>

                <div class="hidden md:flex items-center gap-1">
                    <a href="#como-funciona" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Como funciona</a>
                    <a href="#quem-usa" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Perfis</a>
                </div>

                <div class="flex items-center gap-2">
                    <a href="/registro" class="btnCriarConta hidden sm:inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors">
                        Criar conta
                    </a>
                    <a href="/login" class="btnEntrar btn-primary-cta inline-flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2">
                        Entrar
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section id="topo" class="relative pt-14 md:pt-24 pb-16 md:pb-24">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center max-w-3xl mx-auto" data-reveal>
                    <h1 class="text-4xl md:text-6xl font-bold tracking-headline leading-[1.05] text-slate-900">
                        Aberto, em análise,<br/>
                        <span class="text-gradient-warm">resolvido.</span>
                    </h1>

                    <p class="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
                        O caminho de cada solicitação acadêmica, do clique do aluno à resposta da coordenação. Em um lugar só, com protocolo único e histórico do semestre.
                    </p>

                    <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href="/login" class="btnEntrar btn-primary-cta inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Entrar
                            <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                        <a href="/registro" class="btnCriarConta btn-ghost-cta inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 w-full sm:w-auto">
                            Criar conta
                        </a>
                    </div>

                    <p class="mt-5 text-xs text-slate-400">
                        Acesso por matrícula institucional · Cadastro de coordenadores por chave de ativação
                    </p>
                </div>

                <!-- Preview da Central de Demandas -->
                <div class="mt-16 md:mt-24 relative max-w-5xl mx-auto" data-reveal>
                    <div class="pointer-events-none absolute -inset-x-12 -inset-y-10">
                        <div class="absolute inset-x-10 top-6 h-72 rounded-[3rem] bg-gradient-to-br from-brand-primary/25 via-orange-300/25 to-amber-200/20 blur-3xl"></div>
                    </div>

                    <div class="relative preview-tilt">
                        <div class="relative bg-white border border-slate-200/80 rounded-3xl shadow-soft-xl overflow-hidden">
                            <!-- Browser chrome -->
                            <div class="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
                                <span class="w-2.5 h-2.5 rounded-full bg-rose-300"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                                <span class="ml-3 text-[11px] text-slate-400 font-mono tracking-tight">clarify.app/centraldemandas</span>
                                <span class="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    ao vivo
                                </span>
                            </div>

                            <div class="p-5 md:p-8">
                                <div class="flex items-end justify-between mb-5">
                                    <div>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Portal · Central de Demandas</p>
                                        <h3 class="text-xl md:text-2xl font-bold text-slate-900 mt-1">Em Aberto <span class="text-slate-300 ml-1 text-base">3</span></h3>
                                    </div>
                                    <span class="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1.5">
                                        <i data-lucide="plus" class="w-3.5 h-3.5"></i> Nova demanda
                                    </span>
                                </div>

                                <div class="grid md:grid-cols-3 gap-3.5">
                                    <!-- Card 1: Em Análise -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-402</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-800 border-blue-200">Em Análise</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Quebra de Pré-requisito</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Solicitação de matrícula em Compiladores antes de Linguagens Formais.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>

                                    <!-- Card 2: Pendente -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-419</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">Pendente</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Revisão de Prova</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">Pedido de revisão da prova final de Estrutura de Dados.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>

                                    <!-- Card 3: Requer Ajuste -->
                                    <article class="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-2.5">
                                        <div class="flex items-center justify-between gap-2">
                                            <span class="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-388</span>
                                            <span class="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-rose-50 text-rose-800 border-rose-200">Requer Ajuste</span>
                                        </div>
                                        <h4 class="text-sm font-bold text-slate-900 leading-snug">Aproveitamento AC</h4>
                                        <p class="text-[12px] text-slate-500 leading-relaxed line-clamp-2">40h validadas — pendência: anexar declaração legível.</p>
                                        <div class="flex items-center gap-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                                            <span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 02 Out</span>
                                            <span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> hoje</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>

                        <!-- Cartão flutuante: concluído -->
                        <div class="hidden md:flex absolute -left-10 bottom-10 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow">
                            <span class="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
                            </span>
                            <div class="leading-tight">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">REQ-320</p>
                                <p class="text-sm font-semibold text-slate-900">Concluído em 15 Out</p>
                            </div>
                        </div>

                        <!-- Cartão flutuante: notificação -->
                        <div class="hidden md:flex absolute -right-8 top-16 items-center gap-3 bg-white border border-slate-200/80 rounded-2xl shadow-soft-md px-4 py-3 animate-float-slow" style="animation-delay: -3s">
                            <span class="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                                <i data-lucide="bell" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                            <div class="leading-tight">
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">novidade</p>
                                <p class="text-sm font-semibold text-slate-900">Sua demanda foi deferida</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tipos de demanda -->
        <section class="relative border-y border-slate-200/60 bg-white/70 backdrop-blur py-10 md:py-12">
            <div class="max-w-6xl mx-auto px-6">
                <p class="text-center text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400 mb-6">Tipos de demanda suportados</p>
                <div class="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Quebra de Pré-requisito</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Revisão de Prova</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Aproveitamento de Horas AC</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Trancamento de Disciplina</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Troca de Turma</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Justificativa de Falta</span>
                    <span class="px-4 py-2 rounded-full bg-brand-surface border border-brand-surface-dim/70 text-[13px] font-medium text-slate-700 hover:border-brand-primary/40 hover:text-brand-primary transition-colors">Histórico Escolar</span>
                </div>
            </div>
        </section>

        <!-- Como funciona -->
        <section id="como-funciona" class="relative py-24 md:py-28">
            <div class="max-w-6xl mx-auto px-6">
                <div class="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Fluxo</span>
                    <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Como uma demanda caminha.
                    </h2>
                    <p class="mt-4 text-slate-500 leading-relaxed">
                        O mesmo trajeto, do começo ao fim, para qualquer tipo de solicitação.
                    </p>
                </div>

                <div class="relative grid md:grid-cols-3 gap-4 md:gap-5" data-reveal>
                    <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                    <!-- Passo 01 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">01</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="send" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">O aluno abre a demanda.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">Escolhe o tipo, descreve o pedido e recebe um protocolo. A demanda entra na fila como Pendente.</p>
                    </div>

                    <!-- Passo 02 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">02</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="eye" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">A coordenação analisa.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">Defere, devolve para ajuste ou envia para análise pedagógica — sempre com a observação registrada.</p>
                    </div>

                    <!-- Passo 03 -->
                    <div class="relative bg-white border border-slate-200/70 rounded-2xl p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-slate-300 tracking-tight font-mono">03</span>
                            <span class="w-9 h-9 rounded-xl bg-brand-surface border border-brand-surface-dim/70 flex items-center justify-center">
                                <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-primary"></i>
                            </span>
                        </div>
                        <h3 class="text-base font-bold text-slate-900 tracking-tight">O aluno acompanha.</h3>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">O status muda na própria tela. Quando conclui, a demanda vai para o histórico do semestre.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Perfis -->
        <section id="quem-usa" class="relative py-24 md:py-28">
            <div class="max-w-6xl mx-auto px-6">
                <div class="max-w-2xl mb-12 md:mb-14" data-reveal>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.32em]">Perfis</span>
                    <h2 class="mt-2 text-3xl md:text-4xl font-bold tracking-headline leading-[1.1] text-slate-900">
                        Três perfis. Cada um com seu acesso.
                    </h2>
                    <p class="mt-4 text-slate-500 leading-relaxed">
                        Cada perfil enxerga só o que precisa.
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-4" data-reveal>
                    <!-- Aluno -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="graduation-cap" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Aluno</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Solicita e acompanha.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Abre demandas como Quebra de Pré-requisito ou Aproveitamento de Horas AC. Vê o status mudar e lê a observação da coordenação no próprio card.</p>
                    </article>

                    <!-- Coordenador -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="user-cog" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Coordenador</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Recebe, prioriza, decide.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Painel com a fila de demandas e prazos críticos. Cada solicitação chega com o histórico do aluno e o contexto necessário para responder.</p>
                    </article>

                    <!-- Professor -->
                    <article class="bg-white border border-slate-200/70 rounded-2xl p-7">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-surface-dim/70">
                            <i data-lucide="users" class="w-4.5 h-4.5 text-brand-primary"></i>
                        </span>
                        <p class="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Professor</p>
                        <h3 class="mt-1 text-base font-bold text-slate-900 tracking-tight leading-snug">Análise pedagógica.</h3>
                        <p class="mt-2.5 text-sm text-slate-500 leading-relaxed">Acesso por chave de ativação institucional, com perfil dedicado para revisões de prova, justificativas de falta e validação de aproveitamento.</p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Painel de acesso -->
        <section class="relative py-20 md:py-24">
            <div class="max-w-3xl mx-auto px-6">
                <div class="bg-white border border-slate-200/70 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10" data-reveal>
                    <div class="flex-1">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Acesso</p>
                        <h2 class="mt-1.5 text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Acessar a Central de Demandas</h2>
                        <p class="mt-2 text-sm text-slate-500 leading-relaxed">
                            Use sua matrícula institucional. O cadastro inicial requer chave de ativação fornecida pela coordenação.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                        <a href="/login" class="btnEntrar btn-primary-cta px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2">
                            Entrar
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                        <a href="/registro" class="btnCriarConta btn-ghost-cta px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center">
                            Criar conta
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="relative border-t border-slate-200/60 bg-white/60 backdrop-blur">
            <div class="max-w-6xl mx-auto px-6 py-12 md:py-14 grid md:grid-cols-4 gap-8 md:gap-10">
                <div class="md:col-span-2">
                    <a href="#topo" class="flex items-center gap-2.5">
                        <img src="${logoClarify}" alt="Clarify" class="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]" />
                        <div class="leading-none">
                            <p class="text-base font-bold text-slate-900 tracking-tight">Clarify</p>
                            <p class="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
                        </div>
                    </a>
                    <p class="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
                        Sistema interno da instituição para abertura, análise e acompanhamento de demandas acadêmicas.
                    </p>
                </div>

                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Seções</p>
                    <ul class="space-y-2 text-sm text-slate-600">
                        <li><a href="#como-funciona" class="hover:text-brand-primary transition-colors">Como funciona</a></li>
                        <li><a href="#quem-usa" class="hover:text-brand-primary transition-colors">Perfis</a></li>
                    </ul>
                </div>

                <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em] mb-3.5">Acesso</p>
                    <ul class="space-y-2 text-sm text-slate-600">
                        <li><a href="/login" class="btnEntrar hover:text-brand-primary transition-colors">Entrar</a></li>
                        <li><a href="/registro" class="btnCriarConta hover:text-brand-primary transition-colors">Criar conta</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-slate-200/60">
                <div class="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <p>© ${new Date().getFullYear()} Clarify · Federal Institution</p>
                    <p>Uso institucional</p>
                </div>
            </div>
        </footer>

    </div>
    `

    createIcons({ icons: iconesUsados, attrs: { 'stroke-width': 1.6 } })
}

export function ativarListenerLanding() {
    // Botões que vão para o login.
    const botoesEntrar = document.querySelectorAll('.btnEntrar');
    for (let i = 0; i < botoesEntrar.length; ++i) {
        botoesEntrar[i].addEventListener('click', (e) => {
            e.preventDefault();
            aux.adicionarCaminhoURL('login');
        });
    }

    // Botões que vão para o registro.
    const botoesCriarConta = document.querySelectorAll('.btnCriarConta');
    for (let i = 0; i < botoesCriarConta.length; ++i) {
        botoesCriarConta[i].addEventListener('click', (e) => {
            e.preventDefault();
            aux.adicionarCaminhoURL('registro');
        });
    }

    // Scroll suave para as âncoras do menu.
    const ancoras = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < ancoras.length; ++i) {
        ancoras[i].addEventListener('click', (e) => {
            const id = ancoras[i].getAttribute('href').slice(1);
            if (id === '') return;
            const alvo = document.getElementById(id);
            if (!alvo) return;
            e.preventDefault();
            alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Efeito de glass na nav quando rola a página.
    const nav = document.getElementById('landingNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 12) nav.classList.add('is-scrolled');
            else nav.classList.remove('is-scrolled');
        });
    }

    // Faz aparecer aos poucos os blocos com data-reveal quando entram na tela.
    const reveals = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; ++i) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('is-revealed');
                io.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.12 });
    for (let i = 0; i < reveals.length; ++i) {
        io.observe(reveals[i]);
    }
}
