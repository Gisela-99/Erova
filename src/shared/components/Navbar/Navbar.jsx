import React from 'react';
import { NAV_ITEMS } from './navbar.constants';
import { NavItem } from './NavItem';
import './Navbar.styles.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      {/* 3. Usamos .map() para recorrer nuestro array de constantes y generar los enlaces */}
      {NAV_ITEMS.map((item) => (
        // 2. Por cada item en nuestros datos, renderizamos un componente NavItem.
        // Le pasamos las propiedades usando sus mismos nombres.
        <NavItem 
          key={item.to} 
          to={item.to} 
          icon={item.icon} 
          label={item.label} 
        />
      ))}
    </nav>
  );
};

export default Navbar;
