'use client';

import { useState, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';

interface ModalFeedbackProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export function ModalFeedback({ open, onClose, onSubmit }: ModalFeedbackProps) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    onSubmit(feedback.trim());
    setFeedback('');
    onClose();
  }, [feedback, onSubmit, onClose]);

  const handleClose = useCallback(() => {
    setFeedback('');
    onClose();
  }, [onClose]);

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-sm">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Feedback</h3>
        <p className="text-sm text-gray-500 mb-4">
          Descreva o motivo da reprovação ou o ajuste necessário.
        </p>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Digite seu feedback..."
          required
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          autoFocus
        />
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
            disabled={!feedback.trim()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </form>
    </Modal>
  );
}
