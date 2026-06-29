'use client';

import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { X, Users, Check, ChevronDown } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { criarTurmaSchema, type CriarTurmaFormData } from '@/schemas/turmas';
import { useAuth } from '@/context/AuthContext';
import { useAlunosDoCoordenador } from '@/hooks/useUsuarios';

interface ModalCriarTurmaProps {
  open: boolean;
  onClose: () => void;
  onCreate: (dados: { nome: string; disciplina: string; alunos: string[] }) => void;
}

const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)]";
const inputClass = "w-full bg-transparent border-0 border-b-[1.5px] border-[rgba(15,23,42,0.10)] py-2 px-0 text-lg leading-[1.3] -tracking-[0.01em] text-[#0f172a] placeholder:text-[rgba(15,23,42,0.30)] placeholder:font-normal focus:outline-none focus:border-b-[#ca5f15] transition-[border-color] duration-180";
const btnPrimaryClass = "inline-flex items-center gap-2 bg-[#ca5f15] text-white font-bold text-sm -tracking-[0.005em] py-3 px-5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_1px_2px_rgba(202,95,21,0.30),_0_10px_24px_-10px_rgba(202,95,21,0.55)] hover:bg-[#b35211] hover:-translate-y-px active:translate-y-0 disabled:bg-[rgba(15,23,42,0.10)] disabled:text-[rgba(15,23,42,0.35)] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none transition-[transform,box-shadow,background-color] duration-180 cursor-pointer";
const btnGhostClass = "inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] hover:text-[#0f172a] transition-[background-color,color] duration-180 cursor-pointer";

export function ModalCriarTurma({ open, onClose, onCreate }: ModalCriarTurmaProps) {
  const { usuario } = useAuth();
  const { data: alunosDoCoord = [], isLoading: loadingAlunos } = useAlunosDoCoordenador(usuario?.id);

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

  const watchedAlunos = useWatch({ control, name: 'alunos' });
  const alunos = useMemo(() => watchedAlunos ?? [], [watchedAlunos]);

  const alunosMap = useMemo(() => {
    const map = new Map<string, { nome: string; matricula: string }>();
    alunosDoCoord.forEach((a) => map.set(a.id, { nome: a.nome, matricula: a.matricula }));
    return map;
  }, [alunosDoCoord]);

  const toggleAluno = useCallback((alunoId: string) => {
    const current = getValues('alunos');
    if (current.includes(alunoId)) {
      setValue('alunos', current.filter((id) => id !== alunoId), { shouldValidate: true });
    } else {
      setValue('alunos', [...current, alunoId], { shouldValidate: true });
    }
  }, [getValues, setValue]);

  const removerAluno = useCallback((alunoId: string) => {
    const current = getValues('alunos');
    setValue('alunos', current.filter((id) => id !== alunoId), { shouldValidate: true });
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    setDropdownOpen(false);
    onClose();
  }, [reset, onClose]);

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
              <h2 className="text-xl font-bold text-gray-900">Nova turma</h2>
              <p className="text-xs text-gray-500">Preencha os dados e adicione alunos</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onValid)} className="space-y-5">
            <div>
              <label htmlFor="turmaNome" className={labelClass}>Nome da turma</label>
              <input
                id="turmaNome"
                type="text"
                {...register('nome')}
                placeholder="Ex: Engenharia de Software — 2025.1"
                className={cn(inputClass, "font-semibold mt-1")}
              />
              {errors.nome && (
                <p className="text-xs text-red-600 mt-1">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="turmaDisciplina" className={labelClass}>Disciplina</label>
              <input
                id="turmaDisciplina"
                type="text"
                {...register('disciplina')}
                placeholder="Ex: Cálculo I"
                className={cn(inputClass, "font-semibold mt-1")}
              />
              {errors.disciplina && (
                <p className="text-xs text-red-600 mt-1">{errors.disciplina.message}</p>
              )}
            </div>

            <div ref={dropdownRef} className="relative">
              <label className={cn(labelClass, "mb-2 block")}>Selecionar alunos</label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between gap-2 bg-transparent border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-left"
              >
                <span className={alunos.length === 0 ? "text-gray-400" : "text-gray-900 font-medium"}>
                  {alunos.length === 0
                    ? "Selecionar alunos..."
                    : `${alunos.length} aluno${alunos.length !== 1 ? 's' : ''} selecionado${alunos.length !== 1 ? 's' : ''}`}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-180", dropdownOpen && "rotate-180")} />
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full border border-gray-200 rounded-xl bg-white shadow-lg max-h-48 overflow-y-auto">
                  {loadingAlunos ? (
                    <div className="p-3 text-xs text-gray-400">Carregando alunos...</div>
                  ) : alunosDoCoord.length === 0 ? (
                    <div className="p-3 text-xs text-gray-400">Nenhum aluno vinculado. Cadastre alunos primeiro.</div>
                  ) : alunosDoCoord.map((aluno) => {
                    const isSelected = alunos.includes(aluno.id);
                    return (
                      <label
                        key={aluno.id}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-[rgba(202,95,21,0.05)] cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAluno(aluno.id)}
                          className="accent-[#ca5f15]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{aluno.nome}</p>
                          <p className="text-xs text-gray-400">{aluno.matricula}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-xl p-3 min-h-[64px]">
              <p className="text-xs text-gray-400 mb-2">Alunos adicionados ({alunos.length})</p>
              <div className="flex flex-wrap gap-2">
                {alunos.length === 0 && (
                  <span className="text-xs text-gray-300">Nenhum aluno selecionado</span>
                )}
                {alunos.map((alunoId) => {
                  const info = alunosMap.get(alunoId);
                  return (
                    <span
                      key={alunoId}
                      className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full px-3 py-1"
                    >
                      {info?.nome ?? alunoId}
                      <button
                        type="button"
                        onClick={() => removerAluno(alunoId)}
                        className="opacity-60 hover:opacity-100 cursor-pointer leading-none bg-transparent border-none p-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className={btnGhostClass}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={btnPrimaryClass}
              >
                <Check className="w-3.5 h-3.5" />
                Criar turma
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
