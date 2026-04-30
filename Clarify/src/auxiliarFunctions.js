// Função para limpar formulários passando um vetor de IDs como parâmetro
export function limparFormulario(IDparametros) {
    for (let i = 0; i < IDparametros.length; ++i) {
        const chave = document.querySelector(`#${IDparametros[i]}`);
        chave.value = '';
    }
}