**Projeto de API de Produtos e Usuários**

**Descrição**

Este projeto é uma API RESTful desenvolvida em Node.js e Express.js que gerencia produtos e usuários. A API permite realizar operações de CRUD (criar, ler, atualizar e deletar) em produtos e usuários.

**Funcionalidades**

* **Produtos**:
	+ Criar produtos com título, gênero, desenvolvedor e data de lançamento
	+ Listar produtos
	+ Buscar produtos por título
* **Usuários**:
	+ Criar usuários com nome, email, telefone e senha
	+ Listar usuários
	+ Buscar usuários por email
* **Autenticação**:
	+ Verificar token de autenticação em requisições

**Tecnologias Utilizadas**

* Node.js
* Express.js
* MySQL
* JWT (JSON Web Tokens)
* UUID (Universally Unique Identifier)

**Instalação**

1. Clone o repositório: `git clone https://github.com/[seu-usuario]/projeto-api.git`
2. Instale as dependências: `npm install`
3. Configure o banco de dados MySQL: `mysql -u [seu-usuario] -p[senha] < schema.sql`
4. Inicie o servidor: `node src/server.js`

**Endpoints**

* **Produtos**:
	+ `POST /produtos/publicar` - Criar produto
	+ `GET /produtos/lista` - Listar produtos
	+ `GET /produtos/lista/:id` - Buscar produto por título
* **Usuários**:
	+ `POST /usuarios/cadastrar` - Criar usuário
	+ `GET /usuarios/listar` - Listar usuários
	+ `GET /usuarios/listar/:email` - Buscar usuário por email
* **Autenticação**:
	+ `POST /autenticar` - Verificar token de autenticação

**Exemplos de Requisições**

* Criar produto: `curl -X POST -H "Content-Type: application/json" -d '{"titulo": "Produto 1", "genero": "Gênero 1", "desenvolvedor": "Desenvolvedor 1", "data_lancamento": "2022-01-01"}' http://localhost:3333/produtos/publicar`
* Listar produtos: `curl -X GET http://localhost:3333/produtos/lista`
* Buscar produto por título: `curl -X GET http://localhost:3333/produtos/lista/Produto%201`

**Contribuição**

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão, por favor, abra uma issue ou envie um pull request.