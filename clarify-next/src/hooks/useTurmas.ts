'use client';

// ═════════════════════════════════════════════════════════════════
// HOOK: useTurmas
// Gerencia turmas do sistema com estado reativo
// ═════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import type { Turma } from '@/types';
import { popularLocalStorage } from '@/lib/localStorage';
import { STORAGE_KEYS } from '@/lib/storageKeys';

export interface UseTurmasReturn {
  turmas: Turma[];
  criar: (dados: {
    nome: string;
    disciplina: string;
    alunos: string[];
    coordenador: string;
  }) => Turma;
  atualizar: (id: string, dados: Partial<Turma>) => Turma | undefined;
  deletar: (id: string) => void;
  buscar: (id: string) => Turma | undefined;
  adicionarAluno: (idTurma: string, matriculaAluno: string) => void;
  removerAluno: (idTurma: string, matriculaAluno: string) => void;
  contarAlunos: (idTurma: string) => number;
  filtrar: (matriculaCoordenador: string) => Turma[];
}

function obterTurmasIniciais(): Turma[] {
  if (typeof window === 'undefined') return [];

  popularLocalStorage();

  return JSON.parse(localStorage.getItem(STORAGE_KEYS.turmas) || '[]') as Turma[];
}

/**
 * Hook para gerenciar turmas
 */
export function useTurmas(): UseTurmasReturn {
  const [turmas, setTurmas] = useState<Turma[]>(() => obterTurmasIniciais());

  const salvar = useCallback((novasTurmas: Turma[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.turmas, JSON.stringify(novasTurmas));
    setTurmas(novasTurmas);
  }, []);

  const criar = useCallback(
    (dados: {
      nome: string;
      disciplina: string;
      alunos: string[];
      coordenador: string;
    }) => {
      const id = `turma_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const agora = new Date().toISOString();

      const novaTurma: Turma = {
        id,
        nome: dados.nome,
        disciplina: dados.disciplina,
        alunos: dados.alunos,
        coordenador: dados.coordenador,
        criadaEm: agora,
      };

      const novasTurmas = [...turmas, novaTurma];
      salvar(novasTurmas);
      return novaTurma;
    },
    [turmas, salvar]
  );

  const atualizar = useCallback(
    (id: string, dados: Partial<Turma>) => {
      const novasTurmas = turmas.map((t) =>
        t.id === id ? { ...t, ...dados } : t
      );
      const turmaAtualizada = novasTurmas.find((t) => t.id === id);
      salvar(novasTurmas);
      return turmaAtualizada;
    },
    [turmas, salvar]
  );

  const deletar = useCallback(
    (id: string) => {
      const novasTurmas = turmas.filter((t) => t.id !== id);
      salvar(novasTurmas);
    },
    [turmas, salvar]
  );

  const buscar = useCallback(
    (id: string) => {
      return turmas.find((t) => t.id === id);
    },
    [turmas]
  );

  const adicionarAluno = useCallback(
    (idTurma: string, matriculaAluno: string) => {
      const novasTurmas = turmas.map((t) => {
        if (t.id === idTurma && !t.alunos.includes(matriculaAluno)) {
          return { ...t, alunos: [...t.alunos, matriculaAluno] };
        }
        return t;
      });
      salvar(novasTurmas);
    },
    [turmas, salvar]
  );

  const removerAluno = useCallback(
    (idTurma: string, matriculaAluno: string) => {
      const novasTurmas = turmas.map((t) => {
        if (t.id === idTurma) {
          return {
            ...t,
            alunos: t.alunos.filter((m) => m !== matriculaAluno),
          };
        }
        return t;
      });
      salvar(novasTurmas);
    },
    [turmas, salvar]
  );

  const contarAlunos = useCallback(
    (idTurma: string) => {
      const turma = turmas.find((t) => t.id === idTurma);
      return turma?.alunos.length ?? 0;
    },
    [turmas]
  );

  const filtrar = useCallback(
    (matriculaCoordenador: string) => {
      return turmas.filter(
        (t) => String(t.coordenador) === String(matriculaCoordenador)
      );
    },
    [turmas]
  );

  return {
    turmas,
    criar,
    atualizar,
    deletar,
    buscar,
    adicionarAluno,
    removerAluno,
    contarAlunos,
    filtrar,
  };
}
