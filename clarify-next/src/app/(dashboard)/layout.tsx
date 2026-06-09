'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopbarMobile } from '@/components/layout/TopbarMobile';
import { DrawerMobile } from '@/components/layout/DrawerMobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout compartilhado para o dashboard protegido
 * - Verifica autenticação (redireciona para /login se não autenticado)
 * - Renderiza sidebar + topbar + conteúdo
 * - Gerencia drawer móvel
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, usuario, logout } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Espera hidratação antes de redirecionar
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Renderiza nada enquanto hidrata ou verifica autenticação
  if (!isHydrated || !isAuthenticated || !usuario) {
    return null;
  }

  const handleNavigate = (view: string) => {
    // Será usado pelas páginas do dashboard para mudar de seção
    // Atualmente, as páginas gerenciam seu próprio estado de view
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar desktop */}
      <Sidebar
        cargo={usuario.cargo}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Drawer mobile */}
      <DrawerMobile
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cargo={usuario.cargo}
        onNavigate={handleNavigate}
      />

      {/* Área principal (mobile + desktop) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar mobile */}
        <TopbarMobile
          usuario={usuario}
          onLogout={handleLogout}
          onMenuClick={() => setDrawerOpen(true)}
        />

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
