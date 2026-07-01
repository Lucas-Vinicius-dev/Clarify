'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, Check, Clock, Eye, GraduationCap, Plus, Users } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('[data-reveal]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  useReveal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 overflow-x-hidden bg-brand-surface dark:bg-slate-900">
      {/* Fundo sutil */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-25"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-br from-brand-primary/30 via-orange-300/20 to-amber-200/10 blur-3xl opacity-70"></div>
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          scrolled ? 'border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur' : 'border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/GATOGORDO.png"
              alt="Clarify"
              width={36}
              height={36}
              className="w-9 h-9 object-contain drop-shadow-[0_4px_12px_rgba(202,95,21,0.25)]"
            />
            <div className="leading-none">
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">Clarify</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 mt-0.5">Federal Institution</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <a href="#como-funciona" className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Como funciona
            </a>
            <a href="#quem-usa" className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Perfis
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/registro" className="hidden sm:inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 transition-colors">
              Criar conta
            </Link>
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-bold rounded-full px-4 py-2 bg-brand-primary text-white hover:bg-orange-700 transition-colors">
              Entrar
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="topo" className="relative pt-14 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto" data-reveal>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100">
              Aberto, em análise,
              <br />
              <span className="text-gradient-warm">resolvido.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              O caminho de cada solicitação acadêmica, do clique do aluno à resposta da coordenação. Em um lugar só, com protocolo único e histórico do semestre.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-6 py-3 bg-brand-primary text-white hover:bg-orange-700 transition-colors w-full sm:w-auto">
                Entrar
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/registro" className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto">
                Criar conta
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-400">
              Acesso por matrícula institucional · Cadastro de coordenadores por chave de ativação
            </p>
          </div>

          {/* Preview Card */}
          <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto" data-reveal>
            <div className="pointer-events-none absolute -inset-x-12 -inset-y-10">
              <div className="absolute inset-x-10 top-6 h-72 rounded-[3rem] bg-gradient-to-br from-brand-primary/25 via-orange-300/25 to-amber-200/20 blur-3xl"></div>
            </div>

            <div className="relative bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                <span className="ml-3 text-[11px] text-slate-400 font-mono tracking-tight">clarify.app/centraldemandas</span>
                <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  ao vivo
                </span>
              </div>

              <div className="p-5 md:p-8">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.22em]">Portal · Central de Demandas</p>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                      Em Aberto <span className="text-slate-300 ml-1 text-base">3</span>
                    </h3>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 rounded-full px-3 py-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    Nova demanda
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-3.5">
                  {/* Card 1 */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-402</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900">Em Análise</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">Quebra de Pré-requisito</h4>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">Solicitação de matrícula em Compiladores antes de Linguagens Formais.</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 02 Out
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> hoje
                      </span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-419</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900">Pendente</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">Revisão de Prova</h4>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">Pedido de revisão da prova final de Estrutura de Dados.</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 02 Out
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> hoje
                      </span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400 tracking-[0.18em]">#REQ-443</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900">Concluído</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">Cancelamento de Matrícula</h4>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">Solicitação de cancelamento em Linguagens Formais.</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 01 Out
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ontem
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="relative py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">Como funciona</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Três passos para gerenciar todas as solicitações</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {[
              { icon: Users, title: 'Aluno envia', desc: 'Cria uma nova solicitação com tipo, descrição e documentação.' },
              { icon: Eye, title: 'Coordenador analisa', desc: 'Recebe notificação e acompanha o status em tempo real.' },
              { icon: Check, title: 'Resolvido', desc: 'Feedback completo e histórico de todas as interações.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfis */}
      <section id="quem-usa" className="relative py-16 md:py-24 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">Para alunos e coordenadores</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Ferramentas pensadas para cada perfil</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" data-reveal>
            {[
              {
                title: 'Aluno',
                features: ['Enviar solicitações', 'Acompanhar status', 'Receber feedback'],
                icon: GraduationCap,
              },
              {
                title: 'Coordenador',
                features: ['Gerenciar demandas', 'Enviar feedback', 'Gerar relatórios'],
                icon: Users,
              },
              {
                title: 'Professor',
                features: ['Consultar encaminhamentos', 'Acompanhar turmas', 'Apoiar a coordenação'],
                icon: Eye,
              },
            ].map((profile) => (
              <div key={profile.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <profile.icon className="w-8 h-8 text-brand-primary" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{profile.title}</h3>
                </div>
                <ul className="space-y-3">
                  {profile.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <Check className="w-5 h-5 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center" data-reveal>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">Pronto para começar?</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Entre com suas credenciais ou crie uma nova conta</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 text-sm font-bold rounded-xl px-6 py-3 bg-brand-primary text-white hover:bg-orange-700 transition-colors w-full sm:w-auto">
              Entrar
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/registro" className="inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-xl px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto">
              Criar conta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-8 md:py-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-slate-600 dark:text-slate-300 text-sm">
            <p>© 2026 Clarify. Todos os direitos reservados.</p>
            <p className="mt-2">Versão v0.0.0 · Federal Institution</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
