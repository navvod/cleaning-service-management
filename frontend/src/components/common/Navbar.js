import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      {user ? (
        <>
          {user.role === 'customer' && (
            <>
              <Link to="/">Homepage</Link>
              <Link to="/booking">Bookings</Link>
            </>
          )}
          {user.role === 'admin' && (
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/customer-signup">Customer Sign Up</Link>
        
        </>
      )}
    </nav>
  );
}

export default Navbar;