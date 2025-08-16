import { useErrorNavigation } from './useErrorNavigation';
import { ERROR_404_CONTENT } from './error.constants';
import './Error404.styles.css';
function Error404() {
   const { goToHome } = useErrorNavigation();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1>{ERROR_404_CONTENT.title}</h1>
        <h2>{ERROR_404_CONTENT.subtitle}</h2>
        <p>{ERROR_404_CONTENT.description}</p>
        
        <button 
          className="home-button"
          onClick={goToHome}
        >
          {ERROR_404_CONTENT.buttonText}
        </button>
      </div>
    </div>
  );
}

export default Error404;
