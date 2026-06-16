// ═════════════════════════════════════════════════════════════════
// LIB: AUTENTICAÇÃO
// Funções de login, registro e gerenciamento de chaves de ativação
// ═════════════════════════════════════════════════════════════════

import type { Usuario, UsuarioLogado, AuthResponse, RegistroDados } from '@/types';
import { normalizarDemandasStorage, normalizarUsuariosStorage } from './storageMigrations';

let cachedUsuarioLogadoRaw: string | null = null;
let cachedUsuarioLogado: UsuarioLogado | null = null;

function atualizarCacheUsuarioLogado(raw: string | null, usuario: UsuarioLogado | null): void {
  cachedUsuarioLogadoRaw = raw;
  cachedUsuarioLogado = usuario;
}

function salvarUsuarioLogado(usuario: UsuarioLogado | null): void {
  if (typeof window === 'undefined') return;

  if (usuario) {
    const raw = JSON.stringify(usuario);
    localStorage.setItem('usuarioLogado', raw);
    atualizarCacheUsuarioLogado(raw, usuario);
    return;
  }

  localStorage.removeItem('usuarioLogado');
  atualizarCacheUsuarioLogado(null, null);
}

function lerUsuarioLogadoArmazenado(): UsuarioLogado | null {
  if (typeof window === 'undefined') return null;

  const raw = localStorage.getItem('usuarioLogado');

  if (raw === cachedUsuarioLogadoRaw) {
    return cachedUsuarioLogado;
  }

  if (!raw) {
    atualizarCacheUsuarioLogado(null, null);
    return null;
  }

  try {
    const usuario = JSON.parse(raw) as UsuarioLogado;
    atualizarCacheUsuarioLogado(raw, usuario);
    return usuario;
  } catch {
    atualizarCacheUsuarioLogado(null, null);
    return null;
  }
}

function lerUsuarios(): Usuario[] {
  if (typeof window === 'undefined') return [];

  return normalizarUsuariosStorage(JSON.parse(localStorage.getItem('usuarios') || '[]'));
}

function salvarUsuarios(usuarios: Usuario[]): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

/**
 * Verifica se um usuário já existe na base (matrícula ou email)
 */
export function usuarioExiste(matricula: string, email: string): boolean {
  if (typeof window === 'undefined') return false;

  const usuarios = lerUsuarios();
  return usuarios.some(
    (u) =>
      String(u.matricula) === String(matricula) ||
      String(u.email) === String(email)
  );
}

/**
 * Busca um usuário pelo matrícula + senha
 */
export function buscarUsuarioCadastrado(
  matricula: string,
  senha: string
): Usuario | undefined {
  if (typeof window === 'undefined') return undefined;

  const usuarios = lerUsuarios();
  return usuarios.find(
    (u) =>
      String(u.matricula) === String(matricula) &&
      String(u.senha) === String(senha)
  );
}

/**
 * Busca um usuário apenas pela matrícula
 */
export function acharUsuario(matricula: string): Usuario | undefined {
  if (typeof window === 'undefined') return undefined;

  const usuarios = lerUsuarios();
  return usuarios.find((u) => String(u.matricula) === String(matricula));
}

/**
 * Autentica o login do usuário
 */
export function autenticarLogin(
  matricula: string,
  senha: string
): AuthResponse {
  if (typeof window === 'undefined') {
    return { ok: false, mensagem: 'Servidor-side' };
  }

  const usuarioEncontrado = buscarUsuarioCadastrado(matricula, senha);

  if (usuarioEncontrado) {
    const { senha: _, ...usuarioLogado } = usuarioEncontrado;
    salvarUsuarioLogado(usuarioLogado);
    localStorage.setItem('auth', 'true');
    return { ok: true, usuarioLogado };
  }

  const existe = Boolean(acharUsuario(matricula));
  if (!existe) {
    return {
      ok: false,
      mensagem: 'Usuário não encontrado.',
    };
  }

  return {
    ok: false,
    mensagem: 'Chave de segurança incorreta.',
  };
}

/**
 * Adiciona um novo usuário ao localStorage
 */
export function adicionarUsuario(
  nome: string,
  matricula: string,
  email: string,
  senha: string,
  cargo: 'aluno' | 'coordenador'
): void {
  if (typeof window === 'undefined') return;

  const usuarios = lerUsuarios();

  const novoUsuario: Usuario = {
    nome,
    matricula,
    email,
    senha,
    cargo,
  };

  if (cargo === 'coordenador') {
    novoUsuario.alunosCadastrados = [];
    novoUsuario.usuariosCadastrados = [];
  }

  usuarios.push(novoUsuario);

  salvarUsuarios(usuarios);
}

/**
 * Registra um novo coordenador (com validação de chave)
 */
export function registrarCoordenador(dados: RegistroDados): AuthResponse {
  if (typeof window === 'undefined') {
    return { ok: false, mensagem: 'Servidor-side' };
  }

  const nome = String(dados.nome || '').trim();
  const matricula = String(dados.matricula || '').trim();
  const email = String(dados.email || '').trim();
  const senha = String(dados.senha || '');
  const chaveAtivacao = String(dados.chaveAtivacao || '').trim();

  if (!nome || !matricula || !email || !senha || !chaveAtivacao) {
    return {
      ok: false,
      mensagem: 'Preencha todos os campos.',
    };
  }

  // Validar duplicidade antes de consumir a chave de ativação.
  // Assim, tentativas inválidas não inutilizam uma chave válida.
  if (usuarioExiste(matricula, email)) {
    return {
      ok: false,
      mensagem: 'Matrícula ou email já cadastrados.',
    };
  }

  // Validar chave de ativação
  if (!chaveValida(chaveAtivacao)) {
    return {
      ok: false,
      mensagem: 'Chave de ativação inválida ou já utilizada.',
    };
  }

  // Adicionar usuário
  adicionarUsuario(nome, matricula, email, senha, 'coordenador');

  // Retornar usuário logado (sem senha)
  const usuarioLogado: UsuarioLogado = {
    nome,
    matricula,
    email,
    cargo: 'coordenador' as const,
  };

  salvarUsuarioLogado(usuarioLogado);
  localStorage.setItem('auth', 'true');

  return {
    ok: true,
    usuarioLogado,
  };
}

/**
 * Verifica se uma chave de ativação é válida (e a marca como usada)
 */
export function chaveValida(code: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const chaveNormalizada = String(code || '').trim();
  if (!chaveNormalizada) return false;

  let chaves = JSON.parse(localStorage.getItem('chavesAtivacao') || '[]');
  if (!Array.isArray(chaves) || chaves.length === 0) {
    criarChaves();
    chaves = JSON.parse(localStorage.getItem('chavesAtivacao') || '[]');
  }

  const find = chaves.find((chave: { code?: string; used?: boolean }) =>
    String(chave.code) === chaveNormalizada && !chave.used
  );

  if (!find) return false;

  find.used = true;
  localStorage.setItem('chavesAtivacao', JSON.stringify(chaves));
  return true;
}

/**
 * Cria as chaves de ativação iniciais
 */
export function criarChaves(): void {
  if (typeof window === 'undefined') return;
  
  const chavesInicializadoras = [
    { code: '123', used: false },
    { code: '456', used: false },
    { code: '789', used: false },
  ];

  localStorage.setItem('chavesAtivacao', JSON.stringify(chavesInicializadoras));
}

/**
 * Vincula um aluno a um coordenador
 */
export function atribuirAluno(matriculaCoord: string, matriculaAluno: string): void {
  if (typeof window === 'undefined') return;

  const usuarios = lerUsuarios();

  const coordenador = usuarios.find(
    (u) => String(u.matricula) === String(matriculaCoord)
  );

  const aluno = usuarios.find(
    (u) => String(u.matricula) === String(matriculaAluno)
  );

  if (!coordenador || !aluno) return;

  const vinculos = [
    ...(coordenador.alunosCadastrados || []),
    ...(coordenador.usuariosCadastrados || []),
    String(matriculaAluno),
  ];

  coordenador.alunosCadastrados = [...new Set(vinculos)];
  coordenador.usuariosCadastrados = [...coordenador.alunosCadastrados];
  aluno.coordenador = String(matriculaCoord);

  salvarUsuarios(usuarios);
}

/**
 * Faz o vínculo no sentido aluno -> coordenador, mantendo compatibilidade com o original
 */
export function atribuirCoordenador(matriculaAluno: string, matriculaCoord: string): void {
  atribuirAluno(matriculaCoord, matriculaAluno);
}

/**
 * Remove um aluno do sistema, limpando vínculos e demandas associadas
 */
export function deletarAluno(matriculaAluno: string): void {
  if (typeof window === 'undefined') return;

  const matriculaNormalizada = String(matriculaAluno);
  const usuarios = lerUsuarios().filter((usuario) => String(usuario.matricula) !== matriculaNormalizada);

  usuarios.forEach((usuario) => {
    if (usuario.cargo === 'coordenador') {
      const vinculos = [
        ...(usuario.alunosCadastrados || []),
        ...(usuario.usuariosCadastrados || []),
      ].filter((matricula) => String(matricula) !== matriculaNormalizada);

      usuario.alunosCadastrados = [...new Set(vinculos)];
      usuario.usuariosCadastrados = [...usuario.alunosCadastrados];
    }
  });

  salvarUsuarios(usuarios);

  const demandas = normalizarDemandasStorage(JSON.parse(localStorage.getItem('demandas') || '[]'));
  const demandasFiltradas = demandas.filter(
    (demanda) => String(demanda.matriculaAluno) !== matriculaNormalizada
  );
  localStorage.setItem('demandas', JSON.stringify(demandasFiltradas));

  const turmas = JSON.parse(localStorage.getItem('turmas') || '[]') as Array<{
    alunos?: string[];
  } & Record<string, unknown>>;
  if (Array.isArray(turmas)) {
    const turmasAtualizadas = turmas.map((turma) => ({
      ...turma,
      alunos: Array.isArray(turma.alunos)
        ? turma.alunos.filter((matricula: string) => String(matricula) !== matriculaNormalizada)
        : [],
    }));

    localStorage.setItem('turmas', JSON.stringify(turmasAtualizadas));
  }
}

/**
 * Faz logout do usuário (limpa sessão)
 */
export function logout(): void {
  if (typeof window === 'undefined') return;
  
  salvarUsuarioLogado(null);
  localStorage.removeItem('auth');
}

/**
 * Obtém o usuário atualmente logado
 */
export function obterUsuarioLogado(): UsuarioLogado | null {
  if (typeof window === 'undefined') return null;

  return lerUsuarioLogadoArmazenado();
}
