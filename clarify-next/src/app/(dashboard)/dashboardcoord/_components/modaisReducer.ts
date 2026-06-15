import type { Demanda } from '@/types';

/** Estado agrupado dos modais do dashboard do coordenador. */
export interface ModaisState {
  turma: boolean;
  feedback: boolean;
  detalhes: boolean;
  demandaDetalhe: Demanda | null;
}

export const modaisInicial: ModaisState = {
  turma: false,
  feedback: false,
  detalhes: false,
  demandaDetalhe: null,
};

export type ModaisAction =
  | { type: 'abrirTurma' }
  | { type: 'fecharTurma' }
  | { type: 'abrirFeedback' }
  | { type: 'fecharFeedback' }
  | { type: 'abrirDetalhes'; demanda: Demanda | null }
  | { type: 'fecharDetalhes' };

export function modaisReducer(state: ModaisState, action: ModaisAction): ModaisState {
  switch (action.type) {
    case 'abrirTurma':
      return { ...state, turma: true };
    case 'fecharTurma':
      return { ...state, turma: false };
    case 'abrirFeedback':
      return { ...state, feedback: true };
    case 'fecharFeedback':
      return { ...state, feedback: false };
    case 'abrirDetalhes':
      return { ...state, detalhes: true, demandaDetalhe: action.demanda };
    case 'fecharDetalhes':
      return { ...state, detalhes: false, demandaDetalhe: null };
    default:
      return state;
  }
}
