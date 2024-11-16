import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function LayoutWithNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const username = localStorage.getItem('username') || 'Usuário';

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar username={username} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="p-4">
        <Outlet />
      </main>
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default LayoutWithNavbar;
