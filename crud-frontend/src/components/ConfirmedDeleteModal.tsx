import { deleteClient } from '../services/clients';
import { toast } from 'react-toastify';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cardId: number;
  cardName: string;
}

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, cardId, cardName }: ConfirmDeleteModalProps) {
  const handleDelete = async () => {
    try {
      await deleteClient(cardId);
      toast.success(`Cliente ${cardName} excluído com sucesso!`);
      onConfirm();
      onClose();
    } catch (error) {
      toast.error('Erro ao excluir cliente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Confirmar Exclusão</h2>
        <p className="mb-4">Você tem certeza que deseja excluir o cliente <strong>{cardName}</strong>?</p>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
