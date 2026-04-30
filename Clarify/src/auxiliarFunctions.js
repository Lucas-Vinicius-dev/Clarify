// Arquivo dedicado à funções auxiliares do programa principal.
// As funções contidas aqui devem ser o mais genéricas possíveis para facilitar o reúso.
// A importação desse arquivo idealmente será feita por "import * as [aux] from <path>".

// Função para limpar formulários passando um vetor de IDs, classes, etc... como parâmetro
export function limparFormulario(parametros) {
    for (let i = 0; i < parametros.length; ++i) {
        const chave = document.querySelector(`${parametros[i]}`);
        chave.value = '';
    }
}