import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  // Update login state on route change (e.g., after login/register/logout)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="navbar glass-navbar">
      <div className="nav-left">
        <div className="nav-logo">📚 Book Swap</div>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mybooks">My Books</Link>
        <Link to="/requests">Requests</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="auth-link">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="auth-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
