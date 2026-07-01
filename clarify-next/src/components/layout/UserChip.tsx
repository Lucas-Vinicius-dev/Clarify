'use client';

import { LogOut } from 'lucide-react';
import type { UsuarioLogado } from '@/types';

interface UserChipProps {
  usuario: UsuarioLogado | null;
  onLogout: () => void;
  showName?: boolean;
}

/**
 * Chip de usuário exibindo avatar + nome + botão logout
 * Usado no topbar e sidebar
 */
export function UserChip({ usuario, onLogout, showName = true }: UserChipProps) {
  if (!usuario) return null;

  const nome = usuario.nome || 'Usuário';
  const primeiroNome = nome.split(' ')[0];
  const inicial = primeiroNome.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full pl-2 pr-1 py-1 shadow-sm">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center">
        {inicial}
      </div>

      {/* Nome (hidden em LG) */}
      {showName && (
        <span className="text-sm font-medium text-gray-700 dark:text-slate-300 hidden lg:inline">
          {nome}
        </span>
      )}

      {/* Botão logout */}
      <button
        type="button"
        title="Sair da conta"
        onClick={onLogout}
        className="w-8 h-8 rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Sair da conta"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
