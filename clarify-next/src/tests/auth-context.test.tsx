import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '@/context/AuthContext'

const mockGetSession = vi.fn()
const mockOnAuthStateChange = vi.fn()
const mockSignOut = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signOut: mockSignOut,
    },
  }),
}))

function TestComponent() {
  const { usuario, isAuthenticated, loading, login, logout } = useAuth()

  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="authenticated">{String(isAuthenticated)}</div>
      <div data-testid="user-name">{usuario ? usuario.nome : 'null'}</div>
      <div data-testid="user-cargo">{usuario ? usuario.cargo : 'null'}</div>
      <button data-testid="login-btn" onClick={() => login('123456', 'senha123')}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )
}

const mockUsuarioLogado = {
  id: 'user-1',
  nome: 'João Teste',
  matricula: '123456',
  email: 'joao@teste.com',
  cargo: 'aluno' as const,
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    mockGetSession.mockResolvedValue({ data: { session: null } })
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })
    mockSignOut.mockResolvedValue({})

    document.cookie = ''
  })

  it('starts with loading true', () => {
    renderWithProvider()
    expect(screen.getByTestId('loading')).toHaveTextContent('true')
  })

  it('sets loading to false when no session exists', async () => {
    renderWithProvider()
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    expect(screen.getByTestId('user-name')).toHaveTextContent('null')
  })

  it('logs in successfully and updates user state', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        usuarioLogado: mockUsuarioLogado,
      }),
    } as Response)

    mockGetSession.mockResolvedValue({ data: { session: null } })

    renderWithProvider()

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    await userEvent.click(screen.getByTestId('login-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
      expect(screen.getByTestId('user-name')).toHaveTextContent('João Teste')
      expect(screen.getByTestId('user-cargo')).toHaveTextContent('aluno')
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula: '123456', senha: 'senha123' }),
    })

    fetchMock.mockRestore()
  })

  it('handles login failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: false,
        mensagem: 'Credenciais inválidas.',
      }),
    } as Response)

    mockGetSession.mockResolvedValue({ data: { session: null } })

    renderWithProvider()

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    await userEvent.click(screen.getByTestId('login-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })
  })

  it('logs out and clears user state', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        usuarioLogado: mockUsuarioLogado,
      }),
    } as Response)

    mockGetSession.mockResolvedValue({ data: { session: null } })

    renderWithProvider()

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    await userEvent.click(screen.getByTestId('login-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })

    await userEvent.click(screen.getByTestId('logout-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
      expect(screen.getByTestId('user-name')).toHaveTextContent('null')
    })

    expect(mockSignOut).toHaveBeenCalled()

    fetchMock.mockRestore()
  })

  it('throws error when useAuth is used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow(
      'useAuth deve ser usado dentro de um AuthProvider'
    )
    consoleSpy.mockRestore()
  })
})
