# Critérios de Aceitação

## CA-01: Login

**US:** US-01, US-09

**Cenário 1 — Login bem-sucedido (aluno)**
- DADO que sou um aluno registrado com matrícula `003` e senha `123456`
- QUANDO faço login
- ENTÃO sou redirecionado para `/centraldemandas`

**Cenário 2 — Login bem-sucedido (coordenador)**
- DADO que sou um coordenador registrado com matrícula `123` e senha `123456`
- QUANDO faço login
- ENTÃO sou redirecionado para `/dashboardcoord`

**Cenário 3 — Credenciais inválidas**
- DADO que informo matrícula ou senha incorretas
- QUANDO tento fazer login
- ENTÃO vejo uma mensagem de erro "Matrícula ou senha inválidos"

---

## CA-02: Registro de Coordenador

**US:** US-20, US-21

**Cenário 1 — Registro com chave válida**
- DADO que informo nome, matrícula, e-mail, senha e uma chave de ativação válida
- QUANDO submeto o formulário
- ENTÃO minha conta é criada, a chave é marcada como usada e sou redirecionado ao dashboard

**Cenário 2 — Chave inválida**
- DADO que informo uma chave inexistente ou já usada
- QUANDO submeto o formulário
- ENTÃO vejo mensagem de erro "Chave de ativação inválida ou já utilizada"

**Cenário 3 — Campos obrigatórios**
- DADO que deixo campos obrigatórios vazios
- QUANDO submeto o formulário
- ENTÃO vejo mensagens de erro abaixo de cada campo faltante

---

## CA-03: Criar Demanda (Aluno)

**US:** US-02

**Cenário 1 — Criação bem-sucedida**
- DADO que estou logado como aluno
- QUANDO seleciono um tipo de demanda e informo descrição (mín 10 caracteres) e clico em "Criar"
- ENTÃO a demanda aparece na minha lista com status "pendente" e protocolo REQ-XXX

**Cenário 2 — Descrição muito curta**
- DADO que informo descrição com menos de 10 caracteres
- QUANDO tento criar
- ENTÃO vejo mensagem de erro de validação

---

## CA-04: Visualizar e Filtrar Demandas (Aluno)

**US:** US-03, US-04, US-05

**Cenário 1 — Listar todas as demandas**
- DADO que estou logado como aluno
- QUANDO acesso a central de demandas
- ENTÃO vejo todas as minhas demandas ordenadas por data de atualização (mais recente primeiro)

**Cenário 2 — Filtrar por status**
- DADO que estou na central de demandas
- QUANDO seleciono o filtro "pendente"
- ENTÃO vejo apenas demandas com status "pendente"

**Cenário 3 — Buscar por palavra-chave**
- DADO que tenho demandas com a palavra "histórico" no título
- QUANDO busco por "histórico"
- ENTÃO vejo apenas as demandas que contêm essa palavra

---

## CA-05: Dashboard Coordenador — Alunos Vinculados

**US:** US-10, US-11, US-12

**Cenário 1 — Listar alunos vinculados**
- DADO que sou o coordenador `123`
- E existem alunos com coordenador = `123`
- QUANDO acesso o dashboard na aba "Alunos"
- ENTÃO vejo apenas os alunos vinculados a mim

**Cenário 2 — Adicionar aluno**
- DADO que estou na aba "Alunos"
- QUANDO preencho nome, matrícula, e-mail e senha e clico em "Adicionar"
- ENTÃO o aluno aparece na lista e fica vinculado a mim

**Cenário 3 — Remover aluno**
- DADO que tenho alunos na lista
- QUANDO clico em "Remover" em um aluno
- ENTÃO ele desaparece da lista

---

## CA-06: Dashboard Coordenador — Demandas

**US:** US-13, US-14, US-15

**Cenário 1 — Filtrar demandas por alunos vinculados**
- DADO que sou o coordenador `123`
- E existem demandas de alunos vinculados e de outros alunos
- QUANDO acesso a aba "Demandas"
- ENTÃO vejo apenas demandas dos meus alunos vinculados

**Cenário 2 — Aprovar demanda**
- DADO que uma demanda está "pendente"
- QUANDO clico em "Aprovar"
- ENTÃO o status muda para "concluído"

**Cenário 3 — Reprovar demanda com feedback**
- DADO que uma demanda está "pendente"
- QUANDO clico em "Reprovar" e informo um feedback (mín 5 caracteres)
- ENTÃO o status muda para "requer_ajuste" com o feedback registrado

---

## CA-07: Turmas

**US:** US-17, US-18, US-19

**Cenário 1 — Criar turma**
- DADO que estou no dashboard
- QUANDO preencho nome, disciplina e alunos e confirmo
- ENTÃO a turma aparece na lista de turmas

**Cenário 2 — Editar turma**
- DADO que existe uma turma
- QUANDO abro o modal de edição, altero campos e salvo
- ENTÃO os dados da turma são atualizados

**Cenário 3 — Excluir turma**
- DADO que existe uma turma
- QUANDO clico em "Excluir" e confirmo no modal
- ENTÃO a turma é removida da lista

---

## CA-08: Chaves de Ativação

**US:** US-22, US-23, US-24

**Cenário 1 — Gerar chave**
- DADO que estou na página de gerenciamento de chaves
- QUANDO clico em "Gerar Nova Chave"
- ENTÃO uma chave de 8 caracteres (letras + números) é gerada e aparece na tabela

**Cenário 2 — Copiar chave**
- DADO que existe uma chave na tabela
- QUANDO clico no botão de copiar
- ENTÃO a chave é copiada para a área de transferência

**Cenário 3 — Status da chave**
- DADO que uma chave foi usada no registro
- QUANDO visualizo a tabela
- ENTÃO vejo o badge "usada" ao lado da chave

---

## CA-09: Proteção de Rotas

**US:** Transversal

**Cenário 1 — Aluno não acessa dashboard coord**
- DADO que estou logado como aluno
- QUANDO tento acessar `/dashboardcoord`
- ENTÃO sou redirecionado para `/centraldemandas`

**Cenário 2 — Coordenador não acessa central do aluno**
- DADO que estou logado como coordenador
- QUANDO tento acessar `/centraldemandas`
- ENTÃO sou redirecionado para `/dashboardcoord`

**Cenário 3 — Não autenticado**
- DADO que não estou logado
- QUANDO tento acessar qualquer rota do dashboard
- ENTÃO sou redirecionado para `/login`
