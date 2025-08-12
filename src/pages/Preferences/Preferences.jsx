import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import preferencesList from '../../data/preferencesData'
import { addStyleToUser } from '../../services/style.service'
import './Preferences.style.css'

const Preferences = () => {
  const [selectedPrefs, setSelectedPrefs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const togglePreference = (pref) => {
    setSelectedPrefs(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    )
  }

  const handleContinue = async () => {
    setLoading(true)
    setError(null)
    try {
      for (const nombre of selectedPrefs) {
        await addStyleToUser({ nombre })
      }
      navigate('/')
    } catch (err) {
      setError('Error al procesar las preferencias. Por favor, inténtalo de nuevo.')
      console.error('Error en addStyleToUser:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="preferences-container">
      <h1 className="preferences-title">¡Decide tu estilo!</h1>
      <p className="preferences-subtitle">
        Destaca entre la multitud con un estilo único.
      </p>

      <div className="preferences-grid">
        {preferencesList.map(({ nombre, imagen}) => (
          <div
            key={nombre}
            className={`preference-card ${
              selectedPrefs.includes(nombre) ? 'selected' : ''
            }`}
            onClick={() => togglePreference(nombre)}
          >
            <div className="preference-image">
              {imagen && <img src={imagen} alt={nombre} />}
            </div>
            <div className="preference-name">{nombre}</div>
          </div>
        ))}
      </div>

      {error && <p className="preferences-error">{error}</p>}

      <button
        className="preferences-button"
        onClick={handleContinue}
        disabled={selectedPrefs.length === 0}
      >
        {loading ? 'Cargando...' : 'Empecemos'}
      </button>

      <button
        type="button"
        className="preferences-back"
        onClick={() => navigate(-1)}
      >
        Volver atrás
      </button>
    </div>
  )
}

export default Preferences
