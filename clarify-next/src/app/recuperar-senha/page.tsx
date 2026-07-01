'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { recuperarSenhaSchema, type RecuperarSenhaFormData } from '@/schemas/auth'

export default function RecuperarSenhaPage() {
  const [enviado, setEnviado] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecuperarSenhaFormData>({
    resolver: zodResolver(recuperarSenhaSchema),
    mode: 'onBlur',
  })

  async function onSubmit(data: RecuperarSenhaFormData) {
    setIsLoading(true)
    try {
      await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      })
    } finally {
      setEnviado(true)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-brand-surface">
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

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 border border-brand-surface-dim">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 bg-orange-50 rounded-xl p-2 flex items-center justify-center">
            <Image src="/GATOGORDO.png" alt="Clarify Logo" width={72} height={72} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Clarify</h1>
          <p className="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">Recuperar Acesso</p>
        </div>

        {enviado ? (
          <div className="space-y-6 text-center">
            <p className="text-sm text-gray-600">
              Se o e-mail informado estiver cadastrado, enviamos um link para redefinir a sua senha.
            </p>
            <Link href="/login" className="block font-semibold text-brand-primary hover:underline transition-all">
              Voltar para Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="recuperar-email" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
                Email Institucional
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
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
                  id="recuperar-email"
                  type="email"
                  {...register('email')}
                  placeholder="e.g. john.doe@academico.edu.br"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 hover:-translate-y-1 transition-all duration-150 ease-out disabled:opacity-50 disabled:hover:bg-brand-primary disabled:hover:translate-y-0"
            >
              {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </button>

            <div className="text-center text-sm">
              <Link href="/login" className="block font-semibold text-brand-primary hover:underline transition-all">
                Voltar para Login
              </Link>
            </div>
          </form>
        )}

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 font-medium">Somente indivíduos autorizados.</p>
          <p className="text-xs text-gray-300 mt-1">Versão v0.0.0</p>
        </div>
      </div>
    </div>
  )
}
