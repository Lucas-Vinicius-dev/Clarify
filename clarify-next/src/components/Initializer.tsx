'use client';

// ═════════════════════════════════════════════════════════════════
// COMPONENT: INITIALIZER
// Inicializa dados do sistema (localStorage) no mount
// ═════════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { popularLocalStorage } from '@/lib/localStorage';

/**
 * Componente que inicializa o localStorage
 * Deve ser renderizado no RootLayout dentro do AuthProvider
 * Não renderiza nada na tela
 */
export function Initializer() {
  useEffect(() => {
    popularLocalStorage();
  }, []);

  return null;
}
