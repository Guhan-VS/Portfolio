import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isAboutActive = location.pathname === '/education' || location.pathname === '/certifications';

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">GUHAN V S</NavLink>
      <div className="nav-links">
        <div className="nav-item">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </div>
        
        <div className="nav-item">
          <span className={isAboutActive ? 'active' : ''} style={{ cursor: 'pointer', color: isAboutActive ? 'var(--primary-purple)' : 'var(--text-secondary)', fontSize: '0.9rem' }}>
            About ↓
          </span>
          <div className="dropdown-menu">
            <NavLink to="/education" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'}>Education</NavLink>
            <NavLink to="/certifications" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'}>Certifications</NavLink>
          </div>
        </div>

        <div className="nav-item">
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects ↓</NavLink>
          <div className="dropdown-menu">
            <NavLink to="/projects" end className="dropdown-item">All Projects</NavLink>
            <NavLink to="/projects/file-organiser" className="dropdown-item">File Organiser</NavLink>
            <NavLink to="/projects/bluetooth-car" className="dropdown-item">Bluetooth Car</NavLink>
            <NavLink to="/projects/password-checker" className="dropdown-item">Password Checker</NavLink>
            <NavLink to="/projects/phishguard" className="dropdown-item">PhishGuard</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
