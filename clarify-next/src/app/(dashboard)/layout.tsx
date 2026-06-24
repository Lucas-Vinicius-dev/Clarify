'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUIStore } from '@/store/uiStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopbarDesktop } from '@/components/layout/TopbarDesktop';
import { TopbarMobile } from '@/components/layout/TopbarMobile';
import { DrawerMobile } from '@/components/layout/DrawerMobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, loading, usuario, logout } = useAuth();
  const router = useRouter();
  const { drawerOpen, setDrawer: setDrawerOpen } = useUIStore();

  if (loading || !isAuthenticated || !usuario) {
    return null;
  }

  const handleNavigate = (view: string) => {
    setDrawerOpen(false);
    if (window.location.pathname.startsWith('/dashboardcoord')) {
      router.push(`/dashboardcoord?view=${view}`);
    } else {
      router.push(`/centraldemandas?view=${view}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Suspense fallback={<div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200" />}>
        <SidebarNav
          cargo={usuario.cargo}
          drawerOpen={drawerOpen}
          onCloseDrawer={() => setDrawerOpen(false)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </Suspense>

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopbarMobile
          usuario={usuario}
          onLogout={handleLogout}
          onMenuClick={() => setDrawerOpen(true)}
        />

        <TopbarDesktop usuario={usuario} onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

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
      <div className="hidden md:block">
        <Sidebar
          cargo={cargo}
          currentView={sidebarView}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>

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
