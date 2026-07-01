# Protótipos

## 1. Landing Page (`/`) ✅ Implementado

**Objetivo:** Apresentar o Clarify para novos visitantes.

**Elementos implementados:**
- Navbar com logo "GATOGORDO.png" e links: Login, Registro
- Hero section com título, subtítulo e imagem do app
- Seção "Como funciona" com steps numerados (1-2-3)
- Seção de perfis: cards para Aluno e Coordenador
- Call-to-action "Acessar Central" / "Dashboard"
- Footer com informações do IFPB

**Elementos planejados:**
- Seção "Tipos de Demanda" com cards ilustrando as categorias
- Animações nos cards (fade-in no scroll)

---

## 2. Login (`/login`)

**Objetivo:** Autenticar usuários existentes.

**Elementos:**
- Logo "GATOGORDO.png" centralizado no topo
- Card centralizado com formulário:
  - Campo "Matrícula" (input text)
  - Campo "Senha" (input password)
  - Botão "Entrar" (full-width, cor primária)
  - Erro inline abaixo do formulário em caso de falha
- Link "Não tem conta? Registre-se" abaixo do card
- Loading spinner no botão durante autenticação

**Validação:**
- Matrícula: apenas dígitos (RegExp `^\d+$`)
- Senha: mínimo 6 caracteres

---

## 3. Registro (`/registro`)

**Objetivo:** Criar conta de coordenador com chave de ativação.

**Elementos:**
- Logo "GATOGORDO.png" centralizado no topo
- Card centralizado com formulário:
  - Campo "Nome completo" (input text)
  - Campo "Matrícula" (input text)
  - Campo "E-mail institucional" (input email)
  - Campo "Senha" (input password)
  - Campo "Chave de Ativação" (input text)
  - Botão "Criar Conta" (full-width)
- Link "Já tem conta? Faça login" abaixo do card
- Estados: loading, erro, sucesso

**Validação:**
- Nome: mínimo 3 caracteres
- Matrícula: apenas dígitos
- E-mail: formato institucional válido
- Senha: mínimo 6 caracteres
- Chave: obrigatória

---

## 4. Central de Demandas — Aluno (`/centraldemandas`)

**Objetivo:** Aluno gerencia suas demandas.

**Estrutura da página:**
- **Topbar (desktop):** Logo + nome do usuário + botão sair
- **Sidebar (mobile/desktop):** Logo, navegação, perfil do usuário

**Tela "Início" (view padrão):**
- Saudação com nome do aluno
- Card "Demandas em Aberto" com contador
- Lista das 3 demandas mais recentes (cards compactos com status colorido)
- Botão flutuante "+" para nova demanda (FAB, canto inferior direito)

**Tela "Nova Demanda" (modal):**
- Modal com overlay
- Campo "Tipo" (select com opções predefinidas: Declaração, Histórico, Revisão de Nota, Outro)
- Campo "Descrição" (textarea com contador de caracteres: 10/500)
  - Barra de progresso que muda de cor: verde → amarelo → vermelho
- Botões: "Cancelar" | "Criar Demanda"

**Tela "Demandas" (lista completa):**
- Barra de filtros: tabs "Todas" | "Pendentes" | "Em Análise" | "Requer Ajuste" | "Concluídas"
- Campo de busca por texto
- Lista de cards de demanda com:
  - Título
  - Status (badge colorido: pendente=amarelo, em_analise=azul, requer_ajuste=laranja, concluido=verde)
  - Data de criação
  - Preview da descrição (truncado)

**Tela "Detalhes da Demanda" (modal):**
- Título da demanda
- Status atual (badge)
- Descrição completa
- Timeline de eventos:
  - "Criada em DD/MM/AAAA"
  - "Em análise desde DD/MM/AAAA" (se aplicável)
  - "Concluída em DD/MM/AAAA" ou "Requer ajuste: [feedback]" (se aplicável)
- Botão "Fechar"

---

## 5. Dashboard do Coordenador (`/dashboardcoord`)

**Objetivo:** Coordenador gerencia alunos e demandas.

**Estrutura da página:**
- Mesma sidebar/topbar do aluno
- Tabs superiores: "Alunos" | "Demandas" | "Turmas"

**Aba "Alunos":**
- Botão "Adicionar Aluno" (abre modal)
- Grid de cards de aluno (2-3 colunas desktop, 1 coluna mobile):
  - Nome
  - Matrícula
  - E-mail
  - Botões: "Remover" (ícone de lixeira)
- Modal "Adicionar Aluno":
  - Campos: Nome, Matrícula, E-mail, Senha
  - Botões: Cancelar | Adicionar

**Aba "Demandas":**
- Filtros: "Pendentes" | "Em Análise" | "Requer Ajuste" | "Concluídas"
- Lista de cards de demanda dos alunos vinculados:
  - Nome do aluno
  - Título da demanda
  - Data
  - Status
  - Botões: "Ver Detalhes" | "Aprovar" | "Reprovar"
- Modal "Feedback" (ao reprovar):
  - Campo de texto: motivo do ajuste (mín 5 caracteres)
  - Botões: Cancelar | Enviar Feedback

**Aba "Turmas":** ✅ Implementado (criação e exclusão) / ❌ Edição pendente
- Botão "Criar Turma" (abre modal)
- Grid de cards de turma:
  - Nome da turma, Disciplina, Quantidade de alunos
  - Botão "Excluir" (ícone lixeira)
- Modal "Criar Turma":
  - Campo Nome, Disciplina
  - Lista de alunos (adicionar matrícula por vez)
- Modal "Editar Turma" ❌ (planejado):
  - Mesmo layout, campos preenchidos com dados atuais
- Modal "Confirmar Exclusão":
  - Texto: "Tem certeza que deseja excluir esta turma?"
  - Botões: Cancelar | Confirmar Exclusão (vermelho)

---

## 6. Gerenciar Chaves (`/gerarchaves`) ❌ Não implementado

**Objetivo:** Coordenador gerencia chaves de ativação.

**Elementos planejados:**
- Título "Gerenciar Chaves de Ativação"
- Botão "Gerar Nova Chave"
- Tabela de chaves:
  - Colunas: Chave | Status (badge: "não usada" verde / "usada" cinza) | Criada em | Ações
  - Ações: botão "Copiar" (ícone de cópia)
- Modal "Chave Gerada":
  - Chave em destaque (fonte mono)
  - Botão "Copiar Chave"
  - Botão "Fechar"

---

## 7. Estados Globais

**Loading:**
- Spinner centralizado enquanto dados são carregados
- Botões desabilitados com spinner interno durante ações

**Erro:**
- Mensagens de erro inline abaixo dos campos de formulário
- Toast para erros de rede ou operações assíncronas

**Vazio (empty state):**
- "Nenhuma demanda encontrada" — ícone + texto + botão "Criar primeira demanda"
- "Nenhum aluno vinculado" — ícone + texto + botão "Adicionar aluno"
- "Nenhuma turma criada" — ícone + texto + botão "Criar turma"

**Responsivo:**
- Sidebar colapsa em drawer no mobile (hamburguer menu)
- Cards: 1 coluna mobile, 2 tablet, 3 desktop
- Modais full-screen no mobile
