'use client';

import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

/**
 * Componente Modal base com backdrop, ESC handler e scroll lock
 * Reutilizável para todos os modais da aplicação
 */
export function Modal({
  open,
  onClose,
  maxWidth = 'max-w-lg',
  children,
  title,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    // Lock scroll no body quando modal está aberto
    document.body.classList.add('modal-open');

    // Handler para fechar com ESC
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-panel relative w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden`}
      >
        {/* Header com título e botão fechar */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
            {title && (
              <div className="inline-flex items-center gap-2">
                <span className="modal-eyebrow-dot"></span>
                <span className="modal-label">{title}</span>
              </div>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="modal-close ml-auto"
                onClick={onClose}
                title="Fechar"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Conteúdo do modal */}
        {children}
      </div>
    </div>
  );
}
