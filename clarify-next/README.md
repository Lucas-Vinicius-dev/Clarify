# Clarify

<img width="1409" alt="Clarify" src="https://github.com/user-attachments/assets/8d000030-84a1-4843-baae-9b6d9ae63f04" />

Clarify é uma aplicação web para centralizar, organizar e dar transparência a solicitações acadêmicas e administrativas dentro do IFPB. O sistema atua como ponte oficial entre o corpo discente e as coordenações de curso.

## Funcionalidades

- **Autenticação segura** — Login por ID institucional com redirecionamento por cargo (aluno/coordenador)
- **Central de Demandas (Aluno)** — Criar solicitações, acompanhar status em tempo real (Pendente → Em Análise → Requer Ajuste / Concluído), histórico completo
- **Dashboard do Coordenador** — Gerenciar alunos vinculados, analisar e responder demandas, criar turmas
- **Gestão de Turmas** — Criar turmas com alunos vinculados
- **Registro com chave de ativação** — Coordenadores se cadastram mediante chave fornecida pela instituição
- **Persistência local** — Dados armazenados no navegador via localStorage (sem backend)

## Tecnologias

- **Next.js** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
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

### Build estático (GitHub Pages)

```bash
npm run build
```

O output será gerado em `out/` pronto para servir em `/Clarify/`.

## Estrutura

```
src/
├── app/           # Rotas do App Router
├── components/    # Componentes React (layout, demandas, coord, ui)
├── context/       # AuthContext (autenticação reativa)
├── hooks/         # Hooks de dados (useDemandas, useUsuarios, useTurmas)
├── lib/           # Lógica de domínio (auth, demandas, localStorage, migrations)
└── types/         # Interfaces TypeScript
```
