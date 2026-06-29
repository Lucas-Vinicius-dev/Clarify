'use client';

import { useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CardTurma } from '@/components/coordenador/CardTurma';
import { FiltroTurmas } from '@/components/coordenador/FiltroTurmas';
import type { Turma } from '@/types';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListaTurmasProps {
  turmas: Turma[];
  loading: boolean;
  onCriarTurma: () => void;
  onEditarTurma?: (turma: Turma) => void;
  onExcluirTurma?: (id: string) => void;
}

const ITENS_POR_PAGINA = 9;

export function ListaTurmas({ turmas, loading, onCriarTurma, onEditarTurma, onExcluirTurma }: ListaTurmasProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const busca = searchParams.get('f_busca') ?? '';

  const disciplinas = useMemo(() => {
    const raw = searchParams.get('f_disciplinas') ?? '';
    return raw ? raw.split(',') : [];
  }, [searchParams]);

  const minAlunos = searchParams.get('f_min') ?? '';
  const maxAlunos = searchParams.get('f_max') ?? '';
  const paginaAtual = Math.max(1, Number(searchParams.get('pagina') ?? '1'));

  const atualizarParam = useCallback((chave: string, valor: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (valor) {
      params.set(chave, valor);
    } else {
      params.delete(chave);
    }
    if (chave !== 'pagina') params.delete('pagina');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleBuscaChange = useCallback((valor: string) => {
    atualizarParam('f_busca', valor);
  }, [atualizarParam]);

  const handleDisciplinasChange = useCallback((novas: string[]) => {
    atualizarParam('f_disciplinas', novas.join(','));
  }, [atualizarParam]);

  const handleMinAlunosChange = useCallback((valor: string) => {
    atualizarParam('f_min', valor);
  }, [atualizarParam]);

  const handleMaxAlunosChange = useCallback((valor: string) => {
    atualizarParam('f_max', valor);
  }, [atualizarParam]);

  const handleLimpar = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('f_busca');
    params.delete('f_disciplinas');
    params.delete('f_min');
    params.delete('f_max');
    params.delete('pagina');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleMudarPagina = useCallback((pagina: number) => {
    atualizarParam('pagina', String(pagina));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [atualizarParam]);

  const filtradas = useMemo(() => {
    let resultado = turmas;

    if (busca.trim()) {
      const termo = busca.trim().toLowerCase();
      resultado = resultado.filter((t) => t.nome.toLowerCase().includes(termo));
    }

    if (disciplinas.length > 0) {
      resultado = resultado.filter((t) => disciplinas.includes(t.disciplina));
    }

    if (minAlunos !== '') {
      const min = Number(minAlunos);
      if (!isNaN(min)) resultado = resultado.filter((t) => t.alunos.length >= min);
    }

    if (maxAlunos !== '') {
      const max = Number(maxAlunos);
      if (!isNaN(max)) resultado = resultado.filter((t) => t.alunos.length <= max);
    }

    return resultado;
  }, [turmas, busca, disciplinas, minAlunos, maxAlunos]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / ITENS_POR_PAGINA));
  const paginaSegura = Math.min(paginaAtual, totalPaginas);
  const inicio = (paginaSegura - 1) * ITENS_POR_PAGINA;
  const paginaAtualValida = paginaSegura !== paginaAtual;

  const paginadas = useMemo(() => {
    return filtradas.slice(inicio, inicio + ITENS_POR_PAGINA);
  }, [filtradas, inicio]);

  if (paginaAtualValida && totalPaginas > 0) {
    handleMudarPagina(paginaSegura);
  }
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Turmas</h2>
        <button
          type="button"
          onClick={onCriarTurma}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors cursor-pointer border-none"
        >
          + Criar turma
        </button>
      </div>

      <div className="mb-4">
        <FiltroTurmas
          turmas={turmas}
          busca={busca}
          disciplinas={disciplinas}
          minAlunos={minAlunos}
          maxAlunos={maxAlunos}
          onBuscaChange={handleBuscaChange}
          onDisciplinasChange={handleDisciplinasChange}
          onMinAlunosChange={handleMinAlunosChange}
          onMaxAlunosChange={handleMaxAlunosChange}
          onLimpar={handleLimpar}
        />
      </div>

      {/* Result count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-3">
          {filtradas.length} turma{filtradas.length !== 1 ? 's' : ''} encontrada{filtradas.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin mb-3" />
          <p className="text-sm">Carregando turmas...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtradas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <AlertCircle className="w-10 h-10 mb-3" />
          {turmas.length === 0 ? (
            <>
              <p className="text-sm font-medium text-gray-500 mb-1">Nenhuma turma criada ainda.</p>
              <p className="text-xs">Crie sua primeira turma para começar.</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-500 mb-1">Nenhuma turma encontrada</p>
              <p className="text-xs">Tente remover alguns filtros para ver mais resultados.</p>
              <button
                type="button"
                onClick={handleLimpar}
                className="mt-3 text-sm font-semibold text-brand-primary bg-transparent border-none cursor-pointer hover:underline"
              >
                Limpar filtros
              </button>
            </>
          )}
        </div>
      )}

      {/* Turmas grid */}
      {!loading && filtradas.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginadas.map((turma) => (
              <CardTurma key={turma.id} turma={turma} onEditar={onEditarTurma} onExcluir={onExcluirTurma} />
            ))}
          </div>

          {/* Pagination */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => handleMudarPagina(paginaSegura - 1)}
                disabled={paginaSegura <= 1}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors border cursor-pointer",
                  paginaSegura <= 1
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                )}
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleMudarPagina(p)}
                    className={cn(
                      "w-8 h-8 text-sm rounded-lg transition-colors cursor-pointer border",
                      p === paginaSegura
                        ? "bg-brand-primary text-white border-brand-primary font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                    )}
                    aria-label={`Página ${p}`}
                    aria-current={p === paginaSegura ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleMudarPagina(paginaSegura + 1)}
                disabled={paginaSegura >= totalPaginas}
                className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors border cursor-pointer",
                  paginaSegura >= totalPaginas
                    ? "border-gray-100 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary"
                )}
                aria-label="Próxima página"
              >
                Próxima
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
