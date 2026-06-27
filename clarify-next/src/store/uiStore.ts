import { create } from 'zustand'
import type { Demanda, UsuarioLogado } from '@/types'

interface UIState {
  // Drawer
  drawerOpen: boolean
  toggleDrawer: () => void
  setDrawer: (open: boolean) => void

  // Modal – nova demanda (aluno)
  modalNovaAberta: boolean
  setModalNovaAberta: (open: boolean) => void

  // Modal – detalhes da demanda (compartilhado entre aluno e coordenador)
  modalDetalhesAberta: boolean
  setModalDetalhesAberta: (open: boolean) => void
  protocoloSelecionado: string | null
  setProtocoloSelecionado: (protocolo: string | null) => void

  // Modal – dashboard do coordenador
  modalTurmaAberta: boolean
  setModalTurmaAberta: (open: boolean) => void
  modalFeedbackAberta: boolean
  setModalFeedbackAberta: (open: boolean) => void
  protocoloFeedback: string | null
  setProtocoloFeedback: (protocolo: string | null) => void
  demandaDetalhe: Demanda | null
  setDemandaDetalhe: (demanda: Demanda | null) => void
  remetenteDetalhe: UsuarioLogado | null
  setRemetenteDetalhe: (remetente: UsuarioLogado | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Drawer
  drawerOpen: false,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  setDrawer: (open) => set({ drawerOpen: open }),

  // Modal – nova demanda
  modalNovaAberta: false,
  setModalNovaAberta: (open) => set({ modalNovaAberta: open }),

  // Modal – detalhes
  modalDetalhesAberta: false,
  setModalDetalhesAberta: (open) => set({ modalDetalhesAberta: open }),
  protocoloSelecionado: null,
  setProtocoloSelecionado: (protocolo) => set({ protocoloSelecionado: protocolo }),

  // Modal – turma
  modalTurmaAberta: false,
  setModalTurmaAberta: (open) => set({ modalTurmaAberta: open }),

  // Modal – feedback
  modalFeedbackAberta: false,
  setModalFeedbackAberta: (open) => set({ modalFeedbackAberta: open }),
  protocoloFeedback: null,
  setProtocoloFeedback: (protocolo) => set({ protocoloFeedback: protocolo }),

  // Modal – detalhes (coordenador)
  demandaDetalhe: null,
  setDemandaDetalhe: (demanda) => set({ demandaDetalhe: demanda }),
  remetenteDetalhe: null,
  setRemetenteDetalhe: (remetente) => set({ remetenteDetalhe: remetente }),
}))
