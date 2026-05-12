import { navigateURL } from "./navegacaoURL";

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

// Exibe mensagens de erro em formulários
export function exibirMensagemErro(mensagem, seletor = "#submitIncorrectAlert label") {
    const label = document.querySelector(seletor);
    if (label) {
        label.textContent = mensagem;
    }
}

const ERRORS = {
    USUARIO_NAO_ENCONTRADO: "Usuário não encontrado.",
    CHAVE_INCORRETA: "Chave de segurança incorreta.",
};


// Busca se um usuário está cadastrado no localStorage com base no ID institucional
export function UsuarioExiste(matricula,email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some((usuario) => {
        const matriculaSalva = usuario.matricula;
        const emailSalvo = usuario.email;

        return String(matriculaSalva) === String(matricula) || String(emailSalvo) === String(email);
    });
}

// Busca um usuário cadastrado no localStorage com base na matrícula e na senha
export function buscarUsuarioCadastrado(matricula, senha) {
   const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

   return usuariosSalvos.find((usuario) => {
      const matriculaSalva = usuario.matricula;
      const senhaSalva = usuario.senha;

      return String(matriculaSalva) === String(matricula) && String(senhaSalva) === String(senha);
   });
}

export function autenticarLogin(institutionalId, securityKey) {
    const usuarioEncontrado = buscarUsuarioCadastrado(institutionalId, securityKey);

    if (usuarioEncontrado) {
        const { senha, ...usuarioLogado } = usuarioEncontrado;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('auth', true);
        return { ok: true, usuarioLogado };
    }

    const usuarioExiste = UsuarioExiste(institutionalId);
    if (!usuarioExiste) {
        // Caso o usuário não exista, exibirá uma mensagem de erro e limpará ambos os campos do formulário
        exibirMensagemErro(ERRORS.USUARIO_NAO_ENCONTRADO);
        limparFormulario(["#institutionalId", "#securityKey"]);
        return { ok: false };
    }

    // Caso o usuário exista, mas a chave de segurança esteja incorreta
    exibirMensagemErro(ERRORS.CHAVE_INCORRETA);
    limparFormulario(["#securityKey"]);
    return { ok: false };
}

// Popula o localStorage com dados falsos para facilitar a funcionalidade de funções do sistema
export function popularLocalStorage() {
    const usuariosTeste = [
        { nome: "João da Silva", matricula: "123", email: "joao@academico.edu.br", senha: "123456", cargo: "coordenador" },
        { nome: "Maria Aparecida", matricula: "003", email: "maria@academico.edu.br", senha: "123456", cargo: "aluno" },
        { nome: "Carlos Eduardo", matricula: "456", email: "carlos@academico.edu.br", senha: "123456", cargo: "aluno" }
    ];

    localStorage.setItem('usuarios', JSON.stringify(usuariosTeste));
    popularDemandas();
}

// Popula o localStorage com demandas de teste pra a Central de Demandas (US17).
// TODO: remover quando a US16 começar a inserir demandas de verdade.
// pessoal, isso é literalmente mock data :D. 
export function popularDemandas() {
    const demandasTeste = [
        {
            protocolo: "REQ-402",
            matriculaAluno: "003",
            tipo: "Quebra de Pré-requisito",
            descricao: "Solicitação para cursar Cálculo III sem a aprovação em Cálculo II.",
            status: "pendente",
            dataCriacao: "2025-11-12",
            dataAtualizacao: "2025-11-12",
            feedback: ""
        },
        {
            protocolo: "REQ-398",
            matriculaAluno: "003",
            tipo: "Revisão de Prova",
            descricao: "Discordância em relação à correção da questão 4 da prova de Banco de Dados.",
            status: "em_analise",
            dataCriacao: "2025-11-08",
            dataAtualizacao: "2026-05-04",
            feedback: ""
        },
        {
            protocolo: "REQ-385",
            matriculaAluno: "003",
            tipo: "Aproveitamento de Horas AC",
            descricao: "Envio de certificados de cursos extracurriculares para integralização.",
            status: "pendente",
            dataCriacao: "2025-11-02",
            dataAtualizacao: "2025-11-02",
            feedback: ""
        },
        {
            protocolo: "REQ-350",
            matriculaAluno: "003",
            tipo: "Trancamento de Disciplina",
            descricao: "Pedido de trancamento da disciplina de Sistemas Operacionais.",
            status: "concluido",
            dataCriacao: "2025-10-15",
            dataAtualizacao: "2025-10-25",
            feedback: "Trancamento aprovado. Disciplina removida do histórico do semestre."
        },
        {
            protocolo: "REQ-342",
            matriculaAluno: "003",
            tipo: "Troca de Turma",
            descricao: "Mudança da turma da manhã para a turma da noite por motivo de trabalho.",
            status: "em_analise",
            dataCriacao: "2025-10-12",
            dataAtualizacao: "2025-10-22",
            feedback: ""
        },
        {
            protocolo: "REQ-320",
            matriculaAluno: "003",
            tipo: "Solicitação de Histórico",
            descricao: "Emissão do histórico escolar atualizado para fins de estágio.",
            status: "concluido",
            dataCriacao: "2025-10-05",
            dataAtualizacao: "2025-10-15",
            feedback: "Documento disponível para retirada na secretaria."
        },
        {
            protocolo: "REQ-310",
            matriculaAluno: "003",
            tipo: "Justificativa de Falta",
            descricao: "Atestado médico referente às faltas dos dias 22 e 23 de setembro.",
            status: "requer_ajuste",
            dataCriacao: "2025-09-25",
            dataAtualizacao: "2025-09-30",
            feedback: "Atestado precisa estar legível e conter o CID. Reenviar."
        }
    ];

    localStorage.setItem('demandas', JSON.stringify(demandasTeste));
}

// Retorna todas as demandas vinculadas à matrícula do aluno informado.
export function buscarDemandasPorAluno(matricula) {
    const demandas = JSON.parse(localStorage.getItem('demandas')) || [];

    return demandas.filter((demanda) => {
        return String(demanda.matriculaAluno) === String(matricula);
    });
}

// Converte uma data ISO ("2025-11-12") para o formato "12 Nov 2025" usado na UI.
export function formatarData(dataISO) {
    if (!dataISO) return '';

    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const partes = dataISO.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia} ${meses[Number(mes) - 1]} ${ano}`;
}

// Verificação e validação de chaves de ativação para o sistema
export function chaveValida(key) {
    const chaveNormalizada = String(key ?? '').trim();
    if (!chaveNormalizada) return false;

    let chaves = JSON.parse(localStorage.getItem('chavesAtivacao'));
    if (!Array.isArray(chaves)) {
        createKeys();
        chaves = JSON.parse(localStorage.getItem('chavesAtivacao')) || [];
    }

    const find = chaves.find((chave) => {
        return (String(chave.code) === chaveNormalizada && !chave.used);
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

// Usado para redirecionar o usuário pelas páginas do site pelo URL
export function adicionarCaminhoURL(nome) {
   if (window.location.pathname !== `/${nome}`) {
      window.history.pushState({}, "", `/${nome}`);
      navigateURL(`/${nome}`);
   }
}

// Recebe o JSON no localStorage do coordenador e adiciona um usuário adicionado por ele ao localStorage
export function atribuirAluno(matriculaCoord, matriculaAluno) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const coordenador = usuarios.find(
        usuario => String(usuario.matricula) === String(matriculaCoord)
    );

    if (!coordenador) return;

    if (!coordenador.usuariosCadastrados) {
        coordenador.usuariosCadastrados = [];
    }

    coordenador.usuariosCadastrados.push(matriculaAluno);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Acha um usuário no localStorage apenas pela matrícula
export function acharUsuario(matricula) {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];

   return usuariosSalvos.find((usuario) => {
      const matriculaSalva = usuario.matricula;
      return String(matriculaSalva) === String(matricula)
   });
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
