'use client'

import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { redefinirSenhaSchema, type RedefinirSenhaFormData } from '@/schemas/auth'

export default function RedefinirSenhaPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RedefinirSenhaFormData>({
    resolver: zodResolver(redefinirSenhaSchema),
    mode: 'onBlur',
  })

  async function onSubmit(data: RedefinirSenhaFormData) {
    setError('')
    setIsLoading(true)

    const { error: erroSupabase } = await supabase.auth.updateUser({ password: data.senha })

    if (erroSupabase) {
      setError('Não foi possível redefinir a senha. Solicite um novo link.')
      setIsLoading(false)
      return
    }

    router.push('/login')
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
          <p className="text-sm font-medium text-gray-500 tracking-wider uppercase mt-1">Redefinir Senha</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="redefinir-senha" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Nova Senha
            </label>
            <div className="relative">
              <input
                id="redefinir-senha"
                type={mostrarSenha ? 'text' : 'password'}
                {...register('senha')}
                placeholder="••••••••"
                className="block w-full pl-3 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.senha && (
              <p className="text-xs text-red-600 mt-1 ml-1">{errors.senha.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="redefinir-confirmar" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                id="redefinir-confirmar"
                type={mostrarSenha ? 'text' : 'password'}
                {...register('confirmarSenha')}
                placeholder="••••••••"
                className="block w-full pl-3 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmarSenha && (
              <p className="text-xs text-red-600 mt-1 ml-1">{errors.confirmarSenha.message}</p>
            )}
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
            {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 font-medium">Somente indivíduos autorizados.</p>
          <p className="text-xs text-gray-300 mt-1">Versão v0.0.0</p>
        </div>
      </div>
    </div>
    </>
  )
}
