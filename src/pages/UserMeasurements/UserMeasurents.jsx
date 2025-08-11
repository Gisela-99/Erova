import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { bodyTypes } from "../../data/dataBody"; 
import './UserMeasurements.styles.css'; 


const BodyShapeDetector = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    genero: 'mujer',
    busto: '',
    cintura: '',
    cadera: ''
  });
  
  const [resultado, setResultado] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const detectarTipo = () => {
    const bustoNum = parseFloat(formData.busto);
    const cinturaNum = parseFloat(formData.cintura);
    const caderaNum = parseFloat(formData.cadera);

    if (!bustoNum || !cinturaNum || !caderaNum) {
      setResultado("Introduce todas las medidas correctamente");
      return;
    }

    // Buscar coincidencia exacta por rangos
    const matchPorRangos = bodyTypes[formData.genero].find(bt =>
      bustoNum >= bt.busto[0] && bustoNum <= bt.busto[1] &&
      cinturaNum >= bt.cintura[0] && cinturaNum <= bt.cintura[1] &&
      caderaNum >= bt.cadera[0] && caderaNum <= bt.cadera[1]
    );

    if (matchPorRangos) {
      setResultado(`Tu tipo de cuerpo es: ${matchPorRangos.tipo}`);
      return;
    }

    // Si no hay match exacto, usar proporciones
    const cinturaBustoRatio = cinturaNum / bustoNum;
    let tipo = "No determinado";

    if (Math.abs(bustoNum - caderaNum) <= 5 && cinturaBustoRatio < 0.75) {
      tipo = "Reloj de arena";
    } else if (bustoNum > caderaNum && cinturaNum > caderaNum) {
      tipo = "Triángulo invertido";
    } else if (caderaNum > bustoNum && cinturaNum > bustoNum) {
      tipo = "Pera";
    } else if (Math.abs(bustoNum - caderaNum) <= 5 && cinturaBustoRatio >= 0.75) {
      tipo = "Rectángulo";
    } else if (cinturaNum >= bustoNum && cinturaNum >= caderaNum) {
      tipo = "Manzana";
    } else if (cinturaNum > bustoNum && cinturaNum > caderaNum && bustoNum < caderaNum) {
      tipo = "Diamante";
    } else if (cinturaNum > bustoNum && bustoNum > caderaNum) {
      tipo = "Redondo";
    }

    setResultado(`Tu tipo de cuerpo (estimado) es: ${tipo}`);
  };

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

      <button onClick={detectarTipo} className='btn-userMeasurents'>
        Detectar
      </button>
      
      <h3>{resultado}</h3>
      <button onClick={() => navigate('/')} className='btn-userMeasurents'>Siguiente</button>

    </div>
  );
};

export default BodyShapeDetector;