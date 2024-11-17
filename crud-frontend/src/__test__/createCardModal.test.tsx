import { render, screen, fireEvent } from '@testing-library/react';
import CreateCardModal from '../components/CreateCardModal';

describe('CreateCardModal Component', () => {
  it('renders the modal correctly when isOpen is true', () => {
    render(<CreateCardModal isOpen={true} onClose={jest.fn()} onCardCreated={jest.fn()} />);
    expect(screen.getByText('Criar Cliente')).toBeInTheDocument();
  });

  it('displays error messages for invalid inputs', async () => {
    render(<CreateCardModal isOpen={true} onClose={jest.fn()} onCardCreated={jest.fn()} />);
    
    const submitButton = screen.getByText('Cadastrar');
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Por favor, preencha o campo Nome.')).toBeInTheDocument();
  });
});
