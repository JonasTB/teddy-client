import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('username', name);
      localStorage.setItem('welcomeToast', 'true');
      navigate('/dashboard');
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-0">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-6 bg-white rounded-lg shadow-lg sm:shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Olá, seja bem-vindo!</h2>
        
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          style={{ backgroundColor: '#ec6724' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
