
# Frontend - CRUD Application

This is the frontend of the CRUD application, built using **React** and **Vite**. It provides a user interface to interact with the backend API.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Axios**: For making HTTP requests to the backend API.
- **React Icons**: To enhance the UI with icons.
- **TailwindCSS**: For styling the application.
- **React Toastify**: For notifications.

---

## Prerequisites

Before running the project, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher): [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js.

---

## Running the Application Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository/crud-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure the Environment**
   Create a `.env` file in the root of the `crud-frontend` directory and set the following variable:
   ```
   VITE_API_URL=http://localhost:3000
   ```

   - Replace `http://localhost:3000` with the URL of your backend API if it is hosted elsewhere.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`.

---

## Build and Deployment

To create a production-ready build of the application:

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Preview the Build**
   ```bash
   npm run preview
   ```

---

## Project Structure

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

## Useful Commands

| Command          | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build the project for production |
| `npm run preview` | Preview the production build     |

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.