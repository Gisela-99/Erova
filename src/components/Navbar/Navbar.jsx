import { Link } from 'react-router-dom';
import './Navbar.styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
        <li className="navbar-item"><Link to="/calendary">Calendario</Link></li>
        <li className="navbar-item"><Link to="/add-garment">Añadir una prenda</Link></li>
        <li className="navbar-item"><Link to="/Comunidad">Comunidad</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
