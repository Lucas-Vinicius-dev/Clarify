# Clarify — Plano de Migração: Vite Vanilla JS → Next.js + React + TypeScript

> **Destinatário:** Agente de desenvolvimento  
> **Objetivo:** Transpor o projeto Clarify de Vite Vanilla JS para Next.js com React e TypeScript, mantendo fidelidade visual e comportamental, adotando boas práticas modernas.

---

## 1. Diagnóstico do projeto atual

### 1.1 Estrutura de arquivos (Vite Vanilla)

```
Clarify/src/
├── components/
│   ├── assets/
│   │   ├── GATOGORDO.png
│   │   ├── favicon.ico
│   │   └── icons.js           ← registro central de ícones lucide
│   └── structures/
│       ├── modais.js          ← lógica + HTML de modais via innerHTML
│       ├── sidebar.js         ← retorna string HTML da sidebar
│       └── topbar.js          ← chip de usuário (string HTML)
├── data/
│   ├── demanda.js             ← mock estático de demandas
│   └── usuarios.js            ← mock estático de usuários
├── lib/
│   ├── funcoesAuxiliares.js   ← auth, localStorage, formatação, crud de demandas
│   └── navegacaoURL.js        ← roteador manual via window.history
├── pages/
│   ├── centralDemandas.js     ← view do aluno (innerHTML + listeners)
│   ├── dashboardcoord.js      ← view do coordenador (innerHTML + listeners)
│   ├── landing.js             ← landing page (innerHTML + listeners)
│   ├── login.js               ← formulário de login (innerHTML + listeners)
│   └── registro.js            ← formulário de registro (innerHTML + listeners)
├── services/
│   └── turmas.js              ← CRUD de turmas no localStorage + modal de criação
├── main.js                    ← entry point: inicializa localStorage e roteador
└── style.css                  ← Tailwind v4 + custom CSS (animações, tokens, modais)
```

### 1.2 Padrão arquitetural atual

| Aspecto | Implementação atual |
|---|---|
| Roteamento | Manual via `window.history.pushState` + `switch/case` em `navegacaoURL.js` |
| Renderização | `document.querySelector('#app').innerHTML = \`...\`` em cada "página" |
| Estado | `localStorage` (auth, usuários, demandas, turmas, chaves de ativação) |
| Componentes | Funções que retornam strings HTML (`renderSidebarCoord`, `renderChipUsuario`) |
| Eventos | Listeners adicionados manualmente via `addEventListener` após cada render |
| Ícones | `lucide` lib (vanilla) com `createIcons()` chamado após cada render |
| Estilos | Tailwind CSS v4 via Vite plugin + CSS customizado em `style.css` |
| Proteção de rotas | Lógica inline em `navegacaoURL.js` verificando `localStorage.getItem('auth')` |

### 1.3 Páginas e fluxo de navegação

```
/              → Landing page (pública)
/login         → Login (público; redireciona autenticado)
/registro      → Registro de coordenador por chave de ativação (público)
/centraldemandas → Dashboard do aluno (privado: cargo === 'aluno')
/dashboardcoord  → Dashboard do coordenador (privado: cargo === 'coordenador')
/dashboardaluno  → Alias não totalmente implementado; redireciona para /centraldemandas
```

### 1.4 Tipos de dados (inferidos do código)

```ts
// Usuário
type Cargo = 'aluno' | 'coordenador';

interface Usuario {
  nome: string;
  matricula: string;
  email: string;
  senha: string;
  cargo: Cargo;
  usuariosCadastrados?: string[]; // matrículas vinculadas ao coordenador
}

// Status de demanda
type StatusDemanda = 'pendente' | 'em_analise' | 'requer_ajuste' | 'concluido';

interface Demanda {
  protocolo: string;         // ex: "REQ-402"
  matriculaAluno: string;
  tipo: string;
  descricao: string;
  status: StatusDemanda;
  dataCriacao: string;       // ISO: "2025-11-12"
  dataAtualizacao: string;
  feedback: string;
}

// Turma
interface Turma {
  id: string;                // "turma_<timestamp>_<random>"
  nome: string;
  disciplina: string;
  alunos: string[];          // matrículas
  coordenador: string;       // matrícula do coord
  criadaEm: string;          // ISO datetime
}

// Chave de ativação
interface ChaveAtivacao {
  code: string;
  used: boolean;
}

// Sessão
interface UsuarioLogado extends Omit<Usuario, 'senha'> {}
```

### 1.5 Componentes catalogados (`docs/brainstorm/catalog.html`)

O catálogo documenta 18 componentes visuais que **devem ser replicados fielmente**:

| ID no catálogo | Componente destino |
|---|---|
| `#sidebar-coord` | `Sidebar` (coord) |
| `#sidebar-alunos` | `Sidebar` (aluno — variante) |
| `#chip-usuario` | `UserChip` |
| `#topbar-mobile` | `TopbarMobile` |
| `#topbar-desktop` | `TopbarDesktop` |
| `#drawer-mobile` | `DrawerMobile` |
| `#modal-nova` | `ModalNovaDemanda` |
| `#modal-detalhes` | `ModalDetalhesDemanda` |
| `#timeline` | `TimelineProgresso` |
| `#card-demanda` | `CardDemanda` |
| `#card-nova` | `CardNovaDemanda` |
| `#metricas` | `CardMetrica` |
| `#barra-filtros` | `BarraFiltros` |
| `#linha-historico` | `LinhaHistorico` |
| `#estado-vazio` | `EstadoVazio` |
| `#fab` | `FabMobile` |

> **Referência obrigatória:** Ao implementar cada componente acima, consultar o HTML correspondente em `docs/brainstorm/catalog.html` para reproduzir fielmente classes Tailwind, estrutura DOM, variantes de estado e tokens de cor.

---

## 2. Hierarquia de pastas proposta (Next.js)

```
clarify-next/
├── public/
│   ├── GATOGORDO.png
│   └── favicon.ico
│
├── src/
│   ├── app/                          ← App Router do Next.js
│   │   ├── layout.tsx                ← RootLayout: fonte, metadata global
│   │   ├── page.tsx                  ← Landing page (rota /)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── registro/
│   │   │   └── page.tsx
│   │   ├── (dashboard)/              ← Route group: layout compartilhado (sidebar + topbar)
│   │   │   ├── layout.tsx            ← Layout com auth guard + sidebar
│   │   │   ├── centraldemandas/
│   │   │   │   └── page.tsx          ← Protegida: cargo === 'aluno'
│   │   │   └── dashboardcoord/
│   │   │       └── page.tsx          ← Protegida: cargo === 'coordenador'
│   │   └── not-found.tsx             ← Fallback 404 → redireciona para /
│   │
│   ├── components/
│   │   ├── ui/                       ← Componentes genéricos reutilizáveis
│   │   │   ├── Badge.tsx             ← Badge de status (pendente, em_analise, etc.)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx             ← Wrapper de modal (backdrop, ESC, scroll lock)
│   │   │   └── EstadoVazio.tsx
│   │   │
│   │   ├── layout/                   ← Estruturas de layout
│   │   │   ├── Sidebar.tsx           ← Sidebar coord + variante aluno
│   │   │   ├── TopbarDesktop.tsx
│   │   │   ├── TopbarMobile.tsx
│   │   │   ├── DrawerMobile.tsx
│   │   │   └── UserChip.tsx
│   │   │
│   │   ├── demandas/                 ← Componentes do domínio de demandas
│   │   │   ├── CardDemanda.tsx
│   │   │   ├── CardNovaDemanda.tsx
│   │   │   ├── CardHistorico.tsx
│   │   │   ├── LinhaHistorico.tsx
│   │   │   ├── BarraFiltros.tsx
│   │   │   ├── TimelineProgresso.tsx
│   │   │   ├── ModalNovaDemanda.tsx
│   │   │   └── ModalDetalhesDemanda.tsx
│   │   │
│   │   ├── coord/                    ← Componentes exclusivos do coordenador
│   │   │   ├── CardMetrica.tsx
│   │   │   ├── CardAluno.tsx
│   │   │   ├── CardTurma.tsx
│   │   │   ├── ModalCriarTurma.tsx
│   │   │   └── ModalFeedback.tsx
│   │   │
│   │   └── landing/                  ← Componentes da landing page
│   │       ├── LandingNav.tsx
│   │       ├── HeroSection.tsx
│   │       ├── ComoFunciona.tsx
│   │       ├── PerfilCards.tsx
│   │       └── LandingFooter.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx           ← Provider de autenticação + hook useAuth
│   │
│   ├── hooks/
│   │   ├── useDemandas.ts            ← CRUD de demandas no localStorage
│   │   ├── useUsuarios.ts            ← CRUD de usuários no localStorage
│   │   └── useTurmas.ts              ← CRUD de turmas no localStorage
│   │
│   ├── lib/
│   │   ├── auth.ts                   ← autenticarLogin, buscarUsuarioCadastrado, chaveValida
│   │   ├── demandas.ts               ← gerarProtocolo, criarDemanda, buscarDemandas, formatarData
│   │   ├── localStorage.ts           ← seed de dados (popularLocalStorage, createKeys)
│   │   └── utils.ts                  ← limparFormulario → helpers genéricos (cn, formatarData)
│   │
│   ├── types/
│   │   └── index.ts                  ← Todas as interfaces TypeScript (ver seção 1.4)
│   │
│   └── styles/
│       └── globals.css               ← @import tailwindcss + CSS customizado migrado de style.css
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Dependências

### 3.1 `package.json` base

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^22.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "postcss": "^8.x"
  }
}
```

> **Atenção:** O projeto atual usa `lucide` (vanilla). No Next.js usar `lucide-react`, que exporta cada ícone como componente React. Substituir `<i data-lucide="...">` + `createIcons()` por `<NomeDoIcone className="w-4 h-4" />`.

### 3.2 Configuração Tailwind CSS v4 (Next.js)

```css
/* src/styles/globals.css */
@import "tailwindcss";
/* mover todo o conteúdo de style.css para cá */
```

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ca5f15',
          surface: '#fff8f6',
          'surface-dim': '#ead6cd',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
} satisfies Config
```

---

## 4. Mapeamento de migração por arquivo

### 4.1 `src/lib/navegacaoURL.js` → **App Router do Next.js**

O roteador manual é completamente substituído pelo sistema de arquivos do Next.js.

| Rota atual | Arquivo Next.js |
|---|---|
| `/` | `src/app/page.tsx` |
| `/login` | `src/app/login/page.tsx` |
| `/registro` | `src/app/registro/page.tsx` |
| `/centraldemandas` | `src/app/(dashboard)/centraldemandas/page.tsx` |
| `/dashboardcoord` | `src/app/(dashboard)/dashboardcoord/page.tsx` |

Substituir todas as chamadas de `adicionarCaminhoURL(nome)` e `navigateURL(url)` por:

```tsx
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/login')
```

Para links simples, usar `<Link href="/login">` do `next/link`.

---

### 4.2 `src/lib/funcoesAuxiliares.js` → `src/lib/auth.ts` + `src/lib/demandas.ts` + `src/lib/localStorage.ts` + `src/lib/utils.ts`

Separar por responsabilidade:

| Função original | Destino |
|---|---|
| `autenticarLogin` | `src/lib/auth.ts` |
| `buscarUsuarioCadastrado` | `src/lib/auth.ts` |
| `UsuarioExiste` | `src/lib/auth.ts` |
| `chaveValida` | `src/lib/auth.ts` |
| `createKeys` | `src/lib/localStorage.ts` |
| `popularLocalStorage` | `src/lib/localStorage.ts` |
| `popularDemandas` | `src/lib/localStorage.ts` |
| `adicionarUsuario` | `src/lib/auth.ts` ou `useUsuarios` hook |
| `acharUsuario` | `src/lib/auth.ts` |
| `atribuirAluno` | `src/lib/auth.ts` |
| `criarDemanda` | `src/lib/demandas.ts` |
| `buscarDemandasPorAluno` | `src/lib/demandas.ts` |
| `buscarDemandaPorProtocolo` | `src/lib/demandas.ts` |
| `gerarProximoProtocolo` | `src/lib/demandas.ts` |
| `formatarData` | `src/lib/utils.ts` |
| `limparFormulario` | **Não migrar** — desnecessário com React controlled inputs |
| `exibirMensagemErro` | **Não migrar** — substituir por estado de erro no componente |
| `adicionarCaminhoURL` | **Não migrar** — substituir por `router.push` |

---

### 4.3 `src/pages/landing.js` → `src/app/page.tsx` + `src/components/landing/`

A landing é uma página pública de alto valor visual. Dividir em seções:

```
src/app/page.tsx                ← compõe as seções abaixo
src/components/landing/
  LandingNav.tsx               ← nav sticky com scroll-glass effect
  HeroSection.tsx              ← hero com preview do sistema
  DemandTypes.tsx              ← faixa de tipos de demanda
  ComoFunciona.tsx             ← seção dos 3 passos
  PerfilCards.tsx              ← cards Aluno / Coordenador / Professor
  AccessSection.tsx            ← CTA de acesso
  LandingFooter.tsx            ← footer
```

**Ponto de atenção — efeito scroll na nav:**

```tsx
// LandingNav.tsx
'use client'
import { useEffect, useState } from 'react'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav className={`sticky top-0 z-30 border-b transition-all duration-300 ${scrolled ? 'is-scrolled' : 'border-transparent'}`}>
      ...
    </nav>
  )
}
```

**Ponto de atenção — Intersection Observer (data-reveal):**

```tsx
// useReveal.ts hook
'use client'
import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-revealed'); io.disconnect() } },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
```

---

### 4.4 `src/pages/login.js` → `src/app/login/page.tsx`

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const resultado = login(
      data.get('institutionalId') as string,
      data.get('securityKey') as string
    )
    if (resultado.ok) {
      router.push(resultado.usuario.cargo === 'aluno' ? '/centraldemandas' : '/dashboardcoord')
    } else {
      setError(resultado.mensagem)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden animate-cubes">
      {/* fundo geométrico: replicar os gradientes de login.js inline style */}
      <form onSubmit={handleSubmit} id="loginForm" className="...">
        {/* ... campos iguais ao original */}
        {error && <p className="text-red-700 text-[10px] font-bold uppercase tracking-widest">{error}</p>}
      </form>
    </div>
  )
}
```

---

### 4.5 `src/pages/registro.js` → `src/app/registro/page.tsx`

Mesma lógica de `login.tsx`. Chamar `adicionarUsuario` e `chaveValida` das libs migradas. Após registro bem-sucedido: `router.push('/dashboardcoord')`.

---

### 4.6 `src/pages/centralDemandas.js` → `src/app/(dashboard)/centraldemandas/page.tsx`

```tsx
// page.tsx — compõe os componentes abaixo
'use client'
import { useState } from 'react'
import { BarraFiltros } from '@/components/demandas/BarraFiltros'
import { CardDemanda } from '@/components/demandas/CardDemanda'
import { CardNovaDemanda } from '@/components/demandas/CardNovaDemanda'
import { ModalNovaDemanda } from '@/components/demandas/ModalNovaDemanda'
import { ModalDetalhesDemanda } from '@/components/demandas/ModalDetalhesDemanda'
import { useDemandas } from '@/hooks/useDemandas'
import { useAuth } from '@/context/AuthContext'
```

Os filtros de `busca` e `status` que eram variáveis de módulo (`const filtros = { busca: '', status: 'todos' }`) viram `useState`.

A função `aplicarFiltros` vira uma função pura (ou `useMemo`).

---

### 4.7 `src/pages/dashboardcoord.js` → `src/app/(dashboard)/dashboardcoord/page.tsx`

Views do coordenador (Alunos, Demandas, Turmas, Início) que eram controladas por `data-view` e manipulação de display viram **tabs com `useState<'nome' | 'alunos' | 'adicionar' | 'demandas' | 'turmas'>`**.

```tsx
'use client'
import { useState } from 'react'
type DashView = 'nome' | 'alunos' | 'adicionar' | 'demandas' | 'turmas'

export default function DashboardCoordPage() {
  const [view, setView] = useState<DashView>('nome')
  return (
    <div className="flex h-screen">
      <Sidebar currentView={view} onNavigate={setView} />
      <main>
        {view === 'nome' && <ViewInicio />}
        {view === 'alunos' && <ViewAlunos />}
        {/* ... */}
      </main>
    </div>
  )
}
```

---

### 4.8 `src/components/structures/modais.js` → `src/components/demandas/ModalNovaDemanda.tsx` + `ModalDetalhesDemanda.tsx`

O padrão de `montarModal` (backdrop + ESC + scroll lock) vira o componente `Modal.tsx` base:

```tsx
// src/components/ui/Modal.tsx
'use client'
import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  maxWidth?: string
  children: React.ReactNode
}

export function Modal({ open, onClose, maxWidth = 'max-w-lg', children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    document.body.classList.add('modal-open')
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => {
      document.body.classList.remove('modal-open')
      document.removeEventListener('keydown', esc)
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={`modal-panel relative w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden`}>
        {children}
      </div>
    </div>
  )
}
```

---

### 4.9 `src/components/structures/sidebar.js` → `src/components/layout/Sidebar.tsx`

A sidebar retorna JSX em vez de string. O `data-view` vira prop + callback:

```tsx
interface SidebarProps {
  currentView: string
  onNavigate: (view: string) => void
}
```

---

### 4.10 `src/services/turmas.js` → `src/hooks/useTurmas.ts` + `src/components/coord/ModalCriarTurma.tsx`

O estado de `alunosAdicionados` que era array de módulo vira `useState<string[]>([])` dentro de `ModalCriarTurma`.

---

### 4.11 `src/components/assets/icons.js` → **Não migrar**

Substituir `createIcons({ icons: iconesUsados })` por imports diretos do `lucide-react`:

```tsx
// Antes (vanilla)
<i data-lucide="plus" class="w-4 h-4"></i>

// Depois (React)
import { Plus } from 'lucide-react'
<Plus className="w-4 h-4" />
```

---

## 5. Contexto de autenticação

O `AuthContext` centraliza o que hoje está espalhado em `funcoesAuxiliares.js` + `localStorage` direto:

```tsx
// src/context/AuthContext.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { UsuarioLogado } from '@/types'
import { autenticarLogin, adicionarUsuario } from '@/lib/auth'

interface AuthContextValue {
  usuario: UsuarioLogado | null
  isAuthenticated: boolean
  login: (matricula: string, senha: string) => { ok: boolean; mensagem?: string; usuario?: UsuarioLogado }
  logout: () => void
  registro: (dados: RegistroDados) => { ok: boolean; mensagem?: string }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null)

  useEffect(() => {
    // hidratação inicial
    const raw = localStorage.getItem('usuarioLogado')
    const auth = localStorage.getItem('auth')
    if (raw && auth === 'true') setUsuario(JSON.parse(raw))
  }, [])

  function login(matricula: string, senha: string) {
    const resultado = autenticarLogin(matricula, senha)
    if (resultado.ok && resultado.usuarioLogado) {
      setUsuario(resultado.usuarioLogado)
      return { ok: true, usuario: resultado.usuarioLogado }
    }
    return { ok: false, mensagem: resultado.mensagem }
  }

  function logout() {
    localStorage.removeItem('usuarioLogado')
    localStorage.removeItem('auth')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated: !!usuario, login, logout, registro: () => ({ ok: true }) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
```

---

## 6. Proteção de rotas

Com Next.js App Router, implementar guard no `layout.tsx` do grupo `(dashboard)`:

```tsx
// src/app/(dashboard)/layout.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, usuario } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar cargo={usuario!.cargo} />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
```

Para proteção de cargo específico, adicionar verificação no `page.tsx` de cada rota:

```tsx
// src/app/(dashboard)/centraldemandas/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function CentralDemandasPage() {
  const { usuario } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (usuario && usuario.cargo !== 'aluno') router.replace('/dashboardcoord')
  }, [usuario, router])

  if (!usuario || usuario.cargo !== 'aluno') return null
  return <>{/* conteúdo */}</>
}
```

---

## 7. Seed de dados (localStorage)

O `popularLocalStorage` do `main.js` deve ser chamado no `RootLayout` (client side) **uma única vez** via `useEffect`:

```tsx
// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext'
import { Initializer } from '@/components/Initializer'
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-brand-surface font-sans">
        <AuthProvider>
          <Initializer />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

```tsx
// src/components/Initializer.tsx
'use client'
import { useEffect } from 'react'
import { popularLocalStorage } from '@/lib/localStorage'

export function Initializer() {
  useEffect(() => {
    popularLocalStorage()
  }, [])
  return null
}
```

---

## 8. CSS e tokens de design

### 8.1 Migração do `style.css`

Copiar **integralmente** o conteúdo de `src/style.css` para `src/styles/globals.css`, precedido de `@import "tailwindcss"`. Nenhuma regra customizada precisa ser reescrita.

### 8.2 Tokens de cor (Tailwind config)

Os tokens `brand-primary`, `brand-surface`, `brand-surface-dim` já estão configurados em `tailwind.config.js` e devem ser replicados em `tailwind.config.ts`.

### 8.3 Fonte

Substituir o `<link>` do Google Fonts no `index.html` pelo `next/font`:

```tsx
// src/app/layout.tsx
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

// Aplicar: <body className={`${spaceGrotesk.className} bg-brand-surface`}>
```

---

## 9. Hooks de dados

Encapsular o acesso ao `localStorage` em hooks para facilitar futura substituição por API:

```ts
// src/hooks/useDemandas.ts
'use client'
import { useState, useCallback } from 'react'
import type { Demanda } from '@/types'
import { criarDemanda, buscarDemandasPorAluno, buscarDemandaPorProtocolo } from '@/lib/demandas'

export function useDemandas(matriculaAluno?: string) {
  const [demandas, setDemandas] = useState<Demanda[]>(() =>
    matriculaAluno ? buscarDemandasPorAluno(matriculaAluno) : []
  )

  const criar = useCallback((dados: { tipo: string; descricao: string; matriculaAluno: string }) => {
    const nova = criarDemanda(dados)
    setDemandas(prev => [nova, ...prev])
    return nova
  }, [])

  const atualizar = useCallback(() => {
    if (!matriculaAluno) return
    setDemandas(buscarDemandasPorAluno(matriculaAluno))
  }, [matriculaAluno])

  return { demandas, criar, atualizar }
}
```

---

## 10. Ordem de implementação recomendada

Seguir esta sequência para evitar bloqueios entre dependências:

```
Fase 1 — Base do projeto
  [ ] 1. Inicializar projeto: npx create-next-app@latest clarify --typescript --tailwind --app --src-dir
  [ ] 2. Configurar tailwind.config.ts com tokens de cor e fonte
  [ ] 3. Migrar style.css → src/styles/globals.css
  [ ] 4. Configurar next/font (Space Grotesk)
  [ ] 5. Copiar assets (GATOGORDO.png, favicon.ico) para /public

Fase 2 — Tipos e lógica de negócio
  [ ] 6. Criar src/types/index.ts com todas as interfaces
  [ ] 7. Migrar funcoesAuxiliares.js → lib/auth.ts + lib/demandas.ts + lib/localStorage.ts + lib/utils.ts
  [ ] 8. Criar AuthContext.tsx + AuthProvider
  [ ] 9. Criar Initializer.tsx + integrar no RootLayout
  [ ] 10. Criar hooks: useDemandas, useUsuarios, useTurmas

Fase 3 — Componentes de layout
  [ ] 11. Modal.tsx (base)
  [ ] 12. UserChip.tsx
  [ ] 13. Sidebar.tsx (coord + aluno)
  [ ] 14. TopbarDesktop.tsx + TopbarMobile.tsx
  [ ] 15. DrawerMobile.tsx
  [ ] 16. Layout do grupo (dashboard) com auth guard

Fase 4 — Componentes de domínio (consultar catalog.html para cada um)
  [ ] 17. Badge.tsx
  [ ] 18. CardDemanda.tsx
  [ ] 19. CardNovaDemanda.tsx
  [ ] 20. CardHistorico.tsx + LinhaHistorico.tsx
  [ ] 21. BarraFiltros.tsx
  [ ] 22. TimelineProgresso.tsx
  [ ] 23. ModalNovaDemanda.tsx
  [ ] 24. ModalDetalhesDemanda.tsx
  [ ] 25. EstadoVazio.tsx + FabMobile.tsx
  [ ] 26. CardMetrica.tsx + CardAluno.tsx + CardTurma.tsx
  [ ] 27. ModalCriarTurma.tsx + ModalFeedback.tsx

Fase 5 — Páginas
  [ ] 28. Landing page (/ → page.tsx + componentes landing/)
  [ ] 29. Login page (/login)
  [ ] 30. Registro page (/registro)
  [ ] 31. Central de Demandas (/centraldemandas)
  [ ] 32. Dashboard Coord (/dashboardcoord)
  [ ] 33. not-found.tsx

Fase 6 — Qualidade
  [ ] 34. Revisar proteções de rota (cargo errado → redirect)
  [ ] 35. Testar fluxo completo: landing → login → dashboard → logout
  [ ] 36. Verificar responsividade (drawer mobile, topbar mobile, FAB)
  [ ] 37. Verificar animações CSS (animate-cubes, animate-float-slow, data-reveal)
```

---

## 11. Armadilhas e pontos críticos

### 11.1 `'use client'` obrigatório

Todo componente que usa:
- `useState`, `useEffect`, `useRef`, `useContext`
- `localStorage`
- Event listeners (`onClick`, `onChange`, etc.)
- `useRouter`, `usePathname`

**deve ter `'use client'` na primeira linha.**

Páginas estáticas sem interatividade (ex: partes da landing) podem ser Server Components. Regra prática: começar tudo como client e remover `'use client'` onde não houver hooks.

### 11.2 `localStorage` no servidor

O Next.js roda no servidor. Qualquer acesso a `localStorage` fora de `useEffect` ou handler de evento causará erro. Sempre encapsular em:

```ts
if (typeof window !== 'undefined') {
  localStorage.setItem(...)
}
```

Ou mover para dentro de `useEffect`.

### 11.3 Lucide: `createIcons()` não existe no `lucide-react`

Substituir todo `<i data-lucide="nome">` + `processarIcones()` / `createIcons()` por importações individuais:

```tsx
import { Plus, Calendar, Clock, ChevronRight } from 'lucide-react'
```

### 11.4 Formulários: sem `document.querySelector`

Substituir todos os acessos via `document.querySelector('#campo').value` por:
- **Controlled inputs**: `const [valor, setValor] = useState('')` + `value={valor} onChange={e => setValor(e.target.value)}`
- **Uncontrolled + ref**: `const ref = useRef<HTMLInputElement>(null)` + `ref.current?.value`
- **FormData**: `onSubmit={(e) => { const fd = new FormData(e.currentTarget) }}`

### 11.5 Modais: `document.body.appendChild` → portais React

```tsx
import { createPortal } from 'react-dom'

// Dentro do Modal.tsx
return createPortal(
  <div className="modal-backdrop ...">...</div>,
  document.body
)
```

### 11.6 `window.aprovarDemanda` / `window.reprovarDemanda`

No `dashboardcoord.js`, funções são expostas no `window` para uso em `onclick` de HTML string. Isso não existe em React. Substituir por handlers normais nos componentes JSX.

### 11.7 Animação `data-reveal`

O padrão de `IntersectionObserver` + `is-revealed` via `classList` funciona em React, mas deve ser encapsulado no hook `useReveal()` e aplicado via `ref` no elemento JSX. As classes CSS (`.data-reveal`, `.is-revealed`) são mantidas em `globals.css` sem alteração.

---

## 12. Sugestões de otimização (além da migração literal)

| Área | Sugestão |
|---|---|
| **Estado global** | Considerar Zustand para substituir `AuthContext` + hooks de localStorage, simplificando o fluxo de dados |
| **Persistência** | Encapsular todo acesso ao `localStorage` em um adapter (`StorageAdapter`) para facilitar troca futura por API REST ou Supabase |
| **Formulários** | Adotar `react-hook-form` + `zod` para validação type-safe, eliminando a lógica manual de `UsuarioExiste`, `chaveValida` etc. espalhada nos handlers |
| **Feedback de erro** | Substituir `alert()` (usado em `registro.js` e `turmas.js`) por um sistema de toast (ex: `sonner`) |
| **Dados mock** | Centralizar os dados de seed em `src/lib/seed.ts` e torná-los configuráveis (ex: via variável de ambiente `NEXT_PUBLIC_USE_MOCK=true`) |
| **Tipos de demanda** | Extrair o array de tipos (`['Quebra de Pré-requisito', 'Revisão de Prova', ...]`) para uma constante em `src/lib/constants.ts` |
| **Acessibilidade** | Adicionar `aria-label`, `role="dialog"`, `aria-modal="true"` nos modais e `aria-current="page"` nos itens de sidebar ativos |
| **Loading states** | Adicionar skeletons para os cards de demanda (simular latência futura de API) |
| **SEO** | Usar `export const metadata` nas páginas públicas (landing, login) para title e description |

---

## 13. Referências internas

| Arquivo | Papel na migração |
|---|---|
| `docs/brainstorm/catalog.html` | **Referência visual obrigatória** para implementação de componentes |
| `src/style.css` | Migrar integralmente para `src/styles/globals.css` |
| `src/lib/funcoesAuxiliares.js` | Dividir conforme seção 4.2 |
| `src/pages/*.js` | Cada arquivo vira uma `page.tsx` + seus componentes |
| `tailwind.config.js` | Replicar em `tailwind.config.ts` |

---

*Documento gerado com base na análise completa do código-fonte do projeto Clarify (branch `features`, commit de 28/05/2026).*