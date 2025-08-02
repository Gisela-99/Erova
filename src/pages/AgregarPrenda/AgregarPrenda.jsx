import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AgregarPrenda.styles.css';

const AgregarPrenda = () => {
  const navigate = useNavigate();

  return (
    <div className="agregar-prenda-container">
      <header className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver atrás"
        >
          <FaArrowLeft />
        </button>
        <h1>Añadir Prenda</h1>
      </header>
      
      <main className="page-content">
        <div className="upload-area">
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p>Arrastra una foto o haz clic para seleccionar</p>
            <button className="select-photo-button">Seleccionar foto</button>
          </div>
        </div>
        
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select id="categoria" className="form-control">
              <option value="">Selecciona una categoría</option>
              <option value="camiseta">Camiseta</option>
              <option value="pantalon">Pantalón</option>
              <option value="vestido">Vestido</option>
              <option value="abrigo">Abrigo</option>
              <option value="zapatos">Zapatos</option>
              <option value="accesorio">Accesorio</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="color">Color principal</label>
            <input 
              type="color" 
              id="color" 
              className="form-control color-picker" 
              defaultValue="#4a90e2"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="temporada">Temporada</label>
            <div className="season-tags">
              <button type="button" className="season-tag">Primavera</button>
              <button type="button" className="season-tag">Verano</button>
              <button type="button" className="season-tag">Otoño</button>
              <button type="button" className="season-tag">Invierno</button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="notas">Notas</label>
            <textarea 
              id="notas" 
              className="form-control" 
              rows="3" 
              placeholder="Añade alguna nota sobre esta prenda..."
            ></textarea>
          </div>
          
          <button className="save-button">Guardar prenda</button>
        </div>
      </main>
    </div>
  );
};

export default AgregarPrenda;
