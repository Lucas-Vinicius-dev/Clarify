'use client';

import Image from 'next/image';
import {
  User,
  Users,
  Plus,
  FileText,
  Shield,
  LogOut,
} from 'lucide-react';
import type { Cargo } from '@/types';

interface SidebarProps {
  cargo: Cargo;
  currentView?: string;
  onNavigate?: (view: string) => void;
  onLogout?: () => void;
}

/**
 * Sidebar desktop com navegação por cargo
 * - Coordenador: Início, Alunos, Adicionar, Demandas, Turmas
 * - Aluno: Central de Demandas, Documentos
 */
export function Sidebar({
  cargo,
  currentView = 'nome',
  onNavigate,
  onLogout,
}: SidebarProps) {
  const navItems =
    cargo === 'coordenador'
      ? [
          { id: 'nome', label: 'Início', icon: User },
          { id: 'alunos', label: 'Alunos', icon: Users },
          { id: 'adicionar', label: 'Adicionar aluno', icon: Plus },
          { id: 'demandas', label: 'Demandas', icon: FileText },
          { id: 'turmas', label: 'Turmas', icon: Shield },
        ]
      : [
          { id: 'demandas', label: 'Minhas demandas', icon: FileText },
        ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gray-50 shadow border-r border-gray-200 p-5 shrink-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <Image
          src="/GATOGORDO.png"
          alt="Clarify Logo"
          width={44}
          height={44}
          className="w-11 h-11 object-contain"
        />
        <h1 className="text-2xl font-bold text-orange-600">Clarify</h1>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate?.(id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors ${
              currentView === id
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
            }`}
            aria-current={currentView === id ? 'page' : undefined}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Botão logout */}
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      )}
    </aside>
  );
}
