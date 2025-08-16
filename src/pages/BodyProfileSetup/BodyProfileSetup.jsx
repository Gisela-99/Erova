import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserBodyProfile } from '../../services/user.service.js';
import { getCurrentUserId } from "../../services/auth.service.js"
import { bodyTypes } from "../../data/dataBody.js";
import GenderToggle from './components/GenderToggle/GenderToggle.jsx';
import BodyTypeGrid from './components/BodyTypeGrid/BodyTypeGrid.jsx';
import InfoHelpIcon from './components/InfoHelpIcon/InfoHelpIcon.jsx';
import Modal from '../../shared/components/Modal/Modal.jsx';   
import './BodyProfileSetup.styles.css';

function BodyProfileSetup() {
  const navigate = useNavigate();
  const [genero, setGenero] = useState(null);
  const [tipoCuerpo, setTipoCuerpo] = useState(null);

  // estados para modal
  const [showModal, setShowModal] = useState(false); // para el modal al hacer click


  // Dentro del componente BodyProfileSetup
const handleGenderSelect = (selectedGender) => {
  setGenero(selectedGender);
  setTipoCuerpo(null); // Importante: Resetea la selección de cuerpo al cambiar de género
};
  // Dentro del componente BodyProfileSetup
const guardarPerfil = async () => {
  const uid = await getCurrentUserId();
  if (!uid || !genero || !tipoCuerpo) {
    alert("Por favor selecciona el género y tipo de cuerpo.");
    return;
  }
  try {
    const bodyProfileData = {
      genero,
      tipoCuerpo: tipoCuerpo.tipo,
      medidasReferencia: {
        busto: tipoCuerpo.busto,
        cintura: tipoCuerpo.cintura,
        cadera: tipoCuerpo.cadera
      }
    };
    // ¡Llamamos a nuestro nuevo método del servicio!
    await updateUserBodyProfile(uid, bodyProfileData);
    navigate('/preferences');
  } catch (error) {
    console.error("Error al guardar el perfil corporal:", error);
    alert("Hubo un error al guardar tu selección.");
  }
};
  const goToMeasurements = () => {
    setShowModal(false); // cerrar modal si está abierto
    navigate('/user-measurements');
  };

  // En BodyProfileSetup.jsx, reemplaza el return por esto:
return (
  <div className="profile-container">
  
    {/* --- LÓGICA DEL ICONO DE INFORMACIÓN  --- */}
  <InfoHelpIcon 
    onOpenModal={() => setShowModal(true)} 
    onNavigateToMeasurements={goToMeasurements} 
  />
    
    <h2>¿Cuál es tu tipo de cuerpo?</h2>
    <p className="subtitle">
      Elige la opción que mejor describa tu cuerpo para poder darte recomendaciones personalizadas.
    </p>
    {/* === NUEVO COMPONENTE EN ACCIÓN === */}
    <GenderToggle activeGender={genero} onGenderSelect={handleGenderSelect} />

    {/* === NUEVO COMPONENTE EN ACCIÓN === */}
    <BodyTypeGrid
      types={genero ? bodyTypes[genero] : []}
      selectedType={tipoCuerpo}
      onSelectType={setTipoCuerpo}
    />

    <button
      className="confirm-button"
      disabled={!genero || !tipoCuerpo}
      onClick={guardarPerfil}
    >
      ¡Lo tengo claro!
    </button>

    {/* === NUEVO MODAL EN ACCIÓN === */}
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <div className="modal-body">
        <h3>¿No estás segurx?</h3>
        <p>[Descúbrelo con tus medidas]</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
          <button className="btn-primary" onClick={goToMeasurements}>Ir a medidas</button>
        </div>
      </div>
    </Modal>
  </div>
);
}

export default BodyProfileSetup;


