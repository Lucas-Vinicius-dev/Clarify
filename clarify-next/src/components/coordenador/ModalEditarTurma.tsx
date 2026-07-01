'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { X, Users, Plus, Check } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { criarTurmaSchema, type CriarTurmaFormData } from '@/schemas/turmas';
import type { Turma } from '@/types';

interface ModalEditarTurmaProps {
  open: boolean;
  turma: Turma | null;
  onClose: () => void;
  onSalvar: (id: string, dados: { nome: string; disciplina: string; alunos: string[] }) => Promise<void>;
}

const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)] dark:text-slate-400";
const inputClass = "w-full bg-transparent border-0 border-b-[1.5px] border-[rgba(15,23,42,0.10)] dark:border-slate-700 py-2 px-0 text-lg leading-[1.3] -tracking-[0.01em] text-[#0f172a] dark:text-slate-100 placeholder:text-[rgba(15,23,42,0.30)] dark:placeholder:text-slate-500 placeholder:font-normal focus:outline-none focus:border-b-[#ca5f15] transition-[border-color] duration-180";
const btnPrimaryClass = "inline-flex items-center gap-2 bg-[#ca5f15] text-white font-bold text-sm -tracking-[0.005em] py-3 px-5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_1px_2px_rgba(202,95,21,0.30),_0_10px_24px_-10px_rgba(202,95,21,0.55)] hover:bg-[#b35211] hover:-translate-y-px active:translate-y-0 disabled:bg-[rgba(15,23,42,0.10)] disabled:text-[rgba(15,23,42,0.35)] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none transition-[transform,box-shadow,background-color] duration-180 cursor-pointer";
const btnGhostClass = "inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] dark:text-slate-300 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] dark:hover:bg-slate-700 hover:text-[#0f172a] dark:hover:text-slate-100 transition-[background-color,color] duration-180 cursor-pointer";

export function ModalEditarTurma({ open, turma, onClose, onSalvar }: ModalEditarTurmaProps) {
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

  useEffect(() => {
    if (open && turma) {
      reset({
        nome: turma.nome,
        disciplina: turma.disciplina,
        alunos: turma.alunos,
      });
    }
  }, [open, turma, reset]);

  const watchedAlunos = useWatch({ control, name: 'alunos' });
  const alunos = useMemo(() => watchedAlunos ?? [], [watchedAlunos]);
  const [matriculaInput, setMatriculaInput] = useState('');
  const [erroSalvar, setErroSalvar] = useState('');
  const [enviando, setEnviando] = useState(false);

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

  const onValid = useCallback(async (data: CriarTurmaFormData) => {
    if (!turma) return;
    setErroSalvar('');
    setEnviando(true);
    try {
      await onSalvar(turma.id, {
        nome: data.nome.trim(),
        disciplina: data.disciplina.trim(),
        alunos: data.alunos,
      });
      onClose();
    } catch (e) {
      setErroSalvar(e instanceof Error ? e.message : 'Erro ao atualizar turma.');
    } finally {
      setEnviando(false);
    }
  }, [turma, onSalvar, onClose]);

  const handleClose = useCallback(() => {
    setMatriculaInput('');
    setErroSalvar('');
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-md">
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-8">
          <DialogHeader className="border-none">
            <div />
          </DialogHeader>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Editar turma</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Altere os dados e os alunos vinculados</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onValid)} className="space-y-5">
            <div>
              <label htmlFor="editarTurmaNome" className={labelClass}>Nome da turma</label>
              <input
                id="editarTurmaNome"
                type="text"
                {...register('nome')}
                placeholder="Ex: Engenharia de Software — 2025.1"
                className={cn(inputClass, "font-semibold mt-1")}
              />
              {errors.nome && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="editarTurmaDisciplina" className={labelClass}>Disciplina</label>
              <input
                id="editarTurmaDisciplina"
                type="text"
                {...register('disciplina')}
                placeholder="Ex: Cálculo I"
                className={cn(inputClass, "font-semibold mt-1")}
              />
              {errors.disciplina && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.disciplina.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="editarTurmaMatriculaAluno" className={cn(labelClass, "mb-2 block")}>Adicionar aluno por matrícula</label>
              <div className="flex gap-2 mt-1">
                <input
                  id="editarTurmaMatriculaAluno"
                  type="text"
                  value={matriculaInput}
                  onChange={(e) => setMatriculaInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); adicionarAluno(); } }}
                  placeholder="Ex: 202100452"
                  className={cn(inputClass, "font-semibold flex-1")}
                />
                <button
                  type="button"
                  onClick={adicionarAluno}
                  className={cn(btnGhostClass, "flex-shrink-0")}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar
                </button>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-slate-700 rounded-xl p-3 min-h-[64px]">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-2">Alunos adicionados</p>
              <div className="flex flex-wrap gap-2">
                {alunos.length === 0 && (
                  <span className="text-xs text-gray-300 dark:text-slate-500">Nenhum aluno adicionado</span>
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

            {erroSalvar && (
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                {erroSalvar}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={enviando}
                className={btnGhostClass}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className={btnPrimaryClass}
              >
                <Check className="w-3.5 h-3.5" />
                {enviando ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
