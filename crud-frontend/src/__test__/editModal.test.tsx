import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from '../components/EditModal';

describe('EditModal Component', () => {
  const mockCard = { id: 1, name: 'John Doe', wage: 1000, enterprise: 1 };
  const mockOnUpdate = jest.fn();
  const mockOnClose = jest.fn();

  it('should render the modal with correct fields', () => {
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        card={mockCard}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Salário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Empresa')).toBeInTheDocument();
  });

  it('should call onUpdate with updated fields', () => {
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        card={mockCard}
        onUpdate={mockOnUpdate}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.click(screen.getByText('Salvar'));

    expect(mockOnUpdate).toHaveBeenCalledWith({
      id: 1,
      name: 'Jane Doe',
      wage: 1000,
      enterprise: 1,
    });
  });
});
