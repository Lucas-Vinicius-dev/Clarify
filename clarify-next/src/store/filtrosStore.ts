import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StatusDemanda } from '@/types'

interface FiltrosState {
  busca: string
  filtroStatus: StatusDemanda | 'todos'
  setBusca: (busca: string) => void
  setFiltroStatus: (status: StatusDemanda | 'todos') => void
  resetFiltros: () => void
}

export const useFiltrosStore = create<FiltrosState>()(
  persist(
    (set) => ({
      busca: '',
      filtroStatus: 'todos',
      setBusca: (busca) => set({ busca }),
      setFiltroStatus: (status) => set({ filtroStatus: status }),
      resetFiltros: () => set({ busca: '', filtroStatus: 'todos' }),
    }),
    { name: 'clarify-filtros' }
  )
)