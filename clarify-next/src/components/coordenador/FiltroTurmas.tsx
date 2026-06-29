'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { Search, X, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import type { Turma } from '@/types';

interface FiltroTurmasProps {
  turmas: Turma[];
  busca: string;
  disciplinas: string[];
  minAlunos: string;
  maxAlunos: string;
  onBuscaChange: (valor: string) => void;
  onDisciplinasChange: (disciplinas: string[]) => void;
  onMinAlunosChange: (valor: string) => void;
  onMaxAlunosChange: (valor: string) => void;
  onLimpar: () => void;
}

export function FiltroTurmas({
  turmas,
  busca,
  disciplinas,
  minAlunos,
  maxAlunos,
  onBuscaChange,
  onDisciplinasChange,
  onMinAlunosChange,
  onMaxAlunosChange,
  onLimpar,
}: FiltroTurmasProps) {
  const [buscaLocal, setBuscaLocal] = useState(busca);
  const buscaDebounced = useDebounce(buscaLocal, 300);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [mobileFiltrosAberto, setMobileFiltrosAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buscaRef = useRef<HTMLInputElement>(null);

  const disciplinasDisponiveis = [...new Set(turmas.map((t) => t.disciplina).filter(Boolean))].sort();

  useEffect(() => {
    onBuscaChange(buscaDebounced);
  }, [buscaDebounced, onBuscaChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const temFiltroAtivo = busca.trim() !== '' || disciplinas.length > 0 || minAlunos !== '' || maxAlunos !== '';

  const toggleDisciplina = useCallback((disciplina: string) => {
    onDisciplinasChange(
      disciplinas.includes(disciplina)
        ? disciplinas.filter((d) => d !== disciplina)
        : [...disciplinas, disciplina]
    );
  }, [disciplinas, onDisciplinasChange]);

  const qtdFiltros = [busca.trim() !== '', disciplinas.length > 0, minAlunos !== '', maxAlunos !== ''].filter(Boolean).length;

  const filtrosMobile = (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={buscaRef}
          type="text"
          value={buscaLocal}
          onChange={(e) => setBuscaLocal(e.target.value)}
          placeholder="Buscar turma..."
          aria-label="Buscar turma"
          className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors"
        />
        {buscaLocal && (
          <button
            type="button"
            onClick={() => { setBuscaLocal(''); onBuscaChange(''); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
            aria-label="Limpar busca"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Disciplina</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {disciplinasDisponiveis.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900">
              <input
                type="checkbox"
                checked={disciplinas.includes(d)}
                onChange={() => toggleDisciplina(d)}
                className="accent-brand-primary rounded"
              />
              {d}
            </label>
          ))}
          {disciplinasDisponiveis.length === 0 && (
            <p className="text-xs text-gray-400">Nenhuma disciplina disponível</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Qtd. de alunos</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={minAlunos}
            onChange={(e) => onMinAlunosChange(e.target.value)}
            placeholder="Mín"
            aria-label="Mínimo de alunos"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-gray-400 text-sm">—</span>
          <input
            type="number"
            min={0}
            value={maxAlunos}
            onChange={(e) => onMaxAlunosChange(e.target.value)}
            placeholder="Máx"
            aria-label="Máximo de alunos"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {temFiltroAtivo && (
        <button
          type="button"
          onClick={() => { onLimpar(); setBuscaLocal(''); }}
          className="w-full py-2 text-sm font-semibold text-brand-primary bg-transparent border border-brand-primary rounded-lg cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filter bar */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 p-3.5">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex-1 min-w-[180px] relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={buscaLocal}
              onChange={(e) => setBuscaLocal(e.target.value)}
              placeholder="Buscar turma..."
              aria-label="Buscar turma"
              className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
            {buscaLocal && (
              <button
                type="button"
                onClick={() => { setBuscaLocal(''); onBuscaChange(''); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Discipline multi-select */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownAberto(!dropdownAberto)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm outline-none transition-colors cursor-pointer whitespace-nowrap",
                disciplinas.length > 0
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary font-semibold"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
              )}
              aria-label="Filtrar por disciplina"
              aria-expanded={dropdownAberto}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Disciplina
              {disciplinas.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-primary text-white text-[11px] font-bold">
                  {disciplinas.length}
                </span>
              )}
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {dropdownAberto && (
              <div className="absolute top-full mt-1 right-0 z-20 w-56 bg-white rounded-xl border border-gray-200 shadow-lg p-3">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Disciplinas</p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {disciplinasDisponiveis.map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900 px-1 py-0.5 rounded">
                      <input
                        type="checkbox"
                        checked={disciplinas.includes(d)}
                        onChange={() => toggleDisciplina(d)}
                        className="accent-brand-primary rounded"
                      />
                      {d}
                    </label>
                  ))}
                  {disciplinasDisponiveis.length === 0 && (
                    <p className="text-xs text-gray-400 py-1">Nenhuma disciplina disponível</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Student count range */}
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={0}
              value={minAlunos}
              onChange={(e) => onMinAlunosChange(e.target.value)}
              placeholder="Mín alunos"
              aria-label="Mínimo de alunos"
              className={cn(
                "w-24 px-3 py-2 border rounded-lg text-sm outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                minAlunos !== ''
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-gray-200 bg-gray-50 text-gray-600 focus:border-brand-primary focus:bg-white"
              )}
            />
            <span className="text-gray-300 text-sm">—</span>
            <input
              type="number"
              min={0}
              value={maxAlunos}
              onChange={(e) => onMaxAlunosChange(e.target.value)}
              placeholder="Máx alunos"
              aria-label="Máximo de alunos"
              className={cn(
                "w-24 px-3 py-2 border rounded-lg text-sm outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                maxAlunos !== ''
                  ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                  : "border-gray-200 bg-gray-50 text-gray-600 focus:border-brand-primary focus:bg-white"
              )}
            />
          </div>

          {/* Clear filters button */}
          {temFiltroAtivo && (
            <button
              type="button"
              onClick={() => { onLimpar(); setBuscaLocal(''); }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary bg-transparent border-none cursor-pointer px-2 hover:underline whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Active filter tags */}
        {temFiltroAtivo && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2.5 border-t border-gray-100">
            <span className="text-xs text-gray-400 font-medium mr-1">
              {qtdFiltros} filtro{qtdFiltros !== 1 ? 's' : ''} ativo{qtdFiltros !== 1 ? 's' : ''}:
            </span>
            {busca.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">
                Busca: &ldquo;{busca}&rdquo;
                <button
                  type="button"
                  onClick={() => { onBuscaChange(''); setBuscaLocal(''); }}
                  className="text-brand-primary hover:text-brand-primary/70 cursor-pointer bg-transparent border-none p-0"
                  aria-label="Remover filtro de busca"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {disciplinas.map((d) => (
              <span key={d} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {d}
                <button
                  type="button"
                  onClick={() => toggleDisciplina(d)}
                  className="text-blue-700 hover:text-blue-500 cursor-pointer bg-transparent border-none p-0"
                  aria-label={`Remover filtro ${d}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {minAlunos !== '' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Mín: {minAlunos}
                <button
                  type="button"
                  onClick={() => onMinAlunosChange('')}
                  className="text-green-700 hover:text-green-500 cursor-pointer bg-transparent border-none p-0"
                  aria-label="Remover filtro mínimo"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxAlunos !== '' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Máx: {maxAlunos}
                <button
                  type="button"
                  onClick={() => onMaxAlunosChange('')}
                  className="text-green-700 hover:text-green-500 cursor-pointer bg-transparent border-none p-0"
                  aria-label="Remover filtro máximo"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mobile filter trigger */}
      <div className="sm:hidden">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={buscaLocal}
              onChange={(e) => setBuscaLocal(e.target.value)}
              placeholder="Buscar turma..."
              aria-label="Buscar turma"
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm outline-none focus:border-brand-primary focus:bg-white transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltrosAberto(true)}
            className={cn(
              "relative inline-flex items-center justify-center w-10 h-10 border rounded-lg transition-colors cursor-pointer",
              temFiltroAtivo
                ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
            )}
            aria-label="Abrir filtros"
          >
            <Filter className="w-4 h-4" />
            {qtdFiltros > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center">
                {qtdFiltros}
              </span>
            )}
          </button>
        </div>

        {/* Active filter tags on mobile */}
        {temFiltroAtivo && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {busca.trim() && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">
                &ldquo;{busca}&rdquo;
                <button
                  type="button"
                  onClick={() => { onBuscaChange(''); setBuscaLocal(''); }}
                  className="text-brand-primary hover:text-brand-primary/70 cursor-pointer bg-transparent border-none p-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {disciplinas.map((d) => (
              <span key={d} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {d}
                <button type="button" onClick={() => toggleDisciplina(d)} className="text-blue-700 hover:text-blue-500 cursor-pointer bg-transparent border-none p-0">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {minAlunos !== '' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Mín: {minAlunos}
                <button type="button" onClick={() => onMinAlunosChange('')} className="text-green-700 hover:text-green-500 cursor-pointer bg-transparent border-none p-0">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxAlunos !== '' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Máx: {maxAlunos}
                <button type="button" onClick={() => onMaxAlunosChange('')} className="text-green-700 hover:text-green-500 cursor-pointer bg-transparent border-none p-0">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Mobile filter drawer */}
        {mobileFiltrosAberto && (
          <div className="fixed inset-0 z-50 sm:hidden">
            <div
              className="absolute inset-0 bg-[rgba(20,12,8,0.42)]"
              onClick={() => setMobileFiltrosAberto(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Filtros</h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltrosAberto(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none p-1"
                  aria-label="Fechar filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                {filtrosMobile}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
