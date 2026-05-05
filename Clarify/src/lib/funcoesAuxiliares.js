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

// Popula o localStorage com dados falsos para facilitar a funcionalidade de funções do sistema
export function popularLocalStorage() {
    const usuariosTeste = [
        { fullName: "João da Silva", institutionalId: "123", institutionalEmail: "joao@academico.edu.br", securityKey: "123456",institutionalRole: "student" }
    ];

    localStorage.setItem('usuarios', JSON.stringify(usuariosTeste));
}

export function chaveValida(key) {
    const chaves = JSON.parse(localStorage.getItem('chavesAtivacao'));
    const find = chaves.find((chave) => {
        return (chave.code === key && !chave.used);
    });

    if (find === undefined) return false;

    find.used = true;
    localStorage.setItem('chavesAtivacao', JSON.stringify(chaves));
    return true;
}

// Cria no localStorage as Chaves de ativacao
export function createKeys() {
    const chavesInicializadoras = [
        { code: "123", used: false },
        { code: "456", used: false },
        { code: "789", used: false }
    ];

    localStorage.setItem('chavesAtivacao', JSON.stringify(chavesInicializadoras));
}

// Adiciona novo usuário ao localStorage
export function adicionarUsuario(fullName, institutionalId, institutionalEmail, securityKey, institutionalRole) {
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