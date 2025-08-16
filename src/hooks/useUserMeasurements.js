// Contenido para src/hooks/useUserMeasurements.js
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { calculateBodyType } from '../utils/bodyTypeCalculator'; 

export const useUserMeasurements = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    genero: 'mujer',
    busto: '',
    cintura: '',
    cadera: ''
  });
  
  const [resultado, setResultado] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const tipoDeCuerpo = calculateBodyType(formData);
    setResultado(tipoDeCuerpo);
  };
  
  const handleNavigateHome = () => {
      navigate('/');
  };

  // El hook devuelve todo lo que el componente necesita para funcionar
  return {
    formData,
    resultado,
    handleChange,
    handleSubmit,
    handleNavigateHome
  };
};