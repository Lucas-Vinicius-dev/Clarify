'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/AuthContext'
import { registroSchema, type RegistroFormData } from '@/schemas/auth'
import { validarSenhaForca } from '@/lib/utils'

export default function RegistroPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [senhaForca, setSenhaForca] = useState<{ valido: boolean; erros: string[]; forca: 'fraca' | 'media' | 'forte' }>({ valido: false, erros: [], forca: 'fraca' })
  const [senhaValor, setSenhaValor] = useState('')
  const router = useRouter()
  const { registro } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
    mode: 'onBlur',
  })

  async function onSubmit(data: RegistroFormData) {
    setError('')
    setIsLoading(true)

    try {
      const resultado = await registro({
        nome: data.nome,
        matricula: data.matricula,
        email: data.email,
        senha: data.senha,
        cargo: 'coordenador',
        chaveAtivacao: data.chaveAtivacao,
      })

      if (resultado.ok) {
        router.push('/dashboardcoord')
      } else {
        setError(resultado.mensagem || 'Erro ao criar a conta.')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
      console.error(err)
    } finally {
      setIsLoading(false)
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-brand-surface dark:bg-slate-900">
      {/* Fundo Geométrico com Losangos */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none animate-cubes"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
            linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
            linear-gradient(30deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
            linear-gradient(150deg, #ca5f15 12%, transparent 12.5%, transparent 87%, #ca5f15 87.5%, #ca5f15),
            linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09),
            linear-gradient(60deg, #8a3f09 25%, transparent 25.5%, transparent 75%, #8a3f09 75%, #8a3f09)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />

      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 z-10 border border-brand-surface-dim dark:border-slate-700">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
            <Image src="/GATOGORDO.png" alt="Clarify Logo" width={72} height={72} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Clarify</h1>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 tracking-wider uppercase mt-1">Acesso - Instituto Federal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="registro-fullName" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              Nome Completo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                id="registro-fullName"
                type="text"
                {...register('nome')}
                placeholder="e.g. John Doe"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            {errors.nome && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="registro-institutionalId" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              ID Institucional
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                id="registro-institutionalId"
                type="text"
                {...register('matricula')}
                placeholder="e.g. 123456789"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            {errors.matricula && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.matricula.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="registro-institutionalEmail" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              Email Institucional
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
              <input
                id="registro-institutionalEmail"
                type="email"
                {...register('email')}
                placeholder="e.g. john.doe@academico.edu.br"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="registro-securityKey" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              Chave de Segurança
            </label>
            <div className="relative">
              <input
                id="registro-securityKey"
                type={mostrarSenha ? 'text' : 'password'}
                {...register('senha', {
                  onChange: (e) => {
                    setSenhaValor(e.target.value)
                    setSenhaForca(validarSenhaForca(e.target.value))
                  },
                })}
                placeholder="••••••••"
                className="block w-full pl-3 pr-10 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {senhaValor && (() => {
              const pts = [
                senhaValor.length >= 8,
                /[0-9]/.test(senhaValor),
                /[^a-zA-Z0-9]/.test(senhaValor),
                /[A-Z]/.test(senhaValor),
                /[a-z]/.test(senhaValor),
              ].filter(Boolean).length
              return (
                <>
                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      senhaForca.forca === 'fraca' ? 'bg-red-500' : senhaForca.forca === 'media' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${pts * 20}%` }}
                  />
                </div>
                <ul className="mt-2 space-y-1">
                  {[
                    { texto: 'Mínimo de 6 caracteres', test: senhaValor.length >= 6 },
                    { texto: 'Pelo menos 8 caracteres', test: senhaValor.length >= 8 },
                    { texto: 'Pelo menos 1 número', test: /[0-9]/.test(senhaValor) },
                    { texto: 'Pelo menos 1 caractere especial', test: /[^a-zA-Z0-9]/.test(senhaValor) },
                    { texto: 'Letras maiúsculas e minúsculas', test: /[A-Z]/.test(senhaValor) && /[a-z]/.test(senhaValor) },
                  ].map((req) => (
                    <li key={req.texto} className="flex items-center gap-2 text-xs">
                      <span className={req.test ? 'text-green-600' : 'text-red-400'}>
                        {req.test ? '✓' : '✗'}
                      </span>
                      <span className={req.test ? 'text-gray-700' : 'text-gray-400'}>{req.texto}</span>
                    </li>
                  ))}
                </ul>
              </>
              )
            })()}
            {errors.senha && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.senha.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="registro-activationKey" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              Chave de Ativação
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-slate-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </span>
              <input
                id="registro-activationKey"
                type="text"
                {...register('chaveAtivacao', {
                  onChange: (e) => {
                    const valorUpper = e.target.value.toUpperCase()
                    const valorLimpo = valorUpper.replace(/[^A-Z0-9]/g, '')
                    e.target.value = valorLimpo
                  },
                })}
                placeholder="Chave fornecida pela instituição"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
            {errors.chaveAtivacao && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.chaveAtivacao.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-widest">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:-translate-y-1 transition-all duration-150 ease-out disabled:opacity-50 disabled:hover:bg-brand-primary disabled:hover:translate-y-0"
          >
            {isLoading ? 'Criando conta...' : 'Criar Conta'}
          </button>

          <div className="text-center text-sm">
            <Link href="/login" className="block font-semibold text-brand-primary hover:underline transition-all">
              Voltar para Login
            </Link>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Somente indivíduos autorizados.</p>
          <p className="text-xs text-gray-300 dark:text-slate-500 mt-1">Versão v0.0.0</p>
        </div>
      </div>
    </div>
    </>
  )
}