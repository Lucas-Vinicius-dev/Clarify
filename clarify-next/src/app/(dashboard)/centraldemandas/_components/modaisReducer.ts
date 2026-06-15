/** Estado agrupado dos modais da Central de Demandas. */
export interface ModaisState {
  nova: boolean;
  detalhes: boolean;
  protocoloSelecionado: string | null;
}

export const modaisInicial: ModaisState = {
  nova: false,
  detalhes: false,
  protocoloSelecionado: null,
};

export type ModaisAction =
  | { type: 'abrirNova' }
  | { type: 'fecharNova' }
  | { type: 'abrirDetalhes'; protocolo: string }
  | { type: 'fecharDetalhes' };

export function modaisReducer(state: ModaisState, action: ModaisAction): ModaisState {
  switch (action.type) {
    case 'abrirNova':
      return { ...state, nova: true };
    case 'fecharNova':
      return { ...state, nova: false };
    case 'abrirDetalhes':
      return { ...state, detalhes: true, protocoloSelecionado: action.protocolo };
    case 'fecharDetalhes':
      return { ...state, detalhes: false, protocoloSelecionado: null };
    default:
      return state;
  }
}
