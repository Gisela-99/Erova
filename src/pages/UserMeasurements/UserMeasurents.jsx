import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { bodyTypes } from "../../data/dataBody" 
import './UserMeasurements.styles.css'

function UserMeasurements() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    genero: 'mujer',
    busto: '',
    cintura: '',
    cadera: '',
  })

  const [result, setResult] = useState('')

  const calcularTipoCuerpo = () => {
  const busto = parseFloat(formData.busto);
  const cintura = parseFloat(formData.cintura);
  const cadera = parseFloat(formData.cadera);
  const genero = formData.genero.toLowerCase();

  if ([busto, cintura, cadera].some(v => isNaN(v) || v <= 0)) {
    setResult('Por favor, introduce todas las medidas correctamente.');
    return;
  }

  let tipo = "";

  // Intentar clasificar por rangos
  const matchPorRangos = bodyTypes[genero].find(bt =>
    busto >= bt.busto[0] && busto <= bt.busto[1] &&
    cintura >= bt.cintura[0] && cintura <= bt.cintura[1] &&
    cadera >= bt.cadera[0] && cadera <= bt.cadera[1]
  );

  if (matchPorRangos) {
    tipo = matchPorRangos.tipo;
  } else {
    // Si no encaja, usar proporciones como respaldo
    const cinturaCadera = cintura / cadera;
    const bustoCadera = busto / cadera;
    const bustoCintura = busto / cintura;
    const caderaBusto = cadera / busto;
    if (genero === 'mujer') {
      if (Math.abs(busto - cadera) <= 5 && cinturaCadera < 0.75) {
        tipo = 'Reloj de arena';
      } else if (bustoCadera > 1.05 && cinturaCadera >= 0.75) {
        tipo = 'Triángulo invertido';
      } else if (caderaBusto > 1.05 && cinturaCadera >= 0.75) {
        tipo = 'Pera';
      } else if (bustoCintura < 0.85 && cintura >= cadera) {
        tipo = 'Manzana';
      } else if (Math.abs(busto - cadera) <= 3 && Math.abs(cintura - busto) <= 10) {
        tipo = 'Rectángulo';
      } else {
        tipo = 'No se pudo determinar un tipo exacto.';
      }
    } else if (genero === 'hombre') {
      if (Math.abs(busto - cadera) <= 7 && cinturaCadera < 0.85) {
        tipo = 'Reloj de arena';
      } else if (bustoCadera > 1.07 && cintura <= busto) {
        tipo = 'Triángulo invertido';
      } else if (caderaBusto > 1.05 && cintura >= busto) {
        tipo = 'Pera';
      } else if (cintura >= busto && cintura >= cadera) {
        tipo = 'Manzana';
      } else if (Math.abs(busto - cadera) <= 5 && Math.abs(cintura - busto) <= 10) {
        tipo = 'Rectángulo';
      } else {
        tipo = 'No se pudo determinar un tipo exacto.';
      }
    } else {
      tipo = 'Género no válido';
    }
  }

  setResult(`Tu tipo de cuerpo es: ${tipo}`);
}
  

  return (
    <div>
      <h1>Medidas del usuario</h1>
      <p>Por favor, introduce tus medidas para determinar tu tipo de cuerpo.</p>

      <div className='measurement-row'>
        <div className='measurement-label'>
          <label htmlFor="genero">Género:</label>
        </div>
        <div className='measurement-select'>
          <select
            name="genero"
            id="genero"
            value={formData.genero}
            onChange={e => setFormData({ ...formData, genero: e.target.value })}
          >
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
          </select>
        </div>
      </div>

      <div className='measurement-row'>
        <span>Busto</span>
        <input
          type="number"
          name='busto'
          id='busto'
          value={formData.busto}
          onChange={e => setFormData({ ...formData, busto: e.target.value })}
        />
        <div className="unit-label">cm</div>
      </div>

      <div className='measurement-row'>
        <span>Cintura</span>
        <input
          type="number"
          name='cintura'
          id='cintura'
          value={formData.cintura}
          onChange={e => setFormData({ ...formData, cintura: e.target.value })}
        />
        <div className="unit-label">cm</div>
      </div>

      <div className='measurement-row'>
        <span>Caderas</span>
        <input
          type="number"
          name='cadera'
          id='cadera'
          value={formData.cadera}
          onChange={e => setFormData({ ...formData, cadera: e.target.value })}
        />
        <div className="unit-label">cm</div>
      </div>

      <button onClick={calcularTipoCuerpo} className='btn-userMeasurents'>Calcular el tipo de cuerpo</button>

      {result && (
        <div className='resultado'>
          <h2>Resultado:</h2>
          <p>{result}</p>
        </div>
      )}

      <button onClick={() => navigate('/')} className='btn-userMeasurents'>Siguiente</button>
    </div>
  )
}

export default UserMeasurements
