import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import AdminRegisterPage

from './pages/AdminRegisterPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-signup" element={<AdminRegisterPage />} />
        <Route path="/customer-signup" element={<CustomerRegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
