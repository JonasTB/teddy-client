import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { SelectedClientsProvider } from './contexts/GlobalContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SelectedClientsProvider>
      <App />
    </SelectedClientsProvider>
  </StrictMode>
);
