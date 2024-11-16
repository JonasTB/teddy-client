import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Página não encontrada</p>
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}

export default NotFound;
