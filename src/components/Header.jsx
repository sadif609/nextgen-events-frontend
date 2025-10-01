import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <NavLink to="/" className="header-logo">
            <div className="logo-container">
              <img 
                src="/LogoH.png" 
                alt="NextGen Events Logo" 
                className="animated-logo"
              />
              <span className="logo-text">NextGen Events</span>
            </div>
          </NavLink>
          
          <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <NavLink 
              to="/events" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </NavLink>
            <NavLink 
              to="/add-event" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add Event
            </NavLink>
            {user && (
              <NavLink 
                to="/my-events" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Events
              </NavLink>
            )}
          </nav>
          
          <div className="header-actions">
            {user ? (
              <>
                <span className="text-muted welcome-text">
                  Welcome{" "}
                  <NavLink to="/profile" className="user-link">
                    <strong>{user.name || user.email}</strong>
                  </NavLink>
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <div className="auth-buttons">
                <NavLink to="/login" className="btn btn-outline">
                  Sign In
                </NavLink>
                <NavLink to="/register" className="btn btn-primary">
                  Sign Up
                </NavLink>
              </div>
            )}
            
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;