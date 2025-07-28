import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import preferencesList from '../../data/preferencesData'
import { addEstiloToUser } from '../../services/estilosServices'
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
    console.log('Continuar con preferencias:', selectedPrefs)
    try {
      console.log('Selected Preferences:', selectedPrefs)
      for (const nombre of selectedPrefs) {
        await addEstiloToUser({ nombre })
      }
      navigate('/profile-datail', { state: { preferences: selectedPrefs } })
    } catch (err) {
      setError('Error al procesar las preferencias. Por favor, inténtalo de nuevo.')
      console.error('Error en addEstiloToUser:', err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Elige tus preferencias de vestir</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}
      >
        {preferencesList.map(({ nombre }) => (
          <div
            key={nombre}
            onClick={() => togglePreference(nombre)}
            className='preference-item'
            style={{
              padding: '1rem',
              border: selectedPrefs.includes(nombre) ? '3px solid ##A793E0' : '1px solid #ccc',
              borderRadius: '8px',
              cursor: 'pointer',
              userSelect: 'none',
              textAlign: 'center',
              backgroundColor: selectedPrefs.includes(nombre) ? '#ccadca' : 'white',
              transition: 'all 0.3s ease'
            }}
          >
            {nombre}
          </div>
        ))}
      </div>
      {error && (
        <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
      )}


      <button
        onClick={handleContinue}
        disabled={selectedPrefs.length === 0}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: selectedPrefs.length === 0 ? '#ccc' : '#A793E0',
          color: selectedPrefs.length === 0 ? '#666' : '#242425',
          border: 'none',
          borderRadius: '8px',
          cursor: selectedPrefs.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Cargando...' : 'Continuar'}
      </button>
    </div>
  )
}


export default Preferences;