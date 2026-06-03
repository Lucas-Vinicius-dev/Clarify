'use client';

// ═════════════════════════════════════════════════════════════════
// HOOK: useUsuarios
// Gerencia usuários do sistema com estado reativo
// ═════════════════════════════════════════════════════════════════

import { useState, useCallback, useEffect } from 'react';
import type { Usuario, Cargo } from '@/types';
import {
  adicionarUsuario,
  acharUsuario,
  atribuirAluno,
  usuarioExiste,
} from '@/lib/auth';

export interface UseUsuariosReturn {
  usuarios: Usuario[];
  adicionar: (
    nome: string,
    matricula: string,
    email: string,
    senha: string,
    cargo: Cargo
  ) => void;
  buscar: (matricula: string) => Usuario | undefined;
  obterAlunos: () => Usuario[];
  obterCoordenadores: () => Usuario[];
  obterAlunosDoCoordenador: (matriculaCoordenador: string) => string[];
  atribuir: (matriculaCoord: string, matriculaAluno: string) => void;
  existe: (matricula: string, email: string) => boolean;
}

/**
 * Hook para gerenciar usuários
 */
export function useUsuarios(): UseUsuariosReturn {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carrega usuários iniciais
  useEffect(() => {
    recarregar();
    setIsInitialized(true);
  }, []);

  const recarregar = useCallback(() => {
    if (typeof window === 'undefined') return;

    const usuariosSalvos = JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    ) as Usuario[];
    setUsuarios(usuariosSalvos);
  }, []);

  const adicionar = useCallback(
    (
      nome: string,
      matricula: string,
      email: string,
      senha: string,
      cargo: Cargo
    ) => {
      adicionarUsuario(nome, matricula, email, senha, cargo);
      recarregar();
    },
    [recarregar]
  );

  const buscar = useCallback((matricula: string) => {
    return acharUsuario(matricula);
  }, []);

  const obterAlunos = useCallback(() => {
    return usuarios.filter((u) => u.cargo === 'aluno');
  }, [usuarios]);

  const obterCoordenadores = useCallback(() => {
    return usuarios.filter((u) => u.cargo === 'coordenador');
  }, [usuarios]);

  const obterAlunosDoCoordenador = useCallback(
    (matriculaCoordenador: string) => {
      const coordenador = buscar(matriculaCoordenador);
      return coordenador?.usuariosCadastrados || [];
    },
    [buscar]
  );

  const atribuir = useCallback(
    (matriculaCoord: string, matriculaAluno: string) => {
      atribuirAluno(matriculaCoord, matriculaAluno);
      recarregar();
    },
    [recarregar]
  );

  const existe = useCallback((matricula: string, email: string) => {
    return usuarioExiste(matricula, email);
  }, []);

  return {
    usuarios,
    adicionar,
    buscar,
    obterAlunos,
    obterCoordenadores,
    obterAlunosDoCoordenador,
    atribuir,
    existe,
  };
}
