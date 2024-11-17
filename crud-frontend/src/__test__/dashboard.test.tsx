import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import * as clientService from '../services/clients';

jest.mock('../services/clients');

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the title "Clientes"', () => {
    render(<Dashboard />);
    expect(screen.getByText('Clientes')).toBeInTheDocument();
  });

  it('should render the "Clientes encontrados" text with mock data', async () => {
    const mockCards = [{ id: 1, name: 'John Doe', wage: 1000, enterprise: 1 }];
    jest.spyOn(clientService, 'getAllClients').mockResolvedValueOnce(mockCards);

    render(<Dashboard />);

    expect(await screen.findByText(/Clientes encontrados:/i)).toBeInTheDocument();
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  });
});
