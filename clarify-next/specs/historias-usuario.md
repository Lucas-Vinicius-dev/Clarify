# Histórias de Usuário

> **Legenda:** ✅ Implementado | ❌ Pendente

## Perfil: Aluno

### US-01 — Login ✅
**Como** aluno,
**quero** fazer login com minha matrícula e senha,
**para** acessar a central de demandas.

### US-02 — Criar demanda ✅
**Como** aluno,
**quero** abrir uma nova demanda selecionando o tipo e descrevendo o que preciso,
**para** solicitar algo à coordenação do meu curso.

### US-03 — Acompanhar demandas ✅
**Como** aluno,
**quero** visualizar a lista das minhas demandas com seus status,
**para** saber o andamento de cada solicitação.

### US-04 — Filtrar demandas ✅
**Como** aluno,
**quero** filtrar minhas demandas por status (pendente, em análise, requer ajuste, concluído),
**para** encontrar rapidamente o que me interessa.

### US-05 — Buscar demandas ✅
**Como** aluno,
**quero** buscar demandas por palavra-chave,
**para** localizar uma solicitação específica.

### US-06 — Ver detalhes da demanda ✅
**Como** aluno,
**quero** abrir uma demanda e visualizar seu histórico (timeline de eventos),
**para** entender o que já aconteceu com aquela solicitação.

### US-07 — Visualizar status em tempo real ❌
**Como** aluno,
**quero** ver a mudança de status da minha demanda automaticamente após o coordenador agir,
**para** não precisar recarregar a página ou perguntar por outros canais.

### US-08 — Ver demandas recentes ✅
**Como** aluno,
**quero** ver as demandas mais recentes na tela inicial,
**para** ter um resumo rápido do que está acontecendo.

---

## Perfil: Coordenador

### US-09 — Login ✅
**Como** coordenador,
**quero** fazer login com minha matrícula e senha,
**para** acessar o dashboard de coordenação.

### US-10 — Visualizar alunos vinculados ✅
**Como** coordenador,
**quero** visualizar a lista de alunos vinculados a mim,
**para** saber quais alunos estão sob minha responsabilidade.

### US-11 — Adicionar aluno ✅
**Como** coordenador,
**quero** adicionar um aluno à minha lista informando nome, matrícula, e-mail e senha,
**para** vinculá-lo à minha coordenação.

### US-12 — Remover aluno ✅
**Como** coordenador,
**quero** remover um aluno da minha lista,
**para** desvinculá-lo quando necessário.

### US-13 — Visualizar demandas dos alunos ✅
**Como** coordenador,
**quero** visualizar apenas as demandas dos meus alunos vinculados,
**para** focar no que é relevante para minha coordenação.

### US-14 — Aprovar demanda ✅
**Como** coordenador,
**quero** aprovar uma demanda pendente,
**para** que o status mude para "concluído" e o aluno saiba que foi atendido.

### US-15 — Reprovar demanda com feedback ✅
**Como** coordenador,
**quero** reprovar uma demanda informando o motivo,
**para** que o status mude para "requer ajuste" e o aluno saiba o que corrigir.

### US-16 — Ver detalhes da demanda do aluno ✅
**Como** coordenador,
**quero** abrir uma demanda e ver seu conteúdo completo,
**para** analisá-la antes de aprovar ou reprovar.

### US-17 — Criar turma ✅
**Como** coordenador,
**quero** criar uma turma informando nome, disciplina e lista de alunos,
**para** organizar os alunos em grupos.

### US-18 — Editar turma ❌
**Como** coordenador,
**quero** editar nome, disciplina e alunos de uma turma existente,
**para** manter os dados atualizados.

### US-19 — Excluir turma ✅
**Como** coordenador,
**quero** excluir uma turma após confirmação,
**para** remover turmas que não são mais necessárias.

---

## Perfil: Coordenador (Registro)

### US-20 — Registrar-se com chave de ativação ✅
**Como** novo coordenador,
**quero** me registrar informando nome, matrícula, e-mail, senha e chave de ativação,
**para** criar minha conta e acessar o sistema.

### US-21 — Chave inválida ✅
**Como** novo coordenador,
**quero** receber uma mensagem de erro clara se a chave informada for inválida,
**para** saber que preciso de uma chave correta.

---

## Perfil: Coordenador (Administração)

### US-22 — Gerar chave de ativação ❌
**Como** coordenador,
**quero** gerar novas chaves de ativação aleatórias,
**para** distribuí-las a novos coordenadores.

### US-23 — Listar chaves ❌
**Como** coordenador,
**quero** visualizar a lista de chaves com status (usada/não usada) e data de criação,
**para** gerenciar o acesso ao sistema.

### US-24 — Copiar chave ❌
**Como** coordenador,
**quero** copiar uma chave para a área de transferência com um clique,
**para** compartilhá-la facilmente.
