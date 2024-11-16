import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoIosClose } from 'react-icons/io';
import { createClient } from '../services/clients';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardCreated: () => void;
}

function CreateCardModal({ isOpen, onClose, onCardCreated }: CreateCardModalProps) {
  const [name, setName] = useState('');
  const [wage, setWage] = useState('');
  const [enterprise, setEnterprise] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setWage('');
      setEnterprise('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() && wage.trim() && enterprise.trim()) {
      const newClient = { name, wage: parseFloat(wage), enterprise: parseInt(enterprise) };

      try {
        await createClient(newClient);
        toast.success('Cliente criado com sucesso!');
        onCardCreated();
        onClose();
      } catch (error) {
        toast.error('Erro ao criar cliente.');
      }
    } else {
      toast.error('Por favor, preencha todos os campos.');
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <IoIosClose className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-left text-gray-800 mb-4">
          Criar Cliente
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="number"
            placeholder="Salário"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="number"
            placeholder="Empresa"
            value={enterprise}
            onChange={(e) => setEnterprise(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg hover:bg-opacity-90"
              style={{ backgroundColor: '#ec6724' }}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCardModal;
