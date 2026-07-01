# Diagramas

## 1. Fluxo de Autenticação

```mermaid
flowchart TD
    A[Usuário acessa /login] --> B{Está autenticado?}
    B -->|Sim| C{Qual cargo?}
    B -->|Não| D[Formulário de login]
    D --> E{Credenciais válidas?}
    E -->|Sim| C
    E -->|Não| F[Mostrar erro]
    C -->|aluno| G[/centraldemandas]
    C -->|coordenador| H[/dashboardcoord]
```

## 2. Fluxo de Registro de Coordenador

```mermaid
flowchart TD
    A[/registro] --> B[Preencher formulário]
    B --> C{Chave de ativação válida?}
    C -->|Não| D[Erro: chave inválida]
    C -->|Sim| E[Criar perfil coordenador]
    E --> F[Marcar chave como usada]
    F --> G[Login automático]
    G --> H[/dashboardcoord]
```

## 3. Ciclo de Vida da Demanda

```mermaid
flowchart LR
    A[Aluno cria demanda] --> B[Status: pendente]
    B --> C[Coord analisa]
    C --> D{Decisão}
    D -->|Aprova| E[Status: concluído]
    D -->|Reprova| F[Status: requer_ajuste + feedback]
    F --> G[Aluno vê feedback]
    G --> H[Aluno ajusta e reenvia?]
    H -->|Sim| B
    H -->|Não| I[Demanda arquivada]
```

## 4. Modelo de Vínculo Coordenador ↔ Aluno

No Clarify original (localStorage), o vínculo era mantido via arrays no objeto do coordenador. Com a migração para Supabase, o modelo foi normalizado:

```mermaid
flowchart TD
    subgraph original [Clarify Original — localStorage]
        A1["Coord: alunosCadastrados: string[]"] --> B1["Lista de matrículas"]
        A2["Aluno: coordenador: string"] --> B2["Matrícula do coord"]
        C1["atribuirAluno()"] --> A1
        C2["atribuirCoordenador()"] --> A2
    end

    subgraph atual [clarify-next Atual — Supabase]
        D1["profiles.coordenador_id — FK → profiles.id"]
        D2["RLS políticas filtram por coordenador_id"]
        E1["perfis API: GET ?coordenadorId=..."]
        E2["demandas API: filtra por aluno_id do coord"]
        F1["admin.createUser() vincula aluno ao coord"]
    end

    original -->|"Migrado para FK + RLS"| atual
```

## 5. Estrutura de Rotas (App Router)

```mermaid
flowchart TD
    subgraph public [Rotas Públicas]
        L["/ (landing)"]
        LOGIN["/login"]
        REG["/registro"]
    end

    subgraph dashboard ["Grupo (dashboard) — Protegido"]
        CD["/centraldemandas — Aluno"]
        DC["/dashboardcoord — Coordenador"]
    end

    subgraph api [API Routes — 11 endpoints]
        API_AUTH["/api/auth (login, register, logout)"]
        API_DEMANDAS["/api/demandas, /api/demandas/[protocolo]"]
        API_TURMAS["/api/turmas, /api/turmas/[id], /api/turmas/[id]/alunos"]
        API_PERFIS["/api/perfis, /api/perfis/[id]"]
    end

    LOGIN -->|"cargo=aluno"| CD
    LOGIN -->|"cargo=coordenador"| DC
    REG -->|"sucesso"| DC
```

## 6. Arquitetura de Dados (Supabase)

```mermaid
flowchart TD
    subgraph supabase [Supabase Cloud]
        AUTH["Supabase Auth (auth.users)"]
        PG["PostgreSQL"]
        subgraph tables [Tabelas]
            PROFILES["profiles"]
            DEMANDAS["demandas"]
            TURMAS["turmas"]
            TURMA_ALUNOS["turma_alunos"]
            CHAVES["chaves_ativacao"]
        end
        subgraph rls [Row Level Security]
            POLICIES["15 políticas RLS"]
        end
        RPC["RPC: get_email_by_matricula()
             gerar_proximo_protocolo()"]
        TRIGGER["Trigger: on_auth_user_created
                 → handle_new_user()"]
    end

    subgraph nextjs [Next.js App Router]
        subgraph server [Server-side]
            API["11 API Routes"]
            MIDDLEWARE["proxy.ts (route protection)"]
            SSR_CLIENT["Supabase Server Client (cookies)"]
            ADMIN_CLIENT["Supabase Admin Client (service key)"]
        end
        subgraph client [Client-side]
            BROWSER_CLIENT["Supabase Browser Client"]
            AUTH_CONTEXT["AuthContext"]
            RQ["TanStack React Query Hooks"]
            ZUSTAND["Zustand UI Stores"]
        end
    end

    AUTH --> SSR_CLIENT
    AUTH --> BROWSER_CLIENT
    ADMIN_CLIENT --> AUTH
    PG --> SSR_CLIENT
    PG --> ADMIN_CLIENT
    PG --> BROWSER_CLIENT
    RPC --> SSR_CLIENT
    TRIGGER --> PROFILES
    POLICIES --> tables

    API --> SSR_CLIENT
    API --> ADMIN_CLIENT
    AUTH_CONTEXT --> BROWSER_CLIENT
    AUTH_CONTEXT --> API
    RQ --> API
    RQ --> BROWSER_CLIENT

    BROWSER_CLIENT --> UI["Componentes React"]
    AUTH_CONTEXT --> UI
    RQ --> UI
    ZUSTAND --> UI
```
