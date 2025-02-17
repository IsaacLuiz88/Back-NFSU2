# 🚗 **Back NFSU2** 🏎️

Este é o backend para um sistema de leilão de carros inspirado no jogo **Need for Speed: Underground 2 (NFSU2)**! A API permite o cadastro de carros, listagem, atualização e exclusão, com informações detalhadas sobre os carros, como nome, marca, ano, motor, preço inicial e atual. A aplicação foi construída com **Node.js** e **MongoDB**, utilizando o **Mongoose** para manipulação do banco de dados.

---

## 🎯 **Objetivo**

O objetivo deste projeto é fornecer uma API RESTful para gerenciar um sistema de leilão de carros, permitindo operações como:

- **Cadastrar carros** no leilão, com dados como nome, marca, ano, motor, preço inicial, entre outros.
- **Listar carros** disponíveis no leilão.
- **Atualizar** as informações de carros existentes.
- **Excluir** carros do leilão.

---

## 🧑‍💻 **Tecnologias Utilizadas**

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criação da API RESTful.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: Biblioteca para manipulação do MongoDB em Node.js.

---

## 🔧 Dependências
Este projeto utiliza as seguintes dependências:

express: Framework web para Node.js.
mongoose: ORM para trabalhar com MongoDB.
cors: Para permitir requisições de diferentes origens.
dotenv: Para carregar variáveis de ambiente (como a URL de conexão do MongoDB).

```bash
npm install express mongoose cors dotenv
```

## 🔧 **Como Rodar o Projeto**

Para rodar este projeto, siga os passos abaixo:

### 1. **Clonar o repositório**

Primeiro, clone o repositório para o seu computador:

```bash
git clone https://github.com/SeuUsuario/Back-NFSU2.git
cd Back-NFSU2
```

Após isso, configure o seu banco de dados (neste projeto, foi utilizado Mongo Atlas). <br>
Crie o seu Cluster e faça a conexão via String.
---

## Instalar as dependências
Instale as dependências do projeto utilizando o npm:
npm install


3. Configurar o MongoDB
Certifique-se de que o MongoDB está instalado e rodando na sua máquina ou configure uma instância do MongoDB Atlas para uso remoto. Se estiver usando o MongoDB local, a conexão padrão será mongodb://localhost:27017/car-auction.


