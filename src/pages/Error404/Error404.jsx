import { useNavigate } from 'react-router-dom';
import './Error404.styles.css';
function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default Error404;
