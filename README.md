
# CRUD Fullstack com Docker

Este repositório contém uma aplicação CRUD completa desenvolvida com **NestJS**, **TypeORM**, **PostgreSQL** no backend, e **React + Vite** no frontend. A aplicação é totalmente containerizada usando **Docker Compose** para facilitar a configuração e execução.

## Tecnologias Utilizadas

### Backend
- **NestJS**: Framework Node.js para construção de APIs.
- **TypeORM**: ORM para gerenciamento do banco de dados.
- **PostgreSQL**: Banco de dados relacional.

### Frontend
- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida e eficiente.
- **Axios**: Para integração com a API.

### Infraestrutura
- **Docker**: Para criação de containers isolados.
- **Docker Compose**: Para orquestração dos serviços.

---

## Estrutura do Projeto

- **crud-backend**: Código fonte da API.
  - Tecnologias: NestJS, TypeORM, PostgreSQL.
  - Porta: `3000`.
- **crud-front**: Código fonte do frontend.
  - Tecnologias: React, Vite.
  - Porta: `5173`.
- **docker-compose.yml**: Orquestração para subir o banco de dados, backend e frontend.
- **PostgreSQL**:
  - Porta: `5433`.
  - Usuário: `postgres`.
  - Senha: `crud-test`.

---

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:
- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

---

## Configuração e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Estrutura do Docker Compose

Certifique-se de que o arquivo `docker-compose.yml` esteja configurado como segue:
```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    container_name: crud-db
    restart: always
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: crud-test
      POSTGRES_DB: crud
    volumes:
      - pgdata:/var/lib/postgresql/data

  crud-api:
    build: ./crud-backend
    container_name: crud-api
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_HOST: db
      DATABASE_PORT: 5432
      DATABASE_USER: postgres
      DATABASE_PASSWORD: crud-test
      DATABASE_NAME: crud
      PORT: 3000

  crud-front:
    build: ./crud-front
    container_name: crud-front
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - crud-api
    environment:
      VITE_API_BASE_URL: http://crud-api:3000

volumes:
  pgdata:
```

---

### 3. Subir a aplicação com Docker Compose
Para subir todos os serviços, execute:
```bash
docker-compose up --build
```

Isso irá:
1. Subir o banco de dados PostgreSQL.
2. Construir e iniciar o backend na porta `3000`.
3. Construir e iniciar o frontend na porta `5173`.

### 4. Acessar a aplicação
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend** (API): [http://localhost:3000](http://localhost:3000)

---

## Endpoints da API

A API possui os seguintes endpoints para gerenciamento de clientes:

| Método   | Endpoint       | Descrição                        |
|----------|----------------|-----------------------------------|
| `POST`   | `/client`      | Cria um novo cliente.            |
| `GET`    | `/client`      | Retorna todos os clientes.       |
| `GET`    | `/client/:id`  | Retorna um cliente específico.   |
| `PUT`    | `/client/:id`  | Atualiza um cliente.             |
| `DELETE` | `/client/:id`  | Remove um cliente.               |

### Exemplo de `.env` no Backend
Certifique-se de configurar as variáveis de ambiente no arquivo `.env` dentro de `crud-backend`:
```env
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=crud-test
DATABASE_NAME=crud
PORT=3000
```

---

## Variável de ambiente no Frontend

Certifique-se de que a variável de ambiente `VITE_API_BASE_URL` está configurada corretamente no arquivo `.env` dentro da pasta `crud-front`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Comandos Úteis

### Subir e reconstruir os serviços
```bash
docker-compose up --build
```

### Parar todos os serviços
```bash
docker-compose down
```

### Visualizar logs
```bash
docker-compose logs -f
```

---

## Possíveis Problemas

1. **Erro de conexão com o banco de dados**:
   - Verifique se o backend está apontando para o nome do serviço `db` no `DATABASE_HOST`.
   - Certifique-se de que a porta `5433` não está sendo usada por outro serviço.

2. **Problemas com o frontend não encontrando a API**:
   - Certifique-se de que `VITE_API_BASE_URL` está configurado corretamente no `.env` do frontend.

---

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto.

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
