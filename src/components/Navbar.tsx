import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">GUHAN V S</NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/education" className={({ isActive }) => isActive ? 'active' : ''}>Education</NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
        <NavLink to="/certifications" className={({ isActive }) => isActive ? 'active' : ''}>Certifications</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
