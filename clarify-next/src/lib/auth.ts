import type { AuthResponse, RegistroDados, UsuarioLogado } from '@/types'

let cachedUsuario: UsuarioLogado | null = null
const authListeners = new Set<() => void>()

export function notificarMudancaAuth(): void {
  authListeners.forEach((l) => l())
}

export function subscreverAuth(listener: () => void): () => void {
  authListeners.add(listener)
  return () => authListeners.delete(listener)
}

export function obterSnapshotAuth(): UsuarioLogado | null {
  return cachedUsuario
}

export function setCachedUsuario(u: UsuarioLogado | null): void {
  cachedUsuario = u
  notificarMudancaAuth()
}

export async function autenticarLogin(matricula: string, senha: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matricula, senha }),
  })
  return res.json()
}

export async function registrarCoordenador(dados: RegistroDados): Promise<AuthResponse> {
  if (!dados.chaveAtivacao) {
    return { ok: false, mensagem: 'Chave de ativação é obrigatória.' }
  }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: dados.nome,
      matricula: dados.matricula,
      email: dados.email,
      senha: dados.senha,
      chaveAtivacao: dados.chaveAtivacao,
    }),
  })

  return res.json()
}

export async function usuarioExiste(matricula: string, email: string): Promise<boolean> {
  const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}&email=${encodeURIComponent(email)}`)
  const data = await res.json()
  return (data ?? []).length > 0
}

export async function acharUsuario(matricula: string): Promise<UsuarioLogado | null> {
  const res = await fetch(`/api/perfis?matricula=${encodeURIComponent(matricula)}`)
  const data = await res.json()
  const user = (data ?? [])[0]
  if (!user) return null
  return {
    id: user.id,
    nome: user.nome,
    matricula: user.matricula,
    email: user.email,
    cargo: user.cargo,
    coordenador_id: user.coordenador_id,
  }
}

export async function atribuirAluno(coordenadorId: string, alunoId: string): Promise<void> {
  await fetch(`/api/perfis/${alunoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coordenador_id: coordenadorId }),
  })
}

export async function deletarAluno(alunoId: string): Promise<void> {
  await fetch(`/api/perfis?alunoId=${alunoId}`, { method: 'DELETE' })
}

export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' })
  setCachedUsuario(null)
}

export function obterUsuarioLogado(): UsuarioLogado | null {
  return cachedUsuario
}
