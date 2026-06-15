import type { Cargo, Demanda, StatusDemanda, Usuario } from '@/types';

function toStringValue(value: unknown): string {
  return String(value ?? '').trim();
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.flatMap((value) => {
    const normalizado = toStringValue(value);
    return normalizado ? [normalizado] : [];
  }))];
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const normalizado = toStringValue(item);
    return normalizado ? [normalizado] : [];
  });
}

function normalizarStatusLegado(status: unknown): StatusDemanda {
  const valor = toStringValue(status).toLowerCase();

  if (valor === 'aprovada') return 'concluido';
  if (valor === 'negada') return 'requer_ajuste';
  if (valor === 'em_analise') return 'em_analise';
  if (valor === 'requer_ajuste') return 'requer_ajuste';
  if (valor === 'concluido') return 'concluido';

  return 'pendente';
}

function normalizarUsuarioStorage(raw: unknown): Usuario | null {
  if (!raw || typeof raw !== 'object') return null;

  const source = raw as Record<string, unknown>;
  const cargo = source.cargo === 'coordenador' ? 'coordenador' : ('aluno' as Cargo);
  const matricula = toStringValue(source.matricula);

  if (!matricula) return null;

  const usuario: Usuario = {
    nome: toStringValue(source.nome),
    matricula,
    email: toStringValue(source.email),
    senha: toStringValue(source.senha),
    cargo,
  };

  if (cargo === 'coordenador') {
    const vinculos = uniqueStrings([
      ...toStringArray(source.alunosCadastrados),
      ...toStringArray(source.usuariosCadastrados),
    ]);

    usuario.alunosCadastrados = vinculos;
    usuario.usuariosCadastrados = vinculos;
  }

  const coordenador = toStringValue(source.coordenador);
  if (cargo === 'aluno' && coordenador) {
    usuario.coordenador = coordenador;
  }

  return usuario;
}

export function normalizarUsuariosStorage(raw: unknown): Usuario[] {
  if (!Array.isArray(raw)) return [];

  return raw.map(normalizarUsuarioStorage).filter((usuario): usuario is Usuario => Boolean(usuario));
}

function normalizarDemandaStorage(raw: unknown): Demanda | null {
  if (!raw || typeof raw !== 'object') return null;

  const source = raw as Record<string, unknown>;
  const protocolo = toStringValue(source.protocolo);

  if (!protocolo) return null;

  return {
    protocolo,
    matriculaAluno: toStringValue(source.matriculaAluno),
    tipo: toStringValue(source.tipo) as Demanda['tipo'],
    descricao: toStringValue(source.descricao),
    status: normalizarStatusLegado(source.status),
    dataCriacao: toStringValue(source.dataCriacao),
    dataAtualizacao: toStringValue(source.dataAtualizacao),
    feedback: toStringValue(source.feedback),
  };
}

export function normalizarDemandasStorage(raw: unknown): Demanda[] {
  if (!Array.isArray(raw)) return [];

  return raw.map(normalizarDemandaStorage).filter((demanda): demanda is Demanda => Boolean(demanda));
}