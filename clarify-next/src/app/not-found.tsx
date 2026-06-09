'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para home após 5 segundos se o usuário não clicar
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-surface">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-brand-primary">404</h1>
          <p className="text-xl md:text-2xl font-bold text-slate-900 mt-4">Página não encontrada</p>
        </div>

        <p className="text-slate-600 text-base mb-8">
          A página que você está procurando não existe ou foi movida. Retorne à página inicial e tente novamente.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-orange-700 transition-colors"
          >
            Ir para Home
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Voltar
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-8">Redirecionando para home em 10 segundos...</p>
      </div>
    </div>
  )
}
