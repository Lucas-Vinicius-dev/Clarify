'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, AlertCircle } from 'lucide-react';
import { adicionarAlunoSchema, type AdicionarAlunoFormData } from '@/schemas/usuarios';

interface FormAdicionarAlunoProps {
  coordenadorId: string | undefined;
  onCadastrado: () => Promise<void>;
  existe: (matricula: string, email: string) => Promise<boolean>;
}

export function FormAdicionarAluno({ coordenadorId, onCadastrado, existe }: FormAdicionarAlunoProps) {
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdicionarAlunoFormData>({
    resolver: zodResolver(adicionarAlunoSchema),
    mode: 'onBlur',
  });

  const onValid = useCallback(async (data: AdicionarAlunoFormData) => {
    setErro('');
    setSucesso('');

    const jaExiste = await existe(data.matricula, data.email);
    if (jaExiste) {
      setErro('Matrícula ou email já cadastrados.');
      return;
    }

    const res = await fetch('/api/perfis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: data.nome,
        matricula: data.matricula,
        email: data.email,
        senha: data.senha,
        coordenadorId,
      }),
    });

    const json = await res.json();

    if (json.ok) {
      await onCadastrado();
      setSucesso('Aluno cadastrado com sucesso!');
      reset();
    } else {
      setErro(json.mensagem || 'Erro ao cadastrar aluno.');
    }
  }, [coordenadorId, existe, onCadastrado, reset]);

  return (
    <section className="max-w-xl">
      {sucesso && (
        <div className="mb-6 inline-flex items-start gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <span>{sucesso}</span>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-soft-xl overflow-hidden">
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

        <form onSubmit={handleSubmit(onValid)} className="px-6 sm:px-7 pt-5 pb-2 space-y-6">
          <section>
            <label htmlFor="nome" className="modal-label">Nome Completo</label>
            <input
              type="text"
              id="nome"
              {...register('nome')}
              className="modal-input font-semibold mt-1"
              placeholder="Nome completo do aluno"
              autoFocus
            />
            {errors.nome && (
              <p className="text-xs text-red-600 mt-1">{errors.nome.message}</p>
            )}
          </section>

          <section>
            <label htmlFor="matricula" className="modal-label">Matrícula</label>
            <input
              type="text"
              id="matricula"
              {...register('matricula')}
              className="modal-input font-semibold mt-1"
              placeholder="Número de matrícula"
            />
            {errors.matricula && (
              <p className="text-xs text-red-600 mt-1">{errors.matricula.message}</p>
            )}
          </section>

          <section>
            <label htmlFor="email" className="modal-label">Email Institucional</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="modal-input font-semibold mt-1"
              placeholder="email@instituto.edu"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </section>

          <section>
            <label htmlFor="senha" className="modal-label">Senha</label>
            <input
              type="password"
              id="senha"
              {...register('senha')}
              className="modal-input font-semibold mt-1"
              placeholder="Senha de acesso"
            />
            {errors.senha && (
              <p className="text-xs text-red-600 mt-1">{errors.senha.message}</p>
            )}
          </section>

          {erro && (
            <div className="inline-flex items-start gap-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-px shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          <footer className="flex items-center justify-end gap-3 py-4 mt-3 border-t border-gray-100 bg-gradient-to-b from-white to-brand-surface/40 -mx-6 sm:-mx-7 px-6 sm:px-7">
            <button type="submit" disabled={isSubmitting} className="modal-btn-primary">
              <Plus className="w-4 h-4" />
              Cadastrar Aluno
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
}