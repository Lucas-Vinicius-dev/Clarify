'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/AuthContext'
import { loginSchema, type LoginFormData } from '@/schemas/auth'

export default function LoginPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  async function onSubmit(data: LoginFormData) {
    setError('')
    setIsLoading(true)

    try {
      const resultado = await login(data.matricula, data.senha)

      if (resultado.ok && resultado.usuarioLogado) {
        router.push(
          resultado.usuarioLogado.cargo === 'aluno' ? '/centraldemandas' : '/dashboardcoord'
        )
      } else {
        setError(resultado.mensagem || 'Usuário ou senha incorretos.')
      }
    } catch {
      setError('Erro inesperado. Tente novamente.')
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="login-matricula" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
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
                id="login-matricula"
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
            <label htmlFor="login-senha" className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 ml-1">
              Chave de Segurança
            </label>
            <div className="relative">
              <input
                id="login-senha"
                type={mostrarSenha ? 'text' : 'password'}
                {...register('senha')}
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
            {errors.senha && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 ml-1">{errors.senha.message}</p>
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
            {isLoading ? 'Autenticando...' : 'Autenticar'}
          </button>

          <div className="space-y-3 text-center text-sm">
            <Link href="/recuperar-senha" className="block font-semibold text-brand-primary hover:underline transition-all">
              Recuperar Credenciais de Acesso
            </Link>
            <Link href="/registro" className="block font-semibold text-brand-primary hover:underline transition-all">
              Ir para o Registro
            </Link>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">Somente indivíduos autorizados.</p>
          <p className="text-xs text-gray-300 dark:text-slate-500 mt-1">Versão v0.0.0</p>
        </div>
      </div>
    </div>
    </>
  )
}