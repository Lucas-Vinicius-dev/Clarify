'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const institutionalId = formData.get('institutionalId') as string
      const securityKey = formData.get('securityKey') as string

      const resultado = login(institutionalId, securityKey)

      if (resultado.ok && resultado.usuarioLogado) {
        router.push(
          resultado.usuarioLogado.cargo === 'aluno' ? '/centraldemandas' : '/dashboardcoord'
        )
      } else {
        setError(resultado.mensagem || 'Erro ao autenticar. Verifique suas credenciais.')
      }
    } catch {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-brand-surface">
      {/* Fundo Geométrico com Losangos */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none animate-pulse"
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

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 border border-brand-surface-dim">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
            <Image src="/GATOGORDO.png" alt="Clarify Logo" width={72} height={72} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Clarify</h1>
          <p className="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">Acesso - Instituto Federal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="login-institutionalId" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              ID Institucional
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
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
                id="login-institutionalId"
                type="text"
                name="institutionalId"
                placeholder="e.g. 123456789"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-securityKey" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Chave de Segurança
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="login-securityKey"
                type="password"
                name="securityKey"
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-bold text-red-700 uppercase tracking-widest">{error}</p>
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
            <button type="button" className="block w-full font-semibold text-brand-primary hover:underline transition-all">
              Recuperar Credenciais de Acesso
            </button>
            <Link href="/registro" className="block font-semibold text-brand-primary hover:underline transition-all">
              Ir para o Registro
            </Link>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 font-medium">Somente indivíduos autorizados.</p>
          <p className="text-xs text-gray-300 mt-1">Versão v0.0.0</p>
        </div>
      </div>
    </div>
  )
}
