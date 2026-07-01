# Clarify

<img width="1409" alt="Clarify" src="https://github.com/user-attachments/assets/8d000030-84a1-4843-baae-9b6d9ae63f04" />

Clarify é uma aplicação web para centralizar, organizar e dar transparência a solicitações acadêmicas e administrativas dentro do IFPB. O sistema atua como ponte oficial entre o corpo discente e as coordenações de curso.

## Funcionalidades

- **Autenticação segura** — Login por ID institucional com redirecionamento por cargo (aluno/coordenador)
- **Central de Demandas (Aluno)** — Criar solicitações, acompanhar status em tempo real (Pendente → Em Análise → Requer Ajuste / Concluído), histórico completo
- **Dashboard do Coordenador** — Gerenciar alunos vinculados, analisar e responder demandas, criar turmas
- **Gestão de Turmas** — Criar turmas com alunos vinculados
- **Registro com chave de ativação** — Coordenadores se cadastram mediante chave fornecida pela instituição
- **Persistência em nuvem** — Dados armazenados no Supabase (PostgreSQL) com Row Level Security

## Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL + Auth + RLS)
- **TanStack React Query** (estado servidor)
- **Zustand** (estado cliente)
- **React Hook Form + Zod** (validação)
- **Lucide React** (ícones)

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Credenciais de teste

| Perfil | Matrícula | Senha |
|--------|-----------|-------|
| Coordenador | `123` | `123456` |
| Aluno | `003` | `123456` |
| Aluno | `456` | `123456` |

### Build de produção

```bash
npm run build
npm start
```

> O projeto depende das variáveis de ambiente em `.env.local` para conexão com Supabase.

## Estrutura

```
src/
├── app/           # Rotas do App Router
├── components/    # Componentes React (layout, demandas, coord, ui)
├── context/       # AuthContext (autenticação reativa)
├── hooks/         # Hooks de dados (useDemandas, useUsuarios, useTurmas)
├── lib/           # Clientes Supabase e utilitários
├── schemas/       # Schemas Zod (auth, demandas, turmas, usuarios)
├── store/         # Zustand stores (uiStore, filtrosStore)
└── types/         # Interfaces TypeScript
```

## Documentação

- [PRD.md](./PRD.md) — Product Requirements Document (visão geral, requisitos, roadmap)
- [specs/](./specs/) — Artefatos de engenharia de software:
  - [Histórias de Usuário](./specs/historias-usuario.md)
  - [Critérios de Aceitação](./specs/criterios-aceitacao.md)
  - [Diagramas](./specs/diagramas.md)
  - [Protótipos](./specs/prototipos.md)
- [PLAN-10-10.md](./PLAN-10-10.md) — Roadmap detalhado para nota 10/10
- [PLANEJAMENTO-COMPARACAO.md](./PLANEJAMENTO-COMPARACAO.md) — Auditoria de paridade Clarify original × clarify-next
