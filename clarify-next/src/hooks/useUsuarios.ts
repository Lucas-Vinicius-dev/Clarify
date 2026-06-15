'use client';

// ═════════════════════════════════════════════════════════════════
// HOOK: useUsuarios
// Gerencia usuários do sistema com estado reativo
// ═════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import type { Usuario, Cargo } from '@/types';
import {
  adicionarUsuario,
  acharUsuario,
  atribuirAluno,
  deletarAluno,
  usuarioExiste,
} from '@/lib/auth';
import { popularLocalStorage } from '@/lib/localStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

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
  deletar: (matriculaAluno: string) => void;
  existe: (matricula: string, email: string) => boolean;
}

function lerUsuariosArmazenados(): Usuario[] {
  if (typeof window === 'undefined') return [];

  const usuariosRaw = localStorage.getItem(STORAGE_KEYS.usuarios) || '[]';
  return JSON.parse(usuariosRaw) as Usuario[];
}

function obterUsuariosIniciais(): Usuario[] {
  if (typeof window === 'undefined') return [];

  popularLocalStorage();

  return lerUsuariosArmazenados();
}

/**
 * Hook para gerenciar usuários
 */
export function useUsuarios(): UseUsuariosReturn {
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => obterUsuariosIniciais());

  const recarregar = useCallback(() => {
    if (typeof window === 'undefined') return;

    setUsuarios(lerUsuariosArmazenados());
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
      const vinculados = new Set<string>();

      usuarios.forEach((usuario) => {
        if (
          String(usuario.cargo) === 'aluno' &&
          String(usuario.coordenador) === String(matriculaCoordenador)
        ) {
          vinculados.add(String(usuario.matricula));
        }

        if (String(usuario.matricula) === String(matriculaCoordenador)) {
          (usuario.alunosCadastrados || []).forEach((matricula) => vinculados.add(String(matricula)));
          (usuario.usuariosCadastrados || []).forEach((matricula) => vinculados.add(String(matricula)));
        }
      });

      return [...vinculados];
    },
    [usuarios]
  );

  const atribuir = useCallback(
    (matriculaCoord: string, matriculaAluno: string) => {
      atribuirAluno(matriculaCoord, matriculaAluno);
      recarregar();
    },
    [recarregar]
  );

  const deletar = useCallback(
    (matriculaAluno: string) => {
      deletarAluno(matriculaAluno);
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
    deletar,
    existe,
  };
}
