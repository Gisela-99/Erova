import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { bodyTypes } from '../../data/dataBody'
import './UserMeasurements.styles.css'

function UserMeasurents() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    genero: 'mujer',
    busto: '',
    cintura: '',
    cadera: '',
  })

  const [result, setResult] = useState('')
  const calcularTipoCuerpo = () => {
    const busto = parseInt(formData.busto)
    const cintura = parseInt(formData.cintura)
    const cadera = parseInt(formData.cadera)
    const genero = formData.genero

    if (isNaN(busto) || isNaN(cintura) || isNaN(cadera)) {
      setResult('Por favor, introduce todas las medidas correctamente.')
      return
    }

    const tipos = bodyTypes[genero.toLocaleLowerCase()]
    const tipoEncontrado = tipos.find((tipo) =>
      busto >= tipo.busto[0] && busto <= tipo.busto[1] &&
      cintura >= tipo.cintura[0] && cintura <= tipo.cintura[1] &&
      cadera >= tipo.cadera[0] && cadera <= tipo.cadera[1])

    if (tipoEncontrado) {
      setResult(`Tu tipo de cuerpo es: ${tipoEncontrado.tipo}`)
    } else {
      setResult('No se encontró un tipo de cuerpo que coincida con tus medidas.')
    }
  }
  return (
    <div>
      <h1>Medidas del usuario</h1>
      <p>Por favor, introduce tus medidas para determinar tu tipo de cuerpo.</p>
      <div className='measurement-row'>
        <div className='measurement-label '>
          <label htmlFor="genero">Género:</label>
        </div>
        <div className='measurement-select'>
          <select
            name="genero" 
            id="genero"
            value={formData.genero}
            onChange={e => setFormData({ ...formData, genero: e.target.value
            })}
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

      <button onClick={calcularTipoCuerpo}>Calcular el tipo de cuerpo</button>
      {result && (
        <div className='resultado'>
          <h2>Resultado:</h2>
          <p>{result}</p>
        </div>
      )}

      <button onClick={() => navigate('/')}>Siguiente</button>
    </div>
  )
}

export default UserMeasurents;