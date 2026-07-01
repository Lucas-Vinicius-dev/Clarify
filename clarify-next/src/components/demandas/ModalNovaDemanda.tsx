'use client';

import { useCallback, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { novaDemandaSchema, type NovaDemandaFormData } from '@/schemas/demandas';
import { CAMPOS_POR_TIPO, montarCamposExtras } from '@/lib/camposDemanda';
import { TIPOS_DEMANDA, type TipoDemanda, type UsuarioLogado } from '@/types';

interface ModalNovaDemandaProps {
  open: boolean;
  onClose: () => void;
  usuario: UsuarioLogado | null;
  onSubmit: (dados: { tipo: TipoDemanda; descricao: string; camposExtras: Record<string, string> }) => Promise<void>;
}

const LIMITE_DESCRICAO = 500;

export function ModalNovaDemanda({ open, onClose, usuario, onSubmit }: ModalNovaDemandaProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NovaDemandaFormData>({
    resolver: zodResolver(novaDemandaSchema),
    mode: 'onChange',
  });

  const [submitting, setSubmitting] = useState(false);
  const [erroSubmit, setErroSubmit] = useState<string | null>(null);

  const descricaoValue = watch('descricao') ?? '';
  const camposDoTipo = CAMPOS_POR_TIPO[watch('tipo')] ?? [];

  const contadorNear = descricaoValue.length >= LIMITE_DESCRICAO * 0.85 && descricaoValue.length < LIMITE_DESCRICAO;
  const contadorOver = descricaoValue.length >= LIMITE_DESCRICAO;

  const onValid = useCallback(async (data: NovaDemandaFormData) => {
    if (!usuario?.matricula) return;
    setSubmitting(true);
    setErroSubmit(null);
    try {
      const camposExtras = montarCamposExtras(data.tipo, data.camposExtras);
      await onSubmit({ tipo: data.tipo, descricao: data.descricao.trim(), camposExtras });
      reset();
      onClose();
    } catch (err) {
      setErroSubmit(err instanceof Error ? err.message : 'Erro inesperado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }, [usuario, onSubmit, reset, onClose]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const inicial = (usuario?.nome || 'V').charAt(0).toUpperCase();

  const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)] dark:text-slate-400";
  const inputClass = "w-full bg-transparent border-0 border-b-[1.5px] border-[rgba(15,23,42,0.10)] dark:border-b-slate-600 py-2 px-0 text-lg leading-[1.3] -tracking-[0.01em] text-[#0f172a] dark:text-slate-100 placeholder:text-[rgba(15,23,42,0.30)] dark:placeholder:text-slate-500 placeholder:font-normal focus:outline-none focus:border-b-[#ca5f15] transition-[border-color] duration-180";
  const textareaClass = "w-full resize-none border border-[rgba(15,23,42,0.10)] dark:border-slate-700 rounded-2xl p-4 text-[0.95rem] leading-[1.55] text-[#0f172a] dark:text-slate-100 bg-white dark:bg-slate-900 placeholder:text-[rgba(15,23,42,0.32)] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#ca5f15] focus:shadow-[0_0_0_4px_rgba(202,95,21,0.12)] transition-[border-color,box-shadow] duration-180";
  const btnPrimaryClass = "inline-flex items-center gap-2 bg-[#ca5f15] text-white font-bold text-sm -tracking-[0.005em] py-3 px-5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_1px_2px_rgba(202,95,21,0.30),_0_10px_24px_-10px_rgba(202,95,21,0.55)] hover:bg-[#b35211] hover:-translate-y-px active:translate-y-0 disabled:bg-[rgba(15,23,42,0.10)] disabled:text-[rgba(15,23,42,0.35)] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none transition-[transform,box-shadow,background-color] duration-180 cursor-pointer";
  const btnGhostClass = "inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] dark:text-slate-300 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] dark:hover:bg-slate-700 hover:text-[#0f172a] dark:hover:text-slate-100 transition-[background-color,color] duration-180 cursor-pointer";
  const closeBtnClass = "inline-flex items-center justify-center w-9 h-9 rounded-full text-[rgba(15,23,42,0.50)] dark:text-slate-400 hover:bg-[rgba(15,23,42,0.05)] dark:hover:bg-slate-700 hover:text-[#0f172a] dark:hover:text-slate-100 hover:rotate-90 transition-[background-color,color,transform] duration-180 cursor-pointer";
  const dotClass = "inline-block w-1.5 h-1.5 rounded-full bg-[#ca5f15] shadow-[0_0_0_3px_rgba(202,95,21,0.18)]";
  const counterClass = "tabular-nums text-[0.6875rem] text-[rgba(15,23,42,0.40)] dark:text-slate-500 tracking-[0.04em]";
  const staggerClass = "stagger-container";

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-lg">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
          <DialogHeader className="border-none">
            <div className="inline-flex items-center gap-2">
              <span className={dotClass} />
              <span className={labelClass}>Nova solicitação</span>
            </div>
            <button type="button" className={closeBtnClass} onClick={handleClose} title="Fechar">
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <div className={cn("px-5 sm:px-7 pt-4 sm:pt-5 pb-2", staggerClass)}>
            <header>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-100 tracking-tighter-2 leading-tight">
                Conte para a coordenação<br/>
                <span className="text-gradient-warm">o que precisa ser resolvido.</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-md">
                Quanto mais claro o pedido, mais rápida a análise. Inclua disciplina, datas e qualquer contexto relevante.
              </p>
            </header>

            <section className="mt-5">
              <label htmlFor="campoTipoDemanda" className={labelClass}>Tipo de Solicitação</label>
              <select
                id="campoTipoDemanda"
                {...register('tipo')}
                className={cn(inputClass, "font-semibold mt-1")}
                defaultValue=""
              >
                <option value="" disabled>Selecione o tipo de solicitação</option>
                {TIPOS_DEMANDA.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              {errors.tipo && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.tipo.message}</p>
              )}
            </section>

            {camposDoTipo.map((campo) => {
              const erro = errors.camposExtras?.[campo.name]?.message;
              return (
                <section key={campo.name} className="mt-5">
                  <label htmlFor={`campo-${campo.name}`} className={labelClass}>{campo.label}</label>
                  {campo.type === 'textarea' ? (
                    <textarea
                      id={`campo-${campo.name}`}
                      {...register(`camposExtras.${campo.name}`)}
                      rows={3}
                      placeholder={campo.placeholder}
                      className={cn(textareaClass, 'mt-2')}
                    />
                  ) : (
                    <input
                      id={`campo-${campo.name}`}
                      type={campo.type}
                      {...register(`camposExtras.${campo.name}`)}
                      placeholder={campo.placeholder}
                      className={cn(inputClass, 'mt-1')}
                    />
                  )}
                  {erro && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{erro}</p>}
                </section>
              );
            })}

            <section className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <label htmlFor="campoDescricaoDemanda" className={labelClass}>Descrição</label>
                <span className={cn(counterClass, contadorNear && "text-[#d97706]", contadorOver && "text-[#dc2626]")}>
                  {descricaoValue.length} / {LIMITE_DESCRICAO}
                </span>
              </div>
              <textarea
                id="campoDescricaoDemanda"
                {...register('descricao')}
                rows={5}
                maxLength={LIMITE_DESCRICAO}
                placeholder="Descreva a situação, os documentos anexos (se houver) e o que você espera como resolução."
                className={cn(textareaClass, "mt-2")}
              />
              {errors.descricao && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.descricao.message}</p>
              )}
            </section>

            {erroSubmit && (
              <section className="mt-5 rounded-2xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3">
                <p className="text-sm text-red-700 dark:text-red-300">{erroSubmit}</p>
              </section>
            )}

            <section className="mt-5 flex items-center gap-3 bg-brand-surface dark:bg-slate-900 rounded-2xl px-3.5 py-2.5 border border-gray-100 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                {inicial}
              </div>
              <div className="min-w-0">
                <p className={cn(labelClass, "leading-none")}>Enviando como</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 mt-1 truncate">
                  {usuario?.nome || 'Aluno'} · Matrícula {usuario?.matricula || '—'}
                </p>
              </div>
            </section>

          </div>

          <DialogFooter>
            <button type="button" className={btnGhostClass} onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className={btnPrimaryClass} disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar solicitação'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
