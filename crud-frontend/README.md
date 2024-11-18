
# Frontend - CRUD Application

Este é o frontend da aplicação CRUD, construído usando **React** e **Vite**. Ele fornece uma interface de usuário para interagir com a API de backend.

## Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para criar interfaces de usuário.
- **Vite**: Uma ferramenta de construção rápida e servidor de desenvolvimento.
- **Axios**: Para fazer solicitações HTTP para a API de backend.
- **React Icons**: Para aprimorar a interface do usuário com ícones.
- **TailwindCSS**: Para estilizar o aplicativo.
- **React Toastify**: Para notificações.

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado no seu sistema:

- **Node.js** (versão 16 ou superior): [Download Node.js](https://nodejs.org/)
- **npm** ou **yarn**: Com Node.js.

---

## Executando o aplicativo localmente

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository/crud-frontend
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar o ambiente**
   Crie um arquivo `.env` na raiz do diretório `crud-frontend` e defina a seguinte variável:
   ```
   VITE_API_URL=http://localhost:3000
   ```

   - Substitua `http://localhost:3000` com a URL da sua API de backend, caso ela esteja hospedada em outro lugar.

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra seu navegador e navegue até: `http://localhost:5173`.

---

## Construção e implantação

Para criar uma versão pronta para produção da aplicação:

1. **Build do Projeto**
   ```bash
   npm run build
   ```

2. **Preview da Build**
   ```bash
   npm run preview
   ```

---

## Estrutura do Projeto

```
/ (root)
  ├── public/          # Static assets
  ├── src/             # Source files
  │   ├── components/  # Reusable components
  │   ├── pages/       # Page components
  │   ├── services/    # API integration logic
  │   ├── styles/      # TailwindCSS configurations
  │   └── App.tsx      # Main app component
  └── vite.config.ts   # Vite configuration
```

---

## Comandos Úteis

| Command          | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build the project for production |
| `npm run preview` | Preview the production build     |

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.