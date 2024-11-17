import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteModal from '../components/ConfirmedDeleteModal';
import { toast } from 'react-toastify';
import { deleteClient } from '../services/clients';

jest.mock('../services/clients', () => ({
  deleteClient: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ConfirmDeleteModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  const mockProps = {
    isOpen: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    cardId: 1,
    cardName: 'John Doe',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal when isOpen is true', () => {
    render(<ConfirmDeleteModal {...mockProps} />);
    expect(screen.getByText(/Confirmar Exclusão/i)).toBeInTheDocument();
    expect(screen.getByText(/Você tem certeza que deseja excluir o cliente/i)).toBeInTheDocument();
    expect(screen.getByText(mockProps.cardName)).toBeInTheDocument();
  });

  it('should call onClose when "Cancelar" button is clicked', () => {
    render(<ConfirmDeleteModal {...mockProps} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call deleteClient and onConfirm when "Excluir" button is clicked', async () => {
    (deleteClient as jest.Mock).mockResolvedValueOnce({});
    render(<ConfirmDeleteModal {...mockProps} />);
    fireEvent.click(screen.getByText(/Excluir/i));

    expect(deleteClient).toHaveBeenCalledWith(mockProps.cardId);
    await screen.findByText(/Confirmar Exclusão/i); // Aguarda o processamento assíncrono
    expect(toast.success).toHaveBeenCalledWith(`Cliente ${mockProps.cardName} excluído com sucesso!`);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show an error toast if deleteClient fails', async () => {
    (deleteClient as jest.Mock).mockRejectedValueOnce(new Error('Erro ao excluir'));
    render(<ConfirmDeleteModal {...mockProps} />);
    fireEvent.click(screen.getByText(/Excluir/i));

    await screen.findByText(/Confirmar Exclusão/i); // Aguarda o processamento assíncrono
    expect(toast.error).toHaveBeenCalledWith('Erro ao excluir cliente.');
    expect(mockOnConfirm).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not render the modal when isOpen is false', () => {
    render(<ConfirmDeleteModal {...mockProps} isOpen={false} />);
    expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();
  });
});
