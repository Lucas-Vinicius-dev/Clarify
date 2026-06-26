'use client';

import { FileText, Calendar, Tag, Hash, Mail, MessageSquareQuote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TimelineProgresso } from './TimelineProgresso';
import { obterLabelStatus, formatarData } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Demanda, StatusDemanda, UsuarioLogado } from '@/types';

const statusVariant: Record<StatusDemanda, 'pendente' | 'em_analise' | 'requer_ajuste' | 'concluido'> = {
  pendente: 'pendente',
  em_analise: 'em_analise',
  requer_ajuste: 'requer_ajuste',
  concluido: 'concluido',
};

interface ModalDetalhesDemandaProps {
  open: boolean;
  onClose: () => void;
  demanda: Demanda | null;
  remetente?: UsuarioLogado | null;
}

function diasDesde(dataISO: string): number | null {
  if (!dataISO) return null;
  const [ano, mes, dia] = dataISO.split('-').map(Number);
  const inicio = new Date(ano, mes - 1, dia);
  const hoje = new Date();
  const diffMs = hoje.setHours(0, 0, 0, 0) - inicio.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

const labelClass = "text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-[rgba(15,23,42,0.45)]";
const dotClass = "inline-block w-1.5 h-1.5 rounded-full bg-[#ca5f15] shadow-[0_0_0_3px_rgba(202,95,21,0.18)]";
const btnGhostClass = "inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] hover:text-[#0f172a] transition-[background-color,color] duration-180 cursor-pointer";
const staggerClass = "stagger-container";

export function ModalDetalhesDemanda({ open, onClose, demanda, remetente }: ModalDetalhesDemandaProps) {
  if (!demanda) return null;

  const statusLabel = obterLabelStatus(demanda.status);
  const dias = diasDesde(demanda.dataCriacao);
  const nomeRemetente = remetente?.nome || `Aluno ${demanda.alunoId.slice(0, 8)}`;
  const inicialRemetente = nomeRemetente.charAt(0).toUpperCase();
  const emailRemetente = remetente?.email || '—';

  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-xl">
        <article className="flex flex-col max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
          <DialogHeader className="border-none">
            <div className="inline-flex items-center gap-2">
              <span className={dotClass} />
              <span className={labelClass}>Solicitação · #{demanda.protocolo}</span>
            </div>
          </DialogHeader>

          <div className={cn("px-5 sm:px-7 pt-4 sm:pt-5 pb-2", staggerClass)}>
            <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight break-words [overflow-wrap:anywhere]">
                  {demanda.tipo}
                </h2>
                <p className="text-sm text-gray-500 mt-1.5">
                  Aberta em <span className="font-semibold text-gray-700">{formatarData(demanda.dataCriacao)}</span>
                  {dias !== null ? ` · há ${dias} dias` : ''}
                </p>
              </div>
              <Badge variant={statusVariant[demanda.status]} className="self-start text-[10px] uppercase tracking-widest border">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 mr-1.5" />
                {statusLabel}
              </Badge>
            </header>

            <section className="mt-6 bg-gradient-to-br from-white to-brand-surface/50 rounded-2xl border border-gray-100 px-3 sm:px-6 py-4">
              <TimelineProgresso status={demanda.status} />
            </section>

            <section className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-3.5 h-3.5 text-brand-primary" />
                <p className={labelClass}>Detalhes da solicitação</p>
              </div>
              <Card className="bg-brand-surface/50 border-brand-surface-dim/40 rounded-2xl px-5 py-4 shadow-none">
                <p className="text-[0.95rem] sm:text-base text-gray-800 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">
                  {demanda.descricao}
                </p>
              </Card>
            </section>

            <section className="mt-6">
              <p className={labelClass}>Enviado por</p>
              <div className="mt-3 flex items-center gap-3 bg-brand-surface/60 rounded-2xl px-4 py-3 border border-gray-100">
                <div className="w-11 h-11 rounded-full bg-brand-primary text-white text-base font-bold flex items-center justify-center shrink-0 shadow-soft-md">
                  {inicialRemetente}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{nomeRemetente}</p>
                  <p className="text-xs text-gray-500 truncate inline-flex items-center gap-1.5">
                    <Hash className="w-3 h-3" />
                    {remetente?.matricula || demanda.alunoId.slice(0, 8)}
                    <span className="opacity-30">·</span>
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{emailRemetente}</span>
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card className="rounded-2xl px-4 py-3 shadow-none">
                <p className={labelClass}>Criada em</p>
                <p className="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {formatarData(demanda.dataCriacao)}
                </p>
              </Card>
              <Card className="rounded-2xl px-4 py-3 shadow-none">
                <p className={labelClass}>Status</p>
                <p className="text-sm font-semibold text-gray-900 mt-1 inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  {statusLabel}
                </p>
              </Card>
            </section>

            {demanda.feedback && (
              <section className="mt-6">
                <p className={cn(labelClass, "inline-flex items-center gap-1.5")}>
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  Observação da coordenação
                </p>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-900 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap">
                  {demanda.feedback}
                </div>
              </section>
            )}
          </div>

          <DialogFooter className="justify-end border-t-0">
            <button type="button" className={btnGhostClass} onClick={onClose}>
              Fechar
            </button>
          </DialogFooter>
        </article>
      </DialogContent>
    </Dialog>
  );
}
