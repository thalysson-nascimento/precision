# Skill - Arquitetura e Diretrizes do Projeto

# Objetivo do Projeto

Este projeto consiste no desenvolvimento de uma aplicação web para Registro de Ponto utilizando o ecossistema do Next.js (App Router).

O objetivo principal é construir uma aplicação moderna, altamente escalável, organizada e preparada para crescimento futuro.

O projeto deverá seguir princípios de Clean Code, Componentização, Separação de Responsabilidades e Arquitetura Modular.

Embora inicialmente seja um sistema de registro de ponto, toda a estrutura deverá ser preparada para futuramente suportar novos módulos, como:

* Cadastro de Funcionários
* Banco de Horas
* Férias
* Relatórios
* Dashboard
* Controle de Usuários
* Controle de Permissões
* Configurações do Sistema

A arquitetura deve ser pensada desde o início para suportar evolução sem necessidade de grandes refatorações.

---

# Stack Tecnológica

Frontend

* Next.js (App Router)
* React
* TypeScript
* SCSS Modules
* BEM CSS Methodology

Backend

* Route Handlers do Next.js
* Prisma ORM

Banco de Dados

Durante o desenvolvimento inicial:

* SQLite

Futuramente:

* PostgreSQL utilizando Prisma sem alterações significativas na arquitetura.

---

# Filosofia do Projeto

A prioridade desta aplicação é entregar uma experiência extremamente rápida para o usuário.

O usuário nunca deve esperar que toda a página seja construída após uma consulta ao banco de dados.

A estrutura da página deve aparecer imediatamente.

Somente os dados dinâmicos devem aguardar carregamento.

Essa arquitetura deverá ser seguida durante todo o projeto.

---

# Estratégia de Renderização

Toda página deverá ser dividida em duas responsabilidades.

## 1) Estrutura Estática

Responsável por renderizar imediatamente:

* Layout
* Sidebar
* Navbar
* Header
* Footer
* Botões
* Inputs
* Labels
* Textos
* Cards vazios
* Estrutura das tabelas
* Skeletons
* Espaçamento
* Containers

Essa estrutura deverá ser implementada utilizando Server Components.

Os Server Components NÃO devem consultar banco de dados quando o objetivo for apenas construir a estrutura da interface.

A página deverá ser enviada o mais rapidamente possível para o navegador.

---

## 2) Dados Dinâmicos

Todos os dados provenientes de APIs ou banco de dados deverão ser carregados posteriormente.

Exemplos:

* Funcionários
* Registros de ponto
* Relatórios
* Dashboard
* Estatísticas
* Informações do usuário

Esses componentes deverão ser Client Components.

Sempre utilizar:

```tsx
'use client';
```

Esses componentes serão responsáveis por:

* Fazer requisições
* Atualizar estado
* Mostrar Skeletons
* Exibir mensagens de erro
* Atualizar a interface

---

# Fluxo esperado

Fluxo desejado da aplicação:

Usuário acessa a página

↓

Server Component renderiza:

* Layout
* Header
* Sidebar
* Botões
* Títulos
* Skeletons

↓

Página aparece imediatamente

↓

Client Component inicia

↓

Requisição para API

↓

Resposta da API

↓

Skeleton desaparece

↓

Dados são renderizados

Esse comportamento deverá ser seguido em todas as páginas da aplicação.

Nunca bloquear a renderização da interface aguardando consultas ao banco de dados quando os dados puderem ser carregados posteriormente.

---

# Organização dos Componentes

Separar componentes em dois grupos.

## Server Components

Responsáveis apenas pela estrutura.

Exemplos:

Layout

Navbar

Sidebar

Footer

Page

Containers

Headers

Cards

Estrutura de tabelas

Títulos

Textos

Botões

Inputs

Skeletons

Esses componentes devem possuir pouca ou nenhuma lógica.

---

## Client Components

Responsáveis pela lógica.

Exemplos:

Tabelas

Listagens

Modais

Formulários

Filtros

Pesquisa

Paginação

Toast

Chamadas HTTP

Atualizações em tempo real

Estados do React

Esses componentes deverão utilizar:

* useState
* useEffect
* hooks
* eventos
* chamadas para APIs

---

# Organização das Requisições

Não realizar chamadas HTTP diretamente dentro dos componentes quando possível.

Utilizar uma camada de serviços.

Exemplo:

services/

employees.service.ts

time-record.service.ts

auth.service.ts

Cada serviço deverá ser responsável apenas pela comunicação com a API.

Os componentes apenas consomem esses serviços.

---

# Estrutura de Pastas

```
src/

app/

components/

components/layout/

components/ui/

components/forms/

components/tables/

components/skeleton/

services/

repositories/

lib/

hooks/

types/

styles/

prisma/

public/
```

A estrutura deve permanecer organizada conforme o projeto cresce.

---

# Prisma

Utilizar Prisma desde o início do projeto.

Banco inicial:

SQLite

Objetivo:

Permitir migração futura para PostgreSQL alterando apenas a configuração do datasource.

Não criar código acoplado ao SQLite.

Toda comunicação com banco deverá ocorrer através do Prisma.

---

# Simulação de Latência

Durante o desenvolvimento será necessário simular tempo de resposta do backend.

Adicionar delays artificiais nas requisições para validar:

* Skeletons
* Loading
* Estados da aplicação
* Experiência do usuário

Exemplo:

500ms

1000ms

1500ms

Nunca remover essa possibilidade.

Idealmente possuir uma função reutilizável para simular latência durante o desenvolvimento.

---

# Estilo da Aplicação

Toda aplicação utilizará:

Fonte padrão:

Roboto

Não utilizar outras fontes sem necessidade.

Definir a fonte globalmente no layout principal.

---

# Organização do SCSS

Todo SCSS deverá seguir obrigatoriamente a metodologia BEM.

Exemplo:

```
.employee-card {

}

.employee-card__header {

}

.employee-card__title {

}

.employee-card__body {

}

.employee-card__footer {

}

.employee-card--selected {

}
```

Nunca utilizar nomes genéricos como:

container

left

right

box

content

Sempre utilizar nomes semânticos.

Cada componente deverá possuir seu próprio arquivo SCSS Module.

Exemplo:

EmployeeCard.tsx

EmployeeCard.module.scss

---

# Componentização

Criar componentes pequenos e reutilizáveis.

Evitar componentes com muitas responsabilidades.

Sempre que possível dividir em:

* Layout
* UI
* Feature
* Shared

---

# Padrões de Código

Sempre utilizar:

* TypeScript estrito
* Tipagem explícita
* Interfaces
* Componentes funcionais
* Props tipadas
* Imports organizados
* Código legível

Evitar:

* any
* lógica duplicada
* componentes gigantes
* estilos inline

---

# Escalabilidade

Todo código deverá ser escrito considerando crescimento futuro.

Novos módulos deverão poder ser adicionados sem modificar a arquitetura existente.

A aplicação deverá permanecer organizada mesmo após centenas de componentes.

---

# Objetivo Final

Construir uma aplicação moderna utilizando os melhores recursos do Next.js.

A experiência do usuário deve priorizar velocidade percebida.

A estrutura da interface deve aparecer imediatamente.

Somente os dados dinâmicos devem aguardar carregamento.

A arquitetura deverá permanecer modular, desacoplada, organizada e preparada para evolução contínua.
