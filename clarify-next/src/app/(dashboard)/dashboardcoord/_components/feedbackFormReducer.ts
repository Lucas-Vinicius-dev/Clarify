/** Estado agrupado das mensagens de feedback do formulário de adicionar aluno. */
export interface FeedbackFormState {
  erro: string;
  sucesso: string;
}

export const feedbackFormInicial: FeedbackFormState = {
  erro: '',
  sucesso: '',
};

export type FeedbackFormAction =
  | { type: 'limpar' }
  | { type: 'erro'; mensagem: string }
  | { type: 'sucesso'; mensagem: string };

export function feedbackFormReducer(
  state: FeedbackFormState,
  action: FeedbackFormAction
): FeedbackFormState {
  switch (action.type) {
    case 'limpar':
      return { erro: '', sucesso: '' };
    case 'erro':
      return { erro: action.mensagem, sucesso: '' };
    case 'sucesso':
      return { erro: '', sucesso: action.mensagem };
    default:
      return state;
  }
}
