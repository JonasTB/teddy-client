import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectedClientsPage from '../pages/Selected';
import { useSelectedClients } from '../contexts/GlobalContext';

jest.mock('../contexts/GlobalContext', () => ({
  useSelectedClients: jest.fn(),
}));

describe('SelectedClientsPage Component', () => {
  const mockRemoveClient = jest.fn();
  const mockClearClients = jest.fn();
  const mockSelectedClients = [
    { id: 1, name: 'Client 1', wage: 1000, enterprise: 1 },
    { id: 2, name: 'Client 2', wage: 2000, enterprise: 2 },
  ];

  beforeEach(() => {
    (useSelectedClients as jest.Mock).mockReturnValue({
      selectedClients: mockSelectedClients,
      removeClient: mockRemoveClient,
      clearClients: mockClearClients,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the selected clients', () => {
    render(
      <>
        <ToastContainer />
        <SelectedClientsPage />
      </>
    );

    expect(screen.getByText('Clientes Selecionados')).toBeInTheDocument();
    mockSelectedClients.forEach((client) => {
      expect(screen.getByText(client.name)).toBeInTheDocument();
      expect(screen.getByText(`Salário: ${client.wage}`)).toBeInTheDocument();
      expect(screen.getByText(`Empresa: ${client.enterprise}`)).toBeInTheDocument();
    });
  });

  it('removes a client when the remove button is clicked', () => {
    render(
      <>
        <ToastContainer />
        <SelectedClientsPage />
      </>
    );

    const removeButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveClient).toHaveBeenCalledWith(mockSelectedClients[0].id);
    expect(screen.getByText('Cliente removido')).toBeInTheDocument();
  });

  it('clears all clients when the clear button is clicked', () => {
    render(
      <>
        <ToastContainer />
        <SelectedClientsPage />
      </>
    );

    const clearButton = screen.getByText('Limpar clientes selecionados');
    fireEvent.click(clearButton);

    expect(mockClearClients).toHaveBeenCalled();
  });
});
