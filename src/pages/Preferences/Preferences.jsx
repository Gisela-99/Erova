import { usePreferences } from './usePreferences'
import preferencesList from '../../data/preferencesData'
import Card from '../../shared/components/Card/Card'
import './Preferences.style.css'

const Preferences = () => {
   const {
    selectedPrefs,
    loading,
    error,
    togglePreference,
    handleContinue,
    goBack,
  } = usePreferences();

  return (
    <div className="preferences-container">
      <h1 className="preferences-title">¡Decide tu estilo!</h1>
      <p className="preferences-subtitle">
        Destaca entre la multitud con un estilo único.
      </p>

      <div className="preferences-grid">
        {preferencesList.map(({ nombre, imagen }) => (
            <Card
              key={nombre}
              id={nombre} // Pasamos 'nombre' como el identificador único
              title={nombre}
              imageUrl={imagen}
              isSelected={selectedPrefs.includes(nombre)}
              onClick={togglePreference}
            />
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
        onClick={goBack} 
      >
        Volver atrás
      </button>
    </div>
  )
}

export default Preferences
