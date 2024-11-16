import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { updateClient } from '../services/clients';
import { toast } from 'react-toastify';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: { id: number; name: string; wage: number; enterprise: number };
  onUpdate: (updatedCard: { id: number; name: string; wage: number; enterprise: number }) => void;
}

function EditModal({ isOpen, onClose, card, onUpdate }: EditModalProps) {
  const [name, setName] = useState(card.name);
  const [wage, setWage] = useState(card.wage);
  const [enterprise, setEnterprise] = useState(card.enterprise);

  const handleSave = async () => {
    try {
      const updatedFields: Partial<Omit<typeof card, 'id'>> = {};

      if (name !== card.name) updatedFields.name = name;
      if (wage !== card.wage) updatedFields.wage = wage;
      if (enterprise !== card.enterprise) updatedFields.enterprise = enterprise;

      if (Object.keys(updatedFields).length > 0) {
        await updateClient(card.id, updatedFields);

        toast.success('Cliente atualizado com sucesso!');
        onUpdate({ ...card, ...updatedFields });
      } else {
        toast.info('Nenhuma alteração realizada.');
      }

      onClose();
    } catch (error) {
      toast.error('Erro ao atualizar o cliente.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <IoIosClose className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Salário"
          value={wage}
          onChange={(e) => setWage(Number(e.target.value))}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Empresa"
          value={enterprise}
          onChange={(e) => setEnterprise(Number(e.target.value))}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            style={{ backgroundColor: '#ec6724' }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
