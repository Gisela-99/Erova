import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { bodyTypes } from "../../data/dataBody";
import { doc, setDoc, db } from "../../config/config.js";
import { getCurrentUserId } from "../../services/auth.service.js";
import './ProfileDetail.styles.css';

function ProfileDetail() {
  const navigate = useNavigate();
  const [genero, setGenero] = useState(null);
  const [tipoCuerpo, setTipoCuerpo] = useState(null);

  // estados para tooltip / modal
  const [hoverInfo, setHoverInfo] = useState(false); // para el tooltip al pasar el ratón
  const [showModal, setShowModal] = useState(false); // para el modal al hacer click

  const guardarPerfil = async () => {
    const uid = await getCurrentUserId();
    if (!uid || !genero || !tipoCuerpo) {
      alert("Por favor selecciona el género y tipo de cuerpo.");
      return;
    }
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        genero,
        tipoCuerpo: tipoCuerpo.tipo,
        medidasReferencia: {
          busto: tipoCuerpo.busto,
          cintura: tipoCuerpo.cintura,
          cadera: tipoCuerpo.cadera
        },
        updatedAt: new Date()
      }, { merge: true });
      navigate('/preferences');
    } catch (error) {
      console.error("Error al guardar el tipo de cuerpo:", error);
      alert("Hubo un error al guardar el tipo de cuerpo.");
    }
  };

  const goToMeasurements = () => {
    setShowModal(false); // cerrar modal si está abierto
    navigate('/user-measurements');
  };

  return (
    <div className="profile-container">
      <h2>¿Cuál es tu tipo de cuerpo?</h2>
      <p className="subtitle">
        Elige la opción que mejor describa tu cuerpo para poder darte recomendaciones personalizadas.
      </p>
      <div
        className="info-icon"
        onMouseEnter={() => setHoverInfo(true)}
        onMouseLeave={() => setHoverInfo(false)}
        onClick={() => setShowModal(true)}
        role="button"
        aria-label="Información"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') setShowModal(true); }}
      >
        <IoIosInformationCircleOutline size={24} />
        {/* Tooltip pequeño (hover) */}
        {hoverInfo && !showModal && (
          <div className="tooltip-bubble">
            <div className="tooltip-text">
              ¿No estás segurx? <br />
              <button className="tooltip-link" onClick={goToMeasurements}>
                [Descúbrelo con tus medidas]
              </button>
            </div>
            <span className="tooltip-tail" />
          </div>
        )}
      </div>
  
      {/* Botones de género */}
      <div className="gender-toggle">
        <button
          className={genero === "hombre" ? "active" : ""}
          onClick={() => {
            setGenero("hombre");
            setTipoCuerpo(null);
          }}
          type="button"
        >
          Masculino
        </button>
        <button
          className={genero === "mujer" ? "active" : ""}
          onClick={() => {
            setGenero("mujer");
            setTipoCuerpo(null);
          }}
          type="button"
        >
          Femenino
        </button>
      </div>

      {/* Cards de tipo de cuerpo */}
      {genero && (
        <div className="body-grid">
          {bodyTypes[genero].map((tipoObj) => (
            <div
              key={tipoObj.tipo}
              className={`body-card ${tipoCuerpo?.tipo === tipoObj.tipo ? "selected" : ""}`}
              onClick={() => setTipoCuerpo(tipoObj)}
            >
              <div className="image-placeholder" />
              <div className="body-label">{tipoObj.tipo}</div>
            </div>
          ))}
        </div>
      )}

      {/* Botón final */}
      <button
        className="confirm-button"
        disabled={!genero || !tipoCuerpo}
        onClick={guardarPerfil}
      >
        ¡Lo tengo claro!
      </button>

      {/* Modal: aparece al hacer click en el icono */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // evitar cerrar al hacer click dentro
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-body">
              <h3>¿No estás segurx?</h3>
              <p>[Descúbrelo con tus medidas]</p>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                <button className="btn-primary" onClick={goToMeasurements}>Ir a medidas</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDetail;


