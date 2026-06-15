'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopbarDesktop } from '@/components/layout/TopbarDesktop';
import { TopbarMobile } from '@/components/layout/TopbarMobile';
import { DrawerMobile } from '@/components/layout/DrawerMobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout compartilhado para o dashboard protegido
 * - A proteção de rotas (autenticação e cargo) é feita pelo proxy (src/proxy.ts)
 * - Renderiza sidebar + topbar + conteúdo
 * - Gerencia drawer móvel
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, usuario, logout } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Guarda de renderização: o middleware já garante a sessão no servidor,
  // mas evitamos renderizar a UI antes do usuário estar hidratado no cliente.
  if (!isAuthenticated || !usuario) {
    return null;
  }

  const handleNavigate = (view: string) => {
    setDrawerOpen(false);
    // Lido sob demanda dentro do handler (evita re-render a cada mudança de URL)
    const pathname = window.location.pathname;
    if (pathname.startsWith('/dashboardcoord')) {
      router.push(`/dashboardcoord?view=${view}`);
    } else {
      router.push(`/centraldemandas?view=${view}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar + Drawer com suporte a searchParams */}
      <Suspense fallback={<div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200" />}>
        <SidebarNav
          cargo={usuario.cargo}
          drawerOpen={drawerOpen}
          onCloseDrawer={() => setDrawerOpen(false)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </Suspense>

      {/* Área principal (mobile + desktop) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar mobile */}
        <TopbarMobile
          usuario={usuario}
          onLogout={handleLogout}
          onMenuClick={() => setDrawerOpen(true)}
        />

        {/* Topbar desktop */}
        <TopbarDesktop usuario={usuario} onLogout={handleLogout} />

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * Componente aninhado que usa useSearchParams para manter a sidebarView sincronizada
 * Separado para poder ser envolvido em Suspense (exigência do Next.js)
 */
function SidebarNav({
  cargo,
  drawerOpen,
  onCloseDrawer,
  onNavigate,
  onLogout,
}: {
  cargo: 'aluno' | 'coordenador';
  drawerOpen: boolean;
  onCloseDrawer: () => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}) {
  const searchParams = useSearchParams();
  const sidebarView = searchParams.get('view') || 'nome';

  return (
    <>
      {/* Sidebar desktop (oculta em mobile) */}
      <div className="hidden md:block">
        <Sidebar
          cargo={cargo}
          currentView={sidebarView}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>

      {/* Drawer mobile */}
      <DrawerMobile
        open={drawerOpen}
        onClose={onCloseDrawer}
        cargo={cargo}
        currentView={sidebarView}
        onNavigate={onNavigate}
      />
    </>
  );
}
