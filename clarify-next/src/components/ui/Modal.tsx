'use client';

import { useEffect, useEffectEvent, ReactNode } from 'react';
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
 * Componente Modal base com backdrop, ESC handler e scroll lock.
 * Reutilizável para todos os modais da aplicação.
 *
 * O conteúdo vive em <ModalConteudo>, que só é montado quando `open` é true.
 * Assim o efeito de scroll-lock + listener de ESC usa o ciclo de
 * montagem/desmontagem (deps vazias) em vez de reagir à prop `open`.
 */
export function Modal({
  open,
  onClose,
  maxWidth = 'max-w-lg',
  children,
  title,
  showCloseButton = true,
}: ModalProps) {
  if (!open) return null;

  return (
    <ModalConteudo
      onClose={onClose}
      maxWidth={maxWidth}
      title={title}
      showCloseButton={showCloseButton}
    >
      {children}
    </ModalConteudo>
  );
}

interface ModalConteudoProps {
  onClose: () => void;
  maxWidth: string;
  children: ReactNode;
  title?: string;
  showCloseButton: boolean;
}

function ModalConteudo({
  onClose,
  maxWidth,
  children,
  title,
  showCloseButton,
}: ModalConteudoProps) {
  // Captura sempre o onClose mais recente sem torná-lo dependência do efeito
  const aoPressionarEsc = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  });

  // Roda na montagem (modal abriu) e limpa na desmontagem (modal fechou)
  useEffect(() => {
    document.body.classList.add('modal-open');

    const handleEsc = (e: KeyboardEvent) => aoPressionarEsc(e);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Camada de fundo clicável para fechar (atrás do painel, mantém o visual do backdrop) */}
      <button
        type="button"
        aria-label="Fechar modal"
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-default"
        tabIndex={-1}
      />
      <div
        className={`modal-panel relative z-10 w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden`}
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
