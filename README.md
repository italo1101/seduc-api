# Sistema de Gerenciamento de Usuários, Escolas, Professores e Alunos

Este projeto é um sistema backend básico de gerenciamento de usuários, escolas, professores e alunos. Ele foi desenvolvido como parte de um desafio,
onde o objetivo é permitir o cadastro e login de usuários (administradores) e a gestão completa das entidades relacionadas.

## Objetivo do Projeto

O objetivo deste desafio é criar um sistema que possibilite:

- Cadastro e login de administradores.
- Gestão de escolas, incluindo o cadastro, edição e remoção.
- Gestão de professores, incluindo o cadastro, edição e remoção.
- Gestão de alunos, incluindo o cadastro, edição e remoção.
- Estabelecimento de relações apropriadas entre escolas, professores e alunos.

## Funcionalidades Principais

- **Autenticação de Usuários:** Sistema de cadastro e login para administradores.
- **Gerenciamento de Escolas:** CRUD (Create, Read, Update, Delete) para escolas.
- **Gerenciamento de Professores:** CRUD para professores, com associação a escolas.
- **Gerenciamento de Alunos:** CRUD para alunos, com associação a escolas e professores.

## Estrutura do Projeto

- **src/**: Contém os arquivos de código-fonte do projeto.
  - **controllers/**: Controladores que definem as ações para as rotas.
  - **models/**: Modelos de dados representando as entidades do sistema.
  - **routes/**: Definição das rotas da API.
  - **services/**: Serviços que encapsulam a lógica de negócios.
  - **utils/**: Utilitários e funções auxiliares.
- **config/**: Configurações do projeto, incluindo variáveis de ambiente.
- **tests/**: Testes automatizados para validação das funcionalidades.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução para JavaScript no backend.
- **Express.js:** Framework para construção de APIs.
- **Prisma:** ORM para manipulação do banco de dados.
- **PostgreSQL:** Banco de dados relacional utilizado para armazenar as informações.
- **JWT (JSON Web Token):** Para autenticação e autorização.

