'use client';

import Image from 'next/image';
import { Menu } from 'lucide-react';
import type { UsuarioLogado } from '@/types';
import { UserChip } from './UserChip';

interface TopbarMobileProps {
  usuario: UsuarioLogado | null;
  onLogout: () => void;
  onMenuClick?: () => void;
}

/**
 * Topbar mobile com logo, menu burger e chip de usuário
 * Aparece no topo em devices pequenos
 */
export function TopbarMobile({
  usuario,
  onLogout,
  onMenuClick,
}: TopbarMobileProps) {
  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm gap-3">
      {/* Logo + Título */}
      <div className="flex items-center gap-2">
        <Image
          src="/GATOGORDO.png"
          alt="Clarify"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="font-bold text-orange-600 text-lg">Clarify</span>
      </div>

      {/* Ações direita */}
      <div className="flex items-center gap-2">
        {/* Menu burger (se houver callback) */}
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-slate-400" />
          </button>
        )}

        {/* Chip de usuário (versão compacta) */}
        <UserChip usuario={usuario} onLogout={onLogout} showName={false} />
      </div>
    </header>
  );
}
