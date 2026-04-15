import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-logo">
          <Home className="icon" /> Primetrade API UI
        </Link>
      </div>
      
      <div className="navbar-links">
        {token ? (
          <>
            <span className="user-badge">
              <User className="icon-small" /> {localStorage.getItem('role') || 'User'}
            </span>
            <button onClick={handleLogout} className="btn btn-outline btn-logout">
              <LogOut className="icon-small" /> Logout
            </button>
          </>
        ) : (
          !isAuthPage && (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
