// src/pages/AgregarPrenda/components/InitialStep.jsx
import React from 'react';

// Este componente no necesita lógica, solo recibe las funciones a ejecutar cuando se hace clic.
// A esto se le llama "Componente Tonto" o de Presentación.
export const InitialStep = ({ onStart, onSkip }) => (
  <div className="step step-1">
    <h2>¡Añade tus prendas!</h2>
    <p>Recuerda tomar fotos claras para que podamos detectar de qué prenda se trata</p>
    <div className="upload-box" onClick={onStart}>
      <span className="plus-icon">+</span>
    </div>
    <button className="secondary-btn" onClick={onSkip}>
      Ahora no
    </button>
  </div>
);