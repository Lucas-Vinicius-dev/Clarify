import type { Demanda, UsuarioLogado } from '@/types';

export interface DashboardUiState {
  modalTurmaAberta: boolean;
  modalFeedbackAberta: boolean;
  protocoloFeedback: string | null;
  modalDetalhesAberta: boolean;
  demandaDetalhe: Demanda | null;
  remetenteDetalhe: UsuarioLogado | null;
}

export const initialDashboardUiState: DashboardUiState = {
  modalTurmaAberta: false,
  modalFeedbackAberta: false,
  protocoloFeedback: null,
  modalDetalhesAberta: false,
  demandaDetalhe: null,
  remetenteDetalhe: null,
};

export type DashboardUiAction =
  | { type: 'abrirModalTurma' }
  | { type: 'fecharModalTurma' }
  | { type: 'abrirFeedback'; protocolo: string }
  | { type: 'fecharFeedback' }
  | { type: 'abrirDetalhes'; demanda: Demanda | null; remetente: UsuarioLogado | null }
  | { type: 'fecharDetalhes' };

export function dashboardUiReducer(state: DashboardUiState, action: DashboardUiAction): DashboardUiState {
  switch (action.type) {
    case 'abrirModalTurma':
      return { ...state, modalTurmaAberta: true };
    case 'fecharModalTurma':
      return { ...state, modalTurmaAberta: false };
    case 'abrirFeedback':
      return { ...state, protocoloFeedback: action.protocolo, modalFeedbackAberta: true };
    case 'fecharFeedback':
      return { ...state, modalFeedbackAberta: false, protocoloFeedback: null };
    case 'abrirDetalhes':
      return {
        ...state,
        demandaDetalhe: action.demanda,
        remetenteDetalhe: action.remetente,
        modalDetalhesAberta: true,
      };
    case 'fecharDetalhes':
      return { ...state, modalDetalhesAberta: false, demandaDetalhe: null, remetenteDetalhe: null };
    default:
      return state;
  }
}
