import { useState } from 'react';
import { addGarmentToUser } from '../services/garment.service';

export const useGarmentForm = ({ imageUrl, onSave }) => {
  const [tipo, setTipo] = useState('camiseta');
  const [color, setColor] = useState('');
  const [etiquetas, setEtiquetas] = useState([]);
  const [medidas, setMedidas] = useState({ alto: '', ancho: '' });
  const [isSaving, setIsSaving] = useState(false); // Estado para feedback visual

  const handleGuardar = async () => {
    if (isSaving) return; // Evitar doble click
    setIsSaving(true);
    try {
      await addGarmentToUser({
        imageUrl,
        tipo,
        color,
        etiquetas,
        medidas
      });
      onSave(); // Llama a la función onSave que viene de las props
    } catch (err) {
      console.error(err);
      alert('Error al guardar la prenda');
    } finally {
      setIsSaving(false); // Se asegura de resetear el estado de guardado
    }
  };

//   const handleAddEtiqueta = (e) => {
//     if (e.key === 'Enter' && e.target.value.trim() !== '') {
//       setEtiquetas(prevEtiquetas => [...prevEtiquetas, e.target.value.trim()]);
//       e.target.value = '';
//     }
//   };

// La versión corregida y más segura
const handleAddEtiqueta = (e) => {
  // 1. Guardamos el valor limpio en una variable ANTES que nada.
  const newTag = e.target.value.trim();

  // 2. Comprobamos si la tecla es Enter y si nuestra variable tiene contenido.
  if (e.key === 'Enter' && newTag !== '') {
    // 3. Usamos la variable para actualizar el estado. Ahora es 100% seguro.
    setEtiquetas(prevEtiquetas => [...prevEtiquetas, newTag]);
    
    // 4. Limpiamos el campo de texto.
    e.target.value = '';
  }
};

  // Un manejador más limpio para las medidas
  const handleMedidasChange = (e) => {
    const { name, value } = e.target;
    setMedidas(prevMedidas => ({ ...prevMedidas, [name]: value }));
  };

  // Devolvemos los valores y las funciones para que el componente los pueda usar
  return {
    values: { tipo, color, etiquetas, medidas },
    handlers: {
      setTipo,
      setColor,
      handleAddEtiqueta,
      handleMedidasChange,
      handleGuardar,
    },
    isSaving,
  };
};