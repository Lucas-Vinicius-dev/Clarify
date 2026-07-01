'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { CardAluno } from '@/components/coordenador/CardAluno';
import type { Demanda, UsuarioLogado } from '@/types';

interface ListaAlunosProps {
  alunos: UsuarioLogado[];
  demandas: Demanda[];
  onRemover: (matricula: string) => void;
}

export function ListaAlunos({ alunos, demandas, onRemover }: ListaAlunosProps) {
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const filtrados = termo === ''
    ? alunos
    : alunos.filter((a) =>
        a.nome.toLowerCase().includes(termo)
        || a.matricula.toLowerCase().includes(termo)
        || a.email.toLowerCase().includes(termo)
      );

  return (
    <section>
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900">Alunos</h2>
        {alunos.length > 0 && (
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, matrícula ou e-mail..."
              aria-label="Buscar aluno por nome, matrícula ou e-mail"
              className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
      {alunos.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhum aluno cadastrado.</p>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">Nenhum aluno encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtrados.map((aluno) => (
            <CardAluno
              key={aluno.id}
              aluno={aluno}
              demandasEmAberto={demandas.filter(
                (d) => d.alunoId === aluno.id && d.status !== 'concluido'
              ).length}
              onRemover={onRemover}
            />
          ))}
        </div>
      )}
    </section>
  );
}
