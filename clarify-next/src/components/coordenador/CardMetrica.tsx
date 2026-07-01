import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface CardMetricaProps {
  titulo: string;
  valor: string | number;
  children?: ReactNode;
  label?: string;
}

export function CardMetrica({ titulo, valor, children, label }: CardMetricaProps) {
  return (
    <Card className="p-5">
      <p className="text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-widest">
        {titulo}
      </p>
      <div className="flex items-end gap-3 mt-2">
        <span className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 leading-none">{valor}</span>
        {children}
      </div>
      {label && <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-1">{label}</p>}
    </Card>
  );
}