import { GARMENT_TYPES } from '../../constants/garmentTypes';
import { useGarmentForm } from '../../hooks/useGarmentForm';
 import './ClasificarPrendas.style.css';

// const ClasificarPrenda = ({ imageUrl, onSave }) => {
  
//   // Así se consume el hook. ¡Toda la lógica compleja está aquí!
//   const { values, handlers, isSaving } = useGarmentForm({ imageUrl, onSave });
 
  

//   return (
//     <div className="clasificar-container">
//       <div className="clasificar-card">
//         <h2 className="clasificar-title">Etiqueta tu prenda</h2>
//         <p className="clasificar-subtitle">
//           Ayúdanos a clasificarla para que podamos combinarla mejor contigo
//         </p>

//         {/* Tipo de prenda */}
//         <label className="clasificar-label">¿Qué tipo de prenda es?</label>
//         <select
//           value={tipo}
//           onChange={(e) => setTipo(e.target.value)}
//           className="clasificar-select"
//         >
//           {GARMENT_TYPES.map((garmentType) => (
//             <option key={garmentType.value} value={garmentType.value}>
//               {garmentType.label}
//             </option>
//           ))}
//         </select>

//         {/* Color */}
//         <label className="clasificar-label">Detectamos este color. ¿Quieres cambiarlo?</label>
//         <input
//           type="text"
//           placeholder="Ej: Burdeos"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           className="clasificar-input"
//         />

//         {/* Etiquetas */}
//         <label className="clasificar-label">Añade cuándo o dónde la usarías</label>
//         <input
//           type="text"
//           placeholder="Busca una etiqueta"
//           onKeyDown={handleAddEtiqueta}
//           className="clasificar-input"
//         />
//         <div className="clasificar-tags">
//           {etiquetas.map((tag, index) => (
//             <span key={index} className="clasificar-tag">
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Medidas */}
//         <label className="clasificar-label">Medidas (opcional)</label>
//         <div className="clasificar-medidas">
//           <input
//             type="number"
//             placeholder="Alto en cm"
//             onChange={(e) => setMedidas(m => ({ ...m, alto: e.target.value }))}
//             className="clasificar-input"
//           />
//           <input
//             type="number"
//             placeholder="Ancho en cm"
//             onChange={(e) => setMedidas(m => ({ ...m, ancho: e.target.value }))}
//             className="clasificar-input"
//           />
//         </div>

//         {/* Imagen */}
//         {imageUrl && (
//           <div className="clasificar-img-container">
//             <img src={imageUrl} alt="Prenda" className="clasificar-img" />
//           </div>
//         )}

//         {/* Botón */}
//         <button onClick={handleGuardar} className="clasificar-btn">
//           Guardar y salir
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClasificarPrenda;

const ClasificarPrenda = ({ imageUrl, onSave }) => {
  // Correcto: Llamas al hook y obtienes los objetos.
  const { values, handlers, isSaving } = useGarmentForm({ imageUrl, onSave });

  return (
    <div className="clasificar-container">
      <div className="clasificar-card">
        <h2 className="clasificar-title">Etiqueta tu prenda</h2>
        <p className="clasificar-subtitle">
          Ayúdanos a clasificarla para que podamos combinarla mejor contigo
        </p>

        {/* Tipo de prenda */}
        <label className="clasificar-label">¿Qué tipo de prenda es?</label>
        <select
          value={values.tipo} // <--- CORRECCIÓN
          onChange={(e) => handlers.setTipo(e.target.value)} // <--- CORRECCIÓN
          className="clasificar-select"
        >
          {GARMENT_TYPES.map((garmentType) => (
            <option key={garmentType.value} value={garmentType.value}>
              {garmentType.label}
            </option>
          ))}
        </select>

        {/* Color */}
        <label className="clasificar-label">Detectamos este color. ¿Quieres cambiarlo?</label>
        <input
          type="text"
          placeholder="Ej: Burdeos"
          value={values.color} // <--- CORRECCIÓN
          onChange={(e) => handlers.setColor(e.target.value)} // <--- CORRECCIÓN
          className="clasificar-input"
        />

        {/* Etiquetas */}
        <label className="clasificar-label">Añade cuándo o dónde la usarías</label>
        <input
          type="text"
          placeholder="Pulsa Enter para añadir etiqueta"
          onKeyDown={handlers.handleAddEtiqueta} // <--- CORRECCIÓN
          className="clasificar-input"
        />
        <div className="clasificar-tags">
          {values.etiquetas.map((tag, index) => ( // <--- CORRECCIÓN
            <span key={index} className="clasificar-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Medidas (usando el nuevo handler unificado) */}
        <label className="clasificar-label">Medidas (opcional)</label>
        <div className="clasificar-medidas">
          <input
            type="number"
            name="alto" // Añadir name es importante para el handler
            placeholder="Alto en cm"
            value={values.medidas.alto} // <--- CORRECCIÓN
            onChange={handlers.handleMedidasChange} // <--- CORRECCIÓN (más limpio)
            className="clasificar-input"
          />
          <input
            type="number"
            name="ancho" // Añadir name es importante para el handler
            placeholder="Ancho en cm"
            value={values.medidas.ancho} // <--- CORRECCIÓN
            onChange={handlers.handleMedidasChange} // <--- CORRECCIÓN (más limpio)
            className="clasificar-input"
          />
        </div>

        {/* Imagen */}
        {imageUrl && (
          <div className="clasificar-img-container">
            <img src={imageUrl} alt="Prenda" className="clasificar-img" />
          </div>
        )}

        {/* Botón (con estado de carga) */}
        <button onClick={handlers.handleGuardar} className="clasificar-btn" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar y salir'}
        </button>
      </div>
    </div>
  );
};

export default ClasificarPrenda;