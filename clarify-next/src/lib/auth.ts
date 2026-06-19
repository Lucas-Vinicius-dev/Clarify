import { createClient } from '@/lib/supabase/client'
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
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .or(`matricula.eq.${matricula},email.eq.${email}`)
    .maybeSingle()
  return !!data
}

export async function acharUsuario(matricula: string): Promise<UsuarioLogado | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('matricula', matricula)
    .maybeSingle()
  if (!data) return null
  return {
    id: data.id,
    nome: data.nome,
    matricula: data.matricula,
    email: data.email,
    cargo: data.cargo,
    coordenador_id: data.coordenador_id,
  }
}

export async function atribuirAluno(coordenadorId: string, alunoId: string): Promise<void> {
  const supabase = createClient()
  await supabase
    .from('profiles')
    .update({ coordenador_id: coordenadorId })
    .eq('id', alunoId)
}

export async function deletarAluno(alunoId: string): Promise<void> {
  await fetch(`/api/profiles?alunoId=${alunoId}`, { method: 'DELETE' })
}

export async function logout(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  setCachedUsuario(null)
}

export function obterUsuarioLogado(): UsuarioLogado | null {
  return cachedUsuario
}
