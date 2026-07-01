'use client';

import { useCallback } from 'react';
import { MessageSquareText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';
import { feedbackSchema, type FeedbackFormData } from '@/schemas/demandas';

interface ModalFeedbackProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const LIMITE_FEEDBACK = 200;

const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)] dark:text-slate-400";
const counterClass = "tabular-nums text-[0.6875rem] text-[rgba(15,23,42,0.40)] dark:text-slate-400 tracking-[0.04em]";
const inputClass = "w-full bg-transparent border-0 border-b-[1.5px] border-[rgba(15,23,42,0.10)] dark:border-slate-700 py-2 px-0 text-lg leading-[1.3] -tracking-[0.01em] text-[#0f172a] dark:text-slate-100 placeholder:text-[rgba(15,23,42,0.30)] dark:placeholder:text-slate-500 placeholder:font-normal focus:outline-none focus:border-b-[#ca5f15] transition-[border-color] duration-180";
const btnPrimaryClass = "inline-flex items-center gap-2 bg-[#ca5f15] text-white font-bold text-sm -tracking-[0.005em] py-3 px-5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_1px_2px_rgba(202,95,21,0.30),_0_10px_24px_-10px_rgba(202,95,21,0.55)] hover:bg-[#b35211] hover:-translate-y-px active:translate-y-0 disabled:bg-[rgba(15,23,42,0.10)] disabled:text-[rgba(15,23,42,0.35)] disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none transition-[transform,box-shadow,background-color] duration-180 cursor-pointer";
const btnGhostClass = "inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] dark:text-slate-300 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] dark:hover:bg-slate-700 hover:text-[#0f172a] dark:hover:text-slate-100 transition-[background-color,color] duration-180 cursor-pointer";

export function ModalFeedback({ open, onClose, onSubmit }: ModalFeedbackProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
  });

  const textoValue = watch('texto') ?? '';

  const contadorNear = textoValue.length >= LIMITE_FEEDBACK * 0.85 && textoValue.length < LIMITE_FEEDBACK;
  const contadorOver = textoValue.length >= LIMITE_FEEDBACK;

  const onValid = useCallback((data: FeedbackFormData) => {
    onSubmit(data.texto.trim());
    reset();
    onClose();
  }, [onSubmit, reset, onClose]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="max-w-sm">
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-8">
          <DialogHeader className="border-none">
            <div />
          </DialogHeader>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <MessageSquareText className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Feedback</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Descreva o motivo da reprovação ou o ajuste necessário.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onValid)} className="space-y-5">
            <div>
              <div className="flex items-end justify-between gap-3">
                <label htmlFor="campoFeedback" className={labelClass}>Feedback</label>
                <span className={cn(counterClass, contadorNear && "text-[#d97706]", contadorOver && "text-[#dc2626]")}>
                  {textoValue.length} / {LIMITE_FEEDBACK}
                </span>
              </div>
              <input
                id="campoFeedback"
                type="text"
                {...register('texto')}
                maxLength={LIMITE_FEEDBACK}
                placeholder="Digite seu feedback..."
                className={cn(inputClass, "font-semibold mt-1")}
              />
              {errors.texto && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.texto.message}</p>
              )}
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
                Enviar feedback
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
