// src/pages/BodyProfileSetup/components/GenderToggle/GenderToggle.jsx
import './GenderToggle.styles.css';

function GenderToggle({ activeGender, onGenderSelect }) {
  return (
    <div className="gender-toggle">
      <button
        className={activeGender === "hombre" ? "active" : ""}
        onClick={() => onGenderSelect("hombre")}
        type="button"
      >
        Masculino
      </button>
      <button
        className={activeGender === "mujer" ? "active" : ""}
        onClick={() => onGenderSelect("mujer")}
        type="button"
      >
        Femenino
      </button>
    </div>
  );
}

export default GenderToggle;