// src/pages/BodyProfileSetup/components/InfoHelpIcon/InfoHelpIcon.jsx
import { useState } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import './InfoHelpIcon.styles.css';

function InfoHelpIcon({ onOpenModal, onNavigateToMeasurements }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Creamos una función para que el link no cierre el tooltip al hacerle click
  const handleNavigateClick = (e) => {
    e.stopPropagation(); // Evita que el click se propague al div principal
    onNavigateToMeasurements();
  }

  return (
    <div
      className="info-icon-container"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onClick={onOpenModal}
      role="button"
      aria-label="Más información"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpenModal(); }}
    >
      <IoIosInformationCircleOutline size={24} />

      {/* El tooltip ahora es parte interna de este componente */}
      {isTooltipVisible && (
        <div className="tooltip-bubble">
          <div className="tooltip-text">
            ¿No estás segurx? <br />
            <button className="tooltip-link" onClick={handleNavigateClick}>
              [Descúbrelo con tus medidas]
            </button>
          </div>
          <span className="tooltip-tail" />
        </div>
      )}
    </div>
  );
}

export default InfoHelpIcon;