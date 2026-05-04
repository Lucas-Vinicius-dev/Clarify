// Arquivo dedicado à funções auxiliares do programa principal.
// As funções contidas aqui devem ser o mais genéricas possíveis para facilitar o reúso.
// A importação desse arquivo idealmente será feita por "import * as [aux] from <path>".
import { usuariosTeste } from '../data/usuarios.js';
// Função para limpar formulários passando um vetor de IDs, classes, etc... como parâmetro
export function limparFormulario(parametros) {
    for (let i = 0; i < parametros.length; ++i) {
        const chave = document.querySelector(`${parametros[i]}`);
        chave.value = '';
    }
}

// Busca se um usuário está cadastrado no localStorage com base no ID institucional
export function UsuarioExiste(institutionalId) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some((usuario) => {
        const matriculaSalva = usuario.institutionalId;

        return String(matriculaSalva) === String(institutionalId);
    });
}

// Busca um usuário cadastrado no localStorage com base na matrícual e na senha
export function buscarUsuarioCadastrado(institutionalId, securityKey) {
   const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

   return usuariosSalvos.find((usuario) => {
      const matriculaSalva = usuario.institutionalId;
      const senhaSalva = usuario.securityKey;

      return String(matriculaSalva) === String(institutionalId) && String(senhaSalva) === String(securityKey);
   });
}

// Popula o localStorage com dados falsos para facilitar a funcionalidade de funções do sistema || OBS: ISSO LIMPA O LOCALSTORAGE, REMOVER DEPOIS
export function popularLocalStorage() {
    localStorage.clear();

    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosTeste))
    }
}

// Adiciona novo usuário ao localStorage
export function adicionarUsuario(fullName, institutionalId, institutionalEmail, securityKey, institutionalRole = "student") {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
        fullName,
        institutionalId,
        institutionalEmail,
        securityKey,
        institutionalRole
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}