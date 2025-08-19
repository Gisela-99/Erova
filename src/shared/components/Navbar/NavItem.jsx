// Fichero: src/shared/components/Navbar/NavItem.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// La función para las clases se simplifica, ya no necesita la lógica de 'isCentral'.
const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-item active' : 'nav-item';
};

// Recibimos la nueva prop 'ActiveIcon' (puede ser undefined para los ítems normales).
export const NavItem = ({ to, Icon, ActiveIcon }) => {
  return (
    // Utilizamos una técnica de React Router llamada "function as a child".
    // Nos permite acceder al estado 'isActive' directamente aquí.
    <NavLink to={to} className={getNavLinkClass}>
      {({ isActive }) => {
        // Esta es la lógica clave:
        // 1. ¿El enlace está activo (isActive)?
        // 2. ¿Y este ítem tiene un ActiveIcon definido?
        // Si ambas son ciertas, usamos ActiveIcon. Si no, usamos el Icon normal.
        const IconToRender = isActive && ActiveIcon ? ActiveIcon : Icon;
        
        return (
          <span className="nav-icon">
            <IconToRender />
          </span>
        );
      }}
    </NavLink>
  );
};