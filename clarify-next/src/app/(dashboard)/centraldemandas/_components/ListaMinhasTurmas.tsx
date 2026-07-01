'use client';

import { useMemo } from 'react';
import { Users, Shield } from 'lucide-react';
import type { Turma } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useUsuarios } from '@/hooks/useUsuarios';

interface ListaMinhasTurmasProps {
  turmas: Turma[];
}

export function ListaMinhasTurmas({ turmas }: ListaMinhasTurmasProps) {
  const { usuarios } = useUsuarios();

  const nomesPorId = useMemo(() => {
    const map = new Map<string, string>();
    for (const u of usuarios) map.set(u.id, u.nome);
    return map;
  }, [usuarios]);

  if (turmas.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Minhas turmas</h2>
        <Card className="p-8 text-center">
          <Users className="w-8 h-8 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Você ainda não está vinculado a nenhuma turma.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Minhas turmas</h2>
        <Badge>{turmas.length} turma{turmas.length !== 1 ? 's' : ''}</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {turmas.map((turma) => {
          const coordenador = nomesPorId.get(turma.coordenador_id);
          return (
            <Card
              key={turma.id}
              className="p-5 hover:-translate-y-1 transition-transform duration-200 ease-out"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 truncate">
                    {turma.nome}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{turma.disciplina}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                <Users className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
                <span className="truncate">
                  {coordenador ?? 'Coordenador'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
