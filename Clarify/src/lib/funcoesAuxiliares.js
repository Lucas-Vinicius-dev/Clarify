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
export function UsuarioExiste(matricula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some((usuario) => {
        const matriculaSalva = usuario.matricula;

        return String(matriculaSalva) === String(matricula);
    });
}

// Busca um usuário cadastrado no localStorage com base na matrícual e na senha
export function buscarUsuarioCadastrado(matricula, senha) {
   const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

   return usuariosSalvos.find((usuario) => {
      const matriculaSalva = usuario.matricula;
      const senhaSalva = usuario.senha;

      return String(matriculaSalva) === String(matricula) && String(senhaSalva) === String(senha);
   });
}

// Popula o localStorage com dados falsos para facilitar a funcionalidade de funções do sistema
export function popularLocalStorage() {
    const usuariosTeste = [
        { nome: "João da Silva", matricula: "123", email: "joao@academico.edu.br", senha: "123456", cargo: "coordenador" }
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
export function adicionarUsuario(nome, matricula, email, senha, cargo) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
        nome,
        matricula,
        email,
        senha,
        cargo
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

export function validDuplicidade(email, matricula, array){
    for (let i = 0; i < array.length; i++){
        if (email === array[i].institutionalEmail || matricula === array[i].institutionalId){
            return `Possui duplicidade`
            break
        }
    }
    return 
}