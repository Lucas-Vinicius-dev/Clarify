# PRD — Product Requirements Document

## Clarify

**Data:** 27/06/2026
**Status:** Em desenvolvimento (migrado para Supabase)
**Nota atual:** 8,2/10 (meta: 10/10)

---

## 1. Visão Geral

O Clarify é uma aplicação web desenvolvida para centralizar, organizar e dar transparência às solicitações acadêmicas e administrativas dentro do IFPB. O sistema atua como ponte oficial entre o corpo discente e as coordenações de curso, resolvendo problemas históricos de comunicação fragmentada e falta de previsibilidade nos atendimentos.

### Problema que resolve

- Alunos recorrem a canais informais (WhatsApp, e-mail pessoal) para fazer solicitações à coordenação
- Não há rastreabilidade nem histórico centralizado das demandas
- Coordenadores perdem visibilidade do que está pendente, em análise ou concluído
- Falta previsibilidade de prazo para o aluno

### Público-alvo

| Perfil | Descrição |
|--------|-----------|
| Aluno | Abre e acompanha demandas acadêmicas |
| Coordenador | Gerencia alunos vinculados, analisa e responde demandas, gerencia turmas |

---

## 2. Funcionalidades Principais

### 2.1 Autenticação e Controle de Acesso
- Login por matrícula (resolvida para e-mail via RPC no banco) + senha via Supabase Auth
- Registro de coordenador mediante chave de ativação + `admin.createUser`
- Redirecionamento automático por cargo (aluno → central de demandas, coordenador → dashboard)
- Proteção de rotas via middleware (cookie `clarify_sessao`)
- Perfil estendido na tabela `profiles` (auto-criado por trigger `on_auth_user_created`)

### 2.2 Central de Demandas (Aluno)
- Criar nova demanda com tipo (select) e descrição, protocolo gerado automaticamente (REQ-XXX)
- Acompanhar status: Pendente → Em Análise → Requer Ajuste / Concluído
- Visualizar histórico completo com filtros por status e busca textual
- Modal de detalhes com timeline de eventos e feedback do coordenador
- Métricas na tela inicial (total, pendentes, em aberto)

### 2.3 Dashboard do Coordenador
- Visão geral com métricas (total de alunos, demandas pendentes)
- Lista de alunos vinculados com contagem de demandas
- Adicionar/remover alunos via API de perfis
- Visualizar demandas dos alunos vinculados (filtradas por status)
- Aprovar (→ concluído) ou reprovar (→ requer_ajuste + feedback)
- Modal de feedback com validação (mín 5 caracteres)

### 2.4 Gestão de Turmas
- Criar turmas com nome, disciplina e lista de alunos
- Visualizar turmas do coordenador logado
- Adicionar/remover alunos de uma turma
- Excluir turma

### 2.5 Landing Page
- Hero section com apresentação do produto
- Seção "Como funciona" com steps
- Seção de perfis (Aluno e Coordenador)
- CTA para login/registro
- Footer

---

## 3. Requisitos Funcionais

| ID | Descrição | Status |
|----|-----------|--------|
| RF01 | Login com matrícula e senha via Supabase Auth | ✅ |
| RF02 | Redirecionamento por cargo após login | ✅ |
| RF03 | Registro de coordenador com chave de ativação | ✅ |
| RF04 | Validação de chave antes de criar conta | ✅ |
| RF05 | Aluno cria demanda com tipo e descrição | ✅ |
| RF06 | Aluno visualiza e filtra suas demandas | ✅ |
| RF07 | Aluno vê detalhes da demanda com timeline | ✅ |
| RF08 | Coordenador vê alunos vinculados a ele | ✅ |
| RF09 | Coordenador vê demandas dos seus alunos | ✅ |
| RF10 | Coordenador aprova/reprova demanda com feedback | ✅ |
| RF11 | Coordenador adiciona aluno à sua lista | ✅ |
| RF12 | Coordenador remove aluno da sua lista | ✅ |
| RF13 | Coordenador cria turma com nome, disciplina e alunos | ✅ |
| RF14 | Coordenador visualiza turmas criadas | ✅ |
| RF15 | Coordenador exclui turma | ✅ |
| RF16 | Landing page completa com seções informativas | ✅ |
| RF17 | Proteção de rotas por cargo (middleware) | ✅ |
| RF18 | Gerar chaves de ativação (interface admin) | ❌ Pendente |
| RF19 | Editar dados de uma turma (PATCH) | ❌ Pendente |
| RF20 | Notificações em tempo real de mudança de status | ❌ Pendente |

---

## 4. Requisitos Não-Funcionais

| ID | Descrição | Categoria |
|----|-----------|-----------|
| RNF01 | Persistência em PostgreSQL via Supabase, com 11 API routes no App Router | Arquitetura |
| RNF02 | Row Level Security em todas as tabelas (15 políticas) | Segurança |
| RNF03 | TypeScript strict com tipagem completa em types/ | Qualidade |
| RNF04 | Interface responsiva mobile-first com Tailwind CSS 4 | Usabilidade |
| RNF05 | Validação de formulários com React Hook Form + Zod (schemas centralizados em src/schemas/) | UX |
| RNF06 | Gerenciamento de estado servidor com TanStack React Query (hooks useDemandas, useUsuarios, useTurmas) | Performance |
| RNF07 | Estado de UI com Zustand (uiStore, filtrosStore) | Manutenibilidade |
| RNF08 | Componentização com co-localização (subcomponentes em _components/) | Manutenibilidade |
| RNF09 | Autenticação stateful com AuthContext + listener onAuthStateChange | Segurança |
| RNF10 | Protocolo automático de demandas via sequence + RPC no banco | Integridade |

---

## 5. Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Linguagem | TypeScript 5 |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| API | 11 API Routes (App Router) |
| Estado servidor | TanStack React Query |
| Estado cliente | Zustand |
| Validação | Zod + React Hook Form + @hookform/resolvers |
| Ícones | Lucide React |
| Componentes base | Radix UI (Dialog) + Class Variance Authority |

---

## 6. Estrutura do Projeto

```
src/
├── app/                    # Rotas do App Router
│   ├── page.tsx            # Landing page
│   ├── login/page.tsx      # Login (RHF + Zod)
│   ├── registro/page.tsx   # Registro (RHF + Zod)
│   ├── (dashboard)/
│   │   ├── layout.tsx      # Layout protegido (sidebar, topbar, drawer)
│   │   ├── centraldemandas/page.tsx
│   │   └── dashboardcoord/
│   │       ├── page.tsx
│   │       └── _components/  # VisaoGeral, ListaAlunos, ListaDemandas, ListaTurmas, DemandaCard
│   └── api/                # 11 API routes (auth, demandas, turmas, perfis)
├── components/
│   ├── layout/             # Sidebar, TopbarDesktop, TopbarMobile, DrawerMobile, UserChip
│   ├── demandas/           # 10 componentes de demanda
│   ├── coordenador/        # 6 componentes de coordenador
│   ├── ui/                 # Dialog, Badge, Card
│   └── providers/          # QueryProvider
├── context/AuthContext.tsx  # Estado de autenticação
├── hooks/                  # useDemandas, useUsuarios, useTurmas, usePerfil (TanStack Query)
├── lib/
│   └── supabase/           # client.ts, server.ts, admin.ts
├── schemas/                # auth.ts, demandas.ts, turmas.ts, usuarios.ts
├── store/                  # uiStore.ts, filtrosStore.ts (Zustand)
└── types/index.ts          # Interfaces TypeScript
```

---

## 7. Banco de Dados (Supabase)

| Tabela | Descrição | RLS |
|--------|-----------|-----|
| `profiles` | Perfil estendido do usuário (auto-criado por trigger) | ✅ |
| `demandas` | Demandas com protocolo REQ-XXX e ciclo de status | ✅ |
| `turmas` | Turmas vinculadas ao coordenador | ✅ |
| `turma_alunos` | Relacionamento N:N turma ↔ aluno | ✅ |
| `chaves_ativacao` | Chaves para registro de coordenadores | ✅ |

**Functions:** `handle_new_user()` (trigger), `get_email_by_matricula()` (RPC), `gerar_proximo_protocolo()` (RPC)

---

## 8. Roadmap

### O que já está implementado

- ✅ Autenticação completa via Supabase Auth (login, registro, logout)
- ✅ Central de demandas do aluno (criar, listar, filtrar, detalhes com timeline)
- ✅ Dashboard do coordenador (alunos, demandas, turmas)
- ✅ Landing page completa
- ✅ Validação com React Hook Form + Zod em todos os formulários
- ✅ TanStack React Query em todos os hooks de dados
- ✅ Zustand para estado de UI
- ✅ RLS em todas as tabelas
- ✅ 11 API routes
- ✅ Layout responsivo (sidebar desktop + drawer mobile)

### Pendente

| Tarefa | ID Linear | Prioridade |
|--------|-----------|------------|
| Interface admin para gerar/listar chaves de ativação | ENZ-62 | Média |
| Modal de edição de turma (PATCH) | ENZ-37 | Média |
| Botão de excluir turma no card | ENZ-40 | Baixa |
| Notificações em tempo real (Supabase Realtime) | — | Baixa |

---

## 9. Referências

- [README.md](./README.md) — Guia de instalação e uso
- [specs/](./specs/) — Histórias de usuário, critérios de aceitação, diagramas e protótipos
- [PLANEJAMENTO-COMPARACAO.md](./PLANEJAMENTO-COMPARACAO.md) — Auditoria de paridade Clarify original × clarify-next (pré-Supabase, parcialmente desatualizado)
- [PLAN-10-10.md](./PLAN-10-10.md) — Roadmap detalhado de melhoria de qualidade
