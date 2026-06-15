import { AlertCircle, Plus } from 'lucide-react';

interface ViewAdicionarAlunoProps {
  erro: string;
  sucesso: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/** View "Adicionar Aluno" do dashboard do coordenador: formulário de vínculo. */
export function ViewAdicionarAluno({ erro, sucesso, onSubmit }: ViewAdicionarAlunoProps) {
  return (
    <section className="max-w-xl">
      {sucesso && (
        <div className="mb-6 inline-flex items-start gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <span>{sucesso}</span>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-soft-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-7 pt-5 sm:pt-6">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="modal-eyebrow-dot"></span>
            <span className="modal-label">Vincular aluno</span>
          </div>
          <header>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter-2 leading-tight">
              Cadastre um novo aluno<br/>
              <span className="text-gradient-warm">para vinculá-lo à sua coordenação.</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              Preencha os dados abaixo. O aluno receberá as credenciais para acessar o sistema.
            </p>
          </header>
        </div>

        {/* Form */}
        <form id="formAdicionarAluno" onSubmit={onSubmit} className="px-6 sm:px-7 pt-5 pb-2 space-y-6">
          <section>
            <label htmlFor="nome" className="modal-label">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="modal-input font-semibold mt-1"
              placeholder="Nome completo do aluno"
            />
          </section>

          <section>
            <label htmlFor="matricula" className="modal-label">Matrícula</label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              className="modal-input font-semibold mt-1"
              placeholder="Número de matrícula"
            />
          </section>

          <section>
            <label htmlFor="email" className="modal-label">Email Institucional</label>
            <input
              type="email"
              id="email"
              name="email"
              className="modal-input font-semibold mt-1"
              placeholder="email@instituto.edu"
            />
          </section>

          <section>
            <label htmlFor="senha" className="modal-label">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="modal-input font-semibold mt-1"
              placeholder="Senha de acesso"
            />
          </section>

          {erro && (
            <div className="inline-flex items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-px shrink-0" />
              <span>{erro}</span>
            </div>
          )}
        </form>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 px-6 sm:px-7 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40">
          <button type="submit" form="formAdicionarAluno" className="modal-btn-primary">
            <Plus className="w-4 h-4" />
            Cadastrar Aluno
          </button>
        </footer>
      </div>
    </section>
  );
}
