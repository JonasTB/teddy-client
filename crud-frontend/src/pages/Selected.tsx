import { useSelectedClients } from '../contexts/GlobalContext';
import { IoIosRemove } from "react-icons/io";
import { toast } from 'react-toastify';

function SelectedClientsPage() {
  const { selectedClients, removeClient, clearClients } = useSelectedClients();

  const handleRemoveClient = (clientId: number) => {
    removeClient(clientId);
    toast.info("Cliente removido");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Clientes Selecionados</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedClients.map((client) => (
          <div key={client.id} className="w-full p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-lg font-bold text-center mb-2">{client.name}</h3>
            <p className="text-sm text-center">Salário: {client.wage}</p>
            <p className="text-sm text-center">Empresa: {client.enterprise}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleRemoveClient(client.id)}
                className="text-red-500 hover:text-red-700"
              >
                <IoIosRemove className="w-6 h-6 transform rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={clearClients}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Limpar clientes selecionados
        </button>
      </div>
    </div>
  );
}

export default SelectedClientsPage;
