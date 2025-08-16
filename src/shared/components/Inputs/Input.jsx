// src/components/Input/Input.jsx
import React from 'react';
import './Input.styles.css'; // Importamos sus propios estilos

const Input = ({ label, type = 'text', value, onChange, name, placeholder = '', style, required = true }) => {
  return (
    <div className="input-group animate-slide-in-up" style={style}>
      <input
        type={type}
        name={name}
        // Este truco es para que la animación de la label funcione siempre
        placeholder={placeholder || ' '}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;