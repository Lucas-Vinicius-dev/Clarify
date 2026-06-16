'use client';

// ═════════════════════════════════════════════════════════════════
// HOOK: useDemandas
// Gerencia demandas do sistema com estado reativo
// ═════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react';
import type { Demanda, StatusDemanda, TipoDemanda } from '@/types';
import {
  criarDemanda as criar_,
  buscarDemandaPorProtocolo,
  buscarDemandasPorAluno,
  buscarDemandasPorStatus,
  buscarDemandasAlunoComStatus,
  buscarTodasDemandas,
  atualizarStatusDemanda,
} from '@/lib/demandas';
import { popularLocalStorage } from '@/lib/localStorage';

export interface UseDemandAsOptions {
  matriculaAluno?: string;
  status?: StatusDemanda;
}

export interface UseDemandAsReturn {
  demandas: Demanda[];
  criar: (dados: {
    matriculaAluno: string;
    tipo: TipoDemanda;
    descricao: string;
  }) => Demanda;
  buscarPorProtocolo: (protocolo: string) => Demanda | undefined;
  atualizarStatus: (
    protocolo: string,
    novoStatus: StatusDemanda,
    feedback?: string
  ) => Demanda | undefined;
  recarregar: () => void;
  filtrar: (filtros: Partial<UseDemandAsOptions>) => Demanda[];
}

function obterDemandasIniciais(opcoes?: UseDemandAsOptions): Demanda[] {
  if (typeof window === 'undefined') return [];

  popularLocalStorage();

  if (opcoes?.matriculaAluno && opcoes?.status) {
    return buscarDemandasAlunoComStatus(opcoes.matriculaAluno, opcoes.status);
  }

  if (opcoes?.matriculaAluno) {
    return buscarDemandasPorAluno(opcoes.matriculaAluno);
  }

  if (opcoes?.status) {
    return buscarDemandasPorStatus(opcoes.status);
  }

  return buscarTodasDemandas();
}

/**
 * Hook para gerenciar demandas
 */
export function useDemandas(opcoes?: UseDemandAsOptions): UseDemandAsReturn {
  const [demandas, setDemandas] = useState<Demanda[]>(() => obterDemandasIniciais(opcoes));

  const recarregar = useCallback(() => {
    setDemandas(obterDemandasIniciais(opcoes));
  }, [opcoes]);

  const criar = useCallback(
    (dados: { matriculaAluno: string; tipo: TipoDemanda; descricao: string }) => {
      const novaDemanda = criar_(dados);
      setDemandas((prev) => [novaDemanda, ...prev]);
      return novaDemanda;
    },
    []
  );

  const buscarProtocolo = useCallback((protocolo: string) => {
    return buscarDemandaPorProtocolo(protocolo);
  }, []);

  const atualizarStatus = useCallback(
    (
      protocolo: string,
      novoStatus: StatusDemanda,
      feedback?: string
    ) => {
      const atualizada = atualizarStatusDemanda(protocolo, novoStatus, feedback);
      if (atualizada) {
        setDemandas((prev) =>
          prev.map((d) =>
            d.protocolo === protocolo ? atualizada : d
          )
        );
      }
      return atualizada;
    },
    []
  );

  const filtrar = useCallback(
    (filtros: Partial<UseDemandAsOptions>) => {
      let resultado = demandas;

      if (filtros.matriculaAluno) {
        resultado = resultado.filter(
          (d) =>
            String(d.matriculaAluno) === String(filtros.matriculaAluno)
        );
      }

      if (filtros.status) {
        resultado = resultado.filter((d) => d.status === filtros.status);
      }

      return resultado;
    },
    [demandas]
  );

  return {
    demandas,
    criar,
    buscarPorProtocolo: buscarProtocolo,
    atualizarStatus,
    recarregar,
    filtrar,
  };
}
