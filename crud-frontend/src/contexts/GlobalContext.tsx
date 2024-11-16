import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Client {
  id: number;
  name: string;
  wage: number;
  enterprise: number;
}

interface SelectedClientsContextType {
  selectedClients: Client[];
  addClient: (client: Client) => void;
  removeClient: (clientId: number) => void;
  clearClients: () => void;
}

const SelectedClientsContext = createContext<SelectedClientsContextType | undefined>(undefined);

export const SelectedClientsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClients, setSelectedClients] = useState<Client[]>(() => {
    const storedClients = localStorage.getItem('selectedClients');
    return storedClients ? JSON.parse(storedClients) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedClients', JSON.stringify(selectedClients));
  }, [selectedClients]);

  const addClient = (client: Client) => {
    setSelectedClients((prev) => {
      if (prev.find((c) => c.id === client.id)) return prev;
      return [...prev, client];
    });
  };

  const removeClient = (clientId: number) => {
    setSelectedClients((prev) => prev.filter((client) => client.id !== clientId));
  };

  const clearClients = () => {
    setSelectedClients([]);
  };

  return (
    <SelectedClientsContext.Provider value={{ selectedClients, addClient, removeClient, clearClients }}>
      {children}
    </SelectedClientsContext.Provider>
  );
};

export const useSelectedClients = () => {
  const context = useContext(SelectedClientsContext);
  if (!context) {
    throw new Error('useSelectedClients must be used within a SelectedClientsProvider');
  }
  return context;
};
