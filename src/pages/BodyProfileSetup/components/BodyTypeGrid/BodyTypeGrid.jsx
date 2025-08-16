// src/pages/BodyProfileSetup/components/BodyTypeGrid/BodyTypeGrid.jsx
import './BodyTypeGrid.styles.css';

function BodyTypeGrid({ types, selectedType, onSelectType }) {
  // No renderizamos nada si no hay un género seleccionado (types estará vacío)
  if (!types || types.length === 0) {
    return null;
  }

  return (
    <div className="body-grid">
      {types.map((tipoObj) => (
        <div
          key={tipoObj.tipo}
          className={`body-card ${selectedType?.tipo === tipoObj.tipo ? "selected" : ""}`}
          onClick={() => onSelectType(tipoObj)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectType(tipoObj); }}
        >
          <div className="image-placeholder" />
          <div className="body-label">{tipoObj.tipo}</div>
        </div>
      ))}
    </div>
  );
}

export default BodyTypeGrid;