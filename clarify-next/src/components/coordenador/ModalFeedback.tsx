'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { feedbackSchema, type FeedbackFormData } from '@/schemas/demandas';

interface ModalFeedbackProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export function ModalFeedback({ open, onClose, onSubmit }: ModalFeedbackProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
  });

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
        <form onSubmit={handleSubmit(onValid)} className="bg-white p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Feedback</h3>
          <p className="text-sm text-gray-500 mb-4">
            Descreva o motivo da reprovação ou o ajuste necessário.
          </p>
          <input
            type="text"
            {...register('texto')}
            placeholder="Digite seu feedback..."
            aria-label="Feedback"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
          {errors.texto && (
            <p className="text-xs text-red-600 mb-2">{errors.texto.message}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer border-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer border-none"
            >
              Enviar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
