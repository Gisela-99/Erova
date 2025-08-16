// Contenido para: src/features/preferences/usePreferences.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStyleToUser } from '../../services/style.service'; // Asegúrate de que la ruta sea correcta

export const usePreferences = () => {
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const togglePreference = (prefId) => {
    setSelectedPrefs(prev =>
      prev.includes(prefId)
        ? prev.filter(p => p !== prefId)
        : [...prev, prefId]
    );
  };

  const handleContinue = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usamos Promise.all para que las peticiones se hagan en paralelo. Es más eficiente.
      await Promise.all(
        selectedPrefs.map(nombre => addStyleToUser({ nombre }))
      );
      navigate('/'); // Redirige al home si todo va bien
    } catch (err) {
      setError('Error al procesar las preferencias. Por favor, inténtalo de nuevo.');
      console.error('Error en addStyleToUser:', err);
    } finally {
      setLoading(false);
    }
  };

  // También creamos una función para la navegación hacia atrás
  const goBack = () => navigate(-1);

  // El hook devuelve todo lo que el componente necesita para funcionar
  return {
    selectedPrefs,
    loading,
    error,
    togglePreference,
    handleContinue,
    goBack,
  };
};