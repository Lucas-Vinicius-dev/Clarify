'use client'

import { createContext, use, useEffect, useState, ReactNode } from 'react'

type Tema = 'light' | 'dark'

interface ThemeContextValue {
  tema: Tema
  alternarTema: () => void
}

const CHAVE_TEMA = 'clarify_tema'

const ThemeContext = createContext<ThemeContextValue | null>(null)

// No servidor não há localStorage: assume 'light'. O cliente lê a preferência
// salva já na inicialização do estado, sem efeito extra de sincronização.
function temaInicial(): Tema {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem(CHAVE_TEMA) === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
    localStorage.setItem(CHAVE_TEMA, tema)
  }, [tema])

  const alternarTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = use(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return ctx
}
