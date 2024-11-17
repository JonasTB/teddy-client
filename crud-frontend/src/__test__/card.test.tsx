import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component', () => {
  const mockUser = { id: 1, name: 'John Doe', wage: 1000, enterprise: 1 };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnSelect = jest.fn();

  it('renders the user details correctly', () => {
    render(<Card user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} onSelect={mockOnSelect} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`Salário: ${mockUser.wage}`)).toBeInTheDocument();
    expect(screen.getByText(`Empresa: ${mockUser.enterprise}`)).toBeInTheDocument();
  });

  it('calls the correct callback functions on button clicks', () => {
    render(<Card user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByRole('button', { name: /plus/i }));
    expect(mockOnSelect).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /trash/i }));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
