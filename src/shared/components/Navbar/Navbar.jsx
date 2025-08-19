// import React from 'react';
// import { NAV_ITEMS } from './navbar.constants';
// import { NavItem } from './NavItem';
// import './Navbar.styles.css';

// const Navbar = () => {

//   return (
//     <nav className="navbar">
//       {/* 3. Usamos .map() para recorrer nuestro array de constantes y generar los enlaces */}
//       {NAV_ITEMS.map((item) => (
//         // 2. Por cada item en nuestros datos, renderizamos un componente NavItem.
//         // Le pasamos las propiedades usando sus mismos nombres.
//         <NavItem 
//           key={item.to} 
//           to={item.to} 
//           icon={item.icono} 
//           label={item.label} 
//         />
//       ))}
//     </nav>
//   );
// };

// export default Navbar;


// Fichero: src/shared/components/Navbar/Navbar.jsx

// import React from 'react';
// import { NAV_ITEMS } from './navbar.constants';
// import { NavItem } from './NavItem'; // Asegúrate de que la ruta sea correcta
// import './Navbar.styles.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       {/* 
//         Mapeamos sobre los NAV_ITEMS. 
//         Por cada 'item', pasamos las props Icon y isCentral a NavItem.
//       */}
//       {NAV_ITEMS.map((item) => (
//         <NavItem
//           key={item.to}
//           to={item.to}
//           Icon={item.Icon} // <--- Pasamos el componente Icon
//           isCentral={item.isCentral} // <--- Pasamos el flag
//         />
//       ))}
//     </nav>
//   );
// };

// export default Navbar;


// Fichero: src/shared/components/Navbar/Navbar.jsx

import React from 'react';
import { NAV_ITEMS } from './navbar.constants';
import { NavItem } from './NavItem';
import './Navbar.styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          Icon={item.Icon}
          // --- Cambio Clave ---
          // Le pasamos la propiedad ActiveIcon.
          // Para la mayoría de los ítems, será 'undefined', lo cual está bien.
          ActiveIcon={item.ActiveIcon}
        />
      ))}
    </nav>
  );
};

export default Navbar;