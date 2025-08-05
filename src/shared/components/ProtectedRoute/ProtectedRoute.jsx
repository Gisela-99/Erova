// src/shared/components/ProtectedRoute/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

// <<-- AQUÍ ESTÁ LA CORRECCIÓN -->>
// La ruta ahora sube tres niveles (../ ../ ../) para llegar a la raíz de 'src'
import { useUserContext } from '../../../providers/UserProvider';

/**
 * Componente para proteger rutas que requieren autenticación.
 * Si el usuario no está autenticado, redirige a /login.
 * Muestra un estado de carga mientras se verifica la sesión.
 * @param {{ children: React.ReactNode }} props
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <div>Cargando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;