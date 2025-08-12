// import { useState } from 'react';
// import { addPrendaToUser } from '../../services/prendaService';

// const ClasificarPrenda = ({ imageUrl, onSave }) => {
//   const [tipo, setTipo] = useState('camiseta');
//   const [color, setColor] = useState('');
//   const [etiquetas, setEtiquetas] = useState([]);
//   const [medidas, setMedidas] = useState({ alto: '', ancho: '' });

//   const handleGuardar = async () => {
//     await addPrendaToUser({
//       imageUrl,
//       tipo,
//       color,
//       etiquetas,
//       medidas
//     });
//     onSave();
//   };

//   return (
//     <div>
//       <h2>Etiqueta tu prenda</h2>

//       <label>Tipo de prenda</label>
//       <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
//         <option value="camiseta">Camiseta</option>
//         <option value="pantalon">Pantalón</option>
//         <option value="vestido">Vestido</option>
//         <option value="abrigo">Abrigo</option>
//         <option value="zapatos">Zapatos</option>
//         <option value="accesorio">Accesorio</option>
//       </select>

//       <label>Color</label>
//       <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />

//       <label>Medidas</label>
//       <input type="number" placeholder="Alto en cm" onChange={(e) => setMedidas(m => ({ ...m, alto: e.target.value }))} />
//       <input type="number" placeholder="Ancho en cm" onChange={(e) => setMedidas(m => ({ ...m, ancho: e.target.value }))} />

//       <button onClick={handleGuardar}>Guardar y salir</button>
//     </div>
//   );
// };

// export default ClasificarPrenda;


// import { useState } from 'react';
// import { addPrendaToUser } from '../../services/prendaService';

// const ClasificarPrenda = ({ imageUrl, onSave }) => {
//   const [tipo, setTipo] = useState('camiseta');
//   const [color, setColor] = useState('');
//   const [etiquetas, setEtiquetas] = useState([]);
//   const [medidas, setMedidas] = useState({ alto: '', ancho: '' });

//   const handleGuardar = async () => {
//     await addPrendaToUser({
//       imageUrl,
//       tipo,
//       color,
//       etiquetas,
//       medidas
//     });
//     onSave();
//   };

//   return (
//     <div>
//       <h2>Etiqueta tu prenda</h2>
//       <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
//         <option value="camiseta">Camiseta</option>
//         <option value="pantalon">Pantalón</option>
//         <option value="vestido">Vestido</option>
//         <option value="abrigo">Abrigo</option>
//         <option value="zapatos">Zapatos</option>
//         <option value="accesorio">Accesorio</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Alto en cm"
//         onChange={(e) => setMedidas(m => ({ ...m, alto: e.target.value }))}
//       />
//       <input
//         type="number"
//         placeholder="Ancho en cm"
//         onChange={(e) => setMedidas(m => ({ ...m, ancho: e.target.value }))}
//       />
//       <button onClick={handleGuardar}>Guardar y salir</button>
//     </div>
//   );
// };

// export default ClasificarPrenda;



import { useState } from 'react';
import { addGarmentToUser } from '../../services/garment.service';
import './ClasificarPrendas.style.css';

const ClasificarPrenda = ({ imageUrl, onSave }) => {
  const [tipo, setTipo] = useState('camiseta');
  const [color, setColor] = useState('');
  const [etiquetas, setEtiquetas] = useState([]);
  const [medidas, setMedidas] = useState({ alto: '', ancho: '' });

  const handleGuardar = async () => {
    try {
      await addGarmentToUser({
        imageUrl,
        tipo,
        color,
        etiquetas,
        medidas
      });
      onSave();
    } catch (err) {
      console.error(err);
      alert('Error al guardar la prenda');
    }
  };

  const handleAddEtiqueta = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setEtiquetas([...etiquetas, e.target.value.trim()]);
      e.target.value = '';
    }
  };

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
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="clasificar-select"
        >
          <option value="camiseta">Camiseta</option>
          <option value="pantalon">Pantalón</option>
          <option value="vestido">Vestido</option>
          <option value="abrigo">Abrigo</option>
          <option value="zapatos">Zapatos</option>
          <option value="accesorio">Accesorio</option>
        </select>

        {/* Color */}
        <label className="clasificar-label">Detectamos este color. ¿Quieres cambiarlo?</label>
        <input
          type="text"
          placeholder="Ej: Burdeos"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="clasificar-input"
        />

        {/* Etiquetas */}
        <label className="clasificar-label">Añade cuándo o dónde la usarías</label>
        <input
          type="text"
          placeholder="Busca una etiqueta"
          onKeyDown={handleAddEtiqueta}
          className="clasificar-input"
        />
        <div className="clasificar-tags">
          {etiquetas.map((tag, index) => (
            <span key={index} className="clasificar-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Medidas */}
        <label className="clasificar-label">Medidas (opcional)</label>
        <div className="clasificar-medidas">
          <input
            type="number"
            placeholder="Alto en cm"
            onChange={(e) => setMedidas(m => ({ ...m, alto: e.target.value }))}
            className="clasificar-input"
          />
          <input
            type="number"
            placeholder="Ancho en cm"
            onChange={(e) => setMedidas(m => ({ ...m, ancho: e.target.value }))}
            className="clasificar-input"
          />
        </div>

        {/* Imagen */}
        {imageUrl && (
          <div className="clasificar-img-container">
            <img src={imageUrl} alt="Prenda" className="clasificar-img" />
          </div>
        )}

        {/* Botón */}
        <button onClick={handleGuardar} className="clasificar-btn">
          Guardar y salir
        </button>
      </div>
    </div>
  );
};

export default ClasificarPrenda;

