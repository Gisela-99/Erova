import { useUserMeasurements } from '../../hooks/useUserMeasurements'
import './UserMeasurements.styles.css'; 

const UserMeasurements = () => {
  // Toda la lógica compleja está ahora contenida en una sola línea
  const {
    formData,
    resultado,
    handleChange,
    handleSubmit,
    handleNavigateHome
  } = useUserMeasurements();

  return (
    <div>
      <h2>Detector de Tipo de Cuerpo</h2>
      
      <div className='measurement-row'>
        <label>
          Género:
          <select 
            name="genero" 
            value={formData.genero} 
            onChange={handleChange}
          >
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
          </select>
        </label>
      </div>

      <div className='measurement-row'>
        <label>
          Busto:
          <input 
            type="number" 
            name="busto"
            value={formData.busto} 
            onChange={handleChange} 
          />
        </label>
        <div className="unit-label">cm</div>
      </div>

      <div className='measurement-row'>
        <label>
          Cintura:
          <input 
            type="number" 
            name="cintura"
            value={formData.cintura} 
            onChange={handleChange} 
          />    
        </label>
        <div className="unit-label">cm</div>
      </div>

      <div className='measurement-row'>
        <label>
          Cadera:
          <input 
            type="number" 
            name="cadera"
            value={formData.cadera} 
            onChange={handleChange} 
          />
        </label>
        <div className="unit-label">cm</div>
      </div>

      <button onClick={handleSubmit} className='btn-userMeasurents'>
        Detectar
      </button>
      
      <h3>{resultado}</h3>
      <button onClick={handleNavigateHome} className='btn-userMeasurents'>Siguiente</button>

    </div>
  );
};

export default UserMeasurements