# Clarify
<img width="1409" height="736" alt="clarifyLogo" src="https://github.com/user-attachments/assets/8d000030-84a1-4843-baae-9b6d9ae63f04" />

#### Clarify é uma aplicação web full-stack desenvolvida para centralizar, organizar e dar total transparência às solicitações acadêmicas e administrativas dentro do IFPB. O sistema atua como uma ponte eficiente entre alunos e coordenadores, reduzindo burocracias e aumentando a rastreabilidade de todo o processo.

## Objetivos Principais
- Centralizar o recebimento de solicitações — elimina canais informais como e-mail, WhatsApp e papelada solta. Toda demanda passa por um fluxo único e rastreável dentro do sistema.
- Dar transparência total ao ciclo de vida da demanda — o aluno acompanha em tempo real o status (Pendente → Em Análise → Requer Ajuste / Concluído) com estimativa de prazo, enquanto o coordenador mantém controle total do atendimento.
- Otimizar a rotina dos coordenadores — ferramentas como gestão de turmas, cadastro de alunos, filtros avançados, geração de chaves de ativação e cards com métricas (total de alunos, demandas pendentes, percentual de resolução).

## Estrutura Completa do Projeto

```text
.
├── README.md
├── clarify-next
│   ├── .env.local
│   ├── .gitignore
│   ├── PLAN-10-10.md
│   ├── PLANEJAMENTO-COMPARACAO.md
│   ├── PRD.md
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── logo.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── specs
│   │   ├── criterios-aceitacao.md
│   │   ├── diagramas.md
│   │   ├── historias-usuario.md
│   │   └── prototipos.md
│   ├── src
│   │   ├── app
│   │   │   ├── (auth)
│   │   │   │   ├── forgot-password
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── login
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register
│   │   │   │   │   └── page.tsx
│   │   │   │   └── reset-password
│   │   │   │       └── page.tsx
│   │   │   ├── centraldemandas
│   │   │   │   ├── minhdemandas
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── minhturmas
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── novademanda
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components
│   │   │   │       ├── HeaderDemands.tsx
│   │   │   │       └── SidebarDemandas.tsx
│   │   │   ├── dashboardcoord
│   │   │   │   ├── adicionaraluno
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── alunos
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── demandas
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── turmas
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── _components
│   │   │   │       ├── HeaderCoord.tsx
│   │   │   │       └── SidebarCoord.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── demand
│   │   │   │   ├── DemandasList.tsx
│   │   │   │   ├── NewDemandModal.tsx
│   │   │   │   └── StatusBadge.tsx
│   │   │   ├── forms
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterAlunoForm.tsx
│   │   │   │   ├── RegisterCoordForm.tsx
│   │   │   │   └── RegisterRoleSelector.tsx
│   │   │   ├── requests
│   │   │   │   └── DashboardCards.tsx
│   │   │   ├── ui
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── label.tsx
│   │   │   ├── CoordDashboardPreview.tsx
│   │   │   ├── DashboardCoord.tsx
│   │   │   ├── DemandasDashboard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Requests.tsx
│   │   │   └── StatsSection.tsx
│   │   ├── context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks
│   │   │   ├── useDemandas.ts
│   │   │   ├── useTurmas.ts
│   │   │   └── useUsuarios.ts
│   │   ├── lib
│   │   │   ├── supabase
│   │   │   │   ├── browser.ts
│   │   │   │   └── server.ts
│   │   │   └── utils.ts
│   │   ├── schemas
│   │   │   ├── auth.ts
│   │   │   ├── demandas.ts
│   │   │   ├── turmas.ts
│   │   │   └── usuarios.ts
│   │   ├── store
│   │   │   ├── filtrosStore.ts
│   │   │   └── uiStore.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── middleware.ts
│   │   └── proxy.ts
│   └── tsconfig.json
└── sql
    ├── create_schema.sql
    ├── fix_coord_signup_rls.sql
    ├── fix_recursion_rls.sql
    ├── migration.sql
    ├── README.md
    ├── setup_test_data.sql
    ├── test_approved_scenarios.sql
    └── test_demandas_all.sql
```

## Funcionalidades do Sistema
### 🔐 Autenticação Segura
- Login por matrícula institucional (não por email).
- O backend resolve a matrícula para o email via RPC do PostgreSQL e autentica via Supabase Auth.
- Cadastro de coordenadores requer chave de ativação (8 caracteres aleatórios), garantindo que apenas pessoas autorizadas possam se registrar.
- Duas camadas de proteção de rotas: server-side (proxy em src/proxy.ts lê cookie de sessão) e client-side (layout do dashboard valida o contexto de autenticação).
### 👨‍🎓 Central do Aluno (/centraldemandas)
- Visão Geral — boas-vindas personalizadas, cards de métricas (demandas ativas e concluídas), lista das últimas demandas com acesso rápido aos detalhes.
- Minhas Demandas — listagem completa com filtros por status, busca textual, e cards que exibem protocolo, tipo, datas e status. Modal de detalhes com timeline visual do progresso.
- Minhas Turmas — visualização das turmas vinculadas ao aluno.
- Nova Demanda — formulário com validação (React Hook Form + Zod) para selecionar o tipo de solicitação e descrever o problema. Geração automática de protocolo no formato REQ-XXXX.
### 👨‍🏫 Painel do Coordenador (/dashboardcoord)
- Visão Geral — boas-vindas, cards métricos (total de alunos, demandas abertas, % de resolução) e lista das 6 demandas pendentes mais recentes com botões de Aprovar/Reprovar.
- Alunos — listagem de alunos vinculados com contagem de demandas abertas, opção de remover vínculo.
- Adicionar Aluno — formulário para cadastrar novo aluno e vinculá-lo automaticamente ao coordenador, com verificação de matrícula/email duplicados.
- Demandas — grade completa de demandas pendentes com aprovação ou reprovação rápida (abre modal para justificativa).
- Turmas — CRUD completo: criar, editar (adicionar/remover alunos por matrícula), excluir com confirmação, e filtros por nome, disciplina e quantidade de alunos.
- Chaves de Ativação — gerenciamento de chaves para registro de novos coordenadores.
### 🗄️ Infraestrutura de Dados
- Supabase (PostgreSQL + Auth + RLS) como backend.
- 5 tabelas principais: profiles, demandas, turmas, turma_alunos, chaves_ativacao.
- Políticas RLS granulares por papel (aluno/coordenador) com funções SECURITY DEFINER para evitar recursão infinita em consultas entre tabelas.
- TanStack React Query para gerenciamento de estado remoto com cache e optimistic updates.
- Zustand com middleware persist para estado local de UI e filtros.

## Camada	Tecnologia
- Framework	Next.js 16 (App Router + Webpack)

- Linguagem	TypeScript 5
- Frontend	React 19, Tailwind CSS 4, Lucide React
- Backend	API Routes (Next.js)
- Banco	PostgreSQL (Supabase)
- Autenticação	Supabase Auth
- Validação	Zod + React Hook Form
- Estado Remoto	TanStack React Query 5
- Estado Local	Zustand
- UI Primitives	Radix UI Dialog, shadcn/ui-style components
  
## Setup para Desenvolvimento
### Pré-requisitos
- Node.js 20+
- Acesso ao projeto Supabase

### Passos
#### 1. Instalar dependências
cd clarify-next
npm install

### 2. Configurar variáveis de ambiente
#### Crie .env.local

### 3. Rodar as migrações do banco
#### (via interface do Supabase ou CLI)

### 4. Iniciar servidor de desenvolvimento
npm run dev
Acessar http://localhost:3000

### 5. Build para produção
npm run build
npm start
