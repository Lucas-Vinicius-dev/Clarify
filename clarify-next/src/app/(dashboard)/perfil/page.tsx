'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Save, KeyRound, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { usePerfil } from '@/hooks/usePerfil'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import {
  perfilSchema,
  type PerfilFormData,
  senhaSchema,
  type SenhaFormData,
} from '@/schemas/perfil'
import type { Cargo } from '@/types'

const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)] dark:text-slate-400"
const inputClass = "w-full bg-transparent border-0 border-b-[1.5px] border-[rgba(15,23,42,0.10)] dark:border-slate-700 py-2 px-0 text-lg leading-[1.3] -tracking-[0.01em] text-[#0f172a] dark:text-slate-100 placeholder:text-[rgba(15,23,42,0.30)] dark:placeholder:text-slate-500 placeholder:font-normal focus:outline-none focus:border-b-[#ca5f15] transition-[border-color] duration-180"
const dotClass = "inline-block w-1.5 h-1.5 rounded-full bg-[#ca5f15] shadow-[0_0_0_3px_rgba(202,95,21,0.18)]"
const btnPrimaryClass = "inline-flex items-center gap-2 bg-[#ca5f15] text-white font-bold text-sm -tracking-[0.005em] py-3 px-5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_1px_2px_rgba(202,95,21,0.30),_0_10px_24px_-10px_rgba(202,95,21,0.55)] hover:bg-[#b35211] hover:-translate-y-px active:translate-y-0 disabled:bg-[rgba(15,23,42,0.10)] disabled:text-[rgba(15,23,42,0.35)] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none transition-[transform,box-shadow,background-color] duration-180 cursor-pointer"

const CARGO_LABEL: Record<Cargo, string> = { aluno: 'Aluno', coordenador: 'Coordenador' }

type Mensagem = { ok: boolean; texto: string } | null

function Feedback({ msg }: { msg: Mensagem }) {
  if (!msg) return null
  return (
    <div
      className={cn(
        'inline-flex items-start gap-2 text-xs font-semibold rounded-lg px-3 py-2 border',
        msg.ok
          ? 'text-green-700 bg-green-50 border-green-200 dark:text-green-300 dark:bg-green-900/30 dark:border-green-800'
          : 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-900/30 dark:border-rose-800'
      )}
    >
      {!msg.ok && <AlertCircle className="w-4 h-4 mt-px shrink-0" />}
      <span>{msg.texto}</span>
    </div>
  )
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className={labelClass}>{label}</dt>
      <dd className="text-base font-semibold text-gray-900 dark:text-slate-100 mt-1 break-words">{value || '—'}</dd>
    </div>
  )
}

export default function PerfilPage() {
  const { usuario } = useAuth()
  const { data: perfil, atualizar } = usePerfil(usuario?.id)

  const [dadosMsg, setDadosMsg] = useState<Mensagem>(null)
  const [senhaMsg, setSenhaMsg] = useState<Mensagem>(null)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirma, setMostrarConfirma] = useState(false)

  const dadosForm = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    mode: 'onBlur',
    values: { nome: perfil?.nome ?? '', telefone: perfil?.telefone ?? '' },
    resetOptions: { keepDirtyValues: true },
  })

  const senhaForm = useForm<SenhaFormData>({
    resolver: zodResolver(senhaSchema),
    mode: 'onBlur',
  })

  async function onSubmitDados(data: PerfilFormData) {
    setDadosMsg(null)
    try {
      await atualizar(data)
      setDadosMsg({ ok: true, texto: 'Perfil atualizado com sucesso!' })
    } catch (err) {
      setDadosMsg({ ok: false, texto: err instanceof Error ? err.message : 'Erro ao atualizar perfil.' })
    }
  }

  async function onSubmitSenha(data: SenhaFormData) {
    setSenhaMsg(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: data.senha })
    if (error) {
      setSenhaMsg({ ok: false, texto: error.message })
    } else {
      setSenhaMsg({ ok: true, texto: 'Senha alterada com sucesso!' })
      senhaForm.reset()
    }
  }

  return (
    <>
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear,
        input[type="password"]::-webkit-credentials-auto-fill-button,
        input[type="password"]::-webkit-textfield-decoration-container {
          display: none !important;
        }
      `}</style>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-slate-100 tracking-tighter-2">Meu Perfil</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">Gerencie suas informações pessoais e segurança.</p>
        </header>

        <Card className="p-6 space-y-5">
          <div className="inline-flex items-center gap-2">
            <span className={dotClass} />
            <span className={labelClass}>Informações</span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Info label="Nome" value={perfil?.nome} />
            <Info label="Matrícula" value={perfil?.matricula} />
            <Info label="E-mail" value={perfil?.email} />
            <Info label="Cargo" value={perfil ? CARGO_LABEL[perfil.cargo] : ''} />
            <Info label="Telefone" value={perfil?.telefone} />
          </dl>
        </Card>

        <Card className="p-6">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className={dotClass} />
            <span className={labelClass}>Editar dados</span>
          </div>
          <form onSubmit={dadosForm.handleSubmit(onSubmitDados)} className="space-y-6">
            <div>
              <label htmlFor="perfil-nome" className={labelClass}>Nome Completo</label>
              <input
                id="perfil-nome"
                type="text"
                {...dadosForm.register('nome')}
                className={cn(inputClass, 'font-semibold mt-1')}
                placeholder="Seu nome completo"
              />
              {dadosForm.formState.errors.nome && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{dadosForm.formState.errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="perfil-telefone" className={labelClass}>Telefone</label>
              <input
                id="perfil-telefone"
                type="tel"
                {...dadosForm.register('telefone')}
                className={cn(inputClass, 'font-semibold mt-1')}
                placeholder="(00) 00000-0000"
              />
              {dadosForm.formState.errors.telefone && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{dadosForm.formState.errors.telefone.message}</p>
              )}
            </div>

            <Feedback msg={dadosMsg} />

            <div className="flex justify-end">
              <button type="submit" disabled={dadosForm.formState.isSubmitting} className={btnPrimaryClass}>
                <Save className="w-4 h-4" />
                Salvar alterações
              </button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className={dotClass} />
            <span className={labelClass}>Alterar senha</span>
          </div>
          <form onSubmit={senhaForm.handleSubmit(onSubmitSenha)} className="space-y-6">
            <div>
              <label htmlFor="perfil-senha" className={labelClass}>Nova senha</label>
              <div className="relative">
                <input
                  id="perfil-senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  {...senhaForm.register('senha')}
                  className={cn(inputClass, 'font-semibold mt-1 pr-8')}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  tabIndex={-1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {senhaForm.formState.errors.senha && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{senhaForm.formState.errors.senha.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="perfil-confirma" className={labelClass}>Confirmar nova senha</label>
              <div className="relative">
                <input
                  id="perfil-confirma"
                  type={mostrarConfirma ? 'text' : 'password'}
                  {...senhaForm.register('confirmacao')}
                  className={cn(inputClass, 'font-semibold mt-1 pr-8')}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirma(!mostrarConfirma)}
                  tabIndex={-1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                >
                  {mostrarConfirma ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {senhaForm.formState.errors.confirmacao && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{senhaForm.formState.errors.confirmacao.message}</p>
              )}
            </div>

            <Feedback msg={senhaMsg} />

            <div className="flex justify-end">
              <button type="submit" disabled={senhaForm.formState.isSubmitting} className={btnPrimaryClass}>
                <KeyRound className="w-4 h-4" />
                Alterar senha
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}
