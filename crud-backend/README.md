
# Backend - CRUD Application

Este é o backend de uma aplicação CRUD utilizando **NestJS**, **TypeORM** e **PostgreSQL**.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs.
- **TypeORM**: ORM para gerenciamento do banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Jest**: Framework de testes.

---

## Estrutura do Projeto

```plaintext
src/
├── application/
│   ├── controllers/
│   │   └── client.controller.ts
│   ├── dtos/
│   │   ├── create.dto.ts
│   │   └── update.dto.ts
│   └── usecases/
│       └── client/
│           ├── services/
│           │   ├── create.service.ts
│           │   ├── delete.service.ts
│           │   ├── findall.service.ts
│           │   ├── findone.service.ts
│           │   └── update.service.ts
│           └── test/
│           │   ├── client.controller.spec.ts
│           │   ├── create.service.spec.ts
│           │   ├── delete.service.spec.ts
│           │   ├── findall.service.spec.ts
│           │   ├── findone.service.spec.ts
│           │   └── update.service.spec.ts
│           └── client.module.ts
├── domain/
│   └── entities/
│       └── client.entity.ts
├── infrastructure/
│   └── database/
│       └── database.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## Configuração

Certifique-se de ter o **Node.js** e **PostgreSQL** instalados em sua máquina.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio-backend.git
cd crud-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Edite o arquivo `src/infrastructure/database/database.module.ts` para garantir que as configurações de conexão com o banco de dados estejam corretas:

```typescript
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sua-senha',
    database: 'crud',
    entities: [Client],
    synchronize: true,
}
```

### 4. Execute a aplicação

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

---

## Testes

Para executar os testes, utilize o comando:

```bash
npm run test
```

---

## Endpoints

### Clientes

- **GET** `/clients`: Lista todos os clientes.
- **GET** `/clients/:id`: Retorna um cliente pelo ID.
- **POST** `/clients`: Cria um novo cliente.
- **PUT** `/clients/:id`: Atualiza um cliente existente.
- **DELETE** `/clients/:id`: Remove um cliente.

---

## Docker

### Configuração com Docker

Caso prefira utilizar o Docker, siga os passos abaixo:

1. Certifique-se de que o Docker esteja instalado em sua máquina.
2. Crie uma imagem a partir do `Dockerfile`:

```bash
docker build -t crud-backend .
```

3. Execute o container:

```bash
docker run -p 3000:3000 crud-backend
```

---

## Observação

Garanta que o banco de dados PostgreSQL esteja rodando corretamente antes de iniciar a aplicação.