// Fichero: src/shared/components/Navbar/NavItem.js

import React from 'react';
import { NavLink } from 'react-router-dom';


// La lógica de la clase activa pertenece aquí, ya que afecta a este ítem específico.
const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-item active' : 'nav-item';
};

// Recibimos las propiedades (props) 'to', 'icon', y 'label'
export const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink to={to} className={getNavLinkClass}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </NavLink>
  );
};