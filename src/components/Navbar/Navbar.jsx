import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Inicio</span>
      </NavLink>
      
      <NavLink 
        to="/armario" 
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <span className="nav-icon">👕</span>
        <span className="nav-label">Armario</span>
      </NavLink>
      
      <NavLink 
        to="/calendario" 
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <span className="nav-icon">📅</span>
        <span className="nav-label">Calendario</span>
      </NavLink>
      
      <NavLink 
        to="/perfil" 
        className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
      >
        <span className="nav-icon">👤</span>
        <span className="nav-label">Perfil</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
