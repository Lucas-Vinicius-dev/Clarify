'use client';

import { Trash2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/Dialog';

interface ModalConfirmarExclusaoProps {
  open: boolean;
  onClose: () => void;
  onConfirmar: () => void;
  nomeTurma: string;
}

export function ModalConfirmarExclusao({ open, onClose, onConfirmar, nomeTurma }: ModalConfirmarExclusaoProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-none">
          <div />
        </DialogHeader>

        <div className="px-5 sm:px-7 pb-6 sm:pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Excluir turma</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">Esta ação não pode ser desfeita</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-slate-300">
            Tem certeza que deseja excluir a turma <span className="font-semibold text-gray-900 dark:text-slate-100">{nomeTurma}</span>?
            Todos os alunos vinculados serão removidos da turma.
          </p>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 bg-transparent text-[rgba(15,23,42,0.65)] dark:text-slate-300 font-semibold text-sm py-3 px-4 rounded-xl hover:bg-[rgba(15,23,42,0.05)] dark:hover:bg-slate-700 hover:text-[#0f172a] dark:hover:text-slate-100 transition-[background-color,color] duration-180 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-sm py-3 px-5 rounded-xl hover:bg-red-700 transition-[background-color] duration-180 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Confirmar exclusão
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
