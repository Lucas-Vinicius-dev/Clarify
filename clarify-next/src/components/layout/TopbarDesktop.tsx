'use client';

import type { UsuarioLogado } from '@/types';
import { UserChip } from './UserChip';

interface TopbarDesktopProps {
  usuario: UsuarioLogado | null;
  onLogout: () => void;
}

/**
 * Topbar desktop com chip de usuário
 * Aparece no topo das pages protegidas
 */
export function TopbarDesktop({ usuario, onLogout }: TopbarDesktopProps) {
  return (
    <header className="hidden md:flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex-1" />
      <UserChip usuario={usuario} onLogout={onLogout} showName={true} />
    </header>
  );
}
