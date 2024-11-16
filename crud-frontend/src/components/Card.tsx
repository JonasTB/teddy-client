import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

interface CardProps {
  user: { id: number; name: string; wage: number; enterprise: number };
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

function Card({ user, onEdit, onDelete, onSelect }: CardProps) {
  return (
    <div className="w-full p-4 border rounded-lg shadow-lg bg-white relative">
      <h3 className="text-lg font-bold text-center mb-2">{user.name}</h3>
      <p className="text-sm text-center">Salário: {user.wage}</p>
      <p className="text-sm text-center mb-4">Empresa: {user.enterprise}</p>
      
      <div className="flex justify-around mt-4">
        <button onClick={onSelect} className="text-green-500 hover:text-green-700">
          <FaPlus size={18} />
        </button>
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
          <FaEdit size={18} />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FaTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
}

export default Card;
