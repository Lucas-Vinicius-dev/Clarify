// ═════════════════════════════════════════════════════════════════
// LIB: AUTENTICAÇÃO
// Funções de login, registro e gerenciamento de chaves de ativação
// ═════════════════════════════════════════════════════════════════

import type { Usuario, UsuarioLogado, AuthResponse, RegistroDados } from '@/types';

/**
 * Verifica se um usuário já existe na base (matrícula ou email)
 */
export function usuarioExiste(matricula: string, email: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];
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
  
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];
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
  
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];
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
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
    localStorage.setItem('auth', 'true');
    return { ok: true, usuarioLogado };
  }

  const existe = usuarioExiste(matricula, '');
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
  
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];

  usuarios.push({
    nome,
    matricula,
    email,
    senha,
    cargo,
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

/**
 * Registra um novo coordenador (com validação de chave)
 */
export function registrarCoordenador(dados: RegistroDados): AuthResponse {
  if (typeof window === 'undefined') {
    return { ok: false, mensagem: 'Servidor-side' };
  }

  // Validar chave de ativação
  if (!dados.chaveAtivacao || !chaveValida(dados.chaveAtivacao)) {
    return {
      ok: false,
      mensagem: 'Chave de ativação inválida ou já utilizada.',
    };
  }

  // Verificar duplicidade
  if (usuarioExiste(dados.matricula, dados.email)) {
    return {
      ok: false,
      mensagem: 'Matrícula ou email já cadastrados.',
    };
  }

  // Adicionar usuário
  adicionarUsuario(dados.nome, dados.matricula, dados.email, dados.senha, 'coordenador');

  // Retornar usuário logado (sem senha)
  const { senha: _, ...usuarioLogado } = {
    nome: dados.nome,
    matricula: dados.matricula,
    email: dados.email,
    senha: dados.senha,
    cargo: 'coordenador' as const,
  };

  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
  localStorage.setItem('auth', 'true');

  return {
    ok: true,
    usuarioLogado: usuarioLogado as UsuarioLogado,
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

  const find = chaves.find(
    (chave: any) =>
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
  
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];

  const coordenador = usuarios.find(
    (u) => String(u.matricula) === String(matriculaCoord)
  );

  if (!coordenador) return;

  if (!coordenador.usuariosCadastrados) {
    coordenador.usuariosCadastrados = [];
  }

  if (!coordenador.usuariosCadastrados.includes(String(matriculaAluno))) {
    coordenador.usuariosCadastrados.push(String(matriculaAluno));
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

/**
 * Faz logout do usuário (limpa sessão)
 */
export function logout(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('auth');
}

/**
 * Obtém o usuário atualmente logado
 */
export function obterUsuarioLogado(): UsuarioLogado | null {
  if (typeof window === 'undefined') return null;
  
  const raw = localStorage.getItem('usuarioLogado');
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UsuarioLogado;
  } catch {
    return null;
  }
}
