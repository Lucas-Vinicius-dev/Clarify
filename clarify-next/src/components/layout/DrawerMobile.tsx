'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Cargo } from '@/types';
import { Sidebar } from './Sidebar';

interface DrawerMobileProps {
  open: boolean;
  onClose: () => void;
  cargo: Cargo;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

/**
 * Drawer/Menu móvel que aparece acima do conteúdo
 * Contém a sidebar em mobile com animação de slide lateral
 */
export function DrawerMobile({
  open,
  onClose,
  cargo,
  currentView,
  onNavigate,
}: DrawerMobileProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  return (
    <>
      {/* Overlay com fade */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ease-out ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer com slide lateral */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg md:hidden overflow-y-auto transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header com botão fechar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <span className="font-bold text-orange-600 text-lg">Clarify</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Conteúdo da sidebar (nav items) */}
        <div className="p-3">
          <Sidebar
            cargo={cargo}
            currentView={currentView}
            onNavigate={(view) => {
              onNavigate?.(view);
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
