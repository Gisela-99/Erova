// src/pages/AgregarPrenda/components/SuccessStep.jsx
import React from 'react';

// Otro componente de presentación que solo muestra datos y notifica acciones.
export const SuccessStep = ({ imageUrl, onContinue, onGoHome }) => (
  <div className="step step-3">
    <h2>¡Prenda agregada!</h2>
    <p>¡Has agregado tu prenda correctamente!</p>
    <div className="preview-box">
      {imageUrl && <img src={imageUrl} alt="Prenda" />}
    </div>
    <button className="primary-btn" onClick={onContinue}>
      Continuar
    </button>
    <button className="secondary-btn" onClick={onGoHome}>
      Volver a inicio
    </button>
  </div>
);