'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-surface dark:bg-slate-900">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-brand-primary">404</h1>
          <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-4">Página não encontrada</p>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-base mb-8">
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
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}
