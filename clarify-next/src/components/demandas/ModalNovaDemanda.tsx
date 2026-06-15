'use client';

import { useState, useCallback } from 'react';
import { ArrowRight, AlertCircle, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import type { UsuarioLogado } from '@/types';

interface ModalNovaDemandaProps {
  open: boolean;
  onClose: () => void;
  usuario: UsuarioLogado | null;
  onSubmit: (dados: { tipo: string; descricao: string }) => void;
}

const LIMITE_DESCRICAO = 500;

export function ModalNovaDemanda({ open, onClose, usuario, onSubmit }: ModalNovaDemandaProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  const valido = titulo.trim().length >= 4 && descricao.trim().length >= 10;
  const contadorNear = descricao.length >= LIMITE_DESCRICAO * 0.85 && descricao.length < LIMITE_DESCRICAO;
  const contadorOver = descricao.length >= LIMITE_DESCRICAO;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (titulo.trim().length < 4 || descricao.trim().length < 10) {
      setErro('Preencha um título com pelo menos 4 caracteres e uma descrição com pelo menos 10.');
      return;
    }

    if (!usuario?.matricula) {
      setErro('Sessão expirada. Faça login novamente para enviar a solicitação.');
      return;
    }

    onSubmit({ tipo: titulo.trim(), descricao: descricao.trim() });
    setTitulo('');
    setDescricao('');
    onClose();
  }, [titulo, descricao, usuario, onSubmit, onClose]);

  const inicial = (usuario?.nome || 'V').charAt(0).toUpperCase();

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col modal-scroll">
        <div className="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6">
          <div className="inline-flex items-center gap-2">
            <span className="modal-eyebrow-dot"></span>
            <span className="modal-label">Nova solicitação</span>
          </div>
          <button type="button" className="modal-close" onClick={onClose} title="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 sm:px-7 pt-4 sm:pt-5 pb-2 modal-stagger">
          <header>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight">
              Conte para a coordenação<br/>
              <span className="text-gradient-warm">o que precisa ser resolvido.</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              Quanto mais claro o pedido, mais rápida a análise. Inclua disciplina, datas e qualquer contexto relevante.
            </p>
          </header>

          <section className="mt-5">
            <label htmlFor="campoTituloDemanda" className="modal-label">Título</label>
            <input
              id="campoTituloDemanda"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              maxLength={80}
              placeholder="Ex.: Justificativa de falta — Cálculo III"
              className="modal-input font-semibold mt-1"
            />
          </section>

          <section className="mt-5">
            <div className="flex items-end justify-between gap-3">
              <label htmlFor="campoDescricaoDemanda" className="modal-label">Descrição</label>
              <span className={`modal-counter ${contadorNear ? 'is-near' : ''} ${contadorOver ? 'is-over' : ''}`}>
                {descricao.length} / {LIMITE_DESCRICAO}
              </span>
            </div>
            <textarea
              id="campoDescricaoDemanda"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={5}
              maxLength={LIMITE_DESCRICAO}
              placeholder="Descreva a situação, os documentos anexos (se houver) e o que você espera como resolução."
              className="modal-textarea mt-2"
            />
          </section>

          <section className="mt-5 flex items-center gap-3 bg-brand-surface rounded-2xl px-3.5 py-2.5 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
              {inicial}
            </div>
            <div className="min-w-0">
              <p className="modal-label leading-none">Enviando como</p>
              <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
                {usuario?.nome || 'Aluno'} · Matrícula {usuario?.matricula || '—'}
              </p>
            </div>
          </section>

          {erro && (
            <div className="mt-4 inline-flex items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-px shrink-0" />
              <span>{erro}</span>
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
          <button type="button" className="modal-btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="modal-btn-primary" disabled={!valido}>
            Enviar solicitação
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </form>
    </Modal>
  );
}
