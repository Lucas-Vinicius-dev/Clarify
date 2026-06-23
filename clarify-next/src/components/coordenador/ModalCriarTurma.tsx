'use client';

import { useCallback, useState } from 'react';
import { X, Users, Plus, Check } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { criarTurmaSchema, type CriarTurmaFormData } from '@/schemas/turmas';

interface ModalCriarTurmaProps {
  open: boolean;
  onClose: () => void;
  onCreate: (dados: { nome: string; disciplina: string; alunos: string[] }) => void;
}

export function ModalCriarTurma({ open, onClose, onCreate }: ModalCriarTurmaProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CriarTurmaFormData>({
    resolver: zodResolver(criarTurmaSchema),
    mode: 'onChange',
    defaultValues: { nome: '', disciplina: '', alunos: [] },
  });

  const alunos = useWatch({ control, name: 'alunos' }) ?? [];
  const [matriculaInput, setMatriculaInput] = useState('');

  const adicionarAluno = useCallback(() => {
    const mat = matriculaInput.trim();
    if (!mat || alunos.includes(mat)) return;
    setValue('alunos', [...alunos, mat], { shouldValidate: true });
    setMatriculaInput('');
  }, [matriculaInput, alunos, setValue]);

  const removerAluno = useCallback((index: number) => {
    const current = getValues('alunos');
    setValue('alunos', current.filter((_, i) => i !== index), { shouldValidate: true });
  }, [getValues, setValue]);

  const onValid = useCallback((data: CriarTurmaFormData) => {
    onCreate({
      nome: data.nome.trim(),
      disciplina: data.disciplina.trim(),
      alunos: data.alunos,
    });
    reset();
    onClose();
  }, [onCreate, reset, onClose]);

  const handleClose = useCallback(() => {
    reset();
    setMatriculaInput('');
    onClose();
  }, [reset, onClose]);

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nova turma</h2>
            <p className="text-xs text-gray-500">Preencha os dados e adicione alunos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onValid)} className="space-y-5">
          <div>
            <label htmlFor="turmaNome" className="modal-label">Nome da turma</label>
            <input
              id="turmaNome"
              type="text"
              {...register('nome')}
              placeholder="Ex: Engenharia de Software — 2025.1"
              className="modal-input font-semibold mt-1"
            />
            {errors.nome && (
              <p className="text-xs text-red-600 mt-1">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="turmaDisciplina" className="modal-label">Disciplina</label>
            <input
              id="turmaDisciplina"
              type="text"
              {...register('disciplina')}
              placeholder="Ex: Cálculo I"
              className="modal-input font-semibold mt-1"
            />
            {errors.disciplina && (
              <p className="text-xs text-red-600 mt-1">{errors.disciplina.message}</p>
            )}
          </div>

          <div>
            <label className="modal-label mb-2 block">Adicionar aluno por matrícula</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={matriculaInput}
                onChange={(e) => setMatriculaInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); adicionarAluno(); } }}
                placeholder="Ex: 202100452"
                className="flex-1 modal-input font-semibold"
              />
              <button
                type="button"
                onClick={adicionarAluno}
                className="modal-btn-ghost flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-3 min-h-[64px]">
            <p className="text-xs text-gray-400 mb-2">Alunos adicionados</p>
            <div className="flex flex-wrap gap-2">
              {alunos.length === 0 && (
                <span className="text-xs text-gray-300">Nenhum aluno adicionado</span>
              )}
              {alunos.map((matricula, index) => (
                <span
                  key={`${matricula}-${index}`}
                  className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full px-3 py-1"
                >
                  {matricula}
                  <button
                    type="button"
                    onClick={() => removerAluno(index)}
                    className="opacity-60 hover:opacity-100 cursor-pointer leading-none bg-transparent border-none p-0"
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
              className="modal-btn-ghost"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="modal-btn-primary"
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