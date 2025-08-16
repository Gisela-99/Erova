import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { addGarmentToUser } from '../../services/garment.service';
import ClasificarPrenda from '../ClasificarPrendas/ClasificarPrendas';
import { useGarmentUpload } from '../../hooks/useGarmentUpload';
import { InitialStep } from './components/InitialStep';
import { SelectionStep } from './components/SelectionStep';
import { SuccessStep } from './components/SuccessStep';
import './AgregarPrenda.styles.css';


// Es una buena práctica definir los pasos como constantes para evitar "números mágicos"
const STEPS = {
  INITIAL: 1,
  SELECT_METHOD: 1.5,
  SUCCESS: 3,
  CLASSIFY: 4,
};

const AgregarPrenda = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.INITIAL);
  // --- PASO 3: El estado para la URL de la imagen se llamará ahora `finalImageUrl`.
  // Lo usaremos para guardar la URL una vez que el hook nos diga que la subida fue exitosa.
  const [finalImageUrl, setFinalImageUrl] = useState(null);

  // +++ PASO 3: Usamos nuestro custom hook.
  // Le pasamos una función "callback" que se ejecutará solo cuando la subida sea exitosa.
  const {
    uploading,
    error, // Obtenemos el estado de carga y el error desde el hook.
    handleFileUpload, // Nueva función para subir archivos.
    handleLinkUpload, // Nueva función para subir desde un link.
  } = useGarmentUpload((url) => {
    // Esta es la lógica "onSuccess". Se ejecuta cuando la imagen ya se subió.
    setFinalImageUrl(url); // Guardamos la URL final.
    setStep(STEPS.SUCCESS); // Movemos al usuario al siguiente paso.
  });

  // --- PASO 3: Las funciones handleImageUpload y handleLinkSubmit han sido eliminadas.
  // Toda esa lógica ahora vive dentro de `useGarmentUpload`.

  const handleContinuarClasificacion = async () => {
    try {
      await addGarmentToUser({
        imageUrl: finalImageUrl, // Usamos la URL que guardamos.
        tipo: '',
        color: '',
        etiquetas: [],
        medidas: {}
      });
      setStep(STEPS.CLASSIFY);
    } catch (err) {
      console.error('Error al guardar prenda:', err);
    }
  };

   // +++ PASO 5: Creamos una función para renderizar el paso actual de forma limpia
   const renderCurrentStep = () => {
    switch (step) {
      case STEPS.INITIAL:
        return (
          <InitialStep
            onStart={() => setStep(STEPS.SELECT_METHOD)}
            onSkip={() => navigate('/')}
          />
        );
      case STEPS.SELECT_METHOD:
        return (
          <SelectionStep
            onFileSelected={handleFileUpload}
            onLinkSubmit={handleLinkUpload}
          />
        );
      case STEPS.SUCCESS:
        return (
          <SuccessStep
            imageUrl={finalImageUrl}
            onContinue={handleContinuarClasificacion}
            onGoHome={() => navigate('/')}
          />
        );
      case STEPS.CLASSIFY:
        // +++ CORRECCIÓN 1: Devolver el componente ClasificarPrenda aquí.
        return (
          <ClasificarPrenda
            imageUrl={finalImageUrl}
            onSave={() => navigate('/')}
          />
        );
      default:
        return null;
    }
  }; // +++ CORRECCIÓN 2: La función renderCurrentStep se cierra aquí.

  // +++ CORRECCIÓN 3: El return principal del componente va aquí, fuera de la función anterior.
  return (
    <div className="onboarding-container">
      {uploading ? <p>Subiendo imagen...</p> : renderCurrentStep()}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AgregarPrenda;