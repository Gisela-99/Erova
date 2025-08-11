import { useNavigate } from 'react-router-dom';
import { FaTshirt, FaCalendarPlus } from 'react-icons/fa';
import PrimaryButton from '../../shared/components/Buttons/Primary/Primary';
import './Home.styles.css';

const Home = ({ user }) => {
  const navigate = useNavigate();

  // Get user's display name, name, or email
  const getUserName = () => {
    if (!user) return 'Usuario';
    // Check in order: name (from Firestore), displayName (from auth), email prefix, or default
    return user.name || user.displayName || user.email?.split('@')[0] || 'Usuario';
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>¡Hola, {getUserName()}!</h1>
        <p className="subtitle">Bienvenido a tu armario digital personal</p>
      </header>
      
      <main className="home-content">
        <div className="action-buttons">
          <button 
            className="action-button add-item"
            onClick={() => navigate('/agregar-prenda')}
          >
            <FaTshirt className="button-icon" />
            <span>Añadir prenda</span>
          </button>

          <button 
            className="action-button create-outfit"
            onClick={() => navigate('/crear-outfit')}
          >
            <FaCalendarPlus className="button-icon" />
            <span>Crear outfit</span>
          </button>
        </div>

        
        <section className="welcome-section">
          <p>Comienza a organizar tu guardarropa de manera inteligente.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;