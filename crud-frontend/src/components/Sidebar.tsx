import { Link, useLocation } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { FaHome, FaUsers, FaBoxes } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <button onClick={onClose} className="absolute top-4 right-4">
        <IoIosClose className="w-6 h-6 text-gray-700" />
      </button>

      <div className="p-6 bg-gray-900 bg-opacity-70 flex items-center justify-center">
        <img src="/assets/Teddy.svg" alt="Logo" className="w-32 h-auto" />
      </div>

      <nav className="flex flex-col space-y-4 mt-6 text-gray-800">
        <Link
          to="/"
          onClick={onClose}
          className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
            isActive('/') ? 'text-[#ec6724]' : 'text-black'
          }`}
        >
          <FaHome className={`mr-3 ${isActive('/') ? 'text-[#ec6724]' : 'text-black'}`} />
          <span>Home</span>
        </Link>
        
        <Link
          to="/dashboard"
          onClick={onClose}
          className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
            isActive('/dashboard') ? 'text-[#ec6724]' : 'text-black'
          }`}
        >
          <FaUsers className={`mr-3 ${isActive('/dashboard') ? 'text-[#ec6724]' : 'text-black'}`} />
          <span>Clientes</span>
        </Link>

        <Link
          to="/products"
          onClick={onClose}
          className={`flex items-center px-6 py-3 hover:bg-gray-200 ${
            isActive('/products') ? 'text-[#ec6724]' : 'text-black'
          }`}
        >
          <FaBoxes className={`mr-3 ${isActive('/products') ? 'text-[#ec6724]' : 'text-black'}`} />
          <span>Produtos</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
