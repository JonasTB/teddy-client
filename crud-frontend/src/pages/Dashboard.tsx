// Dashboard.tsx

import { useState, useEffect } from 'react';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';
import EditModal from '../components/EditModal';
import CreateCardModal from '../components/CreateCardModal';
import ConfirmDeleteModal from '../components/ConfirmedDeleteModal';
import { toast } from 'react-toastify';
import { useSelectedClients } from '../contexts/GlobalContext';
import { updateClient, getAllClients } from '../services/clients';

interface Card {
  id: number;
  name: string;
  wage: number;
  enterprise: number;
}

function Dashboard() {
  const { addClient } = useSelectedClients();

  const [cards, setCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients();
        setCards(response);
      } catch (error) {
        toast.error('Erro ao carregar clientes.');
      }
    };
    fetchClients();
  }, []);

  const openEditModal = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const openConfirmDeleteModal = (card: Card) => {
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  };

  const handleCardCreated = async () => {
    try {
      const response = await getAllClients();
      setCards(response);
    } catch (error) {
      toast.error('Erro ao recarregar clientes.');
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cards.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectCard = (card: Card) => {
    addClient(card);
    toast.success('Cliente selecionado adicionado!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Clientes</h1>

        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Clientes por página:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="p-2 border rounded-md"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>

        <CardGrid
          users={getCurrentPageItems()}
          onEdit={openEditModal}
          onDelete={(id: number) => {
            const card = cards.find((card) => card.id === id);
            if (card) openConfirmDeleteModal(card);
          }}
          onSelect={handleSelectCard}
        />
      </div>

      <div className="text-center mb-6">
        <button
          onClick={() => setIsCreateCardModalOpen(true)}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Criar Cliente
        </button>
      </div>

      <div className="p-4 bg-white shadow-md">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {selectedCard && (
        <EditModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          card={selectedCard!}
          onUpdate={(updatedCard) => {
            setCards((prevCards) =>
              prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
            );
          }}
        />
      )}

      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        onClose={() => setIsCreateCardModalOpen(false)}
        onCardCreated={handleCardCreated}
      />

      {cardToDelete && (
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          onClose={() => setIsConfirmDeleteOpen(false)}
          onConfirm={() => {
            setCards((prevCards) => prevCards.filter((card) => card.id !== cardToDelete.id));
            setCardToDelete(null);
          }}
          cardId={cardToDelete.id}
          cardName={cardToDelete.name}
        />
      )}
    </div>
  );
}

export default Dashboard;
