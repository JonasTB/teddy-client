import { api } from './api';

export interface Client {
  id: number;
  name: string;
  wage: number;
  enterprise: number;
}

export const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await api.post<Client>('/client', client);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw new Error('Erro ao criar cliente.');
  }
};

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get<Client[]>('/client');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw new Error('Erro ao buscar clientes.');
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get<Client>(`/client/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    throw new Error('Erro ao buscar cliente.');
  }
};

export const updateClient = async (id: number, client: Partial<Omit<Client, 'id'>>): Promise<Client> => {
  try {
    const response = await api.put<Client>(`/client/${id}`, client);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
    throw new Error('Erro ao atualizar cliente.');
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/client/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar cliente com ID ${id}:`, error);
    throw new Error('Erro ao deletar cliente.');
  }
};
