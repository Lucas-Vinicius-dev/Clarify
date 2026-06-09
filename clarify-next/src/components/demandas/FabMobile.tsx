'use client';

import { Plus } from 'lucide-react';

interface FabMobileProps {
  onClick: () => void;
}

export function FabMobile({ onClick }: FabMobileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-brand-primary text-white shadow-[0_8px_24px_-8px_rgba(202,95,21,0.55)] flex items-center justify-center border-none cursor-pointer transition-transform hover:scale-105 hover:bg-[#b35211] sm:hidden"
      aria-label="Nova solicitação"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
}
