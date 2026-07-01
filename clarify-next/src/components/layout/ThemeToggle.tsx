'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { tema, alternarTema } = useTheme();
  const escuro = tema === 'dark';

  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label={escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
    >
      {escuro ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
