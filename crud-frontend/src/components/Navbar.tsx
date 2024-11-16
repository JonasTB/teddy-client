import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useSelectedClients } from '../contexts/GlobalContext';

interface NavbarProps {
  username: string;
  toggleSidebar: () => void;
}

function Navbar({ username, toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const { clearClients } = useSelectedClients();

  const handleLogout = () => {
    clearClients();
    localStorage.clear();
    toast.info("Até logo!");
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
          <IoMdMenu className="w-8 h-8" />
        </button>
        <img src="/assets/Teddy.svg" alt="Logo" className="w-24" />
      </div>

      <div className="flex space-x-6 text-gray-800">
        <Link to="/dashboard" className="hover:text-orange-500 hover:underline">
          Clientes
        </Link>
        <Link to="/selected" className="hover:text-orange-500 hover:underline">
          Clientes selecionados
        </Link>
        <button onClick={handleLogout} className="hover:text-orange-500 hover:underline">
          Sair
        </button>
      </div>

      <div className="text-gray-800">
        <span>Olá, <span className="font-semibold">{username}</span>!</span>
      </div>
    </div>
  );
}

export default Navbar;
