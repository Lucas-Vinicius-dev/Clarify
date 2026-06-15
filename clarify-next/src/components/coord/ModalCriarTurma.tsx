'use client';

import { useState, useCallback } from 'react';
import { X, Users, Plus, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface ModalCriarTurmaProps {
  open: boolean;
  onClose: () => void;
  onCreate: (dados: { nome: string; disciplina: string; alunos: string[] }) => void;
}

export function ModalCriarTurma({ open, onClose, onCreate }: ModalCriarTurmaProps) {
  const [nome, setNome] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [matriculaInput, setMatriculaInput] = useState('');
  const [alunosAdicionados, setAlunosAdicionados] = useState<string[]>([]);

  const adicionarAluno = useCallback(() => {
    const mat = matriculaInput.trim();
    if (!mat || alunosAdicionados.includes(mat)) return;
    setAlunosAdicionados((prev) => [...prev, mat]);
    setMatriculaInput('');
  }, [matriculaInput, alunosAdicionados]);

  const removerAluno = useCallback((matricula: string) => {
    setAlunosAdicionados((prev) => prev.filter((m) => m !== matricula));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !disciplina.trim()) return;
    onCreate({ nome: nome.trim(), disciplina: disciplina.trim(), alunos: alunosAdicionados });
    setNome('');
    setDisciplina('');
    setAlunosAdicionados([]);
    onClose();
  }, [nome, disciplina, alunosAdicionados, onCreate, onClose]);

  const handleClose = useCallback(() => {
    setNome('');
    setDisciplina('');
    setMatriculaInput('');
    setAlunosAdicionados([]);
    onClose();
  }, [onClose]);

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
      <div className="p-6 sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nova turma</h2>
            <p className="text-xs text-gray-500">Preencha os dados e adicione alunos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="turmaNome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da turma
            </label>
            <input
              id="turmaNome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Ex: Engenharia de Software — 2025.1"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="turmaDisciplina" className="block text-sm font-medium text-gray-700 mb-1">
              Disciplina
            </label>
            <input
              id="turmaDisciplina"
              type="text"
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              required
              placeholder="Ex: Cálculo I"
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="turmaMatriculaAluno" className="block text-sm font-medium text-gray-700 mb-1">
              Adicionar aluno por matrícula
            </label>
            <div className="flex gap-2">
              <input
                id="turmaMatriculaAluno"
                type="text"
                value={matriculaInput}
                onChange={(e) => setMatriculaInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); adicionarAluno(); } }}
                placeholder="Ex: 202100452"
                className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={adicionarAluno}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 border-none"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-3 min-h-[64px]">
            <p className="text-xs text-gray-400 mb-2">Alunos adicionados</p>
            <div className="flex flex-wrap gap-2">
              {alunosAdicionados.length === 0 && (
                <span className="text-xs text-gray-300">Nenhum aluno adicionado</span>
              )}
              {alunosAdicionados.map((matricula) => (
                <span
                  key={matricula}
                  className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full px-3 py-1"
                >
                  {matricula}
                  <button
                    type="button"
                    onClick={() => removerAluno(matricula)}
                    className="text-orange-400 hover:text-orange-700 cursor-pointer leading-none bg-transparent border-none p-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer border-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer flex items-center gap-1.5 border-none"
              disabled={!nome.trim() || !disciplina.trim()}
            >
              <Check className="w-3.5 h-3.5" />
              Criar turma
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
