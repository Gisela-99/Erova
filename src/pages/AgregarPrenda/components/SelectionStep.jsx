// src/pages/AgregarPrenda/components/SelectionStep.jsx
import React, { useState, useRef } from 'react';

// Este componente maneja su propio estado para el input del link y la referencia al input de archivo.
export const SelectionStep = ({ onFileSelected, onLinkSubmit }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="step step-select dark-bg">
      <button className="square-btn" onClick={handleImageClick}>
        <span className="icon">📷</span>
        <span className="label">Añade una foto</span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="link-section">
        <input
          type="url"
          placeholder="Pega el link de la prenda"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
        <button onClick={() => onLinkSubmit(linkUrl)}>Añadir link</button>
      </div>
    </div>
  );
};