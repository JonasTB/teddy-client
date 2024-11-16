import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Selected from './pages/Selected';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import { SelectedClientsProvider } from './contexts/GlobalContext';
import LayoutWithNavbar from './Layouts/LayoutWithNavbar';

function App() {
  return (
    <SelectedClientsProvider>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          <Route element={<LayoutWithNavbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/selected" element={<Selected />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Router>
    </SelectedClientsProvider>
  );
}

export default App;
